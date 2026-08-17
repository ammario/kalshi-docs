---
url: https://docs.kalshi.com/getting_started/subaccounts
lastmod: 2026-08-16T23:46:21.438Z
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

## Restricted API keys

When generating an API key you can restrict it to a single subaccount. A
restricted key can only read and trade on that subaccount: order placement and
management, portfolio reads (balance, positions, fills, settlements), order
groups, and the full REST RFQ lifecycle — creating combo markets in
multivariate event collections, creating and cancelling RFQs, posting,
confirming, and cancelling quotes, and accepting quotes. Requests that omit
`subaccount` act on the key's locked subaccount, and naming any other
subaccount is rejected.

A restricted key cannot transfer funds, manage subaccounts or API keys, or
act on RFQs and quotes belonging to a different subaccount of the same
account. Subaccount-scoped requests match rows created through the API with
an explicit subaccount identity; RFQs created in the web app are not
addressable per subaccount. Endpoints outside its allowed set return
`403 this API key is restricted to a single sub-account and cannot access
this endpoint`. On FIX, restricted keys support order entry and the maker
quote lifecycle only — RFQ creation (35=R) and quote acceptance (35=UA) are
not available to restricted FIX sessions.
