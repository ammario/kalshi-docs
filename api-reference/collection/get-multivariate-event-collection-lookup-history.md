---
url: https://docs.kalshi.com/api-reference/collection/get-multivariate-event-collection-lookup-history
lastmod: 2025-11-03T03:42:07.108Z
---
# Get Multivariate Event Collection Lookup History

>  Endpoint for retrieving which markets in an event collection were recently looked up.

## OpenAPI

````yaml openapi.yaml get /multivariate_event_collections/{collection_ticker}/lookup
paths:
  path: /multivariate_event_collections/{collection_ticker}/lookup
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
      query:
        lookback_seconds:
          schema:
            - type: enum<integer>
              enum:
                - 10
                - 60
                - 300
                - 3600
              required: true
              description: >-
                Number of seconds to look back for lookup history. Must be one
                of 10, 60, 300, or 3600.
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              lookup_points:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/LookupPoint'
                    description: List of recent lookup points in the collection.
            refIdentifier: >-
              #/components/schemas/GetMultivariateEventCollectionLookupHistoryResponse
            requiredProperties:
              - lookup_points
        examples:
          example:
            value:
              lookup_points:
                - event_ticker: <string>
                  market_ticker: <string>
                  selected_markets:
                    - market_ticker: <string>
                      event_ticker: <string>
                      side: 'yes'
                  last_queried_ts: '2023-11-07T05:31:56Z'
        description: Lookup history retrieved successfully
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

````