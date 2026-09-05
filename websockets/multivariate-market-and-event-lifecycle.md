---
url: https://docs.kalshi.com/websockets/multivariate-market-and-event-lifecycle
lastmod: 2026-05-31T16:40:12.382Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Multivariate Market & Event Lifecycle

> Multivariate event (MVE) market state changes and event creation notifications.

**Requirements:**
- No additional channel-level authentication beyond the authenticated WebSocket connection
- Receives all multivariate market lifecycle notifications (`market_ticker` filters are not supported)
- Only emits lifecycle updates for multivariate events
- Event creation notifications

**Use case:** Tracking multivariate market lifecycle including creation, de(activation), close date changes, determination, settlement




## AsyncAPI

````yaml asyncapi.yaml multivariate_market_lifecycle
id: multivariate_market_lifecycle
title: Multivariate Market & Event Lifecycle
description: >
  Multivariate event (MVE) market state changes and event creation
  notifications.


  **Requirements:**

  - No additional channel-level authentication beyond the authenticated
  WebSocket connection

  - Receives all multivariate market lifecycle notifications (`market_ticker`
  filters are not supported)

  - Only emits lifecycle updates for multivariate events

  - Event creation notifications


  **Use case:** Tracking multivariate market lifecycle including creation,
  de(activation), close date changes, determination, settlement
servers:
  - id: production
    protocol: wss
    host: external-api-ws.kalshi.com
    bindings: []
    variables: []
