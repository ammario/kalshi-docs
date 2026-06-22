---
url: https://docs.kalshi.com/api-reference/events/get-event-fee-changes
lastmod: 2026-06-22T00:39:35.180Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Event Fee Changes

> Event fees are an override layered on top of the parent series' fee structure. If `fee_type_override` and `fee_multiplier_override` are null, that indicates the override is cleared.




## OpenAPI

````yaml /openapi.yaml get /events/fee_changes
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.21.0
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
  /events/fee_changes:
    get:
      tags:
        - events
      summary: Get Event Fee Changes
      description: >
        Event fees are an override layered on top of the parent series' fee
        structure. If `fee_type_override` and `fee_multiplier_override` are
        null, that indicates the override is cleared.
      operationId: GetEventFeeChanges
      parameters:
        - name: event_ticker
          in: query
          required: false
          schema:
            type: string
          x-go-type-skip-optional-pointer: true
        - $ref: '#/components/parameters/LimitQuery'
        - $ref: '#/components/parameters/CursorQuery'
      responses:
        '200':
          description: Event fee changes retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetEventFeeChangesResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  parameters:
    LimitQuery:
      name: limit
      in: query
      description: Number of results per page. Defaults to 100.
      schema:
        type: integer
        format: int64
        minimum: 1
        maximum: 1000
        default: 100
        x-oapi-codegen-extra-tags:
          validate: omitempty,min=1,max=1000
    CursorQuery:
      name: cursor
      in: query
      description: >-
        Pagination cursor. Use the cursor value returned from the previous
        response to get the next page of results. Leave empty for the first
        page.
      schema:
        type: string
        x-go-type-skip-optional-pointer: true
  schemas:
    GetEventFeeChangesResponse:
      type: object
      required:
        - event_fee_changes
        - cursor
      properties:
        event_fee_changes:
          type: array
          items:
            $ref: '#/components/schemas/EventFeeChange'
        cursor:
          type: string
          description: >-
            Pagination cursor for the next page. Empty if there are no more
            results.
    EventFeeChange:
      type: object
      required:
        - id
        - event_ticker
        - series_ticker
        - fee_type_override
        - fee_multiplier_override
        - scheduled_ts
      properties:
        id:
          type: string
          description: Unique identifier for this fee change
        event_ticker:
          type: string
          description: Event ticker this fee change applies to
        series_ticker:
          type: string
          description: Series ticker for the event
        fee_type_override:
          allOf:
            - $ref: '#/components/schemas/FeeType'
          nullable: true
          example: quadratic
          description: >-
            New fee type override for the event. When null, the event clears any
            prior override and falls back to the parent series' fee structure.
        fee_multiplier_override:
          type: number
          format: double
          nullable: true
          description: >-
            New fee multiplier override for the event. When null, the event
            clears any prior override and falls back to the parent series' fee
            multiplier.
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
    FeeType:
      type: string
      enum:
        - quadratic
        - quadratic_with_maker_fees
        - flat
      x-enum-varnames:
        - FeeTypeQuadratic
        - FeeTypeQuadraticWithMakerFees
        - FeeTypeFlat
      description: Fee type for a series or scheduled fee override.
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