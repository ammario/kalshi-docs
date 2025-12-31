---
url: https://docs.kalshi.com/api-reference/market/get-market-orderbook
lastmod: 2025-12-30T22:19:44.006Z
---
# Get Market Orderbook

>  Endpoint for getting the current order book for a specific market.  The order book shows all active bid orders for both yes and no sides of a binary market. It returns yes bids and no bids only (no asks are returned). This is because in binary markets, a bid for yes at price X is equivalent to an ask for no at price (100-X). For example, a yes bid at 7¢ is the same as a no ask at 93¢, with identical contract sizes.  Each side shows price levels with their corresponding quantities and order counts, organized from best to worst prices.



## OpenAPI

````yaml openapi.yaml get /markets/{ticker}/orderbook
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.3.0
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
  /markets/{ticker}/orderbook:
    get:
      tags:
        - market
      summary: Get Market Orderbook
      description: ' Endpoint for getting the current order book for a specific market.  The order book shows all active bid orders for both yes and no sides of a binary market. It returns yes bids and no bids only (no asks are returned). This is because in binary markets, a bid for yes at price X is equivalent to an ask for no at price (100-X). For example, a yes bid at 7¢ is the same as a no ask at 93¢, with identical contract sizes.  Each side shows price levels with their corresponding quantities and order counts, organized from best to worst prices.'
      operationId: GetMarketOrderbook
      parameters:
        - $ref: '#/components/parameters/TickerPath'
        - name: depth
          in: query
          description: >-
            Depth of the orderbook to retrieve (0 or negative means all levels,
            1-100 for specific depth)
          required: false
          schema:
            type: integer
            minimum: 0
            maximum: 100
            default: 0
          x-oapi-codegen-extra-tags:
            validate: omitempty,min=0,max=100
      responses:
        '200':
          description: Orderbook retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarketOrderbookResponse'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '404':
          $ref: '#/components/responses/NotFoundError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  parameters:
    TickerPath:
      name: ticker
      in: path
      required: true
      description: Market ticker
      schema:
        type: string
  schemas:
    GetMarketOrderbookResponse:
      type: object
      required:
        - orderbook
      properties:
        orderbook:
          $ref: '#/components/schemas/Orderbook'
    Orderbook:
      type: object
      required:
        - 'yes'
        - 'no'
        - yes_dollars
        - no_dollars
      properties:
        'yes':
          type: array
          items:
            $ref: '#/components/schemas/OrderbookLevel'
        'no':
          type: array
          items:
            $ref: '#/components/schemas/OrderbookLevel'
        yes_dollars:
          type: array
          items:
            $ref: '#/components/schemas/PriceLevelDollars'
        no_dollars:
          type: array
          items:
            $ref: '#/components/schemas/PriceLevelDollars'
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
    OrderbookLevel:
      type: array
      items:
        type: number
      minItems: 2
      maxItems: 2
      description: >-
        Price level represented as [price, count] where price is in cents and
        count is the number of contracts
    PriceLevelDollars:
      type: array
      minItems: 2
      maxItems: 2
      example:
        - '0.1500'
        - 100
      description: >-
        Price level in dollars represented as [dollars_string, count] where
        dollars_string is like "0.1500" and count is the number of contracts
  responses:
    UnauthorizedError:
      description: Unauthorized - authentication required
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