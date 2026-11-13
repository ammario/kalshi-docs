---
url: https://docs.kalshi.com/api-reference/markets/search-concerts
lastmod: 2026-11-13T04:52:12.164Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Search Concerts

> Lists upcoming concerts matching a name, across metros, that a
cancellation market can still be created for: up to 50, in the same
shape as `GET /concert_cancellation_markets/concerts`. The name is
matched against the acts on the bill, and may also match venues and
cities.

Searches can be limited across all users. When the limit is reached
the request returns 429 `concert_search_limit_exceeded`; browse by
metro instead, or retry later.




## OpenAPI

````yaml /openapi.yaml get /concert_cancellation_markets/concerts/search
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
  /concert_cancellation_markets/concerts/search:
    get:
      tags:
        - markets
      summary: Search Concerts
      description: |
        Lists upcoming concerts matching a name, across metros, that a
        cancellation market can still be created for: up to 50, in the same
        shape as `GET /concert_cancellation_markets/concerts`. The name is
        matched against the acts on the bill, and may also match venues and
        cities.

        Searches can be limited across all users. When the limit is reached
        the request returns 429 `concert_search_limit_exceeded`; browse by
        metro instead, or retry later.
      operationId: SearchConcerts
      parameters:
        - name: q
          in: query
          required: true
          description: >-
            The name to search for, or part of one. 2 to 80 characters; some
            searches need at least 3.
          schema:
            type: string
            minLength: 2
            maxLength: 80
          x-oapi-codegen-extra-tags:
            validate: required,min=2,max=80
      responses:
        '200':
          description: Concerts retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchConcertsResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '409':
          $ref: '#/components/responses/ConflictError'
        '429':
          $ref: '#/components/responses/RateLimitError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    SearchConcertsResponse:
      type: object
      required:
        - concerts
      properties:
        concerts:
          type: array
          items:
            $ref: '#/components/schemas/Concert'
    Concert:
      type: object
      required:
        - jambase_event_id
        - name
        - lineup
        - venue_name
        - timezone
        - scheduled_date
        - markets
      properties:
        jambase_event_id:
          type: string
          description: The show's id, as `jambase:<id>`.
          example: jambase:16543035
        name:
          type: string
          description: The show's name as listed.
        headliner:
          type: string
          description: The top-billed act. Left out when the listing names none.
        lineup:
          type: array
          items:
            type: string
          description: The acts on the bill, in billing order.
        venue_name:
          type: string
          description: The venue's name.
        city:
          type: string
          description: The venue's city.
        region:
          type: string
          description: The venue's state or region.
        country:
          type: string
          description: The venue's country code.
        timezone:
          type: string
          description: >-
            IANA time zone of the venue, which `scheduled_date` and `start_time`
            are local to.
          example: America/New_York
        scheduled_date:
          type: string
          description: The venue-local date the show is scheduled for, as YYYY-MM-DD.
          example: '2026-11-20'
        start_time:
          type: string
          description: >-
            Venue-local start time with no UTC offset, as YYYY-MM-DDTHH:MM:SS.
            Left out while only the date is announced.
          example: '2026-11-20T20:00:00'
        latitude:
          type: number
          format: double
          description: Latitude of the venue. Left out when unknown.
        longitude:
          type: number
          format: double
          description: Longitude of the venue. Left out when unknown.
        url:
          type: string
          description: The show's listing page.
        markets:
          type: array
          items:
            $ref: '#/components/schemas/ConcertMarket'
          description: One entry per offered cover.
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
    ConcertMarket:
      type: object
      required:
        - cover
        - event_ticker
        - market_ticker
      properties:
        cover:
          $ref: '#/components/schemas/ConcertCover'
        event_ticker:
          type: string
          description: Event ticker the show has or would get for this cover.
        market_ticker:
          type: string
          description: >-
            Market ticker the show has or would get for this cover. The market
            may not exist yet.
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
  responses:
    BadRequestError:
      description: Bad request - invalid input
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    UnauthorizedError:
      description: Unauthorized - authentication required
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    ConflictError:
      description: Conflict - resource already exists or cannot be modified
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
      description: >-
        Base64 signature of the pre-sign text (timestamp + method + path) made
        with the API key's algorithm - RSA-PSS with SHA-256 for RSA keys,
        Ed25519 for Ed25519 keys
    kalshiAccessTimestamp:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-TIMESTAMP
      description: Request timestamp in milliseconds

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.