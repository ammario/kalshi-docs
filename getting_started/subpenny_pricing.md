---
url: https://docs.kalshi.com/getting_started/subpenny_pricing
lastmod: 2026-02-25T14:08:04.731Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Subpenny Pricing

> Understanding Kalshi subpenny pricing.

## Format

```
{
    "price": 12,              // legacy: cents
    "price_dollars": "0.1200" // new: fixed-point dollars
}
```

Starting soon in the API, you will begin to see prices and money represented in 2 different formats: integer cents (legacy) and fixed-point dollars (new).
A fixed-point dollar is a string bearing a fixed-point representation of money accurate to at least 4 decimal points.

## Motivation

Subpenny pricing will allow for more accurate pricing and the tail end of markets where likelihood of a given event are close to 100% or 0%.

## Status

Last Updated: February 25, 2026

Legacy integer cents price fields (e.g., `yes_bid`, `no_ask`, `last_price`) will be deprecated on **March 5, 2026**. Their `_dollars` equivalents (e.g., `yes_bid_dollars`, `no_ask_dollars`, `last_price_dollars`) are already available — please migrate to them.

Subpenny pricing is currently offered on a per-market basis. Please update systems to parse the fixed-point `_dollars` fields and support subpenny precision.
