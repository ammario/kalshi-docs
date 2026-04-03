---
url: https://docs.kalshi.com/api-reference/live-data/get-game-stats
lastmod: 2026-04-02T21:00:01.232Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Game Stats

> Get play-by-play game statistics for a specific milestone. Supported sports: Pro Football, College Football, Pro Basketball, College Men's Basketball, College Women's Basketball, WNBA, Soccer, Pro Hockey, and Pro Baseball. Returns null for unsupported milestone types or milestones without a Sportradar ID.



## OpenAPI

````yaml /openapi.yaml get /live_data/milestone/{milestone_id}/game_stats
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.12.0
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
  /live_data/milestone/{milestone_id}/game_stats:
    get:
      tags:
        - live-data
      summary: Get Game Stats
      description: >-
        Get play-by-play game statistics for a specific milestone. Supported
        sports: Pro Football, College Football, Pro Basketball, College Men's
        Basketball, College Women's Basketball, WNBA, Soccer, Pro Hockey, and
        Pro Baseball. Returns null for unsupported milestone types or milestones
        without a Sportradar ID.
      operationId: GetGameStats
      parameters:
        - name: milestone_id
          in: path
          required: true
          description: Milestone ID
          schema:
            type: string
      responses:
        '200':
          description: Game stats retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetGameStatsResponse'
        '404':
          description: Game stats not found
        '500':
          description: Internal server error
components:
  schemas:
    GetGameStatsResponse:
      type: object
      properties:
        pbp:
          $ref: '#/components/schemas/PlayByPlay'
    PlayByPlay:
      type: object
      description: Play-by-play data organized by period.
      properties:
        periods:
          type: array
          items:
            type: object
            properties:
              events:
                type: array
                items:
                  type: object
                  additionalProperties: true

````

Built with [Mintlify](https://mintlify.com).