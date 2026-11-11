---
url: https://docs.kalshi.com/api-reference/markets/get-weather-point-market-availability
lastmod: 2026-11-10T17:30:39.525Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Weather Point Market Availability

> Returns which on-request weather markets can be created: whether
creation is on, the NOAA MRMS domains a location may lie in, and the
domains each offered variable may use. A variable missing from
`variables` can't be created. Existing markets are unaffected.

A location inside an offered domain can still be refused at creation
when it is over open water.




## OpenAPI

````yaml /openapi.yaml get /weather_point_markets/availability
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
  /weather_point_markets/availability:
    get:
      tags:
        - markets
      summary: Get Weather Point Market Availability
      description: |
        Returns which on-request weather markets can be created: whether
        creation is on, the NOAA MRMS domains a location may lie in, and the
        domains each offered variable may use. A variable missing from
        `variables` can't be created. Existing markets are unaffected.

        A location inside an offered domain can still be refused at creation
        when it is over open water.
      operationId: GetWeatherPointAvailability
      responses:
        '200':
          description: Availability retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetWeatherPointAvailabilityResponse'
        '429':
          $ref: '#/components/responses/RateLimitError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    GetWeatherPointAvailabilityResponse:
      type: object
      required:
        - enabled
        - domains
        - variables
      properties:
        enabled:
          type: boolean
          description: Whether weather point markets can be created at all.
        domains:
          type: array
          items:
            $ref: '#/components/schemas/WeatherPointDomain'
          description: The NOAA MRMS domains a location may lie in.
        variables:
          type: array
          items:
            $ref: '#/components/schemas/WeatherPointVariableAvailability'
          description: >-
            The variables on offer and where. A variable left out can't be
            created.
    WeatherPointDomain:
      type: object
      required:
        - name
        - north
        - south
        - west
        - east
      properties:
        name:
          type: string
          description: Domain name, such as `conus`.
        north:
          type: number
          format: double
          description: Northernmost grid cell center, in degrees latitude.
        south:
          type: number
          format: double
          description: Southernmost grid cell center, in degrees latitude.
        west:
          type: number
          format: double
          description: Westernmost grid cell center, in degrees longitude.
        east:
          type: number
          format: double
          description: Easternmost grid cell center, in degrees longitude.
    WeatherPointVariableAvailability:
      type: object
      required:
        - variable
        - domains
      properties:
        variable:
          $ref: '#/components/schemas/WeatherPointVariable'
        domains:
          type: array
          items:
            type: string
          description: Names of the domains new markets of this variable may be created in.
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
    WeatherPointVariable:
      type: string
      enum:
        - precip_hours
        - precip_total
        - max_temp
        - min_temp
      description: |
        What a weather point market measures over its window, and the unit
        and allowed range of its thresholds:
        - `precip_hours`: number of whole hours with at least 0.01 inch of
          precipitation. Whole hours, 0 to the length of the window.
        - `precip_total`: total precipitation. Hundredths of an inch, 0 to
          2000 (so 25 is 0.25 inch).
        - `max_temp`: highest temperature. Whole °F, -80 to 140.
        - `min_temp`: lowest temperature. Whole °F, -80 to 140.
  responses:
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