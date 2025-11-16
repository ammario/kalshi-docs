---
url: https://docs.kalshi.com/api-reference/search/get-filters-for-sports
lastmod: 2025-11-15T22:33:03.886Z
---
# Get Filters for Sports

> Retrieve available filters organized by sport.

This endpoint returns filtering options available for each sport, including scopes and competitions. It also provides an ordered list of sports for display purposes.


## OpenAPI

````yaml openapi.yaml get /search/filters_by_sport
paths:
  path: /search/filters_by_sport
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security: []
    parameters:
      path: {}
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
              filters_by_sports:
                allOf:
                  - type: object
                    description: Mapping of sports to their filter details
                    additionalProperties:
                      $ref: '#/components/schemas/SportFilterDetails'
              sport_ordering:
                allOf:
                  - type: array
                    description: Ordered list of sports for display
                    items:
                      type: string
            refIdentifier: '#/components/schemas/GetFiltersBySportsResponse'
            requiredProperties:
              - filters_by_sports
              - sport_ordering
        examples:
          example:
            value:
              filters_by_sports: {}
              sport_ordering:
                - <string>
        description: Filters retrieved successfully
    '401':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Unauthorized
        examples: {}
        description: Unauthorized
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
    ScopeList:
      type: object
      required:
        - scopes
      properties:
        scopes:
          type: array
          description: List of scopes
          items:
            type: string
    SportFilterDetails:
      type: object
      required:
        - scopes
        - competitions
      properties:
        scopes:
          type: array
          description: List of scopes available for this sport
          items:
            type: string
        competitions:
          type: object
          description: Mapping of competitions to their scope lists
          additionalProperties:
            $ref: '#/components/schemas/ScopeList'

````