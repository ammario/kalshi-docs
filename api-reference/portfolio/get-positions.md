---
url: https://docs.kalshi.com/api-reference/portfolio/get-positions
lastmod: 2026-01-14T01:04:44.817Z
---
# Get Positions

> Restricts the positions to those with any of following fields with non-zero values, as a comma separated list. The following values are accepted: position, total_traded



## OpenAPI

````yaml openapi.yaml get /portfolio/positions
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
  /portfolio/positions:
    get:
      tags:
        - portfolio
      summary: Get Positions
      description: >-
        Restricts the positions to those with any of following fields with
        non-zero values, as a comma separated list. The following values are
        accepted: position, total_traded
      operationId: GetPositions
      parameters:
        - $ref: '#/components/parameters/PositionsCursorQuery'
        - $ref: '#/components/parameters/PositionsLimitQuery'
        - $ref: '#/components/parameters/CountFilterQuery'
        - $ref: '#/components/parameters/TickerQuery'
        - $ref: '#/components/parameters/EventTickerQuery'
        - $ref: '#/components/parameters/SubaccountQuery'
      responses:
        '200':
          description: Positions retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetPositionsResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  parameters:
    PositionsCursorQuery:
      name: cursor
      in: query
      description: >-
        The Cursor represents a pointer to the next page of records in the
        pagination. Use the value returned from the previous response to get the
        next page.
      schema:
        type: string
    PositionsLimitQuery:
      name: limit
      in: query
      description: Parameter to specify the number of results per page. Defaults to 100.
      schema:
        type: integer
        format: int32
        minimum: 1
        maximum: 1000
        default: 100
    CountFilterQuery:
      name: count_filter
      in: query
      description: >-
        Restricts the positions to those with any of following fields with
        non-zero values, as a comma separated list. The following values are
        accepted - position, total_traded
      schema:
        type: string
    TickerQuery:
      name: ticker
      in: query
      description: Filter by market ticker
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
    SubaccountQuery:
      name: subaccount
      in: query
      description: Filter by subaccount number
      schema:
        type: integer
  schemas:
    GetPositionsResponse:
      type: object
      required:
        - market_positions
        - event_positions
      properties:
        cursor:
          type: string
          description: >-
            The Cursor represents a pointer to the next page of records in the
            pagination. Use the value returned here in the cursor query
            parameter for this end-point to get the next page containing limit
            records. An empty value of this field indicates there is no next
            page.
        market_positions:
          type: array
          items:
            $ref: '#/components/schemas/MarketPosition'
          description: List of market positions
        event_positions:
          type: array
          items:
            $ref: '#/components/schemas/EventPosition'
          description: List of event positions
    MarketPosition:
      type: object
      required:
        - ticker
        - total_traded
        - total_traded_dollars
        - position
        - market_exposure
        - market_exposure_dollars
        - realized_pnl
        - realized_pnl_dollars
        - resting_orders_count
        - fees_paid
        - fees_paid_dollars
      properties:
        ticker:
          type: string
          description: Unique identifier for the market
          x-go-type-skip-optional-pointer: true
        total_traded:
          type: integer
          description: Total spent on this market in cents
        total_traded_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Total spent on this market in dollars
        position:
          type: integer
          format: int32
          description: >-
            Number of contracts bought in this market. Negative means NO
            contracts and positive means YES contracts
        market_exposure:
          type: integer
          description: Cost of the aggregate market position in cents
        market_exposure_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Cost of the aggregate market position in dollars
        realized_pnl:
          type: integer
          description: Locked in profit and loss, in cents
        realized_pnl_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Locked in profit and loss, in dollars
        resting_orders_count:
          type: integer
          format: int32
          description: '[DEPRECATED] Aggregate size of resting orders in contract units'
        fees_paid:
          type: integer
          description: Fees paid on fill orders, in cents
        fees_paid_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Fees paid on fill orders, in dollars
        last_updated_ts:
          type: string
          format: date-time
          description: Last time the position is updated
    EventPosition:
      type: object
      required:
        - event_ticker
        - total_cost
        - total_cost_dollars
        - total_cost_shares
        - event_exposure
        - event_exposure_dollars
        - realized_pnl
        - realized_pnl_dollars
        - resting_orders_count
        - fees_paid
        - fees_paid_dollars
      properties:
        event_ticker:
          type: string
          description: Unique identifier for events
        total_cost:
          type: integer
          description: Total spent on this event in cents
        total_cost_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Total spent on this event in dollars
        total_cost_shares:
          type: integer
          format: int64
          description: >-
            Total number of shares traded on this event (including both YES and
            NO contracts)
        event_exposure:
          type: integer
          description: Cost of the aggregate event position in cents
        event_exposure_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Cost of the aggregate event position in dollars
        realized_pnl:
          type: integer
          description: Locked in profit and loss, in cents
        realized_pnl_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Locked in profit and loss, in dollars
        fees_paid:
          type: integer
          description: Fees paid on fill orders, in cents
        fees_paid_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Fees paid on fill orders, in dollars
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
        US dollar amount as a fixed-point decimal string with exactly 4 decimal
        places
      example: '0.5600'
  responses:
    BadRequestError:
      description: Bad request - invalid input
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    UnauthorizedError:
      description: Unauthorized - authentication required
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

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt