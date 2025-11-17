---
url: https://docs.kalshi.com/api-reference/portfolio/get-fills
lastmod: 2025-11-16T23:50:39.862Z
---
# Get Fills

>  Endpoint for getting all fills for the member. A fill is when a trade you have is matched.

## OpenAPI

````yaml openapi.yaml get /portfolio/fills
paths:
  path: /portfolio/fills
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security:
      - title: kalshiAccessKey & kalshiAccessSignature & kalshiAccessTimestamp
        parameters:
          query: {}
          header:
            KALSHI-ACCESS-KEY:
              type: apiKey
              description: Your API key ID
            KALSHI-ACCESS-SIGNATURE:
              type: apiKey
              description: RSA-PSS signature of the request
            KALSHI-ACCESS-TIMESTAMP:
              type: apiKey
              description: Request timestamp in milliseconds
          cookie: {}
    parameters:
      path: {}
      query:
        ticker:
          schema:
            - type: string
              description: Filter by market ticker
        order_id:
          schema:
            - type: string
              description: Filter by order ID
        min_ts:
          schema:
            - type: integer
              description: Filter items after this Unix timestamp
        max_ts:
          schema:
            - type: integer
              description: Filter items before this Unix timestamp
        limit:
          schema:
            - type: integer
              description: >-
                Number of results per page. Defaults to 100. Maximum value is
                200.
              maximum: 200
              minimum: 1
              default: 100
        cursor:
          schema:
            - type: string
              description: >-
                Pagination cursor. Use the cursor value returned from the
                previous response to get the next page of results. Leave empty
                for the first page.
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              fills:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/Fill'
              cursor:
                allOf:
                  - type: string
            refIdentifier: '#/components/schemas/GetFillsResponse'
            requiredProperties:
              - fills
              - cursor
        examples:
          example:
            value:
              fills:
                - fill_id: <string>
                  trade_id: <string>
                  order_id: <string>
                  client_order_id: <string>
                  ticker: <string>
                  market_ticker: <string>
                  side: 'yes'
                  action: buy
                  count: 123
                  price: 123
                  yes_price: 123
                  no_price: 123
                  yes_price_fixed: <string>
                  no_price_fixed: <string>
                  is_taker: true
                  created_time: '2023-11-07T05:31:56Z'
                  ts: 123
              cursor: <string>
        description: Fills retrieved successfully
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
    Fill:
      type: object
      required:
        - fill_id
        - trade_id
        - order_id
        - ticker
        - market_ticker
        - side
        - action
        - count
        - price
        - yes_price
        - no_price
        - yes_price_fixed
        - no_price_fixed
        - is_taker
      properties:
        fill_id:
          type: string
          description: Unique identifier for this fill
        trade_id:
          type: string
          description: Unique identifier for this fill (legacy field name, same as fill_id)
        order_id:
          type: string
          description: Unique identifier for the order that resulted in this fill
        client_order_id:
          type: string
          description: Client-provided identifier for the order that resulted in this fill
        ticker:
          type: string
          description: Unique identifier for the market
        market_ticker:
          type: string
          description: Unique identifier for the market (legacy field name, same as ticker)
        side:
          type: string
          enum:
            - 'yes'
            - 'no'
          description: Specifies if this is a 'yes' or 'no' fill
        action:
          type: string
          enum:
            - buy
            - sell
          description: Specifies if this is a buy or sell order
        count:
          type: integer
          description: Number of contracts bought or sold in this fill
        price:
          type: number
          description: Fill price (deprecated - use yes_price or no_price)
        yes_price:
          type: integer
          description: Fill price for the yes side in cents
        no_price:
          type: integer
          description: Fill price for the no side in cents
        yes_price_fixed:
          type: string
          description: Fill price for the yes side in fixed point dollars
        no_price_fixed:
          type: string
          description: Fill price for the no side in fixed point dollars
        is_taker:
          type: boolean
          description: >-
            If true, this fill was a taker (removed liquidity from the order
            book)
        created_time:
          type: string
          format: date-time
          description: Timestamp when this fill was executed
        ts:
          type: integer
          format: int64
          description: Unix timestamp when this fill was executed (legacy field name)

````