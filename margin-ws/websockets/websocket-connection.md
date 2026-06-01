---
url: https://docs.kalshi.com/margin-ws/websockets/websocket-connection
lastmod: 2026-05-31T16:40:03.791Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# WebSocket Connection

> Main WebSocket connection endpoint.
Authentication is required during the WebSocket handshake.




## AsyncAPI

````yaml perps_asyncapi.yaml root
id: root
title: WebSocket Connection
description: |
  Main WebSocket connection endpoint.
  Authentication is required during the WebSocket handshake.
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
bindings:
  - protocol: ws
    version: latest
    value:
      method: GET
    schemaProperties:
      - name: method
        type: string
        description: GET
        required: false
operations:
  - &ref_6
    id: sendSubscribe
    title: Subscribe to Channels
    type: receive
    messages:
      - &ref_17
        id: subscribeCommand
        contentType: application/json
        payload:
          - name: Subscribe Command
            description: Subscribe to one or more margin channels
            type: object
            properties:
              - name: id
                type: integer
                description: Unique ID of a command within a WebSocket session
                required: true
              - name: cmd
                type: string
                description: subscribe
                required: true
              - name: params
                type: object
                required: true
                properties:
                  - name: channels
                    type: array
                    required: true
                    properties:
                      - name: item
                        type: string
                        enumValues:
                          - orderbook_delta
                          - ticker
                          - trade
                          - fill
                          - user_orders
                          - order_group_updates
                        required: false
                  - name: market_ticker
                    type: string
                    required: false
                  - name: market_tickers
                    type: array
                    required: false
                    properties:
                      - name: item
                        type: string
                        description: Unique market identifier
                        required: false
                  - name: send_initial_snapshot
                    type: boolean
                    description: Sends an initial snapshot for ticker subscriptions.
                    required: false
                  - name: skip_ticker_ack
                    type: boolean
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          required:
            - id
            - cmd
            - params
          properties:
            id: &ref_0
              type: integer
              minimum: 0
              description: Unique ID of a command within a WebSocket session
              x-parser-schema-id: commandId
            cmd:
              type: string
              const: subscribe
              x-parser-schema-id: <anonymous-schema-1>
            params:
              type: object
              required:
                - channels
              properties:
                channels:
                  type: array
                  minItems: 1
                  items:
                    type: string
                    enum:
                      - orderbook_delta
                      - ticker
                      - trade
                      - fill
                      - user_orders
                      - order_group_updates
                    x-parser-schema-id: <anonymous-schema-4>
                  x-parser-schema-id: <anonymous-schema-3>
                market_ticker:
                  type: string
                  x-parser-schema-id: <anonymous-schema-5>
                market_tickers:
                  type: array
                  items: &ref_3
                    type: string
                    description: Unique market identifier
                    x-parser-schema-id: marketTicker
                  minItems: 1
                  x-parser-schema-id: <anonymous-schema-6>
                send_initial_snapshot:
                  type: boolean
                  description: Sends an initial snapshot for ticker subscriptions.
                  default: false
                  x-parser-schema-id: <anonymous-schema-7>
                skip_ticker_ack:
                  type: boolean
                  default: false
                  x-parser-schema-id: <anonymous-schema-8>
              x-parser-schema-id: <anonymous-schema-2>
          x-parser-schema-id: subscribeCommandPayload
        title: Subscribe Command
        description: Subscribe to one or more margin channels
        example: No examples found
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: subscribeCommand
    bindings: []
    extensions: &ref_1
      - id: x-parser-unique-object-id
        value: root
  - &ref_7
    id: sendUnsubscribe
    title: Unsubscribe from Channels
    type: receive
    messages:
      - &ref_18
        id: unsubscribeCommand
        contentType: application/json
        payload:
          - name: Unsubscribe Command
            description: Cancel one or more subscriptions
            type: object
            properties:
              - name: id
                type: integer
                description: Unique ID of a command within a WebSocket session
                required: true
              - name: cmd
                type: string
                description: unsubscribe
                required: true
              - name: params
                type: object
                required: true
                properties:
                  - name: sids
                    type: array
                    required: true
                    properties:
                      - name: item
                        type: integer
                        description: Server-generated subscription identifier
                        required: false
        headers: []
        jsonPayloadSchema:
          type: object
          required:
            - id
            - cmd
            - params
          properties:
            id: *ref_0
            cmd:
              type: string
              const: unsubscribe
              x-parser-schema-id: <anonymous-schema-9>
            params:
              type: object
              required:
                - sids
              properties:
                sids:
                  type: array
                  items: &ref_2
                    type: integer
                    minimum: 1
                    description: Server-generated subscription identifier
                    x-parser-schema-id: subscriptionId
                  minItems: 1
                  x-parser-schema-id: <anonymous-schema-11>
              x-parser-schema-id: <anonymous-schema-10>
          x-parser-schema-id: unsubscribeCommandPayload
        title: Unsubscribe Command
        description: Cancel one or more subscriptions
        example: No examples found
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: unsubscribeCommand
    bindings: []
    extensions: *ref_1
  - &ref_8
    id: sendListSubscriptions
    title: List Subscriptions
    type: receive
    messages:
      - &ref_19
        id: listSubscriptionsCommand
        contentType: application/json
        payload:
          - name: List Subscriptions Command
            description: List all active subscriptions
            type: object
            properties:
              - name: id
                type: integer
                description: Unique ID of a command within a WebSocket session
                required: true
              - name: cmd
                type: string
                description: list_subscriptions
                required: true
        headers: []
        jsonPayloadSchema:
          type: object
          required:
            - id
            - cmd
          properties:
            id: *ref_0
            cmd:
              type: string
              const: list_subscriptions
              x-parser-schema-id: <anonymous-schema-19>
          x-parser-schema-id: listSubscriptionsCommandPayload
        title: List Subscriptions Command
        description: List all active subscriptions
        example: |-
          {
            "id": 123,
            "cmd": "<string>"
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: listSubscriptionsCommand
    bindings: []
    extensions: *ref_1
  - &ref_9
    id: sendUpdateSubscription
    title: Update Subscription - Add Markets
    type: receive
    messages:
      - &ref_20
        id: updateSubscriptionCommand
        contentType: application/json
        payload:
          - name: Update Subscription - Add Markets
            description: Add markets to an existing subscription
            type: object
            properties:
              - name: id
                type: integer
                description: Unique ID of a command within a WebSocket session
                required: true
              - name: cmd
                type: string
                description: update_subscription
                required: true
              - name: params
                type: object
                required: true
                properties:
                  - name: sid
                    type: integer
                    description: Server-generated subscription identifier
                    required: false
                  - name: sids
                    type: array
                    required: false
                    properties:
                      - name: item
                        type: integer
                        description: Server-generated subscription identifier
                        required: false
                  - name: market_ticker
                    type: string
                    required: false
                  - name: market_tickers
                    type: array
                    required: false
                    properties:
                      - name: item
                        type: string
                        description: Unique market identifier
                        required: false
                  - name: send_initial_snapshot
                    type: boolean
                    description: >-
                      Sends an initial snapshot for newly added ticker
                      subscriptions.
                    required: false
                  - name: action
                    type: string
                    enumValues:
                      - add_markets
                      - delete_markets
                    required: true
        headers: []
        jsonPayloadSchema: &ref_4
          type: object
          required:
            - id
            - cmd
            - params
          properties:
            id: *ref_0
            cmd:
              type: string
              const: update_subscription
              x-parser-schema-id: <anonymous-schema-12>
            params:
              type: object
              required:
                - action
              properties:
                sid: *ref_2
                sids:
                  type: array
                  items: *ref_2
                  minItems: 1
                  maxItems: 1
                  x-parser-schema-id: <anonymous-schema-14>
                market_ticker:
                  type: string
                  x-parser-schema-id: <anonymous-schema-15>
                market_tickers:
                  type: array
                  items: *ref_3
                  minItems: 1
                  x-parser-schema-id: <anonymous-schema-16>
                send_initial_snapshot:
                  type: boolean
                  description: >-
                    Sends an initial snapshot for newly added ticker
                    subscriptions.
                  default: false
                  x-parser-schema-id: <anonymous-schema-17>
                action:
                  type: string
                  enum:
                    - add_markets
                    - delete_markets
                  x-parser-schema-id: <anonymous-schema-18>
              x-parser-schema-id: <anonymous-schema-13>
          x-parser-schema-id: updateSubscriptionCommandPayload
        title: Update Subscription - Add Markets
        description: Add markets to an existing subscription
        example: No examples found
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: updateSubscriptionCommand
    bindings: []
    extensions: *ref_1
  - &ref_10
    id: sendUpdateSubscriptionDelete
    title: Update Subscription - Delete Markets
    type: receive
    messages:
      - &ref_21
        id: updateSubscriptionDeleteCommand
        contentType: application/json
        payload:
          - name: Update Subscription - Delete Markets
            description: Remove markets from an existing subscription
            type: object
            properties:
              - name: id
                type: integer
                description: Unique ID of a command within a WebSocket session
                required: true
              - name: cmd
                type: string
                description: update_subscription
                required: true
              - name: params
                type: object
                required: true
                properties:
                  - name: sid
                    type: integer
                    description: Server-generated subscription identifier
                    required: false
                  - name: sids
                    type: array
                    required: false
                    properties:
                      - name: item
                        type: integer
                        description: Server-generated subscription identifier
                        required: false
                  - name: market_ticker
                    type: string
                    required: false
                  - name: market_tickers
                    type: array
                    required: false
                    properties:
                      - name: item
                        type: string
                        description: Unique market identifier
                        required: false
                  - name: send_initial_snapshot
                    type: boolean
                    description: >-
                      Sends an initial snapshot for newly added ticker
                      subscriptions.
                    required: false
                  - name: action
                    type: string
                    enumValues:
                      - add_markets
                      - delete_markets
                    required: true
        headers: []
        jsonPayloadSchema: *ref_4
        title: Update Subscription - Delete Markets
        description: Remove markets from an existing subscription
        example: No examples found
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: updateSubscriptionDeleteCommand
    bindings: []
    extensions: *ref_1
  - &ref_11
    id: sendUpdateSubscriptionSingleSid
    title: Update Subscription - Single SID
    type: receive
    messages:
      - &ref_22
        id: updateSubscriptionSingleSidCommand
        contentType: application/json
        payload:
          - name: Update Subscription - Single SID
            description: Update a subscription using `sid` rather than `sids`
            type: object
            properties:
              - name: id
                type: integer
                description: Unique ID of a command within a WebSocket session
                required: true
              - name: cmd
                type: string
                description: update_subscription
                required: true
              - name: params
                type: object
                required: true
                properties:
                  - name: sid
                    type: integer
                    description: Server-generated subscription identifier
                    required: false
                  - name: sids
                    type: array
                    required: false
                    properties:
                      - name: item
                        type: integer
                        description: Server-generated subscription identifier
                        required: false
                  - name: market_ticker
                    type: string
                    required: false
                  - name: market_tickers
                    type: array
                    required: false
                    properties:
                      - name: item
                        type: string
                        description: Unique market identifier
                        required: false
                  - name: send_initial_snapshot
                    type: boolean
                    description: >-
                      Sends an initial snapshot for newly added ticker
                      subscriptions.
                    required: false
                  - name: action
                    type: string
                    enumValues:
                      - add_markets
                      - delete_markets
                    required: true
        headers: []
        jsonPayloadSchema: *ref_4
        title: Update Subscription - Single SID
        description: Update a subscription using `sid` rather than `sids`
        example: No examples found
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: updateSubscriptionSingleSidCommand
    bindings: []
    extensions: *ref_1
  - &ref_12
    id: receiveSubscribed
    title: Subscription Confirmed
    type: send
    messages:
      - &ref_23
        id: subscribedResponse
        contentType: application/json
        payload:
          - name: Subscribed Response
            description: Confirmation that subscription was successful
            type: object
            properties:
              - name: id
                type: integer
                description: Unique ID of a command within a WebSocket session
                required: false
              - name: type
                type: string
                description: subscribed
                required: true
              - name: msg
                type: object
                required: true
                properties:
                  - name: channel
                    type: string
                    required: true
                  - name: sid
                    type: integer
                    description: Server-generated subscription identifier
                    required: true
        headers: []
        jsonPayloadSchema:
          type: object
          required:
            - type
            - msg
          properties:
            id: *ref_0
            type:
              type: string
              const: subscribed
              x-parser-schema-id: <anonymous-schema-20>
            msg:
              type: object
              required:
                - channel
                - sid
              properties:
                channel:
                  type: string
                  x-parser-schema-id: <anonymous-schema-22>
                sid: *ref_2
              x-parser-schema-id: <anonymous-schema-21>
          x-parser-schema-id: subscribedResponsePayload
        title: Subscribed Response
        description: Confirmation that subscription was successful
        example: |-
          {
            "id": 123,
            "type": "<string>",
            "msg": {
              "channel": "<string>",
              "sid": 123
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: subscribedResponse
    bindings: []
    extensions: *ref_1
  - &ref_13
    id: receiveUnsubscribed
    title: Unsubscription Confirmed
    type: send
    messages:
      - &ref_24
        id: unsubscribedResponse
        contentType: application/json
        payload:
          - name: Unsubscribed Response
            description: Confirmation that unsubscription was successful
            type: object
            properties:
              - name: id
                type: integer
                description: Unique ID of a command within a WebSocket session
                required: false
              - name: sid
                type: integer
                description: Server-generated subscription identifier
                required: true
              - name: seq
                type: integer
                description: Sequence number used for snapshot/delta consistency
                required: true
              - name: type
                type: string
                description: unsubscribed
                required: true
        headers: []
        jsonPayloadSchema:
          type: object
          required:
            - sid
            - seq
            - type
          properties:
            id: *ref_0
            sid: *ref_2
            seq: &ref_5
              type: integer
              minimum: 1
              description: Sequence number used for snapshot/delta consistency
              x-parser-schema-id: sequenceNumber
            type:
              type: string
              const: unsubscribed
              x-parser-schema-id: <anonymous-schema-23>
          x-parser-schema-id: unsubscribedResponsePayload
        title: Unsubscribed Response
        description: Confirmation that unsubscription was successful
        example: |-
          {
            "id": 123,
            "sid": 123,
            "seq": 123,
            "type": "<string>"
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: unsubscribedResponse
    bindings: []
    extensions: *ref_1
  - &ref_14
    id: receiveOk
    title: Update Confirmed
    type: send
    messages:
      - &ref_25
        id: okResponse
        contentType: application/json
        payload:
          - name: OK Response
            description: Successful update operation response
            type: object
            properties:
              - name: id
                type: integer
                description: Unique ID of a command within a WebSocket session
                required: false
              - name: sid
                type: integer
                description: Server-generated subscription identifier
                required: false
              - name: seq
                type: integer
                description: Sequence number used for snapshot/delta consistency
                required: false
              - name: type
                type: string
                description: ok
                required: true
              - name: msg
                type: object
                required: false
                properties:
                  - name: market_tickers
                    type: array
                    required: false
                    properties:
                      - name: item
                        type: string
                        description: Unique market identifier
                        required: false
        headers: []
        jsonPayloadSchema:
          type: object
          required:
            - type
          properties:
            id: *ref_0
            sid: *ref_2
            seq: *ref_5
            type:
              type: string
              const: ok
              x-parser-schema-id: <anonymous-schema-24>
            msg:
              type: object
              properties:
                market_tickers:
                  type: array
                  items: *ref_3
                  x-parser-schema-id: <anonymous-schema-26>
              x-parser-schema-id: <anonymous-schema-25>
          x-parser-schema-id: okResponsePayload
        title: OK Response
        description: Successful update operation response
        example: No examples found
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: okResponse
    bindings: []
    extensions: *ref_1
  - &ref_15
    id: receiveListSubscriptions
    title: List Subscriptions Response
    type: send
    messages:
      - &ref_26
        id: listSubscriptionsResponse
        contentType: application/json
        payload:
          - name: List Subscriptions Response
            description: Response containing all active subscriptions
            type: object
            properties:
              - name: id
                type: integer
                description: Unique ID of a command within a WebSocket session
                required: true
              - name: type
                type: string
                description: ok
                required: true
              - name: msg
                type: array
                required: true
                properties:
                  - name: channel
                    type: string
                    required: true
                  - name: sid
                    type: integer
                    description: Server-generated subscription identifier
                    required: true
        headers: []
        jsonPayloadSchema:
          type: object
          required:
            - id
            - type
            - msg
          properties:
            id: *ref_0
            type:
              type: string
              const: ok
              x-parser-schema-id: <anonymous-schema-27>
            msg:
              type: array
              items:
                type: object
                required:
                  - channel
                  - sid
                properties:
                  channel:
                    type: string
                    x-parser-schema-id: <anonymous-schema-30>
                  sid: *ref_2
                x-parser-schema-id: <anonymous-schema-29>
              x-parser-schema-id: <anonymous-schema-28>
          x-parser-schema-id: listSubscriptionsResponsePayload
        title: List Subscriptions Response
        description: Response containing all active subscriptions
        example: |-
          {
            "id": 123,
            "type": "<string>",
            "msg": {
              "channel": "<string>",
              "sid": 123
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: listSubscriptionsResponse
    bindings: []
    extensions: *ref_1
  - &ref_16
    id: receiveError
    title: Error Response
    type: send
    messages:
      - &ref_27
        id: errorResponse
        contentType: application/json
        payload:
          - name: Error Response
            description: Error response for failed operations
            type: object
            properties:
              - name: id
                type: integer
                description: Unique ID of a command within a WebSocket session
                required: false
              - name: type
                type: string
                description: error
                required: true
              - name: msg
                type: object
                required: true
                properties:
                  - name: code
                    type: integer
                    required: true
                  - name: msg
                    type: string
                    required: true
                  - name: market_ticker
                    type: string
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          required:
            - type
            - msg
          properties:
            id: *ref_0
            type:
              type: string
              const: error
              x-parser-schema-id: <anonymous-schema-31>
            msg:
              type: object
              required:
                - code
                - msg
              properties:
                code:
                  type: integer
                  minimum: 1
                  maximum: 18
                  x-parser-schema-id: <anonymous-schema-33>
                msg:
                  type: string
                  x-parser-schema-id: <anonymous-schema-34>
                market_ticker:
                  type: string
                  x-parser-schema-id: <anonymous-schema-35>
              x-parser-schema-id: <anonymous-schema-32>
          x-parser-schema-id: errorResponsePayload
        title: Error Response
        description: Error response for failed operations
        example: |-
          {
            "id": 123,
            "type": "<string>",
            "msg": {
              "code": 123,
              "msg": "<string>",
              "market_ticker": "<string>"
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: errorResponse
    bindings: []
    extensions: *ref_1
sendOperations:
  - *ref_6
  - *ref_7
  - *ref_8
  - *ref_9
  - *ref_10
  - *ref_11
receiveOperations:
  - *ref_12
  - *ref_13
  - *ref_14
  - *ref_15
  - *ref_16
sendMessages:
  - *ref_17
  - *ref_18
  - *ref_19
  - *ref_20
  - *ref_21
  - *ref_22
receiveMessages:
  - *ref_23
  - *ref_24
  - *ref_25
  - *ref_26
  - *ref_27
extensions:
  - id: x-parser-unique-object-id
    value: root
securitySchemes:
  - id: apiKey
    name: apiKey
    type: apiKey
    description: API key authentication required for margin WebSocket connections.
    in: user
    extensions: []

````