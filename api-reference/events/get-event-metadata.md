---
url: https://docs.kalshi.com/api-reference/events/get-event-metadata
lastmod: 2025-12-17T02:38:38.316Z
---
# Get Event Metadata

>  Endpoint for getting metadata about an event by its ticker.  Returns only the metadata information for an event.

## OpenAPI

````yaml openapi.yaml get /events/{event_ticker}/metadata
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.2.0
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
  /events/{event_ticker}/metadata:
    get:
      tags:
        - events
      summary: Get Event Metadata
      description: ' Endpoint for getting metadata about an event by its ticker.  Returns only the metadata information for an event.'
      operationId: GetEventMetadata
      parameters:
        - name: event_ticker
          in: path
          required: true
          description: Event ticker
          schema:
            type: string
      responses:
        '200':
          description: Event metadata retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetEventMetadataResponse'
        '400':
          description: Bad request
        '401':
          description: Unauthorized
        '404':
          description: Event not found
        '500':
          description: Internal server error
components:
  schemas:
    GetEventMetadataResponse:
      type: object
      required:
        - image_url
        - settlement_sources
        - market_details
      properties:
        image_url:
          type: string
          description: A path to an image that represents this event.
        featured_image_url:
          type: string
          description: A path to an image that represents the image of the featured market.
        market_details:
          type: array
          description: Metadata for the markets in this event.
          items:
            $ref: '#/components/schemas/MarketMetadata'
        settlement_sources:
          type: array
          description: A list of settlement sources for this event.
          items:
            $ref: '#/components/schemas/SettlementSource'
        competition:
          type: string
          nullable: true
          x-omitempty: true
          description: Event competition.
          x-go-type-skip-optional-pointer: true
        competition_scope:
          type: string
          nullable: true
          x-omitempty: true
          description: Event scope, based on the competition.
          x-go-type-skip-optional-pointer: true
    MarketMetadata:
      type: object
      required:
        - market_ticker
        - image_url
        - color_code
      properties:
        market_ticker:
          type: string
          description: The ticker of the market.
        image_url:
          type: string
          description: A path to an image that represents this market.
        color_code:
          type: string
          description: The color code for the market.
    SettlementSource:
      type: object
      properties:
        name:
          type: string
          description: Name of the settlement source
          x-go-type-skip-optional-pointer: true
        url:
          type: string
          description: URL to the settlement source
          x-go-type-skip-optional-pointer: true

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt