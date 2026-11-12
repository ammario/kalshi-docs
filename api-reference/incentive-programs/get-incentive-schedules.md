---
url: https://docs.kalshi.com/api-reference/incentive-programs/get-incentive-schedules
lastmod: 2026-11-11T15:56:10.070Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Incentive Schedules

>  Recurring incentives: what each market of a series, or of one event, can expect to earn window after window. A schedule is anticipated, not promised, unless `all_markets` is true. The incentives themselves are listed by Get Incentives.



## OpenAPI

````yaml /openapi.yaml get /incentive_schedules
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.36.0
  description: >-
    Manually defined OpenAPI spec for endpoints being migrated to spec-first
    approach
servers:
  - url: https://external-api.kalshi.com/trade-api/v2
    description: Production Trade API server
  - url: https://api.elections.kalshi.com/trade-api/v2
    description: Production shared API server, also supported
  - url: https://external-api.demo.kalshi.co/trade-api/v2
    description: Demo Trade API server
  - url: https://demo-api.kalshi.co/trade-api/v2
    description: Demo shared API server, also supported
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
  /incentive_schedules:
    get:
      tags:
        - incentive-programs
      summary: Get Incentive Schedules
      description: ' Recurring incentives: what each market of a series, or of one event, can expect to earn window after window. A schedule is anticipated, not promised, unless `all_markets` is true. The incentives themselves are listed by Get Incentives.'
      operationId: GetIncentiveSchedules
      responses:
        '200':
          description: Incentive schedules retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetIncentiveSchedulesResponse'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    GetIncentiveSchedulesResponse:
      type: object
      required:
        - schedules
      properties:
        schedules:
          type: array
          items:
            $ref: '#/components/schemas/IncentiveSchedule'
    IncentiveSchedule:
      type: object
      required:
        - series_ticker
        - series_title
        - series_category
        - event_ticker
        - event_title
        - incentive_type
        - source
        - reward
        - window_days
        - description
        - all_markets
        - posted_ts
        - updated_ts
      properties:
        series_ticker:
          type: string
          description: The series the schedule covers
        series_title:
          type: string
          description: The series' title
        series_category:
          type: string
          description: The series' category
        event_ticker:
          type: string
          description: >-
            The one event of the series the schedule covers; empty when it
            covers the whole series
        event_title:
          type: string
          description: The event's title; empty when the schedule covers the whole series
        incentive_type:
          type: string
          enum:
            - liquidity
            - volume
          description: Type of the incentives the schedule creates
        source:
          type: string
          description: >-
            The job that publishes the schedule. With the series, event and
            type, it identifies the schedule.
        reward:
          type: integer
          format: int64
          description: >-
            What each market earns per window, in centi-cents, as period_reward
            is on an incentive program
        window_days:
          type: integer
          format: int32
          description: Days per window; 0 rewards each market once, up to its close
        discount_factor_bps:
          type: integer
          format: int32
          nullable: true
          description: Discount factor in basis points (liquidity only)
        target_size_fp:
          $ref: '#/components/schemas/FixedPointCount'
          nullable: true
          description: String representation of the target size (liquidity only)
        ends:
          type: string
          format: date-time
          nullable: true
          x-omitempty: false
          description: When the schedule stops (exclusive); null when it has no end
        description:
          type: string
          description: Plain text description of the schedule
        all_markets:
          type: boolean
          description: >-
            A promise that every market the schedule covers, including markets
            listed later, gets these terms window after window, from posted_ts
            until ends. When false the schedule is anticipated, not promised.
        posted_ts:
          type: string
          format: date-time
          description: When the schedule was first published on its current terms
        updated_ts:
          type: string
          format: date-time
          description: When the schedule was last published
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
    InternalServerError:
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.