---
url: https://docs.kalshi.com/api-reference/events/get-events
lastmod: 2025-12-19T22:17:25.249Z
---
# Get Events

> Get all events. This endpoint excludes multivariate events.
To retrieve multivariate events, use the GET /events/multivariate endpoint.




## OpenAPI

````yaml openapi.yaml get /events
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.3.0
  description: >-
    Manually defined OpenAPI spec for endpoints being migrated to spec-first
    approach
servers:
  - url: https://api.elections.kalshi.com/trade-api/v2
    description: Production server
security: []
tags:
  - name: api-keys
    description: API key management endpoints
  - name: orders
    description: Order management endpoints
  - name: order-groups
    description: Order group management endpoints
  - name: portfolio
    description: Portfolio and balance information endpoints
  - name: communications
    description: Request-for-quote (RFQ) endpoints
  - name: multivariate
    description: Multivariate event collection endpoints
  - name: exchange
    description: Exchange status and information endpoints
  - name: live-data
    description: Live data endpoints
  - name: markets
    description: Market data endpoints
  - name: milestone
    description: Milestone endpoints
  - name: search
    description: Search and filtering endpoints
  - name: incentive-programs
    description: Incentive program endpoints
  - name: fcm
    description: FCM member specific endpoints
  - name: events
    description: Event endpoints
  - name: structured-targets
    description: Structured targets endpoints
paths:
  /events:
    get:
      tags:
        - events
      summary: Get Events
      description: >
        Get all events. This endpoint excludes multivariate events.

        To retrieve multivariate events, use the GET /events/multivariate
        endpoint.
      operationId: GetEvents
      parameters:
        - name: limit
          in: query
          required: false
          description: >-
            Parameter to specify the number of results per page. Defaults to
            200. Maximum value is 200.
          schema:
            type: integer
            minimum: 1
            maximum: 200
            default: 200
        - name: cursor
          in: query
          required: false
          description: >-
            Parameter to specify the pagination cursor. Use the cursor value
            returned from the previous response to get the next page of results.
            Leave empty for the first page.
          schema:
            type: string
        - name: with_nested_markets
          in: query
          required: false
          description: >-
            Parameter to specify if nested markets should be included in the
            response. When true, each event will include a 'markets' field
            containing a list of Market objects associated with that event.
          schema:
            type: boolean
            default: false
          x-go-type-skip-optional-pointer: true
        - name: with_milestones
          in: query
          required: false
          description: If true, includes related milestones as a field alongside events.
          schema:
            type: boolean
            default: false
          x-go-type-skip-optional-pointer: true
        - name: status
          in: query
          required: false
          description: >-
            Filter by event status. Possible values are 'open', 'closed',
            'settled'. Leave empty to return events with any status.
          schema:
            type: string
            enum:
              - open
              - closed
              - settled
        - $ref: '#/components/parameters/SeriesTickerQuery'
        - name: min_close_ts
          in: query
          required: false
          description: >-
            Filter events with at least one market with close timestamp greater
            than this Unix timestamp (in seconds).
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: Events retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetEventsResponse'
        '400':
          description: Bad request
        '401':
          description: Unauthorized
        '500':
          description: Internal server error
components:
  parameters:
    SeriesTickerQuery:
      name: series_ticker
      in: query
      description: Filter by series ticker
      schema:
        type: string
        x-go-type-skip-optional-pointer: true
  schemas:
    GetEventsResponse:
      type: object
      required:
        - events
        - cursor
      properties:
        events:
          type: array
          description: Array of events matching the query criteria.
          items:
            $ref: '#/components/schemas/EventData'
        milestones:
          type: array
          description: Array of milestones related to the events.
          items:
            $ref: '#/components/schemas/Milestone'
        cursor:
          type: string
          description: >-
            Pagination cursor for the next page. Empty if there are no more
            results.
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
            - inactive
            - active
            - closed
            - determined
            - disputed
            - amended
            - finalized
          description: The current status of the market in its lifecycle.
        response_price_units:
          type: string
          enum:
            - usd_cent
          description: The units used to express all price related fields
        yes_bid:
          type: number
        yes_bid_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Price for the highest YES buy offer on this market in dollars
        yes_ask:
          type: number
        yes_ask_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Price for the lowest YES sell offer on this market in dollars
        no_bid:
          type: number
        no_bid_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Price for the highest NO buy offer on this market in dollars
        no_ask:
          type: number
        no_ask_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Price for the lowest NO sell offer on this market in dollars
        last_price:
          type: number
        last_price_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
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
          $ref: '#/components/schemas/FixedPointDollars'
          description: The total value of a single contract at settlement in dollars
        previous_yes_bid:
          type: integer
          description: >-
            Price for the highest YES buy offer on this market a day ago in
            cents
        previous_yes_bid_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Price for the highest YES buy offer on this market a day ago in
            dollars
        previous_yes_ask:
          type: integer
          description: >-
            Price for the lowest YES sell offer on this market a day ago in
            cents
        previous_yes_ask_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Price for the lowest YES sell offer on this market a day ago in
            dollars
        previous_price:
          type: integer
          description: >-
            Price for the last traded YES contract on this market a day ago in
            cents
        previous_price_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Price for the last traded YES contract on this market a day ago in
            dollars
        liquidity:
          type: integer
          description: Value for current offers in this market in cents
        liquidity_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Value for current offers in this market in dollars
        settlement_value:
          type: integer
          nullable: true
          x-omitempty: true
          description: >-
            The settlement value of the YES/LONG side of the contract in cents.
            Only filled after determination
        settlement_value_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          x-omitempty: true
          description: >-
            The settlement value of the YES/LONG side of the contract in
            dollars. Only filled after determination
        settlement_ts:
          type: string
          format: date-time
          nullable: true
          x-omitempty: true
          description: >-
            Timestamp when the market was settled. Only filled for settled
            markets
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
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with exactly 4 decimal
        places
      example: '0.5600'
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

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt