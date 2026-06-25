---
url: https://docs.kalshi.com/margin-rest/market/get-market-candlesticks
lastmod: 2026-06-24T22:54:24.969Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Market Candlesticks

> Endpoint for fetching candlestick data for a margin market.



## OpenAPI

````yaml /perps_openapi.yaml get /margin/markets/{ticker}/candlesticks
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
  /margin/markets/{ticker}/candlesticks:
    get:
      tags:
        - market
      summary: Get Market Candlesticks
      description: Endpoint for fetching candlestick data for a margin market.
      operationId: GetMarginMarketCandlesticks
      parameters:
        - in: path
          name: ticker
          required: true
          schema:
            type: string
          description: Ticker of the margin market
        - name: start_ts
          in: query
          required: true
          description: >-
            Start timestamp (Unix timestamp). Candlesticks will include those
            ending on or after this time.
          schema:
            type: integer
            format: int64
        - name: end_ts
          in: query
          required: true
          description: >-
            End timestamp (Unix timestamp). Candlesticks will include those
            ending on or before this time.
          schema:
            type: integer
            format: int64
        - name: period_interval
          in: query
          required: true
          description: >-
            Time period length of each candlestick in minutes. Valid values are
            1 (1 minute), 60 (1 hour), or 1440 (1 day).
          schema:
            type: integer
            enum:
              - 1
              - 60
              - 1440
          x-oapi-codegen-extra-tags:
            validate: required,oneof=1 60 1440
        - name: include_latest_before_start
          in: query
          required: false
          description: >
            If true, prepends the latest candlestick available before the
            start_ts. This synthetic candlestick is created by:

            1. Finding the most recent real candlestick before start_ts

            2. Projecting it forward to the first period boundary (calculated as
            the next period interval after start_ts)

            3. Setting all OHLC prices to null, and `price.previous` to the
            close price from the real candlestick
          schema:
            type: boolean
            default: false
      responses:
        '200':
          description: Candlesticks retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarginMarketCandlesticksResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '404':
          $ref: '#/components/responses/NotFoundError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    GetMarginMarketCandlesticksResponse:
      type: object
      required:
        - ticker
        - candlesticks
      properties:
        ticker:
          type: string
          description: Unique identifier for the margin market.
        candlesticks:
          type: array
          description: Array of candlestick data points for the specified time range.
          items:
            $ref: '#/components/schemas/MarginMarketCandlestick'
    MarginMarketCandlestick:
      type: object
      required:
        - end_period_ts
        - bid
        - ask
        - price
        - volume
        - volume_notional_value_dollars
        - open_interest
        - open_interest_notional_value_dollars
      properties:
        end_period_ts:
          type: integer
          format: int64
          description: Unix timestamp for the inclusive end of the candlestick period.
        bid:
          $ref: '#/components/schemas/BidAskDistributionHistorical'
          description: >-
            Open, high, low, close (OHLC) data for buy offers on the market
            during the candlestick period.
        ask:
          $ref: '#/components/schemas/BidAskDistributionHistorical'
          description: >-
            Open, high, low, close (OHLC) data for sell offers on the market
            during the candlestick period.
        price:
          $ref: '#/components/schemas/PriceDistributionHistorical'
          description: >-
            Open, high, low, close (OHLC) and more data for trade prices on the
            market during the candlestick period.
        volume:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            Number of contracts traded on the market during the candlestick
            period.
        volume_notional_value_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Notional value of contracts traded on the market during the
            candlestick period.
        open_interest:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            Number of contracts held on the market by end of the candlestick
            period (end_period_ts).
        open_interest_notional_value_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Notional value of contracts held on the market by end of the
            candlestick period (end_period_ts).
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
    BidAskDistributionHistorical:
      type: object
      required:
        - open
        - low
        - high
        - close
      description: >-
        OHLC data for quoted prices on one side of the orderbook during the
        candlestick period. These values reflect bid or ask quotes, not executed
        trade prices.
      properties:
        open:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Quoted price at the start of the candlestick period (in dollars).
        low:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Lowest quoted price during the candlestick period (in dollars).
        high:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Highest quoted price during the candlestick period (in dollars).
        close:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Quoted price at the end of the candlestick period (in dollars).
    PriceDistributionHistorical:
      type: object
      required:
        - open
        - low
        - high
        - close
        - mean
        - previous
      properties:
        open:
          allOf:
            - $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            Price of the first trade during the candlestick period (in dollars).
            Null if no trades occurred.
        low:
          allOf:
            - $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            Lowest trade price during the candlestick period (in dollars). Null
            if no trades occurred.
        high:
          allOf:
            - $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            Highest trade price during the candlestick period (in dollars). Null
            if no trades occurred.
        close:
          allOf:
            - $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            Price of the last trade during the candlestick period (in dollars).
            Null if no trades occurred.
        mean:
          allOf:
            - $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            Volume-weighted average price during the candlestick period (in
            dollars). Null if no trades occurred.
        previous:
          allOf:
            - $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            Close price from the previous candlestick period (in dollars). Null
            if this is the first candlestick or no prior trade exists.
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
    NotFoundError:
      description: Resource not found
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