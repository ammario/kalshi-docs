---
url: https://docs.kalshi.com/api-reference/orders/get-order-queue-position
lastmod: 2026-01-07T01:47:06.551Z
---
# Get Order Queue Position

>  Endpoint for getting an order's queue position in the order book. This represents the amount of orders that need to be matched before this order receives a partial or full match. Queue position is determined using a price-time priority.



## OpenAPI

````yaml openapi.yaml get /portfolio/orders/{order_id}/queue_position
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.4.0
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
  /portfolio/orders/{order_id}/queue_position:
    get:
      tags:
        - orders
      summary: Get Order Queue Position
      description: ' Endpoint for getting an order''s queue position in the order book. This represents the amount of orders that need to be matched before this order receives a partial or full match. Queue position is determined using a price-time priority.'
      operationId: GetOrderQueuePosition
      parameters:
        - $ref: '#/components/parameters/OrderIdPath'
      responses:
        '200':
          description: Queue position retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetOrderQueuePositionResponse'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '404':
          $ref: '#/components/responses/NotFoundError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  parameters:
    OrderIdPath:
      name: order_id
      in: path
      required: true
      description: Order ID
      schema:
        type: string
  schemas:
    GetOrderQueuePositionResponse:
      type: object
      required:
        - queue_position
      properties:
        queue_position:
          type: integer
          format: int32
          description: The position of the order in the queue
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
    UnauthorizedError:
      description: Unauthorized - authentication required
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    NotFoundError:
      description: Resource not found
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