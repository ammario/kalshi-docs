---
url: https://docs.kalshi.com/api-reference/markets/create-weather-point-market
lastmod: 2026-11-20T20:43:04.558Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Create Weather Point Market

> Returns the on-request weather market for a location, time window and
threshold, creating it if it doesn't exist yet. The same request always
returns the same market, so call this before sending an RFQ for a
market you haven't seen. `created` tells you whether the market is new.
An existing market is normally returned until its window ends, even
where new markets like it are no longer offered. If weather markets
are switched off entirely, the request can be refused whether or not
the market exists.

The market's location is the requested coordinates rounded to three
decimal places; requests that agree to three decimal places share a
market. A rounded location exactly on the boundary between two NOAA
MRMS grid cells is moved 0.001° north or east, into one of them. The
response carries the market's coordinates. Markets are only offered
where `GET /weather_point_markets/availability` says so, and only
where the market's grid cell touches land in a US state or territory:
a cell entirely over open water or outside the US is refused, while
any point in a coastal cell that touches land is accepted.

The window is whole local hours, on one calendar day or, with
`end_date` set to the day after `date`, from one day into the next.
A window that crosses midnight is at most 24 hours long, and only
offered where `GET /weather_point_markets/availability` returns
`max_window_days: 2`. A new market's window must start at least 6
hours from now (15 minutes on demo) and within 365 days.

`timezone` only says which span of time `date` and the hours mean. The
market is described in the IANA time zone of its location, which
Kalshi determines from the coordinates: its title and `rules_primary`
give the window there, with the weekday and the zone abbreviation in
force (`on Thu, Nov 19, 2026, 8pm–12am PST`), whatever zone the
request used. The limits on a window's dates go by the location's
zone as well: where `max_window_days` is 1, a new market whose window
crosses midnight at the location is refused even when the request
names one date in another zone, and one within one date at the
location is accepted even with `end_date`; and a window that crosses
midnight at the location is at most 24 hours long there. A market
that already exists is returned either way. An event created before
this applied keeps its description and its dates, in the time zone of
its first request, and so do thresholds added to it later: for those,
the `max_window_days` limit goes by the dates the event stores.

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
| 400 | `invalid_parameters` | A field is present but unusable, or the request can't define a market: a latitude or hour out of range, an `end_hour` not after `start_hour` on one day, an `end_date` other than `date` or the day after it, a window across midnight, in `timezone` or at the location, longer than 24 hours, an unknown variable or strike type, thresholds that don't fit the strike type or the variable's range, a location outside NOAA MRMS coverage, an unknown time zone, a window that doesn't start and end on whole UTC hours, has already ended or starts more than 365 days out, or an hour that a clock change skips or repeats in `timezone`. |
| 409 | `weather_point_market_unavailable` | The request is valid but the market isn't offered: the variable isn't offered at that location, the market's grid cell is entirely over open water or outside US land, the window starts in less than 6 hours (15 minutes on demo), the market's window crosses midnight in the location's time zone where `max_window_days` is 1, or the location's time zone can't be determined. |
| 429 | `weather_point_market_limit_exceeded` | A creation limit was reached: the daily limit on new weather markets across all users, or 40 markets for one variable, location and window. Retrying at once doesn't help. |
| 429 | `too_many_requests` | Your API rate limit. This endpoint is charged against your write budget. |




## OpenAPI

