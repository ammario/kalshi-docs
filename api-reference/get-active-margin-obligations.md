---
url: https://docs.kalshi.com/api-reference/get-active-margin-obligations
lastmod: 2026-10-29T03:14:17.467Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Active Margin Obligations

> Returns the clearing member's outstanding settlement obligations for
the current cycle across all asset classes, ordered by asset class
then obligation ID. A negative amount indicates a net payable to
Kalshi Klear; a positive amount indicates a net receivable. Empty
when no obligation is pending.




## OpenAPI

````yaml /perps_scm_openapi.yaml get /margin/active_obligations
openapi: 3.0.0
info:
  title: Kalshi Clearing Member API
  version: 0.0.1
  description: >
    Klear API endpoints available to clearing members —

    institutional users who clear margin activity directly with

    Kalshi.


    ## Authentication


    All endpoints require an admin access token passed in the `Authorization`
    header:


    `Authorization: Bearer <admin_user_id>:<access_token>`


    To generate an access token and obtain your admin user id, sign in at

    https://klearing.kalshi.com, and navigate to the "Security" page.


    If you are in the process of onboarding to be a clearing member,

    please contact your contact at Kalshi for credentials. Otherwise,

    please contact institutional@kalshi.com.
servers:
  - url: https://api.klear.kalshi.com/klear-api/v1
    description: Production
  - url: https://demo-api.kalshi.co/klear-api/v1
    description: Demo
security:
  - kalshiBearer: []
