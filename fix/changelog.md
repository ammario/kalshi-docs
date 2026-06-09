---
url: https://docs.kalshi.com/fix/changelog
lastmod: 2026-06-08T21:06:50.002Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Changelog

> Version history and updates for the Kalshi FIX API

# FIX API Changelog

## Version 1.0.31 (2026-06-04)

* ExecutionReports (35=8) for post-only orders canceled because they would cross now carry a Text (58) reason of `POST_ONLY_CROSS`

## Version 1.0.30 (2026-06-04)

* Starting Thursday, June 4, 2026, the FIX API ExecutionReport (35=8) rejection Text (58) distinguishes rejects where the order's outcome is unconfirmed from rejects where the order was definitely not applied
  * `EXCHANGE_UNAVAILABLE` now means the gateway could not confirm whether the order was applied (the exchange was unreachable, the request timed out, or it was interrupted after the order may have been accepted). Reconcile the order's state, or retry with the same ClOrdID
  * `INTERNAL_ERROR` is a new value for a reject from a healthy exchange that could not be mapped to a specific reason. The order was not applied, so it is safe to fix and resubmit
  * Previously both cases returned `EXCHANGE_UNAVAILABLE`

## Version 1.0.29 (2026-05-29)

* Added market lifecycle support on the `KalshiMD` session via Security Status messages
  * `SecurityStatusRequest` (35=e) subscribes (`263=1`) or unsubscribes (`263=2`) a single `Symbol<55>`
  * `SecurityStatus` (35=f) streams `SecurityTradingStatus<326>` changes: `3`=resume (activated), `2`=trading halt, `100`=Kalshi determined, `101`=Kalshi settled
  * Changes-only: no initial snapshot is sent on subscribe
  * For more info see [Market Data](/fix/market-data)

## Version 1.0.28 (2026-05-28)

* Added market data support on the dedicated `KalshiMD` session
  * Subscriptions are identified by `Symbol<55>`
  * `MarketDataRequest` (35=V) requests order book snapshots (`263=0`) or snapshot-plus-updates subscriptions (`263=1`); cancel with `263=2` (symbols in `55`, or none to cancel all)
  * `MarketDataSnapshotFullRefresh` (35=W) returns the full aggregated book; `MarketDataIncrementalRefresh` (35=X) streams subsequent level changes
  * `MarketDataRequestReject` (35=Y) is sent when a request cannot be accepted
  * For more info see [Market Data](/fix/market-data)

## Version 1.0.27 (2026-05-28)

* Starting Thursday, May 28, 2026, direct member BALANCE collateral changes on ExecutionReport (35=8) may be emitted with four decimal places

## Version 1.0.26 (2026-05-18)

* Added `SplitCollateralReturn` (21027) Logon flag
  * With Logon flag `21027=Y`, Execution Reports with `ExecType=Trade` include two new tags:
    * `SingleMarketCollateralReturn` (21030): collateral freed from reducing/closing a position in a single market
    * `RangedMarketCollateralReturn` (21031): collateral freed from MECNET/DIRECNET netting across a market group
  * Both values are in dollars and only present when non-zero
  * These are informational subsets of the existing BALANCE collateral change — they describe components within the total balance delta
  * Without `21027`, Execution Reports remain unchanged (existing behavior)

## Version 1.0.25 (2026-05-08)

BidSize (134) and OfferSize (135) conditionally offered on QuoteStatusReport (35=AI).

## Version 1.0.24 (2026-05-07)

* OrderGroupResponse (UOH) now echoes AllocAccount (tag 79), with `79=0` for the primary account and `79=1-63` for subaccounts

## Version 1.0.23 (2026-05-05)

* Quote (35=S) now accepts `RestRemainder` (21015)
  * Set `21015=Y` to rest the quote remainder after execution
  * Omitting the tag or setting `21015=N` preserves the existing behavior

## Version 1.0.22 (2026-04-28)

