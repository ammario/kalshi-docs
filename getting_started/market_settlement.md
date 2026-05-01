---
url: https://docs.kalshi.com/getting_started/market_settlement
lastmod: 2026-04-30T03:43:38.624Z
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

## Settlement Timing

Markets typically settle shortly after expiration, but timing can vary based on market type, data source availability, and manual review requirements.

## Fees

Settlement fees are zero for simple yes/no determinations but may apply for sub-cent scalar settlement. The actual payout (`CollateralAmountChange`) is rounded to whole cents. `CollateralAmountChange + MiscFeeAmt` equals the pre-rounding settlement value.

## Protocol-Specific Details

* [FIX Market Settlement Messages](/fix/market-settlement)
