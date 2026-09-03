---
url: https://docs.kalshi.com/websockets/cfbenchmarks-value-5hz
lastmod: 2026-09-02T16:22:58.458Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# CF Benchmarks 5Hz Value Feed

> Real-time CF Benchmarks index value updates at up to 5 updates per second, each carrying the raw upstream frame plus parsed value fields. Requires authentication.

This is the high-frequency sibling of the once-per-second [`cfbenchmarks_value`](/websockets/cfbenchmarks-value) channel. It carries the indices CF Benchmarks publishes at 200ms granularity (currently `BRTI`, `ETHUSD_RTI`, `SOLUSD_RTI`, `XRPUSD_RTI`, and `DOGEUSD_RTI`); all other indices remain available on `cfbenchmarks_value` only. Messages are lean raw ticks — they do not include the 60-second or quarter-hour averages, which stay on the per-second channel.

**Requirements:**
- Authentication required
- Index specification via `index_ids` (array of CF Benchmarks index IDs, for example `["BRTI", "ETHUSD_RTI"]`)
- `market_ticker`/`market_tickers`/`market_id`/`market_ids` are not supported for this channel
- You can seed `index_ids` in the initial subscribe, or subscribe first and add indices later
- Use `index_ids: ["all"]` to receive every index available on this channel
- Supports `update_subscription` with `subscribe_indices` / `unsubscribe_indices` / `indexlist` actions
- `indexlist` returns the index IDs recently observed on this channel's stream (as a `cfbenchmarks_value_5hz_indexlist` message) without modifying the subscription
- Up to 5 ticks per second per index; duplicate or out-of-order upstream source timestamps are ignored

**Use case:** Consuming CF Benchmarks reference index values at the vendor's full publication rate

**Subscription workflow:**
1. Subscribe to `cfbenchmarks_value_5hz` (optionally seeding `index_ids`). A successful subscribe returns a `subscribed` response with the assigned `sid`.
2. Discover the streaming index IDs with the `indexlist` action; the server replies with a `cfbenchmarks_value_5hz_indexlist` message.
3. Add or remove tracked index IDs with `subscribe_indices` / `unsubscribe_indices`, or use `index_ids: ["all"]` to track everything on this channel.

**Integration notes:**
- If you subscribe without any `index_ids`, no value events flow until you add indices or switch to `["all"]`
- `sid` identifies the subscription stream; use it for `update_subscription` and `unsubscribe`
- Missing `index_ids` for `subscribe_indices`/`unsubscribe_indices` returns an `error` with `code: 24` ("Index IDs required"); unsupported actions return a standard websocket `error`
- Historical index values — including intra-second granularity — are available over REST via the [CF Benchmarks REST Passthrough](/cfbenchmarks/rest-passthrough)




## AsyncAPI

````yaml asyncapi.yaml cfbenchmarks_value_5hz
id: cfbenchmarks_value_5hz
title: CF Benchmarks 5Hz Value Feed
description: >
  Real-time CF Benchmarks index value updates at up to 5 updates per second,
  each carrying the raw upstream frame plus parsed value fields. Requires
  authentication.


  This is the high-frequency sibling of the once-per-second
  [`cfbenchmarks_value`](/websockets/cfbenchmarks-value) channel. It carries the
  indices CF Benchmarks publishes at 200ms granularity (currently `BRTI`,
  `ETHUSD_RTI`, `SOLUSD_RTI`, `XRPUSD_RTI`, and `DOGEUSD_RTI`); all other
  indices remain available on `cfbenchmarks_value` only. Messages are lean raw
  ticks — they do not include the 60-second or quarter-hour averages, which stay
  on the per-second channel.


  **Requirements:**

  - Authentication required

  - Index specification via `index_ids` (array of CF Benchmarks index IDs, for
  example `["BRTI", "ETHUSD_RTI"]`)

  - `market_ticker`/`market_tickers`/`market_id`/`market_ids` are not supported
  for this channel

  - You can seed `index_ids` in the initial subscribe, or subscribe first and
  add indices later

  - Use `index_ids: ["all"]` to receive every index available on this channel

  - Supports `update_subscription` with `subscribe_indices` /
  `unsubscribe_indices` / `indexlist` actions

  - `indexlist` returns the index IDs recently observed on this channel's stream
  (as a `cfbenchmarks_value_5hz_indexlist` message) without modifying the
  subscription

  - Up to 5 ticks per second per index; duplicate or out-of-order upstream
  source timestamps are ignored


  **Use case:** Consuming CF Benchmarks reference index values at the vendor's
  full publication rate


  **Subscription workflow:**

  1. Subscribe to `cfbenchmarks_value_5hz` (optionally seeding `index_ids`). A
  successful subscribe returns a `subscribed` response with the assigned `sid`.

  2. Discover the streaming index IDs with the `indexlist` action; the server
  replies with a `cfbenchmarks_value_5hz_indexlist` message.

  3. Add or remove tracked index IDs with `subscribe_indices` /
  `unsubscribe_indices`, or use `index_ids: ["all"]` to track everything on this
  channel.


  **Integration notes:**

  - If you subscribe without any `index_ids`, no value events flow until you add
  indices or switch to `["all"]`

  - `sid` identifies the subscription stream; use it for `update_subscription`
  and `unsubscribe`

  - Missing `index_ids` for `subscribe_indices`/`unsubscribe_indices` returns an
  `error` with `code: 24` ("Index IDs required"); unsupported actions return a
  standard websocket `error`

  - Historical index values — including intra-second granularity — are available
  over REST via the [CF Benchmarks REST
  Passthrough](/cfbenchmarks/rest-passthrough)
