---
url: https://docs.kalshi.com/getting_started/subaccounts
lastmod: 2026-07-06T15:49:35.991Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Subaccounts

> Isolate balances and positions within a single Direct account

Subaccounts let a **Direct** account partition its balance and positions into
independent buckets under one set of API credentials. Every account has a
primary subaccount (number `0`) and may use numbered subaccounts `1`–`63`.

<Note>
  Subaccounts are currently an **API-only** feature — they are not yet supported in the
  Kalshi web or mobile app. Numbered-subaccount balances and positions are managed through
  the trade API.
</Note>

## Numbering

| Number   | Meaning                                  |
| -------- | ---------------------------------------- |
| `0`      | Primary subaccount (the default account) |
| `1`–`63` | User-managed numbered subaccounts        |

## Transfers

You can move value between your own subaccounts. Transfers net to zero at the
account level — nothing leaves your account.

| Type     | Endpoint                                         | Moves                   |
| -------- | ------------------------------------------------ | ----------------------- |
| Cash     | `POST /portfolio/subaccounts/transfer`           | Funds (in cents)        |
| Position | `POST /portfolio/subaccounts/positions/transfer` | An open market position |

Both are idempotent on a client-supplied `client_transfer_id`: retrying with the
same value returns `409` instead of applying the transfer twice.

### Position transfer pricing

`price` sets the per-contract cost basis on each subaccount and the
realized P\&L on the source. It is a
[fixed-point dollar string](/getting_started/fixed_point_migration) with 2–4
decimal places, so sub-penny prices like `"0.4050"` are supported. For example,
moving 100 YES contracts from subaccount 0 to 1:

| `price`  | Source                            | Destination                                 | Net |
| -------- | --------------------------------- | ------------------------------------------- | --- |
| `"0.40"` | closes 100 @ $0.40 (+$40 cash)    | opens 100 @ $0.40 (-$40 cash), basis \$0.40 | \$0 |
| `"0.60"` | closes 100 @ $0.60, realizes +$20 | opens 100 @ $0.60, basis $0.60              | \$0 |

The aggregate always nets to zero at the account level.

`price` is always the **YES-side** price, regardless of `side` — the same
convention as the rest of the API. Moving a NO position at `price` `"0.40"`
gives it a per-contract NO-side value of $1.00 − $0.40 = \$0.60; `side` describes
which side of the market the position is on, not how the price is expressed.

## Listing transfers

`GET /portfolio/subaccounts/transfers` returns both cash and position transfers,
paginated. Each row carries a `transfer_type` field (`cash` or `position`);
position rows additionally include `market_ticker`, `side`, `count`, and
`price` (the YES-side fixed-point dollar price).
