---
url: https://docs.kalshi.com/api-reference/live_data/get-live-data
lastmod: 2025-11-15T22:33:03.962Z
---
# Get Live Data

> Get live data for a specific milestone

## OpenAPI

````yaml openapi.yaml get /live_data/{type}/milestone/{milestone_id}
paths:
  path: /live_data/{type}/milestone/{milestone_id}
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security: []
    parameters:
      path:
        type:
          schema:
            - type: string
              required: true
              description: Type of live data
        milestone_id:
          schema:
            - type: string
              required: true
              description: Milestone ID
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
              live_data:
                allOf:
                  - $ref: '#/components/schemas/LiveData'
            refIdentifier: '#/components/schemas/GetLiveDataResponse'
            requiredProperties:
              - live_data
        examples:
          example:
            value:
              live_data:
                type: <string>
                details: {}
        description: Live data retrieved successfully
    '404':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Live data not found
        examples: {}
        description: Live data not found
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