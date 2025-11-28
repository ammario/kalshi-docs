---
url: https://docs.kalshi.com/api-reference/exchange/get-exchange-status
lastmod: 2025-11-26T03:48:53.739Z
---
# Get Exchange Status

>  Endpoint for getting the exchange status.

## OpenAPI

````yaml openapi.yaml get /exchange/status
paths:
  path: /exchange/status
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
              exchange_active:
                allOf:
                  - &ref_0
                    type: boolean
                    description: >-
                      False if the core Kalshi exchange is no longer taking any
                      state changes at all. This includes but is not limited to
                      trading, new users, and transfers. True unless we are
                      under maintenance.
              trading_active:
                allOf:
                  - &ref_1
                    type: boolean
                    description: >-
                      True if we are currently permitting trading on the
                      exchange. This is true during trading hours and false
                      outside exchange hours. Kalshi reserves the right to pause
                      at any time in case issues are detected.
              exchange_estimated_resume_time:
                allOf:
                  - &ref_2
                    type: string
                    format: date-time
                    description: >-
                      Estimated downtime for the current exchange maintenance
                      window. However, this is not guaranteed and can be
                      extended.
                    nullable: true
            refIdentifier: '#/components/schemas/ExchangeStatus'
            requiredProperties: &ref_3
              - exchange_active
              - trading_active
        examples:
          example:
            value:
              exchange_active: true
              trading_active: true
              exchange_estimated_resume_time: '2023-11-07T05:31:56Z'
        description: Exchange status retrieved successfully
    '500':
      application/json:
        schemaArray:
          - type: object
            properties:
              exchange_active:
                allOf:
                  - *ref_0
              trading_active:
                allOf:
                  - *ref_1
              exchange_estimated_resume_time:
                allOf:
                  - *ref_2
            refIdentifier: '#/components/schemas/ExchangeStatus'
            requiredProperties: *ref_3
        examples:
          example:
            value:
              exchange_active: true
              trading_active: true
              exchange_estimated_resume_time: '2023-11-07T05:31:56Z'
        description: Internal server error
    '503':
      application/json:
        schemaArray:
          - type: object
            properties:
              exchange_active:
                allOf:
                  - *ref_0
              trading_active:
                allOf:
                  - *ref_1
              exchange_estimated_resume_time:
                allOf:
                  - *ref_2
            refIdentifier: '#/components/schemas/ExchangeStatus'
            requiredProperties: *ref_3
        examples:
          example:
            value:
              exchange_active: true
              trading_active: true
              exchange_estimated_resume_time: '2023-11-07T05:31:56Z'
        description: Service unavailable
    '504':
      application/json:
        schemaArray:
          - type: object
            properties:
              exchange_active:
                allOf:
                  - *ref_0
              trading_active:
                allOf:
                  - *ref_1
              exchange_estimated_resume_time:
                allOf:
                  - *ref_2
            refIdentifier: '#/components/schemas/ExchangeStatus'
            requiredProperties: *ref_3
        examples:
          example:
            value:
              exchange_active: true
              trading_active: true
              exchange_estimated_resume_time: '2023-11-07T05:31:56Z'
        description: Gateway timeout
  deprecated: false
  type: path
components:
  schemas: {}

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt