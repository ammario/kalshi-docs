---
url: https://docs.kalshi.com/api-reference/exchange/get-exchange-schedule
lastmod: 2025-11-06T21:21:13.168Z
---
# Get Exchange Schedule

>  Endpoint for getting the exchange schedule.

## OpenAPI

````yaml openapi.yaml get /exchange/schedule
paths:
  path: /exchange/schedule
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
              schedule:
                allOf:
                  - $ref: '#/components/schemas/Schedule'
            refIdentifier: '#/components/schemas/GetExchangeScheduleResponse'
            requiredProperties:
              - schedule
        examples:
          example:
            value:
              schedule:
                standard_hours:
                  - start_time: '2023-11-07T05:31:56Z'
                    end_time: '2023-11-07T05:31:56Z'
                    monday:
                      - open_time: <string>
                        close_time: <string>
                    tuesday:
                      - open_time: <string>
                        close_time: <string>
                    wednesday:
                      - open_time: <string>
                        close_time: <string>
                    thursday:
                      - open_time: <string>
                        close_time: <string>
                    friday:
                      - open_time: <string>
                        close_time: <string>
                    saturday:
                      - open_time: <string>
                        close_time: <string>
                    sunday:
                      - open_time: <string>
                        close_time: <string>
                maintenance_windows:
                  - start_datetime: '2023-11-07T05:31:56Z'
                    end_datetime: '2023-11-07T05:31:56Z'
        description: Exchange schedule retrieved successfully
    '500':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Internal server error
        examples: {}
        description: Internal server error
  deprecated: false
  type: path
components:
  schemas:
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

````