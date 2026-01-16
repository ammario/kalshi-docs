---
url: https://docs.kalshi.com/api-reference/live-data/get-multiple-live-data
lastmod: 2026-01-15T23:38:47.030Z
---
# Get Multiple Live Data

> Get live data for multiple milestones



## OpenAPI

````yaml openapi.yaml get /live_data/batch
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.5.0
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
  /live_data/batch:
    get:
      tags:
        - live-data
      summary: Get Multiple Live Data
      description: Get live data for multiple milestones
      operationId: GetLiveDatas
      parameters:
        - name: milestone_ids
          in: query
          required: true
          description: Array of milestone IDs
          schema:
            type: array
            items:
              type: string
            maxItems: 100
          style: form
          explode: true
      responses:
        '200':
          description: Live data retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetLiveDatasResponse'
        '500':
          description: Internal server error
components:
  schemas:
    GetLiveDatasResponse:
      type: object
      required:
        - live_datas
      properties:
        live_datas:
          type: array
          items:
            $ref: '#/components/schemas/LiveData'
    LiveData:
      type: object
      required:
        - type
        - details
        - milestone_id
      properties:
        type:
          type: string
          description: Type of live data
        details:
          type: object
          additionalProperties: true
          description: Live data details as a flexible object
        milestone_id:
          type: string
          description: Milestone ID

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt