---
url: https://docs.kalshi.com/margin-rest/market/get-market-orderbook
lastmod: 2026-06-22T00:39:36.332Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Market Orderbook

> Endpoint for getting the orderbook for a margin market.



## OpenAPI

````yaml /perps_openapi.yaml get /margin/markets/{ticker}/orderbook
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
  /margin/markets/{ticker}/orderbook:
    get:
      tags:
        - market
      summary: Get Market Orderbook
      description: Endpoint for getting the orderbook for a margin market.
      operationId: GetMarginMarketOrderbook
      parameters:
        - in: path
          name: ticker
          required: true
          schema:
            type: string
          description: Ticker of the market
        - name: depth
          in: query
          description: Depth of the orderbook to retrieve (0 means all levels)
          required: false
          schema:
            type: integer
            minimum: 0
            default: 0
        - name: aggregation_tick_size
          in: query
          description: >-
            Tick size in dollars for aggregating price levels (e.g., 0.10 for 10
            cent buckets)
          required: false
          schema:
            type: string
      responses:
        '200':
          description: Orderbook retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MarginOrderbookResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '404':
          $ref: '#/components/responses/NotFoundError'
        '429':
          $ref: '#/components/responses/RateLimitError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    MarginOrderbookResponse:
      type: object
      required:
        - orderbook
      properties:
        orderbook:
          $ref: '#/components/schemas/MarginOrderbookCount'
    MarginOrderbookCount:
      type: object
      required:
        - bids
        - asks
      properties:
        bids:
          type: array
          description: >-
            Bid price levels, ordered from best bid downward. Each level is
            [price, quantity].
          items:
            $ref: '#/components/schemas/PriceLevelDollarsCountFp'
        asks:
          type: array
          description: >-
            Ask price levels, ordered from best ask upward. Each level is
            [price, quantity].
          items:
            $ref: '#/components/schemas/PriceLevelDollarsCountFp'
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
    PriceLevelDollarsCountFp:
      type: array
      minItems: 2
      maxItems: 2
      example:
        - '0.1500'
        - '100.00'
      items:
        type: string
      description: >-
        Price level in dollars represented as [dollars_string, fp] where
        dollars_string is like "0.1500" and fp is a FixedPointCount string
        (fixed-point contract count). The second element is the contract
        quantity (not price).
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
    RateLimitError:
      description: >-
        Rate limit exceeded. The default cost is 10 tokens per request. Use GET
        /trade-api/v2/account/endpoint_costs to list non-default endpoint costs.
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