---
url: https://docs.kalshi.com/margin/price-banding
lastmod: 2026-11-03T18:29:35.969Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Price Banding

> How price banding works for Kalshi margin markets

For perpetual markets, prices move in `0.0001` dollar ticks. The price band limits how far an order may cross the other side of the book. A bid must be at most the higher of twice the best ask or 1,000 ticks above the best ask. An ask must be at least the lower of half the best bid or 1,000 ticks below the best bid.

**Notes**

* Orders resting away from the market are not limited. A bid below the best bid or an ask above the best ask is always accepted.
* If there are no resting orders on the other side, there is no band limit.
* Resting orders will not be canceled due to the price band movement.
* Order amends outside the price band are not allowed.
* Orders and amends outside the band are rejected with `invalid price`.
* Liquidations and fired exit triggers are placed by the exchange and are not subject to the band.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.