````yaml /openapi.yaml post /weather_point_markets
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.37.0
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
  /weather_point_markets:
    post:
      tags:
        - markets
      summary: Create Weather Point Market
      description: >
        Returns the on-request weather market for a location, time window and

        threshold, creating it if it doesn't exist yet. The same request always

        returns the same market, so call this before sending an RFQ for a

        market you haven't seen. `created` tells you whether the market is new.

        An existing market is normally returned until its window ends, even

        where new markets like it are no longer offered. If weather markets

        are switched off entirely, the request can be refused whether or not

        the market exists.


        The market's location is the requested coordinates rounded to three

        decimal places; requests that agree to three decimal places share a

        market. A rounded location exactly on the boundary between two NOAA

        MRMS grid cells is moved 0.001° north or east, into one of them. The

        response carries the market's coordinates. Markets are only offered

        where `GET /weather_point_markets/availability` says so, and only

        where the market's grid cell touches land in a US state or territory:

        a cell entirely over open water or outside the US is refused, while

        any point in a coastal cell that touches land is accepted.


        The window is whole local hours, on one calendar day or, with

        `end_date` set to the day after `date`, from one day into the next.

        A window that crosses midnight is at most 24 hours long, and only

        offered where `GET /weather_point_markets/availability` returns

        `max_window_days: 2`. A new market's window must start at least 6

        hours from now (15 minutes on demo) and within 365 days.


        `timezone` only says which span of time `date` and the hours mean. The

        market is described in the IANA time zone of its location, which

        Kalshi determines from the coordinates: its title and `rules_primary`

        give the window there, with the weekday and the zone abbreviation in

        force (`on Thu, Nov 19, 2026, 8pm–12am PST`), whatever zone the

        request used. The limits on a window's dates go by the location's

        zone as well: where `max_window_days` is 1, a new market whose window

        crosses midnight at the location is refused even when the request

        names one date in another zone, and one within one date at the

        location is accepted even with `end_date`; and a window that crosses

        midnight at the location is at most 24 hours long there. A market

        that already exists is returned either way. An event created before

        this applied keeps its description and its dates, in the time zone of

        its first request, and so do thresholds added to it later: for those,

        the `max_window_days` limit goes by the dates the event stores.


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

        | 400 | `invalid_parameters` | A field is present but unusable, or the
        request can't define a market: a latitude or hour out of range, an
        `end_hour` not after `start_hour` on one day, an `end_date` other than
        `date` or the day after it, a window across midnight, in `timezone` or
        at the location, longer than 24 hours, an unknown variable or strike
        type, thresholds that don't fit the strike type or the variable's range,
        a location outside NOAA MRMS coverage, an unknown time zone, a window
        that doesn't start and end on whole UTC hours, has already ended or
        starts more than 365 days out, or an hour that a clock change skips or
        repeats in `timezone`. |

        | 409 | `weather_point_market_unavailable` | The request is valid but
        the market isn't offered: the variable isn't offered at that location,
        the market's grid cell is entirely over open water or outside US land,
        the window starts in less than 6 hours (15 minutes on demo), the
        market's window crosses midnight in the location's time zone where
        `max_window_days` is 1, or the location's time zone can't be determined.
        |

        | 429 | `weather_point_market_limit_exceeded` | A creation limit was
        reached: the daily limit on new weather markets across all users, or 40
        markets for one variable, location and window. Retrying at once doesn't
        help. |

        | 429 | `too_many_requests` | Your API rate limit. This endpoint is
        charged against your write budget. |
      operationId: CreateWeatherPointMarket
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateWeatherPointMarketRequest'
      responses:
        '200':
          description: Market returned or created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateWeatherPointMarketResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
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
    CreateWeatherPointMarketRequest:
      type: object
      required:
        - latitude
        - longitude
        - variable
        - strike_type
        - date
        - start_hour
        - end_hour
        - timezone
      properties:
        latitude:
          type: number
          format: double
          description: Latitude of the location in degrees.
          example: 40.785
          x-go-type: '*float64'
          x-oapi-codegen-extra-tags:
            validate: required,gte=-90,lte=90
        longitude:
          type: number
          format: double
          description: Longitude of the location in degrees.
          example: -73.965
          x-go-type: '*float64'
          x-oapi-codegen-extra-tags:
            validate: required,gte=-180,lte=180
        variable:
          $ref: '#/components/schemas/WeatherPointVariable'
        strike_type:
          type: string
          enum:
            - greater
            - less
            - between
          x-enum-varnames:
            - WeatherPointStrikeGreater
            - WeatherPointStrikeLess
            - WeatherPointStrikeBetween
          description: |
            How the measured value is compared to the thresholds:
            `greater` settles Yes strictly above `floor_value`, `less`
            strictly below `cap_value`, and `between` from `floor_value` to
            `cap_value` inclusive.
          x-oapi-codegen-extra-tags:
            validate: required,oneof=greater less between
        floor_value:
          type: integer
          format: int32
          description: >-
            Lower threshold, in the variable's unit. Required for `greater` and
            `between`, and must be left out for `less`. For `precip_hours` with
            `greater` it must be below the number of hours in the window.
        cap_value:
          type: integer
          format: int32
          description: >-
            Upper threshold, in the variable's unit. Required for `less` and
            `between`, and must be left out for `greater`. For the precipitation
            variables with `less` it must be above 0. For `between` it must not
            be below `floor_value`.
        date:
          type: string
          description: >-
            Local calendar date the window starts on, as YYYY-MM-DD in
            `timezone`.
          example: '2026-11-11'
          x-oapi-codegen-extra-tags:
            validate: required,datetime=2006-01-02
        end_date:
          type: string
          description: >-
            Local calendar date the window ends on, as YYYY-MM-DD in `timezone`.
            Leave it out, or repeat `date`, for a window within one day. Set it
            to the day after `date` for a window that crosses midnight in
            `timezone`; `end_hour` is then read on this date, and the window is
            at most 24 hours long. Any other date is refused. Whether a window
            across midnight is offered (`max_window_days` 2 in availability)
            doesn't go by this field. For a market that starts a new event it
            goes by the dates at the market's location; where `max_window_days`
            is 1, a request with `end_date` is accepted when the window lies
            within one date at the location, and one without it is refused when
            the window crosses midnight there. A threshold added to an event
            that already exists goes by the dates that event stores, which on an
            older event are those of its first request.
          example: '2026-11-12'
          x-oapi-codegen-extra-tags:
            validate: omitempty,datetime=2006-01-02
        start_hour:
          type: integer
          format: int32
          minimum: 0
          maximum: 23
          description: First local hour of the window (0-23).
          x-go-type: '*int32'
          x-oapi-codegen-extra-tags:
            validate: required,gte=0,lte=23
        end_hour:
          type: integer
          format: int32
          minimum: 1
          maximum: 24
          description: >-
            Local hour the window ends at, exclusive (1-24). Within one day it
            must be after `start_hour`; 24 is the following midnight, so 0 to 24
            is the whole day. With `end_date` the day after `date` it is an hour
            of that day and must not be after `start_hour`, so 23 to 3 is 11pm
            to 3am and 8 to 8 is 24 hours.
          x-go-type: '*int32'
          x-oapi-codegen-extra-tags:
            validate: required,gte=1,lte=24
        timezone:
          type: string
          description: >-
            IANA time zone that `date`, `end_date` and the hours are read in. It
            only says which span of time they mean, and needn't be the
            location's; the market's title and rules are written in the
            location's own time zone, whatever is sent here. The window must
            start and end on whole UTC hours, so zones offset by a fraction of
            an hour are refused.
          example: America/New_York
          x-oapi-codegen-extra-tags:
            validate: required
    CreateWeatherPointMarketResponse:
      type: object
      required:
        - event_ticker
        - market_ticker
        - created
        - latitude
        - longitude
      properties:
        event_ticker:
          type: string
          description: Event ticker of the market.
        market_ticker:
          type: string
          description: Market ticker of the market.
          example: KXRFQRAINHOURS-40785N73965W-26NOV1105Z-24H-G2
        created:
          type: boolean
          description: False when a market for the same request already existed.
        latitude:
          type: number
          format: double
          description: >-
            Latitude of the market's location, the requested latitude to three
            decimal places.
        longitude:
          type: number
          format: double
          description: >-
            Longitude of the market's location, the requested longitude to three
            decimal places.
    WeatherPointVariable:
      type: string
      enum:
        - precip_hours
        - precip_total
        - max_temp
        - min_temp
      description: |
        What a weather point market measures over its window, and the unit
        and allowed range of its thresholds:
        - `precip_hours`: number of whole hours with at least 0.01 inch of
          precipitation. Whole hours, 0 to the length of the window.
        - `precip_total`: total precipitation. Hundredths of an inch, 0 to
          2000 (so 25 is 0.25 inch).
        - `max_temp`: highest temperature. Whole °F, -80 to 140.
        - `min_temp`: lowest temperature. Whole °F, -80 to 140.
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