paths:
  /margin/active_obligations:
    get:
      summary: Get Active Margin Obligations
      description: |
        Returns the clearing member's outstanding settlement obligations for
        the current cycle across all asset classes, ordered by asset class
        then obligation ID. A negative amount indicates a net payable to
        Kalshi Klear; a positive amount indicates a net receivable. Empty
        when no obligation is pending.
      operationId: GetActiveMarginObligations
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetActiveMarginObligationsResponse'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    GetActiveMarginObligationsResponse:
      type: object
      required:
        - obligations
      properties:
        obligations:
          type: array
          description: >-
            Outstanding settlement obligations for the current cycle across all
            asset classes, ordered by asset class then obligation ID. Empty when
            no obligation is pending.
          items:
            $ref: '#/components/schemas/ObligationEntry'
    ObligationEntry:
      allOf:
        - $ref: '#/components/schemas/ObligationInfo'
        - type: object
          required:
            - receives
            - settlement_details
            - maintenance_margin_details
            - funding_payments
            - corporate_action_payments
          properties:
            receives:
              type: array
              items:
                $ref: '#/components/schemas/ObligationReceiveInfo'
            settlement_details:
              type: array
              items:
                $ref: '#/components/schemas/SettlementDetail'
              description: |
                Per-market, per-subtrader breakdown of the settlement amount.
                This structure may change in future versions as margin
                methodology evolves (e.g. portfolio margin).
            maintenance_margin_details:
              type: array
              items:
                $ref: '#/components/schemas/MaintenanceMarginDetail'
              description: |
                Breakdown of the maintenance margin requirement and the delta
                from the prior settlement.
            funding_payments:
              type: array
              items:
                $ref: '#/components/schemas/FundingPaymentDetail'
              description: |
                Per-market, per-subtrader, per-funding-period breakdown of the
                funding payments settled by this obligation.
            corporate_action_payments:
              type: array
              items:
                $ref: '#/components/schemas/CorporateActionPaymentDetail'
              description: >-
                Cash and split corporate-action payments settled by this
                obligation, already reflected in settlement PnL. Empty when no
                corporate-action payments apply.
            corporate_action_payments_truncated:
              type: boolean
              description: >-
                Set when corporate_action_payments was capped at the 1000-row
                inline limit; page the full set via
                /margin/obligations/{obligation_id}/corporate_action_payments.
            settlement_details_truncated:
              type: boolean
              description: >-
                Set when settlement_details was capped at the 1000-row inline
                limit; page the full set via
                /margin/obligations/{obligation_id}/settlement_details.
            maintenance_margin_details_truncated:
              type: boolean
              description: >-
                Set when maintenance_margin_details was capped at the 1000-row
                inline limit; page the full set via
                /margin/obligations/{obligation_id}/maintenance_margin_details.
            funding_payments_truncated:
              type: boolean
              description: >-
                Set when funding_payments was capped at the 1000-row inline
                limit; page the full set via
                /margin/obligations/{obligation_id}/funding_payments.
    Error:
      type: object
      required:
        - code
        - message
      properties:
        code:
          type: string
          description: Machine-readable error code.
        message:
          type: string
          description: Human-readable error message.
        details:
          type: string
        service:
          type: string
    ObligationInfo:
      type: object
      required:
        - id
        - user_id
        - amount_centicents
        - amount_fp
        - fees_centicents
        - maintenance_margin_centicents
        - pnl_centicents
        - pnl_fp
        - execution_time
        - last_updated_ts
        - asset_class
      properties:
        id:
          type: string
        user_id:
          type: string
        amount_centicents:
          type: integer
          format: int64
          description: |
            Net settlement amount in USD as centicents (1 USD = 10,000
            centicents). Monetary fields ending in `_centicents` are integer
            centicents; where an `_fp` counterpart exists, it carries the same
            amount as a fixed-point dollar string with 6 decimal places. Total
            the clearing member owes or is owed, inclusive of PnL, fees, and
            maintenance margin changes. Negative means the clearing member pays
            Kalshi Klear; positive means Kalshi Klear pays the clearing member.
        amount_fp:
          type: string
          description: >-
            amount_centicents as a fixed-point dollar string with 6 decimal
            places (e.g. "10005.000000").
        fees_centicents:
          type: integer
          format: int64
          description: Trading fees incurred during the settlement period.
        maintenance_margin_centicents:
          type: integer
          format: int64
          description: Current maintenance margin requirement for this obligation.
        pnl_centicents:
          type: integer
          format: int64
          description: >-
            Total PnL for this settlement period; the sum of the settlement
            details for this settlement cycle.
        pnl_fp:
          type: string
          description: pnl_centicents as a fixed-point dollar string with 6 decimal places.
        execution_time:
          type: string
          format: date-time
          description: Settlement cycle time this obligation belongs to.
        last_updated_ts:
          type: string
          format: date-time
          description: Timestamp of the last status change on this obligation.
        asset_class:
          $ref: '#/components/schemas/AssetClass'
    ObligationReceiveInfo:
      type: object
      required:
        - id
        - type
        - amount_centicents
        - amount_fp
        - external_reference
        - created_ts
      properties:
        id:
          type: string
        type:
          type: string
        amount_centicents:
          type: integer
          format: int64
        amount_fp:
          type: string
          description: >-
            amount_centicents as a fixed-point dollar string with 6 decimal
            places.
        external_reference:
          type: string
        created_ts:
          type: string
          format: date-time
    SettlementDetail:
      type: object
      required:
        - id
        - market_ticker
        - subtrader_id
        - position_quantity_fp
        - pnl_centicents
        - pnl_fp
        - total_fees_centicents
        - total_amount_centicents
        - total_amount_fp
      properties:
        id:
          type: string
        market_ticker:
          type: string
        subtrader_id:
          type: string
        position_quantity_fp:
          type: string
          description: >-
            Signed position at settlement as a fixed-point contract count (e.g.
            "1.25").
        pnl_centicents:
          type: integer
          format: int64
          description: >-
            Total PnL for this market and subtrader over the settlement period,
            including the market's net funding (itemized per funding period in
            the entry's funding_payments).
        pnl_fp:
          type: string
          description: pnl_centicents as a fixed-point dollar string with 6 decimal places.
        total_fees_centicents:
          type: integer
          format: int64
          description: Total fees.
        total_amount_centicents:
          type: integer
          format: int64
          description: Total amount.
        total_amount_fp:
          type: string
          description: >-
            total_amount_centicents as a fixed-point dollar string with 6
            decimal places.
    MaintenanceMarginDetail:
      type: object
      required:
        - id
        - subtrader_id
        - maintenance_margin_centicents
        - maintenance_margin_delta_centicents
      properties:
        id:
          type: string
        subtrader_id:
          type: string
          description: >-
            Empty when not populated or when the subtrader is part of a
            subtrader group.
        margin_group_id:
          type: string
          description: Set when the subtrader is part of a subtrader group.
        maintenance_margin_centicents:
          type: integer
          format: int64
          description: Maintenance margin requirement after this settlement.
        maintenance_margin_delta_centicents:
          type: integer
          format: int64
          description: >-
            Change in maintenance margin between the previous settlement and
            this one.
    FundingPaymentDetail:
      type: object
      required:
        - id
        - market_ticker
        - subtrader_id
        - funding_time
        - position_quantity_fp
        - notional_value_centicents
        - notional_value_fp
        - funding_amount_centicents
        - funding_amount_fp
      properties:
        id:
          type: string
        market_ticker:
          type: string
        subtrader_id:
          type: string
        funding_time:
          type: string
          format: date-time
          description: The funding period this payment applies to.
        position_quantity_fp:
          type: string
          description: >-
            Signed position at funding time as a fixed-point contract count
            (e.g. "1.25").
        notional_value_centicents:
          type: integer
          format: int64
          description: >-
            Signed notional value (position times mark price) the funding
            payment was computed from.
        notional_value_fp:
          type: string
          description: >-
            notional_value_centicents as a fixed-point dollar string with 6
            decimal places.
        funding_amount_centicents:
          type: integer
          format: int64
          description: Signed funding amount; positive when received, negative when paid.
        funding_amount_fp:
          type: string
          description: >-
            funding_amount_centicents as a fixed-point dollar string with 6
            decimal places.
    CorporateActionPaymentDetail:
      type: object
      description: >-
        Cash distributions and split adjustments already reflected in settlement
        PnL; these are not additional amounts to add to the obligation total.
      required:
        - id
        - type
        - ca_id
        - market_id
        - market_ticker
        - asset_class
        - subtrader_id
        - position_quantity_fp
        - post_position_quantity_fp
        - payment_amount_centicents
        - payment_amount_fp
        - payment_time
        - settlement_execution_time
        - created_ts
      properties:
        id:
          type: string
        type:
          type: string
          description: Corporate-action type.
        ca_id:
          type: string
          description: Identifier of the corporate action that generated this payment.
        market_id:
          type: string
          format: uuid
        market_ticker:
          type: string
        asset_class:
          $ref: '#/components/schemas/AssetClass'
        subtrader_id:
          type: string
        position_quantity_fp:
          type: string
          description: Signed position before the action as a fixed-point contract count.
        post_position_quantity_fp:
          type: string
          description: >-
            Signed position after the action as a fixed-point contract count;
            unchanged for cash distributions.
        payment_amount_centicents:
          type: integer
          format: int64
          description: >-
            Signed cash amount; positive when received and negative when paid.
            For splits this is cash in lieu and excludes position revaluation.
        payment_amount_fp:
          type: string
          description: >-
            payment_amount_centicents as a fixed-point dollar string with 6
            decimal places.
        payment_time:
          type: string
          format: date-time
          nullable: true
          description: Scheduled cash payment time; null for splits.
        settlement_execution_time:
          type: string
          format: date-time
          description: Settlement cycle that carries this payment.
        pre_split_price_centicents:
          type: integer
          format: int64
          description: Mark price before the split; omitted when not applicable.
        post_split_price_centicents:
          type: integer
          format: int64
          description: Mark price after the split; omitted when not applicable.
        exchange_ts:
          type: string
          format: date-time
          description: Exchange event timestamp when available.
        created_ts:
          type: string
          format: date-time
          description: Time the payment row was created.
    AssetClass:
      type: string
      enum:
        - Crypto
        - Equities
        - Metals
        - Indices
        - Energy
      description: Asset class of the margin markets covered by this entry.
  responses:
    UnauthorizedError:
      description: Missing or invalid authentication
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    ForbiddenError:
      description: Caller is not permitted to access this resource
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    InternalServerError:
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
  securitySchemes:
    kalshiBearer:
      type: http
      scheme: bearer
      bearerFormat: admin_user_id:access_token
      description: >
        Pass `Authorization: Bearer <admin_user_id>:<access_token>` on each
        request.

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.