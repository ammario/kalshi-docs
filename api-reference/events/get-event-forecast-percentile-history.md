---
url: https://docs.kalshi.com/api-reference/events/get-event-forecast-percentile-history
lastmod: 2025-11-19T00:52:48.656Z
---
# Get Event Forecast Percentile History

> Endpoint for getting the historical raw and formatted forecast numbers for an event at specific percentiles.

## OpenAPI

````yaml openapi.yaml get /series/{series_ticker}/events/{ticker}/forecast_percentile_history
paths:
  path: /series/{series_ticker}/events/{ticker}/forecast_percentile_history
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security:
      - title: kalshiAccessKey & kalshiAccessSignature & kalshiAccessTimestamp
        parameters:
          query: {}
          header:
            KALSHI-ACCESS-KEY:
              type: apiKey
              description: Your API key ID
            KALSHI-ACCESS-SIGNATURE:
              type: apiKey
              description: RSA-PSS signature of the request
            KALSHI-ACCESS-TIMESTAMP:
              type: apiKey
              description: Request timestamp in milliseconds
          cookie: {}
    parameters:
      path:
        ticker:
          schema:
            - type: string
              required: true
              description: The event ticker
        series_ticker:
          schema:
            - type: string
              required: true
              description: The series ticker
      query:
        percentiles:
          schema:
            - type: array
              items:
                allOf:
                  - type: integer
                    format: int32
                    minimum: 0
                    maximum: 10000
              required: true
              description: Array of percentile values to retrieve (0-10000, max 10 values)
              maxItems: 10
          style: form
          explode: true
        start_ts:
          schema:
            - type: integer
              required: true
              description: Start timestamp for the range
        end_ts:
          schema:
            - type: integer
              required: true
              description: End timestamp for the range
        period_interval:
          schema:
            - type: enum<integer>
              enum:
                - 0
                - 1
                - 60
                - 1440
              required: true
              description: >-
                Specifies the length of each forecast period, in minutes. 0 for
                5-second intervals, or 1, 60, or 1440 for minute-based
                intervals.
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              forecast_history:
                allOf:
                  - type: array
                    description: Array of forecast percentile data points over time.
                    items:
                      $ref: '#/components/schemas/ForecastPercentilesPoint'
            refIdentifier: '#/components/schemas/GetEventForecastPercentilesHistoryResponse'
            requiredProperties:
              - forecast_history
        examples:
          example:
            value:
              forecast_history:
                - event_ticker: <string>
                  end_period_ts: 123
                  period_interval: 123
                  percentile_points:
                    - percentile: 123
                      raw_numerical_forecast: 123
                      numerical_forecast: 123
                      formatted_forecast: <string>
        description: Event forecast percentile history retrieved successfully
    '400':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Bad request
        examples: {}
        description: Bad request
    '401':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Unauthorized
        examples: {}
        description: Unauthorized
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

````