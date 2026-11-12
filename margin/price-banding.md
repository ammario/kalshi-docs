---
url: https://docs.kalshi.com/margin/price-banding
lastmod: 2026-11-12T06:22:15.670Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Price Banding

> How price banding works for Kalshi margin markets

For perpetual markets, prices move in `0.0001` dollar ticks. Price banding limits how far from the market an order may be priced, and an order must satisfy every band in force.

**Book band**

Anchored on the opposite side's best price. A bid must be at most the higher of twice the best ask or 1,000 ticks above the best ask. An ask must be at least the lower of half the best bid or 1,000 ticks below the best bid. When the opposite side is empty, the band anchors on the underlying's recent reference price instead, scaled by contract size and underlying multiplier, and imposes no limit without one.

**Fair-value band**

Applies to US equities. Anchored on an external reference price for the underlying, such as the national best bid and offer (NBBO) and Pyth. Around the reference price the band is 5% wide. When no recent reference price is available, or it disagrees sharply with the market's own book, the band anchors on a moving average of the market's book instead, where it is 8% wide, or 25% while that average is under ten minutes old. An immediate-or-cancel or fill-or-kill order may cross the market 2.4 times as far: up to 12% from the reference price, 19.2% from the moving average, or 60% while that average is under ten minutes old.

**Overnight settlement band**

For US equities during the overnight session (8 PM to 4 AM ET, on nights before a trading day), every order must be priced within 20% of the market's 4 PM ET settlement price from the day the session opened, whichever side it is on and whether or not it would trade. A market without that day's settlement price has no overnight band until the price arrives, and a stock split rebases the settlement price onto post-split prices. While the band applies, the fair-value band never limits a bid below the band's floor or an ask above its cap, so the market can always trade at the band's limits. When the band takes effect or moves, resting orders priced outside it are canceled.

**Notes**

* Unless the opposite side is empty, the book band limits only orders that cross the market. The fair-value band limits how high a bid and how low an ask may be; it never rejects a bid below it or an ask above it.
* Resting orders are not canceled when the book or fair-value bands move. The overnight settlement band cancels resting orders outside it when it takes effect or moves.
* Order amends outside any band are not allowed.
* Orders and amends outside any band are rejected with `invalid price`.
* Liquidations and fired exit triggers are placed by the exchange and must be able to cross a thin book, so they are not subject to the book band. They remain subject to the fair-value and overnight settlement bands.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.