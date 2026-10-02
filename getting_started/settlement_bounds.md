---
url: https://docs.kalshi.com/getting_started/settlement_bounds
lastmod: 2026-10-01T19:08:46.487Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Settlement Bounds

> Settlement bounds trading and payout mechanics

<Note>
  Settlement floors are not live yet. The launch timeline is TBA.
</Note>

Certain markets have a scalar payout and can be partly determined before the event ends. The settlement floor is the minimum payout per contract to YES holders.

## Example

A government shutdown market settles at \$0.10 for each day the shutdown lasts, up to 10 days. After 3 days, Kalshi may raise the settlement floor to the guaranteed payout of \$0.30.

## Fields

Markets include `settlement_bounds_type`, which is `default` or `floor`. `default` means Kalshi will never apply a settlement floor to the market. Markets in events with a `collateral_return_type` of `MECNET` or `DIRECNET` are always `default`.

Markets of type `floor` also include `settlement_floor_dollars`. It starts at \$0 when the market is created.

## How It Works

* Kalshi raises the floor when part of the outcome becomes certain.
* YES holders' available balance goes up by the floor increase times their contracts.
* The floor does not affect a NO holder's available balance.
* Buying YES releases collateral equal to the floor. Available balance goes down by the price minus the floor.
* Selling held YES contracts raises available balance by the price minus the floor.
* Orders must have a YES price above the floor. A NO price must be below \$1 minus the floor.
* After a raise, resting orders with a YES price at or below the new floor are canceled. For NO orders, that is a NO price at or above \$1 minus the new floor.
* At settlement, YES holders receive the value the market settles at minus the floor, per contract. NO holders receive \$1 minus the value the market settles at.
* This applies only to members who trade directly with Kalshi. For FCM members, the floor never changes available balance. At settlement, they receive the full value per YES contract.

## Lowering the Floor

In rare cases, Kalshi may lower the settlement floor due to a settlement source correction.

* YES holders' available balance goes down by the floor decrease times their contracts.
* NO holders' available balance does not change.
* Resting orders a [subaccount](/getting_started/subaccounts) can no longer pay for are canceled. This can include orders in other markets.

If a subaccount's available balance goes negative, Kalshi first covers it from the member's other subaccounts. Any amount left stays as a negative balance on the primary subaccount. A subaccount with a negative balance cannot place any orders, including orders that close a position. It can trade again once its balance is back to zero.

## Worked Example

This uses the shutdown market. Fees are left out.

1. The floor is \$0. Member A buys 100 YES at \$0.40. A's available balance goes down by \$40. Member B buys the other side: 100 NO at \$0.60. B's available balance goes down by \$60.
2. After day 3, Kalshi raises the floor to \$0.30. A's available balance goes up by \$30. B's does not change.
3. A sells 50 YES at \$0.45 to member C. A's available balance goes up by \$0.45 minus the \$0.30 floor, times 50: \$7.50. C's goes down by the same \$7.50.
4. The shutdown ends after 5 days. The market settles at \$0.50.
5. A and C each hold 50 YES. Each gets \$0.50 minus the \$0.30 floor: \$0.20 per contract, so \$10.
6. B gets \$1 minus \$0.50: \$0.50 per contract, so \$50.

In total:

* A paid \$40 and got back \$47.50: \$30 at the raise, \$7.50 from the sale and \$10 at settlement.
* C paid \$7.50 and got back \$10.
* B paid \$60 and got back \$50.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.