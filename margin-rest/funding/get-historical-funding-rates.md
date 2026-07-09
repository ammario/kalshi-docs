---
url: https://docs.kalshi.com/margin-rest/funding/get-historical-funding-rates
lastmod: 2026-07-08T17:15:17.781Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Historical Funding Rates

> Endpoint for retrieving historical margin funding rates for a market, or across all markets when ticker is empty.



## OpenAPI

````yaml /perps_openapi.yaml get /margin/funding_rates/historical
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
  - name: fcm
    description: FCM member specific endpoints
  - name: risk
    description: Margin risk metrics, parameters, and limits
  - name: funding
    description: Funding rates and payment history
  - name: fees
    description: Margin fee schedule
paths:
  /margin/funding_rates/historical:
    get:
      tags:
        - funding
      summary: Get Historical Funding Rates
      description: >-
        Endpoint for retrieving historical margin funding rates for a market, or
        across all markets when ticker is empty.
      operationId: GetMarginHistoricalFundingRates
      parameters:
        - name: ticker
          in: query
          required: false
          description: Market ticker. Leave empty to query across all markets.
          schema:
            type: string
            x-go-type-skip-optional-pointer: true
        - name: start_ts
          in: query
          required: false
          description: >-
            Start timestamp (Unix timestamp in seconds). If omitted, defaults to
            the earliest available data.
          schema:
            type: integer
            format: int64
        - name: end_ts
          in: query
          required: false
          description: >-
            End timestamp (Unix timestamp in seconds). If omitted, defaults to
            the current time.
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: Historical funding rates retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarginHistoricalFundingRatesResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    GetMarginHistoricalFundingRatesResponse:
      type: object
      required:
        - funding_rates
      properties:
        funding_rates:
          type: array
          items:
            $ref: '#/components/schemas/MarginFundingRate'
          description: Array of historical funding rate entries
    MarginFundingRate:
      type: object
      required:
        - market_ticker
        - funding_time
        - funding_rate
        - mark_price
      properties:
        market_ticker:
          type: string
          description: Ticker of the margin market
        funding_time:
          type: string
          format: date-time
          description: Timestamp when the funding rate was applied
        funding_rate:
          type: number
          format: double
          description: Funding rate for this period
        mark_price:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Mark price at the time of funding
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