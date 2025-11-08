---
url: https://docs.kalshi.com/api-reference/communications/create-rfq
lastmod: 2025-11-07T20:56:39.575Z
---
# Create RFQ

>  Endpoint for creating a new RFQ. You can have a maximum of 100 open RFQs at a time.

## OpenAPI

````yaml openapi.yaml post /communications/rfqs
paths:
  path: /communications/rfqs
  method: post
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
      path: {}
      query: {}
      header: {}
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              market_ticker:
                allOf:
                  - type: string
                    description: The ticker of the market for which to create an RFQ
              contracts:
                allOf:
                  - type: integer
                    description: The number of contracts for the RFQ
                    x-go-type-skip-optional-pointer: true
              target_cost_centi_cents:
                allOf:
                  - type: integer
                    format: int64
                    description: The target cost for the RFQ in centi-cents
                    x-go-type-skip-optional-pointer: true
              rest_remainder:
                allOf:
                  - type: boolean
                    description: Whether to rest the remainder of the RFQ after execution
              replace_existing:
                allOf:
                  - type: boolean
                    description: >-
                      Whether to delete existing RFQs as part of this RFQ's
                      creation
                    default: false
                    x-go-type-skip-optional-pointer: true
              subtrader_id:
                allOf:
                  - type: string
                    description: The subtrader to create the RFQ for (FCM members only)
                    x-go-type-skip-optional-pointer: true
            required: true
            refIdentifier: '#/components/schemas/CreateRFQRequest'
            requiredProperties:
              - market_ticker
              - rest_remainder
        examples:
          example:
            value:
              market_ticker: <string>
              contracts: 123
              target_cost_centi_cents: 123
              rest_remainder: true
              replace_existing: false
              subtrader_id: <string>
  response:
    '201':
      application/json:
        schemaArray:
          - type: object
            properties:
              id:
                allOf:
                  - type: string
                    description: The ID of the newly created RFQ
            refIdentifier: '#/components/schemas/CreateRFQResponse'
            requiredProperties:
              - id
        examples:
          example:
            value:
              id: <string>
        description: RFQ created successfully
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
    '409':
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
        description: Conflict - resource already exists or cannot be modified
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
  schemas: {}

````