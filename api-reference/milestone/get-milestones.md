---
url: https://docs.kalshi.com/api-reference/milestone/get-milestones
lastmod: 2025-11-03T03:42:06.876Z
---
# Get Milestones

> Minimum start date to filter milestones. Format: RFC3339 timestamp

## OpenAPI

````yaml openapi.yaml get /milestones
paths:
  path: /milestones
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security: []
    parameters:
      path: {}
      query:
        minimum_start_date:
          schema:
            - type: string
              required: false
              description: >-
                Minimum start date to filter milestones. Format RFC3339
                timestamp
              format: date-time
        category:
          schema:
            - type: string
              required: false
              description: Filter by milestone category
        competition:
          schema:
            - type: string
              required: false
              description: Filter by competition
        source_id:
          schema:
            - type: string
              required: false
              description: Filter by source id
        type:
          schema:
            - type: string
              required: false
              description: Filter by milestone type
        related_event_ticker:
          schema:
            - type: string
              required: false
              description: Filter by related event ticker
        limit:
          schema:
            - type: integer
              required: true
              description: Number of milestones to return per page
              maximum: 500
              minimum: 1
        cursor:
          schema:
            - type: string
              required: false
              description: >-
                Pagination cursor. Use the cursor value returned from the
                previous response to get the next page of results
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              milestones:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/Milestone'
                    description: List of milestones.
              cursor:
                allOf:
                  - type: string
                    description: Cursor for pagination.
            refIdentifier: '#/components/schemas/GetMilestonesResponse'
            requiredProperties:
              - milestones
        examples:
          example:
            value:
              milestones:
                - id: <string>
                  category: <string>
                  type: <string>
                  start_date: '2023-11-07T05:31:56Z'
                  end_date: '2023-11-07T05:31:56Z'
                  related_event_tickers:
                    - <string>
                  title: <string>
                  notification_message: <string>
                  source_id: <string>
                  details: {}
                  primary_event_tickers:
                    - <string>
                  last_updated_ts: '2023-11-07T05:31:56Z'
              cursor: <string>
        description: Milestones retrieved successfully
    '400':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Bad Request
        examples: {}
        description: Bad Request
    '401':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Unauthorized
        examples: {}
        description: Unauthorized
    '500':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Internal Server Error
        examples: {}
        description: Internal Server Error
  deprecated: false
  type: path
components:
  schemas:
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