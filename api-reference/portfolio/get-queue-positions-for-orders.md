---
url: https://docs.kalshi.com/api-reference/portfolio/get-queue-positions-for-orders
lastmod: 2025-11-02T23:37:19.302Z
---
# Get Queue Positions for Orders

>  Endpoint for getting queue positions for all resting orders. Queue position represents the number of contracts that need to be matched before an order receives a partial or full match, determined using price-time priority.

## OpenAPI

````yaml openapi.yaml get /portfolio/orders/queue_positions
paths:
  path: /portfolio/orders/queue_positions
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
        market_tickers:
          schema:
            - type: string
              description: Comma-separated list of market tickers to filter by
        event_ticker:
          schema:
            - type: string
              description: Event ticker to filter by
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              queue_positions:
                allOf:
                  - type: array
                    description: Queue positions for all matching orders
                    items:
                      $ref: '#/components/schemas/OrderQueuePosition'
            refIdentifier: '#/components/schemas/GetOrderQueuePositionsResponse'
            requiredProperties:
              - queue_positions
        examples:
          example:
            value:
              queue_positions:
                - order_id: <string>
                  market_ticker: <string>
                  queue_position: 123
        description: Queue positions retrieved successfully
    '400':
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
        description: Bad request - invalid input
    '401':
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
        description: Unauthorized - authentication required
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
    OrderQueuePosition:
      type: object
      required:
        - order_id
        - market_ticker
        - queue_position
      properties:
        order_id:
          type: string
          description: The order ID
        market_ticker:
          type: string
          description: The market ticker
        queue_position:
          type: integer
          format: int32
          description: The position of the order in the queue

````