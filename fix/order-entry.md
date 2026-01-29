---
url: https://docs.kalshi.com/fix/order-entry
lastmod: 2026-01-29T00:38:37.045Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Order Entry Messages

> Submit, modify, and cancel orders through FIX messages

# Order Entry Messages

## Overview

Kalshi treats all orders as bids or asks for Yes contracts. Selling Yes is equivalent to buying No contracts.

## New Order Single (35=D)

Used to submit a new order to the Exchange.

| Tag   | Name                    | Type         | Required | Description                                                                                                                                                                                                                                                                                                                                                                                |
| ----- | ----------------------- | ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 11    | ClOrderID               | String       | Y        | Client order identifier for idempotency. Must not match any open orders.<br /><br />**UUID format is preferred.**<br /><br />Validation:<br />• Maximum 64 characters<br />• Only alphanumeric, "+", "=", "\_", "-", and ":" characters allowed<br />• Pattern: `^[\-\w:+=/]*$`                                                                                                            |
| 18    | ExecInst                | Char         | N        | Execution instruction flags.<br /><br />Supported values:<br />6 = Post Only                                                                                                                                                                                                                                                                                                               |
| 38    | OrderQty                | Integer      | Y        | Number of contracts to trade.                                                                                                                                                                                                                                                                                                                                                              |
| 40    | OrdType                 | Char         | Y        | Order type.<br /><br />Supported values:<br />2 = Limit                                                                                                                                                                                                                                                                                                                                    |
| 44    | Price                   | Integer      | Y        | Price per contract in cents (1-99).                                                                                                                                                                                                                                                                                                                                                        |
| 54    | Side                    | Char         | Y        | Side of the order.<br /><br />Supported values:<br />1 = Buy (Yes contracts)<br />2 = Sell (No contracts)                                                                                                                                                                                                                                                                                  |
| 55    | Symbol                  | String       | Y        | Market ticker (e.g., "EURUSD-23JUN2618-B1.087").                                                                                                                                                                                                                                                                                                                                           |
| 59    | TimeInForce             | Char         | N        | Specifies how long the order remains in effect.<br /><br />Supported values:<br />0 = Day (expires at 11:59:59.999pm ET)<br />1 = Good Till Cancel (GTC)<br />3 = Immediate Or Cancel (IOC)<br />4 = Fill Or Kill (FOK)<br />6 = Good Till Date (GTD)<br /><br />**Note:** Day orders expire at 11:59:59.999pm ET. For GTD orders, any date in the past is treated as Immediate Or Cancel. |
| 126   | ExpireTime              | UTCTimestamp | C        | Required when TimeInForce=GTD. Specifies when the GTD order expires.                                                                                                                                                                                                                                                                                                                       |
| 448   | PartyID                 | UUID         | N        | **Only applicable for FCM entities .** Sub-account identifier.                                                                                                                                                                                                                                                                                                                             |
| 452   | PartyRole               | Integer      | N        | **Only applicable for FCM entities .** Party role.<br /><br />Supported values:<br />24 = Customer Account                                                                                                                                                                                                                                                                                 |
| 453   | NoPartyIDs              | Integer      | N        | **Only applicable for FCM entities .** Number of parties. Currently, only 1 is supported.                                                                                                                                                                                                                                                                                                  |
| 526   | SecondaryClOrdID        | UUID         | N        | Order group identifier. Please refer to the Order Groups tab for more information.                                                                                                                                                                                                                                                                                                         |
| 2964  | SelfTradePreventionType | Char         | N        | Self-trade prevention mode. If unset, defaults to Taker At Cross. <br /><br />Supported values:<br />1 = Taker At Cross<br />2 = Maker                                                                                                                                                                                                                                                     |
| 21006 | CancelOrderOnPause      | Boolean      | N        | If this flag is set to true, the order will be canceled if the order is open and trading on the exchange is paused for any reason.                                                                                                                                                                                                                                                         |
| 21009 | MaxExecutionCost        | Decimal      | N        | Optional value representing max execution cost for an order in dollars. Order is canceled if unable to fill OrdQty for the given cost.                                                                                                                                                                                                                                                     |

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

