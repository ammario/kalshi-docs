---
url: https://docs.kalshi.com/margin-rest/market/get-market-schedules
lastmod: 2026-11-20T01:33:58.905Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Market Schedules

> Endpoint for retrieving recurring Kalshi trading hours and holiday closures for multiple margin markets. Returns a map keyed by market ticker.



## OpenAPI

````yaml /perps_openapi.yaml get /margin/markets/schedules
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
  - name: fcm
    description: FCM member specific endpoints
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
  - name: exit-triggers
    description: Stop-loss, take-profit, and trailing-stop triggers on margin positions
paths:
  /margin/markets/schedules:
    get:
      tags:
        - market
      summary: Get Market Schedules
      description: >-
        Endpoint for retrieving recurring Kalshi trading hours and holiday
        closures for multiple margin markets. Returns a map keyed by market
        ticker.
      operationId: GetMarginMarketSchedules
      parameters:
        - name: tickers
          in: query
          required: true
          description: Comma-separated list of margin market tickers
          schema:
            type: array
            items:
              type: string
              minLength: 1
              maxLength: 200
            minItems: 1
            maxItems: 100
          style: form
          explode: false
          x-oapi-codegen-extra-tags:
            validate: required,min=1,max=100,dive,required,max=200
      responses:
        '200':
          description: Market schedules retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarginMarketSchedulesResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '404':
          $ref: '#/components/responses/NotFoundError'
        '429':
          $ref: '#/components/responses/RateLimitError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    GetMarginMarketSchedulesResponse:
      type: object
      additionalProperties:
        $ref: '#/components/schemas/MarginMarketScheduleDetails'
    MarginMarketScheduleDetails:
      type: object
      required:
        - kalshi_trading_holidays
      properties:
        kalshi_trading_holidays:
          type: array
          description: Kalshi trading holiday closures for the market.
          items:
            $ref: '#/components/schemas/MarginHolidayWindow'
        kalshi_trading_schedule:
          $ref: '#/components/schemas/MarginTradingCronSchedule'
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
    MarginHolidayWindow:
      type: object
      required:
        - from
        - until
      properties:
        from:
          type: string
          format: date-time
          description: Inclusive start of the holiday closure in UTC.
        until:
          type: string
          format: date-time
          description: Exclusive end of the holiday closure in UTC.
        reason:
          type: string
          description: Reason for the holiday closure.
    MarginTradingCronSchedule:
      type: object
      description: >-
        Recurring Kalshi trading hours, including market-specific overrides.
        Available after schedule synchronization. Empty cron arrays mean
        continuous trading except for closures in kalshi_trading_holidays.
      required:
        - timezone
        - open_crons
        - close_crons
      properties:
        timezone:
          type: string
          description: IANA timezone used to evaluate the cron expressions.
          enum:
            - America/New_York
        open_crons:
          type: array
          description: >-
            Five-field cron expressions (minute, hour, day of month, month, day
            of week) for recurring trading session opens. Day of week 0 is
            Sunday.
          items:
            type: string
        close_crons:
          type: array
          description: >-
            Five-field cron expressions (minute, hour, day of month, month, day
            of week) for recurring trading session closes. Day of week 0 is
            Sunday.
          items:
            type: string
  responses:
    BadRequestError:
      description: Bad request - invalid input
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    NotFoundError:
      description: Resource not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    RateLimitError:
      description: >-
        Rate limit exceeded. The default cost is 10 tokens per request. Use GET
        /trade-api/v2/account/endpoint_costs to list non-default endpoint costs.
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

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.