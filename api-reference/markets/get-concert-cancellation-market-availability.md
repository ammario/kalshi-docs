---
url: https://docs.kalshi.com/api-reference/markets/get-concert-cancellation-market-availability
lastmod: 2026-11-13T04:52:12.113Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Concert Cancellation Market Availability

> Returns which on-request concert markets can be created: whether
creation is on, the covers offered, how far ahead a show may be
scheduled, and the metros whose concerts
`GET /concert_cancellation_markets/concerts` lists. A cover missing
from `covers` can't be created. Existing markets are unaffected.

Each metro carries the number of upcoming shows listed for it. Pass
`date_from` and `date_to` to count only the shows a listing with the
same dates would return.




## OpenAPI

````yaml /openapi.yaml get /concert_cancellation_markets/availability
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.36.0
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
  /concert_cancellation_markets/availability:
    get:
      tags:
        - markets
      summary: Get Concert Cancellation Market Availability
      description: |
        Returns which on-request concert markets can be created: whether
        creation is on, the covers offered, how far ahead a show may be
        scheduled, and the metros whose concerts
        `GET /concert_cancellation_markets/concerts` lists. A cover missing
        from `covers` can't be created. Existing markets are unaffected.

        Each metro carries the number of upcoming shows listed for it. Pass
        `date_from` and `date_to` to count only the shows a listing with the
        same dates would return.
      operationId: GetConcertCancellationAvailability
      parameters:
        - name: date_from
          in: query
          required: false
          description: >-
            Count shows from this venue-local date, as YYYY-MM-DD. Omitted
            counts from today.
          schema:
            type: string
          x-oapi-codegen-extra-tags:
            validate: omitempty,datetime=2006-01-02
        - name: date_to
          in: query
          required: false
          description: >-
            Count shows up to this venue-local date, inclusive, as YYYY-MM-DD.
            Omitted for no end.
          schema:
            type: string
          x-oapi-codegen-extra-tags:
            validate: omitempty,datetime=2006-01-02
      responses:
        '200':
          description: Availability retrieved successfully
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/GetConcertCancellationAvailabilityResponse
        '400':
          $ref: '#/components/responses/BadRequestError'
        '429':
          $ref: '#/components/responses/RateLimitError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    GetConcertCancellationAvailabilityResponse:
      type: object
      required:
        - enabled
        - covers
        - max_days_ahead
        - metros
      properties:
        enabled:
          type: boolean
          description: Whether concert cancellation markets can be created at all.
        covers:
          type: array
          items:
            $ref: '#/components/schemas/ConcertCover'
          description: The covers on offer. A cover left out can't be created.
        max_days_ahead:
          type: integer
          format: int32
          description: How many days ahead a show may be scheduled for a new market.
        metros:
          type: array
          items:
            $ref: '#/components/schemas/ConcertMetro'
          description: The metros whose concerts are listed.
    ConcertCover:
      type: string
      enum:
        - postponed
        - cancelled
        - either
      x-enum-varnames:
        - ConcertCoverPostponed
        - ConcertCoverCancelled
        - ConcertCoverEither
      description: |
        What a concert cancellation market pays on, read from the show's
        listing after its scheduled date has ended:
        - `postponed`: Yes when the show is listed as postponed, or as taking
          place on any other date. A show listed as canceled resolves to No.
        - `cancelled`: Yes when the show is listed as canceled.
        - `either`: Yes in both of those cases.
    ConcertMetro:
      type: object
      required:
        - id
        - name
        - upcoming_shows
      properties:
        id:
          type: string
          description: Metro id to pass as `metro_id` when listing concerts.
          example: jambase:1
        name:
          type: string
          description: Metro name.
          example: New York
        latitude:
          type: number
          format: double
          description: Latitude of the metro's center. Left out when unknown.
        longitude:
          type: number
          format: double
          description: Longitude of the metro's center. Left out when unknown.
        upcoming_shows:
          type: integer
          format: int32
          description: >-
            Upcoming shows listed in the metro, within the request's dates when
            given. 0 when no count is available.
          x-omitempty: false
    ErrorResponse:
      type: object
      properties:
        code:
          type: string
          description: Error code
        message:
          type: string
          description: Human-readable error message
        details:
          type: string
          description: Additional details about the error, if available
  responses:
    BadRequestError:
      description: Bad request - invalid input
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    RateLimitError:
      description: >-
        Rate limit exceeded. The default cost is 10 tokens per request. Use GET
        /trade-api/v2/account/endpoint_costs to list non-default endpoint costs.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    InternalServerError:
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.