| Tag | Name        | Type    | Required | Description                                                                                                                                                                                                                                                                           |
| --- | ----------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 11  | ClOrderID   | String  | Y        | Unique modification request identifier. Must not match any existing ClOrderID.<br /><br />**UUID format is preferred.**<br /><br />Validation:<br />• Maximum 64 characters<br />• Only alphanumeric, "+", "=", "\_", "-", and ":" characters allowed<br />• Pattern: `^[\-\w:+=/]*$` |
| 37  | OrderID     | String  | N        | Order identifier provided by Kalshi Exchange.                                                                                                                                                                                                                                         |
| 38  | OrderQty    | Integer | Y        | New total quantity for the order.<br /><br />**Note:** If OrderQty equals filled quantity, the order will be canceled. If less than filled quantity, the request will be rejected.                                                                                                    |
| 40  | OrdType     | Char    | Y        | Order type.<br /><br />Supported values:<br />2 = Limit                                                                                                                                                                                                                               |
| 41  | OrigClOrdID | String  | Y        | ClOrderID of the order to modify.                                                                                                                                                                                                                                                     |
| 44  | Price       | Integer | N        | New price per contract in cents (1-99). Required if changing price.                                                                                                                                                                                                                   |
| 54  | Side        | Char    | Y        | Must match the original order side.                                                                                                                                                                                                                                                   |
| 55  | Symbol      | String  | Y        | Must match the original order symbol.                                                                                                                                                                                                                                                 |
| 448 | PartyID     | UUID    | N        | **Only applicable for FCM entities .** Sub-account identifier. Must match the original order field value.                                                                                                                                                                             |
| 452 | PartyRole   | Integer | N        | **Only applicable for FCM entities .** Party role. Must match the original order field value.<br /><br />Supported values:<br />24 = Customer Account                                                                                                                                 |
| 453 | NoPartyIDs  | Integer | N        | **Only applicable for FCM entities .** Number of parties. Must match the original order field value. Currently, only 1 is supported.                                                                                                                                                  |

## Order Cancel Request (35=F)

Cancel all remaining quantity of an existing order.

| Tag | Name        | Type    | Required | Description                                                                                                                                                                                                                                                                     |
| --- | ----------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 11  | ClOrderID   | String  | Y        | Unique cancel request identifier. Must not match any existing ClOrderID.<br /><br />**UUID format is preferred.**<br /><br />Validation:<br />• Maximum 64 characters<br />• Only alphanumeric, "+", "=", "\_", "-", and ":" characters allowed<br />• Pattern: `^[\-\w:+=/]*$` |
| 37  | OrderID     | String  | N        | Order identifier provided by Kalshi Exchange.                                                                                                                                                                                                                                   |
| 41  | OrigClOrdID | String  | Y        | ClOrderID of the order to cancel.                                                                                                                                                                                                                                               |
| 54  | Side        | Char    | Y        | Must match the original order side.                                                                                                                                                                                                                                             |
| 55  | Symbol      | String  | Y        | Must match the original order symbol.                                                                                                                                                                                                                                           |
| 448 | PartyID     | UUID    | N        | **Only applicable for FCM entities .** Sub-account identifier. Must match the original order field value.                                                                                                                                                                       |
| 452 | PartyRole   | Integer | N        | **Only applicable for FCM entities .** Party role. Must match the original order field value.<br /><br />Supported values:<br />24 = Customer Account                                                                                                                           |
| 453 | NoPartyIDs  | Integer | N        | **Only applicable for FCM entities .** Number of parties. Must match the original order field value. Currently, only 1 is supported.                                                                                                                                            |

## Execution Report (35=8)

This message is sent by Kalshi Exchange back to clients to reflect changes to an order's state (accepted, replaced, partially filled, filled or canceled).

