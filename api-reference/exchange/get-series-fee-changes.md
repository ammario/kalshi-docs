---
url: https://docs.kalshi.com/api-reference/exchange/get-series-fee-changes
lastmod: 2026-02-04T22:59:32.050Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Series Fee Changes



## OpenAPI

````yaml openapi.yaml get /series/fee_changes
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.6.0
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
  /series/fee_changes:
    get:
      tags:
        - exchange
      summary: Get Series Fee Changes
      operationId: GetSeriesFeeChanges
      parameters:
        - name: series_ticker
          in: query
          required: false
          schema:
            type: string
          x-go-type-skip-optional-pointer: true
        - name: show_historical
          in: query
          required: false
          schema:
            type: boolean
            default: false
          x-go-type-skip-optional-pointer: true
      responses:
        '200':
          description: Series fee changes retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetSeriesFeeChangesResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    GetSeriesFeeChangesResponse:
      type: object
      required:
        - series_fee_change_arr
      properties:
        series_fee_change_arr:
          type: array
          items:
            $ref: '#/components/schemas/SeriesFeeChange'
    SeriesFeeChange:
      type: object
      required:
        - id
        - series_ticker
        - fee_type
        - fee_multiplier
        - scheduled_ts
      properties:
        id:
          type: string
          description: Unique identifier for this fee change
        series_ticker:
          type: string
          description: Series ticker this fee change applies to
        fee_type:
          type: string
          enum:
            - quadratic
            - quadratic_with_maker_fees
            - flat
          description: New fee type for the series
        fee_multiplier:
          type: number
          format: double
          description: New fee multiplier for the series
        scheduled_ts:
          type: string
          format: date-time
          description: Timestamp when this fee change is scheduled to take effect
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
        service:
          type: string
          description: The name of the service that generated the error
  responses:
    BadRequestError:
      description: Bad request - invalid input
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