---
url: https://docs.kalshi.com/websockets/user-orders
lastmod: 2026-03-11T19:30:26.215Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# User Orders

> Real-time order created and updated notifications. Requires authentication.

**Requirements:**
- Authentication required
- Market specification optional via `market_tickers` (omit to receive all orders)
- Supports `update_subscription` with `add_markets` / `delete_markets` actions
- Updates sent when your orders are created, filled, canceled, or otherwise updated

**Use case:** Tracking your resting orders, fills, and cancellations in real time




## AsyncAPI

````yaml asyncapi.yaml user_orders
id: user_orders
title: User Orders
description: >
  Real-time order created and updated notifications. Requires authentication.


  **Requirements:**

  - Authentication required

  - Market specification optional via `market_tickers` (omit to receive all
  orders)

  - Supports `update_subscription` with `add_markets` / `delete_markets` actions

  - Updates sent when your orders are created, filled, canceled, or otherwise
  updated


  **Use case:** Tracking your resting orders, fills, and cancellations in real
  time
servers:
  - id: production
    protocol: wss
    host: api.elections.kalshi.com
    bindings: []
    variables: []
address: user_orders
parameters: []
bindings: []
operations:
  - &ref_0
    id: receiveUserOrder
    title: User Order Update
    description: Receive notifications for your order creates and updates
    type: send
    messages:
      - &ref_1
        id: userOrder
        contentType: application/json
        payload:
          - name: User Order Update
            description: Real-time order updates for authenticated user
            type: object
            properties:
              - name: type
                type: string
                description: user_order
                required: true
              - name: sid
                type: integer
                description: >-
                  Server-generated subscription identifier (sid) used to
                  identify the channel
                required: true
              - name: msg
                type: object
                required: true
                properties:
                  - name: order_id
                    type: string
                    description: Unique order identifier
                    required: false
                  - name: user_id
                    type: string
                    description: User identifier
                    required: false
                  - name: ticker
                    type: string
                    description: Unique market identifier
                    required: false
                  - name: status
                    type: string
                    description: Current order status
                    enumValues:
                      - resting
                      - canceled
                      - executed
                    required: false
                  - name: side
                    type: string
                    description: Market side
                    enumValues:
                      - 'yes'
                      - 'no'
                    required: false
                  - name: is_yes
                    type: boolean
                    description: >-
                      Whether the order is on the yes side. Equivalent to side
                      == "yes"
                    required: false
                  - name: yes_price_dollars
                    type: string
                    description: Yes price in fixed-point dollars (4 decimals)
                    required: false
                  - name: fill_count_fp
                    type: string
                    description: Number of contracts filled in fixed-point (2 decimals)
                    required: false
                  - name: remaining_count_fp
                    type: string
                    description: Number of contracts remaining in fixed-point (2 decimals)
                    required: false
                  - name: initial_count_fp
                    type: string
                    description: Initial number of contracts in fixed-point (2 decimals)
                    required: false
                  - name: taker_fill_cost_dollars
                    type: string
                    description: Taker fill cost in fixed-point dollars (4 decimals)
                    required: false
                  - name: maker_fill_cost_dollars
                    type: string
                    description: Maker fill cost in fixed-point dollars (4 decimals)
                    required: false
                  - name: taker_fees_dollars
                    type: string
                    description: Taker fees in fixed-point dollars (4 decimals).
                    required: false
                  - name: maker_fees_dollars
                    type: string
                    description: Maker fees in fixed-point dollars (4 decimals).
                    required: false
                  - name: client_order_id
                    type: string
                    description: Client-provided order identifier
                    required: false
                  - name: order_group_id
                    type: string
                    description: Order group identifier, if applicable
                    required: false
                  - name: self_trade_prevention_type
                    type: string
                    description: Self-trade prevention type
                    enumValues:
                      - taker_at_cross
                      - maker
                    required: false
                  - name: created_time
                    type: string
                    description: Order creation time in RFC 3339 format
                    required: false
                  - name: last_update_time
                    type: string
                    description: Last update time in RFC 3339 format
                    required: false
                  - name: expiration_time
                    type: string
                    description: Order expiration time in RFC 3339 format
                    required: false
                  - name: subaccount_number
                    type: integer
                    description: Subaccount number (0 for primary, 1-32 for subaccounts)
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          required:
            - type
            - sid
            - msg
          properties:
            type:
              type: string
              const: user_order
              x-parser-schema-id: <anonymous-schema-231>
            sid:
              type: integer
              description: >-
                Server-generated subscription identifier (sid) used to identify
                the channel
              minimum: 1
              x-parser-schema-id: subscriptionId
            msg:
              type: object
              required:
                - order_id
                - user_id
                - ticker
                - status
                - side
                - is_yes
                - yes_price_dollars
                - fill_count_fp
                - remaining_count_fp
                - initial_count_fp
                - taker_fill_cost_dollars
                - maker_fill_cost_dollars
                - taker_fees_dollars
                - maker_fees_dollars
                - client_order_id
                - created_time
              properties:
                order_id:
                  type: string
                  description: Unique order identifier
                  format: uuid
                  x-parser-schema-id: <anonymous-schema-233>
                user_id:
                  type: string
                  description: User identifier
                  format: uuid
                  x-parser-schema-id: <anonymous-schema-234>
                ticker:
                  type: string
                  description: Unique market identifier
                  pattern: ^[A-Z0-9-]+$
                  examples:
                    - FED-23DEC-T3.00
                    - HIGHNY-22DEC23-B53.5
                  x-parser-schema-id: marketTicker
                status:
                  type: string
                  description: Current order status
                  enum:
                    - resting
                    - canceled
                    - executed
                  x-parser-schema-id: <anonymous-schema-235>
                side:
                  type: string
                  description: Market side
                  enum:
                    - 'yes'
                    - 'no'
                  x-parser-schema-id: marketSide
                is_yes:
                  type: boolean
                  description: >-
                    Whether the order is on the yes side. Equivalent to side ==
                    "yes"
                  x-parser-schema-id: <anonymous-schema-236>
                yes_price_dollars:
                  type: string
                  description: Yes price in fixed-point dollars (4 decimals)
                  x-parser-schema-id: <anonymous-schema-237>
                fill_count_fp:
                  type: string
                  description: Number of contracts filled in fixed-point (2 decimals)
                  x-parser-schema-id: <anonymous-schema-238>
                remaining_count_fp:
                  type: string
                  description: Number of contracts remaining in fixed-point (2 decimals)
                  x-parser-schema-id: <anonymous-schema-239>
                initial_count_fp:
                  type: string
                  description: Initial number of contracts in fixed-point (2 decimals)
                  x-parser-schema-id: <anonymous-schema-240>
                taker_fill_cost_dollars:
                  type: string
                  description: Taker fill cost in fixed-point dollars (4 decimals)
                  x-parser-schema-id: <anonymous-schema-241>
                maker_fill_cost_dollars:
                  type: string
                  description: Maker fill cost in fixed-point dollars (4 decimals)
                  x-parser-schema-id: <anonymous-schema-242>
                taker_fees_dollars:
                  type: string
                  description: Taker fees in fixed-point dollars (4 decimals).
                  x-parser-schema-id: <anonymous-schema-243>
                maker_fees_dollars:
                  type: string
                  description: Maker fees in fixed-point dollars (4 decimals).
                  x-parser-schema-id: <anonymous-schema-244>
                client_order_id:
                  type: string
                  description: Client-provided order identifier
                  x-parser-schema-id: <anonymous-schema-245>
                order_group_id:
                  type: string
                  description: Order group identifier, if applicable
                  x-parser-schema-id: <anonymous-schema-246>
                self_trade_prevention_type:
                  type: string
                  description: Self-trade prevention type
                  enum:
                    - taker_at_cross
                    - maker
                  x-parser-schema-id: <anonymous-schema-247>
                created_time:
                  type: string
                  description: Order creation time in RFC 3339 format
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-248>
                last_update_time:
                  type: string
                  description: Last update time in RFC 3339 format
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-249>
                expiration_time:
                  type: string
                  description: Order expiration time in RFC 3339 format
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-250>
                subaccount_number:
                  type: integer
                  description: Subaccount number (0 for primary, 1-32 for subaccounts)
                  x-parser-schema-id: <anonymous-schema-251>
              x-parser-schema-id: <anonymous-schema-232>
          x-parser-schema-id: userOrderPayload
        title: User Order Update
        description: Real-time order updates for authenticated user
        example: |-
          {
            "type": "user_order",
            "sid": 22,
            "msg": {
              "order_id": "ee587a1c-8b87-4dcf-b721-9f6f790619fa",
              "user_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
              "ticker": "FED-23DEC-T3.00",
              "status": "resting",
              "side": "yes",
              "is_yes": true,
              "yes_price_dollars": "0.3500",
              "fill_count_fp": "0.00",
              "remaining_count_fp": "10.00",
              "initial_count_fp": "10.00",
              "taker_fill_cost_dollars": "0.0000",
              "maker_fill_cost_dollars": "0.0000",
              "client_order_id": "my-order-1",
              "order_group_id": "og_123",
              "self_trade_prevention_type": "taker_at_cross",
              "created_time": "2024-12-01T10:00:00Z",
              "expiration_time": "2024-12-01T11:00:00Z",
              "subaccount_number": 0
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: userOrder
    bindings: []
    extensions:
      - id: x-parser-unique-object-id
        value: user_orders
sendOperations: []
receiveOperations:
  - *ref_0
sendMessages: []
receiveMessages:
  - *ref_1
extensions:
  - id: x-parser-unique-object-id
    value: user_orders
securitySchemes:
  - id: apiKey
    name: apiKey
    type: apiKey
    description: |
      API key authentication required for WebSocket connections.
      The API key should be provided during the WebSocket handshake.
    in: user
    extensions: []

````

Built with [Mintlify](https://mintlify.com).