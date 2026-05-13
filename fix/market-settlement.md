---
url: https://docs.kalshi.com/fix/market-settlement
lastmod: 2026-05-12T23:42:08.191Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Market Settlement

> Settlement reports for market outcomes and position resolution

See [Market Settlement](/getting_started/market_settlement) for an overview. Settlement reports are available on **KalshiPT** sessions by default, unless `ReceiveSettlementReports=N` (tag 20127) is set during Logon, and on **KalshiRT** sessions with `ReceiveSettlementReports=Y`.

## Market Settlement Report (35=UMS)

Provides settlement details for a specific market.

### Message Structure

| Tag   | Name                          | Description                                                          | Required |
| ----- | ----------------------------- | -------------------------------------------------------------------- | -------- |
| 20105 | MarketSettlementReportID      | Unique settlement identifier                                         | Yes      |
| 55    | Symbol                        | Market ticker (e.g., NHIGH-23JAN02-66)                               | Yes      |
| 715   | ClearingBusinessDate          | Date settlement cleared (YYYYMMDD)                                   | Yes      |
| 20106 | TotNumMarketSettlementReports | Total number of settlement reports in sequence                       | No       |
| 20107 | MarketResult                  | Result of the market when determined: `yes`, `no`, or `scalar`       | Yes      |
| 893   | LastFragment                  | Last page indicator (Y/N)                                            | No       |
| 730   | SettlementPrice               | Settlement price of market in cents (2 decimal places, e.g. `30.60`) | Yes      |

### Repeating Groups

Collateral changes and fees are nested inside each `NoMarketSettlementPartyIDs` entry.

#### Party Information (NoMarketSettlementPartyIDs)

| Tag   | Name                       | Description                           |
| ----- | -------------------------- | ------------------------------------- |
| 20108 | NoMarketSettlementPartyIDs | Number of parties                     |
| 20109 | MarketSettlementPartyID    | Unique identifier for party           |
| 20110 | MarketSettlementPartyRole  | Type of party (Customer Account\<24>) |
| 704   | LongQty                    | Decimal quantity of YES position held |
| 705   | ShortQty                   | Decimal quantity of NO position held  |

#### Collateral Changes (NoCollateralAmountChanges)

| Tag  | Name                      | Description                                                             |
| ---- | ------------------------- | ----------------------------------------------------------------------- |
| 1703 | NoCollateralAmountChanges | Number of collateral changes (should be only 1 - payout balance change) |
| 1704 | CollateralAmountChange    | Delta in dollars                                                        |
| 1705 | CollateralAmountType      | `BALANCE` or `PAYOUT`                                                   |

#### Fees (NoMiscFees)

| Tag | Name         | Description                              |
| --- | ------------ | ---------------------------------------- |
| 136 | NoMiscFees   | Number of fee entries (always 1)         |
| 137 | MiscFeeAmt   | Fee amount in dollars (zero when no fee) |
| 138 | MiscFeeCurr  | Currency (USD)                           |
| 139 | MiscFeeType  | Type of fee (Exchange fees\<4>)          |
| 891 | MiscFeeBasis | Unit for fee (Absolute\<0>)              |

## Example Settlement Report

```fix theme={null}
// Market settled as "yes", no fees
8=FIXT.1.1|35=UMS|
20105=settle-123|55=HIGHNY-23DEC31|715=20231231|
20107=yes|730=100.00|
20108=1|
  20109=user-456|20110=24|
  704=100|705=0|
  1703=1|
    1704=100.00|1705=PAYOUT|
  136=1|
    137=0.00|138=USD|139=4|891=0|
893=Y|
```

```fix theme={null}
// Market settled as "yes", with sub-cent rounding fee
8=FIXT.1.1|35=UMS|
20105=settle-456|55=HIGHNY-23DEC31|715=20231231|
20107=yes|730=100.00|
20108=1|
  20109=user-789|20110=24|
  704=100|705=0|
  1703=1|
    1704=100.00|1705=PAYOUT|
  136=1|
    137=0.006|138=USD|139=4|891=0|
893=Y|
```

The first example shows:

* Market HIGHNY-23DEC31 settled as "yes"
* User held 100 Yes contracts
* Received \$100.00 payout to balance
* Zero settlement fees

The second example shows:

* Same market, different user
* $100.00 payout with a $0.006 rounding fee

## Pagination

Large settlement batches may span multiple messages:

| Tag   | Use Case                                  |
| ----- | ----------------------------------------- |
| 20106 | Total number of reports in batch          |
| 893   | LastFragment=N for more pages, Y for last |

<Warning>
  **Important:** The `MarketSettlementReportID` (tag 20105) will be different across paginated responses.
  Each page of results generates a new unique settlement ID. Use the `Symbol` (tag 55) ticker to identify fragments belonging to the same paginated settlement.
</Warning>
