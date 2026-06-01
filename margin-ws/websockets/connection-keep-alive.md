---
url: https://docs.kalshi.com/margin-ws/websockets/connection-keep-alive
lastmod: 2026-05-31T16:40:03.856Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Connection Keep-Alive

> Kalshi sends Ping frames every 10 seconds with body `heartbeat`.
Clients should respond with Pong frames.




## AsyncAPI

````yaml perps_asyncapi.yaml control_frames
id: control_frames
title: Connection Keep-Alive
description: |
  Kalshi sends Ping frames every 10 seconds with body `heartbeat`.
  Clients should respond with Pong frames.
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
address: /
parameters: []
bindings: []
operations:
  - &ref_1
    id: sendPing
    title: Send Ping
    type: receive
    messages:
      - &ref_5
        id: incomingPing
        contentType: application/octet-stream
        payload:
          - type: string
            const: ''
            x-parser-schema-id: <anonymous-schema-36>
            name: Ping
            description: Client sends Ping frame (0x9) to elicit Pong from Kalshi
        headers: []
        jsonPayloadSchema:
          type: string
          const: ''
          x-parser-schema-id: <anonymous-schema-36>
        title: Ping
        description: Client sends Ping frame (0x9) to elicit Pong from Kalshi
        example: '""'
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: incomingPing
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: control_frames
  - &ref_2
    id: sendPong
    title: Send Pong
    type: receive
    messages:
      - &ref_6
        id: incomingPong
        contentType: application/octet-stream
        payload:
          - type: string
            const: ''
            x-parser-schema-id: <anonymous-schema-37>
            name: Pong
            description: Client replies to Ping with Pong Frame (0xA)
        headers: []
        jsonPayloadSchema:
          type: string
          const: ''
          x-parser-schema-id: <anonymous-schema-37>
        title: Pong
        description: Client replies to Ping with Pong Frame (0xA)
        example: '""'
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: incomingPong
    bindings: []
    extensions: *ref_0
  - &ref_3
    id: receivePing
    title: Receive Ping
    type: send
    messages:
      - &ref_7
        id: outgoingPing
        contentType: application/octet-stream
        payload:
          - type: string
            const: heartbeat
            x-parser-schema-id: <anonymous-schema-38>
            name: Ping
            description: >-
              Kalshi sends Ping (0x9) with body 'heartbeat' to elicit Pong from
              client
        headers: []
        jsonPayloadSchema:
          type: string
          const: heartbeat
          x-parser-schema-id: <anonymous-schema-38>
        title: Ping
        description: >-
          Kalshi sends Ping (0x9) with body 'heartbeat' to elicit Pong from
          client
        example: '"heartbeat"'
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: outgoingPing
    bindings: []
    extensions: *ref_0
  - &ref_4
    id: receivePong
    title: Receive Pong
    type: send
    messages:
      - &ref_8
        id: outgoingPong
        contentType: application/octet-stream
        payload:
          - type: string
            const: ''
            x-parser-schema-id: <anonymous-schema-39>
            name: Pong
            description: Kalshi responds to client Ping with Pong frame (0xA)
        headers: []
        jsonPayloadSchema:
          type: string
          const: ''
          x-parser-schema-id: <anonymous-schema-39>
        title: Pong
        description: Kalshi responds to client Ping with Pong frame (0xA)
        example: '""'
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: outgoingPong
    bindings: []
    extensions: *ref_0
sendOperations:
  - *ref_1
  - *ref_2
receiveOperations:
  - *ref_3
  - *ref_4
sendMessages:
  - *ref_5
  - *ref_6
receiveMessages:
  - *ref_7
  - *ref_8
extensions:
  - id: x-parser-unique-object-id
    value: control_frames
securitySchemes:
  - id: apiKey
    name: apiKey
    type: apiKey
    description: API key authentication required for margin WebSocket connections.
    in: user
    extensions: []

````