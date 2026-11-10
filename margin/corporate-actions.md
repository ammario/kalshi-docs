---
url: https://docs.kalshi.com/margin/corporate-actions
lastmod: 2026-11-10T01:49:35.815Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Corporate Actions

> How corporate actions on the underlying stock adjust Kalshi single-stock perpetual futures

When the stock behind a single-stock perp pays a dividend, splits, merges or delists, the exchange may adjust the number of contracts, the Daily Settlement Price, or the underlying security. The goal is to keep open positions economically equivalent before and after the event, as far as practicable.

Corporate actions are covered in Part VII of [Chapter 14 of the rulebook](https://kalshi-public-docs.s3.amazonaws.com/regulatory/notices/KalshiEX_SFP_Rule_Submission_-_Chapter_14.pdf).

## Market Version

`market_version` tells you whether a price or an order comes from before or after an adjustment. A market starts at version 1. Adjustments are applied to open positions in place and, when applicable, the market version is incremented. The "Effect on Market Version" column below shows which actions increment it.

## Resting and Conditional Orders

For corporate action adjustments that halt and reopen the market, all resting and conditional orders in the affected market are cancelled and are not carried over. Resubmit them after trading resumes. Cash adjustments performed without a trading halt do not automatically cancel existing orders.

## Adjustments by Corporate Action

The Simple Description column describes each action in general terms, as it applies to holders of the underlying stock. What the exchange does to the perp is in the other columns.

| Corporate Action | Simple Description | Perp Price / Daily Settlement Price (DSP) Change | Number of Perp Contracts After the Corp Action | Cash / Funding Treatment | Timing of Corp Adjustment | Effect on Market Version |
| - | - | - | - | - | - | - |
| Ordinary cash dividend | Company pays its usual cash dividend | Spot/perp expected to fall by dividend amount by ex-date; no mechanical DSP adjustment | Unchanged | Economics transferred through funding; no separate dividend payment | No mechanical corporate action adjustment; dividend economics are reflected though normal funding at daily settlement times | Unchanged |
| Special / extraordinary dividend | One-off or unusually large distribution | May reduce DSP by distribution value, or use another approved method | Normally unchanged | Per-contract cash transfer or CRO-approved equivalent; avoid double counting | Scheduled adjustment at Daily Settlement Time on the last cum-trading day, where applicable; payment may be delayed if the distribution value is not yet determinable. | Depends on the adjustment method |
| Forward stock split | One share becomes multiple shares, e.g. 4-for-1 | Price ÷ 4 | Contracts × 4 | Normally none; possible rounding compensation | After last cum-day settlement, before ex-date | Incremented |
| Reverse stock split | Multiple shares combine into fewer shares, e.g. 1-for-10 | Price × 10 | Contracts ÷ 10 | Compensation possible for rounding differences | After last cum-day settlement, before ex-date | Incremented |
| Stock dividend / bonus issue | Company distributes additional shares of itself | Price falls proportionately | Contracts increase proportionately | Normally none; rounding compensation possible | After last cum-day settlement, before ex-date | Incremented |
| Optional / scrip dividend | Shareholders of the underlying stock may elect to receive cash or additional shares under the issuer's dividend terms. The election is a right of the stock's shareholders and does not apply to the perp. | Depends on actual distribution method chosen and on Chief Regulatory Officer’s (CRO) affirmation | Usually unchanged for cash; quantity may increase when there is a qualifying stock distribution | Funding, cash, or proportional adjustment as appropriate | Generally processed after last cum-day settlement where an adjustment is required, with effect on ex-date; subject to event terms and CRO determination. | Depends on the adjustment method |
| Spin-off / demerger | Company separates a business and distributes shares in a new company | Underlying typically drops by distributed business's value; DSP may be adjusted | Normally unchanged | Cash-equivalent transfer for distributed property, DSP reduction, or another CRO-approved method preserving economic equivalence; no automatic delivery of spun-off shares. | After last cum-day settlement, before ex-date; cash settlement may follow later when the distributed property's value becomes determinable, under the announced methodology. | Depends on the adjustment method |
| Rights offering | Existing shareholders receive rights to acquire additional shares, generally at a pre-defined price | Adjustment may be needed to preserve value; DSP determined by the rights’ terms | Unchanged if compensated via cash; otherwise price/quantity adjusted to the rights’ terms | Rights value compensated via an approved adjustment; Cash compensation may be one approach, subject to CRO approval | After last cum-day settlement, before ex-date | Incremented if price or quantity is adjusted |
| Tender / exchange offer | Buyer offers to purchase shareholders' stock | No mechanical adjustment merely for offer | Unchanged | None ordinarily | On offer completion, reassess if merger follows | Unchanged initially |
| Cash merger / acquisition | Target company acquired for a fixed cash price | Final price ordinarily equals cash consideration | Target perp positions closed to zero | Final cash settlement | Upon effective acquisition / final settlement | None; the contract terminates |
| Stock-for-stock merger | Target acquired in exchange for acquirer's shares | Final price based on value of acquirer shares received | Normally target positions closed; CRO may convert into acquirer perp | Final settlement or conversion with VM adjustments | Upon completion / final settlement | None; the target perp terminates, or positions convert into an existing listed acquirer perp |
| Mixed cash-and-stock merger | Target shareholders receive cash plus acquirer shares | Economic reference is cash plus value of shares received | Normally close target; alternative subject to CRO determination | Final cash settlement or approved equivalent | Completion / final settlement | None; the contract generally terminates |
| Ticker / name / ISIN / CUSIP change | Company changes identifier without changing ownership rights | Unchanged | Unchanged | None | When identifier change takes effect | Unchanged |
| Share buyback / capital issuance | Company repurchases stock or issues new capital | Market determines impact; no mechanical DSP adjustment | Unchanged | None | No adjustment event ordinarily | Unchanged |
| Recapitalization / reclassification | Company changes capital or share structure | Case-specific if economic rights change | Case-specific | May require adjustment or settlement | Effective event date | Depends on the adjustment |
| Delisting / bankruptcy / liquidation | Underlying ceases trading or issuer fails | Final Settlement Price (FSP) is determined under applicable rules; otherwise use the cash open price on primary exchange, or approved fallback. | Positions closed on final settlement | Final cash settlement at FSP; bankruptcy may not automatically mean zero settlement. | Delisting / accelerated settlement timetable | None; the contract terminates |

> [!NOTE]
>
> Delisting / bankruptcy / liquidation: once the exchange confirms the event, trading halts and does not resume, and final settlement follows within five business days. The exchange gives at least two business days' notice before an accelerated final settlement, unless an emergency requires faster action.

[`GET /margin/corporate_actions`](https://docs.kalshi.com/margin-rest/corporate-actions/get-margin-corporate-actions) returns scheduled notices and notices updated in the last seven days.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.