---
url: https://docs.kalshi.com/api-reference/market/get-series
lastmod: 2025-10-29T14:29:20.985Z
---
# Get Series

>  Endpoint for getting data about a specific series by its ticker.  A series represents a template for recurring events that follow the same format and rules (e.g., "Monthly Jobs Report", "Weekly Initial Jobless Claims", "Daily Weather in NYC"). Series define the structure, settlement sources, and metadata that will be applied to each recurring event instance within that series.

## OpenAPI

````yaml openapi.yaml get /series/{series_ticker}
paths:
  path: /series/{series_ticker}
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security: []
    parameters:
      path:
        series_ticker:
          schema:
            - type: string
              required: true
              description: The ticker of the series to retrieve
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
              series:
                allOf:
                  - $ref: '#/components/schemas/Series'
            refIdentifier: '#/components/schemas/GetSeriesResponse'
            requiredProperties:
              - series
        examples:
          example:
            value:
              series:
                ticker: <string>
                frequency: <string>
                title: <string>
                category: <string>
                tags:
                  - <string>
                settlement_sources:
                  - name: <string>
                    url: <string>
                contract_url: <string>
                contract_terms_url: <string>
                product_metadata: {}
                fee_type: quadratic
                fee_multiplier: 123
                additional_prohibitions:
                  - <string>
        description: Series retrieved successfully
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
    Series:
      type: object
      required:
        - ticker
        - frequency
        - title
        - category
        - tags
        - settlement_sources
        - contract_url
        - contract_terms_url
        - fee_type
        - fee_multiplier
        - additional_prohibitions
      properties:
        ticker:
          type: string
          description: Ticker that identifies this series.
        frequency:
          type: string
          description: >-
            Description of the frequency of the series. There is no fixed value
            set here, but will be something human-readable like weekly, daily,
            one-off.
        title:
          type: string
          description: >-
            Title describing the series. For full context use you should use
            this field with the title field of the events belonging to this
            series.
        category:
          type: string
          description: Category specifies the category which this series belongs to.
        tags:
          type: array
          items:
            type: string
          description: >-
            Tags specifies the subjects that this series relates to, multiple
            series from different categories can have the same tags.
        settlement_sources:
          type: array
          items:
            $ref: '#/components/schemas/SettlementSource'
          description: >-
            SettlementSources specifies the official sources used for the
            determination of markets within the series. Methodology is defined
            in the rulebook.
        contract_url:
          type: string
          description: >-
            ContractUrl provides a direct link to the original filing of the
            contract which underlies the series.
        contract_terms_url:
          type: string
          description: >-
            ContractTermsUrl is the URL to the current terms of the contract
            underlying the series.
        product_metadata:
          type: object
          nullable: true
          x-omitempty: true
          description: Internal product metadata of the series.
        fee_type:
          type: string
          enum:
            - quadratic
            - quadratic_with_maker_fees
            - flat
          description: >-
            FeeType is a string representing the series' fee structure. Fee
            structures can be found at
            https://kalshi.com/docs/kalshi-fee-schedule.pdf. 'quadratic' is
            described by the General Trading Fees Table,
            'quadratic_with_maker_fees' is described by the General Trading Fees
            Table with maker fees described in the Maker Fees section, 'flat' is
            described by the Specific Trading Fees Table.
        fee_multiplier:
          type: number
          format: double
          description: >-
            FeeMultiplier is a floating point multiplier applied to the fee
            calculations.
        additional_prohibitions:
          type: array
          items:
            type: string
          description: >-
            AdditionalProhibitions is a list of additional trading prohibitions
            for this series.
    SettlementSource:
      type: object
      properties:
        name:
          type: string
          description: Name of the settlement source
        url:
          type: string
          description: URL to the settlement source

````