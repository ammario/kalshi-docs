---
url: https://docs.kalshi.com/websockets/connection-keep-alive
lastmod: 2026-11-13T01:27:13.565Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Connection Keep-Alive

> WebSocket control frames for connection management.

Kalshi sends a Ping frame (`0x9`) with body `heartbeat` after 10 seconds without sending a data message (a JSON text frame) on the connection.
Every data message Kalshi sends, and each heartbeat Ping, restarts that 10 seconds, so a connection that is receiving data can go a long time without a Ping.
Pong frames Kalshi sends in reply to your Pings do not restart it.
Do not treat a missing Ping as a dead connection; treat the connection as idle only when neither messages nor Pings arrive.
Clients should respond with Pong frames (`0xA`). Clients may also send Ping frames to which Kalshi will respond with Pong.




## AsyncAPI

````yaml asyncapi.yaml control_frames
id: control_frames
title: Connection Keep-Alive
description: >
  WebSocket control frames for connection management.


  Kalshi sends a Ping frame (`0x9`) with body `heartbeat` after 10 seconds
  without sending a data message (a JSON text frame) on the connection.

  Every data message Kalshi sends, and each heartbeat Ping, restarts that 10
  seconds, so a connection that is receiving data can go a long time without a
  Ping.

  Pong frames Kalshi sends in reply to your Pings do not restart it.

  Do not treat a missing Ping as a dead connection; treat the connection as idle
  only when neither messages nor Pings arrive.

  Clients should respond with Pong frames (`0xA`). Clients may also send Ping
  frames to which Kalshi will respond with Pong.
servers:
  - id: production
    protocol: wss
    host: external-api-ws.kalshi.com
    bindings: []
    variables: []
address: /
parameters: []
bindings: []
operations:
  - &ref_1
    id: sendPing
    title: Send Ping
    description: Client sends Ping control frame to elicit Pong from Kalshi
    type: receive
    messages:
      - &ref_5
        id: incomingPing
        contentType: application/octet-stream
        payload:
          - type: string
            const: ''
            x-parser-schema-id: <anonymous-schema-81>
            name: Ping
            description: Client sends Ping frame (0x9) to elicit Pong from Kalshi
        headers: []
        jsonPayloadSchema:
          type: string
          const: ''
          x-parser-schema-id: <anonymous-schema-81>
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
    description: Client sends Pong control frame in response to Kalshi Ping
    type: receive
    messages:
      - &ref_6
        id: incomingPong
        contentType: application/octet-stream
        payload:
          - type: string
            const: ''
            x-parser-schema-id: <anonymous-schema-82>
            name: Pong
            description: Client replies to Ping with Pong Frame (0xA)
        headers: []
        jsonPayloadSchema:
          type: string
          const: ''
          x-parser-schema-id: <anonymous-schema-82>
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
    description: Kalshi sends Ping control frame with body 'heartbeat'
    type: send
    messages:
      - &ref_7
        id: outgoingPing
        contentType: application/octet-stream
        payload:
          - type: string
            const: heartbeat
            x-parser-schema-id: <anonymous-schema-83>
            name: Ping
            description: >-
              Kalshi sends Ping (0x9) with body 'heartbeat' to elicit Pong from
              client
        headers: []
        jsonPayloadSchema:
          type: string
          const: heartbeat
          x-parser-schema-id: <anonymous-schema-83>
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
    description: Kalshi sends Pong control frame in response to client Ping
    type: send
    messages:
      - &ref_8
        id: outgoingPong
        contentType: application/octet-stream
        payload:
          - type: string
            const: ''
            x-parser-schema-id: <anonymous-schema-84>
            name: Pong
            description: Kalshi responds to client Ping with Pong frame (0xA)
        headers: []
        jsonPayloadSchema:
          type: string
          const: ''
          x-parser-schema-id: <anonymous-schema-84>
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
    description: |
      API key authentication required for WebSocket connections.
      The API key should be provided during the WebSocket handshake.
    in: user
    extensions: []

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.