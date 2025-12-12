---
url: https://docs.kalshi.com/api-reference/market/get-trades
lastmod: 2025-12-11T18:38:29.089Z
---
# Get Trades

>  Endpoint for getting all trades for all markets.  A trade represents a completed transaction between two users on a specific market. Each trade includes the market ticker, price, quantity, and timestamp information.  This endpoint returns a paginated response. Use the 'limit' parameter to control page size (1-1000, defaults to 100). The response includes a 'cursor' field - pass this value in the 'cursor' parameter of your next request to get the next page. An empty cursor indicates no more pages are available.

## OpenAPI

````yaml openapi.yaml get /markets/trades
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.2.0
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
  /markets/trades:
    get:
      tags:
        - market
      summary: Get Trades
      description: ' Endpoint for getting all trades for all markets.  A trade represents a completed transaction between two users on a specific market. Each trade includes the market ticker, price, quantity, and timestamp information.  This endpoint returns a paginated response. Use the ''limit'' parameter to control page size (1-1000, defaults to 100). The response includes a ''cursor'' field - pass this value in the ''cursor'' parameter of your next request to get the next page. An empty cursor indicates no more pages are available.'
      operationId: GetTrades
      parameters:
        - $ref: '#/components/parameters/MarketLimitQuery'
        - $ref: '#/components/parameters/CursorQuery'
        - $ref: '#/components/parameters/TickerQuery'
        - $ref: '#/components/parameters/MinTsQuery'
        - $ref: '#/components/parameters/MaxTsQuery'
      responses:
        '200':
          description: Trades retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetTradesResponse'
        '400':
          description: Bad request
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
    TickerQuery:
      name: ticker
      in: query
      description: Filter by market ticker
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
  schemas:
    GetTradesResponse:
      type: object
      required:
        - trades
        - cursor
      properties:
        trades:
          type: array
          items:
            $ref: '#/components/schemas/Trade'
        cursor:
          type: string
    Trade:
      type: object
      required:
        - trade_id
        - ticker
        - price
        - count
        - yes_price
        - no_price
        - yes_price_dollars
        - no_price_dollars
        - taker_side
      properties:
        trade_id:
          type: string
          description: Unique identifier for this trade
        ticker:
          type: string
          description: Unique identifier for the market
        price:
          type: number
          description: Trade price (deprecated - use yes_price or no_price)
        count:
          type: integer
          description: Number of contracts bought or sold in this trade
        yes_price:
          type: integer
          description: Yes price for this trade in cents
        no_price:
          type: integer
          description: No price for this trade in cents
        yes_price_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Yes price for this trade in dollars
        no_price_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: No price for this trade in dollars
        taker_side:
          type: string
          enum:
            - 'yes'
            - 'no'
          x-enum-varnames:
            - TradeTakerSideYes
            - TradeTakerSideNo
          description: Side for the taker of this trade
        created_time:
          type: string
          format: date-time
          description: Timestamp when this trade was executed
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with exactly 4 decimal
        places
      example: '0.5600'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt