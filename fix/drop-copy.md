---
url: https://docs.kalshi.com/fix/drop-copy
lastmod: 2025-10-07T23:32:02.117Z
---
# Drop Copy Session

> Recover missed execution reports and query historical order events

# Drop Copy Session

## Overview

The drop copy session provides an alternative method to query for missed execution reports without using the FIX retransmission protocol. This is particularly useful for:

* Recovering from connection failures
* Auditing order activity
* Building backup systems
* Compliance recording

<Info>
  Kalshi's DropCopy format utilizes a request-response message type, if you are interested in a session that "follows along" the execution report activity of your trading
  session, consider using a KalshiRT session with the ListenerFlag parameter.
</Info>

## Connection Details

| Environment | URL                      | Port | TargetCompID |
| ----------- | ------------------------ | ---- | ------------ |
| Production  | fix.elections.kalshi.com | 8229 | KalshiDC     |
| Demo        | fix.demo.kalshi.co       | 8229 | KalshiDC     |

## EventResendRequest (35=U1)

Request execution reports within a specified ExecID range.

### Fields

| Tag   | Name        | Description                 | Required |
| ----- | ----------- | --------------------------- | -------- |
| 21001 | BeginExecID | Starting ExecID (inclusive) | Yes      |
| 21002 | EndExecID   | Ending ExecID (inclusive)   | No       |

<Note>
  If EndExecID is not provided, it defaults to the latest ExecID in your history.
</Note>

### Limitations

* **Lookback Window**: Last 3 hours only
* **Message Types**: Only ExecutionReport (35=8) supported
* **Excluded Messages**:
  * Rejects (no valid ExecID)
  * Pending new orders (ExecID = "-1;-1")

### Example Request

```fix  theme={null}
8=FIXT.1.1|35=U1|21001=12345;67890|21002=12350;67895|
```

## EventResendComplete (35=U2)

Sent after all requested events have been resent.

### Fields

| Tag   | Name             | Description                         | Required |
| ----- | ---------------- | ----------------------------------- | -------- |
| 45    | RefSeqNum        | MsgSeqNum of the EventResendRequest | Yes      |
| 21003 | ResentEventCount | Total number of events resent       | Yes      |

## EventResendReject (35=U3)

Sent when a resend request cannot be fulfilled.

### Fields

| Tag   | Name                    | Description                         | Required |
| ----- | ----------------------- | ----------------------------------- | -------- |
| 45    | RefSeqNum               | MsgSeqNum of the EventResendRequest | Yes      |
| 21004 | EventResendRejectReason | Rejection code                      | Yes      |

### Rejection Reasons (21004)

| Code | Description                               |
| ---- | ----------------------------------------- |
| 1    | Too many resend requests                  |
| 2    | Server error                              |
| 3    | BeginExecID is too small (outside window) |
| 4    | EndExecID is too large                    |

## Usage Patterns

### Recovery After Disconnect

<Steps>
  <Step title="Track Last ExecID">
    Store the last processed ExecID before disconnect
  </Step>

  <Step title="Reconnect to Drop Copy">
    Establish new drop copy session
  </Step>

  <Step title="Request Missing Events">
    Send EventResendRequest starting from last ExecID
  </Step>

  <Step title="Process Resent Events">
    Handle execution reports with new sequence numbers
  </Step>
</Steps>

## Best Practices

### 1. ExecID Management

* Store ExecIDs persistently
* Handle the two-part format correctly (e.g., "12345;67890")
* Implement proper ID comparison logic

### 2. Rate Limiting

* Avoid excessive resend requests
* Implement exponential backoff on failures
* Batch requests when possible

### 3. Deduplication

* Events may arrive via both primary and drop copy sessions
* Implement deduplication based on ExecID
* Handle out-of-order delivery

### 4. Error Recovery

* Handle all rejection codes appropriately
* Implement retry logic with delays
* Alert on persistent failures

## Comparison with Retransmission

| Feature          | Drop Copy            | Retransmission      |
| ---------------- | -------------------- | ------------------- |
| Session Type     | Separate             | Same as order entry |
| Sequence Numbers | Independent          | Original preserved  |
| Lookback Window  | 3 hours              | 3 hours             |
| Message Types    | ExecutionReport only | All types           |
| Use Case         | Recovery/Audit       | Real-time gaps      |

<Warning>
  All resent messages will have new FIX sequence numbers in the drop copy session, different from their original sequence numbers in the order entry session.
</Warning>


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt