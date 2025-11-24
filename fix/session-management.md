---
url: https://docs.kalshi.com/fix/session-management
lastmod: 2025-11-23T22:54:23.442Z
---
# Session Management

> Managing FIX sessions including logon, logout, and message sequencing

# Session Management

## Creating FIX API Keys

### Generate RSA Key Pair

First, generate a 2048 bit RSA PKCS#8 key pair:

```bash  theme={null}
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out kalshi-fix.key
openssl rsa -in kalshi-fix.key -pubout -out kalshi-fix.pub
```

This creates two files:

* **kalshi-fix.key**: Your private key (keep secure, never share)
* **kalshi-fix.pub**: Your public key (share with Kalshi)

### Create API Key

1. Navigate to [https://demo.kalshi.co/account/profile](https://demo.kalshi.co/account/profile)
2. Click the "Create key" button
3. Name your API Key
4. Copy and paste the contents of `kalshi-fix.pub` into the "RSA public key" field
5. Click "Create"
6. Copy the generated FIX API Key (UUID format)

<Warning>
  Store your private key securely. It is equivalent to your username + password and should never be sent to anyone, including Kalshi employees.
</Warning>

## Logon Process

### Logon Message (35=A)

The initiator must send a Logon message to establish a session. The acceptor will either:

* Respond with a Logon message acknowledging successful logon
* Respond with a Logout (35=5) message if the logon fails

### Required Fields

| Tag  | Name             | Description                    | Value                    |
| ---- | ---------------- | ------------------------------ | ------------------------ |
| 98   | EncryptMethod    | Method of encryption           | None\<0>                 |
| 96   | RawData          | Client logon message signature | Base64 encoded signature |
| 108  | HeartbeatInt     | Heartbeat interval (seconds)   | N > 3                    |
| 1137 | DefaultApplVerID | Default application version    | FIX50SP2\<9>             |

### Optional Fields

| Tag   | Name                     | Description                                                                                          | Default |
| ----- | ------------------------ | ---------------------------------------------------------------------------------------------------- | ------- |
| 108   | HeartbeatInt             | Heartbeat \<0> interval (seconds)                                                                    | 30      |
| 8013  | CancelOrdersOnDisconnect | Cancel orders on any disconnection (including graceful logout)                                       | N       |
| 20126 | ListenerSession          | Listen-only session (KalshiNR/RT only, requires SkipPendingExecReports=Y)                            | N       |
| 20127 | ReceiveSettlementReports | Receive settlement reports (KalshiRT only)                                                           | N       |
| 20200 | MessageRetentionPeriod   | How long session messages will be store for retransmission (KalshiRT and KalshiRFQ only), max of 72. | 24      |
| 21003 | SkipPendingExecReports   | Skip PENDING\_\{NEW\|REPLACE\|CANCEL} execution reports                                              | N       |
| 21007 | EnableIocCancelReport    | Partially filled IOC orders produce a cancel report                                                  | N       |
| 21008 | PreserveOriginalOrderQty | OrderQty tag 38 always reflects original order quantity across all states                            | N       |

### Signature Generation

The RawData field must contain a PSS RSA signature of the pre-hash string:

```
PreHashString = SendingTime + SOH + MsgType + SOH + MsgSeqNum + SOH + SenderCompID + SOH + TargetCompID
```

<Warning>
  **Critical: SendingTime in Signature**

  The SendingTime in the PreHashString must match **exactly** the value in field 52 of your logon message.

  * **Using a FIX library:** Most libraries auto-add SendingTime. Use that exact value (don't manually add a timestamp) when generating the signature.
  * **Building the message yourself:** Include SendingTime in your message and use that same value in the PreHashString. Format: `YYYYMMDD-HH:MM:SS.mmm`
</Warning>

<CodeGroup>
  ```python Python theme={null}
  from base64 import b64encode
  from Cryptodome.Signature import pss
  from Cryptodome.Hash import SHA256
  from Cryptodome.PublicKey import RSA

  # Load private key
  private_key = RSA.import_key(open('kalshi-fix.key').read().encode('utf-8'))

  # Build message string
  # IMPORTANT: Use the EXACT SendingTime that will appear in field 52
  # If constructing the message yourself: generate SendingTime and use it here
  # If using a library: use the SendingTime value that your library will set
  sending_time = "20230809-05:28:18.035"
  msg_type = "A"
  msg_seq_num = "1"
  sender_comp_id = "your-fix-api-key-uuid"
  target_comp_id = "Kalshi"  # Or appropriate TargetCompID

  msg_string = chr(1).join([
      sending_time, msg_type, msg_seq_num,
      sender_comp_id, target_comp_id
  ])

  # Generate signature
  msg_hash = SHA256.new(msg_string.encode('utf-8'))
  signature = pss.new(private_key).sign(msg_hash)
  raw_data_value = b64encode(signature).decode('utf-8')
  ```
</CodeGroup>

## Session Maintenance

### Heartbeat Protocol

* Default interval: 30 seconds
* Both sides must respond to TestRequest messages
* Connection terminates if heartbeat response not received within interval

### Message Sequence Numbers

#### Sequence Number Rules

1. Must be unique and increase by one for each message
2. Empty MsgSeqNum results in session termination
3. Lower than expected = serious failure, connection terminated
4. Higher than expected = recoverable with ResendRequest (if supported)

### Reconnection Procedure

For unexpected sequence numbers:

1. Document the issue with logs for out-of-band communication
2. Check order status via REST API or UI
3. Establish new session with reset sequence numbers

## ResendRequest (35=2)

<Note>
  Only available on Order Entry with Retransmission (KalshiRT) sessions.
</Note>

### Limitations

* Lookback window limited to 24 hours (or up to 72 hours if MessageRetentionPeriod was set on Logon request)
* If you provide a BeginSeqNo that is beyond the lookback window, you will receive a Reject message

| Tag | Name       | Description             |
| --- | ---------- | ----------------------- |
| 7   | BeginSeqNo | Lower bound (inclusive) |
| 16  | EndSeqNo   | Upper bound (inclusive) |

## Error Handling

### Reject (35=3)

Sent when a message cannot be processed due to session-level rule violations.

| Tag | Name                | Description                         | Required |
| --- | ------------------- | ----------------------------------- | -------- |
| 45  | RefSeqNum           | Sequence number of rejected message | Yes      |
| 58  | Text                | Human-readable error description    | No       |
| 371 | RefTagID            | Tag number that caused reject       | No       |
| 372 | RefMsgType          | MsgType of referenced message       | No       |
| 373 | SessionRejectReason | Rejection reason code               | No       |

<Note>
  Reject indicates serious errors that may result from faulty logic. Log and investigate these errors.
</Note>

### BusinessMessageReject (35=j)

Sent for business logic violations rather than session-level errors.

| Tag | Name                 | Description                           | Required |
| --- | -------------------- | ------------------------------------- | -------- |
| 45  | RefSeqNum            | Sequence number of rejected message   | Yes      |
| 58  | Text                 | Human-readable error description      | No       |
| 371 | RefTagID             | Tag number that caused reject         | No       |
| 372 | RefMsgType           | MsgType of referenced message         | No       |
| 379 | BusinessRejectRefID  | Business-level ID of rejected message | No       |
| 380 | BusinessRejectReason | Business rejection reason code        | Yes      |

## Session Termination

### Logout (35=5)

Graceful session termination:

1. Initiator sends Logout message
2. Acceptor responds with Logout (empty Text field)
3. Transport layer connection terminated

| Tag | Name | Description                |
| --- | ---- | -------------------------- |
| 58  | Text | Error description (if any) |

<Warning>
  If `CancelOrdersOnDisconnect=Y`, all orders are canceled even on graceful logout.
</Warning>

## Message Headers

All messages must include standard FIX headers:

| Tag | Name        | Description             | Requirements                      |
| --- | ----------- | ----------------------- | --------------------------------- |
| 8   | BeginString | Protocol version        | FIXT.1.1 (must be first)          |
| 9   | BodyLength  | Message length in bytes | Must be second                    |
| 34  | MsgSeqNum   | Message sequence number | Unique, incrementing              |
| 35  | MsgType     | Message type            | Must be third                     |
| 52  | SendingTime | UTC timestamp           | Within 120 seconds of server time |

### Message Trailers

| Tag | Name     | Description           |                    |
| --- | -------- | --------------------- | ------------------ |
| 10  | CheckSum | Standard FIX checksum | Must be last field |

<Info>
  CheckSum is calculated by summing ASCII values of all characters (except checksum field) modulo 256.
</Info>

## Best Practices

1. **Session Configuration**
   * Use unique ClOrdIDs across all message types
   * Implement proper heartbeat handling
   * Monitor sequence numbers carefully

2. **Error Recovery**
   * Implement automatic reconnection logic
   * Store order state locally for recovery
   * Use drop copy session for missed messages

3. **Security**
   * Rotate API keys periodically
   * Monitor for unauthorized access
   * Use secure storage for private keys
