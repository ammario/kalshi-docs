---
url: https://docs.kalshi.com/margin-rest/market/get-markets
lastmod: 2026-06-03T14:55:30.296Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Markets

> Endpoint for listing available margin markets.



## OpenAPI

````yaml /perps_openapi.yaml get /margin/markets
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
  /margin/markets:
    get:
      tags:
        - market
      summary: Get Markets
      description: Endpoint for listing available margin markets.
      operationId: GetMarginMarkets
      parameters:
        - in: query
          name: status
          required: false
          schema:
            $ref: '#/components/schemas/MarginMarketStatus'
          x-go-type-skip-optional-pointer: true
          description: Filter by market status (e.g. active, inactive, closed)
      responses:
        '200':
          description: Markets retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarginMarketsResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '429':
          $ref: '#/components/responses/RateLimitError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    MarginMarketStatus:
      type: string
      enum:
        - inactive
        - active
        - closed
      description: The status of a margin market
    GetMarginMarketsResponse:
      type: object
      required:
        - markets
      properties:
        markets:
          type: array
          items:
            $ref: '#/components/schemas/MarginMarket'
    MarginMarket:
      type: object
      required:
        - ticker
        - status
        - title
        - contract_size
        - tick_size
        - fractional_trading_enabled
      properties:
        ticker:
          type: string
        title:
          type: string
        contract_size:
          type: string
          description: Fixed-point number with 6 decimal places
        tick_size:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Minimum price increment in dollars.
        status:
          $ref: '#/components/schemas/MarginMarketStatus'
        fractional_trading_enabled:
          type: boolean
        leverage_estimate:
          type: number
          format: double
          description: >
            Leverage estimate (1 / margin_rate) evaluated at a small
            retail-sized notional position. Actual leverage may be lower for
            larger positions as the liquidation margin rate grows with size.
            Null when margin config or price data is unavailable.
        price:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Last trade price in dollars.
        volume:
          $ref: '#/components/schemas/FixedPointCount'
          description: One sided total trade volume.
        open_interest:
          $ref: '#/components/schemas/FixedPointCount'
          description: One sided open interest.
        volume_24h:
          $ref: '#/components/schemas/FixedPointCount'
          description: One sided trade volume in the last 24 hours.
        bid:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Best bid price in dollars.
        ask:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Best ask price in dollars.
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
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with up to 6 decimal
        places of precision. This is the maximum supported precision; valid
        quote intervals for a given market are constrained by that market's
        price level structure.
      example: '0.5600'
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
  responses:
    BadRequestError:
      description: Bad request - invalid input
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    RateLimitError:
      description: >-
        Rate limit exceeded. The default cost is 10 tokens per request;
        endpoints that deviate show a **Rate limit** callout at the top of their
        own page. See [Rate Limits and Tiers](/getting_started/rate_limits).
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