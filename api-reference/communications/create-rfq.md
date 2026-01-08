---
url: https://docs.kalshi.com/api-reference/communications/create-rfq
lastmod: 2026-01-08T18:44:54.233Z
---
# Create RFQ

>  Endpoint for creating a new RFQ. You can have a maximum of 100 open RFQs at a time.



## OpenAPI

````yaml openapi.yaml post /communications/rfqs
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
  /communications/rfqs:
    post:
      tags:
        - communications
      summary: Create RFQ
      description: ' Endpoint for creating a new RFQ. You can have a maximum of 100 open RFQs at a time.'
      operationId: CreateRFQ
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateRFQRequest'
      responses:
        '201':
          description: RFQ created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateRFQResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '409':
          $ref: '#/components/responses/ConflictError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    CreateRFQRequest:
      type: object
      required:
        - market_ticker
        - rest_remainder
      properties:
        market_ticker:
          type: string
          description: The ticker of the market for which to create an RFQ
        contracts:
          type: integer
          description: The number of contracts for the RFQ
          x-go-type-skip-optional-pointer: true
        target_cost_centi_cents:
          type: integer
          format: int64
          description: The target cost for the RFQ in centi-cents
          x-go-type-skip-optional-pointer: true
        rest_remainder:
          type: boolean
          description: Whether to rest the remainder of the RFQ after execution
        replace_existing:
          type: boolean
          description: Whether to delete existing RFQs as part of this RFQ's creation
          default: false
          x-go-type-skip-optional-pointer: true
        subtrader_id:
          type: string
          description: The subtrader to create the RFQ for (FCM members only)
          x-go-type-skip-optional-pointer: true
    CreateRFQResponse:
      type: object
      required:
        - id
      properties:
        id:
          type: string
          description: The ID of the newly created RFQ
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
    ConflictError:
      description: Conflict - resource already exists or cannot be modified
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