| Tag | Name         | Type         | Required | Description                                                                                                                                                                                                                                 |
| --- | ------------ | ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 6   | AvgPx        | Decimal      | Y        | Calculated average price of all fills on this order.                                                                                                                                                                                        |
| 11  | ClOrderID    | String       | Y        | ClOrderID provided by the initiator on the last message that made any change to the order.                                                                                                                                                  |
| 14  | CumQty       | Integer      | Y        | Total number of contracts filled in this order so far.                                                                                                                                                                                      |
| 17  | ExecID       | String       | Y        | Unique sequenced identifier for this report message.<br /><br />**Format:** `integer;integer` pattern (e.g., "4;4", "4;7", "7;3")<br /><br />Monotonically increasing at the Exchange level. Returns "-1;-1" for PENDING execution reports. |
| 31  | LastPx       | Integer      | C        | Price of this (last) fill in cents. Present only for trade execution reports.                                                                                                                                                               |
| 32  | LastQty      | Integer      | C        | Number of contracts bought or sold in this fill. Present only for trade execution reports.                                                                                                                                                  |
| 37  | OrderID      | String       | Y        | Unique identifier for the order in the Kalshi Exchange. Use this ID when referencing the order for support.                                                                                                                                 |
| 38  | OrderQty     | Integer      | Y        | Total number of contracts currently in the order. OrderQty = CumQty + LeavesQty.                                                                                                                                                            |
| 39  | OrdStatus    | Char         | Y        | Current status of the order after this event. See Order Status values below.                                                                                                                                                                |
| 41  | OrigClOrdID  | String       | C        | ClOrderID of the previous non-rejected order state. Present for Replaced/Canceled orders.                                                                                                                                                   |
| 44  | Price        | Integer      | C        | Price per contract in cents.                                                                                                                                                                                                                |
| 54  | Side         | Char         | Y        | Side of the original order.<br /><br />Values:<br />1 = Buy (Yes contracts)<br />2 = Sell (No contracts)                                                                                                                                    |
| 55  | Symbol       | String       | Y        | Market ticker for the order.                                                                                                                                                                                                                |
| 58  | Text         | String       | N        | Human-readable description of the execution report result.                                                                                                                                                                                  |
| 60  | TransactTime | UTCTimestamp | Y        | Timestamp for the event that triggered this execution report.                                                                                                                                                                               |
| 103 | OrdRejReason | Integer      | C        | Rejection reason. Present only when ExecType = Rejected. See Order Rejection Reasons below.                                                                                                                                                 |
| 126 | ExpireTime   | UTCTimestamp | C        | Order expiration timestamp. Returns 11:59pm ET for Day orders.                                                                                                                                                                              |
| 150 | ExecType     | Char         | Y        | Reason why this execution report was sent. See Execution Types below.                                                                                                                                                                       |
| 151 | LeavesQty    | Integer      | Y        | Remaining quantity open for further execution on this order.                                                                                                                                                                                |
| 448 | PartyID      | UUID         | N        | **Only applicable for FCM entities .** Sub-account identifier.                                                                                                                                                                              |
| 452 | PartyRole    | Integer      | N        | **Only applicable for FCM entities .** Party role.<br /><br />Supported values:<br />24 = Customer Account                                                                                                                                  |
| 453 | NoPartyIDs   | Integer      | N        | **Only applicable for FCM entities .** Number of parties. Currently, only 1 is supported.                                                                                                                                                   |

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

### Order Rejection Reasons (103)

