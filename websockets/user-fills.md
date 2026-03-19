---
url: https://docs.kalshi.com/websockets/user-fills
lastmod: 2026-03-11T19:30:26.131Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# User Fills

> Your order fill notifications. Requires authentication.

**Requirements:**
- Authentication required
- Market specification optional via `market_ticker`/`market_tickers` (omit to receive all your fills)
- Supports `update_subscription` with `add_markets` / `delete_markets`
- Updates sent immediately when your orders are filled

**Use case:** Tracking your trading activity




## AsyncAPI

````yaml asyncapi.yaml fill
id: fill
title: User Fills
description: >
  Your order fill notifications. Requires authentication.


  **Requirements:**

  - Authentication required

  - Market specification optional via `market_ticker`/`market_tickers` (omit to
  receive all your fills)

  - Supports `update_subscription` with `add_markets` / `delete_markets`

  - Updates sent immediately when your orders are filled


  **Use case:** Tracking your trading activity
servers:
  - id: production
    protocol: wss
    host: api.elections.kalshi.com
    bindings: []
    variables: []
address: fill
parameters: []
bindings: []
operations:
  - &ref_1
    id: receiveFill
    title: Fill Notification
    description: Receive notifications for your fills
    type: send
    messages:
      - &ref_2
        id: fill
        contentType: application/json
        payload:
          - name: Fill Update
            description: Private fill information for authenticated user
            type: object
            properties:
              - name: type
                type: string
                description: fill
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
                  - name: trade_id
                    type: string
                    description: >-
                      Unique identifier for fills. This is what you use to
                      differentiate fills
                    required: false
                  - name: order_id
                    type: string
                    description: >-
                      Unique identifier for orders. This is what you use to
                      differentiate fills for different orders
                    required: false
                  - name: market_ticker
                    type: string
                    description: Unique market identifier
                    required: false
                  - name: is_taker
                    type: boolean
                    description: If you were a taker on this fill
                    required: false
                  - name: side
                    type: string
                    description: Market side
                    enumValues:
                      - 'yes'
                      - 'no'
                    required: false
                  - name: yes_price_dollars
                    type: string
                    description: Price for the yes side of the fill in dollars
                    required: false
                  - name: count_fp
                    type: string
                    description: Fixed-point contracts filled (2 decimals)
                    required: false
                  - name: fee_cost
                    type: string
                    description: Exchange fee paid for this fill in fixed-point dollars
                    required: false
                  - name: action
                    type: string
                    description: Order action type
                    enumValues:
                      - buy
                      - sell
                    required: false
                  - name: ts
                    type: integer
                    description: Unix timestamp for when the update happened (in seconds)
                    required: false
                  - name: client_order_id
                    type: string
                    description: Optional client-provided order ID
                    required: false
                  - name: post_position_fp
                    type: string
                    description: Fixed-point position after the fill (2 decimals)
                    required: false
                  - name: purchased_side
                    type: string
                    description: Market side
                    enumValues:
                      - 'yes'
                      - 'no'
                    required: false
                  - name: subaccount
                    type: integer
                    description: Optional subaccount number for the fill
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
              const: fill
              x-parser-schema-id: <anonymous-schema-81>
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
                - trade_id
                - order_id
                - market_ticker
                - is_taker
                - side
                - yes_price_dollars
                - count_fp
                - fee_cost
                - action
                - ts
                - post_position_fp
                - purchased_side
              properties:
                trade_id:
                  type: string
                  description: >-
                    Unique identifier for fills. This is what you use to
                    differentiate fills
                  format: uuid
                  x-parser-schema-id: <anonymous-schema-83>
                order_id:
                  type: string
                  description: >-
                    Unique identifier for orders. This is what you use to
                    differentiate fills for different orders
                  format: uuid
                  x-parser-schema-id: <anonymous-schema-84>
                market_ticker:
                  type: string
                  description: Unique market identifier
                  pattern: ^[A-Z0-9-]+$
                  examples:
                    - FED-23DEC-T3.00
                    - HIGHNY-22DEC23-B53.5
                  x-parser-schema-id: marketTicker
                is_taker:
                  type: boolean
                  description: If you were a taker on this fill
                  x-parser-schema-id: <anonymous-schema-85>
                side: &ref_0
                  type: string
                  description: Market side
                  enum:
                    - 'yes'
                    - 'no'
                  x-parser-schema-id: marketSide
                yes_price_dollars:
                  type: string
                  description: Price for the yes side of the fill in dollars
                  x-parser-schema-id: <anonymous-schema-86>
                count_fp:
                  type: string
                  description: Fixed-point contracts filled (2 decimals)
                  x-parser-schema-id: <anonymous-schema-87>
                fee_cost:
                  type: string
                  description: Exchange fee paid for this fill in fixed-point dollars
                  x-parser-schema-id: <anonymous-schema-88>
                action:
                  type: string
                  description: Order action type
                  enum:
                    - buy
                    - sell
                  x-parser-schema-id: orderAction
                ts:
                  type: integer
                  description: Unix timestamp for when the update happened (in seconds)
                  format: int64
                  x-parser-schema-id: <anonymous-schema-89>
                client_order_id:
                  type: string
                  description: Optional client-provided order ID
                  x-parser-schema-id: <anonymous-schema-90>
                post_position_fp:
                  type: string
                  description: Fixed-point position after the fill (2 decimals)
                  x-parser-schema-id: <anonymous-schema-91>
                purchased_side: *ref_0
                subaccount:
                  type: integer
                  description: Optional subaccount number for the fill
                  x-parser-schema-id: <anonymous-schema-92>
              x-parser-schema-id: <anonymous-schema-82>
          x-parser-schema-id: fillPayload
        title: Fill Update
        description: Private fill information for authenticated user
        example: |-
          {
            "type": "fill",
            "sid": 13,
            "msg": {
              "trade_id": "d91bc706-ee49-470d-82d8-11418bda6fed",
              "order_id": "ee587a1c-8b87-4dcf-b721-9f6f790619fa",
              "market_ticker": "HIGHNY-22DEC23-B53.5",
              "is_taker": true,
              "side": "yes",
              "yes_price_dollars": "0.750",
              "count_fp": "278.00",
              "action": "buy",
              "ts": 1671899397,
              "post_position_fp": "500.00",
              "purchased_side": "yes",
              "subaccount": 3
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: fill
    bindings: []
    extensions:
      - id: x-parser-unique-object-id
        value: fill
sendOperations: []
receiveOperations:
  - *ref_1
sendMessages: []
receiveMessages:
  - *ref_2
extensions:
  - id: x-parser-unique-object-id
    value: fill
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