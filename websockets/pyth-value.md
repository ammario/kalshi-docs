---
url: https://docs.kalshi.com/websockets/pyth-value
lastmod: 2026-07-13T19:43:31.394Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Pyth Value Feed

> Real-time Pyth price updates for configured underlying tickers



## AsyncAPI

````yaml asyncapi.yaml pyth_value
id: pyth_value
title: Pyth Value Feed
description: >
  Real-time Pyth price updates for configured underlying tickers. Requires
  authentication.


  **Requirements:**

  - Authentication required

  - Seed `underlying_tickers` in the initial subscribe, or add them later

  - Use `underlying_tickers: ["all"]` to receive every available underlying

  - Supports `update_subscription` with `subscribe_underlyings`,
  `unsubscribe_underlyings`, and `underlying_list` actions

  - Duplicate and out-of-order source timestamps are ignored independently per
  underlying ticker


  Subscribe without `underlying_tickers` to create an empty subscription, then
  use `underlying_list`

  to discover recently streamed underlyings and `subscribe_underlyings` to
  receive prices.
servers:
  - id: production
    protocol: wss
    host: external-api-ws.kalshi.com
    bindings: []
    variables: []
address: pyth_value
parameters: []
bindings: []
operations:
  - &ref_3
    id: receivePythValue
    title: Pyth Value Update
    description: Receive deduplicated real-time Pyth prices
    type: send
    messages:
      - &ref_5
        id: pythValue
        contentType: application/json
        payload:
          - name: Pyth Value Update
            description: Deduplicated real-time Pyth price for an underlying ticker
            type: object
            properties:
              - name: type
                type: string
                description: pyth_value
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
                  - name: underlying_ticker
                    type: string
                    description: Qualified Pyth underlying ticker
                    required: true
                  - name: value_usd
                    type: string
                    description: USD value formatted to 8 decimal places
                    required: true
                  - name: source_ts_ms
                    type: integer
                    description: Pyth source timestamp (unix ms)
                    required: true
                  - name: received_at
                    type: integer
                    description: When Kalshi received the Pyth update (unix ms)
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
              const: pyth_value
              x-parser-schema-id: <anonymous-schema-292>
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
                - underlying_ticker
                - value_usd
                - source_ts_ms
                - received_at
              properties:
                underlying_ticker:
                  type: string
                  description: Qualified Pyth underlying ticker
                  x-parser-schema-id: <anonymous-schema-294>
                value_usd:
                  type: string
                  description: USD value formatted to 8 decimal places
                  x-parser-schema-id: <anonymous-schema-295>
                source_ts_ms:
                  type: integer
                  description: Pyth source timestamp (unix ms)
                  x-parser-schema-id: <anonymous-schema-296>
                received_at:
                  type: integer
                  description: When Kalshi received the Pyth update (unix ms)
                  x-parser-schema-id: <anonymous-schema-297>
              x-parser-schema-id: <anonymous-schema-293>
          x-parser-schema-id: pythValuePayload
        title: Pyth Value Update
        description: Deduplicated real-time Pyth price for an underlying ticker
        example: |-
          {
            "type": "pyth_value",
            "sid": 1,
            "seq": 42,
            "msg": {
              "underlying_ticker": "Metal.XAU/USD",
              "value_usd": "2365.12345000",
              "source_ts_ms": 1710000000100,
              "received_at": 1710000000123
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: pythValue
    bindings: []
    extensions: &ref_2
      - id: x-parser-unique-object-id
        value: pyth_value
  - &ref_4
    id: receivePythUnderlyingList
    title: Pyth Underlying List
    description: Receive recently streamed Pyth underlying tickers
    type: send
    messages:
      - &ref_6
        id: pythUnderlyingList
        contentType: application/json
        payload:
          - name: Pyth Underlying List
            description: Recently streamed Pyth underlying tickers
            type: object
            properties:
              - name: type
                type: string
                description: pyth_value_underlying_list
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
                  - name: underlying_tickers
                    type: array
                    description: >-
                      Underlying tickers observed on the Pyth stream in the last
                      two hours
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
              const: pyth_value_underlying_list
              x-parser-schema-id: <anonymous-schema-298>
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
                - underlying_tickers
              properties:
                underlying_tickers:
                  type: array
                  description: >-
                    Underlying tickers observed on the Pyth stream in the last
                    two hours
                  items:
                    type: string
                    x-parser-schema-id: <anonymous-schema-301>
                  x-parser-schema-id: <anonymous-schema-300>
              x-parser-schema-id: <anonymous-schema-299>
          x-parser-schema-id: pythUnderlyingListPayload
        title: Pyth Underlying List
        description: Recently streamed Pyth underlying tickers
        example: |-
          {
            "type": "pyth_value_underlying_list",
            "id": 2,
            "sid": 1,
            "seq": 1,
            "msg": {
              "underlying_tickers": [
                "Metal.XAG/USD",
                "Metal.XAU/USD"
              ]
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: pythUnderlyingList
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
    value: pyth_value
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