---
url: https://docs.kalshi.com/api-reference/milestone/get-milestone
lastmod: 2025-11-03T03:42:06.869Z
---
# Get Milestone

>  Endpoint for getting data about a specific milestone by its ID.

## OpenAPI

````yaml openapi.yaml get /milestones/{milestone_id}
paths:
  path: /milestones/{milestone_id}
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security: []
    parameters:
      path:
        milestone_id:
          schema:
            - type: string
              required: true
              description: Milestone ID
      query: {}
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              milestone:
                allOf:
                  - $ref: '#/components/schemas/Milestone'
                    description: The milestone data.
            refIdentifier: '#/components/schemas/GetMilestoneResponse'
            requiredProperties:
              - milestone
        examples:
          example:
            value:
              milestone:
                id: <string>
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
        description: Milestone retrieved successfully
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
    '404':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Not Found
        examples: {}
        description: Not Found
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