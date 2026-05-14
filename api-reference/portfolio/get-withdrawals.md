---
url: https://docs.kalshi.com/api-reference/portfolio/get-withdrawals
lastmod: 2026-05-13T16:12:54.107Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Withdrawals

> Endpoint for getting the member's withdrawal history.



## OpenAPI

````yaml /openapi.yaml get /portfolio/withdrawals
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.18.0
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
  /portfolio/withdrawals:
    get:
      tags:
        - portfolio
      summary: Get Withdrawals
      description: Endpoint for getting the member's withdrawal history.
      operationId: GetWithdrawals
      parameters:
        - $ref: '#/components/parameters/WithdrawalLimitQuery'
        - $ref: '#/components/parameters/CursorQuery'
      responses:
        '200':
          description: Withdrawals retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetWithdrawalsResponse'
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
  parameters:
    WithdrawalLimitQuery:
      name: limit
      in: query
      description: Number of results per page. Defaults to 100. Maximum value is 500.
      schema:
        type: integer
        format: int64
        minimum: 1
        maximum: 500
        default: 100
        x-oapi-codegen-extra-tags:
          validate: omitempty,min=1,max=500
    CursorQuery:
      name: cursor
      in: query
      description: >-
        Pagination cursor. Use the cursor value returned from the previous
        response to get the next page of results. Leave empty for the first
        page.
      schema:
        type: string
        x-go-type-skip-optional-pointer: true
  schemas:
    GetWithdrawalsResponse:
      type: object
      required:
        - withdrawals
      properties:
        withdrawals:
          type: array
          items:
            $ref: '#/components/schemas/Withdrawal'
        cursor:
          type: string
    Withdrawal:
      type: object
      required:
        - id
        - status
        - type
        - amount_cents
        - fee_cents
        - created_ts
      properties:
        id:
          type: string
          description: Unique identifier for the withdrawal.
        status:
          type: string
          enum:
            - pending
            - applied
            - failed
            - returned
          description: >-
            Current status of the withdrawal. 'applied' means funds have been
            deducted from balance.
        type:
          type: string
          enum:
            - ach
            - wire
            - crypto
            - debit
            - apm
          description: Payment type used for the withdrawal.
        amount_cents:
          type: integer
          format: int64
          description: Withdrawal amount in cents.
        fee_cents:
          type: integer
          format: int64
          description: Fee charged for the withdrawal in cents.
        created_ts:
          type: integer
          format: int64
          description: Unix timestamp of when the withdrawal was created.
        finalized_ts:
          type: integer
          format: int64
          nullable: true
          description: >-
            Unix timestamp of when the withdrawal was finalized (applied,
            failed, or returned).
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