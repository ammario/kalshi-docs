---
url: https://docs.kalshi.com/api-reference/portfolio/get-fills
lastmod: 2026-01-08T18:44:54.025Z
---
# Get Fills

>  Endpoint for getting all fills for the member. A fill is when a trade you have is matched.



## OpenAPI

````yaml openapi.yaml get /portfolio/fills
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.4.0
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
  /portfolio/fills:
    get:
      tags:
        - portfolio
      summary: Get Fills
      description: ' Endpoint for getting all fills for the member. A fill is when a trade you have is matched.'
      operationId: GetFills
      parameters:
        - $ref: '#/components/parameters/TickerQuery'
        - $ref: '#/components/parameters/OrderIdQuery'
        - $ref: '#/components/parameters/MinTsQuery'
        - $ref: '#/components/parameters/MaxTsQuery'
        - $ref: '#/components/parameters/LimitQuery'
        - $ref: '#/components/parameters/CursorQuery'
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
        - count
        - price
        - yes_price
        - no_price
        - yes_price_fixed
        - no_price_fixed
        - is_taker
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
        client_order_id:
          type: string
          description: Client-provided identifier for the order that resulted in this fill
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
          description: Specifies if this is a 'yes' or 'no' fill
        action:
          type: string
          enum:
            - buy
            - sell
          description: Specifies if this is a buy or sell order
        count:
          type: integer
          description: Number of contracts bought or sold in this fill
        price:
          type: number
          description: Fill price (deprecated - use yes_price or no_price)
        yes_price:
          type: integer
          description: Fill price for the yes side in cents
        no_price:
          type: integer
          description: Fill price for the no side in cents
        yes_price_fixed:
          type: string
          description: Fill price for the yes side in fixed point dollars
        no_price_fixed:
          type: string
          description: Fill price for the no side in fixed point dollars
        is_taker:
          type: boolean
          description: >-
            If true, this fill was a taker (removed liquidity from the order
            book)
        created_time:
          type: string
          format: date-time
          description: Timestamp when this fill was executed
        ts:
          type: integer
          format: int64
          description: Unix timestamp when this fill was executed (legacy field name)
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