---
url: https://docs.kalshi.com/api-reference/structured-targets/get-structured-target
lastmod: 2025-11-04T20:59:58.369Z
---
# Get Structured Target

>  Endpoint for getting data about a specific structured target by its ID.

## OpenAPI

````yaml openapi.yaml get /structured_targets/{structured_target_id}
paths:
  path: /structured_targets/{structured_target_id}
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security: []
    parameters:
      path:
        structured_target_id:
          schema:
            - type: string
              required: true
              description: Structured target ID
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
              structured_target:
                allOf:
                  - $ref: '#/components/schemas/StructuredTarget'
            refIdentifier: '#/components/schemas/GetStructuredTargetResponse'
        examples:
          example:
            value:
              structured_target:
                id: <string>
                name: <string>
                type: <string>
                details: {}
                source_id: <string>
                last_updated_ts: '2023-11-07T05:31:56Z'
        description: Structured target retrieved successfully
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
            description: Not found
        examples: {}
        description: Not found
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
    StructuredTarget:
      type: object
      properties:
        id:
          type: string
          description: Unique identifier for the structured target.
        name:
          type: string
          description: Name of the structured target.
        type:
          type: string
          description: Type of the structured target.
        details:
          type: object
          description: >-
            Additional details about the structured target. Contains flexible
            JSON data specific to the target type.
        source_id:
          type: string
          description: >-
            External source identifier for the structured target, if available
            (e.g., third-party data provider ID).
        last_updated_ts:
          type: string
          format: date-time
          description: Timestamp when this structured target was last updated.

````