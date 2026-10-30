---
url: https://docs.kalshi.com/websockets/orderbook-updates
lastmod: 2026-10-28T22:41:38.636Z
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
- `get_snapshot` returns an `orderbook_snapshot` for the requested `market_tickers` without changing the subscribed markets. Apply every returned snapshot as a replacement for that market's local book
- Each connection has one `orderbook_delta` subscription. A repeated `subscribe` adds new markets to its existing `sid`; it does not resend snapshots for markets already subscribed
- A repeated `subscribe` must use the existing `update_interval_ms` (omitting it means `0`). A different valid interval returns error code 11 without adding markets. Use `update_subscription` with `add_markets` to add markets without respecifying the interval. To change the interval, `unsubscribe`, wait for `unsubscribed`, then `subscribe` again

**Matching real-time updates across connections:**
These guarantees apply to subscriptions created in real-time mode (the initial `update_interval_ms` is omitted or `0`). Conflated subscriptions have the separate clock and recovery rules below.

- `clock` is the exchange clock. It is the same on every connection, so it can match a market's updates across redundant connections; `seq` counts messages on one subscription only
- One exchange action can make several deltas, so several deltas can share a `clock`. Every connection sends them in the same order, before any delta for that market with a higher `clock`
- A snapshot includes every change with a `clock` at or below its own; the deltas that follow it on that connection have higher clocks
- While you are subscribed to a market, its clocks never go down outside exchange maintenance, but they skip values. They are not comparable across markets. Keep checking `seq` on each connection for missed messages
- A market's clock may decrease during exchange maintenance, so don't compare clocks from before a maintenance period with clocks after it

