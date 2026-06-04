---
url: https://docs.kalshi.com/margin/price-banding
lastmod: 2026-06-03T18:50:46.352Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Price Banding

> How price banding works for Kalshi margin markets

For perpetual markets, prices move in `0.0001` dollar ticks. Bids must be at least the lower of 80% of the best bid or 1,000 ticks below the best bid. Asks must be at most the higher of 120% of the best ask or 1,000 ticks above the best ask.

**Notes**

* Resting orders will not be canceled due to the price band movement.
* If there are no resting orders on that side, there is no band limit for that side.
* Order amends outside the price band are not allowed.
