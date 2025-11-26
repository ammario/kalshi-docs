---
url: https://docs.kalshi.com/api-reference/live-data/get-multiple-live-data
lastmod: 2025-11-25T20:57:32.719Z
---
# Get Multiple Live Data

> Get live data for multiple milestones

## OpenAPI

````yaml openapi.yaml get /live_data/batch
paths:
  path: /live_data/batch
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security: []
    parameters:
      path: {}
      query:
        milestone_ids:
          schema:
            - type: array
              items:
                allOf:
                  - type: string
              required: true
              description: Array of milestone IDs
              maxItems: 100
          style: form
          explode: true
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              live_datas:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/LiveData'
            refIdentifier: '#/components/schemas/GetLiveDatasResponse'
            requiredProperties:
              - live_datas
        examples:
          example:
            value:
              live_datas:
                - type: <string>
                  details: {}
        description: Live data retrieved successfully
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
    LiveData:
      type: object
      required:
        - type
        - details
      properties:
        type:
          type: string
          description: Type of live data
        details:
          type: object
          additionalProperties: true
          description: Live data details as a flexible object

````