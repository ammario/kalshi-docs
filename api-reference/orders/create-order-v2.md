---
url: https://docs.kalshi.com/api-reference/orders/create-order-v2
lastmod: 2026-04-27T23:34:08.733Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Create Order (V2)

> Endpoint for submitting event-market orders using the V2 request/response shape (single-book `bid`/`ask` side and fixed-point dollar prices). The legacy `/portfolio/orders` endpoint will be deprecated no earlier than May 6, 2026 — clients should migrate to this path.



## OpenAPI

````yaml /openapi.yaml post /portfolio/events/orders
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.14.0
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
  /portfolio/events/orders:
    post:
      tags:
        - orders
      summary: Create Order (V2)
      description: >-
        Endpoint for submitting event-market orders using the V2
        request/response shape (single-book `bid`/`ask` side and fixed-point
        dollar prices). The legacy `/portfolio/orders` endpoint will be
        deprecated no earlier than May 6, 2026 — clients should migrate to this
        path.
      operationId: CreateOrderV2
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateOrderV2Request'
      responses:
        '201':
          description: Order created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateOrderV2Response'
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
    CreateOrderV2Request:
      type: object
      required:
        - ticker
        - client_order_id
        - side
        - count
        - price
        - time_in_force
        - self_trade_prevention_type
      properties:
        ticker:
          type: string
          x-oapi-codegen-extra-tags:
            validate: required,min=1
        client_order_id:
          type: string
          x-go-type-skip-optional-pointer: true
        side:
          $ref: '#/components/schemas/BookSide'
          x-oapi-codegen-extra-tags:
            validate: required,oneof=bid ask
        count:
          $ref: '#/components/schemas/FixedPointCount'
          description: String representation of the order quantity in contracts.
        price:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Price for the order in fixed-point dollars.
          x-go-type-skip-optional-pointer: true
        expiration_time:
          type: integer
          format: int64
        time_in_force:
          type: string
          enum:
            - fill_or_kill
            - good_till_canceled
            - immediate_or_cancel
          x-oapi-codegen-extra-tags:
            validate: required,oneof=fill_or_kill good_till_canceled immediate_or_cancel
          x-go-type-skip-optional-pointer: true
        post_only:
          type: boolean
        self_trade_prevention_type:
          allOf:
            - $ref: '#/components/schemas/SelfTradePreventionType'
          x-oapi-codegen-extra-tags:
            validate: required,oneof=taker_at_cross maker
          x-go-type-skip-optional-pointer: true
        cancel_order_on_pause:
          type: boolean
          description: >-
            If this flag is set to true, the order will be canceled if the order
            is open and trading on the exchange is paused for any reason.
        reduce_only:
          type: boolean
          description: >-
            Specifies whether the order place count should be capped by the
            member's current position.
        subaccount:
          type: integer
          minimum: 0
          default: 0
          description: >-
            The subaccount number to use for this order. 0 is the primary
            subaccount.
          x-go-type-skip-optional-pointer: true
        order_group_id:
          type: string
          description: The order group this order is part of
          x-go-type-skip-optional-pointer: true
    CreateOrderV2Response:
      type: object
      required:
        - order_id
        - fill_count
        - remaining_count
      properties:
        order_id:
          type: string
        client_order_id:
          type: string
        fill_count:
          $ref: '#/components/schemas/FixedPointCount'
          description: Number of contracts filled immediately upon placement.
        remaining_count:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            Number of contracts remaining after placement. For IOC orders, this
            reflects the final state after unfilled contracts are canceled.
        average_fill_price:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Volume-weighted average fill price. Only present when fill_count >
            0.
    BookSide:
      type: string
      enum:
        - bid
        - ask
      description: >-
        Side of the book for an order or trade. For event markets, this refers
        to the YES leg only: `bid` means buy YES, `ask` means sell YES. (Selling
        YES is economically equivalent to buying NO at `1 - price`, but this
        endpoint quotes everything from the YES side.)
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
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with up to 6 decimal
        places of precision. This is the maximum supported precision; valid
        quote intervals for a given market are constrained by that market's
        price level structure.
      example: '0.5600'
    SelfTradePreventionType:
      type: string
      enum:
        - taker_at_cross
        - maker
      description: The self-trade prevention type for orders
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
    RateLimitError:
      description: >-
        Rate limit exceeded. The default cost is 10 tokens per request;
        endpoints that deviate show a **Rate limit** callout at the top of their
        own page. See [Rate Limits and Tiers](/getting_started/rate_limits).
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