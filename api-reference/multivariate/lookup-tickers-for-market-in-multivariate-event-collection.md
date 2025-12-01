---
url: https://docs.kalshi.com/api-reference/multivariate/lookup-tickers-for-market-in-multivariate-event-collection
lastmod: 2025-11-30T17:58:56.824Z
---
# Lookup Tickers For Market In Multivariate Event Collection

>  Endpoint for looking up an individual market in a multivariate event collection. If CreateMarketInMultivariateEventCollection has never been hit with that variable combination before, this will return a 404.

## OpenAPI

````yaml openapi.yaml put /multivariate_event_collections/{collection_ticker}/lookup
paths:
  path: /multivariate_event_collections/{collection_ticker}/lookup
  method: put
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security:
      - title: kalshiAccessKey & kalshiAccessSignature & kalshiAccessTimestamp
        parameters:
          query: {}
          header:
            KALSHI-ACCESS-KEY:
              type: apiKey
              description: Your API key ID
            KALSHI-ACCESS-SIGNATURE:
              type: apiKey
              description: RSA-PSS signature of the request
            KALSHI-ACCESS-TIMESTAMP:
              type: apiKey
              description: Request timestamp in milliseconds
          cookie: {}
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
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              selected_markets:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/TickerPair'
                    description: >-
                      List of selected markets that act as parameters to
                      determine which market is produced.
            required: true
            refIdentifier: >-
              #/components/schemas/LookupTickersForMarketInMultivariateEventCollectionRequest
            requiredProperties:
              - selected_markets
        examples:
          example:
            value:
              selected_markets:
                - market_ticker: <string>
                  event_ticker: <string>
                  side: 'yes'
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              event_ticker:
                allOf:
                  - type: string
                    description: Event ticker for the looked up market.
              market_ticker:
                allOf:
                  - type: string
                    description: Market ticker for the looked up market.
            refIdentifier: >-
              #/components/schemas/LookupTickersForMarketInMultivariateEventCollectionResponse
            requiredProperties:
              - event_ticker
              - market_ticker
        examples:
          example:
            value:
              event_ticker: <string>
              market_ticker: <string>
        description: Market looked up successfully
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
    '401':
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
        description: Unauthorized - authentication required
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

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt