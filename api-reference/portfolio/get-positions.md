---
url: https://docs.kalshi.com/api-reference/portfolio/get-positions
lastmod: 2025-11-15T22:33:03.821Z
---
# Get Positions

> Restricts the positions to those with any of following fields with non-zero values, as a comma separated list. The following values are accepted: position, total_traded

## OpenAPI

````yaml openapi.yaml get /portfolio/positions
paths:
  path: /portfolio/positions
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security:
      - title: kalshiAccessKey & kalshiAccessSignature & kalshiAccessTimestamp
        parameters:
          query: {}
          header:
            KALSHI-ACCESS-KEY:
              type: apiKey
              description: Your API key ID
            KALSHI-ACCESS-SIGNATURE:
              type: apiKey
              description: RSA-PSS signature of the request
            KALSHI-ACCESS-TIMESTAMP:
              type: apiKey
              description: Request timestamp in milliseconds
          cookie: {}
    parameters:
      path: {}
      query:
        cursor:
          schema:
            - type: string
              description: >-
                The Cursor represents a pointer to the next page of records in
                the pagination. Use the value returned from the previous
                response to get the next page.
        limit:
          schema:
            - type: integer
              description: >-
                Parameter to specify the number of results per page. Defaults to
                100.
              maximum: 1000
              minimum: 1
              default: 100
        count_filter:
          schema:
            - type: string
              description: >-
                Restricts the positions to those with any of following fields
                with non-zero values, as a comma separated list. The following
                values are accepted - position, total_traded
        settlement_status:
          schema:
            - type: enum<string>
              enum:
                - all
                - unsettled
                - settled
              description: >-
                Settlement status of the markets to return. Defaults to
                unsettled.
              default: unsettled
        ticker:
          schema:
            - type: string
              description: Filter by market ticker
        event_ticker:
          schema:
            - type: string
              description: >-
                Event ticker of desired positions. Multiple event tickers can be
                provided as a comma-separated list (maximum 10).
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              cursor:
                allOf:
                  - type: string
                    description: >-
                      The Cursor represents a pointer to the next page of
                      records in the pagination. Use the value returned here in
                      the cursor query parameter for this end-point to get the
                      next page containing limit records. An empty value of this
                      field indicates there is no next page.
              market_positions:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/MarketPosition'
                    description: List of market positions
              event_positions:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/EventPosition'
                    description: List of event positions
            refIdentifier: '#/components/schemas/GetPositionsResponse'
        examples:
          example:
            value:
              cursor: <string>
              market_positions:
                - ticker: <string>
                  total_traded: 123
                  total_traded_dollars: <string>
                  position: 123
                  market_exposure: 123
                  market_exposure_dollars: <string>
                  realized_pnl: 123
                  realized_pnl_dollars: <string>
                  resting_orders_count: 123
                  fees_paid: 123
                  fees_paid_dollars: <string>
                  last_updated_ts: '2023-11-07T05:31:56Z'
              event_positions:
                - event_ticker: <string>
                  total_cost: 123
                  total_cost_dollars: <string>
                  total_cost_shares: 123
                  event_exposure: 123
                  event_exposure_dollars: <string>
                  realized_pnl: 123
                  realized_pnl_dollars: <string>
                  resting_order_count: 123
                  fees_paid: 123
                  fees_paid_dollars: <string>
        description: Positions retrieved successfully
    '400':
      application/json:
        schemaArray:
          - type: object
            properties:
              code:
                allOf:
                  - &ref_0
                    type: string
                    description: Error code
              message:
                allOf:
                  - &ref_1
                    type: string
                    description: Human-readable error message
              details:
                allOf:
                  - &ref_2
                    type: string
                    description: Additional details about the error, if available
              service:
                allOf:
                  - &ref_3
                    type: string
                    description: The name of the service that generated the error
            refIdentifier: '#/components/schemas/ErrorResponse'
        examples:
          example:
            value:
              code: <string>
              message: <string>
              details: <string>
              service: <string>
        description: Bad request - invalid input
    '401':
      application/json:
        schemaArray:
          - type: object
            properties:
              code:
                allOf:
                  - *ref_0
              message:
                allOf:
                  - *ref_1
              details:
                allOf:
                  - *ref_2
              service:
                allOf:
                  - *ref_3
            refIdentifier: '#/components/schemas/ErrorResponse'
        examples:
          example:
            value:
              code: <string>
              message: <string>
              details: <string>
              service: <string>
        description: Unauthorized - authentication required
    '500':
      application/json:
        schemaArray:
          - type: object
            properties:
              code:
                allOf:
                  - *ref_0
              message:
                allOf:
                  - *ref_1
              details:
                allOf:
                  - *ref_2
              service:
                allOf:
                  - *ref_3
            refIdentifier: '#/components/schemas/ErrorResponse'
        examples:
          example:
            value:
              code: <string>
              message: <string>
              details: <string>
              service: <string>
        description: Internal server error
  deprecated: false
  type: path
components:
  schemas:
    MarketPosition:
      type: object
      properties:
        ticker:
          type: string
          description: Unique identifier for the market
          x-go-type-skip-optional-pointer: true
        total_traded:
          type: integer
          description: Total spent on this market in cents
        total_traded_dollars:
          type: string
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
          type: string
          description: Cost of the aggregate market position in dollars
        realized_pnl:
          type: integer
          description: Locked in profit and loss, in cents
        realized_pnl_dollars:
          type: string
          description: Locked in profit and loss, in dollars
        resting_orders_count:
          type: integer
          format: int32
          description: '[DEPRECATED] Aggregate size of resting orders in contract units'
        fees_paid:
          type: integer
          description: Fees paid on fill orders, in cents
        fees_paid_dollars:
          type: string
          description: Fees paid on fill orders, in dollars
        last_updated_ts:
          type: string
          format: date-time
          description: Last time the position is updated
    EventPosition:
      type: object
      properties:
        event_ticker:
          type: string
          description: Unique identifier for events
          x-go-type-skip-optional-pointer: true
        total_cost:
          type: integer
          description: Total spent on this event in cents
        total_cost_dollars:
          type: string
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
          type: string
          description: Cost of the aggregate event position in dollars
        realized_pnl:
          type: integer
          description: Locked in profit and loss, in cents
        realized_pnl_dollars:
          type: string
          description: Locked in profit and loss, in dollars
        resting_order_count:
          type: integer
          description: '[DEPRECATED] Aggregate size of resting orders in contract units'
        fees_paid:
          type: integer
          description: Fees paid on fill orders, in cents
        fees_paid_dollars:
          type: string
          description: Fees paid on fill orders, in dollars

````