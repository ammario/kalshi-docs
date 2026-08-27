---
url: https://docs.kalshi.com/api-reference/live-data/get-weather-index
lastmod: 2026-08-27T00:02:21.711Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Weather Index

> Get the Kalshi-computed city temperature index: the canonical minute-resolution series behind hourly temperature markets. City-keyed and independent of any event — the series exists whenever the city's index is configured. Values are Fahrenheit rounded to 0.01. Minutes where the index quorum failed carry no value and are never returned as points, so gaps in the series are real gaps. With `detailed=true` each point additionally carries every member station's reported reading and quality-control disposition — the pre-incorporation breakdown.



## OpenAPI

````yaml /openapi.yaml get /live_data/weather/{city}
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
  /live_data/weather/{city}:
    get:
      tags:
        - live-data
      summary: Get Weather Index
      description: >-
        Get the Kalshi-computed city temperature index: the canonical
        minute-resolution series behind hourly temperature markets. City-keyed
        and independent of any event — the series exists whenever the city's
        index is configured. Values are Fahrenheit rounded to 0.01. Minutes
        where the index quorum failed carry no value and are never returned as
        points, so gaps in the series are real gaps. With `detailed=true` each
        point additionally carries every member station's reported reading and
        quality-control disposition — the pre-incorporation breakdown.
      operationId: GetWeatherIndex
      parameters:
        - name: city
          in: path
          required: true
          description: Index city ID (e.g. `miami`)
          schema:
            type: string
        - name: from
          in: query
          required: false
          description: >-
            Window start, unix milliseconds (inclusive). Defaults to `to` minus
            24 hours. Must be paired with `to` unless `last_sec` is used.
          schema:
            type: integer
            format: int64
        - name: to
          in: query
          required: false
          description: Window end, unix milliseconds (inclusive). Defaults to now.
          schema:
            type: integer
            format: int64
        - name: last_sec
          in: query
          required: false
          description: >-
            Trailing window in seconds; equivalent to `from=now-last_sec`,
            `to=now`. Mutually exclusive with `from`/`to`.
          schema:
            type: integer
            format: int64
        - name: detailed
          in: query
          required: false
          description: Include per-station audit readings on every point.
          schema:
            type: boolean
      responses:
        '200':
          description: Weather index retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetWeatherIndexResponse'
        '400':
          description: Unknown city or invalid window parameters
        '500':
          description: Internal server error
components:
  schemas:
    GetWeatherIndexResponse:
      type: object
      required:
        - city
        - units
        - timeseries
      properties:
        city:
          type: string
          description: Index city ID.
        config_version:
          type: string
          description: >-
            Index configuration version of the newest returned point (e.g.
            `miami-temperature-v1.0`). Empty when no points matched the window.
        units:
          type: string
          description: Always `fahrenheit`.
        timeseries:
          type: array
          items:
            $ref: '#/components/schemas/WeatherIndexPoint'
    WeatherIndexPoint:
      type: object
      required:
        - t
        - status
      properties:
        t:
          type: integer
          format: int64
          description: Event minute, unix milliseconds UTC.
        v:
          type: number
          format: double
          description: >-
            Published index value, Fahrenheit rounded to 0.01. Absent on
            `incomplete` points, which have no canonical value yet.
        status:
          type: string
          description: >-
            `normal` (every member contributed its exact-minute primary
            observation) or `degraded` (a member was absent, fallback-fed, or
            substituted by quality control; the value is equally
            settlement-eligible). With `detailed=true`, trailing minutes still
            inside their receipt deadline are additionally served as
            `incomplete`: no value, and stations carrying the raw readings
            recorded so far (code `pending`, not yet quality-controlled — more
            readings may still arrive, and the canonical value may differ).
        contributors:
          type: integer
          description: >-
            Number of accepted member stations backing the point. Absent on
            `incomplete` points.
        stations:
          type: array
          description: >-
            Per-station audit readings (only with `detailed=true`), sorted by
            station ID — every configured member's reported value and QC
            disposition before incorporation into the index.
          items:
            $ref: '#/components/schemas/WeatherIndexStationReading'
    WeatherIndexStationReading:
      type: object
      required:
        - station_id
        - code
      properties:
        station_id:
          type: string
          description: Member station (e.g. `KMIA1M`) or its official fallback ID.
        code:
          type: string
          description: >-
            Disposition: `ok` (accepted), `missing` (no eligible observation),
            `late` (received after the deadline; diagnostic only), a QC
            rejection (`range`, `rate_spatial`, `extreme`), or `pending` (raw
            reading on an `incomplete` minute, not yet quality-controlled).
        source:
          type: string
          description: >-
            `hf_asos` (exact-minute primary) or `metar` (carried-forward
            official observation). Absent when no reading was available.
        temp_f:
          type: number
          format: double
          description: >-
            Raw reported temperature in Fahrenheit (unrounded — only the
            published index value carries output rounding). Absent for `missing`
            members.
        obs_time_ms:
          type: integer
          format: int64
          description: >-
            Observation time for carried-forward fallbacks (differs from the
            event minute). Absent for exact-minute primaries.
        received_at_ms:
          type: integer
          format: int64
          description: Local wire-receipt time backing the eligibility deadline.
        primary_code:
          type: string
          description: >-
            Why the primary observation was passed over when a fallback was
            selected instead.

````