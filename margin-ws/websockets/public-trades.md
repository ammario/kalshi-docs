---
url: https://docs.kalshi.com/margin-ws/websockets/public-trades
lastmod: 2026-05-31T16:40:04.043Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Public Trades

> Public notifications for executed margin trades.

Requirements:
- no additional channel-level auth beyond the authenticated WebSocket connection
- market specification optional via `market_ticker` or `market_tickers`




## AsyncAPI

````yaml perps_asyncapi.yaml trade
id: trade
title: Public Trades
description: >
  Public notifications for executed margin trades.


  Requirements:

  - no additional channel-level auth beyond the authenticated WebSocket
  connection

  - market specification optional via `market_ticker` or `market_tickers`
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
address: trade
parameters: []
bindings: []
operations:
  - &ref_0
    id: receiveTrade
    title: Trade Update
    type: send
    messages:
      - &ref_1
        id: trade
        contentType: application/json
        payload:
          - name: Trade Update
            description: Public margin trade information
            type: object
            properties:
              - name: type
                type: string
                description: trade
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
                  - name: market_ticker
                    type: string
                    description: Unique market identifier
                    required: true
                  - name: price
                    type: string
                    required: true
                  - name: count
                    type: string
                    required: true
                  - name: taker_side
                    type: string
                    enumValues:
                      - bid
                      - ask
                    required: true
                  - name: ts_ms
                    type: integer
                    description: Unix timestamp in milliseconds.
                    required: true
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
              const: trade
              x-parser-schema-id: <anonymous-schema-70>
            sid:
              type: integer
              minimum: 1
              description: Server-generated subscription identifier
              x-parser-schema-id: subscriptionId
            msg:
              type: object
              required:
                - trade_id
                - market_ticker
                - price
                - count
                - taker_side
                - ts_ms
              properties:
                trade_id:
                  type: string
                  format: uuid
                  x-parser-schema-id: <anonymous-schema-72>
                market_ticker:
                  type: string
                  description: Unique market identifier
                  x-parser-schema-id: marketTicker
                price:
                  type: string
                  x-parser-schema-id: <anonymous-schema-73>
                count:
                  type: string
                  x-parser-schema-id: <anonymous-schema-74>
                taker_side:
                  type: string
                  enum:
                    - bid
                    - ask
                  x-parser-schema-id: bookSide
                ts_ms:
                  type: integer
                  format: int64
                  description: Unix timestamp in milliseconds.
                  x-parser-schema-id: <anonymous-schema-75>
              x-parser-schema-id: <anonymous-schema-71>
          x-parser-schema-id: marginTradePayload
        title: Trade Update
        description: Public margin trade information
        example: |-
          {
            "type": "<string>",
            "sid": 123,
            "msg": {
              "trade_id": "<string>",
              "market_ticker": "<string>",
              "price": "<string>",
              "count": "<string>",
              "taker_side": "<string>",
              "ts_ms": 123
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: trade
    bindings: []
    extensions:
      - id: x-parser-unique-object-id
        value: trade
sendOperations: []
receiveOperations:
  - *ref_0
sendMessages: []
receiveMessages:
  - *ref_1
extensions:
  - id: x-parser-unique-object-id
    value: trade
securitySchemes:
  - id: apiKey
    name: apiKey
    type: apiKey
    description: API key authentication required for margin WebSocket connections.
    in: user
    extensions: []

````