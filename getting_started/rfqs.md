---
url: https://docs.kalshi.com/getting_started/rfqs
lastmod: 2026-05-11T23:41:35.413Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Request for Quote (RFQ)

> How the Kalshi RFQ system works

Kalshi implements an RFQ (Request for Quote) system for pre-execution communication between members. RFQs allow a requester to solicit quotes from market makers on a specific market and size. Execution follows a two-step lock: accept, then confirm.

RFQs are available on any market, including combo (multivariate event) markets. Combo markets are classified as High Volatility Markets (HVM), which have shorter timing windows — see [Timing](#timing).

## Interfaces

RFQs are accessible over [REST](/api-reference/communications), [FIX](/fix/rfq-messages), and [WebSocket](/websockets). Quote notifications arrive on the `communications` WebSocket channel, not the orderbook channel.

## Flow

1. **Requester** creates an RFQ specifying a market ticker, size, and whether to rest any remainder.
2. The RFQ is broadcast to all makers.
3. **Makers** respond with quotes containing a `yes_bid` and `no_bid`. Quotes are for the full RFQ size. Each quote is private between the requester and the individual maker — makers cannot see each other's quotes.
4. **Requester** accepts one side of the best-priced quote.
5. **Maker** confirms within the confirmation window. Once confirmed, neither party can withdraw.
6. After the execution timeout, orders are placed on the public book.

## Sizing

When creating an RFQ, the requester specifies size in exactly one of:

* `contracts_fp` — number of contracts (whole only).
* `target_cost_dollars` — dollar amount to spend. The exchange derives a contract count from the quote price, returned as `yes_contracts_fp` / `no_contracts_fp` on the quote.

## Quotes

Each quote has two prices: `yes_bid` (price per YES contract) and `no_bid` (price per NO contract). These are typically different. Either can be `"0"` to decline that side, but not both. If `yes_bid + no_bid > $1` the quote is rejected.

Quoters do not specify a size — each quote is implicitly for the full RFQ amount (`contracts_fp`, or whatever count `target_cost_dollars` resolves to at the quoted prices).

Prices must land on the market's price grid. Check `price_ranges` on `GET /markets/{ticker}` for the valid step size.

A new quote on the same RFQ replaces the maker's previous quote.

## Timing

The exchange designates certain markets as High Volatility Markets (HVM). All combo markets are HVMs. HVMs use shorter confirmation and execution windows.

|                         | Standard | HVM |
| ----------------------- | -------- | --- |
| **Confirmation window** | 30 s     | 3 s |
| **Execution timer**     | 15 s     | 1 s |

After acceptance, the maker has the confirmation window to confirm. Upon confirmation, the platform begins the execution timer. At the end of the timer, orders are entered into the book. Fills appear in `GET /portfolio/fills` — match on `creator_order_id` (maker) or `rfq_creator_order_id` (requester).

## WebSocket

Subscribe to the `communications` channel (requires auth). `rfq_created` and `rfq_deleted` go to all subscribers. `quote_created`, `quote_accepted`, and `quote_executed` go only to the involved requester and maker.

## Combos (MVE)

Combo RFQs include `mve_collection_ticker` and `mve_selected_legs`. Use [Multivariate Event Collections](/api-reference/multivariate/get-multivariate-event-collections) to discover eligible combinations.

## Common errors

| Error                  | What's going on                                  |
| ---------------------- | ------------------------------------------------ |
| `invalid_parameters`   | Price not on a valid step, or RFQ already closed |
| `RFQ_CLOSED`           | RFQ was deleted, expired, or already executed    |
| `INSUFFICIENT_BALANCE` | Not enough funds for the trade                   |
| `409 Conflict`         | Open RFQ already exists on this market ticker    |
