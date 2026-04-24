---
url: https://docs.kalshi.com/getting_started/rate_limits
lastmod: 2026-04-24T03:02:39.471Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Rate Limits and Tiers

> Understanding API rate limits, token costs, and access tiers

## Token-based limits

Every authenticated request costs **tokens**. Your tier defines how many tokens you can spend per second. Most requests cost the default of **10 tokens**; each operation's API reference page lists its cost where it differs (order cancellations, single-order reads, quote create/cancel, and multivariate-collection lookup are currently cheaper than the default).

Your effective rate for any given endpoint is `budget ÷ cost`.

## Reads and writes are billed separately

You have two independent token budgets:

| Bucket    | What it covers                                                          |
| --------- | ----------------------------------------------------------------------- |
| **Read**  | `GET` endpoints and anything not explicitly routed elsewhere.           |
| **Write** | Order placement, amends, cancels, order groups, and the RFQ quote flow. |

## Batch endpoints don't save tokens

A batch request costs the same as making each call individually — every item in the batch is billed separately:

* [Batch Create Orders](/api-reference/orders/batch-create-orders): submitting 25 orders costs `25 × 10 = 250` tokens.
* [Batch Cancel Orders](/api-reference/orders/batch-cancel-orders): cancelling 25 orders costs `25 × 2 = 50` tokens.

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

## Tier qualification

* **Basic**: complete account signup.
* **Advanced**: complete the [Advanced API application](https://kalshi.typeform.com/advanced-api).
* **Premier, Paragon, Prime**: qualification criteria will be published shortly.

<Info>
  Kalshi may, at its discretion, adjust your tier at any time — including downgrading you from higher tiers following prolonged inactivity. Members may request an upgrade by contacting support with a description of their use case.
</Info>

## When you hit the limit

A rate-limited request returns `429 Too Many Requests` with the body:

```json theme={null}
{"error": "too many requests"}
```

429 responses don't currently include `Retry-After` or `X-RateLimit-*` headers. Apply exponential backoff on 429 until your bucket refills.

## Bursting above your per-second budget

Your Write bucket holds **two seconds** of your per-second budget — so idle or below-steady traffic builds up headroom you can spend in a single burst. Useful for event-driven clients reacting quickly to market moves or price prints. Each request drains the bucket by its token cost; the bucket refills continuously at your per-second budget up to its capacity.

Over-drawing returns `429 Too Many Requests`. There's no enforced cooldown — your next request is allowed as soon as the bucket has enough tokens to cover it.

Basic tier is the exception — its Write bucket holds one second of budget, with no accumulated headroom.
