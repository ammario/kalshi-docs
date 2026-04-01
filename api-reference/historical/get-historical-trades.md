---
url: https://docs.kalshi.com/api-reference/historical/get-historical-trades
lastmod: 2026-03-31T23:42:01.044Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Historical Trades

>  Endpoint for getting all historical trades for all markets. Trades that were filled before the historical cutoff are available via this endpoint. See [Historical Data](https://kalshi.com/docs/getting_started/historical_data) for details.



## OpenAPI

````yaml /openapi.yaml get /historical/trades
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.11.0
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
  /historical/trades:
    get:
      tags:
        - historical
      summary: Get Historical Trades
      description: ' Endpoint for getting all historical trades for all markets. Trades that were filled before the historical cutoff are available via this endpoint. See [Historical Data](https://kalshi.com/docs/getting_started/historical_data) for details.'
      operationId: GetTradesHistorical
      parameters:
        - $ref: '#/components/parameters/TickerQuery'
        - $ref: '#/components/parameters/MinTsQuery'
        - $ref: '#/components/parameters/MaxTsQuery'
        - $ref: '#/components/parameters/MarketLimitQuery'
        - $ref: '#/components/parameters/CursorQuery'
      responses:
        '200':
          description: Historical trades retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetTradesResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '404':
          $ref: '#/components/responses/NotFoundError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  parameters:
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
    MarketLimitQuery:
      name: limit
      in: query
      description: Number of results per page. Defaults to 100. Maximum value is 1000.
      schema:
        type: integer
        format: int64
        minimum: 0
        maximum: 1000
        default: 100
        x-oapi-codegen-extra-tags:
          validate: omitempty,gte=0,lte=1000
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
        - count_fp
        - yes_price_dollars
        - no_price_dollars
        - taker_side
        - created_time
      properties:
        trade_id:
          type: string
          description: Unique identifier for this trade
        ticker:
          type: string
          description: Unique identifier for the market
        count_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            String representation of the number of contracts bought or sold in
            this trade
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
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with up to 6 decimal
        places of precision. This is the maximum supported precision; valid
        quote intervals for a given market are constrained by that market's
        price level structure.
      example: '0.5600'
  responses:
    BadRequestError:
      description: Bad request - invalid input
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    NotFoundError:
      description: Resource not found
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

Built with [Mintlify](https://mintlify.com).