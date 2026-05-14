---
url: https://docs.kalshi.com/api-reference/orders/batch-create-orders-v2
lastmod: 2026-05-13T16:12:53.870Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Batch Create Orders (V2)

> Endpoint for submitting a batch of event-market orders using the V2 request/response shape. The maximum batch size scales with your tier's write budget — see [Rate Limits and Tiers](/getting_started/rate_limits).

<Note>
  **Rate limit:** 10 tokens per order in the batch — billed per item, so total cost for a batch of N orders is N × 10. Other endpoints cost 10 tokens per request (not per item) unless noted on their own page. See [Rate Limits and Tiers](/getting_started/rate_limits).
</Note>


## OpenAPI

````yaml /openapi.yaml post /portfolio/events/orders/batched
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.18.0
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
  /portfolio/events/orders/batched:
    post:
      tags:
        - orders
      summary: Batch Create Orders (V2)
      description: >-
        Endpoint for submitting a batch of event-market orders using the V2
        request/response shape. The maximum batch size scales with your tier's
        write budget — see [Rate Limits and
        Tiers](/getting_started/rate_limits).
      operationId: BatchCreateOrdersV2
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/BatchCreateOrdersV2Request'
      responses:
        '201':
          description: Batch order creation completed
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BatchCreateOrdersV2Response'
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
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    BatchCreateOrdersV2Request:
      type: object
      required:
        - orders
      properties:
        orders:
          type: array
          x-oapi-codegen-extra-tags:
            validate: required,dive
          items:
            $ref: '#/components/schemas/CreateOrderV2Request'
    BatchCreateOrdersV2Response:
      type: object
      required:
        - orders
      properties:
        orders:
          type: array
          items:
            type: object
            properties:
              order_id:
                type: string
              client_order_id:
                type: string
                nullable: true
              fill_count:
                $ref: '#/components/schemas/FixedPointCount'
                nullable: true
                x-omitempty: false
                description: Number of contracts filled immediately upon placement.
              remaining_count:
                $ref: '#/components/schemas/FixedPointCount'
                nullable: true
                x-omitempty: false
                description: Number of contracts remaining after placement.
              average_fill_price:
                $ref: '#/components/schemas/FixedPointDollars'
                nullable: true
                x-omitempty: false
                description: >-
                  Volume-weighted average fill price. Only present when
                  fill_count > 0.
              average_fee_paid:
                $ref: '#/components/schemas/FixedPointDollars'
                nullable: true
                x-omitempty: false
                description: >-
                  Volume-weighted average fee paid per contract. Only present
                  when fill_count > 0.
              ts_ms:
                type: integer
                format: int64
                nullable: true
                x-omitempty: false
                description: >-
                  Matching engine timestamp at which the order was processed, as
                  Unix epoch milliseconds. Absent when the request errored.
              error:
                allOf:
                  - $ref: '#/components/schemas/ErrorResponse'
                nullable: true
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
          description: >
            Optional Unix timestamp in seconds for when the order expires. To
            place

            an expiring order, set `time_in_force` to `good_till_canceled` and

            provide this `expiration_time`. `GTT` is an internal execution type
            and

            is not a valid API value for `time_in_force`. The

            `immediate_or_cancel` time-in-force value cannot be combined with

            `expiration_time`.
        time_in_force:
          type: string
          description: >
            Specifies how long the order remains active. Use
            `good_till_canceled`

            with `expiration_time` for an order that should rest until a
            specific

            expiration time; without `expiration_time`, `good_till_canceled` is
            a

            true good-till-canceled order. `GTT` is not a valid API value.
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
        exchange_index:
          allOf:
            - $ref: '#/components/schemas/ExchangeIndex'
          default: 0
          x-go-type-skip-optional-pointer: true
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
      description: >-
        Side of the book for an order or trade. For event markets, this refers
        to the YES leg only: `bid` means buy YES, `ask` means sell YES. (Selling
        YES is economically equivalent to buying NO at `1 - price`, but this
        endpoint quotes everything from the YES side.)
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
    ExchangeIndex:
      type: integer
      description: 'Defaults to 0. Note: currently only 0 supported.'
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