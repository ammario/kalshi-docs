---
url: https://docs.kalshi.com/fix-margin/drop-copy
lastmod: 2026-09-14T18:17:55.114Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Drop Copy Session

> Recover missed margin execution reports and query historical order events

<Warning>
  **This is not a traditional drop copy session.** Kalshi's Drop Copy uses a request-response pattern for querying historical execution reports. For a real-time streaming feed, use a [Listener Session](/fix-margin/listener-sessions) on KalshiRT instead.
</Warning>

<Note>
  Historical execution-report replay through EventResendRequest (35=U1) requires allowlisting for your user account on both `KalshiNR` and `KalshiDC` sessions. Contact [institutional@kalshi.com](mailto:institutional@kalshi.com) to request access. Requests from accounts that are not allowlisted are rejected with EventResendReject (35=U3), reason `5` (NOT\_ENABLED). Allowlisting does not backfill earlier events.
</Note>

Lookback window is limited to the last 3 hours. Only ExecutionReport (35=8) messages are returned. Rejects and pending orders (ExecID `"-1;-1"`) are excluded.

<Note>
  Resent messages have new FIX sequence numbers, different from their original numbers on the trading session. Use ExecID to reconcile.
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

| Tag   | Name                    | Description                                                                                                                                                                         | Required |
| ----- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 45    | RefSeqNum               | MsgSeqNum of the EventResendRequest                                                                                                                                                 | Yes      |
| 21004 | EventResendRejectReason | Rejection code: `1`=Too many resend requests, `2`=Server error, `3`=BeginExecID too small (outside window), `4`=EndExecID too large, `5`=User not allowlisted for historical replay | Yes      |
