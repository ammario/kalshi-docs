---
url: https://docs.kalshi.com/fix/listener-sessions
lastmod: 2026-04-30T03:43:38.582Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Listener Sessions

> Real-time read-only feed of execution reports from your trading session

## Overview

A listener session provides a **real-time, read-only stream** of execution reports from your trading session. This is what most exchanges refer to as a "drop copy": a live shadow feed of all fills and order state changes. Kalshi's [Drop Copy session](/fix/drop-copy) (KalshiDC) is a separate request-response tool for querying historical execution reports, not a live feed.

## How It Works

A listener session is not a separate endpoint. It is a **mode** enabled on a standard KalshiNR or KalshiRT order entry session by setting `ListenerSession=Y` (tag 20126) during Logon.

Once connected, the listener session receives the same execution reports as your active trading session in real time, but **cannot send any orders or modifications**.

Listener sessions connect to the same KalshiNR or KalshiRT endpoints listed on the [Connectivity](/fix/connectivity) page. A **separate API key** is required (read-only scope is sufficient).

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

**Example Logon:**

```fix theme={null}
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
