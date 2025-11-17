---
url: https://docs.kalshi.com/api-reference/events/get-event-metadata
lastmod: 2025-11-16T23:50:39.944Z
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
        examples:
          example:
            value:
              image_url: <string>
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