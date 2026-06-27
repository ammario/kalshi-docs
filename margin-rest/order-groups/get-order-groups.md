---
url: https://docs.kalshi.com/margin-rest/order-groups/get-order-groups
lastmod: 2026-06-26T21:53:04.948Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Order Groups

> Retrieves all order groups for the authenticated user on the margin exchange.



## OpenAPI

````yaml /perps_openapi.yaml get /margin/order_groups
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
  /margin/order_groups:
    get:
      tags:
        - order-groups
      summary: Get Order Groups
      description: >-
        Retrieves all order groups for the authenticated user on the margin
        exchange.
      operationId: GetMarginOrderGroups
      parameters:
        - $ref: '#/components/parameters/SubaccountQuery'
      responses:
        '200':
          description: Order groups retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetOrderGroupsResponse'
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
    SubaccountQuery:
      name: subaccount
      in: query
      required: false
      description: >-
        Subaccount number (0 for primary, 1-63 for subaccounts). If omitted,
        defaults to all subaccounts.
      schema:
        type: integer
        minimum: 0
  schemas:
    GetOrderGroupsResponse:
      type: object
      properties:
        order_groups:
          type: array
          items:
            $ref: '#/components/schemas/OrderGroup'
          x-go-type-skip-optional-pointer: true
    OrderGroup:
      type: object
      required:
        - id
        - is_auto_cancel_enabled
      properties:
        id:
          type: string
          description: Unique identifier for the order group
          x-go-type-skip-optional-pointer: true
        contracts_limit_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            String representation of the current maximum contracts allowed over
            a rolling 15-second window.
          x-go-type-skip-optional-pointer: true
        is_auto_cancel_enabled:
          type: boolean
          description: Whether auto-cancel is enabled for this order group
          x-go-type-skip-optional-pointer: true
        exchange_index:
          allOf:
            - $ref: '#/components/schemas/ExchangeIndex'
          x-go-type-skip-optional-pointer: true
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
    ExchangeIndex:
      type: integer
      description: >-
        Identifier for an exchange shard. Defaults to 0 if unspecified. Note:
        currently only 0 supported.
      example: 0
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