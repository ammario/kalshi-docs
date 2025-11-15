---
url: https://docs.kalshi.com/api-reference/portfolio/create-order-group
lastmod: 2025-11-14T19:42:41.514Z
---
# Create Order Group

>  Creates a new order group with a contracts limit. When the limit is hit, all orders in the group are cancelled and no new orders can be placed until reset.

## OpenAPI

````yaml openapi.yaml post /portfolio/order_groups/create
paths:
  path: /portfolio/order_groups/create
  method: post
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
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              contracts_limit:
                allOf:
                  - type: integer
                    format: int64
                    minimum: 1
                    description: >-
                      Specifies the maximum number of contracts that can be
                      matched within this group.
            required: true
            refIdentifier: '#/components/schemas/CreateOrderGroupRequest'
            requiredProperties:
              - contracts_limit
        examples:
          example:
            value:
              contracts_limit: 2
  response:
    '201':
      application/json:
        schemaArray:
          - type: object
            properties:
              order_group_id:
                allOf:
                  - type: string
                    description: The unique identifier for the created order group
            refIdentifier: '#/components/schemas/CreateOrderGroupResponse'
        examples:
          example:
            value:
              order_group_id: <string>
        description: Order group created successfully
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
  schemas: {}

````