---
url: https://docs.kalshi.com/api-reference/portfolio/get-settlements
lastmod: 2025-11-21T15:27:56.066Z
---
# Get Settlements

>  Endpoint for getting the member's settlements historical track.

## OpenAPI

````yaml openapi.yaml get /portfolio/settlements
paths:
  path: /portfolio/settlements
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
        ticker:
          schema:
            - type: string
              description: Filter by market ticker
        event_ticker:
          schema:
            - type: string
              description: >-
                Event ticker of desired positions. Multiple event tickers can be
                provided as a comma-separated list (maximum 10).
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
              settlements:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/Settlement'
              cursor:
                allOf:
                  - type: string
            refIdentifier: '#/components/schemas/GetSettlementsResponse'
            requiredProperties:
              - settlements
        examples:
          example:
            value:
              settlements:
                - ticker: <string>
                  market_result: 'yes'
                  yes_count: 123
                  yes_total_cost: 123
                  no_count: 123
                  no_total_cost: 123
                  revenue: 123
                  settled_time: '2023-11-07T05:31:56Z'
                  fee_cost: '0.3400'
                  value: 123
              cursor: <string>
        description: Settlements retrieved successfully
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
    Settlement:
      type: object
      required:
        - ticker
        - market_result
        - yes_count
        - yes_total_cost
        - no_count
        - no_total_cost
        - revenue
        - settled_time
        - fee_cost
      properties:
        ticker:
          type: string
          description: The ticker symbol of the market that was settled.
        market_result:
          type: string
          enum:
            - 'yes'
            - 'no'
            - scalar
            - void
          description: >-
            The outcome of the market settlement. 'yes' = market resolved to
            YES, 'no' = market resolved to NO, 'scalar' = scalar market settled
            at a specific value, 'void' = market was voided/cancelled and all
            positions returned at original cost.
        yes_count:
          type: integer
          format: int64
          description: Number of YES contracts owned at the time of settlement.
        yes_total_cost:
          type: integer
          description: Total cost basis of all YES contracts in cents.
        no_count:
          type: integer
          format: int64
          description: Number of NO contracts owned at the time of settlement.
        no_total_cost:
          type: integer
          description: Total cost basis of all NO contracts in cents.
        revenue:
          type: integer
          description: >-
            Total revenue earned from this settlement in cents (winning
            contracts pay out 100 cents each).
        settled_time:
          type: string
          format: date-time
          description: Timestamp when the market was settled and payouts were processed.
        fee_cost:
          type: string
          example: '0.3400'
          description: Total fees paid in fixed point dollars.
        value:
          type: integer
          nullable: true
          description: Payout of a single yes contract in cents.

````