---
url: https://docs.kalshi.com/api-reference/market/get-market-candlesticks
lastmod: 2025-12-04T02:14:27.586Z
---
# Get Market Candlesticks

> Time period length of each candlestick in minutes. Valid values: 1 (1 minute), 60 (1 hour), 1440 (1 day).

## OpenAPI

````yaml openapi.yaml get /series/{series_ticker}/markets/{ticker}/candlesticks
paths:
  path: /series/{series_ticker}/markets/{ticker}/candlesticks
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security: []
    parameters:
      path:
        series_ticker:
          schema:
            - type: string
              required: true
              description: Series ticker - the series that contains the target market
        ticker:
          schema:
            - type: string
              required: true
              description: Market ticker - unique identifier for the specific market
      query:
        start_ts:
          schema:
            - type: integer
              required: true
              description: >-
                Start timestamp (Unix timestamp). Candlesticks will include
                those ending on or after this time.
        end_ts:
          schema:
            - type: integer
              required: true
              description: >-
                End timestamp (Unix timestamp). Candlesticks will include those
                ending on or before this time.
        period_interval:
          schema:
            - type: enum<integer>
              enum:
                - 1
                - 60
                - 1440
              required: true
              description: >-
                Time period length of each candlestick in minutes. Valid values
                are 1 (1 minute), 60 (1 hour), or 1440 (1 day).
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              ticker:
                allOf:
                  - type: string
                    description: Unique identifier for the market.
              candlesticks:
                allOf:
                  - type: array
                    description: >-
                      Array of candlestick data points for the specified time
                      range.
                    items:
                      $ref: '#/components/schemas/MarketCandlestick'
            refIdentifier: '#/components/schemas/GetMarketCandlesticksResponse'
            requiredProperties:
              - ticker
              - candlesticks
        examples:
          example:
            value:
              ticker: <string>
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
        description: Candlesticks retrieved successfully
    '400':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Bad request
        examples: {}
        description: Bad request
    '404':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Not found
        examples: {}
        description: Not found
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