---
url: https://docs.kalshi.com/api-reference/milestone/get-milestones
lastmod: 2026-01-05T21:22:19.604Z
---
# Get Milestones

> Minimum start date to filter milestones. Format: RFC3339 timestamp



## OpenAPI

````yaml openapi.yaml get /milestones
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.3.0
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
  /milestones:
    get:
      tags:
        - milestone
      summary: Get Milestones
      description: 'Minimum start date to filter milestones. Format: RFC3339 timestamp'
      operationId: GetMilestones
      parameters:
        - name: limit
          in: query
          description: Number of milestones to return per page
          required: true
          schema:
            type: integer
            minimum: 1
            maximum: 500
        - name: minimum_start_date
          in: query
          description: Minimum start date to filter milestones. Format RFC3339 timestamp
          required: false
          schema:
            type: string
            format: date-time
        - name: category
          in: query
          description: Filter by milestone category
          required: false
          schema:
            type: string
        - name: competition
          in: query
          description: Filter by competition
          required: false
          schema:
            type: string
        - name: source_id
          in: query
          description: Filter by source id
          required: false
          schema:
            type: string
        - name: type
          in: query
          description: Filter by milestone type
          required: false
          schema:
            type: string
        - name: related_event_ticker
          in: query
          description: Filter by related event ticker
          required: false
          schema:
            type: string
        - name: cursor
          in: query
          description: >-
            Pagination cursor. Use the cursor value returned from the previous
            response to get the next page of results
          required: false
          schema:
            type: string
      responses:
        '200':
          description: Milestones retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMilestonesResponse'
        '400':
          description: Bad Request
        '401':
          description: Unauthorized
        '500':
          description: Internal Server Error
components:
  schemas:
    GetMilestonesResponse:
      type: object
      required:
        - milestones
      properties:
        milestones:
          type: array
          items:
            $ref: '#/components/schemas/Milestone'
          description: List of milestones.
        cursor:
          type: string
          description: Cursor for pagination.
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
          description: Category of the milestone.
        type:
          type: string
          description: Type of the milestone.
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

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt