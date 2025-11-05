---
url: https://docs.kalshi.com/api-reference/fcm/get-fcm-orders
lastmod: 2025-11-04T20:59:58.348Z
---
# Get FCM Orders

> Endpoint for FCM members to get orders filtered by subtrader ID.
This endpoint requires FCM member access level and allows filtering orders by subtrader ID.


## OpenAPI

````yaml openapi.yaml get /fcm/orders
paths:
  path: /fcm/orders
  method: get
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
      query:
        ticker:
          schema:
            - type: string
              description: Restricts the response to orders in a single market
        event_ticker:
          schema:
            - type: string
              description: >-
                Restricts the response to orders in a single event. Multiple
                event tickers can be provided as a comma-separated list (maximum
                10).
        min_ts:
          schema:
            - type: integer
              description: >-
                Restricts the response to orders after a timestamp, formatted as
                a Unix Timestamp
        max_ts:
          schema:
            - type: integer
              description: >-
                Restricts the response to orders before a timestamp, formatted
                as a Unix Timestamp
        status:
          schema:
            - type: enum<string>
              enum:
                - resting
                - canceled
                - executed
              description: Restricts the response to orders that have a certain status
        limit:
          schema:
            - type: integer
              description: >-
                Parameter to specify the number of results per page. Defaults to
                100
              maximum: 1000
              minimum: 1
        cursor:
          schema:
            - type: string
              description: >-
                The Cursor represents a pointer to the next page of records in
                the pagination
        subtrader_id:
          schema:
            - type: string
              required: true
              description: >-
                Restricts the response to orders for a specific subtrader (FCM
                members only)
      header: {}
      cookie: {}
    body: {}
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
                      $ref: '#/components/schemas/Order'
              cursor:
                allOf:
                  - type: string
            refIdentifier: '#/components/schemas/GetOrdersResponse'
            requiredProperties:
              - orders
              - cursor
        examples:
          example:
            value:
              orders:
                - order_id: <string>
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
              cursor: <string>
        description: Orders retrieved successfully
    '400':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Bad request
        examples: {}
        description: Bad request
    '401':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Unauthorized
        examples: {}
        description: Unauthorized
    '404':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Not found
        examples: {}
        description: Not found
    '500':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Internal server error
        examples: {}
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

````