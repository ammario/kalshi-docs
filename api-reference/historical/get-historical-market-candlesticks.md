---
url: https://docs.kalshi.com/api-reference/historical/get-historical-market-candlesticks
lastmod: 2026-02-19T23:17:06.793Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Historical Market Candlesticks

>  Endpoint for fetching historical candlestick data for markets that have been archived from the live data set. Time period length of each candlestick in minutes. Valid values: 1 (1 minute), 60 (1 hour), 1440 (1 day).



## OpenAPI

````yaml openapi.yaml get /historical/markets/{ticker}/candlesticks
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.8.0
  description: >-
    Manually defined OpenAPI spec for endpoints being migrated to spec-first
    approach
servers:
  - url: https://api.elections.kalshi.com/trade-api/v2
    description: Production server
security: []
tags:
  - name: api-keys
    description: API key management endpoints
  - name: orders
    description: Order management endpoints
  - name: order-groups
    description: Order group management endpoints
  - name: portfolio
    description: Portfolio and balance information endpoints
  - name: communications
    description: Request-for-quote (RFQ) endpoints
  - name: multivariate
    description: Multivariate event collection endpoints
  - name: exchange
    description: Exchange status and information endpoints
  - name: live-data
    description: Live data endpoints
  - name: markets
    description: Market data endpoints
  - name: milestone
    description: Milestone endpoints
  - name: search
    description: Search and filtering endpoints
  - name: incentive-programs
    description: Incentive program endpoints
  - name: fcm
    description: FCM member specific endpoints
  - name: events
    description: Event endpoints
  - name: structured-targets
    description: Structured targets endpoints
paths:
  /historical/markets/{ticker}/candlesticks:
    get:
      tags:
        - historical
      summary: Get Historical Market Candlesticks
      description: ' Endpoint for fetching historical candlestick data for markets that have been archived from the live data set. Time period length of each candlestick in minutes. Valid values: 1 (1 minute), 60 (1 hour), 1440 (1 day).'
      operationId: GetMarketCandlesticksHistorical
      parameters:
        - name: ticker
          in: path
          required: true
          description: Market ticker - unique identifier for the specific market
          schema:
            type: string
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
      responses:
        '200':
          description: Candlesticks retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarketCandlesticksHistoricalResponse'
        '400':
          description: Bad request
        '404':
          description: Not found
        '500':
          description: Internal server error
components:
  schemas:
    GetMarketCandlesticksHistoricalResponse:
      type: object
      required:
        - ticker
        - candlesticks
      properties:
        ticker:
          type: string
          description: Unique identifier for the market.
        candlesticks:
          type: array
          description: Array of candlestick data points for the specified time range.
          items:
            $ref: '#/components/schemas/MarketCandlestickHistorical'
    MarketCandlestickHistorical:
      type: object
      required:
        - end_period_ts
        - yes_bid
        - yes_ask
        - price
        - volume
        - open_interest
      properties:
        end_period_ts:
          type: integer
          format: int64
          description: Unix timestamp for the inclusive end of the candlestick period.
        yes_bid:
          $ref: '#/components/schemas/BidAskDistributionHistorical'
          description: >-
            Open, high, low, close (OHLC) data for YES buy offers on the market
            during the candlestick period.
        yes_ask:
          $ref: '#/components/schemas/BidAskDistributionHistorical'
          description: >-
            Open, high, low, close (OHLC) data for YES sell offers on the market
            during the candlestick period.
        price:
          $ref: '#/components/schemas/PriceDistributionHistorical'
          description: >-
            Open, high, low, close (OHLC) and more data for trade YES contract
            prices on the market during the candlestick period.
        volume:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            String representation of the number of contracts bought on the
            market during the candlestick period.
        open_interest:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            String representation of the number of contracts bought on the
            market by end of the candlestick period (end_period_ts).
    BidAskDistributionHistorical:
      type: object
      required:
        - open
        - low
        - high
        - close
      properties:
        open:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Offer price on the market at the start of the candlestick period (in
            dollars).
        low:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Lowest offer price on the market during the candlestick period (in
            dollars).
        high:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Highest offer price on the market during the candlestick period (in
            dollars).
        close:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Offer price on the market at the end of the candlestick period (in
            dollars).
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
        "10", "10.0", "10.00"); responses always emit 2 decimals. Currently only
        whole contract values are permitted, but the format supports future
        fractional precision. Integer contract count fields are legacy and will
        be deprecated; when both integer and fp fields are provided, they must
        match.
      example: '10.00'
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with up to 4 decimal
        places of precision. This is the maximum supported precision; valid
        quote intervals for a given market are constrained by that market's
        price level structure.
      example: '0.5600'

````