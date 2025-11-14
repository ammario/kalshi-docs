---
url: https://docs.kalshi.com/api-reference/portfolio/create-order
lastmod: 2025-11-14T01:04:15.699Z
---
# Create Order

>  Endpoint for submitting orders in a market.

## OpenAPI

````yaml openapi.yaml post /portfolio/orders
paths:
  path: /portfolio/orders
  method: post
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security:
      - title: kalshiAccessKey & kalshiAccessSignature & kalshiAccessTimestamp
        parameters:
          query: {}
          header:
            KALSHI-ACCESS-KEY:
              type: apiKey
              description: Your API key ID
            KALSHI-ACCESS-SIGNATURE:
              type: apiKey
              description: RSA-PSS signature of the request
            KALSHI-ACCESS-TIMESTAMP:
              type: apiKey
              description: Request timestamp in milliseconds
          cookie: {}
    parameters:
      path: {}
      query: {}
      header: {}
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              ticker:
                allOf:
                  - type: string
                    x-oapi-codegen-extra-tags:
                      validate: required,min=1
              client_order_id:
                allOf:
                  - type: string
                    x-go-type-skip-optional-pointer: true
              side:
                allOf:
                  - type: string
                    enum:
                      - 'yes'
                      - 'no'
                    x-oapi-codegen-extra-tags:
                      validate: required,oneof=yes no
              action:
                allOf:
                  - type: string
                    enum:
                      - buy
                      - sell
                    x-oapi-codegen-extra-tags:
                      validate: required,oneof=buy sell
              count:
                allOf:
                  - type: integer
                    minimum: 1
                    x-oapi-codegen-extra-tags:
                      validate: required,gte=1
              type:
                allOf:
                  - type: string
                    enum:
                      - limit
                      - market
                    default: limit
                    x-oapi-codegen-extra-tags:
                      validate: omitempty,oneof=limit market
              yes_price:
                allOf:
                  - type: integer
                    minimum: 1
                    maximum: 99
                    x-go-type-skip-optional-pointer: true
              no_price:
                allOf:
                  - type: integer
                    minimum: 1
                    maximum: 99
                    x-go-type-skip-optional-pointer: true
              yes_price_dollars:
                allOf:
                  - type: string
                    description: Submitting price of the Yes side in fixed-point dollars
                    example: '0.5000'
              no_price_dollars:
                allOf:
                  - type: string
                    description: Submitting price of the No side in fixed-point dollars
                    example: '0.5000'
              expiration_ts:
                allOf:
                  - type: integer
                    format: int64
              time_in_force:
                allOf:
                  - type: string
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
                allOf:
                  - type: integer
                    description: >-
                      Maximum cost in cents. When specified, the order will
                      automatically have Fill-or-Kill (FoK) behavior.
              post_only:
                allOf:
                  - type: boolean
              reduce_only:
                allOf:
                  - type: boolean
              sell_position_floor:
                allOf:
                  - type: integer
                    description: >-
                      Deprecated: Use reduce_only instead. Only accepts value of
                      0.
              self_trade_prevention_type:
                allOf:
                  - type: string
                    enum:
                      - taker_at_cross
                      - maker
                    description: The self-trade prevention type for this order
                    x-oapi-codegen-extra-tags:
                      validate: omitempty,oneof=taker_at_cross maker
                    x-go-type-skip-optional-pointer: true
              order_group_id:
                allOf:
                  - type: string
                    description: The order group this order is part of
                    x-go-type-skip-optional-pointer: true
              cancel_order_on_pause:
                allOf:
                  - type: boolean
                    description: >-
                      If this flag is set to true, the order will be canceled if
                      the order is open and trading on the exchange is paused
                      for any reason.
            required: true
            refIdentifier: '#/components/schemas/CreateOrderRequest'
            requiredProperties:
              - ticker
              - side
              - action
              - count
        examples:
          example:
            value:
              ticker: <string>
              client_order_id: <string>
              side: 'yes'
              action: buy
              count: 2
              type: limit
              yes_price: 50
              no_price: 50
              yes_price_dollars: '0.5000'
              no_price_dollars: '0.5000'
              expiration_ts: 123
              time_in_force: fill_or_kill
              buy_max_cost: 123
              post_only: true
              reduce_only: true
              sell_position_floor: 123
              self_trade_prevention_type: taker_at_cross
              order_group_id: <string>
              cancel_order_on_pause: true
  response:
    '201':
      application/json:
        schemaArray:
          - type: object
            properties:
              order:
                allOf:
                  - $ref: '#/components/schemas/Order'
            refIdentifier: '#/components/schemas/CreateOrderResponse'
            requiredProperties:
              - order
        examples:
          example:
            value:
              order:
                order_id: <string>
                user_id: <string>
                client_order_id: <string>
                ticker: <string>
                side: 'yes'
                action: buy
                type: limit
                status: resting
                yes_price: 123
                no_price: 123
                yes_price_dollars: '0.5000'
                no_price_dollars: '0.5000'
                fill_count: 123
                remaining_count: 123
                initial_count: 123
                taker_fees: 123
                maker_fees: 123
                taker_fill_cost: 123
                maker_fill_cost: 123
                taker_fill_cost_dollars: <string>
                maker_fill_cost_dollars: <string>
                queue_position: 123
                taker_fees_dollars: <string>
                maker_fees_dollars: <string>
                expiration_time: '2023-11-07T05:31:56Z'
                created_time: '2023-11-07T05:31:56Z'
                last_update_time: '2023-11-07T05:31:56Z'
                self_trade_prevention_type: taker_at_cross
                order_group_id: <string>
                cancel_order_on_pause: true
        description: Order created successfully
    '400':
      application/json:
        schemaArray:
          - type: object
            properties:
              code:
                allOf:
                  - &ref_0
                    type: string
                    description: Error code
              message:
                allOf:
                  - &ref_1
                    type: string
                    description: Human-readable error message
              details:
                allOf:
                  - &ref_2
                    type: string
                    description: Additional details about the error, if available
              service:
                allOf:
                  - &ref_3
                    type: string
                    description: The name of the service that generated the error
            refIdentifier: '#/components/schemas/ErrorResponse'
        examples:
          example:
            value:
              code: <string>
              message: <string>
              details: <string>
              service: <string>
        description: Bad request - invalid input
    '401':
      application/json:
        schemaArray:
          - type: object
            properties:
              code:
                allOf:
                  - *ref_0
              message:
                allOf:
                  - *ref_1
              details:
                allOf:
                  - *ref_2
              service:
                allOf:
                  - *ref_3
            refIdentifier: '#/components/schemas/ErrorResponse'
        examples:
          example:
            value:
              code: <string>
              message: <string>
              details: <string>
              service: <string>
        description: Unauthorized - authentication required
    '409':
      application/json:
        schemaArray:
          - type: object
            properties:
              code:
                allOf:
                  - *ref_0
              message:
                allOf:
                  - *ref_1
              details:
                allOf:
                  - *ref_2
              service:
                allOf:
                  - *ref_3
            refIdentifier: '#/components/schemas/ErrorResponse'
        examples:
          example:
            value:
              code: <string>
              message: <string>
              details: <string>
              service: <string>
        description: Conflict - resource already exists or cannot be modified
    '429':
      application/json:
        schemaArray:
          - type: object
            properties:
              code:
                allOf:
                  - *ref_0
              message:
                allOf:
                  - *ref_1
              details:
                allOf:
                  - *ref_2
              service:
                allOf:
                  - *ref_3
            refIdentifier: '#/components/schemas/ErrorResponse'
        examples:
          example:
            value:
              code: <string>
              message: <string>
              details: <string>
              service: <string>
        description: Rate limit exceeded
    '500':
      application/json:
        schemaArray:
          - type: object
            properties:
              code:
                allOf:
                  - *ref_0
              message:
                allOf:
                  - *ref_1
              details:
                allOf:
                  - *ref_2
              service:
                allOf:
                  - *ref_3
            refIdentifier: '#/components/schemas/ErrorResponse'
        examples:
          example:
            value:
              code: <string>
              message: <string>
              details: <string>
              service: <string>
        description: Internal server error
  deprecated: false
  type: path
