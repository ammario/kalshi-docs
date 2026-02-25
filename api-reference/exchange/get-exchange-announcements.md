---
url: https://docs.kalshi.com/api-reference/exchange/get-exchange-announcements
lastmod: 2026-02-25T02:00:18.491Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Exchange Announcements

>  Endpoint for getting all exchange-wide announcements.



## OpenAPI

````yaml openapi.yaml get /exchange/announcements
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.8.0
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
  /exchange/announcements:
    get:
      tags:
        - exchange
      summary: Get Exchange Announcements
      description: ' Endpoint for getting all exchange-wide announcements.'
      operationId: GetExchangeAnnouncements
      responses:
        '200':
          description: Exchange announcements retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetExchangeAnnouncementsResponse'
        '500':
          description: Internal server error
components:
  schemas:
    GetExchangeAnnouncementsResponse:
      type: object
      required:
        - announcements
      properties:
        announcements:
          type: array
          description: A list of exchange-wide announcements.
          items:
            $ref: '#/components/schemas/Announcement'
    Announcement:
      type: object
      required:
        - type
        - message
        - delivery_time
        - status
      properties:
        type:
          type: string
          enum:
            - info
            - warning
            - error
          description: The type of the announcement.
        message:
          type: string
          description: The message contained within the announcement.
        delivery_time:
          type: string
          format: date-time
          description: The time the announcement was delivered.
        status:
          type: string
          enum:
            - active
            - inactive
          description: The current status of this announcement.

````