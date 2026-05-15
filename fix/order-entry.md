---
url: https://docs.kalshi.com/fix/order-entry
lastmod: 2026-05-14T22:31:56.920Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Order Entry

> Submit, modify, and cancel orders through FIX messages

## New Order Single (35=D)

Used to submit a new order to the Exchange.

| Tag   | Name                    | Type         | Required | Description                                                                                                 |
| ----- | ----------------------- | ------------ | -------- | ----------------------------------------------------------------------------------------------------------- |
| 11    | ClOrdID                 | String       | Y        | Client order ID for idempotency. UUID preferred, max 64 chars. Must not match any open order.               |
| 18    | ExecInst                | Char         | N        | `6`=Post Only                                                                                               |
| 38    | OrderQty                | Decimal      | Y        | Quantity of contracts. Fractional quantities supported.                                                     |
| 40    | OrdType                 | Char         | Y        | `2`=Limit                                                                                                   |
| 44    | Price                   | Integer      | Y        | Price per contract in cents (1–99).                                                                         |
| 54    | Side                    | Char         | Y        | `1`=Buy (Yes), `2`=Sell (No)                                                                                |
| 55    | Symbol                  | String       | Y        | Market ticker (e.g. `EURUSD-23JUN2618-B1.087`)                                                              |
| 59    | TimeInForce             | Char         | N        | `0`=Day (expires 11:59:59.999pm ET), `1`=GTC, `3`=IOC, `4`=FOK, `6`=GTD. Past GTD dates are treated as IOC. |
| 126   | ExpireTime              | UTCTimestamp | C        | Required when TimeInForce=GTD.                                                                              |
| 448   | PartyID                 | UUID         | N        | FCM only. Sub-account identifier.                                                                           |
| 452   | PartyRole               | Integer      | N        | FCM only. `24`=Customer Account. Required when using PartyID.                                               |
| 453   | NoPartyIDs              | Integer      | N        | FCM only. Number of parties (only 1 supported).                                                             |
| 79    | AllocAccount            | Integer      | N        | Subaccount number (0–32). Alternative to NoPartyIDs.                                                        |
| 526   | SecondaryClOrdID        | UUID         | N        | [Order group](/fix/order-groups) identifier.                                                                |
| 2964  | SelfTradePreventionType | Integer      | N        | `1`=Taker At Cross (default), `2`=Maker                                                                     |
| 21006 | CancelOrderOnPause      | Boolean      | N        | Cancel order if trading is paused.                                                                          |
| 21009 | MaxExecutionCost        | Decimal      | N        | Max execution cost in dollars. Order canceled if unable to fill within cost.                                |

<CodeGroup>
  ```fix Example New Order theme={null}
  8=FIXT.1.1|9=200|35=D|34=5|52=20230809-12:34:56.789|49=your-api-key|56=KalshiNR|
  11=550e8400-e29b-41d4-a716-446655440000|38=10|40=2|54=1|55=HIGHNY-23DEC31|44=75|
  59=1|10=123|
  ```
</CodeGroup>

## Order Cancel/Replace Request (35=G)

Used to modify an existing order without canceling it.

### Supported Modifications

* **OrderQty**: Increases or decreases the quantity of your order, note that increasing the quantity for the same point means forfeiting your queue position
* **Price**: Changes the limit price of your order

| Tag | Name         | Type    | Required | Description                                                                              |
| --- | ------------ | ------- | -------- | ---------------------------------------------------------------------------------------- |
| 11  | ClOrdID      | String  | Y        | Unique modification request ID. UUID preferred, max 64 chars.                            |
| 37  | OrderID      | String  | N        | Exchange-assigned order identifier.                                                      |
| 38  | OrderQty     | Decimal | Y        | New total quantity. If equal to filled qty, order is canceled. If less, rejected.        |
| 40  | OrdType      | Char    | Y        | `2`=Limit                                                                                |
| 41  | OrigClOrdID  | String  | Y        | ClOrdID of the order to modify.                                                          |
| 44  | Price        | Integer | N        | New price in cents (1–99). Required if changing price.                                   |
| 54  | Side         | Char    | Y        | Must match original order.                                                               |
| 55  | Symbol       | String  | Y        | Must match original order.                                                               |
| 448 | PartyID      | UUID    | N        | FCM only. Must match original order.                                                     |
| 452 | PartyRole    | Integer | N        | FCM only. `24`=Customer Account. Must match original order. Required when using PartyID. |
| 453 | NoPartyIDs   | Integer | N        | FCM only. Must match original order (only 1 supported).                                  |
| 79  | AllocAccount | Integer | N        | Subaccount number (0–32). Must match original order.                                     |

