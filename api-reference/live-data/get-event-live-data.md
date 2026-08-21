---
url: https://docs.kalshi.com/api-reference/live-data/get-event-live-data
lastmod: 2026-08-20T21:09:48.950Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Event Live Data

> Get live data for an event by its event ticker. Serves event-keyed live data such as crypto price charts, commodity price timeseries, and weather observations. The `type` field in the response names the schema of the `details` object.



## OpenAPI

````yaml /openapi.yaml get /live_data/events/{event_ticker}
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.28.0
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
  /live_data/events/{event_ticker}:
    get:
      tags:
        - live-data
      summary: Get Event Live Data
      description: >-
        Get live data for an event by its event ticker. Serves event-keyed live
        data such as crypto price charts, commodity price timeseries, and
        weather observations. The `type` field in the response names the schema
        of the `details` object.
      operationId: GetEventLiveData
      parameters:
        - name: event_ticker
          in: path
          required: true
          description: Event ticker
          schema:
            type: string
        - name: range
          in: query
          required: false
          description: >-
            Optional chart range hint (e.g. `15min`, `1h`, `1d`). When the
            underlying live data type supports it, restricts the returned
            timeseries to the requested window.
          schema:
            type: string
      responses:
        '200':
          description: Live data retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetEventLiveDataResponse'
        '404':
          description: Live data not found
        '500':
          description: Internal server error
components:
  schemas:
    GetEventLiveDataResponse:
      type: object
      required:
        - live_data
      properties:
        live_data:
          $ref: '#/components/schemas/EventLiveData'
    EventLiveData:
      type: object
      required:
        - type
        - details
      properties:
        type:
          type: string
          description: Type of live data. Names the schema of the details object.
        details:
          type: object
          additionalProperties: true
          description: >-
            Live data details as a flexible object whose shape depends on the
            type.
        is_historical:
          type: boolean
          description: >-
            Present for crypto live data. True when the event has matured and
            the payload is a frozen historical snapshot.
        default_range:
          type: string
          description: >-
            Chart range the client should default to (e.g. `15min`, `1h`).
            Omitted when unset.
        range_options:
          type: array
          items:
            type: string
          description: Chart range menu options. Omitted when unset.

````