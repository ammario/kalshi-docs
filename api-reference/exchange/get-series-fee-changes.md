---
url: https://docs.kalshi.com/api-reference/exchange/get-series-fee-changes
lastmod: 2025-11-08T05:38:39.865Z
---
# Get Series Fee Changes

## OpenAPI

````yaml openapi.yaml get /series/fee_changes
paths:
  path: /series/fee_changes
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security: []
    parameters:
      path: {}
      query:
        series_ticker:
          schema:
            - type: string
              required: false
        show_historical:
          schema:
            - type: boolean
              required: false
              default: false
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              series_fee_change_arr:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/SeriesFeeChange'
            refIdentifier: '#/components/schemas/GetSeriesFeeChangesResponse'
            requiredProperties:
              - series_fee_change_arr
        examples:
          example:
            value:
              series_fee_change_arr:
                - id: <string>
                  series_ticker: <string>
                  fee_type: quadratic
                  fee_multiplier: 123
                  scheduled_ts: '2023-11-07T05:31:56Z'
        description: Series fee changes retrieved successfully
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
    SeriesFeeChange:
      type: object
      required:
        - id
        - series_ticker
        - fee_type
        - fee_multiplier
        - scheduled_ts
      properties:
        id:
          type: string
          description: Unique identifier for this fee change
        series_ticker:
          type: string
          description: Series ticker this fee change applies to
        fee_type:
          type: string
          enum:
            - quadratic
            - quadratic_with_maker_fees
            - flat
          description: New fee type for the series
        fee_multiplier:
          type: number
          format: double
          description: New fee multiplier for the series
        scheduled_ts:
          type: string
          format: date-time
          description: Timestamp when this fee change is scheduled to take effect

````