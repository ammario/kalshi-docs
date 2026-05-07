---
url: https://docs.kalshi.com/api-reference/live-data/get-live-data-with-type
lastmod: 2026-05-07T01:24:56.700Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Live Data (with type)

> Get live data for a specific milestone. This is the legacy endpoint that requires a type path parameter. Prefer using `/live_data/milestone/{milestone_id}` instead.



## OpenAPI

````yaml /openapi.yaml get /live_data/{type}/milestone/{milestone_id}
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.16.0
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
  /live_data/{type}/milestone/{milestone_id}:
    get:
      tags:
        - live-data
      summary: Get Live Data (with type)
      description: >-
        Get live data for a specific milestone. This is the legacy endpoint that
        requires a type path parameter. Prefer using
        `/live_data/milestone/{milestone_id}` instead.
      operationId: GetLiveData
      parameters:
        - name: type
          in: path
          required: true
          description: Type of live data
          schema:
            type: string
        - name: milestone_id
          in: path
          required: true
          description: Milestone ID
          schema:
            type: string
        - name: include_player_stats
          in: query
          required: false
          description: >-
            When true, includes player-level statistics in the live data
            response. Supported for Pro Football, Pro Basketball, and College
            Men's Basketball milestones that have player ID mappings configured.
            Has no effect for other sports or milestones without player
            mappings.
          schema:
            type: boolean
            default: false
      responses:
        '200':
          description: Live data retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetLiveDataResponse'
        '404':
          description: Live data not found
        '500':
          description: Internal server error
components:
  schemas:
    GetLiveDataResponse:
      type: object
      required:
        - live_data
      properties:
        live_data:
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