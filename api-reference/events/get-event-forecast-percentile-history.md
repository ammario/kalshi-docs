---
url: https://docs.kalshi.com/api-reference/events/get-event-forecast-percentile-history
lastmod: 2026-02-11T23:56:06.340Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Event Forecast Percentile History

> Endpoint for getting the historical raw and formatted forecast numbers for an event at specific percentiles.



## OpenAPI

````yaml openapi.yaml get /series/{series_ticker}/events/{ticker}/forecast_percentile_history
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
  /series/{series_ticker}/events/{ticker}/forecast_percentile_history:
    get:
      tags:
        - events
      summary: Get Event Forecast Percentile History
      description: >-
        Endpoint for getting the historical raw and formatted forecast numbers
        for an event at specific percentiles.
      operationId: GetEventForecastPercentilesHistory
      parameters:
        - name: ticker
          in: path
          required: true
          description: The event ticker
          schema:
            type: string
        - name: series_ticker
          in: path
          required: true
          description: The series ticker
          schema:
            type: string
        - name: percentiles
          in: query
          required: true
          description: Array of percentile values to retrieve (0-10000, max 10 values)
          schema:
            type: array
            items:
              type: integer
              format: int32
              minimum: 0
              maximum: 10000
            maxItems: 10
          style: form
          explode: true
        - name: start_ts
          in: query
          required: true
          description: Start timestamp for the range
          schema:
            type: integer
            format: int64
        - name: end_ts
          in: query
          required: true
          description: End timestamp for the range
          schema:
            type: integer
            format: int64
        - name: period_interval
          in: query
          required: true
          description: >-
            Specifies the length of each forecast period, in minutes. 0 for
            5-second intervals, or 1, 60, or 1440 for minute-based intervals.
          schema:
            type: integer
            format: int32
            enum:
              - 0
              - 1
              - 60
              - 1440
      responses:
        '200':
          description: Event forecast percentile history retrieved successfully
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/GetEventForecastPercentilesHistoryResponse
        '400':
          description: Bad request
        '401':
          description: Unauthorized
        '500':
          description: Internal server error
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    GetEventForecastPercentilesHistoryResponse:
      type: object
      required:
        - forecast_history
      properties:
        forecast_history:
          type: array
          description: Array of forecast percentile data points over time.
          items:
            $ref: '#/components/schemas/ForecastPercentilesPoint'
    ForecastPercentilesPoint:
      type: object
      required:
        - event_ticker
        - end_period_ts
        - period_interval
        - percentile_points
      properties:
        event_ticker:
          type: string
          description: The event ticker this forecast is for.
        end_period_ts:
          type: integer
          format: int64
          description: Unix timestamp for the inclusive end of the forecast period.
        period_interval:
          type: integer
          format: int32
          description: Length of the forecast period in minutes.
        percentile_points:
          type: array
          description: Array of forecast values at different percentiles.
          items:
            $ref: '#/components/schemas/PercentilePoint'
    PercentilePoint:
      type: object
      required:
        - percentile
        - raw_numerical_forecast
        - numerical_forecast
        - formatted_forecast
      properties:
        percentile:
          type: integer
          format: int32
          description: The percentile value (0-10000).
        raw_numerical_forecast:
          type: number
          description: The raw numerical forecast value.
        numerical_forecast:
          type: number
          description: The processed numerical forecast value.
        formatted_forecast:
          type: string
          description: The human-readable formatted forecast value.
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