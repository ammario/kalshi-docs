---
url: https://docs.kalshi.com/api-reference/communications/create-rfq
lastmod: 2026-02-17T01:07:45.597Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Create RFQ

>  Endpoint for creating a new RFQ. You can have a maximum of 100 open RFQs at a time.



## OpenAPI

````yaml openapi.yaml post /communications/rfqs
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.7.0
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
          description: >-
            The number of contracts for the RFQ. Whole contracts only. Contracts
            may be provided via contracts or contracts_fp; if both provided they
            must match.
          x-go-type-skip-optional-pointer: true
        contracts_fp:
          $ref: '#/components/schemas/FixedPointCount'
          nullable: true
          description: >-
            String representation of the number of contracts for the RFQ (whole
            contracts only). Contracts may be provided via contracts or
            contracts_fp; if both provided they must match.
        target_cost_centi_cents:
          type: integer
          format: int64
          description: >-
            DEPRECATED: The target cost for the RFQ in centi-cents. Use
            target_cost_dollars instead.
          deprecated: true
          x-go-type-skip-optional-pointer: true
        target_cost_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: The target cost for the RFQ in dollars
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
        subaccount:
          type: integer
          description: >-
            The subaccount number to create the RFQ for (direct members only; 0
            for primary, 1-32 for subaccounts)
          x-go-type-skip-optional-pointer: true
    CreateRFQResponse:
      type: object
      required:
        - id
      properties:
        id:
          type: string
          description: The ID of the newly created RFQ
    FixedPointCount:
      type: string
      description: >-
        Fixed-point contract count string (2 decimals, e.g., "10.00"; referred
        to as "fp" in field names). Requests accept 0–2 decimal places (e.g.,
        "10", "10.0", "10.00"); responses always emit 2 decimals. Currently only
        whole contract values are permitted, but the format supports future
        fractional precision. Integer contract count fields are legacy and will
        be deprecated; when both integer and fp fields are provided, they must
        match.
      example: '10.00'
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with up to 4 decimal
        places of precision. This is the maximum supported precision; valid
        quote intervals for a given market are constrained by that market's
        price level structure.
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