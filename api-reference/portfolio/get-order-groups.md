---
url: https://docs.kalshi.com/api-reference/portfolio/get-order-groups
lastmod: 2025-11-04T20:59:58.398Z
---
# Get Order Groups

>  Retrieves all order groups for the authenticated user.

## OpenAPI

````yaml openapi.yaml get /portfolio/order_groups
paths:
  path: /portfolio/order_groups
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
        status:
          schema:
            - type: string
              description: Filter by status. Possible values depend on the endpoint.
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
              order_groups:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/OrderGroup'
              cursor:
                allOf:
                  - type: string
            refIdentifier: '#/components/schemas/GetOrderGroupsResponse'
        examples:
          example:
            value:
              order_groups:
                - id: <string>
                  is_auto_cancel_enabled: true
              cursor: <string>
        description: Order groups retrieved successfully
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
    OrderGroup:
      type: object
      required:
        - id
      properties:
        id:
          type: string
          description: Unique identifier for the order group
        is_auto_cancel_enabled:
          type: boolean
          description: Whether auto-cancel is enabled for this order group

````