* Added `AlwaysEmitNewBeforeTrade` (21026) Logon flag
  * With Logon flag `21026=Y`, the gateway always emits a standalone `New<0>` execution report before any `Trade<F>` report, even when an order takes liquidity in the same matching cycle as its placement
  * Without `21026`, the New ack continues to be folded into the first Trade report when both events arrive in the same batch (existing behavior)
  * Useful for clients whose state machines require an explicit `39=0` ack before they can issue replaces against the order

## Version 1.0.21 (2026-04-20)

* OrderGroupRequest (UOG) now accepts AllocAccount (tag 79) to scope the operation to a subaccount
  * Applies to all five actions: Create, Reset, Delete, Trigger, Update
  * Omit or set `79=0` to operate on the primary account
  * An OrderGroupID created under one subaccount cannot be managed without the matching AllocAccount on the follow-up request
* OrderGroupResponse (UOH) now echoes OrderGroupContractsLimit (tag 20132) on Create and Update responses

## Version 1.0.20 (2026-03-01)

* Added `OrderExpiryCancel` support for expired status mapping in execution reports
  * With Logon flag `21012=Y`, both `CloseCancel` and `OrderExpiryCancel` emit `ExecType(150)=C` and `OrdStatus(39)=C`
  * Without `21012`, behavior remains `Canceled<4>` for compatibility

## Version 1.0.19 (2026-02-27)

* SettlementPrice (730) precision extended in MarketSettlementReport
  * SettlementPrice will continue to be in cents but may have up to two decimal places (e.g. `30.60` instead of `30`)
  * This enables sub-cent settlement values to be represented without truncation
* MiscFeeAmt (137) now reports actual settlement fees in MarketSettlementReport
  * Previously hardcoded to zero; now reflects the real settlement fee for each position

## Version 1.0.18 (2026-02-12)

* Execution report precision extended for fractional shares
  * On qty fields, Kalshi will return at least a scale of 2 instead of 0.
  * E.g. on a trade which executes for 10 contracts, Kalshi will return `CumQty: 14=10.00` as opposed to `14=10`
  * Despite the change in precision, the numerical value will remain unchanged for now because fractional trading
    is not yet enabled on any market.
  * Affected fields: `LastQty`, `CumQty`, `LeavesQty`

## Version 1.0.17 (2025-11-30)

* **BREAKING CHANGE**: Tag reorganization for improved compatibility
  * QuoteConfirmStatus now uses tag 21010 (currently supporting both 297 and 21010)
  * SkipPendingExecReports now uses tag 21011 (currently accepting both 21003 and 21011)
  * Tag 297 designated for standard QuoteStatus field
  * Tag 21003 designated for ResendEventCount field
  * Clients should update to use new tags; legacy support will be removed in future version

## Version 1.0.16 (2025-11-30)

* Added MaxExecutionCost (21009) NewOrderSingle flag.

## Version 1.0.15 (2025-11-21)

* Added PreserveOriginalOrderQty (21008) Logon flag to maintain original OrderQty across all execution reports

## Version 1.0.14 (2025-10-01)

* Added support for subpenny pricing across multiple FIX messages
* For more info see [Subpenny Pricing](/fix/subpenny-pricing)

## Version 1.0.13 (2025-08-15)

* Added Order Group management messages (UOG/UOH)
* Support for automatic order cancellation with contracts limits
* Create, Reset, and Delete operations for order groups

## Version 1.0.12 (2025-06-26)

* Added support for ListenerSession Logon flag for KalshiNR/KalshiRT
* Added support for ReceiveSettlementReports Logon flag for KalshiRT
* Deprecated SecurityGroup

## Version 1.0.11 (2025-06-12)

* Removed Required from OrderQty on Cancel 35=F
* Added PostOnly to Create 35=D

## Version 1.0.10 (2025-04-15)

* Removed deprecated event settlement message type
* Added ListenerSession and SkipPendingExecReports flag to Logon message type
