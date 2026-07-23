---
url: https://docs.kalshi.com/margin-rest/funding/get-funding-history
lastmod: 2026-07-22T14:53:04.142Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Funding History

> Endpoint for retrieving the authenticated user's historical margin funding payments joined with funding rates for a specific market, or across all markets when ticker is empty, over an inclusive UTC date range.



## OpenAPI

````yaml /perps_openapi.yaml get /margin/funding_history
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 0.0.1
  description: >-
    Manually defined OpenAPI spec for endpoints being migrated to spec-first
    approach
servers:
  - url: https://external-api.kalshi.com/trade-api/v2
    description: Production perps REST API server
  - url: https://external-api.demo.kalshi.co/trade-api/v2
    description: Demo perps REST API server
security: []
tags:
  - name: account
    description: Account information endpoints
  - name: exchange
    description: Exchange status and information endpoints
  - name: market
    description: Market data endpoints
  - name: orders
    description: Order management endpoints
  - name: order-groups
    description: Order group management endpoints
  - name: portfolio
    description: Portfolio and balance information endpoints
  - name: risk
    description: Margin risk metrics, parameters, and limits
  - name: funding
    description: Funding rates and payment history
  - name: fees
    description: Margin fee schedule
paths:
  /margin/funding_history:
    get:
      tags:
        - funding
      summary: Get Funding History
      description: >-
        Endpoint for retrieving the authenticated user's historical margin
        funding payments joined with funding rates for a specific market, or
        across all markets when ticker is empty, over an inclusive UTC date
        range.
      operationId: GetMarginFundingHistory
      parameters:
        - name: ticker
          in: query
          required: false
          description: >-
            Market ticker for funding history. Leave empty to query across all
            markets.
          schema:
            type: string
            x-go-type-skip-optional-pointer: true
        - name: start_date
          in: query
          required: true
          description: >-
            Inclusive UTC start date for funding history range (YYYY-MM-DD
            format)
          schema:
            type: string
            format: date
            x-go-type-skip-optional-pointer: true
            x-oapi-codegen-extra-tags:
              validate: required
        - name: end_date
          in: query
          required: true
          description: Inclusive UTC end date for funding history range (YYYY-MM-DD format)
          schema:
            type: string
            format: date
            x-go-type-skip-optional-pointer: true
            x-oapi-codegen-extra-tags:
              validate: required
        - $ref: '#/components/parameters/SubaccountQuery'
      responses:
        '200':
          description: Funding history retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarginFundingHistoryResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  parameters:
    SubaccountQuery:
      name: subaccount
      in: query
      required: false
      description: >-
        Subaccount number (0 for primary, 1-63 for subaccounts). If omitted,
        defaults to all subaccounts.
      schema:
        type: integer
        minimum: 0
  schemas:
    GetMarginFundingHistoryResponse:
      type: object
      required:
        - funding_history
      properties:
        funding_history:
          type: array
          items:
            $ref: '#/components/schemas/MarginFundingHistoryEntry'
          description: Array of historical funding payment entries
    MarginFundingHistoryEntry:
      type: object
      required:
        - market_ticker
        - funding_time
        - funding_rate
        - mark_price
        - funding_amount
        - quantity
        - subaccount_number
      properties:
        market_ticker:
          type: string
          description: Ticker of the margin market
        funding_time:
          type: string
          format: date-time
          description: Timestamp when the funding payment was applied
        funding_rate:
          type: number
          format: double
          description: Funding rate for this period
        mark_price:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Mark price at the time of funding
        funding_amount:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Dollar amount of the funding payment (positive = received, negative
            = paid)
        quantity:
          $ref: '#/components/schemas/FixedPointCount'
          description: Position size at time of funding as a fixed-point count string
        subaccount_number:
          type: integer
          nullable: true
          description: Subaccount number (0 for primary)
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
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with up to 6 decimal
        places of precision. This is the maximum supported precision; valid
        quote intervals for a given market are constrained by that market's
        price level structure.
      example: '0.5600'
    FixedPointCount:
      type: string
      description: >-
        Fixed-point contract count string (2 decimals, e.g., "10.00"; referred
        to as "fp" in field names). Requests accept 0-2 decimal places (e.g.,
        "10", "10.0", "10.00"); responses always emit 2 decimals. Fractional
        contract values (e.g., "2.50") are supported; the minimum granularity is
        0.01 contracts.
      example: '10.00'
  responses:
    BadRequestError:
      description: Bad request - invalid input
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    UnauthorizedError:
      description: Unauthorized - authentication required
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    ForbiddenError:
      description: Forbidden - insufficient permissions
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
  securitySchemes:
    kalshiAccessKey:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-KEY
      description: Your API key ID
    kalshiAccessSignature:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-SIGNATURE
      description: RSA-PSS signature of the request
    kalshiAccessTimestamp:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-TIMESTAMP
      description: Request timestamp in milliseconds

````