---
url: https://docs.kalshi.com/margin-rest/orders/decrease-order
lastmod: 2026-06-29T19:36:12.939Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Decrease Order

> Endpoint for decreasing the number of contracts in an existing order. Exactly one of `reduce_by` or `reduce_to` must be provided. Canceling an order is equivalent to decreasing to zero.



## OpenAPI

````yaml /perps_openapi.yaml post /margin/orders/{order_id}/decrease
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
  /margin/orders/{order_id}/decrease:
    post:
      tags:
        - orders
      summary: Decrease Order
      description: >-
        Endpoint for decreasing the number of contracts in an existing order.
        Exactly one of `reduce_by` or `reduce_to` must be provided. Canceling an
        order is equivalent to decreasing to zero.
      operationId: DecreaseMarginOrder
      parameters:
        - $ref: '#/components/parameters/OrderIdPath'
        - $ref: '#/components/parameters/SubaccountQueryDefaultPrimary'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/DecreaseMarginOrderRequest'
      responses:
        '200':
          description: Order decreased successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DecreaseMarginOrderResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
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
  parameters:
    OrderIdPath:
      name: order_id
      in: path
      required: true
      description: Order ID
      schema:
        type: string
    SubaccountQueryDefaultPrimary:
      name: subaccount
      in: query
      required: false
      description: Subaccount number (0 for primary, 1-63 for subaccounts). Defaults to 0.
      schema:
        type: integer
        minimum: 0
        default: 0
  schemas:
    DecreaseMarginOrderRequest:
      type: object
      properties:
        reduce_by:
          $ref: '#/components/schemas/FixedPointCount'
          nullable: true
          description: >-
            String representation of the number of contracts to reduce by.
            Exactly one of `reduce_by` or `reduce_to` must be provided.
        reduce_to:
          $ref: '#/components/schemas/FixedPointCount'
          nullable: true
          description: >-
            String representation of the number of contracts to reduce to.
            Exactly one of `reduce_by` or `reduce_to` must be provided.
    DecreaseMarginOrderResponse:
      type: object
      required:
        - order_id
        - remaining_count
      properties:
        order_id:
          type: string
        client_order_id:
          type: string
        remaining_count:
          $ref: '#/components/schemas/FixedPointCount'
          description: Number of contracts remaining after the decrease.
    FixedPointCount:
      type: string
      description: >-
        Fixed-point contract count string (2 decimals, e.g., "10.00"; referred
        to as "fp" in field names). Requests accept 0–2 decimal places (e.g.,
        "10", "10.0", "10.00"); responses always emit 2 decimals. Fractional
        contract values (e.g., "2.50") are supported on markets with fractional
        trading enabled; the minimum granularity is 0.01 contracts. Integer
        contract count fields are legacy and will be deprecated; when both
        integer and fp fields are provided, they must match.
      example: '10.00'
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