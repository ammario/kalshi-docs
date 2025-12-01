---
url: https://docs.kalshi.com/api-reference/exchange/get-user-data-timestamp
lastmod: 2025-11-30T17:58:56.357Z
---
# Get User Data Timestamp

>  There is typically a short delay before exchange events are reflected in the API endpoints. Whenever possible, combine API responses to PUT/POST/DELETE requests with websocket data to obtain the most accurate view of the exchange state. This endpoint provides an approximate indication of when the data from the following endpoints was last validated: GetBalance, GetOrder(s), GetFills, GetPositions

## OpenAPI

````yaml openapi.yaml get /exchange/user_data_timestamp
paths:
  path: /exchange/user_data_timestamp
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security: []
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
              as_of_time:
                allOf:
                  - type: string
                    format: date-time
                    description: Timestamp when user data was last updated.
            refIdentifier: '#/components/schemas/GetUserDataTimestampResponse'
            requiredProperties:
              - as_of_time
        examples:
          example:
            value:
              as_of_time: '2023-11-07T05:31:56Z'
        description: User data timestamp retrieved successfully
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
  schemas: {}

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt