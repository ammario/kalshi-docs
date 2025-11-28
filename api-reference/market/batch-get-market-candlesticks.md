---
url: https://docs.kalshi.com/api-reference/market/batch-get-market-candlesticks
lastmod: 2025-11-26T03:48:54.401Z
---
# Batch Get Market Candlesticks

> Endpoint for retrieving candlestick data for multiple markets.

- Accepts up to 100 market tickers per request
- Returns up to 10,000 candlesticks total across all markets
- Returns candlesticks grouped by market_id
- Optionally includes a synthetic initial candlestick for price continuity (see `include_latest_before_start` parameter)


## OpenAPI

````yaml openapi.yaml get /markets/candlesticks
paths:
  path: /markets/candlesticks
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security: []
    parameters:
      path: {}
      query:
        market_tickers:
          schema:
            - type: string
              required: true
              description: Comma-separated list of market tickers (maximum 100)
        start_ts:
          schema:
            - type: integer
              required: true
              description: Start timestamp in Unix seconds
        end_ts:
          schema:
            - type: integer
              required: true
              description: End timestamp in Unix seconds
        period_interval:
          schema:
            - type: integer
              required: true
              description: Candlestick period interval in minutes
              minimum: 1
        include_latest_before_start:
          schema:
            - type: boolean
              required: false
              description: >
                If true, prepends the latest candlestick available before the
                start_ts. This synthetic candlestick is created by:

                1. Finding the most recent real candlestick before start_ts

                2. Projecting it forward to the first period boundary
                (calculated as the next period interval after start_ts)

                3. Setting all OHLC prices to null, and `previous_price` to the
                close price from the real candlestick
              default: false
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              markets:
                allOf:
                  - type: array
                    description: >-
                      Array of market candlestick data, one entry per requested
                      market.
                    items:
                      $ref: '#/components/schemas/MarketCandlesticksResponse'
            refIdentifier: '#/components/schemas/BatchGetMarketCandlesticksResponse'
            requiredProperties:
              - markets
        examples:
          example:
            value:
              markets:
                - market_id: <string>
                  candlesticks:
                    - end_period_ts: 123
                      yes_bid:
                        open: 123
                        open_dollars: '0.5600'
                        low: 123
                        low_dollars: '0.5600'
                        high: 123
                        high_dollars: '0.5600'
                        close: 123
                        close_dollars: '0.5600'
                      yes_ask:
                        open: 123
                        open_dollars: '0.5600'
                        low: 123
                        low_dollars: '0.5600'
                        high: 123
                        high_dollars: '0.5600'
                        close: 123
                        close_dollars: '0.5600'
                      price:
                        open: 123
                        open_dollars: '0.5600'
                        low: 123
                        low_dollars: '0.5600'
                        high: 123
                        high_dollars: '0.5600'
                        close: 123
                        close_dollars: '0.5600'
                        mean: 123
                        mean_dollars: '0.5600'
                        previous: 123
                        previous_dollars: '0.5600'
                        min: 123
                        min_dollars: '0.5600'
                        max: 123
                        max_dollars: '0.5600'
                      volume: 123
                      open_interest: 123
        description: Market candlesticks retrieved successfully
    '400':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Bad request
        examples: {}
        description: Bad request
    '401':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Unauthorized
        examples: {}
        description: Unauthorized
    '500':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Internal server error
        examples: {}
        description: Internal server error
  deprecated: false
  type: path
components:
  schemas:
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with exactly 4 decimal
        places
      example: '0.5600'
    MarketCandlesticksResponse:
      type: object
      required:
        - market_id
        - candlesticks
      properties:
        market_id:
          type: string
          description: Unique identifier for the market.
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
        - open_interest
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
        open_interest:
          type: integer
          format: int64
          description: >-
            Number of contracts bought on the market by end of the candlestick
            period (end_period_ts).
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

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt