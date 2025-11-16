---
url: https://docs.kalshi.com/api-reference/events/get-events
lastmod: 2025-11-15T22:33:03.925Z
---
# Get Events

> Filter by event status. Possible values: 'open', 'closed', 'settled'. Leave empty to return events with any status.

## OpenAPI

````yaml openapi.yaml get /events
paths:
  path: /events
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security: []
    parameters:
      path: {}
      query:
        limit:
          schema:
            - type: integer
              required: false
              description: >-
                Parameter to specify the number of results per page. Defaults to
                200. Maximum value is 200.
              maximum: 200
              minimum: 1
              default: 200
        cursor:
          schema:
            - type: string
              required: false
              description: >-
                Parameter to specify the pagination cursor. Use the cursor value
                returned from the previous response to get the next page of
                results. Leave empty for the first page.
        with_nested_markets:
          schema:
            - type: boolean
              required: false
              description: >-
                Parameter to specify if nested markets should be included in the
                response. When true, each event will include a 'markets' field
                containing a list of Market objects associated with that event.
              default: false
        with_milestones:
          schema:
            - type: boolean
              required: false
              description: >-
                If true, includes related milestones as a field alongside
                events.
              default: false
        status:
          schema:
            - type: enum<string>
              enum:
                - open
                - closed
                - settled
              required: false
              description: >-
                Filter by event status. Possible values are 'open', 'closed',
                'settled'. Leave empty to return events with any status.
        series_ticker:
          schema:
            - type: string
              description: Filter by series ticker
        min_close_ts:
          schema:
            - type: integer
              required: false
              description: >-
                Filter events with at least one market with close timestamp
                greater than this Unix timestamp (in seconds).
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              events:
                allOf:
                  - type: array
                    description: Array of events matching the query criteria.
                    items:
                      $ref: '#/components/schemas/EventData'
              milestones:
                allOf:
                  - type: array
                    description: Array of milestones related to the events.
                    items:
                      $ref: '#/components/schemas/Milestone'
              cursor:
                allOf:
                  - type: string
                    description: >-
                      Pagination cursor for the next page. Empty if there are no
                      more results.
            refIdentifier: '#/components/schemas/GetEventsResponse'
            requiredProperties:
              - events
              - cursor
        examples:
          example:
            value:
              events:
                - event_ticker: <string>
                  series_ticker: <string>
                  sub_title: <string>
                  title: <string>
                  collateral_return_type: <string>
                  mutually_exclusive: true
                  category: <string>
                  strike_date: '2023-11-07T05:31:56Z'
                  strike_period: <string>
                  markets:
                    - ticker: <string>
                      event_ticker: <string>
                      market_type: binary
                      title: <string>
                      subtitle: <string>
                      yes_sub_title: <string>
                      no_sub_title: <string>
                      created_time: '2023-11-07T05:31:56Z'
                      open_time: '2023-11-07T05:31:56Z'
                      close_time: '2023-11-07T05:31:56Z'
                      expected_expiration_time: '2023-11-07T05:31:56Z'
                      expiration_time: '2023-11-07T05:31:56Z'
                      latest_expiration_time: '2023-11-07T05:31:56Z'
                      settlement_timer_seconds: 123
                      status: initialized
                      response_price_units: usd_cent
                      yes_bid: 123
                      yes_bid_dollars: <string>
                      yes_ask: 123
                      yes_ask_dollars: <string>
                      no_bid: 123
                      no_bid_dollars: <string>
                      no_ask: 123
                      no_ask_dollars: <string>
                      last_price: 123
                      last_price_dollars: <string>
                      volume: 123
                      volume_24h: 123
                      result: 'yes'
                      can_close_early: true
                      open_interest: 123
                      notional_value: 123
                      notional_value_dollars: <string>
                      previous_yes_bid: 123
                      previous_yes_bid_dollars: <string>
                      previous_yes_ask: 123
                      previous_yes_ask_dollars: <string>
                      previous_price: 123
                      previous_price_dollars: <string>
                      liquidity: 123
                      liquidity_dollars: <string>
                      settlement_value: 123
                      settlement_value_dollars: <string>
                      expiration_value: <string>
                      category: <string>
                      risk_limit_cents: 123
                      fee_waiver_expiration_time: '2023-11-07T05:31:56Z'
                      early_close_condition: <string>
                      tick_size: 123
                      strike_type: greater
                      floor_strike: 123
                      cap_strike: 123
                      functional_strike: <string>
                      custom_strike: {}
                      rules_primary: <string>
                      rules_secondary: <string>
                      mve_collection_ticker: <string>
                      mve_selected_legs:
                        - event_ticker: <string>
                          market_ticker: <string>
                          side: <string>
                      primary_participant_key: <string>
                      price_level_structure: <string>
                      price_ranges:
                        - start: <string>
                          end: <string>
                          step: <string>
                  available_on_brokers: true
                  product_metadata: {}
              milestones:
                - id: <string>
                  category: <string>
                  type: <string>
                  start_date: '2023-11-07T05:31:56Z'
                  end_date: '2023-11-07T05:31:56Z'
                  related_event_tickers:
                    - <string>
                  title: <string>
                  notification_message: <string>
                  source_id: <string>
                  details: {}
                  primary_event_tickers:
                    - <string>
                  last_updated_ts: '2023-11-07T05:31:56Z'
              cursor: <string>
        description: Events retrieved successfully
    '400':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Bad request
        examples: {}
        description: Bad request
    '401':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Unauthorized
        examples: {}
        description: Unauthorized
    '500':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Internal server error
        examples: {}
        description: Internal server error
  deprecated: false
  type: path
