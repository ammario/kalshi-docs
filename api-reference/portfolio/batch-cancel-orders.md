---
url: https://docs.kalshi.com/api-reference/portfolio/batch-cancel-orders
lastmod: 2025-11-04T20:59:58.455Z
---
# Batch Cancel Orders

>  Endpoint for cancelling up to 20 orders at once. Available to members with advanced access only.

## OpenAPI

````yaml openapi.yaml delete /portfolio/orders/batched
paths:
  path: /portfolio/orders/batched
  method: delete
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
              ids:
                allOf:
                  - type: array
                    items:
                      type: string
                    description: An array of order IDs to cancel
            required: true
            refIdentifier: '#/components/schemas/BatchCancelOrdersRequest'
            requiredProperties:
              - ids
        examples:
          example:
            value:
              ids:
                - <string>
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              orders:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/BatchCancelOrdersIndividualResponse'
            refIdentifier: '#/components/schemas/BatchCancelOrdersResponse'
            requiredProperties:
              - orders
        examples:
          example:
            value:
              orders:
                - order_id: <string>
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
                    order_group_id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                    cancel_order_on_pause: true
                  reduced_by: 123
                  error:
                    code: <string>
                    message: <string>
                    details: <string>
                    service: <string>
        description: Batch order cancellation completed
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
    '403':
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
        description: Forbidden - insufficient permissions
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
    ErrorResponse:
      type: object
      properties:
        code: *ref_0
        message: *ref_1
        details: *ref_2
        service: *ref_3
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
          type: number
        no_price:
          type: number
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
          format: uuid
          nullable: true
          description: The order group this order is part of
        cancel_order_on_pause:
          type: boolean
          description: >-
            If this flag is set to true, the order will be canceled if the order
            is open and trading on the exchange is paused for any reason.
    BatchCancelOrdersIndividualResponse:
      type: object
      required:
        - order_id
        - reduced_by
      properties:
        order_id:
          type: string
          description: >-
            The order ID to identify which order had an error during batch
            cancellation
        order:
          allOf:
            - $ref: '#/components/schemas/Order'
          nullable: true
        reduced_by:
          type: integer
          description: >-
            The number of contracts that were successfully canceled from this
            order
        error:
          allOf:
            - $ref: '#/components/schemas/ErrorResponse'
          nullable: true

````