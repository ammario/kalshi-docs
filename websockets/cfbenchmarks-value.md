---
url: https://docs.kalshi.com/websockets/cfbenchmarks-value
lastmod: 2026-06-06T21:40:59.119Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# CF Benchmarks Value Feed

> Real-time CF Benchmarks index value updates, each carrying the raw upstream frame plus trailing 60-second and quarter-hour final-minute averages. Requires authentication.

**Requirements:**
- Authentication required
- Index specification via `index_ids` (array of CF Benchmarks index IDs, for example `["BRTI", "ETHUSD_RTI"]`)
- `market_ticker`/`market_tickers`/`market_id`/`market_ids` are not supported for this channel
- You can seed `index_ids` in the initial subscribe, or subscribe first and add indices later
- Use `index_ids: ["all"]` to receive every available index
- Supports `update_subscription` with `subscribe_indices` / `unsubscribe_indices` / `indexlist` actions
- `indexlist` returns the available index IDs (as a `cfbenchmarks_value_indexlist` message) without modifying the subscription
- Ticks are emitted roughly once per second; duplicate or out-of-order upstream source timestamps are ignored

**Use case:** Consuming CF Benchmarks reference index values and their short-window averages

**Subscription workflow:**
1. Subscribe to `cfbenchmarks_value` (optionally seeding `index_ids`). A successful subscribe returns a `subscribed` response with the assigned `sid`.
2. Discover available index IDs with the `indexlist` action; the server replies with a `cfbenchmarks_value_indexlist` message.
3. Add or remove tracked index IDs with `subscribe_indices` / `unsubscribe_indices`, or use `index_ids: ["all"]` to track everything.

**Averaging semantics:**

`avg_60s_data` (always present):
- Window is trailing and per tick: `[source_ts_ms - 60000, source_ts_ms)`
- `window_size` counts prior ticks only
- If there are no prior ticks in the trailing window, the average falls back to the current tick value

`last_60s_windowed_average_15min` (present only in the final minute before quarter-hour close: `:00`, `:15`, `:30`, `:45`):
- Active accumulation window is `(quarter_close_ts_ms - 60000, quarter_close_ts_ms]`
- The start-boundary tick is excluded and the close tick is included
- This produces second-indexed counts: `:01 -> 1`, `:14 -> 14`, `:59 -> 59`, close tick (`:00/:15/:30/:45`) -> `60`
- The field is omitted outside that final-minute window

**Integration notes:**
- If you subscribe without any `index_ids`, no value events flow until you add indices or switch to `["all"]`
- `sid` identifies the subscription stream; use it for `update_subscription` and `unsubscribe`
- Missing `index_ids` for `subscribe_indices`/`unsubscribe_indices` returns an `error` with `code: 24` ("Index IDs required"); unsupported actions return a standard websocket `error`




## AsyncAPI

````yaml asyncapi.yaml cfbenchmarks_value
id: cfbenchmarks_value
title: CF Benchmarks Value Feed
description: >
  Real-time CF Benchmarks index value updates, each carrying the raw upstream
  frame plus trailing 60-second and quarter-hour final-minute averages. Requires
  authentication.


  **Requirements:**

  - Authentication required

  - Index specification via `index_ids` (array of CF Benchmarks index IDs, for
  example `["BRTI", "ETHUSD_RTI"]`)

  - `market_ticker`/`market_tickers`/`market_id`/`market_ids` are not supported
  for this channel

  - You can seed `index_ids` in the initial subscribe, or subscribe first and
  add indices later

  - Use `index_ids: ["all"]` to receive every available index

  - Supports `update_subscription` with `subscribe_indices` /
  `unsubscribe_indices` / `indexlist` actions

  - `indexlist` returns the available index IDs (as a
  `cfbenchmarks_value_indexlist` message) without modifying the subscription

  - Ticks are emitted roughly once per second; duplicate or out-of-order
  upstream source timestamps are ignored


  **Use case:** Consuming CF Benchmarks reference index values and their
  short-window averages


  **Subscription workflow:**

  1. Subscribe to `cfbenchmarks_value` (optionally seeding `index_ids`). A
  successful subscribe returns a `subscribed` response with the assigned `sid`.

  2. Discover available index IDs with the `indexlist` action; the server
  replies with a `cfbenchmarks_value_indexlist` message.

  3. Add or remove tracked index IDs with `subscribe_indices` /
  `unsubscribe_indices`, or use `index_ids: ["all"]` to track everything.


  **Averaging semantics:**


  `avg_60s_data` (always present):

  - Window is trailing and per tick: `[source_ts_ms - 60000, source_ts_ms)`

  - `window_size` counts prior ticks only

  - If there are no prior ticks in the trailing window, the average falls back
  to the current tick value


  `last_60s_windowed_average_15min` (present only in the final minute before
  quarter-hour close: `:00`, `:15`, `:30`, `:45`):

  - Active accumulation window is `(quarter_close_ts_ms - 60000,
  quarter_close_ts_ms]`

  - The start-boundary tick is excluded and the close tick is included

  - This produces second-indexed counts: `:01 -> 1`, `:14 -> 14`, `:59 -> 59`,
  close tick (`:00/:15/:30/:45`) -> `60`

  - The field is omitted outside that final-minute window


  **Integration notes:**

  - If you subscribe without any `index_ids`, no value events flow until you add
  indices or switch to `["all"]`

  - `sid` identifies the subscription stream; use it for `update_subscription`
  and `unsubscribe`

  - Missing `index_ids` for `subscribe_indices`/`unsubscribe_indices` returns an
  `error` with `code: 24` ("Index IDs required"); unsupported actions return a
  standard websocket `error`
servers:
  - id: production
    protocol: wss
    host: external-api-ws.kalshi.com
    bindings: []
    variables: []
