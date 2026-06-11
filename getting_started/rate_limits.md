---
url: https://docs.kalshi.com/getting_started/rate_limits
lastmod: 2026-06-10T21:29:35.253Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Rate Limits and Tiers

> Token costs, tier budgets, and burst capacity for the Kalshi API

## Token-based limits

Every authenticated request costs **tokens**. Your tier sets your **budget**: the rate, in tokens per second, at which your balance refills. Your sustained rate for an endpoint is `budget ÷ cost`.

Most requests cost the default of **10 tokens**. For endpoints that cost more or less, [`GET /account/endpoint_costs`](/api-reference/account/list-non-default-endpoint-costs) is the authoritative list of non-default costs currently in effect.

## Read and Write buckets

You have two independent token budgets:

| Bucket    | Covers                                                                  |
| --------- | ----------------------------------------------------------------------- |
| **Read**  | `GET` endpoints and anything not routed to Write.                       |
| **Write** | Order placement, amends, cancels, order groups, and the RFQ quote flow. |

The split is by operation type, not by protocol. REST and FIX requests drain the same buckets.

## Bucket capacity and bursting

Each budget is a token bucket. The bucket refills continuously at your per-second budget, up to its capacity, and a request is allowed whenever the bucket holds enough tokens to cover its cost. There are no fixed windows and no per-second resets.

Write buckets above the Basic tier hold up to **two seconds of budget**. When you spend less than your budget, unspent tokens accumulate, and after two quiet seconds the bucket is full. You can then spend up to **twice your per-second budget in a single burst** before throttling back to the refill rate. This favors event-driven clients that sit idle most of the time and place a block of orders when the market moves.

Read buckets and Basic-tier Write buckets hold one second of budget. You can spend a full second's budget at once, but idle time banks nothing beyond that.

### Example

A Premier Write bucket refills at 1,000 tokens per second and holds up to 2,000. At the default cost of 10 tokens per order, it sustains 100 orders per second.

| Time      | Requests              | Bucket (capacity 2,000)                |
| --------- | --------------------- | -------------------------------------- |
| 2 s idle  | none                  | fills to 2,000                         |
| 0 s       | 200 orders at once    | all accepted; 2,000 drops to 0         |
| 0 to 1 s  | none                  | refills to 1,000                       |
| after 1 s | 100 orders per second | holds near 1,000; spend matches refill |

## When you hit the limit

A rate-limited request returns `429 Too Many Requests` with the body:

```json theme={null}
{"error": "too many requests"}
```

429 responses do not currently include `Retry-After` or `X-RateLimit-*` headers. There is no penalty or cooldown. The bucket keeps refilling, and your next request succeeds once the balance covers its cost. At a 1,000 tokens-per-second refill, a 10-token order is covered again 10 ms after a 429. Apply exponential backoff on 429.

## Batch endpoints don't save tokens

A batch request costs the same as making each call individually. Every item in the batch is billed separately:

* [Batch Create Orders](/api-reference/orders/batch-create-orders-v2): submitting 25 orders costs `25 × 10 = 250` tokens.
* [Batch Cancel Orders](/api-reference/orders/batch-cancel-orders-v2): cancelling 25 orders costs `25 × 2 = 50` tokens.

The whole batch must fit in the bucket at once. A 25-order create batch needs 250 tokens available when it arrives, or the entire batch is rejected.

## Perps limits use separate buckets

The Perps API uses the same tiers and the same bucket mechanics, including the two-second Write bucket above Basic, but perps traffic is metered in its own Read and Write buckets. Perps calls do not draw down your event-contract budgets, and event-contract calls do not draw down your perps budgets. In effect you have up to four independent buckets: event-contract Read, event-contract Write, perps Read, and perps Write.

Perps Write budgets match the table below at every tier. Perps Read budgets are higher at the lower tiers: 400 at Basic and 600 at Advanced, versus 200 and 300 for event contracts. From Premier up they are identical.

Check your perps tier and limits with [`GET /account/limits/perps`](/margin-rest/account/get-perps-account-api-limits), the perps counterpart of [`GET /account/limits`](/api-reference/account/get-account-api-limits).

See the [Perps API](/margin) overview for the full perps surface.

## Tiers and budgets

Per-second token budgets in each bucket:

