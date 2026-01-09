---
url: https://docs.kalshi.com/api-reference/orders/create-order
lastmod: 2026-01-09T02:22:56.072Z
---
# Create Order

>  Endpoint for submitting orders in a market. Each user is limited to 200 000 open orders at a time.



## OpenAPI

````yaml openapi.yaml post /portfolio/orders
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.4.0
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
  /portfolio/orders:
    post:
      tags:
        - orders
      summary: Create Order
      description: ' Endpoint for submitting orders in a market. Each user is limited to 200 000 open orders at a time.'
      operationId: CreateOrder
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateOrderRequest'
      responses:
        '201':
          description: Order created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateOrderResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '409':
          $ref: '#/components/responses/ConflictError'
        '429':
          $ref: '#/components/responses/RateLimitError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    CreateOrderRequest:
      type: object
      required:
        - ticker
        - side
        - action
        - count
      properties:
        ticker:
          type: string
          x-oapi-codegen-extra-tags:
            validate: required,min=1
        client_order_id:
          type: string
          x-go-type-skip-optional-pointer: true
        side:
          type: string
          enum:
            - 'yes'
            - 'no'
          x-oapi-codegen-extra-tags:
            validate: required,oneof=yes no
        action:
          type: string
          enum:
            - buy
            - sell
          x-oapi-codegen-extra-tags:
            validate: required,oneof=buy sell
        count:
          type: integer
          minimum: 1
          x-oapi-codegen-extra-tags:
            validate: required,gte=1
        type:
          type: string
          enum:
            - limit
            - market
          x-oapi-codegen-extra-tags:
            validate: omitempty,oneof=limit market
        yes_price:
          type: integer
          minimum: 1
          maximum: 99
          x-go-type-skip-optional-pointer: true
        no_price:
          type: integer
          minimum: 1
          maximum: 99
          x-go-type-skip-optional-pointer: true
        yes_price_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Submitting price of the Yes side in fixed-point dollars
        no_price_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Submitting price of the No side in fixed-point dollars
        expiration_ts:
          type: integer
          format: int64
        time_in_force:
          type: string
          enum:
            - fill_or_kill
            - good_till_canceled
            - immediate_or_cancel
          x-oapi-codegen-extra-tags:
            validate: >-
              omitempty,oneof=fill_or_kill good_till_canceled
              immediate_or_cancel
          x-go-type-skip-optional-pointer: true
        buy_max_cost:
          type: integer
          description: >-
            Maximum cost in cents. When specified, the order will automatically
            have Fill-or-Kill (FoK) behavior.
        post_only:
          type: boolean
        reduce_only:
          type: boolean
        sell_position_floor:
          type: integer
          description: 'Deprecated: Use reduce_only instead. Only accepts value of 0.'
        self_trade_prevention_type:
          allOf:
            - $ref: '#/components/schemas/SelfTradePreventionType'
          x-oapi-codegen-extra-tags:
            validate: omitempty,oneof=taker_at_cross maker
          x-go-type-skip-optional-pointer: true
        order_group_id:
          type: string
          description: The order group this order is part of
          x-go-type-skip-optional-pointer: true
        cancel_order_on_pause:
          type: boolean
          description: >-
            If this flag is set to true, the order will be canceled if the order
            is open and trading on the exchange is paused for any reason.
    CreateOrderResponse:
      type: object
      required:
        - order
      properties:
        order:
          $ref: '#/components/schemas/Order'
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with exactly 4 decimal
        places
      example: '0.5600'
    SelfTradePreventionType:
      type: string
      enum:
        - taker_at_cross
        - maker
      description: The self-trade prevention type for orders
    Order:
      type: object
      required:
        - order_id
        - user_id
        - client_order_id
        - ticker
        - side
        - action
        - type
        - status
        - yes_price
        - no_price
        - yes_price_dollars
        - no_price_dollars
        - fill_count
        - remaining_count
        - initial_count
        - taker_fees
        - maker_fees
        - taker_fill_cost
        - maker_fill_cost
        - taker_fill_cost_dollars
        - maker_fill_cost_dollars
        - queue_position
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
          type: string
          enum:
            - 'yes'
            - 'no'
        action:
          type: string
          enum:
            - buy
            - sell
        type:
          type: string
          enum:
            - limit
            - market
        status:
          $ref: '#/components/schemas/OrderStatus'
        yes_price:
          type: integer
        no_price:
          type: integer
        yes_price_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: The yes price for this order in fixed-point dollars
        no_price_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: The no price for this order in fixed-point dollars
        fill_count:
          type: integer
          description: The number of contracts that have been filled
        remaining_count:
          type: integer
        initial_count:
          type: integer
          description: The initial size of the order (contract units)
        taker_fees:
          type: integer
          description: Fees paid on filled taker contracts, in cents
        maker_fees:
          type: integer
          description: Fees paid on filled maker contracts, in cents
        taker_fill_cost:
          type: integer
          description: The cost of filled taker orders in cents
        maker_fill_cost:
          type: integer
          description: The cost of filled maker orders in cents
        taker_fill_cost_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: The cost of filled taker orders in dollars
        maker_fill_cost_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: The cost of filled maker orders in dollars
        queue_position:
          type: integer
          description: >-
            **DEPRECATED**: This field is deprecated and will always return 0.
            Please use the GET /portfolio/orders/{order_id}/queue_position
            endpoint instead
        taker_fees_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: Fees paid on filled taker contracts, in dollars
        maker_fees_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          description: Fees paid on filled maker contracts, in dollars
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
        order_group_id:
          type: string
          nullable: true
          description: The order group this order is part of
        cancel_order_on_pause:
          type: boolean
          description: >-
            If this flag is set to true, the order will be canceled if the order
            is open and trading on the exchange is paused for any reason.
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
    OrderStatus:
      type: string
      enum:
        - resting
        - canceled
        - executed
      description: The status of an order
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
    RateLimitError:
      description: Rate limit exceeded
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

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt