---
url: https://docs.kalshi.com/getting_started/rate_limits
lastmod: 2026-01-24T01:03:13.044Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Rate Limits and Tiers

> Understanding API rate limits and access tiers

## Access tiers

<div style={{width: '100%', overflowX: 'auto'}}>
  <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '1rem'}}>
    <thead>
      <tr style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', borderBottom: '2px solid rgba(255, 255, 255, 0.1)'}}>
        <th style={{padding: '1.25rem 3rem', textAlign: 'left', fontWeight: '600'}}>Tier</th>
        <th style={{padding: '1.25rem 3rem', textAlign: 'left', fontWeight: '600'}}>Read</th>
        <th style={{padding: '1.25rem 3rem', textAlign: 'left', fontWeight: '600'}}>Write</th>
      </tr>
    </thead>

    <tbody>
      <tr style={{backgroundColor: 'transparent'}}>
        <td style={{padding: '1.25rem 3rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>Basic</td>
        <td style={{padding: '1.25rem 3rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>20 per second</td>
        <td style={{padding: '1.25rem 3rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>10 per second</td>
      </tr>

      <tr style={{backgroundColor: 'rgba(255, 255, 255, 0.02)'}}>
        <td style={{padding: '1.25rem 3rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>Advanced</td>
        <td style={{padding: '1.25rem 3rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>30 per second</td>
        <td style={{padding: '1.25rem 3rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>30 per second</td>
      </tr>

      <tr style={{backgroundColor: 'transparent'}}>
        <td style={{padding: '1.25rem 3rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>Premier</td>
        <td style={{padding: '1.25rem 3rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>100 per second</td>
        <td style={{padding: '1.25rem 3rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>100 per second</td>
      </tr>

      <tr style={{backgroundColor: 'rgba(255, 255, 255, 0.02)'}}>
        <td style={{padding: '1.25rem 3rem'}}>Prime</td>
        <td style={{padding: '1.25rem 3rem'}}>400 per second</td>
        <td style={{padding: '1.25rem 3rem'}}>400 per second</td>
      </tr>
    </tbody>
  </table>
</div>

Qualification for tiers:

* Basic: Completing signup
* Advanced: Completing [https://kalshi.typeform.com/advanced-api](https://kalshi.typeform.com/advanced-api)
* Premier: 3.75% of exchange traded volume in a given month
* Prime: 7.5% of exchange traded volume in a given month

In addition to the volume targets, technical competency is a requirement for Premier/Prime access. Before providing access to the Premier/Prime tiers, the Exchange will establish that the trader/trading entity has the following requirements met:

* Knowledge of common security practices for API usage
* Proficiency in setting up monitoring for API usage, and ability to monitor API usage in near real-time
* Understanding and implementation of rate limiting and throttling mechanisms imposed by the API, and the ability to self-limit load
* Awareness of legal and compliance aspects related to API usage

Only the following APIs fall under the write limit, for the batch APIs, each item in the batch is considered 1 transaction with the sole exception of BatchCancelOrders, where each cancel counts as 0.2 transactions:

* [BatchCreateOrders](/api-reference/portfolio/batch-create-orders)
* [BatchCancelOrders](/api-reference/portfolio/batch-cancel-orders)
* [CreateOrder](/api-reference/portfolio/create-order)
* [CancelOrder](/api-reference/portfolio/cancel-order)
* [AmendOrder](/api-reference/portfolio/amend-order)
* [DecreaseOrder](/api-reference/portfolio/decrease-order)

<Info>
  We reserve the right to downgrade your API rate limit tier from Prime and Premier when you have shown lack of activity in the previous period.
</Info>

At any time, any Member that uses FIX or is at the highest possible API tier is eligible for an upgrade to its rate limit upon demonstration that such a tier is necessary for its bona fide market activity.
