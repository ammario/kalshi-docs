---
url: https://docs.kalshi.com/margin-rest/market/get-trades
lastmod: 2026-07-16T22:25:53.293Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Trades

> Endpoint for retrieving public margin trades for a given market ticker. Returns a paginated response. Use the cursor value from the previous response to get the next page.



## OpenAPI

````yaml /perps_openapi.yaml get /margin/trades
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 0.0.1
  description: >-
    Manually defined OpenAPI spec for endpoints being migrated to spec-first
    approach
servers:
  - url: https://external-api.kalshi.com/trade-api/v2
    description: Production perps REST API server
  - url: https://external-api.demo.kalshi.co/trade-api/v2
    description: Demo perps REST API server
security: []
tags:
  - name: account
    description: Account information endpoints
  - name: exchange
    description: Exchange status and information endpoints
  - name: market
    description: Market data endpoints
  - name: orders
    description: Order management endpoints
  - name: order-groups
    description: Order group management endpoints
  - name: portfolio
    description: Portfolio and balance information endpoints
  - name: fcm
    description: FCM member specific endpoints
  - name: risk
    description: Margin risk metrics, parameters, and limits
  - name: funding
    description: Funding rates and payment history
  - name: fees
    description: Margin fee schedule
paths:
  /margin/trades:
    get:
      tags:
        - market
      summary: Get Trades
      description: >-
        Endpoint for retrieving public margin trades for a given market ticker.
        Returns a paginated response. Use the cursor value from the previous
        response to get the next page.
      operationId: GetMarginTrades
      parameters:
        - name: ticker
          in: query
          required: true
          schema:
            type: string
          description: Market ticker to retrieve trades for
        - name: limit
          in: query
          required: false
          description: Number of results per page
          schema:
            type: integer
            minimum: 1
            maximum: 1000
            default: 100
          x-go-type-skip-optional-pointer: true
        - name: cursor
          in: query
          required: false
          description: Pagination cursor from a previous response
          schema:
            type: string
          x-go-type-skip-optional-pointer: true
        - name: min_ts
          in: query
          required: false
          schema:
            type: integer
            format: int64
          description: Filter trades after this Unix timestamp
        - name: max_ts
          in: query
          required: false
          schema:
            type: integer
            format: int64
          description: Filter trades before this Unix timestamp
      responses:
        '200':
          description: Trades retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarginTradesResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    GetMarginTradesResponse:
      type: object
      required:
        - trades
        - cursor
      properties:
        trades:
          type: array
          items:
            $ref: '#/components/schemas/MarginTrade'
        cursor:
          type: string
    MarginTrade:
      type: object
      required:
        - trade_id
        - ticker
        - count
        - price
        - created_time
        - taker_side
      properties:
        trade_id:
          type: string
          description: Unique identifier for the trade
        ticker:
          type: string
          description: Market ticker symbol
        count:
          $ref: '#/components/schemas/FixedPointCount'
          description: Number of contracts traded
        price:
          type: string
          description: Trade price in dollars
        created_time:
          type: string
          format: date-time
          description: When the trade was executed
        taker_side:
          $ref: '#/components/schemas/BookSide'
          description: Side of the taker in this trade
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
        to as "fp" in field names). Requests accept 0-2 decimal places (e.g.,
        "10", "10.0", "10.00"); responses always emit 2 decimals. Fractional
        contract values (e.g., "2.50") are supported; the minimum granularity is
        0.01 contracts.
      example: '10.00'
    BookSide:
      type: string
      enum:
        - bid
        - ask
      description: The side of an order or trade (bid or ask)
  responses:
    BadRequestError:
      description: Bad request - invalid input
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