**Conflated updates (opt-in):**
- Set `update_interval_ms` to `100` or `1000` on the initial `subscribe` to receive conflated updates instead of one `orderbook_delta` per change. Omit it or set it to `0` for real-time updates, the default
- Each window produces one `orderbook_delta` per changed price level, carrying the net held change at that level. Levels whose held changes cancel out are skipped. Apply every delta in sequence to account for those changes exactly
- Each window's flush is scheduled one interval after that window's first held change; processing and transport latency are additional. `clock`, `ts` and `ts_ms` are those of the latest change included in each delta
- A conflated delta's `clock` describes that price level's latest included change, not the completeness of the whole book. Clocks can decrease between messages, including when an immediate own-order update overtakes a held public update. Do not discard a delta because its clock is lower than a previously received clock
- Updates to your own orders bypass the interval, with the usual `client_order_id` and `subaccount` annotations when available. For a subaccount-restricted key, this applies only to orders within that restriction. Changes to other participants' orders, including liquidity your trades consume, are held like other public changes
- Snapshots bypass the interval and replace any unsent held changes for their market. Always replace your local book with a received snapshot before applying subsequent deltas for that market
- Between flushes, public levels can lag your own orders, and the book can appear locked or crossed. A flush contains separate delta messages, not an atomic full-book snapshot; there is no end-of-flush message
- `seq` stays contiguous; the interval is fixed for the life of the subscription
- Apply every delta in `seq` order within its subscription. If you detect a gap, request `get_snapshot` for all subscribed markets, or `unsubscribe`, wait for `unsubscribed`, then `subscribe` again. A repeated `subscribe` alone does not resynchronize existing markets
- Conflation windows are independent across subscriptions, so the same clock can accompany different net deltas on different connections. Do not merge or deduplicate conflated streams by clock. When switching connections, rebuild from that connection's snapshot and follow its own `seq`

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
  `market_tickers` without changing the subscribed markets. Apply every returned
  snapshot as a replacement for that market's local book

  - Each connection has one `orderbook_delta` subscription. A repeated
  `subscribe` adds new markets to its existing `sid`; it does not resend
  snapshots for markets already subscribed

  - A repeated `subscribe` must use the existing `update_interval_ms` (omitting
  it means `0`). A different valid interval returns error code 11 without adding
  markets. Use `update_subscription` with `add_markets` to add markets without
  respecifying the interval. To change the interval, `unsubscribe`, wait for
  `unsubscribed`, then `subscribe` again


  **Matching real-time updates across connections:**

  These guarantees apply to subscriptions created in real-time mode (the initial
  `update_interval_ms` is omitted or `0`). Conflated subscriptions have the
  separate clock and recovery rules below.


  - `clock` is the exchange clock. It is the same on every connection, so it can
  match a market's updates across redundant connections; `seq` counts messages
  on one subscription only

  - One exchange action can make several deltas, so several deltas can share a
  `clock`. Every connection sends them in the same order, before any delta for
  that market with a higher `clock`

  - A snapshot includes every change with a `clock` at or below its own; the
  deltas that follow it on that connection have higher clocks

  - While you are subscribed to a market, its clocks never go down outside
  exchange maintenance, but they skip values. They are not comparable across
  markets. Keep checking `seq` on each connection for missed messages

  - A market's clock may decrease during exchange maintenance, so don't compare
  clocks from before a maintenance period with clocks after it


  **Conflated updates (opt-in):**

  - Set `update_interval_ms` to `100` or `1000` on the initial `subscribe` to
  receive conflated updates instead of one `orderbook_delta` per change. Omit it
  or set it to `0` for real-time updates, the default

  - Each window produces one `orderbook_delta` per changed price level, carrying
  the net held change at that level. Levels whose held changes cancel out are
  skipped. Apply every delta in sequence to account for those changes exactly

  - Each window's flush is scheduled one interval after that window's first held
  change; processing and transport latency are additional. `clock`, `ts` and
  `ts_ms` are those of the latest change included in each delta

  - A conflated delta's `clock` describes that price level's latest included
  change, not the completeness of the whole book. Clocks can decrease between
  messages, including when an immediate own-order update overtakes a held public
  update. Do not discard a delta because its clock is lower than a previously
  received clock

  - Updates to your own orders bypass the interval, with the usual
  `client_order_id` and `subaccount` annotations when available. For a
  subaccount-restricted key, this applies only to orders within that
  restriction. Changes to other participants' orders, including liquidity your
  trades consume, are held like other public changes

  - Snapshots bypass the interval and replace any unsent held changes for their
  market. Always replace your local book with a received snapshot before
  applying subsequent deltas for that market

  - Between flushes, public levels can lag your own orders, and the book can
  appear locked or crossed. A flush contains separate delta messages, not an
  atomic full-book snapshot; there is no end-of-flush message

  - `seq` stays contiguous; the interval is fixed for the life of the
  subscription

  - Apply every delta in `seq` order within its subscription. If you detect a
  gap, request `get_snapshot` for all subscribed markets, or `unsubscribe`, wait
  for `unsubscribed`, then `subscribe` again. A repeated `subscribe` alone does
  not resynchronize existing markets

  - Conflation windows are independent across subscriptions, so the same clock
  can accompany different net deltas on different connections. Do not merge or
  deduplicate conflated streams by clock. When switching connections, rebuild
  from that connection's snapshot and follow its own `seq`


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
  - &ref_7
    id: receiveOrderbookSnapshot
    title: Orderbook Snapshot
    description: Receive complete orderbook state
    type: send
    messages:
      - &ref_9
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
              - name: id
                type: integer
                description: >
                  Unique ID of the command request. Generated by the client and
                  should be unique within a WS session.

                  The simplest way to use it would be to start from 1 and then
                  increment the value for every new command sent to the server.

                  If the id is set to 0, the server treats it the same way as if
                  there was no id.
                required: false
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
                    examples: &ref_0
                      - FED-23DEC-T3.00
                      - HIGHNY-22DEC23-B53.5
                    required: true
                  - name: market_id
                    type: string
                    description: Unique market UUID
                    required: true
                  - name: clock
                    type: integer
                    description: >
                      Exchange clock of the newest change this snapshot
                      includes, or 0 if the market has no recorded change.

                      The snapshot includes every change to this market with a
                      clock at or below this one, and none above it.
                    required: true
                  - name: yes_dollars_fp
                    type: array
                    description: >
                      Optional - This key will not exist if there are no Yes
                      offers in the orderbook.

                      Price levels represented as [price_in_dollars,
                      contract_count_fp].

                      Format: [price_in_dollars, contract_count_fp]
                    required: false
                    properties:
                      - name: item
                        type: array
                        required: false
                        properties:
                          - name: item
                            type: string
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
                    properties:
                      - name: item
                        type: array
                        required: false
                        properties:
                          - name: item
                            type: string
                            required: false
              - name: sending_ts_ms
                type: integer
                description: >-
                  Unix timestamp in milliseconds when Kalshi queued this message
                  at the network layer.
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
              x-parser-schema-id: <anonymous-schema-76>
            id:
              type: integer
              description: >
                Unique ID of the command request. Generated by the client and
                should be unique within a WS session.

                The simplest way to use it would be to start from 1 and then
                increment the value for every new command sent to the server.

                If the id is set to 0, the server treats it the same way as if
                there was no id.
              minimum: 0
              x-parser-schema-id: commandId
            sid: &ref_1
              type: integer
              description: >-
                Server-generated subscription identifier (sid) used to identify
                the channel
              minimum: 1
              x-parser-schema-id: subscriptionId
            seq: &ref_2
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
                - clock
              properties:
                market_ticker: &ref_3
                  type: string
                  description: Unique market identifier
                  examples: *ref_0
                  x-parser-schema-id: marketTicker
                market_id: &ref_4
                  type: string
                  description: Unique market UUID
                  format: uuid
                  x-parser-schema-id: marketId
                clock:
                  type: integer
                  format: int64
                  minimum: 0
                  description: >
                    Exchange clock of the newest change this snapshot includes,
                    or 0 if the market has no recorded change.

                    The snapshot includes every change to this market with a
                    clock at or below this one, and none above it.
                  x-parser-schema-id: <anonymous-schema-78>
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
                      x-parser-schema-id: <anonymous-schema-81>
                    minItems: 2
                    maxItems: 2
                    x-parser-schema-id: <anonymous-schema-80>
                  x-parser-schema-id: <anonymous-schema-79>
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
                      x-parser-schema-id: <anonymous-schema-84>
                    minItems: 2
                    maxItems: 2
                    x-parser-schema-id: <anonymous-schema-83>
                  x-parser-schema-id: <anonymous-schema-82>
              x-parser-schema-id: <anonymous-schema-77>
            sending_ts_ms: &ref_5
              type: integer
              format: int64
              description: >-
                Unix timestamp in milliseconds when Kalshi queued this message
                at the network layer.
              x-parser-schema-id: sendingTimestampMs
          x-parser-schema-id: orderbookSnapshotPayload
        title: Orderbook Snapshot
        description: Complete view of the order book's aggregated price levels
        example: |-
          {
            "type": "orderbook_snapshot",
            "sending_ts_ms": 1669149841234,
            "sid": 2,
            "seq": 2,
            "msg": {
              "market_ticker": "FED-23DEC-T3.00",
              "market_id": "9b0f6b43-5b68-4f9f-9f02-9a2d1b8ac1a1",
              "clock": 4182057,
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
    extensions: &ref_6
      - id: x-parser-unique-object-id
        value: orderbook_delta
  - &ref_8
    id: receiveOrderbookDelta
    title: Orderbook Update
    description: Receive incremental orderbook changes
    type: send
    messages:
      - &ref_10
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
                    examples: *ref_0
                    required: true
                  - name: market_id
                    type: string
                    description: Unique market UUID
                    required: true
                  - name: clock
                    type: integer
                    description: >
                      Exchange clock of the latest change included in this
                      delta.

                      In real-time mode, every connection sends the same clock
                      for the same change;

                      several deltas can share a clock.

                      In conflated mode, the latest exchange clock included in
                      this price level's net delta.

                      It can decrease between messages and is not a whole-book
                      watermark or a cross-connection

                      deduplication key. Apply deltas using this subscription's
                      seq order.
                    required: true
                  - name: price_dollars
                    type: string
                    description: Price level in dollars
                    required: true
                  - name: delta_fp
                    type: string
                    description: Fixed-point contract delta (2 decimals)
                    required: true
                  - name: side
                    type: string
                    description: Market side
                    enumValues:
                      - 'yes'
                      - 'no'
                    required: true
                  - name: client_order_id
                    type: string
                    description: >
                      Optional - Present only when you caused this orderbook
                      change.

                      Contains the client_order_id of your order that triggered
                      this delta.
                    required: false
                  - name: ts
                    type: string
                    description: >-
                      Deprecated - Optional timestamp for when the orderbook
                      change was recorded (RFC3339, truncated to milliseconds).
                      Use ts_ms instead.
                    deprecated: true
                    required: false
                  - name: ts_ms
                    type: integer
                    description: >-
                      Optional - Unix timestamp for when the orderbook change
                      was recorded (in milliseconds)
                    required: false
                  - name: subaccount
                    type: integer
                    description: >
                      Optional - Present only when you caused this orderbook
                      change and are using subaccounts.

                      Contains the subaccount number of your order that
                      triggered this delta.
                    required: false
              - name: sending_ts_ms
                type: integer
                description: >-
                  Unix timestamp in milliseconds when Kalshi queued this message
                  at the network layer.
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
              x-parser-schema-id: <anonymous-schema-85>
            sid: *ref_1
            seq: *ref_2
            msg:
              type: object
              required:
                - market_ticker
                - market_id
                - clock
                - price_dollars
                - delta_fp
                - side
              properties:
                market_ticker: *ref_3
                market_id: *ref_4
                clock:
                  type: integer
                  format: int64
                  minimum: 1
                  description: >
                    Exchange clock of the latest change included in this delta.

                    In real-time mode, every connection sends the same clock for
                    the same change;

                    several deltas can share a clock.

                    In conflated mode, the latest exchange clock included in
                    this price level's net delta.

                    It can decrease between messages and is not a whole-book
                    watermark or a cross-connection

                    deduplication key. Apply deltas using this subscription's
                    seq order.
                  x-parser-schema-id: <anonymous-schema-87>
                price_dollars:
                  type: string
                  description: Price level in dollars
                  x-rust-type: common::types::Price
                  x-rust-serialize-with: ws::dto::serde_money::serialize_price_dollars
                  x-parser-schema-id: <anonymous-schema-88>
                delta_fp:
                  type: string
                  description: Fixed-point contract delta (2 decimals)
                  x-rust-type: i64
                  x-rust-serialize-with: ws::dto::serde_money::serialize_centicount_fixed_point_count
                  x-parser-schema-id: <anonymous-schema-89>
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
                  x-parser-schema-id: <anonymous-schema-90>
                ts:
                  type: string
                  deprecated: true
                  description: >-
                    Deprecated - Optional timestamp for when the orderbook
                    change was recorded (RFC3339, truncated to milliseconds).
                    Use ts_ms instead.
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-91>
                ts_ms:
                  type: integer
                  description: >-
                    Optional - Unix timestamp for when the orderbook change was
                    recorded (in milliseconds)
                  format: int64
                  x-parser-schema-id: <anonymous-schema-92>
                subaccount:
                  type: integer
                  description: >
                    Optional - Present only when you caused this orderbook
                    change and are using subaccounts.

                    Contains the subaccount number of your order that triggered
                    this delta.
                  x-parser-schema-id: <anonymous-schema-93>
              x-parser-schema-id: <anonymous-schema-86>
            sending_ts_ms: *ref_5
          x-parser-schema-id: orderbookDeltaPayload
        title: Orderbook Delta
        description: Update to be applied to the current order book view
        example: |-
          {
            "type": "orderbook_delta",
            "sending_ts_ms": 1669149841123,
            "sid": 2,
            "seq": 3,
            "msg": {
              "market_ticker": "FED-23DEC-T3.00",
              "market_id": "9b0f6b43-5b68-4f9f-9f02-9a2d1b8ac1a1",
              "clock": 4182061,
              "price_dollars": "0.9600",
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
    extensions: *ref_6
sendOperations: []
receiveOperations:
  - *ref_7
  - *ref_8
sendMessages: []
receiveMessages:
  - *ref_9
  - *ref_10
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

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.