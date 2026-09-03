---
url: https://docs.kalshi.com/api-reference/portfolio/get-intra-account-transfer
lastmod: 2026-09-02T22:09:39.144Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Intra Account Transfer

> Endpoint for getting a single intra-account transfer by id.



## OpenAPI

````yaml /openapi.yaml get /portfolio/intra_exchange_instance_transfers/{transfer_id}
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.29.0
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
  /portfolio/intra_exchange_instance_transfers/{transfer_id}:
    get:
      tags:
        - portfolio
      summary: Get Intra Account Transfer
      description: Endpoint for getting a single intra-account transfer by id.
      operationId: GetIntraExchangeInstanceTransfer
      parameters:
        - name: transfer_id
          in: path
          required: true
          description: Transfer id returned by creation endpoint
          schema:
            type: string
      responses:
        '200':
          description: The requested transfer
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetIntraExchangeInstanceTransferResponse'
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
  schemas:
    GetIntraExchangeInstanceTransferResponse:
      type: object
      required:
        - transfer
      properties:
        transfer:
          $ref: '#/components/schemas/IntraExchangeInstanceTransfer'
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
        Fixed-point US dollar string. Most request fields accept 2-4 decimal
        places (e.g., "0.56", "0.5600"); responses emit up to 6. Valid quote
        intervals for a given market are constrained by that market's price
        level structure.
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