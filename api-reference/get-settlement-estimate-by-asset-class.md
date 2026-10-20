---
url: https://docs.kalshi.com/api-reference/get-settlement-estimate-by-asset-class
lastmod: 2026-10-19T20:37:47.763Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Settlement Estimate By Asset Class

> Estimated next settlement amounts for the authenticated clearing member, keyed by asset class, including per-subtrader and per-group breakdowns. Asset classes where the member has no margin activity are omitted. `subtrader_breakdowns` and `group_breakdowns` together contain at most the 1,000 entries with the largest maintenance margin requirement; `omitted_subtrader_count` and `omitted_group_count` report how many entries of each type were left out. `user_breakdown` always aggregates across all subtraders.



## OpenAPI

````yaml /perps_scm_openapi.yaml get /margin/settlement_estimate_by_asset_class
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
  /margin/settlement_estimate_by_asset_class:
    get:
      summary: Get Settlement Estimate By Asset Class
      description: >-
        Estimated next settlement amounts for the authenticated clearing member,
        keyed by asset class, including per-subtrader and per-group breakdowns.
        Asset classes where the member has no margin activity are omitted.
        `subtrader_breakdowns` and `group_breakdowns` together contain at most
        the 1,000 entries with the largest maintenance margin requirement;
        `omitted_subtrader_count` and `omitted_group_count` report how many
        entries of each type were left out. `user_breakdown` always aggregates
        across all subtraders.
      operationId: GetSettlementEstimateByAssetClass
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetSettlementEstimateByAssetClassResponse'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    GetSettlementEstimateByAssetClassResponse:
      type: object
      required:
        - estimates
        - settlement_balance_centicents
      properties:
        estimates:
          type: object
          description: >-
            Map of asset class to the estimated next settlement for that asset
            class.
          additionalProperties:
            $ref: '#/components/schemas/AssetClassSettlementEstimate'
        settlement_balance_centicents:
          type: integer
          format: int64
          description: Current settlement buffer balance.
    AssetClassSettlementEstimate:
      type: object
      required:
        - next_runtime
      properties:
        user_breakdown:
          $ref: '#/components/schemas/SettlementEstimate'
          description: >-
            Estimated next settlement for this asset class. Null when the member
            has no activity in this asset class.
        subtrader_breakdowns:
          type: object
          description: Map of subtrader ID to that portfolio's settlement estimate.
          additionalProperties:
            $ref: '#/components/schemas/SettlementEstimate'
        group_breakdowns:
          type: object
          description: >-
            Map of margin group ID to that portfolio's netted settlement
            estimate.
          additionalProperties:
            $ref: '#/components/schemas/SettlementEstimate'
        omitted_subtrader_count:
          type: integer
          format: int64
          description: >-
            Number of subtraders omitted from subtrader_breakdowns. Their
            amounts are still included in user_breakdown.
        omitted_group_count:
          type: integer
          format: int64
          description: >-
            Number of groups omitted from group_breakdowns. Their amounts are
            still included in user_breakdown.
        next_runtime:
          type: string
          format: date-time
          description: Next settlement time for this asset class.
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
    SettlementEstimate:
      type: object
      required:
        - variation_margin_centicents
        - total_fees_centicents
        - maintenance_margin_delta_centicents
        - maintenance_margin_required_centicents
        - total_amount_centicents
      properties:
        variation_margin_centicents:
          type: integer
          format: int64
          description: Variation margin.
        total_fees_centicents:
          type: integer
          format: int64
          description: Total fees.
        maintenance_margin_delta_centicents:
          type: integer
          format: int64
          description: Change in maintenance margin requirement.
        maintenance_margin_required_centicents:
          type: integer
          format: int64
          description: Maintenance margin requirement.
        total_amount_centicents:
          type: integer
          format: int64
          description: Estimated total settlement amount.
        positions:
          type: object
          description: Map of market ticker to that market's settlement estimate.
          additionalProperties:
            $ref: '#/components/schemas/MarketSettlementEstimate'
    MarketSettlementEstimate:
      type: object
      required:
        - quantity_centicount
        - variation_margin_centicents
        - notional_value_centicents
      properties:
        quantity_centicount:
          type: integer
          format: int64
          description: Position quantity in centicounts.
        variation_margin_centicents:
          type: integer
          format: int64
          description: Variation margin for this market.
        notional_value_centicents:
          type: integer
          format: int64
          description: Notional value for this market.
        session_avg_price_fp:
          type: string
          description: >-
            Average entry price for the current settlement session, as a
            fixed-point dollar string. Omitted when the position quantity is
            zero.
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