* **Unknown symbol\<1>**
* **Exchange closed\<2>**
* **Order exceeds limit\<3>**
* **Too late to enter\<4>**
* **Duplicate order\<6>**
* **Unsupported order characteristic\<11>**
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
* **INVALID\_AMEND\_QTY\_FOR\_ORDER** - maps to OrdRejReason "Other"
* **CANNOT\_UPDATE\_FILLED\_ORDER** - maps to OrdRejReason "Too late to enter"
* **EXCEEDED\_ORDER\_GROUP\_RISK\_LIMIT** - maps to OrdRejReason "Order exceeds limit"
* **INSUFFICIENT\_BALANCE** - maps to OrdRejReason "Other"
* **EXCHANGE\_PAUSED** - maps to OrdRejReason "Exchange closed"
* **TRADING\_PAUSED** - maps to OrdRejReason "Exchange closed"
* **INVALID\_ORDER** - maps to OrdRejReason "Unsupported order characteristic"
* **ORDER\_GROUP\_NOT\_FOUND** - maps to OrdRejReason "Unsupported order characteristic"
* **EXCEEDED\_PER\_MARKET\_RISK\_LIMIT** - maps to OrdRejReason "Order exceeds limit"
* **EXCEEDED\_SELL\_POSITION\_FLOOR** - maps to OrdRejReason "Order exceeds limit"
* **NOT\_FOUND** - maps to OrdRejReason "Unknown symbol"
* **CUSTOMER\_ACCOUNT\_NOT\_FOUND** - maps to OrdRejReason "Unknown account"
* **PERMISSION\_DENIED\_FOR\_CUSTOMER\_ACCOUNT** - maps to OrdRejReason "Unknown account"
* **FOK\_INSUFFICIENT\_VOLUME** - maps to ExecutionType "Canceled"
* **POST\_ONLY\_CROSS** - maps to OrdRejReason "Other"
* **ORDER\_GROUP\_CANCEL** - maps to ExecutionType "Canceled"
* **TAKER\_CANCEL\_FOR\_SELF\_TRADE\_PREVENTION** - maps to ExecutionType "Canceled"
* **MAKER\_CANCEL\_FOR\_SELF\_TRADE\_PREVENTION** - maps to ExecutionType "Canceled"
* **IMMEDIATE\_OR\_CANCELLED** - maps to ExecutionType "Canceled"

### Position and Fee Information

When ExecType=Trade:

| Tag  | Name               | Description                    |
| ---- | ------------------ | ------------------------------ |
| 704  | LongQty            | Net Yes position after trade   |
| 705  | ShortQty           | Net No position after trade    |
| 136  | NoMiscFees         | Number of fees                 |
| 137  | MiscFeeAmt         | Total fees in dollars          |
| 138  | MiscFeeCurr        | Currency (USD)                 |
| 139  | MiscFeeType        | Exchange Fees\<4>              |
| 891  | MiscFeeBasis       | Fee unit (always ABSOLUTE\<0>) |
| 880  | TrdMatchID         | Unique trade identifier        |
| 1057 | AggressorIndicator | Taker/Maker flag               |

### Collateral Changes

| Tag  | Name                    | Description                  |
| ---- | ----------------------- | ---------------------------- |
| 1703 | NoCollateralAmounts     | Number of collateral changes |
| 1704 | CurrentCollateralAmount | Delta in dollars             |
| 1705 | CollateralType          | BALANCE or PAYOUT            |

### Party Information

Party fields from the original order request are echoed back in ExecutionReports:

| Tag | Name       | Description                          |
| --- | ---------- | ------------------------------------ |
| 453 | NoPartyIDs | Number of parties (for sub-accounts) |
| 448 | PartyID    | Sub-account identifier               |
| 452 | PartyRole  | Customer Account\<24>                |

<Note>
  Party fields are only included when the order is placed under a sub-account. These fields help track orders across different sub-accounts or FCM clients.
</Note>

### Rejection Reasons (102)

* **Too late to cancel\<0>**: Order already filled
* **Unknown order\<1>**: Order not found
* **Other\<99>**: See Text field

## Mass Cancel Request (35=q)

Cancel all orders for the trading session.

| Tag | Name                  | Description            |
| --- | --------------------- | ---------------------- |
| 11  | ClOrderID             | Unique request ID      |
| 530 | MassCancelRequestType | Cancel for session\<6> |

## Mass Cancel Report (35=r)

Response to mass cancel request.

| Tag | Name                   | Description                 |
| --- | ---------------------- | --------------------------- |
| 11  | ClOrderID              | Request ID                  |
| 37  | OrderID                | Operation ID                |
| 531 | MassCancelResponse     | Success\<6> or Rejected\<0> |
| 532 | MassCancelRejectReason | If rejected                 |

<Note>
  Individual ExecutionReports will follow for each canceled order.
</Note>
