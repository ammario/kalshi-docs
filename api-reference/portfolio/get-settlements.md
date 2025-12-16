---
url: https://docs.kalshi.com/api-reference/portfolio/get-settlements
lastmod: 2025-12-15T19:46:36.084Z
---
# Get Settlements

>  Endpoint for getting the member's settlements historical track.

## OpenAPI

````yaml openapi.yaml get /portfolio/settlements
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
  /portfolio/settlements:
    get:
      tags:
        - portfolio
      summary: Get Settlements
      description: ' Endpoint for getting the member''s settlements historical track.'
      operationId: GetSettlements
      parameters:
        - $ref: '#/components/parameters/LimitQuery'
        - $ref: '#/components/parameters/CursorQuery'
        - $ref: '#/components/parameters/TickerQuery'
        - $ref: '#/components/parameters/EventTickerQuery'
        - $ref: '#/components/parameters/MinTsQuery'
        - $ref: '#/components/parameters/MaxTsQuery'
      responses:
        '200':
          description: Settlements retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetSettlementsResponse'
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
    LimitQuery:
      name: limit
      in: query
      description: Number of results per page. Defaults to 100. Maximum value is 200.
      schema:
        type: integer
        format: int64
        minimum: 1
        maximum: 200
        default: 100
        x-oapi-codegen-extra-tags:
          validate: omitempty,min=1,max=200
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
    EventTickerQuery:
      name: event_ticker
      in: query
      description: >-
        Event ticker of desired positions. Multiple event tickers can be
        provided as a comma-separated list (maximum 10).
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
    GetSettlementsResponse:
      type: object
      required:
        - settlements
      properties:
        settlements:
          type: array
          items:
            $ref: '#/components/schemas/Settlement'
        cursor:
          type: string
    Settlement:
      type: object
      required:
        - ticker
        - event_ticker
        - market_result
        - yes_count
        - yes_total_cost
        - no_count
        - no_total_cost
        - revenue
        - settled_time
        - fee_cost
      properties:
        ticker:
          type: string
          description: The ticker symbol of the market that was settled.
        event_ticker:
          type: string
          description: The event ticker symbol of the market that was settled.
        market_result:
          type: string
          enum:
            - 'yes'
            - 'no'
            - scalar
            - void
          description: >-
            The outcome of the market settlement. 'yes' = market resolved to
            YES, 'no' = market resolved to NO, 'scalar' = scalar market settled
            at a specific value, 'void' = market was voided/cancelled and all
            positions returned at original cost.
        yes_count:
          type: integer
          format: int64
          description: Number of YES contracts owned at the time of settlement.
        yes_total_cost:
          type: integer
          description: Total cost basis of all YES contracts in cents.
        no_count:
          type: integer
          format: int64
          description: Number of NO contracts owned at the time of settlement.
        no_total_cost:
          type: integer
          description: Total cost basis of all NO contracts in cents.
        revenue:
          type: integer
          description: >-
            Total revenue earned from this settlement in cents (winning
            contracts pay out 100 cents each).
        settled_time:
          type: string
          format: date-time
          description: Timestamp when the market was settled and payouts were processed.
        fee_cost:
          type: string
          example: '0.3400'
          description: Total fees paid in fixed point dollars.
        value:
          type: integer
          nullable: true
          description: Payout of a single yes contract in cents.
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