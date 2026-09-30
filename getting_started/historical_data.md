---
url: https://docs.kalshi.com/getting_started/historical_data
lastmod: 2026-09-30T04:03:00.858Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Historical Data

> Accessing historical exchange data via the Kalshi API.

## Overview

As trading activity on Kalshi grows, so does the volume of settled markets, completed trades, and fulfilled orders. To keep the live API fast and responsive, Kalshi partitions exchange data into **live** and **historical** tiers.

Live endpoints return current and recent data: open and recently closed markets, active orders, and recent fills. Older data that is no longer actively referenced is made available through a separate set of historical endpoints.

This separation means older data can move from live endpoints to historical endpoints. For positions, the move happens after a buffered, whole-event handoff, so use both position endpoints for a complete history. The partitioning happens for **markets**, **market\_candlesticks**,
**trades**, **orders**, and **market\_positions**. Old **Events** and **Series** will always still be available through their original endpoints.

## How It Works

The archive publishes **cutoff timestamps** through `GET /historical/cutoff`. For positions, this is the backfill horizon, not the exact moment a copied position becomes visible in the historical API. A settled position can remain in the live data set while the safety buffer or a market in the same event prevents its handoff.

The cutoff timestamps will be regularly updated, advancing forward over time. Each data type has its own cutoff and the windows differ, so read the field for the data you need rather than assuming one shared window.

## Cutoff Timestamps

| Field | Partitioned By | Meaning |
| - | - | - |
| `market_settled_ts` | Market settlement time | Markets and their candlesticks that settled before this timestamp are only available via `GET /historical/markets` |
| `trades_created_ts` | Trade fill time | Trades that occurred before this timestamp are only available via `GET /historical/trades`. User fills are only available via `GET /historical/fills` |
| `orders_updated_ts` | Order cancellation or execution time | Orders canceled or fully executed before this timestamp are only available via `GET /historical/orders` |
| `market_positions_last_updated_ts` | Position last-update time | Backfill horizon for settled positions. A position becomes visible in `GET /historical/positions` only after its event completes the live-to-historical handoff. Until then, read it with `GET /portfolio/positions?settlement_status=settled`, even if its last update predates this timestamp. |

<Note>
  Resting (active) orders are unaffected and always appear in `GET /portfolio/orders`, regardless of the cutoff. Unsettled positions always appear in `GET /portfolio/positions`. That endpoint defaults to unsettled positions; set `settlement_status=settled` for settled positions still live, or `settlement_status=all` for both live states.
</Note>

## Historical Endpoints

| Endpoint | Description |
| - | - |
| `GET /historical/cutoff` | Returns the current cutoff timestamps |
| `GET /historical/markets` | Settled markets older than the cutoff |
| `GET /historical/markets/{ticker}` | Single historical market by ticker |
| `GET /historical/markets/{ticker}/candlesticks` | Candlestick data for historical markets |
| `GET /historical/trades` | All trades older than the cutoff |
| `GET /historical/fills` | User-scoped trade fills older than the cutoff |
| `GET /historical/orders` | Canceled/executed orders older than the cutoff |
| `GET /historical/positions` | User-scoped settled positions archived from the live data set |

## Impacted Live Endpoints

The following live endpoints stop returning records after those records move to historical storage:

| Live Endpoint | Cutoff Field | Impact |
| - | - | - |
| `GET /markets`, `GET /markets/{ticker}` | `market_settled_ts` | Settled markets and their candlesticks older than the cutoff will not appear |
| `GET /events` with `with_nested_markets=true` | `market_settled_ts` | Nested markets older than the cutoff will not be included, only markets impacted |
| `GET /markets/trades` | `trades_created_ts` | Trades older than the cutoff will not appear |
| `GET /portfolio/fills` | `trades_created_ts` | Fills older than the cutoff will not appear |
| `GET /portfolio/orders` | `orders_updated_ts` | Completed/canceled orders older than the cutoff will not appear (resting orders are unaffected) |
| `GET /portfolio/positions` | `market_positions_last_updated_ts` | Defaults to unsettled positions. Use `settlement_status=settled` or `all` to include settled positions still live; archived positions appear only in `GET /historical/positions`. |

## Migration Guide

1. **Fetch the cutoff**: call `GET /historical/cutoff` to get the current timestamps.
2. **Route queries accordingly**: for positions, query both `GET /portfolio/positions?settlement_status=all&subaccount=<number>` and `GET /historical/positions?subaccount=<number>`. The positions endpoints default to subaccount 0, so repeat for each subaccount you need.
3. **Combine results if needed**: for positions, page through the live endpoint first, then the historical endpoint. Positions move in that direction during archival, so this order reduces the chance of missing a row that moves between reads. The two reads are not one snapshot: deduplicate by subaccount and ticker, and repeat reconciliation near the handoff if exact completeness matters. An overlap can persist until a handoff retry if the job stops after making the historical copy visible. For fills and other partitioned records, query the corresponding live and historical endpoints.

`GET /portfolio/settlements` reads only settled positions still in the live data set. After archival, `GET /historical/positions` provides position, realized P\&L, and fee data, but there is currently no historical endpoint with the same settlement-record fields.

<Info>
  The historical endpoints support the same [cursor-based pagination](/getting_started/pagination) as their live counterparts.
</Info>
