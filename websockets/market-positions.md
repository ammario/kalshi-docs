---
url: https://docs.kalshi.com/websockets/market-positions
lastmod: 2026-03-05T20:30:49.042Z
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
All monetary values (position_cost, realized_pnl, fees_paid) are returned in centi-cents (1/10,000th of a dollar).
To convert to dollars, divide by 10,000.

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

  All monetary values (position_cost, realized_pnl, fees_paid) are returned in
  centi-cents (1/10,000th of a dollar).

  To convert to dollars, divide by 10,000.


  **Use case:** Portfolio tracking, position monitoring, P&L calculations
servers:
  - id: production
    protocol: wss
    host: api.elections.kalshi.com
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
                  - name: position
                    type: integer
                    description: >-
                      Current net position (positive for long, negative for
                      short)
                    required: false
                  - name: position_fp
                    type: string
                    description: Fixed-point net position (2 decimals)
                    required: false
                  - name: position_cost
                    type: integer
                    description: >-
                      Current cost basis of the position in centi-cents
                      (1/10,000th of a dollar)
                    required: false
                  - name: realized_pnl
                    type: integer
                    description: >-
                      Realized profit/loss in centi-cents (1/10,000th of a
                      dollar)
                    required: false
                  - name: fees_paid
                    type: integer
                    description: Total fees paid in centi-cents (1/10,000th of a dollar)
                    required: false
                  - name: position_fee_cost
                    type: integer
                    description: >-
                      Total position fee cost in centi-cents (1/10,000th of a
                      dollar)
                    required: false
                  - name: volume
                    type: integer
                    description: Total volume traded
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
              x-parser-schema-id: <anonymous-schema-122>
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
                - position
                - position_fp
                - position_cost
                - realized_pnl
                - fees_paid
                - position_fee_cost
                - volume
                - volume_fp
              properties:
                user_id:
                  type: string
                  description: User ID for the position
                  x-parser-schema-id: <anonymous-schema-124>
                market_ticker:
                  type: string
                  description: Unique market identifier
                  pattern: ^[A-Z0-9-]+$
                  examples:
                    - FED-23DEC-T3.00
                    - HIGHNY-22DEC23-B53.5
                  x-parser-schema-id: marketTicker
                position:
                  type: integer
                  description: Current net position (positive for long, negative for short)
                  format: int32
                  x-parser-schema-id: <anonymous-schema-125>
                position_fp:
                  type: string
                  description: Fixed-point net position (2 decimals)
                  x-parser-schema-id: <anonymous-schema-126>
                position_cost:
                  type: integer
                  description: >-
                    Current cost basis of the position in centi-cents
                    (1/10,000th of a dollar)
                  format: int64
                  x-parser-schema-id: <anonymous-schema-127>
                realized_pnl:
                  type: integer
                  description: Realized profit/loss in centi-cents (1/10,000th of a dollar)
                  format: int64
                  x-parser-schema-id: <anonymous-schema-128>
                fees_paid:
                  type: integer
                  description: Total fees paid in centi-cents (1/10,000th of a dollar)
                  format: int64
                  x-parser-schema-id: <anonymous-schema-129>
                position_fee_cost:
                  type: integer
                  description: >-
                    Total position fee cost in centi-cents (1/10,000th of a
                    dollar)
                  format: int64
                  x-parser-schema-id: <anonymous-schema-130>
                volume:
                  type: integer
                  description: Total volume traded
                  format: int32
                  x-parser-schema-id: <anonymous-schema-131>
                volume_fp:
                  type: string
                  description: Fixed-point total volume traded (2 decimals)
                  x-parser-schema-id: <anonymous-schema-132>
                subaccount:
                  type: integer
                  description: Optional subaccount number for the position
                  x-parser-schema-id: <anonymous-schema-133>
              x-parser-schema-id: <anonymous-schema-123>
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
              "position": 100,
              "position_fp": "100.00",
              "position_cost": 500000,
              "realized_pnl": 100000,
              "fees_paid": 10000,
              "position_fee_cost": 5000,
              "volume": 15,
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