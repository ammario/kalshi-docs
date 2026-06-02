---
url: https://docs.kalshi.com/margin-rest/market/get-market
lastmod: 2026-06-01T15:43:43.152Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Market

> Endpoint for fetching a margin market with trading stats (price, volume, open interest).



## OpenAPI

````yaml /perps_openapi.yaml get /margin/markets/{ticker}
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
  /margin/markets/{ticker}:
    get:
      tags:
        - market
      summary: Get Market
      description: >-
        Endpoint for fetching a margin market with trading stats (price, volume,
        open interest).
      operationId: GetMarginMarket
      parameters:
        - in: path
          name: ticker
          required: true
          schema:
            type: string
          description: Ticker of the market
      responses:
        '200':
          description: Market retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MarginMarketResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '404':
          $ref: '#/components/responses/NotFoundError'
        '429':
          $ref: '#/components/responses/RateLimitError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    MarginMarketResponse:
      type: object
      required:
        - market
      properties:
        market:
          $ref: '#/components/schemas/MarginMarket'
    MarginMarket:
      type: object
      required:
        - ticker
        - status
        - title
        - contract_size
        - fractional_trading_enabled
      properties:
        ticker:
          type: string
        title:
          type: string
        contract_size:
          type: string
          description: Fixed-point number with 6 decimal places
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
    MarginMarketStatus:
      type: string
      enum:
        - inactive
        - active
        - closed
      description: The status of a margin market
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
    NotFoundError:
      description: Resource not found
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