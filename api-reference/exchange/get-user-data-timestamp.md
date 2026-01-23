---
url: https://docs.kalshi.com/api-reference/exchange/get-user-data-timestamp
lastmod: 2026-01-22T21:13:32.365Z
---
# Get User Data Timestamp

>  There is typically a short delay before exchange events are reflected in the API endpoints. Whenever possible, combine API responses to PUT/POST/DELETE requests with websocket data to obtain the most accurate view of the exchange state. This endpoint provides an approximate indication of when the data from the following endpoints was last validated: GetBalance, GetOrder(s), GetFills, GetPositions



## OpenAPI

````yaml openapi.yaml get /exchange/user_data_timestamp
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.6.0
  description: >-
    Manually defined OpenAPI spec for endpoints being migrated to spec-first
    approach
servers:
  - url: https://api.elections.kalshi.com/trade-api/v2
    description: Production server
security: []
tags:
  - name: api-keys
    description: API key management endpoints
  - name: orders
    description: Order management endpoints
  - name: order-groups
    description: Order group management endpoints
  - name: portfolio
    description: Portfolio and balance information endpoints
  - name: communications
    description: Request-for-quote (RFQ) endpoints
  - name: multivariate
    description: Multivariate event collection endpoints
  - name: exchange
    description: Exchange status and information endpoints
  - name: live-data
    description: Live data endpoints
  - name: markets
    description: Market data endpoints
  - name: milestone
    description: Milestone endpoints
  - name: search
    description: Search and filtering endpoints
  - name: incentive-programs
    description: Incentive program endpoints
  - name: fcm
    description: FCM member specific endpoints
  - name: events
    description: Event endpoints
  - name: structured-targets
    description: Structured targets endpoints
paths:
  /exchange/user_data_timestamp:
    get:
      tags:
        - exchange
      summary: Get User Data Timestamp
      description: ' There is typically a short delay before exchange events are reflected in the API endpoints. Whenever possible, combine API responses to PUT/POST/DELETE requests with websocket data to obtain the most accurate view of the exchange state. This endpoint provides an approximate indication of when the data from the following endpoints was last validated: GetBalance, GetOrder(s), GetFills, GetPositions'
      operationId: GetUserDataTimestamp
      responses:
        '200':
          description: User data timestamp retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetUserDataTimestampResponse'
        '500':
          description: Internal server error
components:
  schemas:
    GetUserDataTimestampResponse:
      type: object
      required:
        - as_of_time
      properties:
        as_of_time:
          type: string
          format: date-time
          description: Timestamp when user data was last updated.

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt