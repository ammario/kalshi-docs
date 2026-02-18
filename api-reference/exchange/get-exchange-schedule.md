---
url: https://docs.kalshi.com/api-reference/exchange/get-exchange-schedule
lastmod: 2026-02-17T22:50:39.203Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Exchange Schedule

>  Endpoint for getting the exchange schedule.



## OpenAPI

````yaml openapi.yaml get /exchange/schedule
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.8.0
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
  /exchange/schedule:
    get:
      tags:
        - exchange
      summary: Get Exchange Schedule
      description: ' Endpoint for getting the exchange schedule.'
      operationId: GetExchangeSchedule
      responses:
        '200':
          description: Exchange schedule retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetExchangeScheduleResponse'
        '500':
          description: Internal server error
components:
  schemas:
    GetExchangeScheduleResponse:
      type: object
      required:
        - schedule
      properties:
        schedule:
          $ref: '#/components/schemas/Schedule'
    Schedule:
      type: object
      required:
        - standard_hours
        - maintenance_windows
      properties:
        standard_hours:
          type: array
          description: >-
            The standard operating hours of the exchange. All times are
            expressed in ET. Outside of these times trading will be unavailable.
          items:
            $ref: '#/components/schemas/WeeklySchedule'
        maintenance_windows:
          type: array
          description: >-
            Scheduled maintenance windows, during which the exchange may be
            unavailable.
          items:
            $ref: '#/components/schemas/MaintenanceWindow'
    WeeklySchedule:
      type: object
      required:
        - start_time
        - end_time
        - monday
        - tuesday
        - wednesday
        - thursday
        - friday
        - saturday
        - sunday
      properties:
        start_time:
          type: string
          format: date-time
          description: Start date and time for when this weekly schedule is effective.
        end_time:
          type: string
          format: date-time
          description: >-
            End date and time for when this weekly schedule is no longer
            effective.
        monday:
          type: array
          description: Trading hours for Monday. May contain multiple sessions.
          items:
            $ref: '#/components/schemas/DailySchedule'
        tuesday:
          type: array
          description: Trading hours for Tuesday. May contain multiple sessions.
          items:
            $ref: '#/components/schemas/DailySchedule'
        wednesday:
          type: array
          description: Trading hours for Wednesday. May contain multiple sessions.
          items:
            $ref: '#/components/schemas/DailySchedule'
        thursday:
          type: array
          description: Trading hours for Thursday. May contain multiple sessions.
          items:
            $ref: '#/components/schemas/DailySchedule'
        friday:
          type: array
          description: Trading hours for Friday. May contain multiple sessions.
          items:
            $ref: '#/components/schemas/DailySchedule'
        saturday:
          type: array
          description: Trading hours for Saturday. May contain multiple sessions.
          items:
            $ref: '#/components/schemas/DailySchedule'
        sunday:
          type: array
          description: Trading hours for Sunday. May contain multiple sessions.
          items:
            $ref: '#/components/schemas/DailySchedule'
    MaintenanceWindow:
      type: object
      required:
        - start_datetime
        - end_datetime
      properties:
        start_datetime:
          type: string
          format: date-time
          description: Start date and time of the maintenance window.
        end_datetime:
          type: string
          format: date-time
          description: End date and time of the maintenance window.
    DailySchedule:
      type: object
      required:
        - open_time
        - close_time
      properties:
        open_time:
          type: string
          description: Opening time in ET (Eastern Time) format HH:MM.
        close_time:
          type: string
          description: Closing time in ET (Eastern Time) format HH:MM.

````