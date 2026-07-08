---
url: https://docs.kalshi.com/margin-rest/risk/get-risk
lastmod: 2026-07-07T23:20:10.907Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Risk

> Endpoint for retrieving leverage and liquidation price data for the authenticated direct margin user. Returns account-level leverage plus per-position leverage and liquidation prices, grouped by subaccount and market.



## OpenAPI

````yaml /perps_openapi.yaml get /margin/risk
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
  - name: fcm
    description: FCM member specific endpoints
  - name: risk
    description: Margin risk metrics, parameters, and limits
  - name: funding
    description: Funding rates and payment history
  - name: fees
    description: Margin fee schedule
paths:
  /margin/risk:
    get:
      tags:
        - risk
      summary: Get Risk
      description: >-
        Endpoint for retrieving leverage and liquidation price data for the
        authenticated direct margin user. Returns account-level leverage plus
        per-position leverage and liquidation prices, grouped by subaccount and
        market.
      operationId: GetMarginRisk
      responses:
        '200':
          description: Margin risk data retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarginRiskResponse'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    GetMarginRiskResponse:
      type: object
      required:
        - total_position_notional
        - total_maintenance_margin
        - positions
      properties:
        account_leverage:
          type: number
          format: double
          description: >-
            Account-level leverage (total_position_notional /
            total_maintenance_margin). Null when total maintenance margin is
            zero.
          nullable: true
        total_position_notional:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Sum of absolute position notional values across all positions in
            fixed-point dollars
        total_maintenance_margin:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Sum of maintenance margin requirements across all positions in
            fixed-point dollars
        positions:
          type: array
          items:
            $ref: '#/components/schemas/MarginRiskPosition'
          description: Per-position risk breakdown grouped by subaccount and market
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with up to 6 decimal
        places of precision. This is the maximum supported precision; valid
        quote intervals for a given market are constrained by that market's
        price level structure.
      example: '0.5600'
    MarginRiskPosition:
      type: object
      required:
        - subaccount
        - market_ticker
        - position
        - mark_price
        - position_notional
        - is_portfolio
      properties:
        subaccount:
          type: integer
          description: The subaccount number (0 for primary, 1-63 for subaccounts)
        market_ticker:
          type: string
          description: Market ticker symbol
        position:
          $ref: '#/components/schemas/FixedPointCount'
          description: Signed position quantity as a fixed-point count string
        mark_price:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Current mark price for the market in fixed-point dollars
        position_notional:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Absolute notional value of the position (|qty| * mark_price) in
            fixed-point dollars
        maintenance_margin_required:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Maintenance margin requirement for this position in fixed-point
            dollars. Null if margin config is missing.
          nullable: true
        position_leverage:
          type: number
          format: double
          description: >-
            Position leverage ratio (position_notional /
            maintenance_margin_required). Null when maintenance margin is zero
            or config is missing.
          nullable: true
        estimated_liquidation_price:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Estimated portfolio-aware liquidation price for this position within
            the subaccount. Null when no valid liquidation price exists.
          nullable: true
        is_portfolio:
          type: boolean
          description: >-
            True when this position is hedged within a portfolio, so
            maintenance_margin_required, position_leverage, and
            estimated_liquidation_price cannot be attributed to it individually
            and are not reported.
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
        service:
          type: string
          description: The name of the service that generated the error
    FixedPointCount:
      type: string
      description: >-
        Fixed-point contract count string (2 decimals, e.g., "10.00"; referred
        to as "fp" in field names). Requests accept 0-2 decimal places (e.g.,
        "10", "10.0", "10.00"); responses always emit 2 decimals. Fractional
        contract values (e.g., "2.50") are supported; the minimum granularity is
        0.01 contracts.
      example: '10.00'
  responses:
    UnauthorizedError:
      description: Unauthorized - authentication required
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    ForbiddenError:
      description: Forbidden - insufficient permissions
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
  securitySchemes:
    kalshiAccessKey:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-KEY
      description: Your API key ID
    kalshiAccessSignature:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-SIGNATURE
      description: RSA-PSS signature of the request
    kalshiAccessTimestamp:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-TIMESTAMP
      description: Request timestamp in milliseconds

````