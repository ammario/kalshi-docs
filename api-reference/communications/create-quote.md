---
url: https://docs.kalshi.com/api-reference/communications/create-quote
lastmod: 2025-11-19T00:52:48.793Z
---
# Create Quote

>  Endpoint for creating a quote in response to an RFQ

## OpenAPI

````yaml openapi.yaml post /communications/quotes
paths:
  path: /communications/quotes
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
              rfq_id:
                allOf:
                  - type: string
                    description: The ID of the RFQ to quote on
              yes_bid:
                allOf:
                  - type: string
                    description: The bid price for YES contracts, in dollars
              no_bid:
                allOf:
                  - type: string
                    description: The bid price for NO contracts, in dollars
              rest_remainder:
                allOf:
                  - type: boolean
                    description: Whether to rest the remainder of the quote after execution
            required: true
            refIdentifier: '#/components/schemas/CreateQuoteRequest'
            requiredProperties:
              - rfq_id
              - yes_bid
              - no_bid
              - rest_remainder
        examples:
          example:
            value:
              rfq_id: <string>
              yes_bid: <string>
              no_bid: <string>
              rest_remainder: true
  response:
    '201':
      application/json:
        schemaArray:
          - type: object
            properties:
              id:
                allOf:
                  - type: string
                    description: The ID of the newly created quote
            refIdentifier: '#/components/schemas/CreateQuoteResponse'
            requiredProperties:
              - id
        examples:
          example:
            value:
              id: <string>
        description: Quote created successfully
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