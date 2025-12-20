---
url: https://docs.kalshi.com/api-reference/communications/get-quote
lastmod: 2025-12-19T22:17:25.436Z
---
# Get Quote

>  Endpoint for getting a particular quote



## OpenAPI

````yaml openapi.yaml get /communications/quotes/{quote_id}
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.3.0
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
  /communications/quotes/{quote_id}:
    get:
      tags:
        - communications
      summary: Get Quote
      description: ' Endpoint for getting a particular quote'
      operationId: GetQuote
      parameters:
        - $ref: '#/components/parameters/QuoteIdPath'
      responses:
        '200':
          description: Quote retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetQuoteResponse'
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
    QuoteIdPath:
      name: quote_id
      in: path
      required: true
      description: Quote ID
      schema:
        type: string
  schemas:
    GetQuoteResponse:
      type: object
      required:
        - quote
      properties:
        quote:
          $ref: '#/components/schemas/Quote'
          description: The details of the requested quote
    Quote:
      type: object
      required:
        - id
        - rfq_id
        - creator_id
        - rfq_creator_id
        - market_ticker
        - contracts
        - yes_bid
        - no_bid
        - yes_bid_dollars
        - no_bid_dollars
        - created_ts
        - updated_ts
        - status
      properties:
        id:
          type: string
          description: Unique identifier for the quote
        rfq_id:
          type: string
          description: ID of the RFQ this quote is responding to
        creator_id:
          type: string
          description: Public communications ID of the quote creator
        rfq_creator_id:
          type: string
          description: Public communications ID of the RFQ creator
          x-go-type-skip-optional-pointer: true
        market_ticker:
          type: string
          description: The ticker of the market this quote is for
        contracts:
          type: integer
          description: Number of contracts in the quote
        yes_bid:
          type: integer
          description: Bid price for YES contracts, in cents
        no_bid:
          type: integer
          description: Bid price for NO contracts, in cents
        yes_bid_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Bid price for YES contracts, in dollars
        no_bid_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Bid price for NO contracts, in dollars
        created_ts:
          type: string
          format: date-time
          description: Timestamp when the quote was created
        updated_ts:
          type: string
          format: date-time
          description: Timestamp when the quote was last updated
        status:
          type: string
          description: Current status of the quote
          enum:
            - open
            - accepted
            - confirmed
            - executed
            - cancelled
        accepted_side:
          type: string
          description: The side that was accepted (yes or no)
          enum:
            - 'yes'
            - 'no'
        accepted_ts:
          type: string
          format: date-time
          description: Timestamp when the quote was accepted
        confirmed_ts:
          type: string
          format: date-time
          description: Timestamp when the quote was confirmed
        executed_ts:
          type: string
          format: date-time
          description: Timestamp when the quote was executed
        cancelled_ts:
          type: string
          format: date-time
          description: Timestamp when the quote was cancelled
        rest_remainder:
          type: boolean
          description: Whether to rest the remainder of the quote after execution
        cancellation_reason:
          type: string
          description: Reason for quote cancellation if cancelled
          x-go-type-skip-optional-pointer: true
        creator_user_id:
          type: string
          description: User ID of the quote creator (private field)
          x-go-type-skip-optional-pointer: true
        rfq_creator_user_id:
          type: string
          description: User ID of the RFQ creator (private field)
          x-go-type-skip-optional-pointer: true
        rfq_target_cost_centi_cents:
          type: integer
          format: int64
          description: Total value requested in the RFQ in centi-cents
        rfq_creator_order_id:
          type: string
          description: Order ID for the RFQ creator (private field)
          x-go-type-skip-optional-pointer: true
        creator_order_id:
          type: string
          description: Order ID for the quote creator (private field)
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
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with exactly 4 decimal
        places
      example: '0.5600'
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