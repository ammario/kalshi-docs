---
url: https://docs.kalshi.com/api-reference/multivariate/get-multivariate-event-collection-lookup-history
lastmod: 2025-12-18T22:47:50.496Z
---
# Get Multivariate Event Collection Lookup History

>  Endpoint for retrieving which markets in an event collection were recently looked up.



## OpenAPI

````yaml openapi.yaml get /multivariate_event_collections/{collection_ticker}/lookup
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
  /multivariate_event_collections/{collection_ticker}/lookup:
    get:
      tags:
        - multivariate
      summary: Get Multivariate Event Collection Lookup History
      description: ' Endpoint for retrieving which markets in an event collection were recently looked up.'
      operationId: GetMultivariateEventCollectionLookupHistory
      parameters:
        - name: collection_ticker
          in: path
          required: true
          description: Collection ticker
          schema:
            type: string
        - name: lookback_seconds
          in: query
          required: true
          description: >-
            Number of seconds to look back for lookup history. Must be one of
            10, 60, 300, or 3600.
          schema:
            type: integer
            format: int32
            enum:
              - 10
              - 60
              - 300
              - 3600
      responses:
        '200':
          description: Lookup history retrieved successfully
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/GetMultivariateEventCollectionLookupHistoryResponse
        '400':
          $ref: '#/components/responses/BadRequestError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    GetMultivariateEventCollectionLookupHistoryResponse:
      type: object
      required:
        - lookup_points
      properties:
        lookup_points:
          type: array
          items:
            $ref: '#/components/schemas/LookupPoint'
          description: List of recent lookup points in the collection.
    LookupPoint:
      type: object
      required:
        - event_ticker
        - market_ticker
        - selected_markets
        - last_queried_ts
      properties:
        event_ticker:
          type: string
          description: Event ticker for the lookup point.
        market_ticker:
          type: string
          description: Market ticker for the lookup point.
        selected_markets:
          type: array
          items:
            $ref: '#/components/schemas/TickerPair'
          description: Markets that were selected for this lookup.
        last_queried_ts:
          type: string
          format: date-time
          description: Timestamp when this lookup was last queried.
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

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt