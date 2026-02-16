---
url: https://docs.kalshi.com/api-reference/market/get-series
lastmod: 2026-02-15T22:56:23.009Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Series

>  Endpoint for getting data about a specific series by its ticker.  A series represents a template for recurring events that follow the same format and rules (e.g., "Monthly Jobs Report", "Weekly Initial Jobless Claims", "Daily Weather in NYC"). Series define the structure, settlement sources, and metadata that will be applied to each recurring event instance within that series.



## OpenAPI

````yaml openapi.yaml get /series/{series_ticker}
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.7.0
  description: >-
    Manually defined OpenAPI spec for endpoints being migrated to spec-first
    approach
servers:
  - url: https://api.elections.kalshi.com/trade-api/v2
    description: Production server
security: []
tags:
  - name: api-keys
    description: API key management endpoints
  - name: orders
    description: Order management endpoints
  - name: order-groups
    description: Order group management endpoints
  - name: portfolio
    description: Portfolio and balance information endpoints
  - name: communications
    description: Request-for-quote (RFQ) endpoints
  - name: multivariate
    description: Multivariate event collection endpoints
  - name: exchange
    description: Exchange status and information endpoints
  - name: live-data
    description: Live data endpoints
  - name: markets
    description: Market data endpoints
  - name: milestone
    description: Milestone endpoints
  - name: search
    description: Search and filtering endpoints
  - name: incentive-programs
    description: Incentive program endpoints
  - name: fcm
    description: FCM member specific endpoints
  - name: events
    description: Event endpoints
  - name: structured-targets
    description: Structured targets endpoints
paths:
  /series/{series_ticker}:
    get:
      tags:
        - market
      summary: Get Series
      description: ' Endpoint for getting data about a specific series by its ticker.  A series represents a template for recurring events that follow the same format and rules (e.g., "Monthly Jobs Report", "Weekly Initial Jobless Claims", "Daily Weather in NYC"). Series define the structure, settlement sources, and metadata that will be applied to each recurring event instance within that series.'
      operationId: GetSeries
      parameters:
        - name: series_ticker
          in: path
          required: true
          schema:
            type: string
          description: The ticker of the series to retrieve
        - name: include_volume
          in: query
          required: false
          schema:
            type: boolean
            default: false
          x-go-type-skip-optional-pointer: true
          description: >-
            If true, includes the total volume traded across all events in this
            series.
      responses:
        '200':
          description: Series retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetSeriesResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    GetSeriesResponse:
      type: object
      required:
        - series
      properties:
        series:
          $ref: '#/components/schemas/Series'
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
        volume:
          type: integer
          description: Total contracts traded across all events in this series.
        volume_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            String representation of the total number of contracts traded across
            all events in this series.
    ErrorResponse:
      type: object
      properties:
        code:
          type: string
          description: Error code
        message:
          type: string
          description: Human-readable error message
        details:
          type: string
          description: Additional details about the error, if available
        service:
          type: string
          description: The name of the service that generated the error
    SettlementSource:
      type: object
      properties:
        name:
          type: string
          description: Name of the settlement source
          x-go-type-skip-optional-pointer: true
        url:
          type: string
          description: URL to the settlement source
          x-go-type-skip-optional-pointer: true
    FixedPointCount:
      type: string
      description: >-
        Fixed-point contract count string (2 decimals, e.g., "10.00"; referred
        to as "fp" in field names). Requests accept 0–2 decimal places (e.g.,
        "10", "10.0", "10.00"); responses always emit 2 decimals. Currently only
        whole contract values are permitted, but the format supports future
        fractional precision. Integer contract count fields are legacy and will
        be deprecated; when both integer and fp fields are provided, they must
        match.
      example: '10.00'
  responses:
    BadRequestError:
      description: Bad request - invalid input
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    InternalServerError:
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'

````