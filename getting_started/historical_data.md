---
url: https://docs.kalshi.com/getting_started/historical_data
lastmod: 2026-04-07T18:48:39.517Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Historical Data

> Accessing historical exchange data via the Kalshi API.

## Overview

As trading activity on Kalshi grows, so does the volume of settled markets, completed trades, and fulfilled orders. To keep the live API fast and responsive, Kalshi partitions exchange data into **live** and **historical** tiers.

Live endpoints return current and recent data — open and recently closed markets, active orders, and recent fills. Older data that is no longer actively referenced is made available through a separate set of historical endpoints.

This separation means that if you query for data that is older than the cutoff (described below), you'll need to use the historical API instead of the standard live endpoints. The partitioning happens for **markets**, **market\_candlesticks**,
**trades**, and **orders**. Old **Events** and **Series** will always still be available through their original endpoints.

## How It Works

The boundary between live and historical data is defined by a set of **cutoff timestamps**, which you can retrieve at any time via `GET /historical/cutoff`. Any record older than the relevant cutoff must be queried through the corresponding historical endpoint.

The cutoff timestamps will be regularly updated, advancing forward over time. The target window for live data is **3 months**.

## Cutoff Timestamps

| Field               | Partitioned By                       | Meaning                                                                                                                                               |
| ------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `market_settled_ts` | Market settlement time               | Markets and their candlesticks that settled before this timestamp are only available via `GET /historical/markets`                                    |
| `trades_created_ts` | Trade fill time                      | Trades that occurred before this timestamp are only available via `GET /historical/trades`. User fills are only available via `GET /historical/fills` |
| `orders_updated_ts` | Order cancellation or execution time | Orders canceled or fully executed before this timestamp are only available via `GET /historical/orders`                                               |

<Note>
  Resting (active) orders are unaffected and always appear in `GET /portfolio/orders`, regardless of the cutoff.
</Note>

## Historical Endpoints

| Endpoint                                        | Description                                    |
| ----------------------------------------------- | ---------------------------------------------- |
| `GET /historical/cutoff`                        | Returns the current cutoff timestamps          |
| `GET /historical/markets`                       | Settled markets older than the cutoff          |
| `GET /historical/markets/{ticker}`              | Single historical market by ticker             |
| `GET /historical/markets/{ticker}/candlesticks` | Candlestick data for historical markets        |
| `GET /historical/trades`                        | All trades older than the cutoff               |
| `GET /historical/fills`                         | User-scoped trade fills older than the cutoff  |
| `GET /historical/orders`                        | Canceled/executed orders older than the cutoff |

## Impacted Live Endpoints

The following live endpoints will no longer return data older than the corresponding cutoff:

| Live Endpoint                                 | Cutoff Field        | Impact                                                                                          |
| --------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------- |
| `GET /markets`, `GET /markets/{ticker}`       | `market_settled_ts` | Settled markets and their candlesticks older than the cutoff will not appear                    |
| `GET /events` with `with_nested_markets=true` | `market_settled_ts` | Nested markets older than the cutoff will not be included, only markets impacted                |
| `GET /markets/trades`                         | `trades_created_ts` | Trades older than the cutoff will not appear                                                    |
| `GET /portfolio/fills`                        | `trades_created_ts` | Fills older than the cutoff will not appear                                                     |
| `GET /portfolio/orders`                       | `orders_updated_ts` | Completed/canceled orders older than the cutoff will not appear (resting orders are unaffected) |

## Migration Guide

1. **Fetch the cutoff** — call `GET /historical/cutoff` to get the current timestamps.
2. **Route queries accordingly** — if the data you need is older than the relevant cutoff, use the corresponding `GET /historical/...` endpoint instead.
3. **Combine results if needed** — for use cases like building a complete fill history, query both the live and historical endpoints and merge the results.

<Info>
  The historical endpoints support the same [cursor-based pagination](/getting_started/pagination) as their live counterparts.
</Info>