address: cfbenchmarks_value
parameters: []
bindings: []
operations:
  - &ref_4
    id: receiveCFBenchmarksValue
    title: CF Benchmarks Value Update
    description: Receive real-time CF Benchmarks index values with trailing averages
    type: send
    messages:
      - &ref_6
        id: cfbenchmarksValue
        contentType: application/json
        payload:
          - name: CF Benchmarks Value Update
            description: >-
              Real-time CF Benchmarks index value with trailing 60-second and
              quarter-hour averages
            type: object
            properties:
              - name: type
                type: string
                description: cfbenchmarks_value
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
                  - name: received_at
                    type: integer
                    description: When Kalshi received the upstream frame (unix ms)
                    required: true
                  - name: data
                    type: string
                    description: The raw CF Benchmarks JSON frame, as a string
                    required: true
                  - name: avg_60s_data
                    type: object
                    description: Windowed-average metadata for a CF Benchmarks index value.
                    required: true
                    properties:
                      - name: value
                        type: string
                        description: >-
                          Average value over the window, formatted to 8 decimal
                          places
                        required: true
                      - name: window_size
                        type: integer
                        description: Number of ticks counted in the window
                        required: true
                      - name: window_start_ts_ms
                        type: integer
                        description: Window start boundary (unix ms)
                        required: true
                      - name: window_end_ts_exclusive
                        type: integer
                        description: Window end boundary, exclusive (unix ms)
                        required: true
                  - name: last_60s_windowed_average_15min
                    type: object
                    description: Windowed-average metadata for a CF Benchmarks index value.
                    required: false
                    properties:
                      - name: value
                        type: string
                        description: >-
                          Average value over the window, formatted to 8 decimal
                          places
                        required: true
                      - name: window_size
                        type: integer
                        description: Number of ticks counted in the window
                        required: true
                      - name: window_start_ts_ms
                        type: integer
                        description: Window start boundary (unix ms)
                        required: true
                      - name: window_end_ts_exclusive
                        type: integer
                        description: Window end boundary, exclusive (unix ms)
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
              const: cfbenchmarks_value
              x-parser-schema-id: <anonymous-schema-268>
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
                - index_id
                - received_at
                - data
                - avg_60s_data
              properties:
                index_id:
                  type: string
                  description: CF Benchmarks index ID (for example "BRTI")
                  x-parser-schema-id: <anonymous-schema-270>
                received_at:
                  type: integer
                  description: When Kalshi received the upstream frame (unix ms)
                  x-parser-schema-id: <anonymous-schema-271>
                data:
                  type: string
                  description: The raw CF Benchmarks JSON frame, as a string
                  x-parser-schema-id: <anonymous-schema-272>
                avg_60s_data: &ref_0
                  type: object
                  description: Windowed-average metadata for a CF Benchmarks index value.
                  required:
                    - value
                    - window_size
                    - window_start_ts_ms
                    - window_end_ts_exclusive
                  properties:
                    value:
                      type: string
                      description: >-
                        Average value over the window, formatted to 8 decimal
                        places
                      x-parser-schema-id: <anonymous-schema-273>
                    window_size:
                      type: integer
                      description: Number of ticks counted in the window
                      minimum: 0
                      x-parser-schema-id: <anonymous-schema-274>
                    window_start_ts_ms:
                      type: integer
                      description: Window start boundary (unix ms)
                      x-parser-schema-id: <anonymous-schema-275>
                    window_end_ts_exclusive:
                      type: integer
                      description: Window end boundary, exclusive (unix ms)
                      x-parser-schema-id: <anonymous-schema-276>
                  x-parser-schema-id: cfbenchmarksAvgData
                last_60s_windowed_average_15min: *ref_0
              x-parser-schema-id: <anonymous-schema-269>
          x-parser-schema-id: cfbenchmarksValuePayload
        title: CF Benchmarks Value Update
        description: >-
          Real-time CF Benchmarks index value with trailing 60-second and
          quarter-hour averages
        example: |-
          {
            "type": "cfbenchmarks_value",
            "sid": 1,
            "seq": 42,
            "msg": {
              "index_id": "BRTI",
              "received_at": 1710000000123,
              "data": "{\"type\":\"value\",\"id\":\"BRTI\",\"time\":1710000000123,\"value\":\"68000.12\"}",
              "avg_60s_data": {
                "value": "68000.12000000",
                "window_size": 3,
                "window_start_ts_ms": 1709999940123,
                "window_end_ts_exclusive": 1710000000123
              },
              "last_60s_windowed_average_15min": {
                "value": "68000.23000000",
                "window_size": 14,
                "window_start_ts_ms": 1709999980000,
                "window_end_ts_exclusive": 1710000000123
              }
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: cfbenchmarksValue
    bindings: []
    extensions: &ref_3
      - id: x-parser-unique-object-id
        value: cfbenchmarks_value
  - &ref_5
    id: receiveCFBenchmarksIndexList
    title: CF Benchmarks Index List
    description: >-
      Receive the set of available CF Benchmarks index IDs in response to an
      indexlist action
    type: send
    messages:
      - &ref_7
        id: cfbenchmarksIndexList
        contentType: application/json
        payload:
          - name: CF Benchmarks Index List
            description: >-
              The set of available CF Benchmarks index IDs, sent in response to
              an indexlist action
            type: object
            properties:
              - name: type
                type: string
                description: cfbenchmarks_value_indexlist
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
                    description: Available CF Benchmarks index IDs
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
              const: cfbenchmarks_value_indexlist
              x-parser-schema-id: <anonymous-schema-277>
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
            sid: *ref_1
            seq: *ref_2
            msg:
              type: object
              required:
                - index_ids
              properties:
                index_ids:
                  type: array
                  description: Available CF Benchmarks index IDs
                  items:
                    type: string
                    x-parser-schema-id: <anonymous-schema-280>
                  x-parser-schema-id: <anonymous-schema-279>
              x-parser-schema-id: <anonymous-schema-278>
          x-parser-schema-id: cfbenchmarksIndexListPayload
        title: CF Benchmarks Index List
        description: >-
          The set of available CF Benchmarks index IDs, sent in response to an
          indexlist action
        example: |-
          {
            "type": "cfbenchmarks_value_indexlist",
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
            value: cfbenchmarksIndexList
    bindings: []
    extensions: *ref_3
sendOperations: []
receiveOperations:
  - *ref_4
  - *ref_5
sendMessages: []
receiveMessages:
  - *ref_6
  - *ref_7
extensions:
  - id: x-parser-unique-object-id
    value: cfbenchmarks_value
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