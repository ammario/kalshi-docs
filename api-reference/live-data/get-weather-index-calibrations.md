---
url: https://docs.kalshi.com/api-reference/live-data/get-weather-index-calibrations
lastmod: 2026-09-01T13:58:53.964Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Weather Index Calibrations

> Get a city's published weather-index configuration timeline: the launch configuration plus every weekly offset calibration and methodology update, ascending by effective time. Each record carries the station weights, station offsets (Celsius), and the city reference used to compute index values from the record's effective time until the next record — everything needed to reproduce published index values for minutes computed under that configuration version. Offsets are re-estimated weekly after each complete UTC week; weights never change through calibration. The timeline is append-only and complete: it is never trimmed.



## OpenAPI

````yaml /openapi.yaml get /live_data/weather/{city}/calibrations
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.29.0
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
  /live_data/weather/{city}/calibrations:
    get:
      tags:
        - live-data
      summary: Get Weather Index Calibrations
      description: >-
        Get a city's published weather-index configuration timeline: the launch
        configuration plus every weekly offset calibration and methodology
        update, ascending by effective time. Each record carries the station
        weights, station offsets (Celsius), and the city reference used to
        compute index values from the record's effective time until the next
        record — everything needed to reproduce published index values for
        minutes computed under that configuration version. Offsets are
        re-estimated weekly after each complete UTC week; weights never change
        through calibration. The timeline is append-only and complete: it is
        never trimmed.
      operationId: GetWeatherIndexCalibrations
      parameters:
        - name: city
          in: path
          required: true
          description: Index city ID (e.g. `miami`)
          schema:
            type: string
      responses:
        '200':
          description: Calibration timeline retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetWeatherIndexCalibrationsResponse'
        '400':
          description: Unknown city
        '500':
          description: Internal server error
components:
  schemas:
    GetWeatherIndexCalibrationsResponse:
      type: object
      required:
        - city
        - units
        - calibrations
      properties:
        city:
          type: string
          description: Index city ID.
        units:
          type: string
          description: >-
            Always `celsius` — offsets and the city reference are Celsius
            quantities from the index methodology (the published index value
            itself is Fahrenheit).
        calibrations:
          type: array
          description: Configuration records, ascending by effective time.
          items:
            $ref: '#/components/schemas/WeatherIndexCalibration'
    WeatherIndexCalibration:
      type: object
      required:
        - config_version
        - effective_at_ms
        - city_reference_c
        - stations
      properties:
        config_version:
          type: string
          description: >-
            Configuration version (e.g. `miami-temperature-v1.0-cal-20260831`).
            Index points report the version they were computed under in their
            `config_version` field.
        published_at_ms:
          type: integer
          format: int64
          description: When the record was published, unix milliseconds UTC.
        effective_at_ms:
          type: integer
          format: int64
          description: >-
            The record governs event minutes at or after this time (unix
            milliseconds UTC), until superseded by the next record.
        change_reason:
          type: string
          description: Why the configuration changed.
        calibration_window_start_ms:
          type: integer
          format: int64
          description: >-
            Start of the trailing observation window the offsets were estimated
            from. Absent on records not derived from a calibration window (the
            launch configuration).
        calibration_window_end_ms:
          type: integer
          format: int64
          description: End of the calibration window (exclusive).
        city_reference_c:
          type: number
          format: double
          description: >-
            City reference B_c in Celsius: the weight-dot-offset sum over all
            configured member stations.
        stations:
          type: array
          description: Configured member stations, in configuration order.
          items:
            $ref: '#/components/schemas/WeatherIndexCalibrationStation'
    WeatherIndexCalibrationStation:
      type: object
      required:
        - station_id
        - weight
        - offset_c
      properties:
        station_id:
          type: string
          description: Member station ID (e.g. `KMIA1M`).
        weight:
          type: number
          format: double
          description: Base weight (weights sum to 1.0 across members).
        offset_c:
          type: number
          format: double
          description: >-
            Station offset in Celsius (positive = station normally runs warmer
            than its peers).
        update_note:
          type: string
          description: >-
            Weekly-calibration disposition, present only on weekly calibration
            records: `updated ...` with the residual count, target, and applied
            adjustment, or `insufficient ...` when the prior offset was
            retained.

````