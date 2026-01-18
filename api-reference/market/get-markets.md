---
url: https://docs.kalshi.com/api-reference/market/get-markets
lastmod: 2026-01-16T17:20:19.124Z
---
# Get Markets

> Filter by market status. Possible values: `unopened`, `open`, `closed`, `settled`. Leave empty to return markets with any status.
 - Only one `status` filter may be supplied at a time.
 - Timestamp filters will be mutually exclusive from other timestamp filters and certain status filters.

 | Compatible Timestamp Filters | Additional Status Filters|
 |------------------------------|--------------------------|
 | min_created_ts, max_created_ts | `unopened`, `open`, *empty* |
 | min_close_ts, max_close_ts | `closed`, *empty* |
 | min_settled_ts, max_settled_ts | `settled`, *empty* |




## OpenAPI

````yaml openapi.yaml get /markets
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.5.0
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
  /markets:
    get:
      tags:
        - market
      summary: Get Markets
      description: >
        Filter by market status. Possible values: `unopened`, `open`, `closed`,
        `settled`. Leave empty to return markets with any status.
         - Only one `status` filter may be supplied at a time.
         - Timestamp filters will be mutually exclusive from other timestamp filters and certain status filters.

         | Compatible Timestamp Filters | Additional Status Filters|
         |------------------------------|--------------------------|
         | min_created_ts, max_created_ts | `unopened`, `open`, *empty* |
         | min_close_ts, max_close_ts | `closed`, *empty* |
         | min_settled_ts, max_settled_ts | `settled`, *empty* |
      operationId: GetMarkets
      parameters:
        - $ref: '#/components/parameters/MarketLimitQuery'
        - $ref: '#/components/parameters/CursorQuery'
        - $ref: '#/components/parameters/EventTickerQuery'
        - $ref: '#/components/parameters/SeriesTickerQuery'
        - $ref: '#/components/parameters/MinCreatedTsQuery'
        - $ref: '#/components/parameters/MaxCreatedTsQuery'
        - $ref: '#/components/parameters/MaxCloseTsQuery'
        - $ref: '#/components/parameters/MinCloseTsQuery'
        - $ref: '#/components/parameters/MinSettledTsQuery'
        - $ref: '#/components/parameters/MaxSettledTsQuery'
        - $ref: '#/components/parameters/MarketStatusQuery'
        - $ref: '#/components/parameters/TickersQuery'
        - $ref: '#/components/parameters/MveFilterQuery'
      responses:
        '200':
          description: Markets retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarketsResponse'
        '400':
          description: Bad request
        '401':
          description: Unauthorized
        '500':
          description: Internal server error
components:
  parameters:
    MarketLimitQuery:
      name: limit
      in: query
      description: Number of results per page. Defaults to 100. Maximum value is 1000.
      schema:
        type: integer
        format: int64
        minimum: 1
        maximum: 1000
        default: 100
        x-oapi-codegen-extra-tags:
          validate: omitempty,gte=1,lte=1000
    CursorQuery:
      name: cursor
      in: query
      description: >-
        Pagination cursor. Use the cursor value returned from the previous
        response to get the next page of results. Leave empty for the first
        page.
      schema:
        type: string
        x-go-type-skip-optional-pointer: true
    EventTickerQuery:
      name: event_ticker
      in: query
      description: >-
        Event ticker of desired positions. Multiple event tickers can be
        provided as a comma-separated list (maximum 10).
      schema:
        type: string
        x-go-type-skip-optional-pointer: true
    SeriesTickerQuery:
      name: series_ticker
      in: query
      description: Filter by series ticker
      schema:
        type: string
        x-go-type-skip-optional-pointer: true
    MinCreatedTsQuery:
      name: min_created_ts
      in: query
      description: Filter items that created after this Unix timestamp
      schema:
        type: integer
        format: int64
    MaxCreatedTsQuery:
      name: max_created_ts
      in: query
      description: Filter items that created before this Unix timestamp
      schema:
        type: integer
        format: int64
    MaxCloseTsQuery:
      name: max_close_ts
      in: query
      description: Filter items that close before this Unix timestamp
      schema:
        type: integer
        format: int64
    MinCloseTsQuery:
      name: min_close_ts
      in: query
      description: Filter items that close after this Unix timestamp
      schema:
        type: integer
        format: int64
    MinSettledTsQuery:
      name: min_settled_ts
      in: query
      description: Filter items that settled after this Unix timestamp
      schema:
        type: integer
        format: int64
    MaxSettledTsQuery:
      name: max_settled_ts
      in: query
      description: Filter items that settled before this Unix timestamp
      schema:
        type: integer
        format: int64
    MarketStatusQuery:
      name: status
      in: query
      description: Filter by market status. Leave empty to return markets with any status.
      schema:
        type: string
        enum:
          - unopened
          - open
          - paused
          - closed
          - settled
    TickersQuery:
      name: tickers
      in: query
      description: >-
        Filter by specific market tickers. Comma-separated list of market
        tickers to retrieve.
      schema:
        type: string
    MveFilterQuery:
      name: mve_filter
      in: query
      description: >-
        Filter by multivariate events (combos). 'only' returns only multivariate
        events, 'exclude' excludes multivariate events.
      schema:
        type: string
        enum:
          - only
          - exclude
  schemas:
    GetMarketsResponse:
      type: object
      required:
        - markets
        - cursor
      properties:
        markets:
          type: array
          items:
            $ref: '#/components/schemas/Market'
        cursor:
          type: string
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
        - volume_fp
        - volume_24h
        - volume_24h_fp
        - liquidity
        - liquidity_dollars
        - open_interest
        - open_interest_fp
        - result
        - can_close_early
        - expiration_value
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
          deprecated: true
          description: 'DEPRECATED: Use price_level_structure and price_ranges instead.'
        yes_bid:
          type: number
          deprecated: true
          description: 'DEPRECATED: Use yes_bid_dollars instead.'
        yes_bid_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Price for the highest YES buy offer on this market in dollars
        yes_ask:
          type: number
          deprecated: true
          description: 'DEPRECATED: Use yes_ask_dollars instead.'
        yes_ask_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Price for the lowest YES sell offer on this market in dollars
        no_bid:
          type: number
          deprecated: true
          description: 'DEPRECATED: Use no_bid_dollars instead.'
        no_bid_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Price for the highest NO buy offer on this market in dollars
        no_ask:
          type: number
          deprecated: true
          description: 'DEPRECATED: Use no_ask_dollars instead.'
        no_ask_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Price for the lowest NO sell offer on this market in dollars
        last_price:
          type: number
          deprecated: true
          description: 'DEPRECATED: Use last_price_dollars instead.'
        last_price_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Price for the last traded YES contract on this market in dollars
        volume:
          type: integer
        volume_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: String representation of the market volume in contracts
        volume_24h:
          type: integer
        volume_24h_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: String representation of the 24h market volume in contracts
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
        open_interest_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            String representation of the number of contracts bought on this
            market disconsidering netting
        notional_value:
          type: integer
          deprecated: true
          description: 'DEPRECATED: Use notional_value_dollars instead.'
        notional_value_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: The total value of a single contract at settlement in dollars
        previous_yes_bid:
          type: integer
          deprecated: true
          description: 'DEPRECATED: Use previous_yes_bid_dollars instead.'
        previous_yes_bid_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Price for the highest YES buy offer on this market a day ago in
            dollars
        previous_yes_ask:
          type: integer
          deprecated: true
          description: 'DEPRECATED: Use previous_yes_ask_dollars instead.'
        previous_yes_ask_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Price for the lowest YES sell offer on this market a day ago in
            dollars
        previous_price:
          type: integer
          deprecated: true
          description: 'DEPRECATED: Use previous_price_dollars instead.'
        previous_price_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Price for the last traded YES contract on this market a day ago in
            dollars
        liquidity:
          type: integer
          deprecated: true
          description: 'DEPRECATED: Use liquidity_dollars instead.'
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
          deprecated: true
          description: 'DEPRECATED: Use price_level_structure and price_ranges instead.'
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
        is_provisional:
          type: boolean
          x-omitempty: true
          description: >-
            If true, the market may be removed after determination if there is
            no activity on it
          x-go-type-skip-optional-pointer: true
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with exactly 4 decimal
        places
      example: '0.5600'
    FixedPointCount:
      type: string
      description: >-
        Fixed-point contract count string (2 decimals, e.g., "10.00"; referred
        to as "fp" in field names). Requests accept 0–2 decimal places (e.g.,
        "10", "10.0", "10.00"); responses always emit 2 decimals. Currently only
        whole contract values are permitted, but the format supports future
        fractional precision. Integer contract count fields are legacy and will
        be deprecated; when both integer and fp fields are provided, they must
        match.
      example: '10.00'
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
        yes_settlement_value_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          x-omitempty: true
          description: >-
            The settlement value of the YES/LONG side of the contract in
            dollars. Only filled after determination
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