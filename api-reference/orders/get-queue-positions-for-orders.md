---
url: https://docs.kalshi.com/api-reference/orders/get-queue-positions-for-orders
lastmod: 2025-12-17T02:38:38.130Z
---
# Get Queue Positions for Orders

>  Endpoint for getting queue positions for all resting orders. Queue position represents the number of contracts that need to be matched before an order receives a partial or full match, determined using price-time priority.

## OpenAPI

````yaml openapi.yaml get /portfolio/orders/queue_positions
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
  /portfolio/orders/queue_positions:
    get:
      tags:
        - orders
      summary: Get Queue Positions for Orders
      description: ' Endpoint for getting queue positions for all resting orders. Queue position represents the number of contracts that need to be matched before an order receives a partial or full match, determined using price-time priority.'
      operationId: GetOrderQueuePositions
      parameters:
        - name: market_tickers
          in: query
          description: Comma-separated list of market tickers to filter by
          schema:
            type: string
        - name: event_ticker
          in: query
          description: Event ticker to filter by
          schema:
            type: string
      responses:
        '200':
          description: Queue positions retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetOrderQueuePositionsResponse'
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
    GetOrderQueuePositionsResponse:
      type: object
      required:
        - queue_positions
      properties:
        queue_positions:
          type: array
          description: Queue positions for all matching orders
          items:
            $ref: '#/components/schemas/OrderQueuePosition'
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