<div style={{width: '100%', overflowX: 'auto'}}>
  <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '1rem'}}>
    <thead>
      <tr style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', borderBottom: '2px solid rgba(255, 255, 255, 0.1)'}}>
        <th style={{padding: '1rem 1.5rem', textAlign: 'left', fontWeight: '600'}}>Tier</th>
        <th style={{padding: '1rem 1.5rem', textAlign: 'right', fontWeight: '600'}}>Read budget</th>
        <th style={{padding: '1rem 1.5rem', textAlign: 'right', fontWeight: '600'}}>Write budget</th>
      </tr>
    </thead>

    <tbody>
      <tr><td style={{padding: '0.9rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>Basic</td><td style={{padding: '0.9rem 1.5rem', textAlign: 'right', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>200</td><td style={{padding: '0.9rem 1.5rem', textAlign: 'right', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>100</td></tr>
      <tr style={{backgroundColor: 'rgba(255, 255, 255, 0.02)'}}><td style={{padding: '0.9rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>Advanced</td><td style={{padding: '0.9rem 1.5rem', textAlign: 'right', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>300</td><td style={{padding: '0.9rem 1.5rem', textAlign: 'right', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>300</td></tr>
      <tr><td style={{padding: '0.9rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>Premier</td><td style={{padding: '0.9rem 1.5rem', textAlign: 'right', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>1,000</td><td style={{padding: '0.9rem 1.5rem', textAlign: 'right', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>1,000</td></tr>
      <tr style={{backgroundColor: 'rgba(255, 255, 255, 0.02)'}}><td style={{padding: '0.9rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>Paragon</td><td style={{padding: '0.9rem 1.5rem', textAlign: 'right', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>2,000</td><td style={{padding: '0.9rem 1.5rem', textAlign: 'right', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>2,000</td></tr>
      <tr><td style={{padding: '0.9rem 1.5rem'}}>Prime</td><td style={{padding: '0.9rem 1.5rem', textAlign: 'right'}}>4,000</td><td style={{padding: '0.9rem 1.5rem', textAlign: 'right'}}>4,000</td></tr>
    </tbody>
  </table>
</div>

Write bucket capacity is twice the per-second budget above the Basic tier.

## Tier qualification

* **Basic**: complete account signup.
* **Advanced**: call the [Upgrade Account API Usage Level endpoint](/api-reference/account/upgrade-account-api-usage-level).
* **Premier, Paragon, and Prime**: earned automatically from your trading volume (see [Earning higher tiers](#earning-higher-tiers-by-volume) below), or assigned by Kalshi.

<Info>
  Kalshi may, at its discretion, adjust your tier at any time, including downgrading you from higher tiers following prolonged inactivity. Members may request an upgrade by contacting support with a description of their use case.
</Info>

## Earning higher tiers by volume

Once a day, Kalshi reviews your trading volume and grants Premier, Paragon, or Prime if you qualify. Your **volume share** is your trailing 30-day volume (counting both sides of every trade you are part of, as maker and as taker) divided by twice the previous calendar month's total exchange volume:

`volume share = your trailing 30-day volume ÷ (previous month's exchange volume × 2)`

A qualifying review grants the tier for **30 days**, and each daily review renews the window while you keep qualifying. Each tier has a higher **Earn** threshold to gain it and a lower **Keep** threshold to hold it, so a brief dip does not cost you the tier:

| Tier    | Earn  | Keep  |
| ------- | ----- | ----- |
| Premier | 0.25% | 0.20% |
| Paragon | 0.50% | 0.40% |
| Prime   | 1.00% | 0.80% |

If your volume falls below the **Keep** threshold, the tier does not drop immediately. It lapses when your current 30-day grant runs out.

## Your grants

Your tier is the highest level among your active **grants**. Each grant raises you to a level on one lane, `event_contract` (predictions) or `margined` (perps), until it expires, and records its source:

* **`volume`**: earned automatically from your trading volume.
* **`manual`**: assigned by Kalshi.

Fetch your grants from [`GET /account/limits`](/api-reference/account/get-account-api-limits), returned alongside your current `usage_tier`:

```json theme={null}
{
  "usage_tier": "premier",
  "read":  { "refill_rate": 1000, "bucket_capacity": 1000 },
  "write": { "refill_rate": 1000, "bucket_capacity": 2000 },
  "grants": [
    { "exchange_instance": "event_contract", "level": "premier", "expires_ts": 1751558400, "source": "volume" },
    { "exchange_instance": "event_contract", "level": "advanced", "source": "manual" }
  ]
}
```

A grant with no `expires_ts` is permanent. You keep your best grant at each level: a longer-lived manual grant is never shortened by a volume grant, and if you qualify by volume while holding a manual grant near expiry, the grant is extended to a fresh 30 days.
