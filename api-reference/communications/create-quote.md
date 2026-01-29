---
url: https://docs.kalshi.com/api-reference/communications/create-quote
lastmod: 2026-01-29T00:38:22.062Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Create Quote

>  Endpoint for creating a quote in response to an RFQ



## OpenAPI

````yaml openapi.yaml post /communications/quotes
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
  /communications/quotes:
    post:
      tags:
        - communications
      summary: Create Quote
      description: ' Endpoint for creating a quote in response to an RFQ'
      operationId: CreateQuote
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateQuoteRequest'
      responses:
        '201':
          description: Quote created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateQuoteResponse'
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
    CreateQuoteRequest:
      type: object
      required:
        - rfq_id
        - yes_bid
        - no_bid
        - rest_remainder
      properties:
        rfq_id:
          type: string
          description: The ID of the RFQ to quote on
        yes_bid:
          $ref: '#/components/schemas/FixedPointDollars'
          type: string
          description: The bid price for YES contracts, in dollars
        no_bid:
          $ref: '#/components/schemas/FixedPointDollars'
          type: string
          description: The bid price for NO contracts, in dollars
        rest_remainder:
          type: boolean
          description: Whether to rest the remainder of the quote after execution
        subaccount:
          type: integer
          description: >-
            Optional subaccount number to place the quote under (0 for primary,
            1-32 for subaccounts)
    CreateQuoteResponse:
      type: object
      required:
        - id
      properties:
        id:
          type: string
          description: The ID of the newly created quote
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with exactly 4 decimal
        places
      example: '0.5600'
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