components:
  schemas:
    Milestone:
      type: object
      required:
        - id
        - category
        - type
        - start_date
        - related_event_tickers
        - title
        - notification_message
        - details
        - primary_event_tickers
        - last_updated_ts
      properties:
        id:
          type: string
          description: Unique identifier for the milestone.
        category:
          type: string
          description: Category of the milestone.
        type:
          type: string
          description: Type of the milestone.
        start_date:
          type: string
          format: date-time
          description: Start date of the milestone.
        end_date:
          type: string
          format: date-time
          nullable: true
          description: End date of the milestone, if any.
        related_event_tickers:
          type: array
          items:
            type: string
          description: List of event tickers related to this milestone.
        title:
          type: string
          description: Title of the milestone.
        notification_message:
          type: string
          description: Notification message for the milestone.
        source_id:
          type: string
          nullable: true
          description: Source id of milestone if available.
        details:
          type: object
          additionalProperties: true
          description: Additional details about the milestone.
        primary_event_tickers:
          type: array
          items:
            type: string
          description: >-
            List of event tickers directly related to the outcome of this
            milestone.
        last_updated_ts:
          type: string
          format: date-time
          description: Last time this structured target was updated.
    EventData:
      type: object
      required:
        - event_ticker
        - series_ticker
        - sub_title
        - title
        - collateral_return_type
        - mutually_exclusive
        - category
        - available_on_brokers
        - product_metadata
      properties:
        event_ticker:
          type: string
          description: Unique identifier for this event.
        series_ticker:
          type: string
          description: Unique identifier for the series this event belongs to.
        sub_title:
          type: string
          description: Shortened descriptive title for the event.
        title:
          type: string
          description: Full title of the event.
        collateral_return_type:
          type: string
          description: >-
            Specifies how collateral is returned when markets settle (e.g.,
            'binary' for standard yes/no markets).
        mutually_exclusive:
          type: boolean
          description: >-
            If true, only one market in this event can resolve to 'yes'. If
            false, multiple markets can resolve to 'yes'.
        category:
          type: string
          description: Event category (deprecated, use series-level category instead).
        strike_date:
          type: string
          format: date-time
          nullable: true
          x-omitempty: true
          description: >-
            The specific date this event is based on. Only filled when the event
            uses a date strike (mutually exclusive with strike_period).
        strike_period:
          type: string
          nullable: true
          x-omitempty: true
          description: >-
            The time period this event covers (e.g., 'week', 'month'). Only
            filled when the event uses a period strike (mutually exclusive with
            strike_date).
        markets:
          type: array
          x-omitempty: true
          description: >-
            Array of markets associated with this event. Only populated when
            'with_nested_markets=true' is specified in the request.
          items:
            $ref: '#/components/schemas/Market'
          x-go-type-skip-optional-pointer: true
        available_on_brokers:
          type: boolean
          description: Whether this event is available to trade on brokers.
        product_metadata:
          type: object
          nullable: true
          x-omitempty: true
          description: Additional metadata for the event.
          x-go-type-skip-optional-pointer: true
    MveSelectedLeg:
      type: object
      properties:
        event_ticker:
          type: string
          description: Unique identifier for the selected event
          x-go-type-skip-optional-pointer: true
        market_ticker:
          type: string
          description: Unique identifier for the selected market
          x-go-type-skip-optional-pointer: true
        side:
          type: string
          description: The side of the selected market
          x-go-type-skip-optional-pointer: true
    PriceRange:
      type: object
      required:
        - start
        - end
        - step
      properties:
        start:
          type: string
          description: Starting price for this range in dollars
        end:
          type: string
          description: Ending price for this range in dollars
        step:
          type: string
          description: Price step/tick size for this range in dollars
    Market:
      type: object
      required:
        - ticker
        - event_ticker
        - market_type
        - title
        - subtitle
        - yes_sub_title
        - no_sub_title
        - created_time
        - open_time
        - close_time
        - expiration_time
        - latest_expiration_time
        - settlement_timer_seconds
        - status
        - response_price_units
        - notional_value
        - notional_value_dollars
        - yes_bid
        - yes_bid_dollars
        - yes_ask
        - yes_ask_dollars
        - no_bid
        - no_bid_dollars
        - no_ask
        - no_ask_dollars
        - last_price
        - last_price_dollars
        - previous_yes_bid
        - previous_yes_bid_dollars
        - previous_yes_ask
        - previous_yes_ask_dollars
        - previous_price
        - previous_price_dollars
        - volume
        - volume_24h
        - liquidity
        - liquidity_dollars
        - open_interest
        - result
        - can_close_early
        - expiration_value
        - category
        - risk_limit_cents
        - rules_primary
        - rules_secondary
        - tick_size
        - price_level_structure
        - price_ranges
      properties:
        ticker:
          type: string
        event_ticker:
          type: string
        market_type:
          type: string
          enum:
            - binary
            - scalar
          description: Identifies the type of market
        title:
          type: string
          deprecated: true
        subtitle:
          type: string
          deprecated: true
        yes_sub_title:
          type: string
          description: Shortened title for the yes side of this market
        no_sub_title:
          type: string
          description: Shortened title for the no side of this market
        created_time:
          type: string
          format: date-time
        open_time:
          type: string
          format: date-time
        close_time:
          type: string
          format: date-time
        expected_expiration_time:
          type: string
          format: date-time
          nullable: true
          x-omitempty: true
          description: Time when this market is expected to expire
        expiration_time:
          type: string
          format: date-time
          deprecated: true
        latest_expiration_time:
          type: string
          format: date-time
          description: Latest possible time for this market to expire
        settlement_timer_seconds:
          type: integer
          description: The amount of time after determination that the market settles
        status:
          type: string
          enum:
            - initialized
            - active
            - closed
            - settled
            - determined
        response_price_units:
          type: string
          enum:
            - usd_cent
          description: The units used to express all price related fields
        yes_bid:
          type: number
        yes_bid_dollars:
          type: string
          description: Price for the highest YES buy offer on this market in dollars
        yes_ask:
          type: number
        yes_ask_dollars:
          type: string
          description: Price for the lowest YES sell offer on this market in dollars
        no_bid:
          type: number
        no_bid_dollars:
          type: string
          description: Price for the highest NO buy offer on this market in dollars
        no_ask:
          type: number
        no_ask_dollars:
          type: string
          description: Price for the lowest NO sell offer on this market in dollars
        last_price:
          type: number
        last_price_dollars:
          type: string
          description: Price for the last traded YES contract on this market in dollars
        volume:
          type: integer
        volume_24h:
          type: integer
        result:
          type: string
          enum:
            - 'yes'
            - 'no'
            - ''
        can_close_early:
          type: boolean
        open_interest:
          type: integer
          description: Number of contracts bought on this market disconsidering netting
        notional_value:
          type: integer
          description: The total value of a single contract at settlement in cents
        notional_value_dollars:
          type: string
          description: The total value of a single contract at settlement in dollars
        previous_yes_bid:
          type: integer
          description: >-
            Price for the highest YES buy offer on this market a day ago in
            cents
        previous_yes_bid_dollars:
          type: string
          description: >-
            Price for the highest YES buy offer on this market a day ago in
            dollars
        previous_yes_ask:
          type: integer
          description: >-
            Price for the lowest YES sell offer on this market a day ago in
            cents
        previous_yes_ask_dollars:
          type: string
          description: >-
            Price for the lowest YES sell offer on this market a day ago in
            dollars
        previous_price:
          type: integer
          description: >-
            Price for the last traded YES contract on this market a day ago in
            cents
        previous_price_dollars:
          type: string
          description: >-
            Price for the last traded YES contract on this market a day ago in
            dollars
        liquidity:
          type: integer
          description: Value for current offers in this market in cents
        liquidity_dollars:
          type: string
          description: Value for current offers in this market in dollars
        settlement_value:
          type: integer
          nullable: true
          x-omitempty: true
          description: >-
            The settlement value of the YES/LONG side of the contract in cents.
            Only filled after determination
        settlement_value_dollars:
          type: string
          nullable: true
          x-omitempty: true
          description: >-
            The settlement value of the YES/LONG side of the contract in
            dollars. Only filled after determination
        expiration_value:
          type: string
          description: The value that was considered for the settlement
        category:
          type: string
          deprecated: true
        risk_limit_cents:
          type: integer
          deprecated: true
        fee_waiver_expiration_time:
          type: string
          format: date-time
          nullable: true
          x-omitempty: true
          description: Time when this market's fee waiver expires
        early_close_condition:
          type: string
          nullable: true
          x-omitempty: true
          description: The condition under which the market can close early
          x-go-type-skip-optional-pointer: true
        tick_size:
          type: integer
          description: The minimum price movement in the market
        strike_type:
          type: string
          enum:
            - greater
            - greater_or_equal
            - less
            - less_or_equal
            - between
            - functional
            - custom
            - structured
          x-omitempty: true
          description: Strike type defines how the market strike is defined and evaluated
          x-go-type-skip-optional-pointer: true
        floor_strike:
          type: number
          format: double
          nullable: true
          x-omitempty: true
          description: Minimum expiration value that leads to a YES settlement
        cap_strike:
          type: number
          format: double
          nullable: true
          x-omitempty: true
          description: Maximum expiration value that leads to a YES settlement
        functional_strike:
          type: string
          nullable: true
          x-omitempty: true
          description: Mapping from expiration values to settlement values
        custom_strike:
          type: object
          nullable: true
          x-omitempty: true
          description: Expiration value for each target that leads to a YES settlement
        rules_primary:
          type: string
          description: A plain language description of the most important market terms
        rules_secondary:
          type: string
          description: A plain language description of secondary market terms
        mve_collection_ticker:
          type: string
          x-omitempty: true
          description: The ticker of the multivariate event collection
          x-go-type-skip-optional-pointer: true
        mve_selected_legs:
          type: array
          x-omitempty: true
          items:
            $ref: '#/components/schemas/MveSelectedLeg'
          x-go-type-skip-optional-pointer: true
        primary_participant_key:
          type: string
          nullable: true
          x-omitempty: true
        price_level_structure:
          type: string
          description: >-
            Price level structure for this market, defining price ranges and
            tick sizes
        price_ranges:
          type: array
          description: Valid price ranges for orders on this market
          items:
            $ref: '#/components/schemas/PriceRange'

````