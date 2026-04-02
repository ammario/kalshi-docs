---
url: https://docs.kalshi.com/websockets/multivariate-lookups
lastmod: 2026-04-01T19:37:58.918Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Multivariate Lookups

> Multivariate collection lookup notifications.

**Requirements:**
- No additional channel-level authentication beyond the authenticated WebSocket connection
- No filtering parameters; subscription is global

**Use case:** Tracking multivariate market relationships




## AsyncAPI

````yaml asyncapi.yaml multivariate
id: multivariate
title: Multivariate Lookups
description: >
  Multivariate collection lookup notifications.


  **Requirements:**

  - No additional channel-level authentication beyond the authenticated
  WebSocket connection

  - No filtering parameters; subscription is global


  **Use case:** Tracking multivariate market relationships
servers:
  - id: production
    protocol: wss
    host: api.elections.kalshi.com
    bindings: []
    variables: []
address: multivariate
parameters: []
bindings: []
operations:
  - &ref_0
    id: receiveMultivariateLookup
    title: Multivariate Lookup
    description: Receive multivariate collection lookup notifications
    type: send
    messages:
      - &ref_1
        id: multivariateLookup
        contentType: application/json
        payload:
          - name: Multivariate Lookup
            description: Multivariate collection lookup notification
            type: object
            properties:
              - name: type
                type: string
                description: multivariate_lookup
                required: true
              - name: sid
                type: integer
                description: >-
                  Server-generated subscription identifier (sid) used to
                  identify the channel
                required: true
              - name: msg
                type: object
                required: true
                properties:
                  - name: collection_ticker
                    type: string
                    required: false
                  - name: event_ticker
                    type: string
                    required: false
                  - name: market_ticker
                    type: string
                    required: false
                  - name: selected_markets
                    type: array
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          required:
            - type
            - sid
            - msg
          properties:
            type:
              type: string
              const: multivariate_lookup
              x-parser-schema-id: <anonymous-schema-143>
            sid:
              type: integer
              description: >-
                Server-generated subscription identifier (sid) used to identify
                the channel
              minimum: 1
              x-parser-schema-id: subscriptionId
            msg:
              type: object
              required:
                - collection_ticker
                - event_ticker
                - market_ticker
                - selected_markets
              properties:
                collection_ticker:
                  type: string
                  x-parser-schema-id: <anonymous-schema-145>
                event_ticker:
                  type: string
                  x-parser-schema-id: <anonymous-schema-146>
                market_ticker:
                  type: string
                  x-parser-schema-id: <anonymous-schema-147>
                selected_markets:
                  type: array
                  items:
                    type: object
                    required:
                      - event_ticker
                      - market_ticker
                      - side
                    properties:
                      event_ticker:
                        type: string
                        x-parser-schema-id: <anonymous-schema-150>
                      market_ticker:
                        type: string
                        x-parser-schema-id: <anonymous-schema-151>
                      side:
                        type: string
                        description: Market side
                        enum:
                          - 'yes'
                          - 'no'
                        x-parser-schema-id: marketSide
                    x-parser-schema-id: <anonymous-schema-149>
                  x-parser-schema-id: <anonymous-schema-148>
              x-parser-schema-id: <anonymous-schema-144>
          x-parser-schema-id: multivariateLookupPayload
        title: Multivariate Lookup
        description: Multivariate collection lookup notification
        example: |-
          {
            "type": "multivariate_lookup",
            "sid": 13,
            "msg": {
              "collection_ticker": "KXOSCARWINNERS-25",
              "event_ticker": "KXOSCARWINNERS-25C0CE5",
              "market_ticker": "KXOSCARWINNERS-25C0CE5-36353",
              "selected_markets": [
                {
                  "event_ticker": "KXOSCARACTO-25",
                  "market_ticker": "KXOSCARACTO-25-AB",
                  "side": "yes"
                },
                {
                  "event_ticker": "KXOSCARACTR-25",
                  "market_ticker": "KXOSCARACTR-25-DM",
                  "side": "yes"
                }
              ]
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: multivariateLookup
    bindings: []
    extensions:
      - id: x-parser-unique-object-id
        value: multivariate
sendOperations: []
receiveOperations:
  - *ref_0
sendMessages: []
receiveMessages:
  - *ref_1
extensions:
  - id: x-parser-unique-object-id
    value: multivariate
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

Built with [Mintlify](https://mintlify.com).