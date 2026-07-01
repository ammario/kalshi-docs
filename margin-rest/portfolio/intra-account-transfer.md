---
url: https://docs.kalshi.com/margin-rest/portfolio/intra-account-transfer
lastmod: 2026-06-30T23:08:50.810Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Intra Account Transfer

>  Endpoint for transferring funds within the same account. This endpoint is currently not available.



## OpenAPI

````yaml /perps_openapi.yaml post /portfolio/intra_exchange_instance_transfer
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 0.0.1
  description: >-
    Manually defined OpenAPI spec for endpoints being migrated to spec-first
    approach
servers:
  - url: https://external-api.kalshi.com/trade-api/v2
    description: Production perps REST API server
  - url: https://external-api.demo.kalshi.co/trade-api/v2
    description: Demo perps REST API server
security: []
tags:
  - name: account
    description: Account information endpoints
  - name: exchange
    description: Exchange status and information endpoints
  - name: market
    description: Market data endpoints
  - name: orders
    description: Order management endpoints
  - name: order-groups
    description: Order group management endpoints
  - name: portfolio
    description: Portfolio and balance information endpoints
  - name: fcm
    description: FCM member specific endpoints
  - name: risk
    description: Margin risk metrics, parameters, and limits
  - name: funding
    description: Funding rates and payment history
  - name: fees
    description: Margin fee schedule
paths:
  /portfolio/intra_exchange_instance_transfer:
    post:
      tags:
        - portfolio
      summary: Intra Account Transfer
      description: ' Endpoint for transferring funds within the same account. This endpoint is currently not available.'
      operationId: IntraExchangeInstanceTransfer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/IntraExchangeInstanceTransferRequest'
      responses:
        '200':
          description: Transfer request accepted. The transfer is processed asynchronously.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/IntraExchangeInstanceTransferResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
        - kalshiAccessSignature: []
        - kalshiAccessTimestamp: []
components:
  schemas:
    IntraExchangeInstanceTransferRequest:
      type: object
      required:
        - source
        - destination
        - amount
      properties:
        source:
          $ref: '#/components/schemas/ExchangeInstance'
          description: The source exchange instance
        destination:
          $ref: '#/components/schemas/ExchangeInstance'
          description: The destination exchange instance
        amount:
          type: integer
          format: int64
          description: The amount to transfer in centicents
        source_exchange_shard:
          type: integer
          default: 0
          x-go-type-skip-optional-pointer: true
          description: Source exchange shard index (default 0)
        destination_exchange_shard:
          type: integer
          default: 0
          x-go-type-skip-optional-pointer: true
          description: Destination exchange shard index (default 0)
    IntraExchangeInstanceTransferResponse:
      type: object
      required:
        - transfer_id
      properties:
        transfer_id:
          type: string
          description: The ID of the transfer that was created
    ExchangeInstance:
      type: string
      enum:
        - event_contract
        - margined
      description: The exchange instance type
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
    ForbiddenError:
      description: Forbidden - insufficient permissions
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