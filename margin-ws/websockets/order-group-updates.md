---
url: https://docs.kalshi.com/margin-ws/websockets/order-group-updates
lastmod: 2026-05-31T16:40:04.239Z
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

````yaml perps_asyncapi.yaml order_group_updates
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
    host: external-api-margin-ws.kalshi.com
    bindings: []
    variables: []
  - id: demo
    protocol: wss
    host: external-api-margin-ws.demo.kalshi.co
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
                  - name: event_type
                    type: string
                    description: Order group event type
                    enumValues:
                      - created
                      - triggered
                      - reset
                      - deleted
                      - limit_updated
                    required: true
                  - name: order_group_id
                    type: string
                    description: Order group identifier
                    required: true
                  - name: contracts_limit_fp
                    type: string
                    description: >-
                      Updated contracts limit in fixed-point (2 decimals).
                      Present for "created" and "limit_updated" events only.
                    required: false
                  - name: ts_ms
                    type: integer
                    description: >-
                      Matching engine timestamp at which the event was
                      processed, as Unix epoch milliseconds.
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
              const: order_group_updates
              x-parser-schema-id: <anonymous-schema-104>
            sid:
              type: integer
              minimum: 1
              description: Server-generated subscription identifier
              x-parser-schema-id: subscriptionId
            seq:
              type: integer
              minimum: 1
              description: Sequence number used for snapshot/delta consistency
              x-parser-schema-id: sequenceNumber
            msg:
              type: object
              required:
                - event_type
                - order_group_id
                - ts_ms
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
                  x-parser-schema-id: <anonymous-schema-106>
                order_group_id:
                  type: string
                  description: Order group identifier
                  x-parser-schema-id: <anonymous-schema-107>
                contracts_limit_fp:
                  type: string
                  description: >-
                    Updated contracts limit in fixed-point (2 decimals). Present
                    for "created" and "limit_updated" events only.
                  x-parser-schema-id: <anonymous-schema-108>
                ts_ms:
                  type: integer
                  format: int64
                  description: >-
                    Matching engine timestamp at which the event was processed,
                    as Unix epoch milliseconds.
                  x-parser-schema-id: <anonymous-schema-109>
              x-parser-schema-id: <anonymous-schema-105>
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
    description: API key authentication required for margin WebSocket connections.
    in: user
    extensions: []

````