---
url: https://docs.kalshi.com/fix-margin/order-entry
lastmod: 2026-07-22T18:45:02.057Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Order Entry

> Submit, modify, and cancel margin orders through FIX messages

## New Order Single (35=D)

| Tag   | Name                    | Type         | Required | Description                                                                                                              |
| ----- | ----------------------- | ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| 11    | ClOrderID               | String       | Y        | Client order identifier for idempotency. UUID format is preferred.                                                       |
| 18    | ExecInst                | Char         | N        | Execution instruction flags. Supported values: `6 = Post Only`                                                           |
| 38    | OrderQty                | Decimal      | Y        | Quantity of contracts to trade. Only whole-number quantities are supported.                                              |
| 40    | OrdType                 | Char         | Y        | Supported values: `2 = Limit`                                                                                            |
| 44    | Price                   | Decimal      | Y        | Price per contract in fixed-point dollars, up to 4 decimal places.                                                       |
| 54    | Side                    | Char         | Y        | Supported values: `1 = Buy (bid)`, `2 = Sell (ask)`                                                                      |
| 55    | Symbol                  | String       | Y        | Market ticker                                                                                                            |
| 59    | TimeInForce             | Char         | N        | Supported values: `0 = Day`, `1 = Good Till Cancel`, `3 = Immediate Or Cancel`, `4 = Fill Or Kill`, `6 = Good Till Date` |
| 126   | ExpireTime              | UTCTimestamp | C        | Required when `TimeInForce = GTD`                                                                                        |
| 448   | PartyID                 | String       | N        | Only applicable for FCM entities. Customer-account or subaccount identifier.                                             |
| 452   | PartyRole               | Integer      | N        | Only applicable for FCM entities. Supported value: `24 = Customer Account`                                               |
| 453   | NoPartyIDs              | Integer      | N        | Only applicable for FCM entities. Currently only `1` is supported.                                                       |
| 79    | AllocAccount            | Integer      | N        | Subaccount number (0-63). Alternative to NoPartyIDs.                                                                     |
| 526   | SecondaryClOrdID        | UUID         | N        | [Order group](/getting_started/order_groups) identifier.                                                                 |
| 2964  | SelfTradePreventionType | Integer      | N        | Supported values: `1 = Taker At Cross`, `2 = Maker`                                                                      |
| 21006 | CancelOrderOnPause      | Boolean      | N        | Cancel the order if trading pauses                                                                                       |

```fix Example New Margin Order theme={null}
8=FIXT.1.1|9=200|35=D|34=5|52=20230809-12:34:56.789|49=your-api-key|56=KalshiNR|
11=550e8400-e29b-41d4-a716-446655440000|38=10.00|40=2|54=1|55=BTC-PERP|44=19.5000|
59=1|10=123|
```

## Order Cancel/Replace Request (35=G)

Used to modify an existing order without canceling it.

### Supported Modifications

* **OrderQty**: Increase or decrease the quantity. Increasing quantity forfeits queue priority.
* **Price**: Change the limit price.

| Tag | Name         | Type    | Required | Description                                   |
| --- | ------------ | ------- | -------- | --------------------------------------------- |
| 11  | ClOrderID    | String  | Y        | Unique modification request identifier        |
| 37  | OrderID      | String  | N        | Kalshi exchange order identifier              |
| 38  | OrderQty     | Decimal | Y        | New total quantity for the order              |
| 40  | OrdType      | Char    | Y        | Supported value: `2 = Limit`                  |
| 41  | OrigClOrdID  | String  | Y        | ClOrderID of the order to modify              |
| 44  | Price        | Decimal | N        | New fixed-point dollar price                  |
| 54  | Side         | Char    | Y        | Must match the original order side            |
| 55  | Symbol       | String  | Y        | Must match the original margin market ticker  |
| 448 | PartyID      | String  | N        | FCM customer-account or subaccount identifier |
| 452 | PartyRole    | Integer | N        | FCM party role                                |
| 453 | NoPartyIDs   | Integer | N        | FCM party count                               |
| 79  | AllocAccount | Integer | N        | Subaccount number                             |

## Order Cancel Request (35=F)

Cancel all remaining quantity of an existing order.

| Tag | Name         | Type    | Required | Description                                   |
| --- | ------------ | ------- | -------- | --------------------------------------------- |
| 11  | ClOrderID    | String  | Y        | Unique cancel request identifier              |
| 37  | OrderID      | String  | N        | Kalshi exchange order identifier              |
| 41  | OrigClOrdID  | String  | Y        | ClOrderID of the order to cancel              |
| 54  | Side         | Char    | Y        | Must match the original order side            |
| 55  | Symbol       | String  | Y        | Must match the original margin market ticker  |
| 448 | PartyID      | String  | N        | FCM customer-account or subaccount identifier |
| 452 | PartyRole    | Integer | N        | FCM party role                                |
| 453 | NoPartyIDs   | Integer | N        | FCM party count                               |
| 79  | AllocAccount | Integer | N        | Subaccount number                             |

## Execution Report (35=8)

This message is sent by the exchange to reflect changes to an order's state.

| Tag | Name         | Type         | Required | Description                                                                                                    |
| --- | ------------ | ------------ | -------- | -------------------------------------------------------------------------------------------------------------- |
| 6   | AvgPx        | Decimal      | Y        | Average fill price in fixed-point dollars                                                                      |
| 11  | ClOrderID    | String       | Y        | ClOrderID from the last change-making request                                                                  |
| 14  | CumQty       | Decimal      | Y        | Total quantity filled so far                                                                                   |
| 17  | ExecID       | String       | Y        | Unique sequenced identifier for this report message                                                            |
| 31  | LastPx       | Decimal      | C        | Price of the last fill in fixed-point dollars                                                                  |
| 32  | LastQty      | Decimal      | C        | Quantity of the last fill                                                                                      |
| 37  | OrderID      | String       | Y        | Exchange order identifier                                                                                      |
| 38  | OrderQty     | Decimal      | Y        | Order quantity. By default this is `LeavesQty + CumQty`; if `21008=Y`, it remains the original order quantity. |
| 39  | OrdStatus    | Char         | Y        | Current status of the order after this event                                                                   |
| 41  | OrigClOrdID  | String       | C        | Previous ClOrderID for replaced/canceled orders                                                                |
| 44  | Price        | Decimal      | C        | Limit price in fixed-point dollars                                                                             |
| 54  | Side         | Char         | Y        | Original order side                                                                                            |
| 55  | Symbol       | String       | Y        | Margin market ticker                                                                                           |
| 58  | Text         | String       | N        | Human-readable result description                                                                              |
| 60  | TransactTime | UTCTimestamp | Y        | Timestamp for the triggering event                                                                             |
| 103 | OrdRejReason | Integer      | C        | Rejection reason when `ExecType = Rejected`                                                                    |
| 126 | ExpireTime   | UTCTimestamp | C        | Expiration timestamp                                                                                           |
| 150 | ExecType     | Char         | Y        | Why this execution report was sent                                                                             |
| 151 | LeavesQty    | Decimal      | Y        | Remaining quantity open for execution                                                                          |
| 448 | PartyID      | String       | N        | FCM customer-account or subaccount identifier                                                                  |
| 452 | PartyRole    | Integer      | N        | FCM party role                                                                                                 |
| 453 | NoPartyIDs   | Integer      | N        | FCM party count                                                                                                |
| 79  | AllocAccount | Integer      | C        | Subaccount number                                                                                              |

### Order Status (39)

* **New\<0>**: Active order, no fills
* **Partially Filled\<1>**: Some quantity filled
* **Filled\<2>**: Completely filled
* **Canceled\<4>**: Canceled
* **Replaced\<5>**: Order modified via Cancel/Replace
* **Pending Cancel\<6>**: Cancel pending
* **Rejected\<8>**: Order rejected
* **Pending New\<A>**: Order pending acceptance
* **Expired\<C>**: Time-in-force expired
* **Pending Replace\<E>**: Modification pending

<Note>
  With default settings, expiry-style system cancellations are reported as `Canceled&lt;4&gt;`. If `21012 (UseExpiredOrdStatus)=Y`, expiry-style system cancellations emit `Expired&lt;C&gt;`.
</Note>

### Order Rejection Reasons (103)

* **Unknown symbol\<1>**
* **Exchange closed\<2>**
* **Order exceeds limit\<3>**
* **Too late to enter\<4>**
* **Stale order\<5>**
* **Duplicate order\<6>**
* **Unsupported order characteristic\<11>**
* **Incorrect quantity\<13>**
* **Unknown account\<15>**
* **Other\<99>**

### Execution Types (150)

* **New\<0>**
* **Trade\<F>**
* **Canceled\<4>**
* **Replaced\<5>**
* **Rejected\<8>**
* **Expired\<C>**
* **Pending New\<A>**
* **Pending Cancel\<6>**
* **Pending Replace\<E>**

### Text Field Values (58)

Common values include:

* `EXCHANGE_UNAVAILABLE`
* `INTERNAL_ERROR`
* `MARKET_ALREADY_CLOSED`
* `MARKET_INACTIVE`
* `MARKET_NOT_FOUND`
* `SELF_CROSS_ATTEMPT`
* `ORDER_ALREADY_EXISTS`
* `EXCEEDED_PER_MARKET_RISK_LIMIT`
* `EXCEEDED_ORDER_GROUP_RISK_LIMIT`
* `ORDER_GROUP_NOT_FOUND`
* `FOK_INSUFFICIENT_VOLUME`
* `POST_ONLY_CROSS`
* `ORDER_GROUP_CANCEL`
* `TAKER_CANCEL_FOR_SELF_TRADE_PREVENTION`
* `MAKER_CANCEL_FOR_SELF_TRADE_PREVENTION`
* `IMMEDIATE_OR_CANCELLED`

### OrderCancelReject (35=9)

Exchange-returned amend and cancel failures are returned as OrderCancelReject (35=9), not ExecutionReport.

| Text (58)                     | CxlRejReason (102)      |
| ----------------------------- | ----------------------- |
| `INVALID_AMEND_QTY_FOR_ORDER` | Broker                  |
| `CANNOT_UPDATE_FILLED_ORDER`  | Broker                  |
| `SELF_CROSS_ATTEMPT`          | Invalid price increment |

### Position and Fee Information

When `ExecType = Trade`:

| Tag  | Name               | Description                           |
| ---- | ------------------ | ------------------------------------- |
| 704  | LongQty            | Net long position after trade         |
| 705  | ShortQty           | Net short position after trade        |
| 136  | NoMiscFees         | Number of fees                        |
| 137  | MiscFeeAmt         | Total fees in dollars                 |
| 138  | MiscFeeCurr        | Currency (USD)                        |
| 139  | MiscFeeType        | Exchange fees                         |
| 891  | MiscFeeBasis       | Fee unit (always `ABSOLUTE&lt;0&gt;`) |
| 880  | TrdMatchID         | Trade identifier                      |
| 1057 | AggressorIndicator | Taker/maker flag                      |

### Collateral Changes

| Tag  | Name                      | Description                  |
| ---- | ------------------------- | ---------------------------- |
| 1703 | NoCollateralAmountChanges | Number of collateral changes |
| 1704 | CollateralAmountChange    | Delta in dollars             |
| 1705 | CollateralAmountType      | Balance or payout            |

### Party Information

Party fields from the original request are echoed in execution reports when a sub-account is involved.

### Rejection Reasons (102)

* **Too late to cancel\<0>**
* **Unknown order\<1>**
* **Other\<99>**

## Mass Cancel Request (35=q)

Cancel all orders for the trading session. Only available on KalshiNR (NewOrderMode) sessions.

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
  Individual ExecutionReports follow for each cancelled order.
</Note>
