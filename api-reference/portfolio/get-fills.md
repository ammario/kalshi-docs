---
url: https://docs.kalshi.com/api-reference/portfolio/get-fills
lastmod: 2026-05-08T15:40:02.047Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Fills

> Endpoint for getting all fills for the member. A fill is when a trade you have is matched.
Fills that occurred before the historical cutoff are only available via `GET /historical/fills`. See [Historical Data](https://docs.kalshi.com/getting_started/historical_data) for details.




## OpenAPI

````yaml /openapi.yaml get /portfolio/fills
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.16.0
  description: >-
    Manually defined OpenAPI spec for endpoints being migrated to spec-first
    approach
servers:
  - url: https://external-api.kalshi.com/trade-api/v2
    description: Production Trade API server
  - url: https://api.elections.kalshi.com/trade-api/v2
    description: Production shared API server, also supported
  - url: https://external-api.demo.kalshi.co/trade-api/v2
    description: Demo Trade API server
  - url: https://demo-api.kalshi.co/trade-api/v2
    description: Demo shared API server, also supported
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
  /portfolio/fills:
    get:
      tags:
        - portfolio
      summary: Get Fills
      description: >
        Endpoint for getting all fills for the member. A fill is when a trade
        you have is matched.

        Fills that occurred before the historical cutoff are only available via
        `GET /historical/fills`. See [Historical
        Data](https://docs.kalshi.com/getting_started/historical_data) for
        details.
      operationId: GetFills
      parameters:
        - $ref: '#/components/parameters/TickerQuery'
        - $ref: '#/components/parameters/OrderIdQuery'
        - $ref: '#/components/parameters/MinTsQuery'
        - $ref: '#/components/parameters/MaxTsQuery'
        - $ref: '#/components/parameters/LimitQuery'
        - $ref: '#/components/parameters/CursorQuery'
        - $ref: '#/components/parameters/SubaccountQuery'
      responses:
        '200':
          description: Fills retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetFillsResponse'
        '400':
          description: Bad request
        '401':
          description: Unauthorized
        '500':
          description: Internal server error
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  parameters:
    TickerQuery:
      name: ticker
      in: query
      description: Filter by market ticker
      schema:
        type: string
        x-go-type-skip-optional-pointer: true
    OrderIdQuery:
      name: order_id
      in: query
      description: Filter by order ID
      schema:
        type: string
        x-go-type-skip-optional-pointer: true
    MinTsQuery:
      name: min_ts
      in: query
      description: Filter items after this Unix timestamp
      schema:
        type: integer
        format: int64
    MaxTsQuery:
      name: max_ts
      in: query
      description: Filter items before this Unix timestamp
      schema:
        type: integer
        format: int64
    LimitQuery:
      name: limit
      in: query
      description: Number of results per page. Defaults to 100.
      schema:
        type: integer
        format: int64
        minimum: 1
        maximum: 1000
        default: 100
        x-oapi-codegen-extra-tags:
          validate: omitempty,min=1,max=1000
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
    SubaccountQuery:
      name: subaccount
      in: query
      description: >-
        Subaccount number (0 for primary, 1-32 for subaccounts). If omitted,
        defaults to all subaccounts.
      schema:
        type: integer
  schemas:
    GetFillsResponse:
      type: object
      required:
        - fills
        - cursor
      properties:
        fills:
          type: array
          items:
            $ref: '#/components/schemas/Fill'
        cursor:
          type: string
    Fill:
      type: object
      required:
        - fill_id
        - trade_id
        - order_id
        - ticker
        - market_ticker
        - side
        - action
        - outcome_side
        - book_side
        - count_fp
        - yes_price_dollars
        - no_price_dollars
        - is_taker
        - fee_cost
      properties:
        fill_id:
          type: string
          description: Unique identifier for this fill
        trade_id:
          type: string
          description: Unique identifier for this fill (legacy field name, same as fill_id)
        order_id:
          type: string
          description: Unique identifier for the order that resulted in this fill
        ticker:
          type: string
          description: Unique identifier for the market
        market_ticker:
          type: string
          description: Unique identifier for the market (legacy field name, same as ticker)
        side:
          type: string
          enum:
            - 'yes'
            - 'no'
          deprecated: true
          description: >
            Deprecated. Use `outcome_side` (or `book_side`) instead. See [Order
            direction](/getting_started/order_direction). This field will not be
            removed before May 14, 2026.
        action:
          type: string
          enum:
            - buy
            - sell
          deprecated: true
          description: >
            Deprecated. Use `outcome_side` (or `book_side`) instead. See [Order
            direction](/getting_started/order_direction). This field will not be
            removed before May 14, 2026.
        outcome_side:
          type: string
          enum:
            - 'yes'
            - 'no'
          description: >
            The outcome side this fill positioned the user for. buy-yes and
            sell-no produce 'yes'; buy-no and sell-yes produce 'no'.


            `outcome_side` describes directional exposure only; it does not
            change the fill's price. A fill at price `p` with `outcome_side=no`
            is matched against an order at the same price `p` with
            `outcome_side=yes` — both parties trade at the same price, just on
            opposite directions.


            `outcome_side` and `book_side` will become the canonical way to
            determine fill direction. The legacy `action` and `side` fields will
            be deprecated in a future release — please migrate to these new
            fields.
        book_side:
          $ref: '#/components/schemas/BookSide'
          description: >
            Same directional bit as outcome_side in book vocabulary. 'bid' is
            equivalent to outcome_side 'yes'; 'ask' is equivalent to
            outcome_side 'no'.


            `outcome_side` and `book_side` will become the canonical way to
            determine fill direction. The legacy `action` and `side` fields will
            be deprecated in a future release — please migrate to these new
            fields.
        count_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            String representation of the number of contracts bought or sold in
            this fill
        yes_price_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Fill price for the yes side in fixed-point dollars
        no_price_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Fill price for the no side in fixed-point dollars
        is_taker:
          type: boolean
          description: >-
            If true, this fill was a taker (removed liquidity from the order
            book)
        created_time:
          type: string
          format: date-time
          description: Timestamp when this fill was executed
        fee_cost:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Fee cost in fixed-point dollars
        subaccount_number:
          type: integer
          nullable: true
          x-omitempty: true
          description: >-
            Subaccount number (0 for primary, 1-32 for subaccounts). Present for
            direct users.
        ts:
          type: integer
          format: int64
          description: Unix timestamp when this fill was executed (legacy field name)
    BookSide:
      type: string
      enum:
        - bid
        - ask
      description: >-
        Side of the book for an order or trade. For event markets, this refers
        to the YES leg only: `bid` means buy YES, `ask` means sell YES. (Selling
        YES is economically equivalent to buying NO at `1 - price`, but this
        endpoint quotes everything from the YES side.)
    FixedPointCount:
      type: string
      description: >-
        Fixed-point contract count string (2 decimals, e.g., "10.00"; referred
        to as "fp" in field names). Requests accept 0–2 decimal places (e.g.,
        "10", "10.0", "10.00"); responses always emit 2 decimals. Fractional
        contract values (e.g., "2.50") are supported on markets with fractional
        trading enabled; the minimum granularity is 0.01 contracts. Integer
        contract count fields are legacy and will be deprecated; when both
        integer and fp fields are provided, they must match.
      example: '10.00'
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with up to 6 decimal
        places of precision. This is the maximum supported precision; valid
        quote intervals for a given market are constrained by that market's
        price level structure.
      example: '0.5600'
  securitySchemes:
    kalshiAccessKey:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-KEY
      description: Your API key ID
    kalshiAccessSignature:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-SIGNATURE
      description: RSA-PSS signature of the request
    kalshiAccessTimestamp:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-TIMESTAMP
      description: Request timestamp in milliseconds

````