---
url: https://docs.kalshi.com/margin-rest/market/get-market
lastmod: 2026-07-23T20:29:14.169Z
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
        - tick_size
        - fractional_trading_enabled
        - schedule
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
        leverage_estimates:
          type: object
          additionalProperties:
            type: number
            format: double
          description: >
            Leverage estimates (1 / margin_rate) keyed by notional position size
            in dollars ("1000", "10000", "100000", "1000000"). Leverage
            decreases at larger notionals as the liquidation margin rate grows
            with size. Null when margin config or price data is unavailable.
        price:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Last trade price in dollars.
        volume:
          $ref: '#/components/schemas/FixedPointCount'
          description: One sided total trade volume.
        volume_notional_value_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Total notional value of one sided trade volume in dollars.
        open_interest:
          $ref: '#/components/schemas/FixedPointCount'
          description: One sided open interest.
        open_interest_notional_value_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Total notional value of one sided open interest in dollars.
        volume_24h:
          $ref: '#/components/schemas/FixedPointCount'
          description: One sided trade volume in the last 24 hours.
        volume_24h_notional_value_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Total notional value of one sided trade volume in the last 24 hours
            in dollars.
        bid:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Best bid price in dollars.
        ask:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Best ask price in dollars.
        settlement_mark_price:
          $ref: '#/components/schemas/TickerPrice'
          description: Mark price used for settlement and funding.
        liquidation_mark_price:
          $ref: '#/components/schemas/TickerPrice'
          description: Mark price used for liquidation.
        reference_price:
          $ref: '#/components/schemas/TickerPrice'
          description: Underlying reference price, scaled per contract.
        schedule:
          $ref: '#/components/schemas/MarginMarketSchedule'
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
    MarginMarketStatus:
      type: string
      enum:
        - inactive
        - active
        - closed
      description: The status of a margin market
    FixedPointCount:
      type: string
      description: >-
        Fixed-point contract count string (2 decimals, e.g., "10.00"; referred
        to as "fp" in field names). Requests accept 0-2 decimal places (e.g.,
        "10", "10.0", "10.00"); responses always emit 2 decimals. Fractional
        contract values (e.g., "2.50") are supported; the minimum granularity is
        0.01 contracts.
      example: '10.00'
    TickerPrice:
      type: object
      required:
        - price
        - ts_ms
      properties:
        price:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Price in dollars.
        ts_ms:
          type: integer
          format: int64
          description: Source timestamp in epoch milliseconds.
    MarginMarketSchedule:
      type: object
      nullable: true
      description: Current market trading schedule. Null for markets that trade 24/7.
      required:
        - is_open
        - next_close_ts
        - next_open_ts
      properties:
        is_open:
          type: boolean
          description: Whether the market is currently open for trading.
        next_close_ts:
          type: integer
          format: int64
          nullable: true
          description: >-
            Unix timestamp in seconds for the next scheduled close. Null while
            closed.
        next_open_ts:
          type: integer
          format: int64
          nullable: true
          description: >-
            Unix timestamp in seconds for the next scheduled open. Null while
            open.
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
        Rate limit exceeded. The default cost is 10 tokens per request. Use GET
        /trade-api/v2/account/endpoint_costs to list non-default endpoint costs.
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