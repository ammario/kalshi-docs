---
url: https://docs.kalshi.com/margin-ws/websockets/orderbook-updates
lastmod: 2026-05-31T16:40:03.916Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Orderbook Updates

> Real-time margin orderbook price-level changes.

Requirements:
- authenticated connection
- market specification required via `market_ticker` or `market_tickers`
- sends `orderbook_snapshot` first, then incremental `orderbook_delta` updates




## AsyncAPI

````yaml perps_asyncapi.yaml orderbook_delta
id: orderbook_delta
title: Orderbook Updates
description: |
  Real-time margin orderbook price-level changes.

  Requirements:
  - authenticated connection
  - market specification required via `market_ticker` or `market_tickers`
  - sends `orderbook_snapshot` first, then incremental `orderbook_delta` updates
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
address: orderbook_delta
parameters: []
bindings: []
operations:
  - &ref_5
    id: receiveOrderbookSnapshot
    title: Orderbook Snapshot
    type: send
    messages:
      - &ref_7
        id: orderbookSnapshot
        contentType: application/json
        payload:
          - name: Orderbook Snapshot
            description: Complete view of the margin order book's aggregated price levels
            type: object
            properties:
              - name: type
                type: string
                description: orderbook_snapshot
                required: true
              - name: sid
                type: integer
                description: Server-generated subscription identifier
                required: true
              - name: seq
                type: integer
                description: Sequence number used for snapshot/delta consistency
                required: true
              - name: msg
                type: object
                required: true
                properties:
                  - name: market_ticker
                    type: string
                    description: Unique market identifier
                    required: true
                  - name: bid
                    type: array
                    required: false
                    properties:
                      - name: item
                        type: array
                        description: '[price_in_dollars, contract_count_fp]'
                        required: false
                        properties:
                          - name: item
                            type: string
                            required: false
                  - name: ask
                    type: array
                    required: false
                    properties:
                      - name: item
                        type: array
                        description: '[price_in_dollars, contract_count_fp]'
                        required: false
                        properties:
                          - name: item
                            type: string
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
              x-parser-schema-id: <anonymous-schema-40>
            sid: &ref_1
              type: integer
              minimum: 1
              description: Server-generated subscription identifier
              x-parser-schema-id: subscriptionId
            seq: &ref_2
              type: integer
              minimum: 1
              description: Sequence number used for snapshot/delta consistency
              x-parser-schema-id: sequenceNumber
            msg:
              type: object
              required:
                - market_ticker
              properties:
                market_ticker: &ref_3
                  type: string
                  description: Unique market identifier
                  x-parser-schema-id: marketTicker
                bid:
                  type: array
                  items: &ref_0
                    type: array
                    items:
                      type: string
                      x-parser-schema-id: <anonymous-schema-43>
                    minItems: 2
                    maxItems: 2
                    description: '[price_in_dollars, contract_count_fp]'
                    x-parser-schema-id: priceLevelDollarsCountFp
                  x-parser-schema-id: <anonymous-schema-42>
                ask:
                  type: array
                  items: *ref_0
                  x-parser-schema-id: <anonymous-schema-44>
              x-parser-schema-id: <anonymous-schema-41>
          x-parser-schema-id: marginOrderbookSnapshotPayload
        title: Orderbook Snapshot
        description: Complete view of the margin order book's aggregated price levels
        example: No examples found
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
    title: Orderbook Delta
    type: send
    messages:
      - &ref_8
        id: orderbookDelta
        contentType: application/json
        payload:
          - name: Orderbook Delta
            description: Update to be applied to the current margin order book view
            type: object
            properties:
              - name: type
                type: string
                description: orderbook_delta
                required: true
              - name: sid
                type: integer
                description: Server-generated subscription identifier
                required: true
              - name: seq
                type: integer
                description: Sequence number used for snapshot/delta consistency
                required: true
              - name: msg
                type: object
                required: true
                properties:
                  - name: market_ticker
                    type: string
                    description: Unique market identifier
                    required: true
                  - name: price
                    type: string
                    required: true
                  - name: delta
                    type: string
                    required: true
                  - name: side
                    type: string
                    enumValues:
                      - bid
                      - ask
                    required: true
                  - name: last_update_reason
                    type: string
                    description: >-
                      Margin order update reason when the delta corresponds to
                      the authenticated user's order.
                    enumValues:
                      - ''
                      - Decrease
                      - Amend
                      - MarginCancel
                      - SelfTradeCancel
                      - ExpiryCancel
                      - Trade
                    required: false
                  - name: client_order_id
                    type: string
                    required: false
                  - name: subaccount
                    type: integer
                    required: false
                  - name: ts_ms
                    type: integer
                    description: Unix timestamp in milliseconds.
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
              x-parser-schema-id: <anonymous-schema-45>
            sid: *ref_1
            seq: *ref_2
            msg:
              type: object
              required:
                - market_ticker
                - price
                - delta
                - side
              properties:
                market_ticker: *ref_3
                price:
                  type: string
                  x-parser-schema-id: <anonymous-schema-47>
                delta:
                  type: string
                  x-parser-schema-id: <anonymous-schema-48>
                side:
                  type: string
                  enum:
                    - bid
                    - ask
                  x-parser-schema-id: bookSide
                last_update_reason:
                  type: string
                  enum:
                    - ''
                    - Decrease
                    - Amend
                    - MarginCancel
                    - SelfTradeCancel
                    - ExpiryCancel
                    - Trade
                  description: >-
                    Margin order update reason when the delta corresponds to the
                    authenticated user's order.
                  x-parser-schema-id: lastUpdateReason
                client_order_id:
                  type: string
                  x-parser-schema-id: <anonymous-schema-49>
                subaccount:
                  type: integer
                  x-parser-schema-id: <anonymous-schema-50>
                ts_ms:
                  type: integer
                  format: int64
                  description: Unix timestamp in milliseconds.
                  x-parser-schema-id: <anonymous-schema-51>
              x-parser-schema-id: <anonymous-schema-46>
          x-parser-schema-id: marginOrderbookDeltaPayload
        title: Orderbook Delta
        description: Update to be applied to the current margin order book view
        example: |-
          {
            "type": "<string>",
            "sid": 123,
            "seq": 123,
            "msg": {
              "market_ticker": "<string>",
              "price": "<string>",
              "delta": "<string>",
              "side": "<string>",
              "last_update_reason": "<string>",
              "client_order_id": "<string>",
              "subaccount": 123,
              "ts_ms": 123
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
    description: API key authentication required for margin WebSocket connections.
    in: user
    extensions: []

````