## Order Cancel Request (35=F)

Cancel all remaining quantity of an existing order.

| Tag | Name         | Type    | Required | Description                                                                              |
| --- | ------------ | ------- | -------- | ---------------------------------------------------------------------------------------- |
| 11  | ClOrdID      | String  | Y        | Unique cancel request ID. UUID preferred, max 64 chars.                                  |
| 37  | OrderID      | String  | N        | Exchange-assigned order identifier.                                                      |
| 41  | OrigClOrdID  | String  | Y        | ClOrdID of the order to cancel.                                                          |
| 54  | Side         | Char    | Y        | Must match original order.                                                               |
| 55  | Symbol       | String  | Y        | Must match original order.                                                               |
| 448 | PartyID      | UUID    | N        | FCM only. Must match original order.                                                     |
| 452 | PartyRole    | Integer | N        | FCM only. `24`=Customer Account. Must match original order. Required when using PartyID. |
| 453 | NoPartyIDs   | Integer | N        | FCM only. Must match original order (only 1 supported).                                  |
| 79  | AllocAccount | Integer | N        | Subaccount number (0–32). Must match original order.                                     |

## Execution Report (35=8)

Sent by the exchange to reflect order state changes.

| Tag | Name         | Type         | Required | Description                                                                                                         |
| --- | ------------ | ------------ | -------- | ------------------------------------------------------------------------------------------------------------------- |
| 6   | AvgPx        | Decimal      | Y        | Average price of all fills on this order.                                                                           |
| 11  | ClOrdID      | String       | Y        | ClOrdID from the last message that changed the order.                                                               |
| 14  | CumQty       | Decimal      | Y        | Total quantity filled so far.                                                                                       |
| 17  | ExecID       | String       | Y        | Unique sequenced report ID (`int;int` format, e.g. `4;7`). Monotonically increasing. `"-1;-1"` for PENDING reports. |
| 31  | LastPx       | Integer      | C        | Fill price in cents. Present only for ExecType=Trade.                                                               |
| 32  | LastQty      | Decimal      | C        | Fill quantity. Present only for ExecType=Trade.                                                                     |
| 37  | OrderID      | String       | Y        | Exchange-assigned order identifier.                                                                                 |
| 38  | OrderQty     | Decimal      | Y        | Total order quantity. OrderQty = CumQty + LeavesQty.                                                                |
| 39  | OrdStatus    | Char         | Y        | Current order status. See Order Status below.                                                                       |
| 41  | OrigClOrdID  | String       | C        | Previous ClOrdID. Present for Replaced/Canceled orders.                                                             |
| 44  | Price        | Integer      | C        | Price per contract in cents.                                                                                        |
| 54  | Side         | Char         | Y        | `1`=Buy (Yes), `2`=Sell (No)                                                                                        |
| 55  | Symbol       | String       | Y        | Market ticker.                                                                                                      |
| 58  | Text         | String       | N        | Human-readable result description. See Text Field Values below.                                                     |
| 60  | TransactTime | UTCTimestamp | C        | Timestamp of the triggering event.                                                                                  |
| 103 | OrdRejReason | Integer      | C        | Rejection reason. Present when ExecType=Rejected. See below.                                                        |
| 126 | ExpireTime   | UTCTimestamp | C        | Expiration timestamp. 11:59pm ET for Day orders.                                                                    |
| 150 | ExecType     | Char         | Y        | Report reason. See Execution Types below.                                                                           |
| 151 | LeavesQty    | Decimal      | Y        | Remaining quantity open for execution.                                                                              |
| 448 | PartyID      | UUID         | N        | FCM only. Sub-account identifier.                                                                                   |
| 452 | PartyRole    | Integer      | N        | FCM only. `24`=Customer Account. Present when PartyID is present.                                                   |
| 453 | NoPartyIDs   | Integer      | N        | FCM only. Number of parties (only 1 supported).                                                                     |
| 79  | AllocAccount | Integer      | C        | Subaccount number (0–32). Present if order was placed for a subaccount.                                             |

