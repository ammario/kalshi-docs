---
url: https://docs.kalshi.com/api-reference/market/get-trades
lastmod: 2025-10-29T14:29:20.637Z
---
# Get Trades

>  Endpoint for getting all trades for all markets.  A trade represents a completed transaction between two users on a specific market. Each trade includes the market ticker, price, quantity, and timestamp information.  This endpoint returns a paginated response. Use the 'limit' parameter to control page size (1-1000, defaults to 100). The response includes a 'cursor' field - pass this value in the 'cursor' parameter of your next request to get the next page. An empty cursor indicates no more pages are available.

## OpenAPI

````yaml openapi.yaml get /markets/trades
paths:
  path: /markets/trades
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security: []
    parameters:
      path: {}
      query:
        limit:
          schema:
            - type: integer
              description: >-
                Number of results per page. Defaults to 100. Maximum value is
                1000.
              maximum: 1000
              minimum: 1
              default: 100
        cursor:
          schema:
            - type: string
              description: >-
                Pagination cursor. Use the cursor value returned from the
                previous response to get the next page of results. Leave empty
                for the first page.
        ticker:
          schema:
            - type: string
              description: Filter by market ticker
        min_ts:
          schema:
            - type: integer
              description: Filter items after this Unix timestamp
        max_ts:
          schema:
            - type: integer
              description: Filter items before this Unix timestamp
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              trades:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/Trade'
              cursor:
                allOf:
                  - type: string
            refIdentifier: '#/components/schemas/GetTradesResponse'
        examples:
          example:
            value:
              trades:
                - trade_id: <string>
                  ticker: <string>
                  price: 123
                  count: 123
                  yes_price: 123
                  no_price: 123
                  yes_price_dollars: <string>
                  no_price_dollars: <string>
                  taker_side: 'yes'
                  created_time: '2023-11-07T05:31:56Z'
              cursor: <string>
        description: Trades retrieved successfully
    '400':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Bad request
        examples: {}
        description: Bad request
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
    Trade:
      type: object
      properties:
        trade_id:
          type: string
          description: Unique identifier for this trade
        ticker:
          type: string
          description: Unique identifier for the market
        price:
          type: number
          description: Trade price (deprecated - use yes_price or no_price)
        count:
          type: integer
          description: Number of contracts bought or sold in this trade
        yes_price:
          type: integer
          description: Yes price for this trade in cents
        no_price:
          type: integer
          description: No price for this trade in cents
        yes_price_dollars:
          type: string
          description: Yes price for this trade in dollars
        no_price_dollars:
          type: string
          description: No price for this trade in dollars
        taker_side:
          type: string
          enum:
            - 'yes'
            - 'no'
          x-enum-varnames:
            - TradeTakerSideYes
            - TradeTakerSideNo
          description: Side for the taker of this trade
        created_time:
          type: string
          format: date-time
          description: Timestamp when this trade was executed

````