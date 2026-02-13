---
url: https://docs.kalshi.com/api-reference/portfolio/get-subaccount-transfers
lastmod: 2026-02-12T20:57:11.539Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Subaccount Transfers

> Gets a paginated list of all transfers between subaccounts for the authenticated user.



## OpenAPI

````yaml openapi.yaml get /portfolio/subaccounts/transfers
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
  /portfolio/subaccounts/transfers:
    get:
      tags:
        - portfolio
      summary: Get Subaccount Transfers
      description: >-
        Gets a paginated list of all transfers between subaccounts for the
        authenticated user.
      operationId: GetSubaccountTransfers
      parameters:
        - $ref: '#/components/parameters/LimitQuery'
        - $ref: '#/components/parameters/CursorQuery'
      responses:
        '200':
          description: Transfers retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetSubaccountTransfersResponse'
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
    LimitQuery:
      name: limit
      in: query
      description: Number of results per page. Defaults to 100. Maximum value is 200.
      schema:
        type: integer
        format: int64
        minimum: 1
        maximum: 200
        default: 100
        x-oapi-codegen-extra-tags:
          validate: omitempty,min=1,max=200
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
    GetSubaccountTransfersResponse:
      type: object
      required:
        - transfers
      properties:
        transfers:
          type: array
          items:
            $ref: '#/components/schemas/SubaccountTransfer'
        cursor:
          type: string
          description: Cursor for the next page of results.
    SubaccountTransfer:
      type: object
      required:
        - transfer_id
        - from_subaccount
        - to_subaccount
        - amount_cents
        - created_ts
      properties:
        transfer_id:
          type: string
          description: Unique identifier for this transfer.
        from_subaccount:
          type: integer
          description: Source subaccount number (0 for primary, 1-32 for subaccounts).
        to_subaccount:
          type: integer
          description: Destination subaccount number (0 for primary, 1-32 for subaccounts).
        amount_cents:
          type: integer
          format: int64
          description: Transfer amount in cents.
        created_ts:
          type: integer
          format: int64
          description: Unix timestamp when the transfer was created.
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