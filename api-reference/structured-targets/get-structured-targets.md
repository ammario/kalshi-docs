---
url: https://docs.kalshi.com/api-reference/structured-targets/get-structured-targets
lastmod: 2025-11-30T02:04:39.235Z
---
# Get Structured Targets

> Page size (min: 1, max: 2000)

## OpenAPI

````yaml openapi.yaml get /structured_targets
paths:
  path: /structured_targets
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security: []
    parameters:
      path: {}
      query:
        type:
          schema:
            - type: string
              required: false
              description: Filter by structured target type
        competition:
          schema:
            - type: string
              required: false
              description: Filter by competition
        page_size:
          schema:
            - type: integer
              required: false
              description: Number of items per page (min 1, max 2000, default 100)
              maximum: 2000
              minimum: 1
              default: 100
        cursor:
          schema:
            - type: string
              required: false
              description: Pagination cursor
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              structured_targets:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/StructuredTarget'
              cursor:
                allOf:
                  - type: string
                    description: >-
                      Pagination cursor for the next page. Empty if there are no
                      more results.
            refIdentifier: '#/components/schemas/GetStructuredTargetsResponse'
        examples:
          example:
            value:
              structured_targets:
                - id: <string>
                  name: <string>
                  type: <string>
                  details: {}
                  source_id: <string>
                  last_updated_ts: '2023-11-07T05:31:56Z'
              cursor: <string>
        description: Structured targets retrieved successfully
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

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt