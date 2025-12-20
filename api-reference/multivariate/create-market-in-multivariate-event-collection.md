---
url: https://docs.kalshi.com/api-reference/multivariate/create-market-in-multivariate-event-collection
lastmod: 2025-12-19T22:17:25.478Z
---
# Create Market In Multivariate Event Collection

>  Endpoint for creating an individual market in a multivariate event collection. This endpoint must be hit at least once before trading or looking up a market.



## OpenAPI

````yaml openapi.yaml post /multivariate_event_collections/{collection_ticker}
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
  /multivariate_event_collections/{collection_ticker}:
    post:
      tags:
        - multivariate
      summary: Create Market In Multivariate Event Collection
      description: ' Endpoint for creating an individual market in a multivariate event collection. This endpoint must be hit at least once before trading or looking up a market.'
      operationId: CreateMarketInMultivariateEventCollection
      parameters:
        - name: collection_ticker
          in: path
          required: true
          description: Collection ticker
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: >-
                #/components/schemas/CreateMarketInMultivariateEventCollectionRequest
      responses:
        '200':
          description: Market created successfully
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/CreateMarketInMultivariateEventCollectionResponse
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
    CreateMarketInMultivariateEventCollectionRequest:
      type: object
      required:
        - selected_markets
      properties:
        selected_markets:
          type: array
          items:
            $ref: '#/components/schemas/TickerPair'
          description: >-
            List of selected markets that act as parameters to determine which
            market is created.
    CreateMarketInMultivariateEventCollectionResponse:
      type: object
      required:
        - event_ticker
        - market_ticker
      properties:
        event_ticker:
          type: string
          description: Event ticker for the created market.
        market_ticker:
          type: string
          description: Market ticker for the created market.
    TickerPair:
      type: object
      required:
        - market_ticker
        - event_ticker
        - side
      properties:
        market_ticker:
          type: string
          description: Market ticker identifier.
        event_ticker:
          type: string
          description: Event ticker identifier.
        side:
          type: string
          enum:
            - 'yes'
            - 'no'
          description: Side of the market (yes or no).
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