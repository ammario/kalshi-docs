---
url: https://docs.kalshi.com/api-reference/structured-targets/get-structured-targets
lastmod: 2026-02-12T20:57:11.875Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Structured Targets

> Page size (min: 1, max: 2000)



## OpenAPI

````yaml openapi.yaml get /structured_targets
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
  /structured_targets:
    get:
      tags:
        - structured-targets
      summary: Get Structured Targets
      description: 'Page size (min: 1, max: 2000)'
      operationId: GetStructuredTargets
      parameters:
        - name: type
          in: query
          description: Filter by structured target type
          required: false
          schema:
            type: string
        - name: competition
          in: query
          description: Filter by competition
          required: false
          schema:
            type: string
        - name: page_size
          in: query
          description: Number of items per page (min 1, max 2000, default 100)
          required: false
          schema:
            type: integer
            format: int32
            minimum: 1
            maximum: 2000
            default: 100
        - name: cursor
          in: query
          description: Pagination cursor
          required: false
          schema:
            type: string
      responses:
        '200':
          description: Structured targets retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetStructuredTargetsResponse'
        '401':
          description: Unauthorized
        '500':
          description: Internal server error
components:
  schemas:
    GetStructuredTargetsResponse:
      type: object
      properties:
        structured_targets:
          type: array
          items:
            $ref: '#/components/schemas/StructuredTarget'
        cursor:
          type: string
          description: >-
            Pagination cursor for the next page. Empty if there are no more
            results.
    StructuredTarget:
      type: object
      properties:
        id:
          type: string
          description: Unique identifier for the structured target.
        name:
          type: string
          description: Name of the structured target.
        type:
          type: string
          description: Type of the structured target.
        details:
          type: object
          description: >-
            Additional details about the structured target. Contains flexible
            JSON data specific to the target type.
        source_id:
          type: string
          description: >-
            External source identifier for the structured target, if available
            (e.g., third-party data provider ID).
        last_updated_ts:
          type: string
          format: date-time
          description: Timestamp when this structured target was last updated.

````