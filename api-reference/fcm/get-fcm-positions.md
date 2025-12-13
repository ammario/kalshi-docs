---
url: https://docs.kalshi.com/api-reference/fcm/get-fcm-positions
lastmod: 2025-12-12T19:14:06.615Z
---
# Get FCM Positions

> Endpoint for FCM members to get market positions filtered by subtrader ID.
This endpoint requires FCM member access level and allows filtering positions by subtrader ID.


## OpenAPI

````yaml openapi.yaml get /fcm/positions
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
  /fcm/positions:
    get:
      tags:
        - fcm
      summary: Get FCM Positions
      description: >
        Endpoint for FCM members to get market positions filtered by subtrader
        ID.

        This endpoint requires FCM member access level and allows filtering
        positions by subtrader ID.
      operationId: GetFCMPositions
      parameters:
        - name: subtrader_id
          in: query
          required: true
          description: >-
            Restricts the response to positions for a specific subtrader (FCM
            members only)
          schema:
            type: string
        - name: ticker
          in: query
          description: Ticker of desired positions
          schema:
            type: string
            x-go-type-skip-optional-pointer: true
        - name: event_ticker
          in: query
          description: Event ticker of desired positions
          schema:
            type: string
            x-go-type-skip-optional-pointer: true
        - name: count_filter
          in: query
          description: >-
            Restricts the positions to those with any of following fields with
            non-zero values, as a comma separated list
          schema:
            type: string
        - name: settlement_status
          in: query
          description: Settlement status of the markets to return. Defaults to unsettled
          schema:
            type: string
            enum:
              - all
              - unsettled
              - settled
        - name: limit
          in: query
          description: Parameter to specify the number of results per page. Defaults to 100
          schema:
            type: integer
            minimum: 1
            maximum: 1000
        - name: cursor
          in: query
          description: >-
            The Cursor represents a pointer to the next page of records in the
            pagination
          schema:
            type: string
      responses:
        '200':
          description: Positions retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetPositionsResponse'
        '400':
          description: Bad request
        '401':
          description: Unauthorized
        '404':
          description: Not found
        '500':
          description: Internal server error
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
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
          x-go-type-skip-optional-pointer: true
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
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with exactly 4 decimal
        places
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

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt