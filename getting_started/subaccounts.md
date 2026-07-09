---
url: https://docs.kalshi.com/getting_started/subaccounts
lastmod: 2026-07-08T17:15:27.336Z
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

You can move cash between your own subaccounts with
`POST /portfolio/subaccounts/transfer` (amounts in cents). Transfers net to
zero at the account level — nothing leaves your account.

Transfers are idempotent on a client-supplied `client_transfer_id`: retrying
with the same value returns `409` instead of applying the transfer twice.

## Listing transfers

`GET /portfolio/subaccounts/transfers` returns your subaccount transfers,
paginated.
