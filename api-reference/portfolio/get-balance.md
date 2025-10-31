# Get Balance

>  Endpoint for getting the balance and portfolio value of a member. Both values are returned in cents.

## OpenAPI

````yaml openapi.yaml get /portfolio/balance
paths:
  path: /portfolio/balance
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
      query: {}
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              balance:
                allOf:
                  - type: integer
                    format: int64
                    description: >-
                      Member's available balance in cents. This represents the
                      amount available for trading.
              portfolio_value:
                allOf:
                  - type: integer
                    format: int64
                    description: >-
                      Member's portfolio value in cents. This is the current
                      value of all positions held.
              updated_ts:
                allOf:
                  - type: integer
                    format: int64
                    description: Unix timestamp of the last update to the balance.
            refIdentifier: '#/components/schemas/GetBalanceResponse'
            requiredProperties:
              - balance
              - portfolio_value
              - updated_ts
        examples:
          example:
            value:
              balance: 123
              portfolio_value: 123
              updated_ts: 123
        description: Balance retrieved successfully
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
  schemas: {}

````