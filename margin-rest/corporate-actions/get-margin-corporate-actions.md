---
url: https://docs.kalshi.com/margin-rest/corporate-actions/get-margin-corporate-actions
lastmod: 2026-10-23T16:35:22.944Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Margin Corporate Actions

> Returns scheduled notices and notices updated in the last seven days for margin markets.
Notices are sorted by ex-date ascending (earliest first), with notices without an ex-date last.
Ties are ordered by updated_ts ascending, then id ascending.
Covers cash dividends, special dividends, cash spin-offs, stock splits, final settlements and ticker changes.
Each notice identifies its type and has a scheduled, cancelled, applied or lapsed status.
Scheduled, applied and lapsed notices include exactly one terms object matching the type:
cash, split, final_settlement or ticker_change. Cancelled notices omit all terms and
execution_time; use the stable notice id to associate a cancellation with an earlier announcement.
Amounts are US dollar strings. Per-contract amounts are computed by clearing and are
not recalculated from contract size by this endpoint.




## OpenAPI

````yaml /perps_openapi.yaml get /margin/corporate_actions
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 0.0.1
  description: >-
    Manually defined OpenAPI spec for endpoints being migrated to spec-first
    approach
servers:
  - url: https://external-api.kalshi.com/trade-api/v2
    description: Production perps REST API server
  - url: https://external-api.demo.kalshi.co/trade-api/v2
    description: Demo perps REST API server
security: []
tags:
  - name: account
    description: Account information endpoints
  - name: fcm
    description: FCM member specific endpoints
  - name: exchange
    description: Exchange status and information endpoints
  - name: market
    description: Market data endpoints
  - name: orders
    description: Order management endpoints
  - name: order-groups
    description: Order group management endpoints
  - name: portfolio
    description: Portfolio and balance information endpoints
  - name: risk
    description: Margin risk metrics, parameters, and limits
  - name: funding
    description: Funding rates and payment history
  - name: fees
    description: Margin fee schedule
  - name: exit-triggers
    description: Stop-loss, take-profit, and trailing-stop triggers on margin positions
