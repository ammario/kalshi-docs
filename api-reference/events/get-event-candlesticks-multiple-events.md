---
url: https://docs.kalshi.com/api-reference/events/get-event-candlesticks-multiple-events
lastmod: 2025-11-25T00:26:23.602Z
---
# Get Event Candlesticks (Multiple Events)

> End-point for returning aggregated data across all markets corresponding to multiple events. Limited to 5000 candlesticks total across all events and markets.

## OpenAPI

````yaml openapi.yaml get /events/candlesticks
paths:
  path: /events/candlesticks
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security: []
    parameters:
      path: {}
      query:
        event_tickers:
          schema:
            - type: string
              required: true
              description: Comma-separated list of event tickers
        start_ts:
          schema:
            - type: integer
              required: true
              description: Start timestamp for the range
        end_ts:
          schema:
            - type: integer
              required: true
              description: End timestamp for the range
        period_interval:
          schema:
            - type: enum<integer>
              enum:
                - 1
                - 60
                - 1440
              required: true
              description: >-
                Specifies the length of each candlestick period, in minutes.
                Must be one minute, one hour, or one day.
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              events:
                allOf:
                  - type: array
                    description: >-
                      Array of event candlestick responses, one for each event
                      ticker.
                    items:
                      type: object
                      required:
                        - event_ticker
                        - market_tickers
                        - market_candlesticks
                        - adjusted_end_ts
                      properties:
                        event_ticker:
                          type: string
                          description: The event ticker
                        market_tickers:
                          type: array
                          description: Array of market tickers in the event.
                          items:
                            type: string
                        market_candlesticks:
                          type: array
                          description: >-
                            Array of market candlestick arrays, one for each
                            market in the event.
                          items:
                            type: array
                            items:
                              $ref: '#/components/schemas/MarketCandlestick'
                        adjusted_end_ts:
                          type: integer
                          format: int64
                          description: >-
                            Adjusted end timestamp if the requested candlesticks
                            would be larger than maxAggregateCandidates.
            refIdentifier: '#/components/schemas/GetEventsCandlesticksResponse'
            requiredProperties:
              - events
        examples:
          example:
            value:
              events:
                - event_ticker: <string>
                  market_tickers:
                    - <string>
                  market_candlesticks:
                    - - end_period_ts: 123
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
                  adjusted_end_ts: 123
        description: Event candlesticks retrieved successfully
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