components:
  schemas:
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
          type: string
          enum:
            - resting
            - canceled
            - executed
            - pending
        yes_price:
          type: integer
        no_price:
          type: integer
        yes_price_dollars:
          type: string
          description: The yes price for this order in fixed-point dollars
          example: '0.5000'
        no_price_dollars:
          type: string
          description: The no price for this order in fixed-point dollars
          example: '0.5000'
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
          type: string
          description: The cost of filled taker orders in dollars
        maker_fill_cost_dollars:
          type: string
          description: The cost of filled maker orders in dollars
        queue_position:
          type: integer
          description: >-
            **DEPRECATED**: This field is deprecated and will always return 0.
            Please use the GET /portfolio/orders/{order_id}/queue_position
            endpoint instead
        taker_fees_dollars:
          type: string
          nullable: true
          description: Fees paid on filled taker contracts, in dollars
        maker_fees_dollars:
          type: string
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
          type: string
          enum:
            - taker_at_cross
            - maker
          nullable: true
          x-omitempty: false
          description: The self-trade prevention type for this order
        order_group_id:
          type: string
          nullable: true
          description: The order group this order is part of
        cancel_order_on_pause:
          type: boolean
          description: >-
            If this flag is set to true, the order will be canceled if the order
            is open and trading on the exchange is paused for any reason.

````