---
url: https://docs.kalshi.com/margin-rest/portfolio/get-positions
lastmod: 2026-06-20T03:31:22.547Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Positions

> Endpoint for retrieving the authenticated user's margin positions.



## OpenAPI

````yaml /perps_openapi.yaml get /margin/positions
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
  /margin/positions:
    get:
      tags:
        - portfolio
      summary: Get Positions
      description: Endpoint for retrieving the authenticated user's margin positions.
      operationId: GetMarginPositions
      parameters:
        - name: subaccount
          in: query
          required: false
          description: Subaccount number (0 for primary, 1-63 for subaccounts)
          schema:
            type: integer
        - name: ticker
          in: query
          required: false
          description: Filter positions by market ticker
          schema:
            type: string
          x-go-type-skip-optional-pointer: true
      responses:
        '200':
          description: Positions retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarginPositionsResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    GetMarginPositionsResponse:
      type: object
      required:
        - positions
      properties:
        positions:
          type: array
          items:
            $ref: '#/components/schemas/MarginPosition'
    MarginPosition:
      type: object
      required:
        - subaccount
        - market_ticker
        - position
        - entry_price
        - unrealized_pnl
        - margin_used
        - fees
      properties:
        subaccount:
          type: integer
          description: >-
            The subaccount number that holds this position (0 for primary, 1-63
            for subaccounts)
        market_ticker:
          type: string
          description: Market ticker symbol
        position:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            Position size as a fixed-point count string (positive = long,
            negative = short)
        entry_price:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Weighted average entry price of the open position
        unrealized_pnl:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Mark-to-market unrealized PnL for the open position
        margin_used:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Maintenance-margin-based capital usage for the open position
        fees:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Total fees accumulated over the lifetime of the current open
            position, resets when position is fully closed
        roe:
          type: number
          format: double
          nullable: true
          description: >-
            Return on equity as a percentage (unrealized_pnl / margin_used *
            100), null when margin_used is zero
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
        to as "fp" in field names). Requests accept 0–2 decimal places (e.g.,
        "10", "10.0", "10.00"); responses always emit 2 decimals. Fractional
        contract values (e.g., "2.50") are supported on markets with fractional
        trading enabled; the minimum granularity is 0.01 contracts. Integer
        contract count fields are legacy and will be deprecated; when both
        integer and fp fields are provided, they must match.
      example: '10.00'
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with up to 6 decimal
        places of precision. This is the maximum supported precision; valid
        quote intervals for a given market are constrained by that market's
        price level structure.
      example: '0.5600'
  responses:
    BadRequestError:
      description: Bad request - invalid input
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    UnauthorizedError:
      description: Unauthorized - authentication required
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