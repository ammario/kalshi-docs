---
url: https://docs.kalshi.com/websockets/orderbook-updates
lastmod: 2026-05-06T00:22:32.387Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Orderbook Updates

> Real-time orderbook price level changes. Provides incremental updates to maintain a live orderbook.

**Requirements:**
- Authentication required
- Market specification required:
  - Use `market_ticker` (string) for a single market
  - Use `market_tickers` (array of strings) for multiple markets
  - `market_id`/`market_ids` are not supported for this channel
- Sends `orderbook_snapshot` first, then incremental `orderbook_delta` updates
- Supports `update_subscription` with `add_markets` / `delete_markets` / `get_snapshot` actions
- `get_snapshot` returns an `orderbook_snapshot` for the requested `market_tickers` without modifying the subscription

**Use case:** Building and maintaining a real-time orderbook




## AsyncAPI

````yaml asyncapi.yaml orderbook_delta
id: orderbook_delta
title: Orderbook Updates
description: >
  Real-time orderbook price level changes. Provides incremental updates to
  maintain a live orderbook.


  **Requirements:**

  - Authentication required

  - Market specification required:
    - Use `market_ticker` (string) for a single market
    - Use `market_tickers` (array of strings) for multiple markets
    - `market_id`/`market_ids` are not supported for this channel
  - Sends `orderbook_snapshot` first, then incremental `orderbook_delta` updates

  - Supports `update_subscription` with `add_markets` / `delete_markets` /
  `get_snapshot` actions

  - `get_snapshot` returns an `orderbook_snapshot` for the requested
  `market_tickers` without modifying the subscription


  **Use case:** Building and maintaining a real-time orderbook
servers:
  - id: production
    protocol: wss
    host: external-api-ws.kalshi.com
    bindings: []
    variables: []
