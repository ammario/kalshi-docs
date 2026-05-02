---
url: https://docs.kalshi.com/api-reference/market/get-market-candlesticks
lastmod: 2026-05-01T20:03:25.988Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Market Candlesticks

> Time period length of each candlestick in minutes. Valid values: 1 (1 minute), 60 (1 hour), 1440 (1 day).
Candlesticks for markets that settled before the historical cutoff are only available via `GET /historical/markets/{ticker}/candlesticks`. See [Historical Data](https://kalshi.com/docs/getting_started/historical_data) for details.




## OpenAPI

````yaml /openapi.yaml get /series/{series_ticker}/markets/{ticker}/candlesticks
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.15.0
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
  /series/{series_ticker}/markets/{ticker}/candlesticks:
    get:
      tags:
        - market
      summary: Get Market Candlesticks
      description: >
        Time period length of each candlestick in minutes. Valid values: 1 (1
        minute), 60 (1 hour), 1440 (1 day).

        Candlesticks for markets that settled before the historical cutoff are
        only available via `GET /historical/markets/{ticker}/candlesticks`. See
        [Historical
        Data](https://kalshi.com/docs/getting_started/historical_data) for
        details.
      operationId: GetMarketCandlesticks
      parameters:
        - name: series_ticker
          in: path
          required: true
          description: Series ticker - the series that contains the target market
          schema:
            type: string
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
        - name: include_latest_before_start
          in: query
          required: false
          description: >
            If true, prepends the latest candlestick available before the
            start_ts. This synthetic candlestick is created by:

            1. Finding the most recent real candlestick before start_ts

            2. Projecting it forward to the first period boundary (calculated as
            the next period interval after start_ts)

            3. Setting all OHLC prices to null, and `previous_price` to the
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
                $ref: '#/components/schemas/GetMarketCandlesticksResponse'
        '400':
          description: Bad request
        '404':
          description: Not found
        '500':
          description: Internal server error
components:
  schemas:
    GetMarketCandlesticksResponse:
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
            $ref: '#/components/schemas/MarketCandlestick'
    MarketCandlestick:
      type: object
      required:
        - end_period_ts
        - yes_bid
        - yes_ask
        - price
        - volume_fp
        - open_interest_fp
      properties:
        end_period_ts:
          type: integer
          format: int64
          description: Unix timestamp for the inclusive end of the candlestick period.
        yes_bid:
          $ref: '#/components/schemas/BidAskDistribution'
          description: >-
            Open, high, low, close (OHLC) data for YES buy offers on the market
            during the candlestick period.
        yes_ask:
          $ref: '#/components/schemas/BidAskDistribution'
          description: >-
            Open, high, low, close (OHLC) data for YES sell offers on the market
            during the candlestick period.
        price:
          $ref: '#/components/schemas/PriceDistribution'
          description: >-
            Open, high, low, close (OHLC) and more data for trade YES contract
            prices on the market during the candlestick period.
        volume_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            String representation of the number of contracts bought on the
            market during the candlestick period.
        open_interest_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            String representation of the number of contracts bought on the
            market by end of the candlestick period (end_period_ts).
    BidAskDistribution:
      type: object
      required:
        - open_dollars
        - low_dollars
        - high_dollars
        - close_dollars
      properties:
        open_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Offer price on the market at the start of the candlestick period (in
            dollars).
        low_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Lowest offer price on the market during the candlestick period (in
            dollars).
        high_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Highest offer price on the market during the candlestick period (in
            dollars).
        close_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Offer price on the market at the end of the candlestick period (in
            dollars).
    PriceDistribution:
      type: object
      properties:
        open_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            First traded YES contract price on the market during the candlestick
            period (in dollars). May be null if there was no trade during the
            period.
        low_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            Lowest traded YES contract price on the market during the
            candlestick period (in dollars). May be null if there was no trade
            during the period.
        high_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            Highest traded YES contract price on the market during the
            candlestick period (in dollars). May be null if there was no trade
            during the period.
        close_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            Last traded YES contract price on the market during the candlestick
            period (in dollars). May be null if there was no trade during the
            period.
        mean_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            Mean traded YES contract price on the market during the candlestick
            period (in dollars). May be null if there was no trade during the
            period.
        previous_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            Last traded YES contract price on the market before the candlestick
            period (in dollars). May be null if there were no trades before the
            period.
        min_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            Minimum close price of any market during the candlestick period (in
            dollars).
        max_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            Maximum close price of any market during the candlestick period (in
            dollars).
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

````