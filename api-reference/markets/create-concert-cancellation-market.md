---
url: https://docs.kalshi.com/api-reference/markets/create-concert-cancellation-market
lastmod: 2026-11-13T04:52:12.090Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Create Concert Cancellation Market

> Returns the on-request market on whether a concert is called off,
creating it if it doesn't exist yet. A market is defined by the show
(`jambase_event_id`), the date it is scheduled for and the `cover`:
`postponed`, `cancelled` or `either`. The same request always returns
the same market, so call this before sending an RFQ for a market you
haven't seen. `created` tells you whether the market is new.

Take `jambase_event_id` and `scheduled_date` from
`GET /concert_cancellation_markets/concerts` or
`GET /concert_cancellation_markets/concerts/search`. A new market is
created from the show's listing as it stands now, so the request is
refused when the show has moved to another date or has already been
canceled or postponed.

An existing market is returned until it closes, even when new markets
are no longer offered. A new market's show must start more than an
hour from now and within the `max_days_ahead` that
`GET /concert_cancellation_markets/availability` reports.

A market is traded through RFQs: pass the returned `market_ticker` to
`POST /communications/rfqs`. These markets are in series starting with
`KXRFQ` and are left out of unscoped market listings.

A market created a moment ago may not be readable yet: if
`GET /markets/{ticker}` returns 404 right after creation, retry.

Errors carry the specific reason in `details`:

| Status | `code` | When |
| --- | --- | --- |
| 400 | `bad_request` | The body isn't valid JSON, or a field has the wrong type. |
| 400 | `missing_parameters` | A required field is missing or empty. |
| 400 | `invalid_parameters` | A field is present but unusable: an unknown cover, a `jambase_event_id` that isn't `jambase:<id>`, a `scheduled_date` that isn't YYYY-MM-DD, or a show scheduled further ahead than `max_days_ahead`. |
| 404 | `not_found` | The listing source has no show with that id. |
| 409 | `concert_cancellation_market_unavailable` | The request is valid but the market isn't offered: concert markets or the cover are switched off, the show is now listed on another date, has already been canceled or postponed, starts too soon, isn't a concert, or its market has closed. |
| 429 | `concert_cancellation_market_limit_exceeded` | The daily limit on new concert markets across all users was reached. Retrying at once doesn't help. |
| 429 | `too_many_requests` | Your API rate limit. This endpoint is charged against your write budget. |




## OpenAPI

````yaml /openapi.yaml post /concert_cancellation_markets
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
  /concert_cancellation_markets:
    post:
      tags:
        - markets
      summary: Create Concert Cancellation Market
      description: >
        Returns the on-request market on whether a concert is called off,

        creating it if it doesn't exist yet. A market is defined by the show

        (`jambase_event_id`), the date it is scheduled for and the `cover`:

        `postponed`, `cancelled` or `either`. The same request always returns

        the same market, so call this before sending an RFQ for a market you

        haven't seen. `created` tells you whether the market is new.


        Take `jambase_event_id` and `scheduled_date` from

        `GET /concert_cancellation_markets/concerts` or

        `GET /concert_cancellation_markets/concerts/search`. A new market is

        created from the show's listing as it stands now, so the request is

        refused when the show has moved to another date or has already been

        canceled or postponed.


        An existing market is returned until it closes, even when new markets

        are no longer offered. A new market's show must start more than an

        hour from now and within the `max_days_ahead` that

        `GET /concert_cancellation_markets/availability` reports.


        A market is traded through RFQs: pass the returned `market_ticker` to

        `POST /communications/rfqs`. These markets are in series starting with

        `KXRFQ` and are left out of unscoped market listings.


        A market created a moment ago may not be readable yet: if

        `GET /markets/{ticker}` returns 404 right after creation, retry.


        Errors carry the specific reason in `details`:


        | Status | `code` | When |

        | --- | --- | --- |

        | 400 | `bad_request` | The body isn't valid JSON, or a field has the
        wrong type. |

        | 400 | `missing_parameters` | A required field is missing or empty. |

        | 400 | `invalid_parameters` | A field is present but unusable: an
        unknown cover, a `jambase_event_id` that isn't `jambase:<id>`, a
        `scheduled_date` that isn't YYYY-MM-DD, or a show scheduled further
        ahead than `max_days_ahead`. |

        | 404 | `not_found` | The listing source has no show with that id. |

        | 409 | `concert_cancellation_market_unavailable` | The request is valid
        but the market isn't offered: concert markets or the cover are switched
        off, the show is now listed on another date, has already been canceled
        or postponed, starts too soon, isn't a concert, or its market has
        closed. |

        | 429 | `concert_cancellation_market_limit_exceeded` | The daily limit
        on new concert markets across all users was reached. Retrying at once
        doesn't help. |

        | 429 | `too_many_requests` | Your API rate limit. This endpoint is
        charged against your write budget. |
      operationId: CreateConcertCancellationMarket
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateConcertCancellationMarketRequest'
      responses:
        '200':
          description: Market returned or created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateConcertCancellationMarketResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
        '404':
          $ref: '#/components/responses/NotFoundError'
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
    CreateConcertCancellationMarketRequest:
      type: object
      required:
        - jambase_event_id
        - scheduled_date
        - cover
      properties:
        jambase_event_id:
          type: string
          description: The show, as `jambase:<id>`, from the concert listing or search.
          example: jambase:16543035
          x-oapi-codegen-extra-tags:
            validate: required
        scheduled_date:
          type: string
          description: >-
            The venue-local date the show is scheduled for, as YYYY-MM-DD. It
            must match the show's current listing.
          example: '2026-11-20'
          x-oapi-codegen-extra-tags:
            validate: required,datetime=2006-01-02
        cover:
          $ref: '#/components/schemas/ConcertCover'
    CreateConcertCancellationMarketResponse:
      type: object
      required:
        - cover
        - event_ticker
        - market_ticker
        - created
      properties:
        cover:
          $ref: '#/components/schemas/ConcertCover'
        event_ticker:
          type: string
          description: Event ticker of the market.
          example: KXRFQCONCERTP-JB16543035-26NOV20
        market_ticker:
          type: string
          description: Market ticker of the market.
          example: KXRFQCONCERTP-JB16543035-26NOV20-PPD
        created:
          type: boolean
          description: False when a market for the same request already existed.
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
    UnauthorizedError:
      description: Unauthorized - authentication required
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    ForbiddenError:
      description: Forbidden - insufficient permissions
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    NotFoundError:
      description: Resource not found
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