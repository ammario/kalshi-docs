---
url: https://docs.kalshi.com/api-reference/milestone/get-milestone
lastmod: 2026-05-13T00:07:12.630Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Milestone

>  Endpoint for getting data about a specific milestone by its ID.



## OpenAPI

````yaml /openapi.yaml get /milestones/{milestone_id}
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.18.0
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
  /milestones/{milestone_id}:
    get:
      tags:
        - milestone
      summary: Get Milestone
      description: ' Endpoint for getting data about a specific milestone by its ID.'
      operationId: GetMilestone
      parameters:
        - name: milestone_id
          in: path
          required: true
          description: Milestone ID
          schema:
            type: string
      responses:
        '200':
          description: Milestone retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMilestoneResponse'
        '400':
          description: Bad Request
        '401':
          description: Unauthorized
        '404':
          description: Not Found
        '500':
          description: Internal Server Error
components:
  schemas:
    GetMilestoneResponse:
      type: object
      required:
        - milestone
      properties:
        milestone:
          $ref: '#/components/schemas/Milestone'
          description: The milestone data.
    Milestone:
      type: object
      required:
        - id
        - category
        - type
        - start_date
        - related_event_tickers
        - title
        - notification_message
        - details
        - primary_event_tickers
        - last_updated_ts
      properties:
        id:
          type: string
          description: Unique identifier for the milestone.
        category:
          type: string
          description: Category of the milestone. E.g. Sports, Elections, Esports, Crypto.
          example: Sports
        type:
          type: string
          description: >-
            Type of the milestone. E.g. football_game, basketball_game,
            soccer_tournament_multi_leg, baseball_game, hockey_match,
            golf_tournament, political_race.
          example: football_game
        start_date:
          type: string
          format: date-time
          description: Start date of the milestone.
        end_date:
          type: string
          format: date-time
          nullable: true
          description: End date of the milestone, if any.
        related_event_tickers:
          type: array
          items:
            type: string
          description: List of event tickers related to this milestone.
        title:
          type: string
          description: Title of the milestone.
        notification_message:
          type: string
          description: Notification message for the milestone.
        source_id:
          type: string
          nullable: true
          description: Source id of milestone if available.
        source_ids:
          type: object
          additionalProperties:
            type: string
          description: Source ids of milestone if available.
        details:
          type: object
          additionalProperties: true
          description: Additional details about the milestone.
        primary_event_tickers:
          type: array
          items:
            type: string
          description: >-
            List of event tickers directly related to the outcome of this
            milestone.
        last_updated_ts:
          type: string
          format: date-time
          description: Last time this structured target was updated.

````