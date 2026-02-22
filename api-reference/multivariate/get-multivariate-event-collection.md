---
url: https://docs.kalshi.com/api-reference/multivariate/get-multivariate-event-collection
lastmod: 2026-02-21T18:47:39.172Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Multivariate Event Collection

>  Endpoint for getting data about a multivariate event collection by its ticker.



## OpenAPI

````yaml openapi.yaml get /multivariate_event_collections/{collection_ticker}
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.8.0
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
    get:
      tags:
        - multivariate
      summary: Get Multivariate Event Collection
      description: ' Endpoint for getting data about a multivariate event collection by its ticker.'
      operationId: GetMultivariateEventCollection
      parameters:
        - name: collection_ticker
          in: path
          required: true
          description: Collection ticker
          schema:
            type: string
      responses:
        '200':
          description: Collection retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMultivariateEventCollectionResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '404':
          $ref: '#/components/responses/NotFoundError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    GetMultivariateEventCollectionResponse:
      type: object
      required:
        - multivariate_contract
      properties:
        multivariate_contract:
          $ref: '#/components/schemas/MultivariateEventCollection'
          description: The multivariate event collection.
    MultivariateEventCollection:
      type: object
      required:
        - collection_ticker
        - series_ticker
        - title
        - description
        - open_date
        - close_date
        - associated_events
        - associated_event_tickers
        - is_ordered
        - is_single_market_per_event
        - is_all_yes
        - size_min
        - size_max
        - functional_description
      properties:
        collection_ticker:
          type: string
          description: Unique identifier for the collection.
        series_ticker:
          type: string
          description: >-
            Series associated with the collection. Events produced in the
            collection will be associated with this series.
        title:
          type: string
          description: Title of the collection.
        description:
          type: string
          description: Short description of the collection.
        open_date:
          type: string
          format: date-time
          description: >-
            The open date of the collection. Before this time, the collection
            cannot be interacted with.
        close_date:
          type: string
          format: date-time
          description: >-
            The close date of the collection. After this time, the collection
            cannot be interacted with.
        associated_events:
          type: array
          items:
            $ref: '#/components/schemas/AssociatedEvent'
          description: List of events with their individual configuration.
        associated_event_tickers:
          type: array
          items:
            type: string
          description: >-
            [DEPRECATED - Use associated_events instead] A list of events
            associated with the collection. Markets in these events can be
            passed as inputs to the Lookup and Create endpoints.
        is_ordered:
          type: boolean
          description: >-
            Whether the collection is ordered. If true, the order of markets
            passed into Lookup/Create affects the output. If false, the order
            does not matter.
        is_single_market_per_event:
          type: boolean
          description: >-
            [DEPRECATED - Use associated_events instead] Whether the collection
            accepts multiple markets from the same event passed into
            Lookup/Create.
        is_all_yes:
          type: boolean
          description: >-
            [DEPRECATED - Use associated_events instead] Whether the collection
            requires that only the market side of 'yes' may be used.
        size_min:
          type: integer
          format: int32
          description: >-
            The minimum number of markets that must be passed into Lookup/Create
            (inclusive).
        size_max:
          type: integer
          format: int32
          description: >-
            The maximum number of markets that must be passed into Lookup/Create
            (inclusive).
        functional_description:
          type: string
          description: >-
            A functional description of the collection describing how inputs
            affect the output.
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
    AssociatedEvent:
      type: object
      required:
        - ticker
        - is_yes_only
        - active_quoters
      properties:
        ticker:
          type: string
          description: The event ticker.
        is_yes_only:
          type: boolean
          description: Whether only the 'yes' side can be used for this event.
        size_max:
          type: integer
          format: int32
          nullable: true
          description: >-
            Maximum number of markets from this event (inclusive). Null means no
            limit.
        size_min:
          type: integer
          format: int32
          nullable: true
          description: >-
            Minimum number of markets from this event (inclusive). Null means no
            limit.
        active_quoters:
          type: array
          items:
            type: string
          description: List of active quoters for this event.
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
    InternalServerError:
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'

````