# Error Handling

> Understanding and handling errors in the FIX protocol

# Error Handling

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

| Code | Reason                      | Description                         |
| ---- | --------------------------- | ----------------------------------- |
| 0    | Invalid tag number          | Unknown tag in message              |
| 1    | Required tag missing        | Mandatory field not present         |
| 2    | Tag not defined for message | Tag not valid for this message type |
| 3    | Undefined tag               | Tag number not in FIX specification |
| 4    | Tag without value           | Empty tag value                     |
| 5    | Incorrect value             | Invalid value for tag               |
| 6    | Incorrect data format       | Wrong data type                     |
| 7    | Decryption problem          | Security issue                      |
| 8    | Signature problem           | Authentication failure              |
| 9    | CompID problem              | SenderCompID/TargetCompID issue     |
| 10   | SendingTime accuracy        | Time outside acceptable window      |
| 11   | Invalid MsgType             | Unknown message type                |

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

| Code | Reason                           | Common Causes                |
| ---- | -------------------------------- | ---------------------------- |
| 1    | Unknown symbol                   | Invalid market ticker        |
| 2    | Exchange closed                  | Outside trading hours        |
| 3    | Order exceeds limit              | Position or order size limit |
| 4    | Too late to enter                | Market expired/closed        |
| 6    | Duplicate order                  | ClOrdID already used         |
| 11   | Unsupported order characteristic | Invalid order parameters     |
| 99   | Other                            | See Text field               |

### Cancel Reject Reasons (102)

In OrderCancelReject (35=9):

| Code | Reason             | Description          |
| ---- | ------------------ | -------------------- |
| 0    | Too late to cancel | Order already filled |
| 1    | Unknown order      | Order ID not found   |
| 99   | Other              | See Text field       |

## Common Error Scenarios

### Example 1: Invalid Tag

**Scenario**: Undefined tag in NewOrderSingle

```fix  theme={null}
// Sent
8=FIXT.1.1|35=D|11=123|38=10|333333=test|...

// Response: Reject
8=FIXT.1.1|35=3|45=5|58=Undefined tag received|371=333333|372=D|373=3|
```

### Example 2: Business Logic Error

**Scenario**: Trading during maintenance

```fix  theme={null}
// Sent
8=FIXT.1.1|35=D|11=456|38=10|55=HIGHNY-23DEC31|...

// Response: BusinessMessageReject
8=FIXT.1.1|35=j|45=10|58=Kalshi exchange unavailable|372=D|380=4|
```

### Example 3: Order Rejection

**Scenario**: Insufficient funds

```fix  theme={null}
// Response: ExecutionReport
8=FIXT.1.1|35=8|11=789|150=8|39=8|58=Insufficient funds|103=99|...
```

## Error Handling Best Practices

### 1. Comprehensive Logging

```python  theme={null}
def handle_message(msg):
    if msg.type == 'Reject':
        log.error(f"Session reject: {msg.Text} (Tag: {msg.RefTagID}, Reason: {msg.SessionRejectReason})")
    elif msg.type == 'BusinessMessageReject':
        log.error(f"Business reject: {msg.Text} (Reason: {msg.BusinessRejectReason})")
    elif msg.type == 'ExecutionReport' and msg.ExecType == 'Rejected':
        log.error(f"Order rejected: {msg.Text} (Reason: {msg.OrdRejReason})")
```

### 2. Retry Strategies

| Error Type         | Retry Strategy                  |
| ------------------ | ------------------------------- |
| Session errors     | Fix protocol issue before retry |
| Rate limit         | Exponential backoff             |
| Exchange closed    | Wait for market open            |
| Insufficient funds | Check balance before retry      |
| Unknown symbol     | Verify symbol, don't retry      |

### 3. Graceful Degradation

<Steps>
  <Step title="Identify Error Type">
    Distinguish between recoverable and non-recoverable errors
  </Step>

  <Step title="Apply Appropriate Action">
    * Recoverable: Implement retry with backoff
    * Non-recoverable: Alert and halt
  </Step>

  <Step title="Monitor and Alert">
    Track error rates and patterns for system health
  </Step>
</Steps>

## Specific Error Conditions

### Authentication Errors

| Symptom        | Likely Cause      | Resolution                            |
| -------------- | ----------------- | ------------------------------------- |
| Logon rejected | Invalid signature | Check RSA key and signature algorithm |
| CompID problem | Wrong API key     | Verify SenderCompID matches API key   |
| Time accuracy  | Clock skew        | Sync system time with NTP             |

### Order Entry Errors

| Error               | Check           | Action                                         |
| ------------------- | --------------- | ---------------------------------------------- |
| Unknown symbol      | Symbol format   | Use exact ticker from market data              |
| Order exceeds limit | Position limits | Query current position                         |
| Duplicate ClOrdID   | ID generation   | Ensure UUID uniqueness                         |
| Invalid price       | Price range     | Ensure (0, 100) cents with valid tick interval |

### Connection Errors

<Warning>
  Connection errors often manifest as:

  * Heartbeat timeout
  * Sequence number gaps
  * Socket disconnection

  Always implement reconnection logic with appropriate delays.
</Warning>

## Error Response Patterns

### Synchronous Errors

Immediate response to invalid request:

```
Request → Validation → Immediate Error Response
```

### Asynchronous Errors

Delayed errors during processing:

```
Request → Initial Accept → Processing → Later Error Report
```
