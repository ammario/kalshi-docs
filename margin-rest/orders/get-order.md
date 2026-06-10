---
url: https://docs.kalshi.com/margin-rest/orders/get-order
lastmod: 2026-06-10T02:45:05.718Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Order

> Endpoint for retrieving a specific margin order.



## OpenAPI

````yaml /perps_openapi.yaml get /margin/orders/{order_id}
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
  /margin/orders/{order_id}:
    get:
      tags:
        - orders
      summary: Get Order
      description: Endpoint for retrieving a specific margin order.
      operationId: GetMarginOrder
      parameters:
        - $ref: '#/components/parameters/OrderIdPath'
      responses:
        '200':
          description: Order retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarginOrderResponse'
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
  schemas:
    GetMarginOrderResponse:
      type: object
      required:
        - order
      properties:
        order:
          $ref: '#/components/schemas/MarginOrder'
    MarginOrder:
      type: object
      required:
        - order_id
        - user_id
        - client_order_id
        - ticker
        - side
        - price
        - fill_count
        - remaining_count
        - last_update_reason
      properties:
        order_id:
          type: string
        user_id:
          type: string
          description: Unique identifier for users
        client_order_id:
          type: string
        ticker:
          type: string
        side:
          $ref: '#/components/schemas/BookSide'
        last_update_reason:
          $ref: '#/components/schemas/LastUpdateReason'
        price:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Price for the order in fixed-point dollars.
        fill_count:
          $ref: '#/components/schemas/FixedPointCount'
          description: Fixed-point contract count for filled quantity
        remaining_count:
          $ref: '#/components/schemas/FixedPointCount'
          description: Fixed-point contract count for remaining quantity
        expiration_time:
          type: string
          format: date-time
          nullable: true
        created_time:
          type: string
          format: date-time
          nullable: true
          x-omitempty: false
        last_update_time:
          type: string
          format: date-time
          nullable: true
          x-omitempty: true
          description: The last update to an order (modify, cancel, fill)
        self_trade_prevention_type:
          $ref: '#/components/schemas/SelfTradePreventionType'
          nullable: true
          x-omitempty: false
        cancel_order_on_pause:
          type: boolean
          description: >-
            If this flag is set to true, the order will be canceled if the order
            is open and trading on the exchange is paused for any reason.
        order_group_id:
          type: string
          description: The order group this order is part of
        order_source:
          $ref: '#/components/schemas/OrderSource'
          description: >-
            The source of the order. Indicates whether the order was placed by
            the user or by the system on behalf of the user.
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
    LastUpdateReason:
      type: string
      enum:
        - ''
        - Decrease
        - Amend
        - MarginCancel
        - SelfTradeCancel
        - ExpiryCancel
        - Trade
        - PostOnlyCrossCancel
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with up to 6 decimal
        places of precision. This is the maximum supported precision; valid
        quote intervals for a given market are constrained by that market's
        price level structure.
      example: '0.5600'
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
    SelfTradePreventionType:
      type: string
      enum:
        - taker_at_cross
        - maker
      description: >
        The self-trade prevention type for orders. `taker_at_cross` cancels the
        taker order when it would trade against another order from the same
        user; execution stops and any partial fills already matched are
        executed. `maker` cancels the resting maker order and continues
        matching.
    OrderSource:
      type: string
      enum:
        - user
        - system
      description: >-
        The source of the order. 'user' indicates a user-placed order, 'system'
        indicates a system-generated liquidation order.
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