address: multivariate_market_lifecycle
parameters: []
bindings: []
operations:
  - &ref_4
    id: receiveMultivariateMarketLifecycle
    title: Multivariate Market Lifecycle Event
    description: >-
      Receive multivariate market lifecycle updates (open, close, determination,
      etc.)
    type: send
    messages:
      - &ref_6
        id: multivariateMarketLifecycle
        contentType: application/json
        payload:
          - name: Multivariate Market Lifecycle
            description: >-
              Multivariate market lifecycle events (created, activated,
              deactivated, close_date_updated, determined, settled)
            type: object
            properties:
              - name: type
                type: string
                description: multivariate_market_lifecycle
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
                    description: >
                      Field to annotate which of the event type this event is
                      for:

                      - `created` - Market created

                      - `activated` - Market activated

                      - `deactivated` - Market deactivated

                      - `close_date_updated` - Market close date updated

                      - `determined` - Market determined

                      - `settled` - Market settled
                    enumValues:
                      - created
                      - deactivated
                      - activated
                      - close_date_updated
                      - determined
                      - settled
                    required: true
                  - name: market_ticker
                    type: string
                    description: Unique market identifier
                    examples: &ref_0
                      - FED-23DEC-T3.00
                      - HIGHNY-22DEC23-B53.5
                    required: true
                  - name: exchange_index
                    type: integer
                    description: >-
                      Optional - This key will ONLY exist when the market is
                      created. Identifier for the exchange shard the market
                      lives on
                    required: false
                  - name: open_ts
                    type: integer
                    description: >-
                      Optional - This key will ONLY exist when the market is
                      created. Unix timestamp for when the market opened (in
                      seconds)
                    required: false
                  - name: close_ts
                    type: integer
                    description: >-
                      Optional - This key will ONLY exist when the market is
                      created OR when the close date is updated. Unix timestamp
                      for when the market is scheduled to close (in seconds).
                      Will be updated in case of early determination markets
                    required: false
                  - name: result
                    type: string
                    description: >-
                      Optional - This key will ONLY exist when the market is
                      determined. Result of the market
                    required: false
                  - name: determination_ts
                    type: integer
                    description: >-
                      Optional - This key will ONLY exist when the market is
                      determined. Unix timestamp for when the market is
                      determined (in seconds)
                    required: false
                  - name: settlement_value
                    type: string
                    description: >-
                      Optional - This key will ONLY exist when the market is
                      determined. Settlement value of the market in fixed-point
                      dollars (e.g. "0.5000")
                    required: false
                  - name: settled_ts
                    type: integer
                    description: >-
                      Optional - This key will ONLY exist when the market is
                      settled. Unix timestamp for when the market is settled (in
                      seconds)
                    required: false
                  - name: is_deactivated
                    type: boolean
                    description: >-
                      Optional - This key will ONLY exist when the market is
                      paused/unpaused. Boolean flag to indicate if trading is
                      paused on an open market. This should only be interpreted
                      for an open market
                    required: false
                  - name: price_level_structure
                    type: string
                    description: >-
                      Optional - This key will exist when the market is created.
                      The price level structure of the market
                    enumValues:
                      - linear_cent
                      - deci_cent
                      - tapered_deci_cent
                      - center_whole_edge_half_cent
                      - center_whole_edge_quint_cent
                      - center_half_edge_half_cent
                      - center_half_edge_quint_cent
                      - center_half_edge_deci_cent
                      - center_quint_edge_quint_cent
                      - center_quint_edge_deci_cent
                      - center_centi_edge_centi_cent
                      - center_deci_edge_centi_cent
                    required: false
                  - name: additional_metadata
                    type: object
                    description: >-
                      Optional - This key will be emitted when the market is
                      created
                    required: false
                    properties:
                      - name: name
                        type: string
                        required: false
                      - name: title
                        type: string
                        required: false
                      - name: yes_sub_title
                        type: string
                        required: false
                      - name: no_sub_title
                        type: string
                        required: false
                      - name: rules_primary
                        type: string
                        required: false
                      - name: rules_secondary
                        type: string
                        required: false
                      - name: can_close_early
                        type: boolean
                        required: false
                      - name: event_ticker
                        type: string
                        required: false
                      - name: expected_expiration_ts
                        type: integer
                        required: false
                      - name: strike_type
                        type: string
                        required: false
                      - name: floor_strike
                        type: number
                        required: false
                      - name: cap_strike
                        type: number
                        required: false
                      - name: custom_strike
                        type: object
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
              const: multivariate_market_lifecycle
              x-parser-schema-id: <anonymous-schema-178>
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
                - event_type
                - market_ticker
              properties:
                event_type:
                  type: string
                  description: |
                    Field to annotate which of the event type this event is for:
                    - `created` - Market created
                    - `activated` - Market activated
                    - `deactivated` - Market deactivated
                    - `close_date_updated` - Market close date updated
                    - `determined` - Market determined
                    - `settled` - Market settled
                  enum:
                    - created
                    - deactivated
                    - activated
                    - close_date_updated
                    - determined
                    - settled
                  x-parser-schema-id: <anonymous-schema-180>
                market_ticker:
                  type: string
                  description: Unique market identifier
                  pattern: ^[A-Z0-9-]+$
                  examples: *ref_0
                  x-parser-schema-id: marketTicker
                exchange_index:
                  type: integer
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    created. Identifier for the exchange shard the market lives
                    on
                  x-parser-schema-id: <anonymous-schema-181>
                open_ts:
                  type: integer
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    created. Unix timestamp for when the market opened (in
                    seconds)
                  format: int64
                  x-parser-schema-id: <anonymous-schema-182>
                close_ts:
                  type: integer
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    created OR when the close date is updated. Unix timestamp
                    for when the market is scheduled to close (in seconds). Will
                    be updated in case of early determination markets
                  format: int64
                  x-parser-schema-id: <anonymous-schema-183>
                result:
                  type: string
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    determined. Result of the market
                  x-parser-schema-id: <anonymous-schema-184>
                determination_ts:
                  type: integer
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    determined. Unix timestamp for when the market is determined
                    (in seconds)
                  format: int64
                  x-parser-schema-id: <anonymous-schema-185>
                settlement_value:
                  type: string
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    determined. Settlement value of the market in fixed-point
                    dollars (e.g. "0.5000")
                  x-parser-schema-id: <anonymous-schema-186>
                settled_ts:
                  type: integer
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    settled. Unix timestamp for when the market is settled (in
                    seconds)
                  format: int64
                  x-parser-schema-id: <anonymous-schema-187>
                is_deactivated:
                  type: boolean
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    paused/unpaused. Boolean flag to indicate if trading is
                    paused on an open market. This should only be interpreted
                    for an open market
                  x-parser-schema-id: <anonymous-schema-188>
                price_level_structure:
                  type: string
                  description: >-
                    Optional - This key will exist when the market is created.
                    The price level structure of the market
                  enum:
                    - linear_cent
                    - deci_cent
                    - tapered_deci_cent
                    - center_whole_edge_half_cent
                    - center_whole_edge_quint_cent
                    - center_half_edge_half_cent
                    - center_half_edge_quint_cent
                    - center_half_edge_deci_cent
                    - center_quint_edge_quint_cent
                    - center_quint_edge_deci_cent
                    - center_centi_edge_centi_cent
                    - center_deci_edge_centi_cent
                  x-parser-schema-id: <anonymous-schema-189>
                additional_metadata:
                  type: object
                  description: >-
                    Optional - This key will be emitted when the market is
                    created
                  properties:
                    name:
                      type: string
                      x-parser-schema-id: <anonymous-schema-191>
                    title:
                      type: string
                      x-parser-schema-id: <anonymous-schema-192>
                    yes_sub_title:
                      type: string
                      x-parser-schema-id: <anonymous-schema-193>
                    no_sub_title:
                      type: string
                      x-parser-schema-id: <anonymous-schema-194>
                    rules_primary:
                      type: string
                      x-parser-schema-id: <anonymous-schema-195>
                    rules_secondary:
                      type: string
                      x-parser-schema-id: <anonymous-schema-196>
                    can_close_early:
                      type: boolean
                      x-parser-schema-id: <anonymous-schema-197>
                    event_ticker:
                      type: string
                      x-parser-schema-id: <anonymous-schema-198>
                    expected_expiration_ts:
                      type: integer
                      format: int64
                      x-parser-schema-id: <anonymous-schema-199>
                    strike_type:
                      type: string
                      x-parser-schema-id: <anonymous-schema-200>
                    floor_strike:
                      type: number
                      x-parser-schema-id: <anonymous-schema-201>
                    cap_strike:
                      type: number
                      x-parser-schema-id: <anonymous-schema-202>
                    custom_strike:
                      type: object
                      x-parser-schema-id: <anonymous-schema-203>
                  x-parser-schema-id: <anonymous-schema-190>
              x-parser-schema-id: <anonymous-schema-179>
          x-parser-schema-id: multivariateMarketLifecyclePayload
        title: Multivariate Market Lifecycle
        description: >-
          Multivariate market lifecycle events (created, activated, deactivated,
          close_date_updated, determined, settled)
        example: |-
          {
            "type": "multivariate_market_lifecycle",
            "sid": 14,
            "seq": 7,
            "msg": {
              "market_ticker": "KXMVE-TEST-EVENT-M1",
              "event_type": "created",
              "exchange_index": 0,
              "open_ts": 1773936000,
              "close_ts": 1774022400,
              "additional_metadata": {
                "name": "MVE One",
                "title": "Market 1",
                "yes_sub_title": "YES 1",
                "no_sub_title": "NO 1",
                "rules_primary": "Rule 1",
                "rules_secondary": "Rule 2",
                "can_close_early": true,
                "event_ticker": "KXMVE-TEST-EVENT",
                "expected_expiration_ts": 1774029600
              }
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: multivariateMarketLifecycle
    bindings: []
    extensions: &ref_3
      - id: x-parser-unique-object-id
        value: multivariate_market_lifecycle
  - &ref_5
    id: receiveMultivariateEventLifecycle
    title: Multivariate Event Lifecycle
    description: Receive multivariate event creation notifications
    type: send
    messages:
      - &ref_7
        id: eventLifecycle
        contentType: application/json
        payload:
          - name: Event Lifecycle
            description: Event creation notification
            type: object
            properties:
              - name: type
                type: string
                description: event_lifecycle
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
                  - name: event_ticker
                    type: string
                    description: Unique identifier for the event being created
                    required: true
                  - name: exchange_index
                    type: integer
                    description: >-
                      Identifier for the exchange shard the event's markets live
                      on
                    required: true
                  - name: title
                    type: string
                    description: Title of event
                    required: true
                  - name: subtitle
                    type: string
                    description: Subtitle of event
                    required: true
                  - name: collateral_return_type
                    type: string
                    description: >-
                      Collateral return type, MECNET or DIRECNET of the event.
                      Empty if there is no collateral return scheme for the
                      event
                    enumValues:
                      - MECNET
                      - DIRECNET
                      - ''
                    required: true
                  - name: series_ticker
                    type: string
                    description: Series ticker for the event
                    required: true
                  - name: strike_date
                    type: integer
                    description: >-
                      Optional - Unix timestamp to indicate the strike date of
                      the event if there is one
                    required: false
                  - name: strike_period
                    type: string
                    description: >-
                      Optional - String to indicate the strike period of the
                      event if there is one
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
              const: event_lifecycle
              x-parser-schema-id: <anonymous-schema-163>
            sid: *ref_1
            seq: *ref_2
            msg:
              type: object
              required:
                - event_ticker
                - exchange_index
                - title
                - subtitle
                - collateral_return_type
                - series_ticker
              properties:
                event_ticker:
                  type: string
                  description: Unique identifier for the event being created
                  x-parser-schema-id: <anonymous-schema-165>
                exchange_index:
                  type: integer
                  description: >-
                    Identifier for the exchange shard the event's markets live
                    on
                  x-parser-schema-id: <anonymous-schema-166>
                title:
                  type: string
                  description: Title of event
                  x-parser-schema-id: <anonymous-schema-167>
                subtitle:
                  type: string
                  description: Subtitle of event
                  x-parser-schema-id: <anonymous-schema-168>
                collateral_return_type:
                  type: string
                  description: >-
                    Collateral return type, MECNET or DIRECNET of the event.
                    Empty if there is no collateral return scheme for the event
                  enum:
                    - MECNET
                    - DIRECNET
                    - ''
                  x-parser-schema-id: <anonymous-schema-169>
                series_ticker:
                  type: string
                  description: Series ticker for the event
                  x-parser-schema-id: <anonymous-schema-170>
                strike_date:
                  type: integer
                  description: >-
                    Optional - Unix timestamp to indicate the strike date of the
                    event if there is one
                  format: int64
                  x-parser-schema-id: <anonymous-schema-171>
                strike_period:
                  type: string
                  description: >-
                    Optional - String to indicate the strike period of the event
                    if there is one
                  x-parser-schema-id: <anonymous-schema-172>
              x-parser-schema-id: <anonymous-schema-164>
          x-parser-schema-id: eventLifecyclePayload
        title: Event Lifecycle
        description: Event creation notification
        example: |-
          {
            "type": "event_lifecycle",
            "sid": 5,
            "seq": 8,
            "msg": {
              "event_ticker": "KXQUICKSETTLE-26JAN25H2150",
              "exchange_index": 0,
              "title": "What will 1+1 equal on Jan 25 at 21:50?",
              "subtitle": "Jan 25 at 21:50",
              "collateral_return_type": "MECNET",
              "series_ticker": "KXQUICKSETTLE"
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: eventLifecycle
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
    value: multivariate_market_lifecycle
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