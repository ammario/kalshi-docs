---
url: https://docs.kalshi.com/margin-ws/websockets/user-fills
lastmod: 2026-05-31T16:40:04.104Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# User Fills

> Private fill notifications for the authenticated user on the margin exchange.

Requirements:
- authenticated connection
- market specification optional via `market_ticker` or `market_tickers`
- supports `update_subscription` with `add_markets` and `delete_markets`




## AsyncAPI

````yaml perps_asyncapi.yaml fill
id: fill
title: User Fills
description: |
  Private fill notifications for the authenticated user on the margin exchange.

  Requirements:
  - authenticated connection
  - market specification optional via `market_ticker` or `market_tickers`
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
address: fill
parameters: []
bindings: []
operations:
  - &ref_0
    id: receiveFill
    title: Fill Notification
    type: send
    messages:
      - &ref_1
        id: fill
        contentType: application/json
        payload:
          - name: Fill Update
            description: Private margin fill information for the authenticated user
            type: object
            properties:
              - name: type
                type: string
                description: fill
                required: true
              - name: sid
                type: integer
                description: Server-generated subscription identifier
                required: true
              - name: msg
                type: object
                required: true
                properties:
                  - name: trade_id
                    type: string
                    required: true
                  - name: order_id
                    type: string
                    required: true
                  - name: client_order_id
                    type: string
                    required: false
                  - name: market_ticker
                    type: string
                    description: Unique market identifier
                    required: true
                  - name: is_taker
                    type: boolean
                    required: true
                  - name: side
                    type: string
                    enumValues:
                      - bid
                      - ask
                    required: true
                  - name: ts_ms
                    type: integer
                    description: Unix timestamp in milliseconds.
                    required: true
                  - name: price
                    type: string
                    required: true
                  - name: count
                    type: string
                    required: true
                  - name: fee_cost
                    type: string
                    required: true
                  - name: post_position
                    type: string
                    required: true
                  - name: subaccount
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
              const: fill
              x-parser-schema-id: <anonymous-schema-76>
            sid:
              type: integer
              minimum: 1
              description: Server-generated subscription identifier
              x-parser-schema-id: subscriptionId
            msg:
              type: object
              required:
                - trade_id
                - order_id
                - market_ticker
                - is_taker
                - side
                - ts_ms
                - price
                - count
                - fee_cost
                - post_position
              properties:
                trade_id:
                  type: string
                  format: uuid
                  x-parser-schema-id: <anonymous-schema-78>
                order_id:
                  type: string
                  format: uuid
                  x-parser-schema-id: <anonymous-schema-79>
                client_order_id:
                  type: string
                  x-parser-schema-id: <anonymous-schema-80>
                market_ticker:
                  type: string
                  description: Unique market identifier
                  x-parser-schema-id: marketTicker
                is_taker:
                  type: boolean
                  x-parser-schema-id: <anonymous-schema-81>
                side:
                  type: string
                  enum:
                    - bid
                    - ask
                  x-parser-schema-id: bookSide
                ts_ms:
                  type: integer
                  format: int64
                  description: Unix timestamp in milliseconds.
                  x-parser-schema-id: <anonymous-schema-82>
                price:
                  type: string
                  x-parser-schema-id: <anonymous-schema-83>
                count:
                  type: string
                  x-parser-schema-id: <anonymous-schema-84>
                fee_cost:
                  type: string
                  x-parser-schema-id: <anonymous-schema-85>
                post_position:
                  type: string
                  x-parser-schema-id: <anonymous-schema-86>
                subaccount:
                  type: integer
                  x-parser-schema-id: <anonymous-schema-87>
              x-parser-schema-id: <anonymous-schema-77>
          x-parser-schema-id: marginFillPayload
        title: Fill Update
        description: Private margin fill information for the authenticated user
        example: |-
          {
            "type": "<string>",
            "sid": 123,
            "msg": {
              "trade_id": "<string>",
              "order_id": "<string>",
              "client_order_id": "<string>",
              "market_ticker": "<string>",
              "is_taker": true,
              "side": "<string>",
              "ts_ms": 123,
              "price": "<string>",
              "count": "<string>",
              "fee_cost": "<string>",
              "post_position": "<string>",
              "subaccount": 123
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
  - *ref_0
sendMessages: []
receiveMessages:
  - *ref_1
extensions:
  - id: x-parser-unique-object-id
    value: fill
securitySchemes:
  - id: apiKey
    name: apiKey
    type: apiKey
    description: API key authentication required for margin WebSocket connections.
    in: user
    extensions: []

````