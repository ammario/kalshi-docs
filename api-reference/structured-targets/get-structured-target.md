---
url: https://docs.kalshi.com/api-reference/structured-targets/get-structured-target
lastmod: 2026-01-22T00:35:02.069Z
---
# Get Structured Target

>  Endpoint for getting data about a specific structured target by its ID.



## OpenAPI

````yaml openapi.yaml get /structured_targets/{structured_target_id}
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
  /structured_targets/{structured_target_id}:
    get:
      tags:
        - structured-targets
      summary: Get Structured Target
      description: ' Endpoint for getting data about a specific structured target by its ID.'
      operationId: GetStructuredTarget
      parameters:
        - name: structured_target_id
          in: path
          required: true
          description: Structured target ID
          schema:
            type: string
      responses:
        '200':
          description: Structured target retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetStructuredTargetResponse'
        '401':
          description: Unauthorized
        '404':
          description: Not found
        '500':
          description: Internal server error
components:
  schemas:
    GetStructuredTargetResponse:
      type: object
      properties:
        structured_target:
          $ref: '#/components/schemas/StructuredTarget'
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

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt