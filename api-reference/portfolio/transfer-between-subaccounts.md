---
url: https://docs.kalshi.com/api-reference/portfolio/transfer-between-subaccounts
lastmod: 2026-01-29T00:38:21.695Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Transfer Between Subaccounts

> Transfers funds between the authenticated user's subaccounts. Use 0 for the primary account, or 1-32 for numbered subaccounts.



## OpenAPI

````yaml openapi.yaml post /portfolio/subaccounts/transfer
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
  /portfolio/subaccounts/transfer:
    post:
      tags:
        - portfolio
      summary: Transfer Between Subaccounts
      description: >-
        Transfers funds between the authenticated user's subaccounts. Use 0 for
        the primary account, or 1-32 for numbered subaccounts.
      operationId: ApplySubaccountTransfer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ApplySubaccountTransferRequest'
      responses:
        '200':
          description: Transfer completed successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApplySubaccountTransferResponse'
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
    ApplySubaccountTransferRequest:
      type: object
      required:
        - client_transfer_id
        - from_subaccount
        - to_subaccount
        - amount_cents
      properties:
        client_transfer_id:
          type: string
          format: uuid
          description: Unique client-provided transfer ID for idempotency.
          x-oapi-codegen-extra-tags:
            validate: required
        from_subaccount:
          type: integer
          description: >-
            Source subaccount number (0 for primary, 1-32 for numbered
            subaccounts).
        to_subaccount:
          type: integer
          description: >-
            Destination subaccount number (0 for primary, 1-32 for numbered
            subaccounts).
        amount_cents:
          type: integer
          format: int64
          description: Amount to transfer in cents.
    ApplySubaccountTransferResponse:
      type: object
      description: Empty response indicating successful transfer.
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