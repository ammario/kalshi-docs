---
url: https://docs.kalshi.com/api-reference/search/get-tags-for-series-categories
lastmod: 2025-11-11T22:30:08.115Z
---
# Get Tags for Series Categories

> Retrieve tags organized by series categories.

This endpoint returns a mapping of series categories to their associated tags, which can be used for filtering and search functionality.


## OpenAPI

````yaml openapi.yaml get /search/tags_by_categories
paths:
  path: /search/tags_by_categories
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
              tags_by_categories:
                allOf:
                  - type: object
                    description: Mapping of series categories to their associated tags
                    additionalProperties:
                      type: array
                      items:
                        type: string
            refIdentifier: '#/components/schemas/GetTagsForSeriesCategoriesResponse'
            requiredProperties:
              - tags_by_categories
        examples:
          example:
            value:
              tags_by_categories: {}
        description: Tags retrieved successfully
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
  schemas: {}

````