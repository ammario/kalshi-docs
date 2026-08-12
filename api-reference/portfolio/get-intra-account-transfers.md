---
url: https://docs.kalshi.com/api-reference/portfolio/get-intra-account-transfers
lastmod: 2026-08-11T23:12:16.913Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Intra Account Transfers

> Endpoint for fetching intra-exchange account transfer history.



## OpenAPI

````yaml /openapi.yaml get /portfolio/intra_exchange_instance_transfers
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.28.0
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
  /portfolio/intra_exchange_instance_transfers:
    get:
      tags:
        - portfolio
      summary: Get Intra Account Transfers
      description: Endpoint for fetching intra-exchange account transfer history.
      operationId: GetIntraExchangeInstanceTransfers
      parameters:
        - $ref: '#/components/parameters/TransfersLimitQuery'
        - $ref: '#/components/parameters/CursorQuery'
      responses:
        '200':
          description: Transfers retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetIntraExchangeInstanceTransfersResponse'
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
    TransfersLimitQuery:
      name: limit
      in: query
      description: Number of results per page. Defaults to 100. Maximum value is 500.
      schema:
        type: integer
        format: int64
        minimum: 1
        maximum: 500
        default: 100
        x-go-type-skip-optional-pointer: true
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
    GetIntraExchangeInstanceTransfersResponse:
      type: object
      required:
        - transfers
      properties:
        transfers:
          type: array
          items:
            $ref: '#/components/schemas/IntraExchangeInstanceTransfer'
        cursor:
          type: string
          description: >-
            Cursor for the next page of results. Omitted when there are no
            further pages.
    IntraExchangeInstanceTransfer:
      type: object
      required:
        - transfer_id
        - source
        - destination
        - source_exchange_shard
        - destination_exchange_shard
        - amount
        - status
        - created_ts
      properties:
        transfer_id:
          type: string
          description: Unique transfer id
        source:
          $ref: '#/components/schemas/ExchangeInstance'
          description: Source exchange instance
        destination:
          $ref: '#/components/schemas/ExchangeInstance'
          description: Destination exchange instance
        source_exchange_shard:
          type: integer
          description: Source exchange shard index
        destination_exchange_shard:
          type: integer
          description: Destination exchange shard index
        amount:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Transfer amount in dollars
        status:
          $ref: '#/components/schemas/IntraExchangeInstanceTransferStatus'
        created_ts:
          type: integer
          format: int64
          description: Unix timestamp when the transfer was created
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
    ExchangeInstance:
      type: string
      enum:
        - event_contract
        - margined
      description: The exchange instance type
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with up to 6 decimal
        places of precision. This is the maximum supported precision; valid
        quote intervals for a given market are constrained by that market's
        price level structure.
      example: '0.5600'
    IntraExchangeInstanceTransferStatus:
      type: string
      enum:
        - pending
        - complete
      x-enum-varnames:
        - IntraExchangeInstanceTransferStatusPending
        - IntraExchangeInstanceTransferStatusComplete
      description: Transfer status.
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