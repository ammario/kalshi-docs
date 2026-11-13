---
url: https://docs.kalshi.com/getting_started/rfqs
lastmod: 2026-11-13T00:53:49.915Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Request for Quote (RFQ)

> How the Kalshi RFQ system works

Kalshi implements an RFQ (Request for Quote) system for pre-execution communication between members. RFQs allow a requester to solicit quotes from market makers on a specific market and size. Execution follows a two-step lock: accept, then confirm.

RFQs are available on any market, including combo (multivariate event) markets. Combo markets are classified as High Volatility Markets (HVM), which have shorter timing windows (see [Timing](#timing)).

## Interfaces

RFQs are accessible over [REST](https://docs.kalshi.com/api-reference/communications), [FIX](https://docs.kalshi.com/fix/rfq-messages.md), and [WebSocket](https://docs.kalshi.com/websockets.md). Quote notifications arrive on the `communications` WebSocket channel, not the orderbook channel.

## Flow

1. **Requester** creates an RFQ specifying a market ticker, size, and whether to rest any remainder.
2. The RFQ is broadcast to all makers.
3. **Makers** respond with quotes containing a `yes_bid` and `no_bid`. Quotes are for the full RFQ size. Each quote is private between the requester and the individual maker. Makers cannot see each other's quotes.
4. **Requester** accepts one side of a quote. The exchange fills the earliest open quote at that quote's price on that side, so the requester gets the price and size it accepted. A maker that re-sends an unchanged price keeps its place in line on that side. The quote that fills can belong to a different maker than the one named, and its id arrives on `quote_accepted` and `quote_executed`. The named quote must still be open. On FIX, `PreferBetterQuote` (21022) fills the best-priced open quote instead, at its own price and size.
5. **Maker** whose quote is accepted confirms within the confirmation window. Once confirmed, neither party can withdraw.
6. After the execution timeout, orders are placed on the public book.

## Creator identity and privacy

Public communications IDs are pseudonymous identifiers derived from a user ID
with a salted hash. By default, makers see the requester's public communications
ID and can recognize it across RFQs.

Set `obscure_creator_id: true` when creating an RFQ over REST, or
`ObscureCreatorId` (`21034`) to `Y` in the FIX `NoRelatedSym` group, to hide that
identifier from other users.

Obscured creator fields display the shared placeholder
`e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.

The placeholder appears in these fields for other users:

| Surface | Field |
| - | - |
| REST RFQ responses before successful execution | `creator_id` |
| REST quote responses before successful execution | `rfq_creator_id` |
| WebSocket `rfq_created` and `rfq_deleted` | `creator_id` |
| WebSocket `quote_created` and `quote_accepted` | `rfq_creator_id` |
| FIX RFQ notifications | `PartyID` (`448`) inside `NoPartyIDs` (`453`) |

Creators still see their own normal ID. After successful quote execution, the
hashed RFQ creator identity will become visible. Subsequent REST RFQ responses
show the normal public communications ID to all viewers. The executed quote's
REST response and WebSocket `quote_executed` event also show that ID to its
participants.

## Sizing

When creating an RFQ, the requester specifies size in exactly one of:

* `contracts_fp`: number of contracts, including partial contracts in `0.01`-contract increments.
* `target_cost_dollars`: dollar amount to spend. The exchange derives a contract count from the quote price, returned as `yes_contracts_fp` / `no_contracts_fp` on the quote.

By default the target cost caps principal *plus* Kalshi fees: the derived
contract count is the maximum whose total cost including your taker fee fits
inside `target_cost_dollars`, so your debit can never exceed it. Set
`target_cost_excludes_fees: true` to size as principal only — the count becomes
`target_cost / price` and your taker fee is charged on top of the target cost.
`contracts_fp`-sized RFQs are never reduced for fees under either mode.

## Unaccepted RFQs

Makers price every RFQ they receive. If you create a large number of RFQs and
few of them end with an accepted quote, creating an RFQ can cost more tokens
than usual from your Write budget, so you reach `429` `too_many_requests`
sooner. The cost returns to normal as more of your RFQs end with an accepted
quote. See [Rate Limits and Tiers](https://docs.kalshi.com/getting_started/rate_limits.md) for how token
costs and budgets work.

## Quotes

Each quote has two prices: `yes_bid` (price per YES contract) and `no_bid` (price per NO contract). These are typically different. Either can be `"0"` to decline that side, but not both. Each bid must be below `$1`, and a quote with both bids above `$0.75` is rejected as a likely pricing mistake. These rejections return `invalid_parameters`.

Quoters do not specify a size. Each quote is implicitly for the full RFQ amount (`contracts_fp`, or whatever count `target_cost_dollars` resolves to at the quoted prices).

Quote prices use their own grid, not the market's `price_ranges`. Quotes on a single market must be in whole cents. Combo quotes use a finer grid: `$0.001` steps between `$0.01` and `$0.99`, and `$0.0001` steps below `$0.01` and above `$0.99`. A price off the grid returns `invalid_parameters`.

A new quote on the same RFQ replaces the maker's previous quote.

### Post-only quotes

If a confirmed quote is cancelled because the maker's
post-only order would cross the book at execution, that cancellation counts
toward the same quoting penalties as failing to confirm an accepted quote.
Repeated failures can temporarily rate limit the maker's ability to create new
quotes. While quoting is restricted, Create Quote returns `409`
`quote_timed_out`. The code does not mean a quote expired, and retrying right
away does not help. A temporary restriction clears by itself as the recent
failures age out. If the refusals persist, contact support.

## Timing

The exchange designates certain markets as High Volatility Markets (HVM). All combo markets are HVMs, and so are markets whose event ticker begins with `KXMLB`, `KXNBA` or `KXNFL`. HVMs use shorter confirmation and execution windows.

| | Standard | HVM |
| - | - | - |
| **Confirmation window** | 30 s | 3 s |
| **Execution timer** | 15 s | 1 s |

After acceptance, the maker has the confirmation window to confirm. Upon confirmation, the platform begins the execution timer. At the end of the timer, orders are entered into the book. Fills appear in `GET /portfolio/fills`. Match on `creator_order_id` (maker) or `rfq_creator_order_id` (requester).

An open RFQ is closed automatically about 3 hours after it was last updated, and its open quotes are cancelled. An RFQ with a confirmed quote is left to execute. The close arrives as `rfq_deleted` on the WebSocket channel.

## WebSocket

Subscribe to the `communications` channel (requires auth). `rfq_created` and `rfq_deleted` go to all subscribers. `quote_created`, `quote_accepted`, and `quote_executed` go only to the involved requester and maker. `quote_accepted` and `quote_executed` carry the id of the quote that executes, which can differ from the quote the requester named.

## Combos (MVE)

Combo RFQs include `mve_collection_ticker` and `mve_selected_legs`. Use [Multivariate Event Collections](https://docs.kalshi.com/api-reference/multivariate/get-multivariate-event-collections.md) to discover eligible combinations.

A combo market must exist before it can be quoted or traded. [Create Market In Multivariate Event Collection](https://docs.kalshi.com/api-reference/multivariate/create-market-in-multivariate-event-collection.md) creates it. When the same legs were created before, it returns the existing market instead, and that does not count toward your creation limit. The legs are checked again each time, so a selection that worked before can later return one of the `400` codes below, for example once a leg is no longer open for trading.

On the production API, the standard limit is 5,000 new combo markets per user per rolling 7 days, counted both across all collections and within each collection. The demo environment uses different limits. Over either limit, the endpoint returns `429` `too_many_requests`. Ordinary request-rate limiting returns the same status and code, so the response alone does not tell you which one you hit. Back off and retry as usual. A `429` that persists can still be either one, so compare your own count of new combos over the last 7 days against the limit. At the limit, creations free up as earlier ones pass the 7-day mark.

A leg selection the exchange will not combine returns `400` with one of these `code` values. Branch on `code`; `message` explains the specific conflict in words and can change, and `details` lists the legs involved when they are known.

| Code | What's going on |
| - | - |
| `conflicting_leg_outcomes` | Two legs cannot both resolve the way you selected |
| `duplicated_legs` | A leg is redundant: it repeats another leg or is already guaranteed by one |
| `invalid_market_combination` | The legs are not eligible to be combined |
| `invalid_parameters` | The request does not meet the collection's rules, such as the number of legs, or a leg is not open for trading |

## RFQ batch children

An RFQ batch requests quotes on several combos at once, for example every
parlay of a round robin. Each child of a batch is also an ordinary RFQ, with
`rfq_batch_id` set: it arrives as `rfq_created` on WebSocket and as a
`QuoteRequest` (`35=R`) on FIX, is listed by `GET /communications/rfqs`, and
closes with `rfq_deleted` (`35=AG`) unless you traded it. You can quote it
like any RFQ. Your quote competes with other makers' quotes on the batch, and
the requester accepts every child at once, each at its best quote.

A quote on a batch child differs from a quote on a single RFQ:

* It counts for 30 seconds after you send it. Resending an unchanged price
  keeps its time priority only within those 30 seconds.
* Nothing executes until every child's winning maker confirms. A confirmed
  quote can still close without a fill, as `batch closed`, if another winner
  doesn't confirm in time.
* Once accepted, it can't be cancelled. Not confirming it lapses with the same
  penalty as cancelling.
* `rfq_creator_id` on its messages and in its REST responses is the shared
  placeholder, and the requester never sees your quote before accepting.
* Your balance must cover every child you quote on one batch at once, on
  either side.
* Its `quote_id` comes back in lowercase, as the exchange stores it.

## Subaccounts

Requesters can create an RFQ under a numbered subaccount by passing
`subaccount` on `POST /communications/rfqs`. Makers can likewise pass
`subaccount` on `POST /communications/quotes`. Execution, fills, and
settlement follow the subaccount the RFQ or quote was created under.

The full REST RFQ lifecycle — including combo-market creation — is also
available to [subaccount-restricted API keys](https://docs.kalshi.com/getting_started/subaccounts.md#restricted-api-keys),
scoped to the key's locked subaccount. On FIX, restricted keys support the
maker quote lifecycle only.

## Common errors

These are the REST `code` values. FIX reports the same conditions in uppercase, for example `RFQ_CLOSED`.

| Error | What's going on |
| - | - |
| `400` `invalid_parameters` | Price not on a valid step, or a quote with both bids above `$0.75` |
| `409` `rfq_closed` | RFQ was deleted, expired, or already executed |
| `400` `expired` | The quote or RFQ is no longer in a state that allows this action |
| `400` `insufficient_balance` | Not enough funds for the trade |
| `409` `quote_timed_out` | Create Quote is refused because quoting is restricted for your account, usually temporarily after repeated unconfirmed quotes; see [Post-only quotes](#post-only-quotes) |
| `409 Conflict` | Open RFQ already exists on this market ticker |
| `429` `too_many_requests` | Usually your Write budget is exhausted. RFQ creation can cost more when few of your RFQs are accepted; see [Unaccepted RFQs](#unaccepted-rfqs). Creating an RFQ batch also returns this when you are at your open-batch limit and did not set `replace_existing`; retrying does not help until a batch closes |


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.