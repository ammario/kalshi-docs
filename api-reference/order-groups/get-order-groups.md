---
url: https://docs.kalshi.com/api-reference/order-groups/get-order-groups
lastmod: 2025-12-11T18:38:28.978Z
---
# Get Order Groups

>  Retrieves all order groups for the authenticated user.

## OpenAPI

````yaml openapi.yaml get /portfolio/order_groups
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.2.0
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
  /portfolio/order_groups:
    get:
      tags:
        - order-groups
      summary: Get Order Groups
      description: ' Retrieves all order groups for the authenticated user.'
      operationId: GetOrderGroups
      responses:
        '200':
          description: Order groups retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetOrderGroupsResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    GetOrderGroupsResponse:
      type: object
      properties:
        order_groups:
          type: array
          items:
            $ref: '#/components/schemas/OrderGroup'
          x-go-type-skip-optional-pointer: true
    OrderGroup:
      type: object
      required:
        - id
        - is_auto_cancel_enabled
      properties:
        id:
          type: string
          description: Unique identifier for the order group
          x-go-type-skip-optional-pointer: true
        is_auto_cancel_enabled:
          type: boolean
          description: Whether auto-cancel is enabled for this order group
          x-go-type-skip-optional-pointer: true
    ErrorResponse:
      type: object
      properties:
        code:
          type: string
          description: Error code
        message:
          type: string
          description: Human-readable error message
        details:
          type: string
          description: Additional details about the error, if available
        service:
          type: string
          description: The name of the service that generated the error
  responses:
    BadRequestError:
      description: Bad request - invalid input
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    UnauthorizedError:
      description: Unauthorized - authentication required
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    InternalServerError:
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
  securitySchemes:
    kalshiAccessKey:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-KEY
      description: Your API key ID
    kalshiAccessSignature:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-SIGNATURE
      description: RSA-PSS signature of the request
    kalshiAccessTimestamp:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-TIMESTAMP
      description: Request timestamp in milliseconds

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt