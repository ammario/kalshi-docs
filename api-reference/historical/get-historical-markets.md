---
url: https://docs.kalshi.com/api-reference/historical/get-historical-markets
lastmod: 2026-02-21T18:47:38.293Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Historical Markets

> Endpoint for getting markets that have been archived to the historical database. Filters are mutually exclusive.




## OpenAPI

````yaml openapi.yaml get /historical/markets
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.8.0
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
  /historical/markets:
    get:
      tags:
        - historical
      summary: Get Historical Markets
      description: >
        Endpoint for getting markets that have been archived to the historical
        database. Filters are mutually exclusive.
      operationId: GetHistoricalMarkets
      parameters:
        - $ref: '#/components/parameters/MarketLimitQuery'
        - $ref: '#/components/parameters/CursorQuery'
        - $ref: '#/components/parameters/TickersQuery'
        - $ref: '#/components/parameters/EventTickerQuery'
        - $ref: '#/components/parameters/MveHistoricalFilterQuery'
      responses:
        '200':
          description: Historical markets retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarketsResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '500':
          $ref: '#/components/responses/InternalServerError'
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
    TickersQuery:
      name: tickers
      in: query
      description: >-
        Filter by specific market tickers. Comma-separated list of market
        tickers to retrieve.
      schema:
        type: string
    EventTickerQuery:
      name: event_ticker
      in: query
      description: >-
        Event ticker of desired positions. Multiple event tickers can be
        provided as a comma-separated list (maximum 10).
      schema:
        type: string
        x-go-type-skip-optional-pointer: true
    MveHistoricalFilterQuery:
      name: mve_filter
      in: query
      description: >-
        Filter by multivariate events (combos). By default, MVE markets are
        included.
      schema:
        type: string
        enum:
          - exclude
        nullable: true
        default: null
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
        - updated_time
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
        - fractional_trading_enabled
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
        updated_time:
          type: string
          format: date-time
          description: Time of the last non-trading metadata update.
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
            - scalar
            - ''
        can_close_early:
          type: boolean
        fractional_trading_enabled:
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
          description: 'DEPRECATED: This field is deprecated and will always return 0.'
        liquidity_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          deprecated: true
          description: >-
            DEPRECATED: This field is deprecated and will always return
            "0.0000".
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
    ErrorResponse:
      type: object
      properties:
        code:
          type: string
          description: Error code
        message:
          type: string
          description: Human-readable error message
        details:
          type: string
          description: Additional details about the error, if available
        service:
          type: string
          description: The name of the service that generated the error
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with up to 4 decimal
        places of precision. This is the maximum supported precision; valid
        quote intervals for a given market are constrained by that market's
        price level structure.
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
  responses:
    BadRequestError:
      description: Bad request - invalid input
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    InternalServerError:
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'

````