---
url: https://docs.kalshi.com/fix-margin/authentication
lastmod: 2026-11-13T01:29:35.616Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Authentication & Sessions

> API key creation, logon, session lifecycle, and message retransmission

## API Key Setup

FIX API keys use the same key pair as the [REST API](https://docs.kalshi.com/getting_started/api_keys.md): Ed25519 (recommended) or 2048-bit RSA. Generate a key pair and register the public key in your [account profile](https://kalshi.com/account/profile), or generate one there. The API Key ID (UUID) is your `SenderCompID`.

```bash theme={null}
# Ed25519
openssl genpkey -algorithm ed25519 -out kalshi-fix.key
openssl pkey -in kalshi-fix.key -pubout -out kalshi-fix.pub

# RSA
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out kalshi-fix.key
openssl rsa -in kalshi-fix.key -pubout -out kalshi-fix.pub
```

## Logon (35=A)

The initiator sends a Logon message. The acceptor responds with either a Logon (success) or Logout (failure).

> [!WARNING]
>
> Do not send `SenderSubID<50>` on Logon. Kalshi rejects it with a Logout; send operator identity per message instead — on NewOrderSingle, OrderCancelRequest, or OrderCancelReplaceRequest.

### Required Fields

| Tag | Name | Description | Value |
| - | - | - | - |
| 98 | EncryptMethod | Method of encryption | None\<0> |
| 96 | RawData | Client logon message signature | Base64 encoded signature |
| 108 | HeartbeatInt | Heartbeat interval (seconds). Values below 3 are rejected with `Invalid HeartBtInt`. | N >= 3 |
| 1137 | DefaultApplVerID | Default application version | FIX50SP2\<9> |

### Optional Fields

| Tag | Name | Description | Default |
| - | - | - | - |
| 141 | ResetSeqNumFlag | Reset sequence numbers on logon. **Must be Y for KalshiNR and KalshiDC.** | N |
| 8013 | CancelOrdersOnDisconnect | On any disconnection (including graceful logout), cancel the resting orders placed over FIX with this API key. Orders placed through REST or with another API key are not canceled. See the warning under Logout below. | N |
| 20126 | ListenerSession | Listen-only session. **KalshiNR/KalshiRT only, requires SkipPendingExecReports=Y.** | N |
| 20200 | MessageRetentionPeriod | How long session messages are stored for retransmission, max 72 hours. **KalshiRT only.** | 24 |
| 21005 | UseDollars | Fixed-point dollar pricing flag. Margin sessions always use fixed-point dollar pricing; clients should treat this as always enabled. | Always on |
| 21011 | SkipPendingExecReports | Skip `PENDING_NEW` / `PENDING_REPLACE` / `PENDING_CANCEL` execution reports | N |
| 21012 | UseExpiredOrdStatus | Emit `Expired<C>` for expiry-style system cancellations instead of `Canceled<4>` | N |
| 21007 | EnableIocCancelReport | Partially filled IOC orders produce a cancel report | N |
| 21008 | PreserveOriginalOrderQty | `OrderQty` tag 38 always reflects original order quantity across states | N |

### Signature Generation

The RawData field must contain a base64-encoded signature of the pre-hash string: Ed25519 for Ed25519 keys, RSA-PSS with SHA-256 for RSA keys.

```
PreHashString = SendingTime + SOH + MsgType + SOH + MsgSeqNum + SOH + SenderCompID + SOH + TargetCompID
```

> [!WARNING]
>
> The SendingTime in the PreHashString must match exactly the value in field 52 of the Logon message. SendingTime must be within 30 seconds of the server's current time, or the message will be rejected with `SessionRejectReason<373>=10`.

```python Python (Ed25519) theme={null}
from base64 import b64encode
from cryptography.hazmat.primitives import serialization

private_key = serialization.load_pem_private_key(open('kalshi-fix.key', 'rb').read(), password=None)
sending_time, msg_type, msg_seq_num = "20230809-05:28:18.035", "A", "1"
sender_comp_id = "your-fix-api-key-uuid"
target_comp_id = "KalshiNR"

msg_string = chr(1).join([sending_time, msg_type, msg_seq_num, sender_comp_id, target_comp_id])
raw_data_value = b64encode(private_key.sign(msg_string.encode('utf-8'))).decode('utf-8')
```

```python Python (RSA) theme={null}
from base64 import b64encode
from Cryptodome.Signature import pss
from Cryptodome.Hash import SHA256
from Cryptodome.PublicKey import RSA

private_key = RSA.import_key(open('kalshi-fix.key').read().encode('utf-8'))

sending_time = "20230809-05:28:18.035"
msg_type = "A"
msg_seq_num = "1"
sender_comp_id = "your-fix-api-key-uuid"
target_comp_id = "KalshiNR"

msg_string = chr(1).join([
    sending_time, msg_type, msg_seq_num,
    sender_comp_id, target_comp_id
])

msg_hash = SHA256.new(msg_string.encode('utf-8'))
signature = pss.new(private_key).sign(msg_hash)
raw_data_value = b64encode(signature).decode('utf-8')
```

## Heartbeat & Sequence Numbers

| Behavior | Detail |
| - | - |
| Heartbeat interval | Set by `HeartbeatInt<108>` on Logon. Always send it; 30 seconds is a typical value. |
| Idle timeout | The server ends the session and disconnects when it has received no inbound FIX message of any kind (Heartbeat, TestRequest, other session messages, or application messages) for twice the `HeartbeatInt` |
| Sequence number lower than expected | Connection terminated |
| Sequence number higher than expected | Recoverable with ResendRequest (KalshiRT only) |

## Message Retransmission

Message retransmission (ResendRequest, SequenceReset) is only supported on **KalshiRT**. `ResetSeqNumFlag<141>` must always be `Y` on KalshiNR and KalshiDC.

The [drop copy session](https://docs.kalshi.com/fix-margin/drop-copy.md) provides an alternative way to query for missed execution reports. For a real-time streaming feed, see [Listener Sessions](https://docs.kalshi.com/fix-margin/listener-sessions.md).

### ResendRequest (35=2)

**KalshiRT only.** Lookback window controlled by `MessageRetentionPeriod`.

| Tag | Name | Description |
| - | - | - |
| 7 | BeginSeqNo | Lower bound (inclusive) |
| 16 | EndSeqNo | Upper bound (inclusive) |

## Logout (35=5)

Either side may initiate a Logout. The counterparty responds with a Logout, and the transport connection is terminated. If `CancelOrdersOnDisconnect=Y` was set on Logon, the resting orders placed over FIX with this session's API key are canceled.

> [!WARNING]
>
> **CancelOrdersOnDisconnect is not an account-wide kill switch.** It cancels only the resting orders that were placed over FIX with this session's API key. Orders placed through the REST API, or over FIX with a different API key, keep resting. Cancel those separately.
>
> A connection that goes silent without closing is only detected by the idle timeout, after twice your `HeartbeatInt` with no inbound message. Cancellation starts after that detection and takes further time to complete; there is no guaranteed upper bound on when the orders are canceled. A shorter `HeartbeatInt` (minimum 3 seconds) shortens detection only. Confirm cancellation from the execution reports or by querying your orders, and do not rely on cancel-on-disconnect as your only protection.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.