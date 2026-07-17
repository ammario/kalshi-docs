---
url: https://docs.kalshi.com/api-reference/account/get-account-api-usage-level-volume-progress
lastmod: 2026-07-16T22:25:52.815Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Account API Usage Level Volume Progress

> Returns the authenticated user's latest cron-computed trading volume progress toward volume-based API usage tiers for the predictions (event_contract) lane. Volume figures are reported as fixed-point contract counts.



## OpenAPI

````yaml /openapi.yaml get /account/api_usage_level/volume_progress
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.25.0
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
  /account/api_usage_level/volume_progress:
    get:
      tags:
        - account
      summary: Get Account API Usage Level Volume Progress
      description: >-
        Returns the authenticated user's latest cron-computed trading volume
        progress toward volume-based API usage tiers for the predictions
        (event_contract) lane. Volume figures are reported as fixed-point
        contract counts.
      operationId: GetAccountApiUsageLevelVolumeProgress
      responses:
        '200':
          description: Account API usage level volume progress retrieved successfully
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/GetAccountApiUsageLevelVolumeProgressResponse
        '401':
          description: Unauthorized
        '500':
          description: Internal server error
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    GetAccountApiUsageLevelVolumeProgressResponse:
      type: object
      required:
        - volume_progress
      properties:
        volume_progress:
          type: array
          description: >-
            Latest cron-computed trading volume progress toward volume-based API
            usage tiers for the predictions (event_contract) lane. Volume-based
            public tiers are Expert, Premier, Paragon, Prime, and Prestige.
          items:
            $ref: '#/components/schemas/AccountApiUsageLevelVolumeProgress'
    AccountApiUsageLevelVolumeProgress:
      type: object
      required:
        - computed_ts
        - trailing_30d_volume_fp
        - goals
      properties:
        computed_ts:
          type: integer
          format: int64
          description: >-
            Unix timestamp (seconds) when this progress was computed;
            trailing_30d_volume_fp covers the trailing 30 days ending at this
            time.
        trailing_30d_volume_fp:
          $ref: '#/components/schemas/FixedPointCount'
        goals:
          type: array
          items:
            $ref: '#/components/schemas/AccountApiUsageLevelVolumeGoal'
    FixedPointCount:
      type: string
      description: >-
        Fixed-point contract count string (2 decimals, e.g., "10.00"; referred
        to as "fp" in field names). Requests accept 0-2 decimal places (e.g.,
        "10", "10.0", "10.00"); responses always emit 2 decimals. Fractional
        contract values (e.g., "2.50") are supported; the minimum granularity is
        0.01 contracts.
      example: '10.00'
    AccountApiUsageLevelVolumeGoal:
      type: object
      required:
        - level
        - earn_volume_goal_fp
        - keep_volume_goal_fp
      properties:
        level:
          type: string
          description: API usage level for this Predictions volume goal.
          example: expert
        earn_volume_goal_fp:
          $ref: '#/components/schemas/FixedPointCount'
        keep_volume_goal_fp:
          $ref: '#/components/schemas/FixedPointCount'
  securitySchemes:
    kalshiAccessKey:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-KEY
      description: Your API key ID
    kalshiAccessSignature:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-SIGNATURE
      description: RSA-PSS signature of the request
    kalshiAccessTimestamp:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-TIMESTAMP
      description: Request timestamp in milliseconds

````