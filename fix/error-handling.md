---
url: https://docs.kalshi.com/fix/error-handling
lastmod: 2026-04-30T03:43:38.579Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Error Handling

> Understanding and handling errors in the FIX protocol

## Overview

Kalshi FIX API uses standard FIX error messages with additional detail in the Text field. Errors fall into two categories:

* **Session-level errors**: Protocol violations, handled with Reject (35=3)
* **Business-level errors**: Application logic issues, handled with BusinessMessageReject (35=j) or specific rejection messages

## Error Message Types

### Reject (35=3)

Used for session-level protocol violations.

| Tag | Name                | Description                         | Required |
| --- | ------------------- | ----------------------------------- | -------- |
| 45  | RefSeqNum           | Sequence number of rejected message | Yes      |
| 58  | Text                | Human-readable error description    | No       |
| 371 | RefTagID            | Tag that caused the rejection       | No       |
| 372 | RefMsgType          | Message type being rejected         | No       |
| 373 | SessionRejectReason | Rejection reason code               | No       |

#### Session Reject Reasons (373)

| Code | Reason                      | Description                                          |
| ---- | --------------------------- | ---------------------------------------------------- |
| 0    | Invalid tag number          | Unknown tag in message                               |
| 1    | Required tag missing        | Mandatory field not present                          |
| 2    | Tag not defined for message | Tag not valid for this message type                  |
| 3    | Undefined tag               | Tag number not in FIX specification                  |
| 4    | Tag without value           | Empty tag value                                      |
| 5    | Incorrect value             | Invalid value for tag                                |
| 6    | Incorrect data format       | Wrong data type                                      |
| 7    | Decryption problem          | Security issue                                       |
| 8    | Signature problem           | Authentication failure                               |
| 9    | CompID problem              | SenderCompID/TargetCompID issue                      |
| 10   | SendingTime accuracy        | SendingTime must be within 30 seconds of server time |
| 11   | Invalid MsgType             | Unknown message type                                 |

### BusinessMessageReject (35=j)

Used for application-level business logic errors.

| Tag | Name                 | Description                         | Required |
| --- | -------------------- | ----------------------------------- | -------- |
| 45  | RefSeqNum            | Sequence number of rejected message | Yes      |
| 58  | Text                 | Human-readable error description    | No       |
| 371 | RefTagID             | Tag that caused the rejection       | No       |
| 372 | RefMsgType           | Message type being rejected         | No       |
| 379 | BusinessRejectRefID  | Business ID from rejected message   | No       |
| 380 | BusinessRejectReason | Business rejection reason code      | Yes      |

#### Business Reject Reasons (380)

| Code | Reason                               | Description                    |
| ---- | ------------------------------------ | ------------------------------ |
| 0    | Other                                | See Text field for details     |
| 1    | Unknown ID                           | Referenced ID not found        |
| 2    | Unknown Security                     | Invalid symbol                 |
| 3    | Unsupported Message Type             | Message type not implemented   |
| 4    | Application not available            | System temporarily unavailable |
| 5    | Conditionally required field missing | Context-specific field missing |

## Order-Specific Rejections

### Order Reject Reasons (103)

In ExecutionReport (35=8) with ExecType=Rejected:

| Code | Reason                           | Common Causes                                                    |
| ---- | -------------------------------- | ---------------------------------------------------------------- |
| 1    | Unknown symbol                   | Invalid market ticker                                            |
| 2    | Exchange closed                  | Outside trading hours                                            |
| 3    | Order exceeds limit              | Position or order size limit, insufficient balance               |
| 4    | Too late to enter                | Market expired/closed                                            |
| 6    | Duplicate order                  | ClOrdID already used                                             |
| 11   | Unsupported order characteristic | Invalid order parameters, order ID/side/ticker mismatch on amend |
| 13   | Incorrect quantity               | Invalid order size                                               |
| 99   | Other                            | See Text field                                                   |

### Cancel Reject Reasons (102)

In OrderCancelReject (35=9):

| Code | Reason             | Description                                       |
| ---- | ------------------ | ------------------------------------------------- |
| 0    | Too late to cancel | Order already filled                              |
| 1    | Unknown order      | Order ID not found, order ID/side/ticker mismatch |
| 99   | Other              | See Text field                                    |

## Common Error Scenarios

**Example: Invalid Tag**

**Scenario**: Undefined tag in NewOrderSingle

```fix theme={null}
// Sent
8=FIXT.1.1|35=D|11=123|38=10|333333=test|...

// Response: Reject
8=FIXT.1.1|35=3|45=5|58=Undefined tag received|371=333333|372=D|373=3|
```

**Example: Order Rejected by Exchange**

**Scenario**: Trading during maintenance

```fix theme={null}
// Sent
8=FIXT.1.1|35=D|11=456|38=10|55=HIGHNY-23DEC31|...

// Response: ExecutionReport (Rejected)
8=FIXT.1.1|35=8|11=456|150=8|39=8|58=EXCHANGE_PAUSED|103=2|...
```

<Note>
  Order-entry failures returned by the exchange are sent as ExecutionReport (35=8) with ExecType=Rejected, not as BusinessMessageReject. BusinessMessageReject (35=j) is used for application-layer failures before normal exchange rejection handling, such as rate limiting or listener-session restrictions.
</Note>

**Example: Insufficient Balance**

```fix theme={null}
// Response: ExecutionReport
8=FIXT.1.1|35=8|11=789|150=8|39=8|58=INSUFFICIENT_BALANCE|103=3|...
```

## Troubleshooting

### MsgSeqNum Too High on Logon

**Symptom**: Logon fails or the server sends a ResendRequest for messages the client doesn't have.

**Cause**: The client is sending a `MsgSeqNum` higher than what the server last saw. This typically happens when the client's local sequence store persists across sessions but the server has reset (e.g. after maintenance or a prior `ResetSeqNumFlag=Y` logon).

**Fix**:

* **KalshiNR, KalshiDC, KalshiPT**: Set `ResetSeqNumFlag<141>=Y` on every Logon. These sessions require it; Logon will be rejected without it.
* **KalshiRT, KalshiRFQ**: If you don't need to recover missed messages, set `ResetSeqNumFlag<141>=Y` to reset both sides to 1. If you do need retransmission continuity, ensure your local sequence store matches the server's state.

If using QuickFIX, set `ResetOnLogon=Y` in your session config for non-retransmission sessions.

### SendingTime Rejected

**Symptom**: Reject (35=3) with `SessionRejectReason<373>=10`.

**Cause**: The client's clock is more than 30 seconds off from the server. Sync your system clock via NTP.

### Duplicate Session ("already exists")

**Symptom**: Logout (35=5) immediately after Logon with `Text<58>="already exists"`.

**Cause**: Another FIX connection is already active with the same API key and TargetCompID. Only one connection is allowed per API key per session type. This can also occur if a previous connection was not cleanly closed and the server hasn't yet detected the disconnect.

**Fix**: Ensure the previous session is fully disconnected before reconnecting. If the prior connection was lost unexpectedly, wait for the server's heartbeat timeout to expire (up to 60 seconds depending on your `HeartbeatInt` setting) before retrying. Use separate API keys for concurrent connections.

### Logon Signature Rejected

**Symptom**: Logout immediately after Logon with a signature error.

**Cause**: The `SendingTime` used in the pre-hash string doesn't match the `SendingTime<52>` in the actual Logon message. If using a FIX library, the library may auto-populate `SendingTime`. Use that exact value when computing the signature, not a separately generated timestamp.
