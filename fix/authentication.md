---
url: https://docs.kalshi.com/fix/authentication
lastmod: 2026-05-12T23:42:08.193Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Authentication & Sessions

> API key creation, logon, session lifecycle, and message retransmission

## API Key Setup

FIX API keys use the same RSA key pair as the [REST API](/getting_started/api_keys). Generate a 2048-bit RSA key pair and register the public key in your [account profile](https://kalshi.com/account/profile). The resulting API Key ID (UUID) is your `SenderCompID`.

```bash theme={null}
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out kalshi-fix.key
openssl rsa -in kalshi-fix.key -pubout -out kalshi-fix.pub
```

## Logon (35=A)

The initiator sends a Logon message. The acceptor responds with either a Logon (success) or Logout (failure).

### Required Fields

| Tag  | Name             | Description                    | Value                    |
| ---- | ---------------- | ------------------------------ | ------------------------ |
| 98   | EncryptMethod    | Method of encryption           | None\<0>                 |
| 96   | RawData          | Client logon message signature | Base64 encoded signature |
| 108  | HeartbeatInt     | Heartbeat interval (seconds)   | N > 3                    |
| 1137 | DefaultApplVerID | Default application version    | FIX50SP2\<9>             |

### Optional Fields

| Tag   | Name                     | Description                                                                                                                 | Default           |
| ----- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| 141   | ResetSeqNumFlag          | Reset sequence numbers on logon. **Must be Y for non-retransmission sessions.**                                             | N                 |
| 8013  | CancelOrdersOnDisconnect | Cancel orders on any disconnection (including graceful logout)                                                              | N                 |
| 20126 | ListenerSession          | Listen-only session. **KalshiNR/RT only, requires SkipPendingExecReports=Y.**                                               | N                 |
| 20127 | ReceiveSettlementReports | Receive settlement reports. **KalshiRT and KalshiPT only. Default to Y on KalshiPT.**                                       | N (Y on KalshiPT) |
| 20200 | MessageRetentionPeriod   | How long session messages will be stored for retransmission, max of 72 hours. **KalshiRT and KalshiPT only.**               | 24                |
| 21005 | UseDollars               | Enable dollar-based price format for prices, including subpenny precision                                                   | N                 |
| 21011 | SkipPendingExecReports   | Skip PENDING\_\{NEW\|REPLACE\|CANCEL} execution reports                                                                     | N                 |
| 21012 | UseExpiredOrdStatus      | Emit Expired\<C> (150/39) for expiry-style system cancellations (CloseCancel and OrderExpiryCancel) instead of Canceled\<4> | N                 |
| 21007 | EnableIocCancelReport    | Partially filled IOC orders produce a cancel report                                                                         | N                 |
| 21008 | PreserveOriginalOrderQty | OrderQty tag 38 always reflects original order quantity across all states                                                   | N                 |
| 21026 | AlwaysEmitNewBeforeTrade | Emit a standalone New\<0> execution report before any Trade\<F> report when both occur in the same matching cycle           | N                 |

### Signature Generation

The RawData field must contain a PSS RSA signature of the pre-hash string:

```
PreHashString = SendingTime + SOH + MsgType + SOH + MsgSeqNum + SOH + SenderCompID + SOH + TargetCompID
```

<Warning>
  **SendingTime in Signature**

  The SendingTime in the PreHashString must match **exactly** the value in field 52 of the Logon message. Format: `YYYYMMDD-HH:MM:SS.mmm`.

  SendingTime must be within 30 seconds of the server's current time, or the message will be rejected with `SessionRejectReason<373>=10`.
</Warning>

<CodeGroup>
  ```python Python theme={null}
  from base64 import b64encode
  from Cryptodome.Signature import pss
  from Cryptodome.Hash import SHA256
  from Cryptodome.PublicKey import RSA

  private_key = RSA.import_key(open('kalshi-fix.key').read().encode('utf-8'))

  sending_time = "20230809-05:28:18.035"
  msg_type = "A"
  msg_seq_num = "1"
  sender_comp_id = "your-fix-api-key-uuid"
  target_comp_id = "KalshiNR"  # Must match TargetCompID in tag 56

  msg_string = chr(1).join([
      sending_time, msg_type, msg_seq_num,
      sender_comp_id, target_comp_id
  ])

  msg_hash = SHA256.new(msg_string.encode('utf-8'))
  signature = pss.new(private_key).sign(msg_hash)
  raw_data_value = b64encode(signature).decode('utf-8')
  ```
</CodeGroup>

## Heartbeat & Sequence Numbers

| Behavior                             | Detail                                                                   |
| ------------------------------------ | ------------------------------------------------------------------------ |
| Default heartbeat interval           | 30 seconds                                                               |
| Missed heartbeat                     | Connection terminates if heartbeat response not received within interval |
| Sequence number lower than expected  | Connection terminated                                                    |
| Sequence number higher than expected | Recoverable with ResendRequest (KalshiRT, KalshiPT only)                 |

## Message Retransmission

Message retransmission (ResendRequest, SequenceReset) is only supported on **KalshiRT** and **KalshiPT**.

<Warning>
  For all other sessions, `ResetSeqNumFlag<141>` in the Logon message must always be `Y` or the Logon will be rejected.
</Warning>

The [drop copy session](/fix/drop-copy) provides an alternative way to query for missed execution reports. For a real-time streaming feed, see [Listener Sessions](/fix/listener-sessions).

### ResendRequest (35=2)

**KalshiRT and KalshiPT only.** Lookback window limited to 24 hours (or up to 72 hours if `MessageRetentionPeriod` was set on Logon).

| Tag | Name       | Description             |
| --- | ---------- | ----------------------- |
| 7   | BeginSeqNo | Lower bound (inclusive) |
| 16  | EndSeqNo   | Upper bound (inclusive) |

## Logout (35=5)

Either side may initiate a Logout. The counterparty responds with a Logout, and the transport connection is terminated. If `CancelOrdersOnDisconnect=Y` was set on Logon, all open orders are canceled.
