---
url: https://docs.kalshi.com/fix/drop-copy
lastmod: 2026-05-12T23:42:08.195Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Drop Copy Session

> Recover missed execution reports and query historical order events

<Warning>
  **This is not a traditional drop copy session.** Kalshi's Drop Copy uses a request-response pattern for querying historical execution reports. For a real-time streaming feed, use a [Listener Session](/fix/listener-sessions) on KalshiRT instead.
</Warning>

Lookback window is limited to the last 3 hours. Only ExecutionReport (35=8) messages are returned. Rejects and pending orders (ExecID `"-1;-1"`) are excluded.

<Note>
  Resent messages have new FIX sequence numbers, different from their original numbers on the order entry session. Use ExecID to reconcile.
</Note>

## EventResendRequest (35=U1)

Request execution reports within a specified ExecID range.

| Tag   | Name        | Description                                                      | Required |
| ----- | ----------- | ---------------------------------------------------------------- | -------- |
| 21001 | BeginExecID | Starting ExecID (inclusive)                                      | Yes      |
| 21002 | EndExecID   | Ending ExecID (inclusive). Defaults to latest ExecID if omitted. | No       |

**Example:**

```fix theme={null}
8=FIXT.1.1|35=U1|21001=12345;67890|21002=12350;67895|
```

## EventResendComplete (35=U2)

Sent after all requested events have been resent.

| Tag   | Name             | Description                         | Required |
| ----- | ---------------- | ----------------------------------- | -------- |
| 45    | RefSeqNum        | MsgSeqNum of the EventResendRequest | Yes      |
| 21003 | ResendEventCount | Total number of events resent       | Yes      |

## EventResendReject (35=U3)

Sent when a resend request cannot be fulfilled.

| Tag   | Name                    | Description                                                                                                                         | Required |
| ----- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 45    | RefSeqNum               | MsgSeqNum of the EventResendRequest                                                                                                 | Yes      |
| 21004 | EventResendRejectReason | Rejection code: `1`=Too many resend requests, `2`=Server error, `3`=BeginExecID too small (outside window), `4`=EndExecID too large | Yes      |
