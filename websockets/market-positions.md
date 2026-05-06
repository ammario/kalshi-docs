---
url: https://docs.kalshi.com/websockets/market-positions
lastmod: 2026-05-06T00:22:33.079Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Market Positions

> Real-time updates of your positions in markets. Requires authentication.

**Requirements:**
- Authentication required
- Market specification optional (omit to receive all positions)
- Filters are by `market_ticker`/`market_tickers` only; `market_id`/`market_ids` are not supported
- Updates sent when your position changes due to trades, settlements, etc.

**Monetary Values:**
All monetary values are returned as fixed-point dollar strings (`_dollars` suffix).

**Use case:** Portfolio tracking, position monitoring, P&L calculations




## AsyncAPI

````yaml asyncapi.yaml market_positions
id: market_positions
title: Market Positions
description: >
  Real-time updates of your positions in markets. Requires authentication.


  **Requirements:**

  - Authentication required

  - Market specification optional (omit to receive all positions)

  - Filters are by `market_ticker`/`market_tickers` only;
  `market_id`/`market_ids` are not supported

  - Updates sent when your position changes due to trades, settlements, etc.


  **Monetary Values:**

  All monetary values are returned as fixed-point dollar strings (`_dollars`
  suffix).


  **Use case:** Portfolio tracking, position monitoring, P&L calculations
servers:
  - id: production
    protocol: wss
    host: external-api-ws.kalshi.com
    bindings: []
    variables: []
address: market_positions
parameters: []
bindings: []
operations:
  - &ref_0
    id: receiveMarketPosition
    title: Market Position Update
    description: Receive updates for your market positions
    type: send
    messages:
      - &ref_1
        id: marketPosition
        contentType: application/json
        payload:
          - name: Market Position Update
            description: Real-time position updates for authenticated user
            type: object
            properties:
              - name: type
                type: string
                description: market_position
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
                  - name: user_id
                    type: string
                    description: User ID for the position
                    required: false
                  - name: market_ticker
                    type: string
                    description: Unique market identifier
                    required: false
                  - name: position_fp
                    type: string
                    description: Fixed-point net position (2 decimals)
                    required: false
                  - name: position_cost_dollars
                    type: string
                    description: >-
                      Current cost basis of the position as a fixed-point dollar
                      string
                    required: false
                  - name: realized_pnl_dollars
                    type: string
                    description: Realized profit/loss as a fixed-point dollar string
                    required: false
                  - name: fees_paid_dollars
                    type: string
                    description: Total fees paid as a fixed-point dollar string
                    required: false
                  - name: position_fee_cost_dollars
                    type: string
                    description: Total position fee cost as a fixed-point dollar string
                    required: false
                  - name: volume_fp
                    type: string
                    description: Fixed-point total volume traded (2 decimals)
                    required: false
                  - name: subaccount
                    type: integer
                    description: Optional subaccount number for the position
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
              const: market_position
              x-parser-schema-id: <anonymous-schema-100>
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
                - user_id
                - market_ticker
                - position_fp
                - position_cost_dollars
                - realized_pnl_dollars
                - fees_paid_dollars
                - position_fee_cost_dollars
                - volume_fp
              properties:
                user_id:
                  type: string
                  description: User ID for the position
                  x-parser-schema-id: <anonymous-schema-102>
                market_ticker:
                  type: string
                  description: Unique market identifier
                  pattern: ^[A-Z0-9-]+$
                  examples:
                    - FED-23DEC-T3.00
                    - HIGHNY-22DEC23-B53.5
                  x-parser-schema-id: marketTicker
                position_fp:
                  type: string
                  description: Fixed-point net position (2 decimals)
                  x-parser-schema-id: <anonymous-schema-103>
                position_cost_dollars:
                  type: string
                  description: >-
                    Current cost basis of the position as a fixed-point dollar
                    string
                  x-parser-schema-id: <anonymous-schema-104>
                realized_pnl_dollars:
                  type: string
                  description: Realized profit/loss as a fixed-point dollar string
                  x-parser-schema-id: <anonymous-schema-105>
                fees_paid_dollars:
                  type: string
                  description: Total fees paid as a fixed-point dollar string
                  x-parser-schema-id: <anonymous-schema-106>
                position_fee_cost_dollars:
                  type: string
                  description: Total position fee cost as a fixed-point dollar string
                  x-parser-schema-id: <anonymous-schema-107>
                volume_fp:
                  type: string
                  description: Fixed-point total volume traded (2 decimals)
                  x-parser-schema-id: <anonymous-schema-108>
                subaccount:
                  type: integer
                  description: Optional subaccount number for the position
                  x-parser-schema-id: <anonymous-schema-109>
              x-parser-schema-id: <anonymous-schema-101>
          x-parser-schema-id: marketPositionPayload
        title: Market Position Update
        description: Real-time position updates for authenticated user
        example: |-
          {
            "type": "market_position",
            "sid": 14,
            "msg": {
              "user_id": "user123",
              "market_ticker": "FED-23DEC-T3.00",
              "position_fp": "100.00",
              "position_cost_dollars": "50.0000",
              "realized_pnl_dollars": "10.0000",
              "fees_paid_dollars": "1.0000",
              "position_fee_cost_dollars": "0.5000",
              "volume_fp": "15.00"
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: marketPosition
    bindings: []
    extensions:
      - id: x-parser-unique-object-id
        value: market_positions
sendOperations: []
receiveOperations:
  - *ref_0
sendMessages: []
receiveMessages:
  - *ref_1
extensions:
  - id: x-parser-unique-object-id
    value: market_positions
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