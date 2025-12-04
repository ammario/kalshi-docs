---
url: https://docs.kalshi.com/api-reference/multivariate/get-multivariate-event-collection
lastmod: 2025-12-04T02:14:27.903Z
---
# Get Multivariate Event Collection

>  Endpoint for getting data about a multivariate event collection by its ticker.

## OpenAPI

````yaml openapi.yaml get /multivariate_event_collections/{collection_ticker}
paths:
  path: /multivariate_event_collections/{collection_ticker}
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security: []
    parameters:
      path:
        collection_ticker:
          schema:
            - type: string
              required: true
              description: Collection ticker
      query: {}
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              multivariate_contract:
                allOf:
                  - $ref: '#/components/schemas/MultivariateEventCollection'
                    description: The multivariate event collection.
            refIdentifier: '#/components/schemas/GetMultivariateEventCollectionResponse'
            requiredProperties:
              - multivariate_contract
        examples:
          example:
            value:
              multivariate_contract:
                collection_ticker: <string>
                series_ticker: <string>
                title: <string>
                description: <string>
                open_date: '2023-11-07T05:31:56Z'
                close_date: '2023-11-07T05:31:56Z'
                associated_events:
                  - ticker: <string>
                    is_yes_only: true
                    size_max: 123
                    size_min: 123
                    active_quoters:
                      - <string>
                associated_event_tickers:
                  - <string>
                is_ordered: true
                is_single_market_per_event: true
                is_all_yes: true
                size_min: 123
                size_max: 123
                functional_description: <string>
        description: Collection retrieved successfully
    '400':
      application/json:
        schemaArray:
          - type: object
            properties:
              code:
                allOf:
                  - &ref_0
                    type: string
                    description: Error code
              message:
                allOf:
                  - &ref_1
                    type: string
                    description: Human-readable error message
              details:
                allOf:
                  - &ref_2
                    type: string
                    description: Additional details about the error, if available
              service:
                allOf:
                  - &ref_3
                    type: string
                    description: The name of the service that generated the error
            refIdentifier: '#/components/schemas/ErrorResponse'
        examples:
          example:
            value:
              code: <string>
              message: <string>
              details: <string>
              service: <string>
        description: Bad request - invalid input
    '404':
      application/json:
        schemaArray:
          - type: object
            properties:
              code:
                allOf:
                  - *ref_0
              message:
                allOf:
                  - *ref_1
              details:
                allOf:
                  - *ref_2
              service:
                allOf:
                  - *ref_3
            refIdentifier: '#/components/schemas/ErrorResponse'
        examples:
          example:
            value:
              code: <string>
              message: <string>
              details: <string>
              service: <string>
        description: Resource not found
    '500':
      application/json:
        schemaArray:
          - type: object
            properties:
              code:
                allOf:
                  - *ref_0
              message:
                allOf:
                  - *ref_1
              details:
                allOf:
                  - *ref_2
              service:
                allOf:
                  - *ref_3
            refIdentifier: '#/components/schemas/ErrorResponse'
        examples:
          example:
            value:
              code: <string>
              message: <string>
              details: <string>
              service: <string>
        description: Internal server error
  deprecated: false
  type: path
components:
  schemas:
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

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt