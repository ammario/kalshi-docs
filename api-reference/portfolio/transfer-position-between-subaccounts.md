---
url: https://docs.kalshi.com/api-reference/portfolio/transfer-position-between-subaccounts
lastmod: 2026-07-02T03:19:35.571Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Transfer Position Between Subaccounts

> Moves an existing position between two of the authenticated user's own subaccounts. Use 0 for the primary account, or 1-63 for numbered subaccounts. The transfer is idempotent on `client_transfer_id`: retrying with the same value returns 409. `price_cents` is the per-contract transfer price — see the [Subaccounts](/getting_started/subaccounts) page for how it sets cost basis and P&L.



## OpenAPI

````yaml /openapi.yaml post /portfolio/subaccounts/positions/transfer
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.23.0
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
  /portfolio/subaccounts/positions/transfer:
    post:
      tags:
        - portfolio
      summary: Transfer Position Between Subaccounts
      description: >-
        Moves an existing position between two of the authenticated user's own
        subaccounts. Use 0 for the primary account, or 1-63 for numbered
        subaccounts. The transfer is idempotent on `client_transfer_id`:
        retrying with the same value returns 409. `price_cents` is the
        per-contract transfer price — see the
        [Subaccounts](/getting_started/subaccounts) page for how it sets cost
        basis and P&L.
      operationId: ApplySubaccountPositionTransfer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ApplySubaccountPositionTransferRequest'
      responses:
        '200':
          description: Position transfer completed successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApplySubaccountPositionTransferResponse'
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
    ApplySubaccountPositionTransferRequest:
      type: object
      required:
        - client_transfer_id
        - from_subaccount
        - to_subaccount
        - market_ticker
        - side
        - count
        - price_cents
      properties:
        client_transfer_id:
          type: string
          format: uuid
          description: >-
            Unique client-provided transfer ID for idempotency. Retrying with
            the same value returns 409.
          x-oapi-codegen-extra-tags:
            validate: required
        from_subaccount:
          type: integer
          nullable: true
          description: >-
            Source subaccount number (0 for primary, 1-63 for numbered
            subaccounts).
          x-oapi-codegen-extra-tags:
            validate: required
        to_subaccount:
          type: integer
          nullable: true
          description: >-
            Destination subaccount number (0 for primary, 1-63 for numbered
            subaccounts).
          x-oapi-codegen-extra-tags:
            validate: required
        market_ticker:
          type: string
          description: >-
            Ticker of the market whose position is being moved. The market must
            be on exchange shard 0; markets on any other shard are rejected.
          x-oapi-codegen-extra-tags:
            validate: required
        side:
          type: string
          enum:
            - 'yes'
            - 'no'
          description: Side of the position to move.
          x-oapi-codegen-extra-tags:
            validate: required
        count:
          type: integer
          nullable: true
          description: Number of contracts to move (must be greater than 0).
          x-oapi-codegen-extra-tags:
            validate: required
        price_cents:
          type: integer
          nullable: true
          description: >-
            Per-contract price in cents (0-100) used to set cost basis and
            realized P&L.
          x-oapi-codegen-extra-tags:
            validate: required
    ApplySubaccountPositionTransferResponse:
      type: object
      required:
        - position_transfer_id
      properties:
        position_transfer_id:
          type: string
          description: Server-generated identifier for the position transfer.
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