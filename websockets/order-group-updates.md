---
url: https://docs.kalshi.com/websockets/order-group-updates
lastmod: 2026-02-19T08:36:34.336Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Order Group Updates

> Real-time order group lifecycle and limit updates. Requires authentication.

**Requirements:**
- Authentication required
- Market specification ignored
- Updates sent when order groups are created, triggered, reset, deleted, or have limits updated

**Use case:** Tracking order group lifecycle and limits




## AsyncAPI

````yaml asyncapi.yaml order_group_updates
id: order_group_updates
title: Order Group Updates
description: >
  Real-time order group lifecycle and limit updates. Requires authentication.


  **Requirements:**

  - Authentication required

  - Market specification ignored

  - Updates sent when order groups are created, triggered, reset, deleted, or
  have limits updated


  **Use case:** Tracking order group lifecycle and limits
servers:
  - id: production
    protocol: wss
    host: api.elections.kalshi.com
    bindings: []
    variables: []
address: order_group_updates
parameters: []
bindings: []
operations:
  - &ref_0
    id: receiveOrderGroupUpdates
    title: Order Group Updates
    description: Receive order group lifecycle and limit updates
    type: send
    messages:
      - &ref_1
        id: orderGroupUpdates
        contentType: application/json
        payload:
          - name: Order Group Updates
            description: Order group lifecycle and limit updates for authenticated user
            type: object
            properties:
              - name: type
                type: string
                description: order_group_updates
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
                  - name: event_type
                    type: string
                    description: Order group event type
                    required: false
                  - name: order_group_id
                    type: string
                    description: Order group identifier
                    required: false
                  - name: contracts_limit_fp
                    type: string
                    description: >-
                      Updated contracts limit in fixed-point (2 decimals).
                      Present for "created" and "limit_updated" events only.
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
              const: order_group_updates
              x-parser-schema-id: <anonymous-schema-253>
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
                - event_type
                - order_group_id
              properties:
                event_type:
                  type: string
                  description: Order group event type
                  enum:
                    - created
                    - triggered
                    - reset
                    - deleted
                    - limit_updated
                  x-parser-schema-id: <anonymous-schema-255>
                order_group_id:
                  type: string
                  description: Order group identifier
                  x-parser-schema-id: <anonymous-schema-256>
                contracts_limit_fp:
                  type: string
                  description: >-
                    Updated contracts limit in fixed-point (2 decimals). Present
                    for "created" and "limit_updated" events only.
                  x-parser-schema-id: <anonymous-schema-257>
              x-parser-schema-id: <anonymous-schema-254>
          x-parser-schema-id: orderGroupUpdatesPayload
        title: Order Group Updates
        description: Order group lifecycle and limit updates for authenticated user
        example: |-
          {
            "type": "order_group_updates",
            "sid": 21,
            "seq": 7,
            "msg": {
              "event_type": "limit_updated",
              "order_group_id": "og_123",
              "contracts_limit_fp": "150.00"
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: orderGroupUpdates
    bindings: []
    extensions:
      - id: x-parser-unique-object-id
        value: order_group_updates
sendOperations: []
receiveOperations:
  - *ref_0
sendMessages: []
receiveMessages:
  - *ref_1
extensions:
  - id: x-parser-unique-object-id
    value: order_group_updates
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