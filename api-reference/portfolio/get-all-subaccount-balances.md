---
url: https://docs.kalshi.com/api-reference/portfolio/get-all-subaccount-balances
lastmod: 2026-01-30T01:58:33.450Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get All Subaccount Balances

> Gets balances for all subaccounts including the primary account.



## OpenAPI

````yaml openapi.yaml get /portfolio/subaccounts/balances
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
  /portfolio/subaccounts/balances:
    get:
      tags:
        - portfolio
      summary: Get All Subaccount Balances
      description: Gets balances for all subaccounts including the primary account.
      operationId: GetSubaccountBalances
      responses:
        '200':
          description: Balances retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetSubaccountBalancesResponse'
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
    GetSubaccountBalancesResponse:
      type: object
      required:
        - subaccount_balances
      properties:
        subaccount_balances:
          type: array
          items:
            $ref: '#/components/schemas/SubaccountBalance'
    SubaccountBalance:
      type: object
      required:
        - subaccount_number
        - balance
        - updated_ts
      properties:
        subaccount_number:
          type: integer
          description: Subaccount number (0 for primary, 1-32 for subaccounts).
        balance:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Balance in dollars.
        updated_ts:
          type: integer
          format: int64
          description: Unix timestamp of last balance update.
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