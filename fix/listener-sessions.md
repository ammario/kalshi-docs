---
url: https://docs.kalshi.com/fix/listener-sessions
lastmod: 2026-04-08T18:36:44.117Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Listener Sessions

> Real-time read-only feed of execution reports from your trading session

# Listener Sessions

## Overview

A listener session provides a **real-time, read-only stream** of execution reports from your trading session. This is what most exchanges refer to as a "drop copy": a live shadow feed of all fills and order state changes.

<Tip>
  **Coming from another exchange?** If you're looking for a traditional drop copy session (a real-time streaming feed of your execution reports), this is the session type you want. Kalshi's [Drop Copy session](/fix/drop-copy) (KalshiDC) is a separate request-response tool for querying historical execution reports, not a live feed.
</Tip>

## How It Works

A listener session is not a separate endpoint. It is a **mode** enabled on a standard KalshiNR or KalshiRT order entry session by setting `ListenerSession=Y` (tag 20126) during Logon.

Once connected, the listener session receives the same execution reports as your active trading session in real time, but **cannot send any orders or modifications**.

## Connection Details

Use the same endpoints as order entry sessions:

| Environment | Host                     | Ports        | TargetCompID         |
| ----------- | ------------------------ | ------------ | -------------------- |
| Production  | fix.elections.kalshi.com | 8228 or 8230 | KalshiNR or KalshiRT |
| Demo        | fix.demo.kalshi.co       | 8228 or 8230 | KalshiNR or KalshiRT |

<Note>
  Each API key supports a single connection. You will need a **separate API key** for the listener session, distinct from your trading session's API key. Listener sessions only require **read** scope on the API key, so you can create a read-only key for this purpose.
</Note>

## Logon Configuration

### Required Logon Fields

| Tag   | Name                   | Value | Description                     |
| ----- | ---------------------- | ----- | ------------------------------- |
| 20126 | ListenerSession        | Y     | Enables listen-only mode        |
| 21011 | SkipPendingExecReports | Y     | Required when ListenerSession=Y |

### Restrictions

The following Logon flags are **not compatible** with listener sessions:

| Tag  | Name                     | Restriction            |
| ---- | ------------------------ | ---------------------- |
| 8013 | CancelOrdersOnDisconnect | Must be N (or omitted) |

### Example Logon

```fix  theme={null}
8=FIXT.1.1|35=A|98=0|108=30|1137=9|20126=Y|21011=Y|96=<signature>|
```

## What You Receive

Listener sessions receive **ExecutionReport (35=8)** messages for all order activity on your account, including:

* New order acknowledgements
* Fills and partial fills
* Order cancellations
* Order replacements

## What You Cannot Do

Listener sessions are strictly read-only. The following message types will be **rejected**:

* NewOrderSingle (35=D)
* OrderCancelRequest (35=F)
* OrderCancelReplaceRequest (35=G)
* OrderMassCancelRequest (35=q)
* QuoteRequest / RFQ creation
* Quote acceptance

## Choosing Between KalshiNR and KalshiRT

| Feature                  | Listener on KalshiNR | Listener on KalshiRT       |
| ------------------------ | -------------------- | -------------------------- |
| Retransmission support   | No                   | Yes (ResendRequest 35=2)   |
| ResetSeqNumFlag required | Yes (always)         | No                         |
| Message retention        | None                 | 24-72 hours (configurable) |

<Info>
  **Recommendation:** Use KalshiRT for listener sessions when possible. The retransmission support allows you to recover any missed messages after a disconnect without needing a separate Drop Copy session.
</Info>

## Comparison with Drop Copy

|                     | Listener Session                           | Drop Copy (KalshiDC)        |
| ------------------- | ------------------------------------------ | --------------------------- |
| **Delivery**        | Real-time streaming (push)                 | Request-response (pull)     |
| **Endpoint**        | KalshiNR or KalshiRT (with flag)           | KalshiDC (separate session) |
| **Use case**        | Live monitoring, surveillance, backup feed | Historical recovery, audit  |
| **Lookback**        | Inherits from session type                 | 3 hours                     |
| **Custom messages** | None                                       | EventResendRequest (35=U1)  |

## Use Cases

* **Real-time trade surveillance**: Monitor fills as they happen without risk of accidental order submission
* **Backup execution feed**: Maintain a second connection that tracks all activity in case your primary session drops
* **Compliance recording**: Stream execution reports to a compliance system in real time
* **Read-only access**: Provide monitoring access to team members who should not have trading permissions


Built with [Mintlify](https://mintlify.com).