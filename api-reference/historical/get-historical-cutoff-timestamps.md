---
url: https://docs.kalshi.com/api-reference/historical/get-historical-cutoff-timestamps
lastmod: 2026-02-17T01:07:44.603Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Historical Cutoff Timestamps

> Returns the cutoff timestamps that define the boundary between **live** and **historical** data.

## Cutoff fields
- `market_settled_ts` : Markets that **settled** before this timestamp, and their candlesticks, must be accessed via `GET /historical/markets` and `GET /historical/markets/{ticker}/candlesticks`.
- `trades_created_ts` : Trades that were **filled** before this timestamp must be accessed via `GET /historical/fills`.
- `orders_updated_ts` : Orders that were **canceled or fully executed** before this timestamp must be accessed via `GET /historical/orders`. Resting (active) orders are always available in `GET /portfolio/orders`.




## OpenAPI

````yaml openapi.yaml get /historical/cutoff
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
  /historical/cutoff:
    get:
      tags:
        - historical
      summary: Get Historical Cutoff Timestamps
      description: >
        Returns the cutoff timestamps that define the boundary between **live**
        and **historical** data.


        ## Cutoff fields

        - `market_settled_ts` : Markets that **settled** before this timestamp,
        and their candlesticks, must be accessed via `GET /historical/markets`
        and `GET /historical/markets/{ticker}/candlesticks`.

        - `trades_created_ts` : Trades that were **filled** before this
        timestamp must be accessed via `GET /historical/fills`.

        - `orders_updated_ts` : Orders that were **canceled or fully executed**
        before this timestamp must be accessed via `GET /historical/orders`.
        Resting (active) orders are always available in `GET /portfolio/orders`.
      operationId: GetHistoricalCutoff
      responses:
        '200':
          description: Historical cutoff timestamps retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetHistoricalCutoffResponse'
        '500':
          description: Internal server error
components:
  schemas:
    GetHistoricalCutoffResponse:
      type: object
      required:
        - market_settled_ts
        - trades_created_ts
        - orders_updated_ts
      properties:
        market_settled_ts:
          type: string
          format: date-time
          description: >
            Cutoff based on **market settlement time**. Markets and their
            candlesticks that settled before this timestamp must be accessed via
            `GET /historical/markets` and `GET
            /historical/markets/{ticker}/candlesticks`.
        trades_created_ts:
          type: string
          format: date-time
          description: >
            Cutoff based on **trade fill time**. Fills that occurred before this
            timestamp must be accessed via `GET /historical/fills`.
        orders_updated_ts:
          type: string
          format: date-time
          description: >
            Cutoff based on **order cancellation or execution time**. Orders
            canceled or fully executed before this timestamp must be accessed
            via `GET /historical/orders`. Resting (active) orders are always
            available in `GET /portfolio/orders`.

````