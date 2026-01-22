---
url: https://docs.kalshi.com/api-reference/orders/decrease-order
lastmod: 2026-01-22T00:35:01.955Z
---
# Decrease Order

>  Endpoint for decreasing the number of contracts in an existing order. This is the only kind of edit available on order quantity. Cancelling an order is equivalent to decreasing an order amount to zero.



## OpenAPI

````yaml openapi.yaml post /portfolio/orders/{order_id}/decrease
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
  /portfolio/orders/{order_id}/decrease:
    post:
      tags:
        - orders
      summary: Decrease Order
      description: ' Endpoint for decreasing the number of contracts in an existing order. This is the only kind of edit available on order quantity. Cancelling an order is equivalent to decreasing an order amount to zero.'
      operationId: DecreaseOrder
      parameters:
        - $ref: '#/components/parameters/OrderIdPath'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/DecreaseOrderRequest'
      responses:
        '200':
          description: Order decreased successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DecreaseOrderResponse'
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
  schemas:
    DecreaseOrderRequest:
      type: object
      properties:
        reduce_by:
          type: integer
          minimum: 1
          description: >-
            Number of contracts to reduce by (whole contracts only). Reduce-by
            may be provided via reduce_by or reduce_by_fp; if both provided they
            must match. Exactly one of reduce_by(/reduce_by_fp) or
            reduce_to(/reduce_to_fp) must be provided.
        reduce_by_fp:
          $ref: '#/components/schemas/FixedPointCount'
          nullable: true
          description: >-
            String representation of the number of contracts to reduce by (whole
            contracts only). Reduce-by may be provided via reduce_by or
            reduce_by_fp; if both provided they must match. Exactly one of
            reduce_by(/reduce_by_fp) or reduce_to(/reduce_to_fp) must be
            provided.
        reduce_to:
          type: integer
          minimum: 0
          description: >-
            Number of contracts to reduce to (whole contracts only). Reduce-to
            may be provided via reduce_to or reduce_to_fp; if both provided they
            must match. Exactly one of reduce_by(/reduce_by_fp) or
            reduce_to(/reduce_to_fp) must be provided.
        reduce_to_fp:
          $ref: '#/components/schemas/FixedPointCount'
          nullable: true
          description: >-
            String representation of the number of contracts to reduce to (whole
            contracts only). Reduce-to may be provided via reduce_to or
            reduce_to_fp; if both provided they must match. Exactly one of
            reduce_by(/reduce_by_fp) or reduce_to(/reduce_to_fp) must be
            provided.
    DecreaseOrderResponse:
      type: object
      required:
        - order
      properties:
        order:
          $ref: '#/components/schemas/Order'
    FixedPointCount:
      type: string
      description: >-
        Fixed-point contract count string (2 decimals, e.g., "10.00"; referred
        to as "fp" in field names). Requests accept 0–2 decimal places (e.g.,
        "10", "10.0", "10.00"); responses always emit 2 decimals. Currently only
        whole contract values are permitted, but the format supports future
        fractional precision. Integer contract count fields are legacy and will
        be deprecated; when both integer and fp fields are provided, they must
        match.
      example: '10.00'
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
        - fill_count_fp
        - remaining_count
        - remaining_count_fp
        - initial_count
        - initial_count_fp
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
        fill_count_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            String representation of the number of contracts that have been
            filled
        remaining_count:
          type: integer
        remaining_count_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: String representation of the remaining contracts for this order
        initial_count:
          type: integer
          description: The initial size of the order (contract units)
        initial_count_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            String representation of the initial size of the order (contract
            units)
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

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt