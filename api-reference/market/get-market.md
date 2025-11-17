---
url: https://docs.kalshi.com/api-reference/market/get-market
lastmod: 2025-11-16T23:50:40.164Z
---
# Get Market

>  Endpoint for getting data about a specific market by its ticker. A market represents a specific binary outcome within an event that users can trade on (e.g., "Will candidate X win?"). Markets have yes/no positions, current prices, volume, and settlement rules.

## OpenAPI

````yaml openapi.yaml get /markets/{ticker}
paths:
  path: /markets/{ticker}
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security: []
    parameters:
      path:
        ticker:
          schema:
            - type: string
              required: true
              description: Market ticker
      query: {}
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              market:
                allOf:
                  - $ref: '#/components/schemas/Market'
            refIdentifier: '#/components/schemas/GetMarketResponse'
            requiredProperties:
              - market
        examples:
          example:
            value:
              market:
                ticker: <string>
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
        description: Market retrieved successfully
    '401':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Unauthorized
        examples: {}
        description: Unauthorized
    '404':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Not found
        examples: {}
        description: Not found
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