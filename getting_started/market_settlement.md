---
url: https://docs.kalshi.com/getting_started/market_settlement
lastmod: 2026-10-01T18:58:59.486Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Market Settlement

> How market outcomes are determined and positions are resolved

Settlement occurs when a market's outcome is determined. Positions are automatically resolved and funds transferred.

## How It Works

* **Yes outcome**: Yes contract holders receive \$1 per contract
* **No outcome**: No contract holders receive \$1 per contract
* Only net positions are settled (after netting)
* Markets with a settlement floor can pay YES holders part of the payout before settlement. See [Settlement Bounds](/getting_started/settlement_bounds)

## Settlement Timing

Markets typically settle shortly after expiration, but timing can vary based on market type, data source availability, and manual review requirements.

## Fees

Settlement fees are zero for simple yes/no determinations but may apply for sub-cent scalar settlement. The actual payout (`CollateralAmountChange`) is rounded to whole cents. `CollateralAmountChange + MiscFeeAmt` equals the pre-rounding settlement value.

## Protocol-Specific Details

* [FIX Market Settlement Messages](/fix/market-settlement)


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.