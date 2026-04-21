---
url: https://docs.kalshi.com/websockets/public-trades
lastmod: 2026-04-21T02:02:41.465Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Public Trades

> Public trade notifications when trades occur.

**Requirements:**
- No additional channel-level authentication beyond the authenticated WebSocket connection
- Market specification optional (omit to receive all trades)
- Updates sent immediately after trade execution

**Use case:** Trade feed, volume analysis




## AsyncAPI

````yaml asyncapi.yaml trade
id: trade
title: Public Trades
description: >
  Public trade notifications when trades occur.


  **Requirements:**

  - No additional channel-level authentication beyond the authenticated
  WebSocket connection

  - Market specification optional (omit to receive all trades)

  - Updates sent immediately after trade execution


  **Use case:** Trade feed, volume analysis
servers:
  - id: production
    protocol: wss
    host: api.elections.kalshi.com
    bindings: []
    variables: []
address: trade
parameters: []
bindings: []
operations:
  - &ref_0
    id: receiveTrade
    title: Trade Update
    description: Receive public trade notifications
    type: send
    messages:
      - &ref_1
        id: trade
        contentType: application/json
        payload:
          - name: Trade Update
            description: Public trade information
            type: object
            properties:
              - name: type
                type: string
                description: trade
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
                    description: Unique identifier for the trade
                    required: false
                  - name: market_ticker
                    type: string
                    description: Unique market identifier
                    required: false
                  - name: yes_price_dollars
                    type: string
                    description: Yes side price in dollars
                    required: false
                  - name: no_price_dollars
                    type: string
                    description: No side price in dollars
                    required: false
                  - name: count_fp
                    type: string
                    description: Fixed-point contracts traded (2 decimals)
                    required: false
                  - name: taker_side
                    type: string
                    description: Market side
                    enumValues:
                      - 'yes'
                      - 'no'
                    required: false
                  - name: ts
                    type: integer
                    description: Deprecated - Unix timestamp in seconds. Use ts_ms instead.
                    deprecated: true
                    required: false
                  - name: ts_ms
                    type: integer
                    description: Unix timestamp in milliseconds
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
              const: trade
              x-parser-schema-id: <anonymous-schema-79>
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
                - market_ticker
                - yes_price_dollars
                - no_price_dollars
                - count_fp
                - taker_side
                - ts
                - ts_ms
              properties:
                trade_id:
                  type: string
                  description: Unique identifier for the trade
                  format: uuid
                  x-parser-schema-id: <anonymous-schema-81>
                market_ticker:
                  type: string
                  description: Unique market identifier
                  pattern: ^[A-Z0-9-]+$
                  examples:
                    - FED-23DEC-T3.00
                    - HIGHNY-22DEC23-B53.5
                  x-parser-schema-id: marketTicker
                yes_price_dollars:
                  type: string
                  description: Yes side price in dollars
                  x-parser-schema-id: <anonymous-schema-82>
                no_price_dollars:
                  type: string
                  description: No side price in dollars
                  x-parser-schema-id: <anonymous-schema-83>
                count_fp:
                  type: string
                  description: Fixed-point contracts traded (2 decimals)
                  x-parser-schema-id: <anonymous-schema-84>
                taker_side:
                  type: string
                  description: Market side
                  enum:
                    - 'yes'
                    - 'no'
                  x-parser-schema-id: marketSide
                ts:
                  type: integer
                  deprecated: true
                  description: Deprecated - Unix timestamp in seconds. Use ts_ms instead.
                  format: int64
                  x-parser-schema-id: <anonymous-schema-85>
                ts_ms:
                  type: integer
                  description: Unix timestamp in milliseconds
                  format: int64
                  x-parser-schema-id: <anonymous-schema-86>
              x-parser-schema-id: <anonymous-schema-80>
          x-parser-schema-id: tradePayload
        title: Trade Update
        description: Public trade information
        example: |-
          {
            "type": "trade",
            "sid": 11,
            "msg": {
              "trade_id": "d91bc706-ee49-470d-82d8-11418bda6fed",
              "market_ticker": "HIGHNY-22DEC23-B53.5",
              "yes_price_dollars": "0.360",
              "no_price_dollars": "0.640",
              "count_fp": "136.00",
              "taker_side": "no",
              "ts": 1669149841,
              "ts_ms": 1669149841000
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
    description: |
      API key authentication required for WebSocket connections.
      The API key should be provided during the WebSocket handshake.
    in: user
    extensions: []

````