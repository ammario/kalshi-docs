---
url: https://docs.kalshi.com/margin-ws/websockets/market-lifecycle
lastmod: 2026-10-26T14:48:36.827Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Market Lifecycle

> Market deactivation and activation notifications.

Requirements:
- no additional channel-level auth beyond the authenticated WebSocket connection
- receives every margin market; `market_ticker` filters are not supported




## AsyncAPI

````yaml perps_asyncapi.yaml market_lifecycle_v2
id: market_lifecycle_v2
title: Market Lifecycle
description: >
  Market deactivation and activation notifications.


  Requirements:

  - no additional channel-level auth beyond the authenticated WebSocket
  connection

  - receives every margin market; `market_ticker` filters are not supported
servers:
  - id: production
    protocol: wss
    host: external-api-margin-ws.kalshi.com
    bindings: []
    variables: []
  - id: demo
    protocol: wss
    host: external-api-margin-ws.demo.kalshi.co
    bindings: []
    variables: []
address: market_lifecycle_v2
parameters: []
bindings: []
operations:
  - &ref_0
    id: receiveMarketLifecycleV2
    title: Market Lifecycle Event
    description: Receive market deactivation and activation notifications
    type: send
    messages:
      - &ref_1
        id: marketLifecycleV2
        contentType: application/json
        payload:
          - name: Market Lifecycle V2
            description: Market deactivated or activated
            type: object
            properties:
              - name: type
                type: string
                description: market_lifecycle_v2
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
                    required: true
                  - name: event_type
                    type: string
                    enumValues:
                      - activated
                      - deactivated
                    required: true
                  - name: is_deactivated
                    type: boolean
                    description: Whether trading on the market is paused.
                    required: true
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
              const: market_lifecycle_v2
              x-parser-schema-id: <anonymous-schema-70>
            sid:
              type: integer
              description: >-
                Server-generated subscription identifier (sid) used to identify
                the channel
              minimum: 1
              x-parser-schema-id: subscriptionId
            seq:
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
                - event_type
                - is_deactivated
              properties:
                market_ticker:
                  type: string
                  description: Unique market identifier
                  x-parser-schema-id: marketTicker
                event_type:
                  type: string
                  enum:
                    - activated
                    - deactivated
                  x-parser-schema-id: <anonymous-schema-72>
                is_deactivated:
                  type: boolean
                  description: Whether trading on the market is paused.
                  x-parser-schema-id: <anonymous-schema-73>
              x-parser-schema-id: <anonymous-schema-71>
            sending_ts_ms:
              type: integer
              format: int64
              description: >-
                Unix timestamp in milliseconds when Kalshi queued this message
                at the network layer.
              x-parser-schema-id: sendingTimestampMs
          x-parser-schema-id: marginMarketLifecycleV2Payload
        title: Market Lifecycle V2
        description: Market deactivated or activated
        example: |-
          {
            "type": "market_lifecycle_v2",
            "sending_ts_ms": 1792000000150,
            "sid": 13,
            "seq": 4,
            "msg": {
              "market_ticker": "KXBTCPERP",
              "event_type": "deactivated",
              "is_deactivated": true
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: marketLifecycleV2
    bindings: []
    extensions:
      - id: x-parser-unique-object-id
        value: market_lifecycle_v2
sendOperations: []
receiveOperations:
  - *ref_0
sendMessages: []
receiveMessages:
  - *ref_1
extensions:
  - id: x-parser-unique-object-id
    value: market_lifecycle_v2
securitySchemes:
  - id: apiKey
    name: apiKey
    type: apiKey
    description: API key authentication required for margin WebSocket connections.
    in: user
    extensions: []

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.