---
url: https://docs.kalshi.com/margin-rest/market/get-multiple-market-orderbooks
lastmod: 2026-10-21T16:37:40.404Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Multiple Market Orderbooks

> Endpoint for getting the current orderbooks of several margin markets in a single request. Returns one entry per requested ticker, in request order, each carrying the same bid and ask levels as the single-market orderbook endpoint. A ticker that is not a margin market returns 404.



## OpenAPI

````yaml /perps_openapi.yaml get /margin/markets/orderbooks
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
  - name: fcm
    description: FCM member specific endpoints
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
  - name: risk
    description: Margin risk metrics, parameters, and limits
  - name: funding
    description: Funding rates and payment history
  - name: fees
    description: Margin fee schedule
  - name: exit-triggers
    description: Stop-loss, take-profit, and trailing-stop triggers on margin positions
paths:
  /margin/markets/orderbooks:
    get:
      tags:
        - market
      summary: Get Multiple Market Orderbooks
      description: >-
        Endpoint for getting the current orderbooks of several margin markets in
        a single request. Returns one entry per requested ticker, in request
        order, each carrying the same bid and ask levels as the single-market
        orderbook endpoint. A ticker that is not a margin market returns 404.
      operationId: GetMarginMarketOrderbooks
      parameters:
        - name: tickers
          in: query
          required: true
          description: Comma-separated list of margin market tickers (maximum 100)
          schema:
            type: array
            items:
              type: string
              maxLength: 200
            minItems: 1
            maxItems: 100
          style: form
          explode: false
          x-oapi-codegen-extra-tags:
            validate: required,min=1,max=100,dive,max=200
      responses:
        '200':
          description: Orderbooks retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarginMarketOrderbooksResponse'
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
    GetMarginMarketOrderbooksResponse:
      type: object
      required:
        - orderbooks
      properties:
        orderbooks:
          type: array
          description: One entry per requested ticker, in request order.
          items:
            $ref: '#/components/schemas/MarginMarketOrderbook'
    MarginMarketOrderbook:
      type: object
      required:
        - ticker
        - orderbook
      properties:
        ticker:
          type: string
          description: The requested market ticker.
        orderbook:
          $ref: '#/components/schemas/MarginOrderbookCount'
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

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.