paths:
  /margin/corporate_actions:
    get:
      tags:
        - corporate-actions
      summary: Get Margin Corporate Actions
      description: >
        Returns scheduled notices and notices updated in the last seven days for
        margin markets.

        Notices are sorted by ex-date ascending (earliest first), with notices
        without an ex-date last.

        Ties are ordered by updated_ts ascending, then id ascending.

        Covers cash dividends, special dividends, cash spin-offs, stock splits,
        final settlements and ticker changes.

        Each notice identifies its type and has a scheduled, cancelled, applied
        or lapsed status.

        Scheduled, applied and lapsed notices include exactly one terms object
        matching the type:

        cash, split, final_settlement or ticker_change. Cancelled notices omit
        all terms and

        execution_time; use the stable notice id to associate a cancellation
        with an earlier announcement.

        Amounts are US dollar strings. Per-contract amounts are computed by
        clearing and are

        not recalculated from contract size by this endpoint.
      operationId: GetMarginCorporateActions
      parameters:
        - name: ticker
          in: query
          required: false
          description: >-
            Filter by market ticker. Omit to return notices across all margin
            markets.
          schema:
            type: string
            x-go-type-skip-optional-pointer: true
        - name: market_id
          in: query
          required: false
          description: >-
            Filter by market UUID. Omit to return notices across all margin
            markets.
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Corporate action notices
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarginCorporateActionsResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    GetMarginCorporateActionsResponse:
      type: object
      required:
        - corporate_actions
      properties:
        corporate_actions:
          type: array
          items:
            $ref: '#/components/schemas/MarginCorporateAction'
    MarginCorporateAction:
      type: object
      description: >-
        A margin corporate action notice. Scheduled, applied and lapsed notices
        have exactly one terms object matching type: cash for cash_dividend,
        special_dividend or spin_off, split for stock_split, final_settlement
        for final_settlement, or ticker_change for ticker_change. Cancelled
        notices omit all four terms objects and execution_time.
      required:
        - id
        - market_id
        - market_ticker
        - type
        - status
        - updated_ts
      properties:
        id:
          type: string
          description: Stable notice id, equal to the Klear review id.
        market_id:
          type: string
          description: Stable market UUID.
        market_ticker:
          type: string
          description: Market ticker.
        type:
          type: string
          enum:
            - cash_dividend
            - special_dividend
            - spin_off
            - stock_split
            - final_settlement
            - ticker_change
          x-enum-varnames:
            - MarginCorporateActionTypeCashDividend
            - MarginCorporateActionTypeSpecialDividend
            - MarginCorporateActionTypeSpinOff
            - MarginCorporateActionTypeStockSplit
            - MarginCorporateActionTypeFinalSettlement
            - MarginCorporateActionTypeTickerChange
          description: Corporate action type, identifying which terms object is present.
        status:
          type: string
          enum:
            - scheduled
            - cancelled
            - applied
            - lapsed
          description: Public notice status.
        updated_ts:
          type: string
          format: date-time
          description: Time of the latest clearing update.
        execution_time:
          type: string
          format: date-time
          nullable: true
          description: Review execution time. Omitted for cancelled notices.
        cash:
          $ref: '#/components/schemas/MarginCorporateActionCashTerms'
        split:
          $ref: '#/components/schemas/MarginCorporateActionSplitTerms'
        final_settlement:
          $ref: '#/components/schemas/MarginCorporateActionFinalSettlementTerms'
        ticker_change:
          $ref: '#/components/schemas/MarginCorporateActionTickerChangeTerms'
    ErrorResponse:
      type: object
      properties:
        code:
          type: string
          description: Error code
        message:
          type: string
          description: Human-readable error message
        details:
          type: string
          description: Additional details about the error, if available
    MarginCorporateActionCashTerms:
      type: object
      nullable: true
      description: >-
        Terms for cash_dividend, special_dividend or spin_off. Omitted for other
        types and cancelled notices.
      properties:
        cash_per_share:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Cash in US dollars per underlying share.
        cash_per_contract:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Cash in US dollars per contract. A positive amount credits longs and
            debits shorts.
        ex_date:
          type: string
          format: date
          description: Corporate action ex-date, where available.
    MarginCorporateActionSplitTerms:
      type: object
      nullable: true
      description: Terms for stock_split. Omitted for other types and cancelled notices.
      properties:
        ratio_old:
          type: string
          description: Old-share component of the split ratio.
        ratio_new:
          type: string
          description: New-share component of the split ratio.
        ex_date:
          type: string
          format: date
          description: Corporate action ex-date, where available.
    MarginCorporateActionFinalSettlementTerms:
      type: object
      nullable: true
      description: >-
        Terms for final_settlement. Omitted for other types and cancelled
        notices.
      required:
        - reason
      properties:
        reason:
          type: string
          description: 'Final settlement reason: bankruptcy, merger, delisting or other.'
        settlement_price_per_share:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Final settlement price in US dollars per underlying share.
        settlement_price_per_contract:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Final settlement price in US dollars per contract, rounded by
            clearing.
    MarginCorporateActionTickerChangeTerms:
      type: object
      nullable: true
      description: Terms for ticker_change. Omitted for other types and cancelled notices.
      required:
        - old_ticker
        - new_ticker
      properties:
        old_ticker:
          type: string
          description: Previous underlying ticker for a ticker change.
        new_ticker:
          type: string
          description: Approved replacement underlying ticker.
    FixedPointDollars:
      type: string
      description: >-
        Fixed-point US dollar string. Most request fields accept 2-4 decimal
        places (e.g., "0.56", "0.5600"); responses emit up to 6. Valid quote
        intervals for a given market are constrained by that market's price
        level structure.
      example: '0.5600'
  responses:
    BadRequestError:
      description: Bad request - invalid input
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    InternalServerError:
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.