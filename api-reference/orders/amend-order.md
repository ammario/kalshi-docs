---
url: https://docs.kalshi.com/api-reference/orders/amend-order
lastmod: 2025-11-20T17:55:01.021Z
---
# Amend Order

>  Endpoint for amending the max number of fillable contracts and/or price in an existing order. Max fillable contracts is `remaining_count` + `fill_count`.

## OpenAPI

````yaml openapi.yaml post /portfolio/orders/{order_id}/amend
paths:
  path: /portfolio/orders/{order_id}/amend
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
      path:
        order_id:
          schema:
            - type: string
              required: true
              description: Order ID
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
                    description: Market ticker
              side:
                allOf:
                  - type: string
                    enum:
                      - 'yes'
                      - 'no'
                    description: Side of the order
              action:
                allOf:
                  - type: string
                    enum:
                      - buy
                      - sell
                    description: Action of the order
              client_order_id:
                allOf:
                  - type: string
                    description: The original client-specified order ID to be amended
              updated_client_order_id:
                allOf:
                  - type: string
                    description: The new client-specified order ID after amendment
              yes_price:
                allOf:
                  - type: integer
                    minimum: 1
                    maximum: 99
                    description: Updated yes price for the order in cents
              no_price:
                allOf:
                  - type: integer
                    minimum: 1
                    maximum: 99
                    description: Updated no price for the order in cents
              yes_price_dollars:
                allOf:
                  - type: string
                    description: >-
                      Updated yes price for the order in fixed-point dollars.
                      Exactly one of yes_price, no_price, yes_price_dollars, and
                      no_price_dollars must be passed.
              no_price_dollars:
                allOf:
                  - type: string
                    description: >-
                      Updated no price for the order in fixed-point dollars.
                      Exactly one of yes_price, no_price, yes_price_dollars, and
                      no_price_dollars must be passed.
              count:
                allOf:
                  - type: integer
                    minimum: 1
                    description: Updated quantity for the order
            required: true
            refIdentifier: '#/components/schemas/AmendOrderRequest'
            requiredProperties:
              - ticker
              - side
              - action
              - client_order_id
              - updated_client_order_id
        examples:
          example:
            value:
              ticker: <string>
              side: 'yes'
              action: buy
              client_order_id: <string>
              updated_client_order_id: <string>
              yes_price: 50
              no_price: 50
              yes_price_dollars: <string>
              no_price_dollars: <string>
              count: 2
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              old_order:
                allOf:
                  - $ref: '#/components/schemas/Order'
                    description: The order before amendment
              order:
                allOf:
                  - $ref: '#/components/schemas/Order'
                    description: The order after amendment
            refIdentifier: '#/components/schemas/AmendOrderResponse'
            requiredProperties:
              - old_order
              - order
        examples:
          example:
            value:
              old_order:
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
        description: Order amended successfully
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
    '404':
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
        description: Resource not found
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