servers:
  - id: production
    protocol: wss
    host: external-api-ws.kalshi.com
    bindings: []
    variables: []
address: cfbenchmarks_value_5hz
parameters: []
bindings: []
operations:
  - &ref_3
    id: receiveCFBenchmarksValue5Hz
    title: CF Benchmarks 5Hz Value Update
    description: Receive real-time CF Benchmarks index values at up to 5 updates per second
    type: send
    messages:
      - &ref_5
        id: cfbenchmarksValue5Hz
        contentType: application/json
        payload:
          - name: CF Benchmarks 5Hz Value Update
            description: Real-time CF Benchmarks index value at up to 5 updates per second
            type: object
            properties:
              - name: type
                type: string
                description: cfbenchmarks_value_5hz
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
                  - name: index_id
                    type: string
                    description: CF Benchmarks index ID (for example "BRTI")
                    required: true
                  - name: value_usd
                    type: string
                    description: >-
                      Index value in USD, formatted with exactly 8 decimal
                      places
                    required: true
                  - name: source_ts_ms
                    type: integer
                    description: Upstream publication timestamp of the tick (unix ms)
                    required: true
                  - name: received_at
                    type: integer
                    description: When Kalshi received the upstream frame (unix ms)
                    required: true
                  - name: data
                    type: string
                    description: The raw CF Benchmarks JSON frame, as a string
                    required: true
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
              const: cfbenchmarks_value_5hz
              x-parser-schema-id: <anonymous-schema-293>
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
                - index_id
                - value_usd
                - source_ts_ms
                - received_at
                - data
              properties:
                index_id:
                  type: string
                  description: CF Benchmarks index ID (for example "BRTI")
                  x-parser-schema-id: <anonymous-schema-295>
                value_usd:
                  type: string
                  description: Index value in USD, formatted with exactly 8 decimal places
                  x-parser-schema-id: <anonymous-schema-296>
                source_ts_ms:
                  type: integer
                  description: Upstream publication timestamp of the tick (unix ms)
                  x-parser-schema-id: <anonymous-schema-297>
                received_at:
                  type: integer
                  description: When Kalshi received the upstream frame (unix ms)
                  x-parser-schema-id: <anonymous-schema-298>
                data:
                  type: string
                  description: The raw CF Benchmarks JSON frame, as a string
                  x-parser-schema-id: <anonymous-schema-299>
              x-parser-schema-id: <anonymous-schema-294>
          x-parser-schema-id: cfbenchmarksValue5HzPayload
        title: CF Benchmarks 5Hz Value Update
        description: Real-time CF Benchmarks index value at up to 5 updates per second
        example: |-
          {
            "type": "cfbenchmarks_value_5hz",
            "sid": 1,
            "seq": 42,
            "msg": {
              "index_id": "BRTI",
              "value_usd": "68000.12000000",
              "source_ts_ms": 1710000000323,
              "received_at": 1710000000341,
              "data": "{\"type\":\"value\",\"id\":\"BRTI\",\"time\":1710000000323,\"value\":\"68000.12\"}"
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: cfbenchmarksValue5Hz
    bindings: []
    extensions: &ref_2
      - id: x-parser-unique-object-id
        value: cfbenchmarks_value_5hz
  - &ref_4
    id: receiveCFBenchmarks5HzIndexList
    title: CF Benchmarks 5Hz Index List
    description: >-
      Receive the index IDs streaming on the 5Hz channel in response to an
      indexlist action
    type: send
    messages:
      - &ref_6
        id: cfbenchmarks5HzIndexList
        contentType: application/json
        payload:
          - name: CF Benchmarks 5Hz Index List
            description: >-
              The index IDs recently observed on the 5Hz stream, sent in
              response to an indexlist action
            type: object
            properties:
              - name: type
                type: string
                description: cfbenchmarks_value_5hz_indexlist
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
                  - name: index_ids
                    type: array
                    description: Index IDs recently observed on the 5Hz stream
                    required: true
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
              const: cfbenchmarks_value_5hz_indexlist
              x-parser-schema-id: <anonymous-schema-300>
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
            sid: *ref_0
            seq: *ref_1
            msg:
              type: object
              required:
                - index_ids
              properties:
                index_ids:
                  type: array
                  description: Index IDs recently observed on the 5Hz stream
                  items:
                    type: string
                    x-parser-schema-id: <anonymous-schema-303>
                  x-parser-schema-id: <anonymous-schema-302>
              x-parser-schema-id: <anonymous-schema-301>
          x-parser-schema-id: cfbenchmarks5HzIndexListPayload
        title: CF Benchmarks 5Hz Index List
        description: >-
          The index IDs recently observed on the 5Hz stream, sent in response to
          an indexlist action
        example: |-
          {
            "type": "cfbenchmarks_value_5hz_indexlist",
            "id": 2,
            "sid": 1,
            "seq": 1,
            "msg": {
              "index_ids": [
                "BRTI",
                "ETHUSD_RTI"
              ]
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: cfbenchmarks5HzIndexList
    bindings: []
    extensions: *ref_2
sendOperations: []
receiveOperations:
  - *ref_3
  - *ref_4
sendMessages: []
receiveMessages:
  - *ref_5
  - *ref_6
extensions:
  - id: x-parser-unique-object-id
    value: cfbenchmarks_value_5hz
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