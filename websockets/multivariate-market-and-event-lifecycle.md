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
  - &ref_3
    id: receiveMultivariateMarketLifecycle
    title: Multivariate Market Lifecycle Event
    description: >-
      Receive multivariate market lifecycle updates (open, close, determination,
      etc.)
    type: send
    messages:
      - &ref_5
        id: multivariateMarketLifecycle
        contentType: application/json
        payload:
          - allOf: &ref_0
              - type: object
                required:
                  - type
                  - sid
                  - msg
                properties:
                  type:
                    type: string
                    const: market_lifecycle_v2
                    x-parser-schema-id: <anonymous-schema-121>
                  sid: &ref_1
                    type: integer
                    description: >-
                      Server-generated subscription identifier (sid) used to
                      identify the channel
                    minimum: 1
                    x-parser-schema-id: subscriptionId
                  msg:
                    type: object
                    required:
                      - event_type
                      - market_ticker
                    properties:
                      event_type:
                        type: string
                        description: >
                          Field to annotate which of the event type this event
                          is for:

                          - `created` - Market created

                          - `activated` - Market activated

                          - `deactivated` - Market deactivated

                          - `close_date_updated` - Market close date updated

                          - `determined` - Market determined

                          - `settled` - Market settled

                          - `price_level_structure_updated` - Market price level
                          structure changed

                          - `metadata_updated` - Market metadata updated (e.g.
                          floor strike, yes_sub_title)
                        enum:
                          - created
                          - deactivated
                          - activated
                          - close_date_updated
                          - determined
                          - settled
                          - price_level_structure_updated
                          - metadata_updated
                        x-parser-schema-id: <anonymous-schema-123>
                      market_ticker:
                        type: string
                        description: Unique market identifier
                        pattern: ^[A-Z0-9-]+$
                        examples:
                          - FED-23DEC-T3.00
                          - HIGHNY-22DEC23-B53.5
                        x-parser-schema-id: marketTicker
                      open_ts:
                        type: integer
                        description: >-
                          Optional - This key will ONLY exist when the market is
                          created. Unix timestamp for when the market opened (in
                          seconds)
                        format: int64
                        x-parser-schema-id: <anonymous-schema-124>
                      close_ts:
                        type: integer
                        description: >-
                          Optional - This key will ONLY exist when the market is
                          created OR when the close date is updated. Unix
                          timestamp for when the market is scheduled to close
                          (in seconds). Will be updated in case of early
                          determination markets
                        format: int64
                        x-parser-schema-id: <anonymous-schema-125>
                      result:
                        type: string
                        description: >-
                          Optional - This key will ONLY exist when the market is
                          determined. Result of the market
                        x-parser-schema-id: <anonymous-schema-126>
                      determination_ts:
                        type: integer
                        description: >-
                          Optional - This key will ONLY exist when the market is
                          determined. Unix timestamp for when the market is
                          determined (in seconds)
                        format: int64
                        x-parser-schema-id: <anonymous-schema-127>
                      settlement_value:
                        type: string
                        description: >-
                          Optional - This key will ONLY exist when the market is
                          determined. Settlement value of the market in
                          fixed-point dollars (e.g. "0.5000")
                        x-parser-schema-id: <anonymous-schema-128>
                      settled_ts:
                        type: integer
                        description: >-
                          Optional - This key will ONLY exist when the market is
                          settled. Unix timestamp for when the market is settled
                          (in seconds)
                        format: int64
                        x-parser-schema-id: <anonymous-schema-129>
                      is_deactivated:
                        type: boolean
                        description: >-
                          Optional - This key will ONLY exist when the market is
                          paused/unpaused. Boolean flag to indicate if trading
                          is paused on an open market. This should only be
                          interpreted for an open market
                        x-parser-schema-id: <anonymous-schema-130>
                      price_level_structure:
                        type: string
                        description: >-
                          Optional - This key will exist when the market is
                          created or when the price level structure is updated.
                          The price level structure of the market
                        enum:
                          - linear_cent
                          - deci_cent
                          - tapered_deci_cent
                        x-parser-schema-id: <anonymous-schema-131>
                      strike_type:
                        type: string
                        description: >-
                          Optional - This key will ONLY exist for
                          metadata_updated events. Determines how floor_strike /
                          cap_strike are interpreted (e.g. "between" uses both,
                          "greater" uses floor_strike only, "less" uses
                          cap_strike only)
                        x-parser-schema-id: <anonymous-schema-132>
                      floor_strike:
                        type: number
                        description: >-
                          Optional - This key will ONLY exist for
                          metadata_updated events. The floor (lower bound)
                          strike value for the market
                        x-parser-schema-id: <anonymous-schema-133>
                      cap_strike:
                        type: number
                        description: >-
                          Optional - This key will ONLY exist for
                          metadata_updated events. The cap (upper bound) strike
                          value for the market
                        x-parser-schema-id: <anonymous-schema-134>
                      custom_strike:
                        type: object
                        description: >-
                          Optional - This key will ONLY exist for
                          metadata_updated events with a custom or structured
                          strike type
                        x-parser-schema-id: <anonymous-schema-135>
                      yes_sub_title:
                        type: string
                        description: >-
                          Optional - This key will ONLY exist for
                          metadata_updated events. The updated yes subtitle for
                          the market
                        x-parser-schema-id: <anonymous-schema-136>
                      additional_metadata:
                        type: object
                        description: >-
                          Optional - This key will be emitted when the market is
                          created
                        properties:
                          name:
                            type: string
                            x-parser-schema-id: <anonymous-schema-138>
                          title:
                            type: string
                            x-parser-schema-id: <anonymous-schema-139>
                          yes_sub_title:
                            type: string
                            x-parser-schema-id: <anonymous-schema-140>
                          no_sub_title:
                            type: string
                            x-parser-schema-id: <anonymous-schema-141>
                          rules_primary:
                            type: string
                            x-parser-schema-id: <anonymous-schema-142>
                          rules_secondary:
                            type: string
                            x-parser-schema-id: <anonymous-schema-143>
                          can_close_early:
                            type: boolean
                            x-parser-schema-id: <anonymous-schema-144>
                          event_ticker:
                            type: string
                            x-parser-schema-id: <anonymous-schema-145>
                          expected_expiration_ts:
                            type: integer
                            format: int64
                            x-parser-schema-id: <anonymous-schema-146>
                          strike_type:
                            type: string
                            x-parser-schema-id: <anonymous-schema-147>
                          floor_strike:
                            type: number
                            x-parser-schema-id: <anonymous-schema-148>
                          cap_strike:
                            type: number
                            x-parser-schema-id: <anonymous-schema-149>
                          custom_strike:
                            type: object
                            x-parser-schema-id: <anonymous-schema-150>
                        x-parser-schema-id: <anonymous-schema-137>
                    x-parser-schema-id: <anonymous-schema-122>
                x-parser-schema-id: marketLifecycleV2Payload
              - type: object
                properties:
                  type:
                    type: string
                    const: multivariate_market_lifecycle
                    x-parser-schema-id: <anonymous-schema-166>
                x-parser-schema-id: <anonymous-schema-165>
            x-parser-schema-id: multivariateMarketLifecyclePayload
            name: Multivariate Market Lifecycle
            description: >-
              Multivariate market lifecycle events (created, activated,
              deactivated, close_date_updated, determined, settled)
        headers: []
        jsonPayloadSchema:
          allOf: *ref_0
          x-parser-schema-id: multivariateMarketLifecyclePayload
        title: Multivariate Market Lifecycle
        description: >-
          Multivariate market lifecycle events (created, activated, deactivated,
          close_date_updated, determined, settled)
        example: |-
          {
            "type": "multivariate_market_lifecycle",
            "sid": 14,
            "msg": {
              "market_ticker": "KXMVE-TEST-EVENT-M1",
              "event_type": "created",
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
    extensions: &ref_2
      - id: x-parser-unique-object-id
        value: multivariate_market_lifecycle
  - &ref_4
    id: receiveMultivariateEventLifecycle
    title: Multivariate Event Lifecycle
    description: Receive multivariate event creation notifications
    type: send
    messages:
      - &ref_6
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
              - name: msg
                type: object
                required: true
                properties:
                  - name: event_ticker
                    type: string
                    description: Unique identifier for the event being created
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
            - msg
          properties:
            type:
              type: string
              const: event_lifecycle
              x-parser-schema-id: <anonymous-schema-151>
            sid: *ref_1
            msg:
              type: object
              required:
                - event_ticker
                - title
                - subtitle
                - collateral_return_type
                - series_ticker
              properties:
                event_ticker:
                  type: string
                  description: Unique identifier for the event being created
                  x-parser-schema-id: <anonymous-schema-153>
                title:
                  type: string
                  description: Title of event
                  x-parser-schema-id: <anonymous-schema-154>
                subtitle:
                  type: string
                  description: Subtitle of event
                  x-parser-schema-id: <anonymous-schema-155>
                collateral_return_type:
                  type: string
                  description: >-
                    Collateral return type, MECNET or DIRECNET of the event.
                    Empty if there is no collateral return scheme for the event
                  enum:
                    - MECNET
                    - DIRECNET
                    - ''
                  x-parser-schema-id: <anonymous-schema-156>
                series_ticker:
                  type: string
                  description: Series ticker for the event
                  x-parser-schema-id: <anonymous-schema-157>
                strike_date:
                  type: integer
                  description: >-
                    Optional - Unix timestamp to indicate the strike date of the
                    event if there is one
                  format: int64
                  x-parser-schema-id: <anonymous-schema-158>
                strike_period:
                  type: string
                  description: >-
                    Optional - String to indicate the strike period of the event
                    if there is one
                  x-parser-schema-id: <anonymous-schema-159>
              x-parser-schema-id: <anonymous-schema-152>
          x-parser-schema-id: eventLifecyclePayload
        title: Event Lifecycle
        description: Event creation notification
        example: |-
          {
            "type": "event_lifecycle",
            "sid": 5,
            "msg": {
              "event_ticker": "KXQUICKSETTLE-26JAN25H2150",
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