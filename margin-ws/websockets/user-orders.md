---
url: https://docs.kalshi.com/margin-ws/websockets/user-orders
lastmod: 2026-05-31T16:40:04.178Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# User Orders

> Private order created/updated notifications for the authenticated user on the margin exchange.

Requirements:
- authenticated connection
- market specification optional via `market_tickers`
- supports `update_subscription` with `add_markets` and `delete_markets`




## AsyncAPI

````yaml perps_asyncapi.yaml user_orders
id: user_orders
title: User Orders
description: >
  Private order created/updated notifications for the authenticated user on the
  margin exchange.


  Requirements:

  - authenticated connection

  - market specification optional via `market_tickers`

  - supports `update_subscription` with `add_markets` and `delete_markets`
servers:
  - id: production
    protocol: wss
    host: external-api-ws.kalshi.com
    bindings: []
    variables: []
  - id: demo
    protocol: wss
    host: external-api-ws.demo.kalshi.co
    bindings: []
    variables: []
address: user_orders
parameters: []
bindings: []
operations:
  - &ref_0
    id: receiveUserOrder
    title: User Order Update
    type: send
    messages:
      - &ref_1
        id: userOrder
        contentType: application/json
        payload:
          - name: User Order Update
            description: Private margin order create/update notifications
            type: object
            properties:
              - name: type
                type: string
                description: user_order
                required: true
              - name: sid
                type: integer
                description: Server-generated subscription identifier
                required: true
              - name: msg
                type: object
                required: true
                properties:
                  - name: order_id
                    type: string
                    required: true
                  - name: user_id
                    type: string
                    required: true
                  - name: client_order_id
                    type: string
                    required: true
                  - name: ticker
                    type: string
                    description: Unique market identifier
                    required: true
                  - name: side
                    type: string
                    enumValues:
                      - bid
                      - ask
                    required: true
                  - name: price
                    type: string
                    required: true
                  - name: fill_count
                    type: string
                    required: true
                  - name: remaining_count
                    type: string
                    required: true
                  - name: self_trade_prevention_type
                    type: string
                    description: Self-trade prevention type
                    enumValues:
                      - taker_at_cross
                      - maker
                    required: false
                  - name: order_group_id
                    type: string
                    description: >-
                      Order group identifier, if the order belongs to an order
                      group
                    required: false
                  - name: expiration_ts_ms
                    type: integer
                    description: Unix timestamp in milliseconds.
                    required: false
                  - name: created_ts_ms
                    type: integer
                    description: Unix timestamp in milliseconds.
                    required: true
                  - name: last_updated_ts_ms
                    type: integer
                    description: Unix timestamp in milliseconds.
                    required: false
                  - name: subaccount_number
                    type: integer
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
              x-parser-schema-id: <anonymous-schema-88>
            sid:
              type: integer
              minimum: 1
              description: Server-generated subscription identifier
              x-parser-schema-id: subscriptionId
            msg:
              type: object
              required:
                - order_id
                - user_id
                - client_order_id
                - ticker
                - side
                - price
                - fill_count
                - remaining_count
                - created_ts_ms
              properties:
                order_id:
                  type: string
                  format: uuid
                  x-parser-schema-id: <anonymous-schema-90>
                user_id:
                  type: string
                  format: uuid
                  x-parser-schema-id: <anonymous-schema-91>
                client_order_id:
                  type: string
                  x-parser-schema-id: <anonymous-schema-92>
                ticker:
                  type: string
                  description: Unique market identifier
                  x-parser-schema-id: marketTicker
                side:
                  type: string
                  enum:
                    - bid
                    - ask
                  x-parser-schema-id: bookSide
                price:
                  type: string
                  x-parser-schema-id: <anonymous-schema-93>
                fill_count:
                  type: string
                  x-parser-schema-id: <anonymous-schema-94>
                remaining_count:
                  type: string
                  x-parser-schema-id: <anonymous-schema-95>
                self_trade_prevention_type:
                  type: string
                  enum:
                    - taker_at_cross
                    - maker
                  description: Self-trade prevention type
                  x-parser-schema-id: selfTradePreventionType
                order_group_id:
                  type: string
                  description: >-
                    Order group identifier, if the order belongs to an order
                    group
                  x-parser-schema-id: <anonymous-schema-96>
                expiration_ts_ms:
                  type: integer
                  format: int64
                  description: Unix timestamp in milliseconds.
                  x-parser-schema-id: <anonymous-schema-97>
                created_ts_ms:
                  type: integer
                  format: int64
                  description: Unix timestamp in milliseconds.
                  x-parser-schema-id: <anonymous-schema-98>
                last_updated_ts_ms:
                  type: integer
                  format: int64
                  description: Unix timestamp in milliseconds.
                  x-parser-schema-id: <anonymous-schema-99>
                subaccount_number:
                  type: integer
                  x-parser-schema-id: <anonymous-schema-100>
              x-parser-schema-id: <anonymous-schema-89>
          x-parser-schema-id: marginUserOrderPayload
        title: User Order Update
        description: Private margin order create/update notifications
        example: |-
          {
            "type": "<string>",
            "sid": 123,
            "msg": {
              "order_id": "<string>",
              "user_id": "<string>",
              "client_order_id": "<string>",
              "ticker": "<string>",
              "side": "<string>",
              "price": "<string>",
              "fill_count": "<string>",
              "remaining_count": "<string>",
              "self_trade_prevention_type": "<string>",
              "order_group_id": "<string>",
              "expiration_ts_ms": 123,
              "created_ts_ms": 123,
              "last_updated_ts_ms": 123,
              "subaccount_number": 123
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
    description: API key authentication required for margin WebSocket connections.
    in: user
    extensions: []

````