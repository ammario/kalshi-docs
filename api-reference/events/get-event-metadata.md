---
url: https://docs.kalshi.com/api-reference/events/get-event-metadata
lastmod: 2025-12-01T22:52:17.963Z
---
# Get Event Metadata

>  Endpoint for getting metadata about an event by its ticker.  Returns only the metadata information for an event.

## OpenAPI

````yaml openapi.yaml get /events/{event_ticker}/metadata
paths:
  path: /events/{event_ticker}/metadata
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security: []
    parameters:
      path:
        event_ticker:
          schema:
            - type: string
              required: true
              description: Event ticker
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
              image_url:
                allOf:
                  - type: string
                    description: A path to an image that represents this event.
              featured_image_url:
                allOf:
                  - type: string
                    description: >-
                      A path to an image that represents the image of the
                      featured market.
              market_details:
                allOf:
                  - type: array
                    description: Metadata for the markets in this event.
                    items:
                      $ref: '#/components/schemas/MarketMetadata'
              settlement_sources:
                allOf:
                  - type: array
                    description: A list of settlement sources for this event.
                    items:
                      $ref: '#/components/schemas/SettlementSource'
              competition:
                allOf:
                  - type: string
                    nullable: true
                    x-omitempty: true
                    description: Event competition.
                    x-go-type-skip-optional-pointer: true
              competition_scope:
                allOf:
                  - type: string
                    nullable: true
                    x-omitempty: true
                    description: Event scope, based on the competition.
                    x-go-type-skip-optional-pointer: true
            refIdentifier: '#/components/schemas/GetEventMetadataResponse'
            requiredProperties:
              - image_url
              - settlement_sources
              - market_details
        examples:
          example:
            value:
              image_url: <string>
              featured_image_url: <string>
              market_details:
                - market_ticker: <string>
                  image_url: <string>
                  color_code: <string>
              settlement_sources:
                - name: <string>
                  url: <string>
              competition: <string>
              competition_scope: <string>
        description: Event metadata retrieved successfully
    '400':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Bad request
        examples: {}
        description: Bad request
    '401':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Unauthorized
        examples: {}
        description: Unauthorized
    '404':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Event not found
        examples: {}
        description: Event not found
    '500':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Internal server error
        examples: {}
        description: Internal server error
  deprecated: false
  type: path
components:
  schemas:
    MarketMetadata:
      type: object
      required:
        - market_ticker
        - image_url
        - color_code
      properties:
        market_ticker:
          type: string
          description: The ticker of the market.
        image_url:
          type: string
          description: A path to an image that represents this market.
        color_code:
          type: string
          description: The color code for the market.
    SettlementSource:
      type: object
      properties:
        name:
          type: string
          description: Name of the settlement source
          x-go-type-skip-optional-pointer: true
        url:
          type: string
          description: URL to the settlement source
          x-go-type-skip-optional-pointer: true

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt