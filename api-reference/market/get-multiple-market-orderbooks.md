---
url: https://docs.kalshi.com/api-reference/market/get-multiple-market-orderbooks
lastmod: 2026-05-14T20:50:06.282Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Multiple Market Orderbooks

> Endpoint for getting the current order books for multiple markets in a single request. The order book shows all active bid orders for both yes and no sides of a binary market. It returns yes bids and no bids only (no asks are returned). This is because in binary markets, a bid for yes at price X is equivalent to an ask for no at price (100-X). For example, a yes bid at 7¢ is the same as a no ask at 93¢, with identical contract sizes. Each side shows price levels with their corresponding quantities and order counts, organized from best to worst prices. Returns one orderbook per requested market ticker.



## OpenAPI

````yaml /openapi.yaml get /markets/orderbooks
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.18.0
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
  /markets/orderbooks:
    get:
      tags:
        - market
      summary: Get Multiple Market Orderbooks
      description: >-
        Endpoint for getting the current order books for multiple markets in a
        single request. The order book shows all active bid orders for both yes
        and no sides of a binary market. It returns yes bids and no bids only
        (no asks are returned). This is because in binary markets, a bid for yes
        at price X is equivalent to an ask for no at price (100-X). For example,
        a yes bid at 7¢ is the same as a no ask at 93¢, with identical contract
        sizes. Each side shows price levels with their corresponding quantities
        and order counts, organized from best to worst prices. Returns one
        orderbook per requested market ticker.
      operationId: GetMarketOrderbooks
      parameters:
        - name: tickers
          in: query
          required: true
          description: List of market tickers to fetch orderbooks for
          schema:
            type: array
            items:
              type: string
              maxLength: 200
            minItems: 1
            maxItems: 100
          style: form
          explode: true
          x-oapi-codegen-extra-tags:
            validate: required,min=1,max=100,dive,max=200
      responses:
        '200':
          description: Orderbooks retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarketOrderbooksResponse'
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
  schemas:
    GetMarketOrderbooksResponse:
      type: object
      required:
        - orderbooks
      properties:
        orderbooks:
          type: array
          items:
            $ref: '#/components/schemas/MarketOrderbookFp'
    MarketOrderbookFp:
      type: object
      required:
        - ticker
        - orderbook_fp
      properties:
        ticker:
          type: string
        orderbook_fp:
          $ref: '#/components/schemas/OrderbookCountFp'
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
    OrderbookCountFp:
      type: object
      required:
        - yes_dollars
        - no_dollars
      properties:
        yes_dollars:
          type: array
          items:
            $ref: '#/components/schemas/PriceLevelDollarsCountFp'
        no_dollars:
          type: array
          items:
            $ref: '#/components/schemas/PriceLevelDollarsCountFp'
      description: >-
        Orderbook with fixed-point contract counts (fp) in all dollar price
        levels.
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