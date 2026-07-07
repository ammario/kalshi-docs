---
url: https://docs.kalshi.com/websockets/market-and-event-lifecycle
lastmod: 2026-05-31T16:40:12.341Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Market & Event Lifecycle

> Market state changes and event creation notifications.

**Requirements:**
- No additional channel-level authentication beyond the authenticated WebSocket connection
- Receives all market and event lifecycle notifications (`market_ticker` filters are not supported)
- Event creation notifications

**Use case:** Tracking market lifecycle including creation, de(activation), close date changes, determination, settlement, price level structure changes, and metadata updates




## AsyncAPI

````yaml asyncapi.yaml market_lifecycle_v2
id: market_lifecycle_v2
title: Market & Event Lifecycle
description: >
  Market state changes and event creation notifications.


  **Requirements:**

  - No additional channel-level authentication beyond the authenticated
  WebSocket connection

  - Receives all market and event lifecycle notifications (`market_ticker`
  filters are not supported)

  - Event creation notifications


  **Use case:** Tracking market lifecycle including creation, de(activation),
  close date changes, determination, settlement, price level structure changes,
  and metadata updates
servers:
  - id: production
    protocol: wss
    host: external-api-ws.kalshi.com
    bindings: []
    variables: []
address: market_lifecycle_v2
parameters: []
bindings: []
operations:
  - &ref_3
    id: receiveMarketLifecycleV2
    title: Market Lifecycle Event
    description: Receive market lifecycle updates (open, close, determination, etc.)
    type: send
    messages:
      - &ref_6
        id: marketLifecycleV2
        contentType: application/json
        payload:
          - name: Market Lifecycle V2
            description: >-
              Market lifecycle events (created, activated, deactivated,
              close_date_updated, determined, settled,
              price_level_structure_updated, metadata_updated)
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

                      - `price_level_structure_updated` - Market price level
                      structure changed

                      - `metadata_updated` - Market metadata updated (e.g. floor
                      strike, yes_sub_title)
                    enumValues:
                      - created
                      - deactivated
                      - activated
                      - close_date_updated
                      - determined
                      - settled
                      - price_level_structure_updated
                      - metadata_updated
                    required: true
                  - name: market_ticker
                    type: string
                    description: Unique market identifier
                    examples: &ref_0
                      - FED-23DEC-T3.00
                      - HIGHNY-22DEC23-B53.5
                    required: true
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
                      Optional - This key will exist when the market is created
                      or when the price level structure is updated. The price
                      level structure of the market
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
                    required: false
                  - name: price_ranges
                    type: array
                    description: >-
                      Optional - Emitted alongside price_level_structure (on
                      market creation and price_level_structure_updated events).
                      The valid price bands for the market, in fixed-point
                      dollars. Use this to determine valid order prices rather
                      than hardcoding a tick size.
                    required: false
                    properties:
                      - name: start
                        type: string
                        description: Starting price for this band, in dollars
                        required: true
                      - name: end
                        type: string
                        description: Ending price for this band, in dollars
                        required: true
                      - name: step
                        type: string
                        description: >-
                          Tick size (minimum price increment) within this band,
                          in dollars
                        required: true
                  - name: strike_type
                    type: string
                    description: >-
                      Optional - This key will ONLY exist for metadata_updated
                      events. Determines how floor_strike / cap_strike are
                      interpreted (e.g. "between" uses both, "greater" uses
                      floor_strike only, "less" uses cap_strike only)
                    required: false
                  - name: floor_strike
                    type: number
                    description: >-
                      Optional - This key will ONLY exist for metadata_updated
                      events. The floor (lower bound) strike value for the
                      market
                    required: false
                  - name: cap_strike
                    type: number
                    description: >-
                      Optional - This key will ONLY exist for metadata_updated
                      events. The cap (upper bound) strike value for the market
                    required: false
                  - name: custom_strike
                    type: object
                    description: >-
                      Optional - This key will ONLY exist for metadata_updated
                      events with a custom or structured strike type
                    required: false
                  - name: yes_sub_title
                    type: string
                    description: >-
                      Optional - This key will ONLY exist for metadata_updated
                      events. The updated yes subtitle for the market
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
            - msg
          properties:
            type:
              type: string
              const: market_lifecycle_v2
              x-parser-schema-id: <anonymous-schema-119>
            sid: &ref_1
              type: integer
              description: >-
                Server-generated subscription identifier (sid) used to identify
                the channel
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
                    Field to annotate which of the event type this event is for:

                    - `created` - Market created

                    - `activated` - Market activated

                    - `deactivated` - Market deactivated

                    - `close_date_updated` - Market close date updated

                    - `determined` - Market determined

                    - `settled` - Market settled

                    - `price_level_structure_updated` - Market price level
                    structure changed

                    - `metadata_updated` - Market metadata updated (e.g. floor
                    strike, yes_sub_title)
                  enum:
                    - created
                    - deactivated
                    - activated
                    - close_date_updated
                    - determined
                    - settled
                    - price_level_structure_updated
                    - metadata_updated
                  x-parser-schema-id: <anonymous-schema-121>
                market_ticker:
                  type: string
                  description: Unique market identifier
                  pattern: ^[A-Z0-9-]+$
                  examples: *ref_0
                  x-parser-schema-id: marketTicker
                open_ts:
                  type: integer
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    created. Unix timestamp for when the market opened (in
                    seconds)
                  format: int64
                  x-parser-schema-id: <anonymous-schema-122>
                close_ts:
                  type: integer
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    created OR when the close date is updated. Unix timestamp
                    for when the market is scheduled to close (in seconds). Will
                    be updated in case of early determination markets
                  format: int64
                  x-parser-schema-id: <anonymous-schema-123>
                result:
                  type: string
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    determined. Result of the market
                  x-parser-schema-id: <anonymous-schema-124>
                determination_ts:
                  type: integer
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    determined. Unix timestamp for when the market is determined
                    (in seconds)
                  format: int64
                  x-parser-schema-id: <anonymous-schema-125>
                settlement_value:
                  type: string
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    determined. Settlement value of the market in fixed-point
                    dollars (e.g. "0.5000")
                  x-parser-schema-id: <anonymous-schema-126>
                settled_ts:
                  type: integer
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    settled. Unix timestamp for when the market is settled (in
                    seconds)
                  format: int64
                  x-parser-schema-id: <anonymous-schema-127>
                is_deactivated:
                  type: boolean
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    paused/unpaused. Boolean flag to indicate if trading is
                    paused on an open market. This should only be interpreted
                    for an open market
                  x-parser-schema-id: <anonymous-schema-128>
                price_level_structure:
                  type: string
                  description: >-
                    Optional - This key will exist when the market is created or
                    when the price level structure is updated. The price level
                    structure of the market
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
                  x-parser-schema-id: <anonymous-schema-129>
                price_ranges:
                  type: array
                  description: >-
                    Optional - Emitted alongside price_level_structure (on
                    market creation and price_level_structure_updated events).
                    The valid price bands for the market, in fixed-point
                    dollars. Use this to determine valid order prices rather
                    than hardcoding a tick size.
                  items:
                    type: object
                    required:
                      - start
                      - end
                      - step
                    properties:
                      start:
                        type: string
                        description: Starting price for this band, in dollars
                        x-parser-schema-id: <anonymous-schema-132>
                      end:
                        type: string
                        description: Ending price for this band, in dollars
                        x-parser-schema-id: <anonymous-schema-133>
                      step:
                        type: string
                        description: >-
                          Tick size (minimum price increment) within this band,
                          in dollars
                        x-parser-schema-id: <anonymous-schema-134>
                    x-parser-schema-id: <anonymous-schema-131>
                  x-parser-schema-id: <anonymous-schema-130>
                strike_type:
                  type: string
                  description: >-
                    Optional - This key will ONLY exist for metadata_updated
                    events. Determines how floor_strike / cap_strike are
                    interpreted (e.g. "between" uses both, "greater" uses
                    floor_strike only, "less" uses cap_strike only)
                  x-parser-schema-id: <anonymous-schema-135>
                floor_strike:
                  type: number
                  description: >-
                    Optional - This key will ONLY exist for metadata_updated
                    events. The floor (lower bound) strike value for the market
                  x-parser-schema-id: <anonymous-schema-136>
                cap_strike:
                  type: number
                  description: >-
                    Optional - This key will ONLY exist for metadata_updated
                    events. The cap (upper bound) strike value for the market
                  x-parser-schema-id: <anonymous-schema-137>
                custom_strike:
                  type: object
                  description: >-
                    Optional - This key will ONLY exist for metadata_updated
                    events with a custom or structured strike type
                  x-parser-schema-id: <anonymous-schema-138>
                yes_sub_title:
                  type: string
                  description: >-
                    Optional - This key will ONLY exist for metadata_updated
                    events. The updated yes subtitle for the market
                  x-parser-schema-id: <anonymous-schema-139>
                additional_metadata:
                  type: object
                  description: >-
                    Optional - This key will be emitted when the market is
                    created
                  properties:
                    name:
                      type: string
                      x-parser-schema-id: <anonymous-schema-141>
                    title:
                      type: string
                      x-parser-schema-id: <anonymous-schema-142>
                    yes_sub_title:
                      type: string
                      x-parser-schema-id: <anonymous-schema-143>
                    no_sub_title:
                      type: string
                      x-parser-schema-id: <anonymous-schema-144>
                    rules_primary:
                      type: string
                      x-parser-schema-id: <anonymous-schema-145>
                    rules_secondary:
                      type: string
                      x-parser-schema-id: <anonymous-schema-146>
                    can_close_early:
                      type: boolean
                      x-parser-schema-id: <anonymous-schema-147>
                    event_ticker:
                      type: string
                      x-parser-schema-id: <anonymous-schema-148>
                    expected_expiration_ts:
                      type: integer
                      format: int64
                      x-parser-schema-id: <anonymous-schema-149>
                    strike_type:
                      type: string
                      x-parser-schema-id: <anonymous-schema-150>
                    floor_strike:
                      type: number
                      x-parser-schema-id: <anonymous-schema-151>
                    cap_strike:
                      type: number
                      x-parser-schema-id: <anonymous-schema-152>
                    custom_strike:
                      type: object
                      x-parser-schema-id: <anonymous-schema-153>
                  x-parser-schema-id: <anonymous-schema-140>
              x-parser-schema-id: <anonymous-schema-120>
          x-parser-schema-id: marketLifecycleV2Payload
        title: Market Lifecycle V2
        description: >-
          Market lifecycle events (created, activated, deactivated,
          close_date_updated, determined, settled,
          price_level_structure_updated, metadata_updated)
        example: |-
          {
            "type": "market_lifecycle_v2",
            "sid": 13,
            "msg": {
              "market_ticker": "INXD-23SEP14-B4487",
              "event_type": "created",
              "open_ts": 1694635200,
              "close_ts": 1694721600,
              "price_level_structure": "linear_cent",
              "additional_metadata": {
                "name": "S&P 500 daily return on Sep 14",
                "title": "S&P 500 closes up by 0.02% or more",
                "yes_sub_title": "S&P 500 closes up 0.02%+",
                "no_sub_title": "S&P 500 closes up <0.02%",
                "rules_primary": "The S&P 500 index level at 4:00 PM ET...",
                "rules_secondary": "",
                "can_close_early": true,
                "event_ticker": "INXD-23SEP14",
                "expected_expiration_ts": 1694721600,
                "strike_type": "greater",
                "floor_strike": 4487
              }
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: marketLifecycleV2
    bindings: []
    extensions: &ref_2
      - id: x-parser-unique-object-id
        value: market_lifecycle_v2
  - &ref_4
    id: receiveEventLifecycle
    title: Event Lifecycle
    description: Receive event creation notifications
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
              x-parser-schema-id: <anonymous-schema-154>
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
                  x-parser-schema-id: <anonymous-schema-156>
                title:
                  type: string
                  description: Title of event
                  x-parser-schema-id: <anonymous-schema-157>
                subtitle:
                  type: string
                  description: Subtitle of event
                  x-parser-schema-id: <anonymous-schema-158>
                collateral_return_type:
                  type: string
                  description: >-
                    Collateral return type, MECNET or DIRECNET of the event.
                    Empty if there is no collateral return scheme for the event
                  enum:
                    - MECNET
                    - DIRECNET
                    - ''
                  x-parser-schema-id: <anonymous-schema-159>
                series_ticker:
                  type: string
                  description: Series ticker for the event
                  x-parser-schema-id: <anonymous-schema-160>
                strike_date:
                  type: integer
                  description: >-
                    Optional - Unix timestamp to indicate the strike date of the
                    event if there is one
                  format: int64
                  x-parser-schema-id: <anonymous-schema-161>
                strike_period:
                  type: string
                  description: >-
                    Optional - String to indicate the strike period of the event
                    if there is one
                  x-parser-schema-id: <anonymous-schema-162>
              x-parser-schema-id: <anonymous-schema-155>
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
  - &ref_5
    id: receiveEventFeeUpdate
    title: Event Fee Override Update
    description: Receive notifications when an event-level fee override is set or cleared
    type: send
    messages:
      - &ref_8
        id: eventFeeUpdate
        contentType: application/json
        payload:
          - name: Event Fee Override Update
            description: Emitted when an event-level fee override is set or cleared
            type: object
            properties:
              - name: type
                type: string
                description: event_fee_update
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
                    description: Unique identifier for the event
                    required: true
                  - name: fee_type_override
                    type: string
                    description: >-
                      Event fee type override. `null` when the override has been
                      cleared.
                    enumValues:
                      - quadratic
                      - quadratic_with_maker_fees
                      - flat
                    required: true
                  - name: fee_multiplier_override
                    type: number
                    description: >-
                      Event fee multiplier override. `null` when the override
                      has been cleared.
                    required: true
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
              const: event_fee_update
              x-parser-schema-id: <anonymous-schema-163>
            sid: *ref_1
            msg:
              type: object
              required:
                - event_ticker
                - fee_type_override
                - fee_multiplier_override
              properties:
                event_ticker:
                  type: string
                  description: Unique identifier for the event
                  x-parser-schema-id: <anonymous-schema-165>
                fee_type_override:
                  type: string
                  nullable: true
                  enum:
                    - quadratic
                    - quadratic_with_maker_fees
                    - flat
                    - null
                  description: >-
                    Event fee type override. `null` when the override has been
                    cleared.
                  x-parser-schema-id: <anonymous-schema-166>
                fee_multiplier_override:
                  type: number
                  nullable: true
                  description: >-
                    Event fee multiplier override. `null` when the override has
                    been cleared.
                  x-parser-schema-id: <anonymous-schema-167>
              x-parser-schema-id: <anonymous-schema-164>
          x-parser-schema-id: eventFeeUpdatePayload
        title: Event Fee Override Update
        description: Emitted when an event-level fee override is set or cleared
        example: |-
          {
            "type": "event_fee_update",
            "sid": 5,
            "msg": {
              "event_ticker": "KXBTCD-26MAY2018",
              "fee_type_override": "quadratic",
              "fee_multiplier_override": 1
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: eventFeeUpdate
    bindings: []
    extensions: *ref_2
sendOperations: []
receiveOperations:
  - *ref_3
  - *ref_4
  - *ref_5
sendMessages: []
receiveMessages:
  - *ref_6
  - *ref_7
  - *ref_8
extensions:
  - id: x-parser-unique-object-id
    value: market_lifecycle_v2
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