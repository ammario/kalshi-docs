---
url: https://docs.kalshi.com/margin-rest/funding/get-funding-rate-estimate
lastmod: 2026-06-30T23:08:50.799Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Funding Rate Estimate

> Returns the estimated funding rate for the current, in-progress funding period. The value is a time-weighted average of the premium index computed over `[last_funding_time, now)`, so it continues to move as new data accumulates through the window and is only finalized at `next_funding_time`.




## OpenAPI

````yaml /perps_openapi.yaml get /margin/funding_rates/estimate
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
  /margin/funding_rates/estimate:
    get:
      tags:
        - funding
      summary: Get Funding Rate Estimate
      description: >
        Returns the estimated funding rate for the current, in-progress funding
        period. The value is a time-weighted average of the premium index
        computed over `[last_funding_time, now)`, so it continues to move as new
        data accumulates through the window and is only finalized at
        `next_funding_time`.
      operationId: GetMarginFundingRateEstimate
      parameters:
        - name: ticker
          in: query
          required: true
          description: Market ticker
          schema:
            type: string
            x-go-type-skip-optional-pointer: true
            x-oapi-codegen-extra-tags:
              validate: required
      responses:
        '200':
          description: Funding rate estimate retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarginFundingRateEstimateResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    GetMarginFundingRateEstimateResponse:
      type: object
      required:
        - next_funding_time
      properties:
        market_ticker:
          type: string
          description: Ticker of the margin market
        computed_time:
          type: string
          format: date-time
          description: Timestamp when this estimate was computed
        funding_rate:
          type: number
          format: double
          description: Estimated funding rate for the in-progress period
        mark_price:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Mark price at the time the estimate was computed
        next_funding_time:
          type: string
          format: date-time
          description: Timestamp of the next scheduled funding event
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with up to 6 decimal
        places of precision. This is the maximum supported precision; valid
        quote intervals for a given market are constrained by that market's
        price level structure.
      example: '0.5600'
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