### Order Status (39)

* **New\<0>**: Active order, no fills
* **Partially Filled\<1>**: Some quantity filled
* **Filled\<2>**: Completely filled
* **Canceled\<4>**: Canceled (may have partial fills)
* **Pending Cancel\<6>**: Cancel pending
* **Rejected\<8>**: Order rejected
* **Pending New\<A>**: Order pending acceptance
* **Expired\<C>**: Time in force expired
* **Pending Replace\<E>**: Modification pending

<Note>
  By default, expiry-style system cancellations are reported as **Canceled\<4>**.\
  If Logon tag **21012 (UseExpiredOrdStatus)=Y**, expiry-style system cancellations (CloseCancel and OrderExpiryCancel) are reported as **Expired\<C>**.
</Note>

### Order Rejection Reasons (103)

* **Unknown symbol\<1>**
* **Exchange closed\<2>**
* **Order exceeds limit\<3>**
* **Too late to enter\<4>**
* **Duplicate order\<6>**
* **Stale order\<8>**
* **Unsupported order characteristic\<11>**
* **Incorrect quantity\<13>**
* **Unknown account\<15>**
* **Other\<99>**

### Execution Types (150)

* **New\<0>**: Order accepted
* **Trade\<F>**: Order filled (partial or complete)
* **Canceled\<4>**: Order canceled
* **Replaced\<5>**: Order modified
* **Rejected\<8>**: Order rejected
* **Expired\<C>**: Order expired
* **Pending New\<A>**: Order pending acceptance
* **Pending Cancel\<6>**: Cancel pending
* **Pending Replace\<E>**: Modification pending

### Text Field Values (58)

Common values for the Text field in Execution Reports:

* **EXCHANGE\_UNAVAILABLE** - Catch-all for Exchange outage or unmapped errors, maps to OrdRejReason "Other"
* **MARKET\_ALREADY\_CLOSED** - maps to OrdRejReason "Exchange closed"
* **MARKET\_INACTIVE** - maps to OrdRejReason "Exchange closed"
* **MARKET\_NOT\_FOUND** - maps to OrdRejReason "Unknown symbol"
* **SELF\_CROSS\_ATTEMPT** - maps to ExecutionType "Canceled"
* **SELF\_CROSS\_ATTEMPT\_PARTIALLY\_FILLED** - maps to ExecutionType "Canceled"
* **ORDER\_ALREADY\_EXISTS** - maps to OrdRejReason "Duplicate order"
* **EXCEEDED\_ORDER\_GROUP\_RISK\_LIMIT** - maps to OrdRejReason "Order exceeds limit"
* **INSUFFICIENT\_BALANCE** - maps to OrdRejReason "Order exceeds limit"
* **EXCHANGE\_PAUSED** - maps to OrdRejReason "Exchange closed"
* **TRADING\_PAUSED** - maps to OrdRejReason "Exchange closed"
* **INVALID\_ORDER** - maps to OrdRejReason "Unsupported order characteristic"
* **ORDER\_GROUP\_NOT\_FOUND** - maps to OrdRejReason "Unsupported order characteristic"
* **EXCEEDED\_PER\_MARKET\_RISK\_LIMIT** - maps to OrdRejReason "Order exceeds limit"
* **EXCEEDED\_SELL\_POSITION\_FLOOR** - maps to OrdRejReason "Order exceeds limit"
* **CUSTOMER\_ACCOUNT\_NOT\_FOUND** - maps to OrdRejReason "Unknown account"
* **PERMISSION\_DENIED\_FOR\_CUSTOMER\_ACCOUNT** - maps to OrdRejReason "Unknown account"
* **FOK\_INSUFFICIENT\_VOLUME** - maps to ExecutionType "Canceled"
* **POST\_ONLY\_CROSS** - maps to OrdRejReason "Other"
* **ORDER\_GROUP\_CANCEL** - maps to ExecutionType "Canceled"
* **TAKER\_CANCEL\_FOR\_SELF\_TRADE\_PREVENTION** - maps to ExecutionType "Canceled"
* **MAKER\_CANCEL\_FOR\_SELF\_TRADE\_PREVENTION** - maps to ExecutionType "Canceled"
* **IMMEDIATE\_OR\_CANCELLED** - maps to ExecutionType "Canceled"
* **EXPIRED** - maps to OrdRejReason "Stale order" (RFQ quote had expired when the order arrived)

### OrderCancelReject (35=9)

Exchange-side amend and cancel failures are returned as OrderCancelReject (35=9), not ExecutionReport.

| Text (58)                     | CxlRejReason (102)      |
| ----------------------------- | ----------------------- |
| `INVALID_AMEND_QTY_FOR_ORDER` | Broker                  |
| `CANNOT_UPDATE_FILLED_ORDER`  | Broker                  |
| `SELF_CROSS_ATTEMPT`          | Invalid price increment |

### Position and Fee Information

When ExecType=Trade:

| Tag  | Name               | Description                                        |
| ---- | ------------------ | -------------------------------------------------- |
| 704  | LongQty            | Net Yes position after trade as a decimal quantity |
| 705  | ShortQty           | Net No position after trade as a decimal quantity  |
| 136  | NoMiscFees         | Number of fees                                     |
| 137  | MiscFeeAmt         | Total fees in dollars                              |
| 138  | MiscFeeCurr        | Currency (USD)                                     |
| 139  | MiscFeeType        | Exchange Fees\<4>                                  |
| 891  | MiscFeeBasis       | Fee unit (always ABSOLUTE\<0>)                     |
| 880  | TrdMatchID         | Unique trade identifier                            |
| 1057 | AggressorIndicator | Taker/Maker flag                                   |

### Collateral Changes

| Tag  | Name                      | Description                  |
| ---- | ------------------------- | ---------------------------- |
| 1703 | NoCollateralAmountChanges | Number of collateral changes |
| 1704 | CollateralAmountChange    | Delta in dollars             |
| 1705 | CollateralAmountType      | BALANCE or PAYOUT            |

### Party Information

Party fields from the original order request are echoed back in ExecutionReports:

| Tag | Name         | Description                          |
| --- | ------------ | ------------------------------------ |
| 453 | NoPartyIDs   | Number of parties (for sub-accounts) |
| 448 | PartyID      | Sub-account identifier               |
| 452 | PartyRole    | Customer Account\<24>                |
| 79  | AllocAccount | Subaccount number (0-32)             |

### Rejection Reasons (102)

* **Too late to cancel\<0>**: Order already filled
* **Unknown order\<1>**: Order not found
* **Other\<99>**: See Text field

## Mass Cancel Request (35=q)

Cancel all orders for the trading session. Only available on KalshiNR (NewOrderMode) sessions.

| Tag | Name                  | Description            |
| --- | --------------------- | ---------------------- |
| 11  | ClOrdID               | Unique request ID      |
| 530 | MassCancelRequestType | Cancel for session\<6> |

## Mass Cancel Report (35=r)

Response to mass cancel request.

| Tag | Name                   | Description                 |
| --- | ---------------------- | --------------------------- |
| 11  | ClOrdID                | Request ID                  |
| 37  | OrderID                | Operation ID                |
| 531 | MassCancelResponse     | Success\<6> or Rejected\<0> |
| 532 | MassCancelRejectReason | If rejected                 |

<Note>
  Individual ExecutionReports will follow for each canceled order.
</Note>
