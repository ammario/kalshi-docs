---
url: https://docs.kalshi.com/api-reference/portfolio/lock-subaccount-for-settlement-advance
lastmod: 2026-07-24T17:37:44.584Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Lock Subaccount for Settlement Advance

> Locks a subaccount for settlement advance computation. Locking cancels resting orders, prevents trading, and returns a new state token.



## OpenAPI

````yaml /openapi.yaml put /portfolio/subaccounts/settlement-advance-lock
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.26.0
  description: >-
    Manually defined OpenAPI spec for endpoints being migrated to spec-first
    approach
servers:
  - url: https://external-api.kalshi.com/trade-api/v2
    description: Production Trade API server
  - url: https://api.elections.kalshi.com/trade-api/v2
    description: Production shared API server, also supported
  - url: https://external-api.demo.kalshi.co/trade-api/v2
    description: Demo Trade API server
  - url: https://demo-api.kalshi.co/trade-api/v2
    description: Demo shared API server, also supported
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
  /portfolio/subaccounts/settlement-advance-lock:
    put:
      tags:
        - portfolio
      summary: Lock Subaccount for Settlement Advance
      description: >-
        Locks a subaccount for settlement advance computation. Locking cancels
        resting orders, prevents trading, and returns a new state token.
      operationId: LockSubaccountForSettlementAdvance
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LockSubaccountForSettlementAdvanceRequest'
      responses:
        '200':
          description: Subaccount locked successfully
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/LockSubaccountForSettlementAdvanceResponse
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
    LockSubaccountForSettlementAdvanceRequest:
      type: object
      required:
        - subaccount_number
      properties:
        subaccount_number:
          type: integer
          nullable: true
          description: Subaccount number (0 for primary, 1-63 for numbered subaccounts).
          x-oapi-codegen-extra-tags:
            validate: required
        exchange_index:
          allOf:
            - $ref: '#/components/schemas/ExchangeIndex'
          description: Identifier for an exchange shard. Defaults to 0 if unspecified.
          x-go-type-skip-optional-pointer: true
          x-oapi-codegen-extra-tags:
            validate: gte=0
    LockSubaccountForSettlementAdvanceResponse:
      type: object
      required:
        - settlement_advance_state
      properties:
        settlement_advance_state:
          type: string
          format: uuid
          description: New state token for settlement advance compare-and-swap requests.
    ExchangeIndex:
      type: integer
      description: >-
        Identifier for an exchange shard. Defaults to 0 if unspecified. Note:
        currently only 0 supported.
      example: 0
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