address: orderbook_delta
parameters: []
bindings: []
operations:
  - &ref_5
    id: receiveOrderbookSnapshot
    title: Orderbook Snapshot
    description: Receive complete orderbook state
    type: send
    messages:
      - &ref_7
        id: orderbookSnapshot
        contentType: application/json
        payload:
          - name: Orderbook Snapshot
            description: Complete view of the order book's aggregated price levels
            type: object
            properties:
              - name: type
                type: string
                description: orderbook_snapshot
                required: true
              - name: sid
                type: integer
                description: >-
                  Server-generated subscription identifier (sid) used to
                  identify the channel
                required: true
              - name: seq
                type: integer
                description: >-
                  Sequential number that should be checked if you want to
                  guarantee you received all the messages. Used for
                  snapshot/delta consistency
                required: true
              - name: msg
                type: object
                required: true
                properties:
                  - name: market_ticker
                    type: string
                    description: Unique market identifier
                    required: false
                  - name: market_id
                    type: string
                    description: Unique market UUID
                    required: false
                  - name: yes_dollars_fp
                    type: array
                    description: >
                      Optional - This key will not exist if there are no Yes
                      offers in the orderbook.

                      Price levels represented as [price_in_dollars,
                      contract_count_fp].

                      Format: [price_in_dollars, contract_count_fp]
                    required: false
                  - name: no_dollars_fp
                    type: array
                    description: >
                      Optional - Same format as "yes_dollars_fp" but for the NO
                      side of the orderbook.

                      This key will not exist if there are no No offers in the
                      orderbook.

                      Format: [price_in_dollars, contract_count_fp]
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          required:
            - type
            - sid
            - seq
            - msg
          properties:
            type:
              type: string
              const: orderbook_snapshot
              x-parser-schema-id: <anonymous-schema-49>
            sid: &ref_0
              type: integer
              description: >-
                Server-generated subscription identifier (sid) used to identify
                the channel
              minimum: 1
              x-parser-schema-id: subscriptionId
            seq: &ref_1
              type: integer
              description: >-
                Sequential number that should be checked if you want to
                guarantee you received all the messages. Used for snapshot/delta
                consistency
              minimum: 1
              x-parser-schema-id: sequenceNumber
            msg:
              type: object
              required:
                - market_ticker
                - market_id
              properties:
                market_ticker: &ref_2
                  type: string
                  description: Unique market identifier
                  pattern: ^[A-Z0-9-]+$
                  examples:
                    - FED-23DEC-T3.00
                    - HIGHNY-22DEC23-B53.5
                  x-parser-schema-id: marketTicker
                market_id: &ref_3
                  type: string
                  description: Unique market UUID
                  format: uuid
                  x-parser-schema-id: marketId
                yes_dollars_fp:
                  type: array
                  description: >
                    Optional - This key will not exist if there are no Yes
                    offers in the orderbook.

                    Price levels represented as [price_in_dollars,
                    contract_count_fp].

                    Format: [price_in_dollars, contract_count_fp]
                  items:
                    type: array
                    items:
                      type: string
                      x-parser-schema-id: <anonymous-schema-53>
                    minItems: 2
                    maxItems: 2
                    x-parser-schema-id: <anonymous-schema-52>
                  x-parser-schema-id: <anonymous-schema-51>
                no_dollars_fp:
                  type: array
                  description: >
                    Optional - Same format as "yes_dollars_fp" but for the NO
                    side of the orderbook.

                    This key will not exist if there are no No offers in the
                    orderbook.

                    Format: [price_in_dollars, contract_count_fp]
                  items:
                    type: array
                    items:
                      type: string
                      x-parser-schema-id: <anonymous-schema-56>
                    minItems: 2
                    maxItems: 2
                    x-parser-schema-id: <anonymous-schema-55>
                  x-parser-schema-id: <anonymous-schema-54>
              x-parser-schema-id: <anonymous-schema-50>
          x-parser-schema-id: orderbookSnapshotPayload
        title: Orderbook Snapshot
        description: Complete view of the order book's aggregated price levels
        example: |-
          {
            "type": "orderbook_snapshot",
            "sid": 2,
            "seq": 2,
            "msg": {
              "market_ticker": "FED-23DEC-T3.00",
              "market_id": "9b0f6b43-5b68-4f9f-9f02-9a2d1b8ac1a1",
              "yes_dollars_fp": [
                [
                  "0.0800",
                  "300.00"
                ],
                [
                  "0.2200",
                  "333.00"
                ]
              ],
              "no_dollars_fp": [
                [
                  "0.5400",
                  "20.00"
                ],
                [
                  "0.5600",
                  "146.00"
                ]
              ]
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: orderbookSnapshot
    bindings: []
    extensions: &ref_4
      - id: x-parser-unique-object-id
        value: orderbook_delta
  - &ref_6
    id: receiveOrderbookDelta
    title: Orderbook Update
    description: Receive incremental orderbook changes
    type: send
    messages:
      - &ref_8
        id: orderbookDelta
        contentType: application/json
        payload:
          - name: Orderbook Delta
            description: Update to be applied to the current order book view
            type: object
            properties:
              - name: type
                type: string
                description: orderbook_delta
                required: true
              - name: sid
                type: integer
                description: >-
                  Server-generated subscription identifier (sid) used to
                  identify the channel
                required: true
              - name: seq
                type: integer
                description: >-
                  Sequential number that should be checked if you want to
                  guarantee you received all the messages. Used for
                  snapshot/delta consistency
                required: true
              - name: msg
                type: object
                required: true
                properties:
                  - name: market_ticker
                    type: string
                    description: Unique market identifier
                    required: false
                  - name: market_id
                    type: string
                    description: Unique market UUID
                    required: false
                  - name: price_dollars
                    type: string
                    description: Price level in dollars
                    required: false
                  - name: delta_fp
                    type: string
                    description: Fixed-point contract delta (2 decimals)
                    required: false
                  - name: side
                    type: string
                    description: Market side
                    enumValues:
                      - 'yes'
                      - 'no'
                    required: false
                  - name: client_order_id
                    type: string
                    description: >
                      Optional - Present only when you caused this orderbook
                      change.

                      Contains the client_order_id of your order that triggered
                      this delta.
                    required: false
                  - name: subaccount
                    type: integer
                    description: >
                      Optional - Present only when you caused this orderbook
                      change and are using subaccounts.

                      Contains the subaccount number of your order that
                      triggered this delta.
                    required: false
                  - name: ts
                    type: string
                    description: >-
                      Deprecated - Optional timestamp for when the orderbook
                      change was recorded (RFC3339). Use ts_ms instead.
                    deprecated: true
                    required: false
                  - name: ts_ms
                    type: integer
                    description: >-
                      Optional - Unix timestamp for when the orderbook change
                      was recorded (in milliseconds)
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          required:
            - type
            - sid
            - seq
            - msg
          properties:
            type:
              type: string
              const: orderbook_delta
              x-parser-schema-id: <anonymous-schema-57>
            sid: *ref_0
            seq: *ref_1
            msg:
              type: object
              required:
                - market_ticker
                - market_id
                - price_dollars
                - delta_fp
                - side
              properties:
                market_ticker: *ref_2
                market_id: *ref_3
                price_dollars:
                  type: string
                  description: Price level in dollars
                  x-parser-schema-id: <anonymous-schema-59>
                delta_fp:
                  type: string
                  description: Fixed-point contract delta (2 decimals)
                  x-parser-schema-id: <anonymous-schema-60>
                side:
                  type: string
                  description: Market side
                  enum:
                    - 'yes'
                    - 'no'
                  x-parser-schema-id: marketSide
                client_order_id:
                  type: string
                  description: >
                    Optional - Present only when you caused this orderbook
                    change.

                    Contains the client_order_id of your order that triggered
                    this delta.
                  x-parser-schema-id: <anonymous-schema-61>
                subaccount:
                  type: integer
                  description: >
                    Optional - Present only when you caused this orderbook
                    change and are using subaccounts.

                    Contains the subaccount number of your order that triggered
                    this delta.
                  x-parser-schema-id: <anonymous-schema-62>
                ts:
                  type: string
                  deprecated: true
                  description: >-
                    Deprecated - Optional timestamp for when the orderbook
                    change was recorded (RFC3339). Use ts_ms instead.
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-63>
                ts_ms:
                  type: integer
                  description: >-
                    Optional - Unix timestamp for when the orderbook change was
                    recorded (in milliseconds)
                  format: int64
                  x-parser-schema-id: <anonymous-schema-64>
              x-parser-schema-id: <anonymous-schema-58>
          x-parser-schema-id: orderbookDeltaPayload
        title: Orderbook Delta
        description: Update to be applied to the current order book view
        example: |-
          {
            "type": "orderbook_delta",
            "sid": 2,
            "seq": 3,
            "msg": {
              "market_ticker": "FED-23DEC-T3.00",
              "market_id": "9b0f6b43-5b68-4f9f-9f02-9a2d1b8ac1a1",
              "price_dollars": "0.960",
              "delta_fp": "-54.00",
              "side": "yes",
              "ts": "2022-11-22T20:44:01Z",
              "ts_ms": 1669149841000
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: orderbookDelta
    bindings: []
    extensions: *ref_4
sendOperations: []
receiveOperations:
  - *ref_5
  - *ref_6
sendMessages: []
receiveMessages:
  - *ref_7
  - *ref_8
extensions:
  - id: x-parser-unique-object-id
    value: orderbook_delta
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