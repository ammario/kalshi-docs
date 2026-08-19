---
url: https://docs.kalshi.com/api-reference/portfolio/get-positions
lastmod: 2026-08-18T14:45:56.756Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Positions

> Restricts the positions to those with any of following fields with non-zero values, as a comma separated list. The following values are accepted: position, total_traded



## OpenAPI

````yaml /openapi.yaml get /portfolio/positions
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.28.0
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
        - $ref: '#/components/parameters/SingleEventTickerQuery'
        - $ref: '#/components/parameters/SubaccountQueryDefaultPrimary'
        - $ref: '#/components/parameters/ExchangeIndexFilterQuery'
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
    SingleEventTickerQuery:
      name: event_ticker
      in: query
      description: Event ticker to filter by. Only a single event ticker is supported.
      schema:
        type: string
        x-go-type-skip-optional-pointer: true
    SubaccountQueryDefaultPrimary:
      name: subaccount
      in: query
      description: Subaccount number (0 for primary, 1-63 for subaccounts). Defaults to 0.
      schema:
        type: integer
    ExchangeIndexFilterQuery:
      name: exchange_index
      in: query
      description: >-
        Filter results by exchange shard. Omit to return results from all
        exchange shards.
      schema:
        type: integer
        format: int32
        minimum: 0
        x-oapi-codegen-extra-tags:
          validate: omitempty,gte=0
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
        - exchange_index
        - total_traded_dollars
        - position_fp
        - market_exposure_dollars
        - realized_pnl_dollars
        - fees_paid_dollars
        - last_updated_ts
      properties:
        ticker:
          type: string
          description: Unique identifier for the market
          x-go-type-skip-optional-pointer: true
        exchange_index:
          $ref: '#/components/schemas/ExchangeIndex'
        total_traded_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Total spent on this market in dollars
        position_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            String representation of the number of contracts bought in this
            market. Negative means NO contracts and positive means YES contracts
        market_exposure_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Cost of the aggregate market position in dollars
        realized_pnl_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Locked in profit and loss, in dollars
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
        - total_cost_dollars
        - total_cost_shares_fp
        - event_exposure_dollars
        - realized_pnl_dollars
        - fees_paid_dollars
      properties:
        event_ticker:
          type: string
          description: Unique identifier for events
        total_cost_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Total spent on this event in dollars
        total_cost_shares_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            String representation of the total number of shares traded on this
            event (including both YES and NO contracts)
        event_exposure_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Cost of the aggregate event position in dollars
        realized_pnl_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Locked in profit and loss, in dollars
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
    ExchangeIndex:
      type: integer
      description: Identifier for an exchange shard.
      example: 0
    FixedPointDollars:
      type: string
      description: >-
        Fixed-point US dollar string. Most request fields accept 2-4 decimal
        places (e.g., "0.56", "0.5600"); responses emit up to 6. Valid quote
        intervals for a given market are constrained by that market's price
        level structure.
      example: '0.5600'
    FixedPointCount:
      type: string
      description: >-
        Fixed-point contract count string (2 decimals, e.g., "10.00"; referred
        to as "fp" in field names). Requests accept 0-2 decimal places (e.g.,
        "10", "10.0", "10.00"); responses always emit 2 decimals. Fractional
        contract values (e.g., "2.50") are supported; the minimum granularity is
        0.01 contracts.
      example: '10.00'
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