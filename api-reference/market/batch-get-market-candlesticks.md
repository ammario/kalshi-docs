---
url: https://docs.kalshi.com/api-reference/market/batch-get-market-candlesticks
lastmod: 2026-02-04T00:20:37.161Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Batch Get Market Candlesticks

> Endpoint for retrieving candlestick data for multiple markets.

- Accepts up to 100 market tickers per request
- Returns up to 10,000 candlesticks total across all markets
- Returns candlesticks grouped by market_id
- Optionally includes a synthetic initial candlestick for price continuity (see `include_latest_before_start` parameter)




## OpenAPI

````yaml openapi.yaml get /markets/candlesticks
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.6.0
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
  /markets/candlesticks:
    get:
      tags:
        - market
      summary: Batch Get Market Candlesticks
      description: >
        Endpoint for retrieving candlestick data for multiple markets.


        - Accepts up to 100 market tickers per request

        - Returns up to 10,000 candlesticks total across all markets

        - Returns candlesticks grouped by market_id

        - Optionally includes a synthetic initial candlestick for price
        continuity (see `include_latest_before_start` parameter)
      operationId: BatchGetMarketCandlesticks
      parameters:
        - name: market_tickers
          in: query
          required: true
          description: Comma-separated list of market tickers (maximum 100)
          schema:
            type: string
        - name: start_ts
          in: query
          required: true
          description: Start timestamp in Unix seconds
          schema:
            type: integer
            format: int64
        - name: end_ts
          in: query
          required: true
          description: End timestamp in Unix seconds
          schema:
            type: integer
            format: int64
        - name: period_interval
          in: query
          required: true
          description: Candlestick period interval in minutes
          schema:
            type: integer
            format: int32
            minimum: 1
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
          description: Market candlesticks retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BatchGetMarketCandlesticksResponse'
        '400':
          description: Bad request
        '401':
          description: Unauthorized
        '500':
          description: Internal server error
components:
  schemas:
    BatchGetMarketCandlesticksResponse:
      type: object
      required:
        - markets
      properties:
        markets:
          type: array
          description: Array of market candlestick data, one entry per requested market.
          items:
            $ref: '#/components/schemas/MarketCandlesticksResponse'
    MarketCandlesticksResponse:
      type: object
      required:
        - market_ticker
        - candlesticks
      properties:
        market_ticker:
          type: string
          description: Market ticker string (e.g., 'INXD-24JAN01').
        candlesticks:
          type: array
          description: >-
            Array of candlestick data points for the market. Includes an initial
            data point at the start timestamp when available.
          items:
            $ref: '#/components/schemas/MarketCandlestick'
    MarketCandlestick:
      type: object
      required:
        - end_period_ts
        - yes_bid
        - yes_ask
        - price
        - volume
        - volume_fp
        - open_interest
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
        volume:
          type: integer
          format: int64
          description: >-
            Number of contracts bought on the market during the candlestick
            period.
        volume_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            String representation of the number of contracts bought on the
            market during the candlestick period.
        open_interest:
          type: integer
          format: int64
          description: >-
            Number of contracts bought on the market by end of the candlestick
            period (end_period_ts).
        open_interest_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            String representation of the number of contracts bought on the
            market by end of the candlestick period (end_period_ts).
    BidAskDistribution:
      type: object
      required:
        - open
        - open_dollars
        - low
        - low_dollars
        - high
        - high_dollars
        - close
        - close_dollars
      properties:
        open:
          type: integer
          description: >-
            Offer price on the market at the start of the candlestick period (in
            cents).
        open_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Offer price on the market at the start of the candlestick period (in
            dollars).
        low:
          type: integer
          description: >-
            Lowest offer price on the market during the candlestick period (in
            cents).
        low_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Lowest offer price on the market during the candlestick period (in
            dollars).
        high:
          type: integer
          description: >-
            Highest offer price on the market during the candlestick period (in
            cents).
        high_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Highest offer price on the market during the candlestick period (in
            dollars).
        close:
          type: integer
          description: >-
            Offer price on the market at the end of the candlestick period (in
            cents).
        close_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Offer price on the market at the end of the candlestick period (in
            dollars).
    PriceDistribution:
      type: object
      properties:
        open:
          type: integer
          nullable: true
          description: >-
            First traded YES contract price on the market during the candlestick
            period (in cents). May be null if there was no trade during the
            period.
        open_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            First traded YES contract price on the market during the candlestick
            period (in dollars). May be null if there was no trade during the
            period.
        low:
          type: integer
          nullable: true
          description: >-
            Lowest traded YES contract price on the market during the
            candlestick period (in cents). May be null if there was no trade
            during the period.
        low_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            Lowest traded YES contract price on the market during the
            candlestick period (in dollars). May be null if there was no trade
            during the period.
        high:
          type: integer
          nullable: true
          description: >-
            Highest traded YES contract price on the market during the
            candlestick period (in cents). May be null if there was no trade
            during the period.
        high_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            Highest traded YES contract price on the market during the
            candlestick period (in dollars). May be null if there was no trade
            during the period.
        close:
          type: integer
          nullable: true
          description: >-
            Last traded YES contract price on the market during the candlestick
            period (in cents). May be null if there was no trade during the
            period.
        close_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            Last traded YES contract price on the market during the candlestick
            period (in dollars). May be null if there was no trade during the
            period.
        mean:
          type: integer
          nullable: true
          description: >-
            Mean traded YES contract price on the market during the candlestick
            period (in cents). May be null if there was no trade during the
            period.
        mean_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            Mean traded YES contract price on the market during the candlestick
            period (in dollars). May be null if there was no trade during the
            period.
        previous:
          type: integer
          nullable: true
          description: >-
            Last traded YES contract price on the market before the candlestick
            period (in cents). May be null if there were no trades before the
            period.
        previous_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            Last traded YES contract price on the market before the candlestick
            period (in dollars). May be null if there were no trades before the
            period.
        min:
          type: integer
          nullable: true
          description: >-
            Minimum close price of any market during the candlestick period (in
            cents).
        min_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: >-
            Minimum close price of any market during the candlestick period (in
            dollars).
        max:
          type: integer
          nullable: true
          description: >-
            Maximum close price of any market during the candlestick period (in
            cents).
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
        "10", "10.0", "10.00"); responses always emit 2 decimals. Currently only
        whole contract values are permitted, but the format supports future
        fractional precision. Integer contract count fields are legacy and will
        be deprecated; when both integer and fp fields are provided, they must
        match.
      example: '10.00'
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with exactly 4 decimal
        places
      example: '0.5600'

````