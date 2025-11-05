---
url: https://docs.kalshi.com/api-reference/market/get-market-orderbook
lastmod: 2025-11-04T20:59:58.377Z
---
# Get Market Orderbook

>  Endpoint for getting the current order book for a specific market.  The order book shows all active bid orders for both yes and no sides of a binary market. It returns yes bids and no bids only (no asks are returned). This is because in binary markets, a bid for yes at price X is equivalent to an ask for no at price (100-X). For example, a yes bid at 7¢ is the same as a no ask at 93¢, with identical contract sizes.  Each side shows price levels with their corresponding quantities and order counts, organized from best to worst prices.

## OpenAPI

````yaml openapi.yaml get /markets/{ticker}/orderbook
paths:
  path: /markets/{ticker}/orderbook
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
      path:
        ticker:
          schema:
            - type: string
              required: true
              description: Market ticker
      query:
        depth:
          schema:
            - type: integer
              required: false
              description: >-
                Depth of the orderbook to retrieve (0 or negative means all
                levels, 1-100 for specific depth)
              maximum: 100
              minimum: 0
              default: 0
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              orderbook:
                allOf:
                  - $ref: '#/components/schemas/Orderbook'
            refIdentifier: '#/components/schemas/GetMarketOrderbookResponse'
            requiredProperties:
              - orderbook
        examples:
          example:
            value:
              orderbook:
                'yes':
                  - - 123
                'no':
                  - - 123
                yes_dollars:
                  - - <any>
                no_dollars:
                  - - <any>
        description: Orderbook retrieved successfully
    '401':
      application/json:
        schemaArray:
          - type: object
            properties:
              code:
                allOf:
                  - &ref_0
                    type: string
                    description: Error code
              message:
                allOf:
                  - &ref_1
                    type: string
                    description: Human-readable error message
              details:
                allOf:
                  - &ref_2
                    type: string
                    description: Additional details about the error, if available
              service:
                allOf:
                  - &ref_3
                    type: string
                    description: The name of the service that generated the error
            refIdentifier: '#/components/schemas/ErrorResponse'
        examples:
          example:
            value:
              code: <string>
              message: <string>
              details: <string>
              service: <string>
        description: Unauthorized - authentication required
    '404':
      application/json:
        schemaArray:
          - type: object
            properties:
              code:
                allOf:
                  - *ref_0
              message:
                allOf:
                  - *ref_1
              details:
                allOf:
                  - *ref_2
              service:
                allOf:
                  - *ref_3
            refIdentifier: '#/components/schemas/ErrorResponse'
        examples:
          example:
            value:
              code: <string>
              message: <string>
              details: <string>
              service: <string>
        description: Resource not found
    '500':
      application/json:
        schemaArray:
          - type: object
            properties:
              code:
                allOf:
                  - *ref_0
              message:
                allOf:
                  - *ref_1
              details:
                allOf:
                  - *ref_2
              service:
                allOf:
                  - *ref_3
            refIdentifier: '#/components/schemas/ErrorResponse'
        examples:
          example:
            value:
              code: <string>
              message: <string>
              details: <string>
              service: <string>
        description: Internal server error
  deprecated: false
  type: path
components:
  schemas:
    OrderbookLevel:
      type: array
      items:
        type: number
      minItems: 2
      maxItems: 2
      description: >-
        Price level represented as [price, count] where price is in cents and
        count is the number of contracts
    PriceLevelDollars:
      type: array
      minItems: 2
      maxItems: 2
      description: >-
        Price level in dollars represented as [dollars_string, count] where
        dollars_string is like "0.1500" and count is the number of contracts
    Orderbook:
      type: object
      required:
        - 'yes'
        - 'no'
        - yes_dollars
        - no_dollars
      properties:
        'yes':
          type: array
          items:
            $ref: '#/components/schemas/OrderbookLevel'
        'no':
          type: array
          items:
            $ref: '#/components/schemas/OrderbookLevel'
        yes_dollars:
          type: array
          items:
            $ref: '#/components/schemas/PriceLevelDollars'
        no_dollars:
          type: array
          items:
            $ref: '#/components/schemas/PriceLevelDollars'

````