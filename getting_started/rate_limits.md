---
url: https://docs.kalshi.com/getting_started/rate_limits
lastmod: 2026-10-20T18:50:46.788Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Rate Limits and Tiers

> Token costs, tier budgets, and burst capacity for the Kalshi API

## Token-based limits

Every authenticated request costs **tokens**. Your tier sets your **budget**: the rate, in tokens per second, at which your balance refills. Your sustained rate for an endpoint is `budget ÷ cost`.

Most requests cost the default of **10 tokens**. For endpoints that cost more or less, [`GET /account/endpoint_costs`](https://docs.kalshi.com/api-reference/account/list-non-default-endpoint-costs) is the authoritative list of non-default costs currently in effect.

## Read and Write buckets

You have two independent token budgets:

| Bucket | Covers |
| - | - |
| **Read** | `GET` endpoints and anything not routed to Write. |
| **Write** | Order placement, amends, cancels, order groups, the RFQ quote flow, and block trade proposal accepts. |

The split is by operation type, not by protocol. REST and FIX requests drain the same buckets.

## Balance endpoint bucket

[`GET /portfolio/balance`](https://docs.kalshi.com/api-reference/portfolio/get-balance) is metered in its own bucket and does not draw down the Read budget. Basic and Advanced tiers can call it **once per second**; every higher tier can call it **five times per second**. The bucket holds one second of budget, so there is no burst. Balance only changes on fills, settlements and transfers, so react to those (for example the [user fills websocket channel](https://docs.kalshi.com/websockets/user-fills.md)) rather than polling balance.

## Predictions per-shard Write budgets

A single order write that explicitly targets an [exchange shard](https://docs.kalshi.com/getting_started/exchange_sharding.md) draws from a Write bucket scoped to that shard, and each shard's bucket carries your full tier budget:

* **Single REST** order creates, cancels, decreases, and amends: `exchange_index >= 1` is billed to that shard's Write bucket. Shard 0 traffic (`exchange_index: 0`) bills your unscoped Write bucket. Auto-routed traffic (`exchange_index: -1`, or omitted when `market_ticker` is provided) is billed to every shard's Write bucket.
* **FIX** New Order Single (35=D), Order Cancel Request (35=F), and Order Cancel/Replace Request (35=G): `ExDestination` (tag 100) with a value `>= 1` is billed to that shard's Write bucket. Messages without tag 100, or with `0` or `-1`, are billed to your unscoped Write bucket.
* **RFQ and quote writes** across REST and FIX bill the shard 1 Write bucket, sharing its budget with shard 1 order writes. This includes RFQ and quote creation/cancellation, quote acceptance/confirmation, and FIX New Order Single (`35=D`) carrying `QuoteID`. No `exchange_index` or `ExDestination` is required.
* **Batch REST** creates and cancels always bill their total per-order cost to your unscoped Write bucket, regardless of `exchange_index`.

Read budgets are not shard-scoped.

## Bucket capacity and bursting

Each budget is a token bucket. The bucket refills continuously at your per-second budget, up to its capacity, and a request is allowed whenever the bucket holds enough tokens to cover its cost. There are no fixed windows and no per-second resets.

Basic and Advanced Predictions Read buckets, and Write buckets above the Basic tier, hold up to **three seconds of budget**. When you spend less than your budget, unspent tokens accumulate, and after three quiet seconds the bucket is full. You can then spend up to **three times your per-second budget in a single burst** before throttling back to the refill rate. This favors event-driven clients that sit idle most of the time and place a block of orders when the market moves.

Predictions Read buckets above Advanced, Perps Read buckets, and Basic-tier Write buckets hold one second of budget. You can spend a full second's budget at once, but idle time banks nothing beyond that.

### Example

A Premier Predictions Write bucket refills at 1,200 tokens per second and holds up to 3,600. At the default cost of 10 tokens per order, it sustains 120 orders per second.

| Time | Requests | Bucket (capacity 3,600) |
| - | - | - |
| 3 s idle | none | fills to 3,600 |
| 0 s | 360 orders at once | all accepted; 3,600 drops to 0 |
| 0 to 1 s | none | refills to 1,200 |
| after 1 s | 120 orders per second | holds near 1,200; spend matches refill |

## When you hit the limit

A rate-limited request returns `429 Too Many Requests` with the body:

```json theme={null}
{"error": "too many requests"}
```

429 responses do not currently include `Retry-After` or `X-RateLimit-*` headers. There is no penalty or cooldown. The bucket keeps refilling, and your next request succeeds once the balance covers its cost. At a 1,200 tokens-per-second refill, an empty bucket replenishes the 10 tokens for an order in about 8.3 ms. Apply exponential backoff on 429.

## Batch endpoints don't save tokens

A batch request costs the same as making each call individually. Every item in the batch is billed separately:

* [Batch Create Orders](https://docs.kalshi.com/api-reference/orders/batch-create-orders-v2.md): submitting 25 orders costs `25 × 10 = 250` tokens.
* [Batch Cancel Orders](https://docs.kalshi.com/api-reference/orders/batch-cancel-orders-v2.md): cancelling 25 orders costs `25 × 2 = 50` tokens.

The whole batch must fit in the bucket at once. A 25-order create batch needs 250 tokens available when it arrives, or the entire batch is rejected.

## Perps limits use separate buckets

Perps traffic is metered in its own Read and Write buckets. Above Basic, Perps Write buckets hold three seconds of budget across REST and FIX. Perps calls do not draw down your event-contract budgets, and event-contract calls do not draw down your perps budgets. Each exchange has its own Read budget and Write budgets. See [Perps budgets](#perps-budgets) for per-tier perps budgets.

Single-order Perps creates and amends use a Write budget per margin shard, with your full perps tier budget on each shard. The API and FIX share these budgets.

* The API selects the shard automatically from the required `ticker`.
* FIX selects the shard from `Symbol` (tag 55) for New Order Single and Order Cancel/Replace Request.
* If ticker is empty, omitted, or its shard cannot be resolved, the request consumes its full token cost from the default margin Write budget.

Single-order Perps API cancels and decreases, and FIX Order Cancel Requests, cost **1 token** each from the default margin Write budget, regardless of the market's shard.

Shard 0 uses the unscoped margin Write budget. API v1 and other operations, including order groups and scheduled orders, continue to use that unscoped budget. Read budgets are not shard-scoped.

Check your perps tier and limits with [`GET /account/limits/perps`](https://docs.kalshi.com/margin-rest/account/get-perps-account-api-limits), the perps counterpart of [`GET /account/limits`](https://docs.kalshi.com/api-reference/account/get-account-api-limits).

See the [Perps API](https://docs.kalshi.com/margin.md) overview for the full perps surface.

## Tiers and budgets

### Predictions budgets

Per-second token budgets in each event-contract bucket:

<table>
  <thead>
    <tr>
      <th>Tier</th>
      <th>Read budget</th>
      <th>Write budget</th>
    </tr>
  </thead>

  <tbody>
    <tr><td>Basic</td><td>200</td><td>100</td></tr>
    <tr><td>Advanced</td><td>300</td><td>300</td></tr>
    <tr><td>Expert</td><td>600</td><td>600</td></tr>
    <tr><td>Premier</td><td>1,200</td><td>1,200</td></tr>
    <tr><td>Paragon</td><td>2,400</td><td>2,400</td></tr>
    <tr><td>Prime</td><td>4,800</td><td>4,800</td></tr>
    <tr><td>Prestige</td><td>12,000</td><td>9,600</td></tr>
  </tbody>
</table>

Write bucket capacity is three times the per-second budget above the Basic tier.

### Perps budgets

Per-second token budgets in each perps bucket:

<table>
  <thead>
    <tr>
      <th>Tier</th>
      <th>Read budget</th>
      <th>Write budget</th>
    </tr>
  </thead>

  <tbody>
    <tr><td>Basic</td><td>400</td><td>100</td></tr>
    <tr><td>Advanced</td><td>600</td><td>300</td></tr>
    <tr><td>Expert</td><td>600</td><td>600</td></tr>
    <tr><td>Premier</td><td>1,000</td><td>1,000</td></tr>
    <tr><td>Paragon</td><td>2,000</td><td>2,000</td></tr>
    <tr><td>Prime</td><td>4,000</td><td>4,000</td></tr>
    <tr><td>Prestige</td><td>6,000</td><td>8,000</td></tr>
  </tbody>
</table>

Perps Write bucket capacity is three times the per-second budget above the Basic tier. Perps Read buckets hold one second of budget.

## Tier qualification

* **Basic**: complete account signup.
* **Advanced**: call the [Upgrade Account API Usage Level endpoint](https://docs.kalshi.com/api-reference/account/upgrade-account-api-usage-level.md).
* **Expert, Premier, Paragon, Prime, and Prestige**: earned automatically from your trading volume (see [Earning higher tiers](#earning-higher-tiers-by-volume) below), or assigned by Kalshi.

## Earning higher tiers by volume

Once a day, Kalshi reviews your trading volume and grants Expert, Premier, Paragon, Prime, or Prestige if you qualify. Your **volume share** is your trailing 30-day volume (counting both sides of every trade you are part of, as maker and as taker) divided by twice the previous calendar month's total exchange volume:

`volume share = your trailing 30-day volume ÷ (previous month's exchange volume × 2)`

A qualifying review grants the tier for **30 days**, and each daily review renews the window while you keep qualifying. Each tier has a higher **Earn** threshold to gain it and a lower **Keep** threshold to hold it, so a brief dip does not cost you the tier:

| Tier | Earn | Keep |
| - | - | - |
| Expert | 0.075% | 0.05% |
| Premier | 0.125% | 0.10% |
| Paragon | 0.25% | 0.20% |
| Prime | 0.50% | 0.40% |
| Prestige | 1.00% | 0.80% |

If your volume falls below the **Keep** threshold, the tier does not drop immediately. It lapses when your current 30-day grant runs out.

## Your grants

Your tier is the highest level among your active **grants**. Each grant raises you to a level on one lane, `event_contract` (predictions) or `margined` (perps), until it expires, and records its source:

* **`volume`**: earned automatically from your trading volume.
* **`manual`**: assigned by Kalshi.

Fetch your grants from [`GET /account/limits`](https://docs.kalshi.com/api-reference/account/get-account-api-limits), returned alongside your current `usage_tier`:

```json theme={null}
{
  "usage_tier": "premier",
  "read":  { "refill_rate": 1200, "bucket_capacity": 1200 },
  "write": { "refill_rate": 1200, "bucket_capacity": 3600 },
  "grants": [
    { "exchange_instance": "event_contract", "level": "premier", "expires_ts": 1751558400, "source": "volume" },
    { "exchange_instance": "event_contract", "level": "advanced", "source": "manual" }
  ]
}
```

A grant with no `expires_ts` is permanent. You keep your best grant at each level: a longer-lived manual grant is never shortened by a volume grant, and if you qualify by volume while holding a manual grant near expiry, the grant is extended to a fresh 30 days.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.