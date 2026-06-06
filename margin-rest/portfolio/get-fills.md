---
url: https://docs.kalshi.com/margin-rest/portfolio/get-fills
lastmod: 2026-06-05T21:02:00.734Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Fills

> Endpoint for retrieving the authenticated user's margin fills.



## OpenAPI

````yaml /perps_openapi.yaml get /margin/fills
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
  /margin/fills:
    get:
      tags:
        - portfolio
      summary: Get Fills
      description: Endpoint for retrieving the authenticated user's margin fills.
      operationId: GetMarginFills
      parameters:
        - name: subaccount
          in: query
          required: false
          description: Subaccount number (0 for primary, 1-32 for subaccounts)
          schema:
            type: integer
            default: 0
        - name: limit
          in: query
          required: false
          description: Number of results per page
          schema:
            type: integer
            minimum: 1
            maximum: 1000
            default: 100
          x-go-type-skip-optional-pointer: true
        - name: cursor
          in: query
          required: false
          description: Pagination cursor from a previous response
          schema:
            type: string
          x-go-type-skip-optional-pointer: true
        - name: min_ts
          in: query
          required: false
          schema:
            type: integer
            format: int64
          description: Filter fills after this Unix timestamp
        - name: max_ts
          in: query
          required: false
          schema:
            type: integer
            format: int64
          description: Filter fills before this Unix timestamp
      responses:
        '200':
          description: Fills retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarginFillsResponse'
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
    GetMarginFillsResponse:
      type: object
      required:
        - fills
        - cursor
      properties:
        fills:
          type: array
          items:
            $ref: '#/components/schemas/MarginFill'
        cursor:
          type: string
    MarginFill:
      type: object
      required:
        - fill_id
        - order_id
        - is_taker
        - side
        - count
        - created_time
        - ticker
        - price
        - entry_price
        - fees
        - realized_pnl
      properties:
        fill_id:
          type: string
          description: Unique identifier for the fill
        order_id:
          type: string
          description: The order ID that generated this fill
        is_taker:
          type: boolean
          description: Whether the user was the taker in this fill
        side:
          $ref: '#/components/schemas/BookSide'
        count:
          $ref: '#/components/schemas/FixedPointCount'
        created_time:
          type: string
          format: date-time
          description: When the fill was executed
        ticker:
          type: string
          description: Market ticker symbol
        price:
          type: string
          description: Fill price in fixed-point dollars
        entry_price:
          type: string
          description: >-
            Position entry price used to compute incremental realized PnL for
            this fill
        fees:
          type: string
          description: Fees paid on filled contracts, in dollars
        realized_pnl:
          type: string
          description: >-
            Incremental realized PnL contributed by this fill, in fixed-point
            dollars
        order_source:
          $ref: '#/components/schemas/OrderSource'
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
    BookSide:
      type: string
      enum:
        - bid
        - ask
      description: The side of an order or trade (bid or ask)
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
    OrderSource:
      type: string
      enum:
        - user
        - system
      description: >-
        The source of the order. 'user' indicates a user-placed order, 'system'
        indicates a system-generated liquidation order.
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