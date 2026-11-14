---
url: https://docs.kalshi.com/getting_started/concert_rfqs
lastmod: 2026-11-13T18:19:54.959Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# On-Request Concert Markets

> Create a market on whether a concert is postponed or canceled, then trade it through an RFQ

> [!NOTE]
>
> On-request concert markets are not live yet. They will be released soon, and this page describes how they will work at launch.

On-request concert markets let you trade whether a concert is called off: one show, on the date it is scheduled for, and what counts as called off. The market doesn't exist until someone asks for it. You create it with one request, then trade it through the [RFQ system](https://docs.kalshi.com/getting_started/rfqs.md).

## Flow

1. Check what can be created with [Get Concert Cancellation Market Availability](https://docs.kalshi.com/api-reference/markets/get-concert-cancellation-market-availability.md).
2. Find the show with [Get Concerts](https://docs.kalshi.com/api-reference/markets/get-concerts.md) or [Search Concerts](https://docs.kalshi.com/api-reference/markets/search-concerts.md).
3. Call [Create Concert Cancellation Market](https://docs.kalshi.com/api-reference/markets/create-concert-cancellation-market.md) with the show, its scheduled date and a cover. It returns the `market_ticker`, creating the market if it doesn't exist yet.
4. Send an RFQ for that ticker with `POST /communications/rfqs`.
5. Makers quote, you accept one side, and the maker confirms. This part is the same as for any other RFQ.
6. The market closes when the show is scheduled to start. Settlement is expected about 12 hours after the scheduled date ends at the venue.

Makers skip steps 1 to 4: the RFQ arrives as `rfq_created` on the `communications` WebSocket channel with the market's ticker, and the ticker says which show and cover it is for (see [Tickers](#tickers)).

## What you can request

A market is defined by three things: the show, the date it is scheduled for, and the cover.

| `cover` | Settles Yes when the show's listing says | Series |
| - | - | - |
| `postponed` | Postponed, or taking place on any other date | `KXRFQCONCERTP` |
| `cancelled` | Canceled | `KXRFQCONCERTC` |
| `either` | Either of the above | `KXRFQCONCERT` |

A show can have one market per cover. Not every cover is offered everywhere, and the set can differ between production and demo. The availability endpoint is the source of truth: a cover missing from its `covers` list can't be created, and `enabled: false` means creation is off entirely. It needs no authentication.

**Show.** A concert listed by JamBase, named by its `jambase_event_id` (`jambase:<id>`). The show must still be listed as scheduled: one that has already been canceled or postponed is refused.

**Date.** `scheduled_date` is the date the show is scheduled for, local to the venue, as YYYY-MM-DD. It must match the show's listing at the moment the market is created. If the show has moved since you read the listing, the request returns 409 with the new date in `details`.

**Timing.** A new market's show must start more than an hour from now, and no more than `max_days_ahead` days out (from the availability endpoint). While the listing gives only a date and no start time, the start of that day at the venue is used.

## Find a show

Availability lists the metros whose concerts you can browse, with the number of upcoming shows in each:

```bash theme={null}
curl "https://external-api.demo.kalshi.co/trade-api/v2/concert_cancellation_markets/availability"
```

```json theme={null}
{
  "enabled": true,
  "covers": ["postponed", "cancelled", "either"],
  "max_days_ahead": 180,
  "metros": [
    { "id": "jambase:1", "name": "New York", "latitude": 40.6943, "longitude": -73.9249, "upcoming_shows": 1482 }
  ]
}
```

Pass `date_from` and `date_to` (YYYY-MM-DD, both inclusive) to count only the shows in those dates.

List a metro's concerts, soonest first, 50 to a page:

```bash theme={null}
curl "https://external-api.demo.kalshi.co/trade-api/v2/concert_cancellation_markets/concerts?metro_id=jambase:1&date_from=<YYYY-MM-DD>&date_to=<YYYY-MM-DD>" \
  -H "KALSHI-ACCESS-KEY: $KEY_ID" \
  -H "KALSHI-ACCESS-SIGNATURE: $SIGNATURE" \
  -H "KALSHI-ACCESS-TIMESTAMP: $TIMESTAMP"
```

An abbreviated example:

```json theme={null}
{
  "concerts": [
    {
      "jambase_event_id": "jambase:16543035",
      "name": "Example Band at Example Hall",
      "headliner": "Example Band",
      "lineup": ["Example Band", "Opening Act"],
      "venue_name": "Example Hall",
      "city": "New York",
      "region": "NY",
      "country": "US",
      "timezone": "America/New_York",
      "scheduled_date": "2026-11-20",
      "start_time": "2026-11-20T20:00:00",
      "markets": [
        {
          "cover": "postponed",
          "event_ticker": "KXRFQCONCERTP-JB16543035-26NOV20",
          "market_ticker": "KXRFQCONCERTP-JB16543035-26NOV20-PPD"
        }
      ]
    }
  ],
  "page": 1,
  "total_pages": 20
}
```

* `scheduled_date` and `start_time` are local to the venue, in `timezone`. `start_time` has no UTC offset and is left out while only the date is announced.
* `markets` has one entry per offered cover, with the tickers the show has or would get. A ticker listed here names a market that may not exist yet, so create it before sending an RFQ.
* Read further pages with `page`, up to `total_pages`. A listing holds at most 20 pages (1,000 shows), so narrow the dates to reach later shows in a busy metro.

`GET /concert_cancellation_markets/concerts/search?q=<name>` returns up to 50 concerts in the same shape, across metros. `q` is matched against the acts on the bill and may also match venues and cities. Both endpoints need authentication and return only shows a market can still be created for.

## Create a market

```bash theme={null}
curl -X POST https://external-api.demo.kalshi.co/trade-api/v2/concert_cancellation_markets \
  -H "KALSHI-ACCESS-KEY: $KEY_ID" \
  -H "KALSHI-ACCESS-SIGNATURE: $SIGNATURE" \
  -H "KALSHI-ACCESS-TIMESTAMP: $TIMESTAMP" \
  -H "Content-Type: application/json" \
  -d '{
    "jambase_event_id": "jambase:16543035",
    "scheduled_date": "2026-11-20",
    "cover": "postponed"
  }'
```

```json theme={null}
{
  "cover": "postponed",
  "event_ticker": "KXRFQCONCERTP-JB16543035-26NOV20",
  "market_ticker": "KXRFQCONCERTP-JB16543035-26NOV20-PPD",
  "created": true
}
```

Sign the request like any other authenticated request (see [Quick Start: Authenticated Requests](https://docs.kalshi.com/getting_started/quick_start_authenticated_requests.md)), and take `jambase_event_id` and `scheduled_date` from a listing or search result.

The same request returns the same market, with `created: false` once it exists, until it closes. You can call it before each RFQ. An existing market is returned even when new markets are no longer offered. A market created a moment ago may not be readable yet: if `GET /markets/{ticker}` returns 404 right after creation, retry.

Then request quotes on it with `POST /communications/rfqs`:

```json theme={null}
{
  "market_ticker": "KXRFQCONCERTP-JB16543035-26NOV20-PPD",
  "contracts_fp": "100.00",
  "rest_remainder": false
}
```

Sizing, quoting, acceptance and timing follow [Request for Quote (RFQ)](https://docs.kalshi.com/getting_started/rfqs.md).

## Tickers

A ticker fully defines its market, so a maker can tell what an RFQ is for from the ticker alone.

`KXRFQCONCERTP-JB16543035-26NOV20-PPD`

| Segment | Example | Meaning |
| - | - | - |
| Series | `KXRFQCONCERTP` | The cover (see the table above) |
| Show | `JB16543035` | The JamBase event id: `jambase:16543035` |
| Scheduled date | `26NOV20` | `YYMONDD`, local to the venue: November 20, 2026 |
| Cover | `PPD` | `PPD` postponed, `CXL` canceled, `OFF` either |

The first three segments are the event ticker. Each event holds one market, so a show with all three covers has three events, one in each series.

The market's `title` names the act, venue and date, and `rules_primary` states the show and what resolves it to Yes in words.

## Finding these markets

Series starting with `KXRFQ` are left out of unscoped listings, so that markets created for one request don't crowd out everything else:

* `GET /markets` and `GET /historical/markets` skip them unless the request sets `series_ticker`, `event_ticker` or `tickers` to one of them. On `GET /markets`, `mve_filter=exclude` skips them even then. `GET /historical/markets` takes only one of those four filters at a time.
* `GET /markets/trades` and `GET /historical/trades` skip their trades unless the request sets `ticker`.
* `GET /events` leaves them out, including when the request sets `series_ticker` to one of their series. `GET /series` leaves their series out.
* The WebSocket `trade` and `ticker` channels deliver them only to subscriptions that list the market. `market_lifecycle_v2` leaves them out.

Fetching one by ticker works as for any market: `GET /markets/{ticker}`, `GET /events/{event_ticker}` and `GET /series/{series_ticker}`.

## Settlement

* The market closes when the show is scheduled to start (`close_time`), or at the start of the scheduled day at the venue when the listing gave only a date.
* Kalshi determines it from the show's JamBase listing, read once the scheduled date has ended in the venue's time zone plus 12 hours (`expected_expiration_time`). The wait lets late cancellations and corrections to the listing land first. Changes to the listing after it is read don't change the outcome.
* Kalshi uses the listing's status and date as they stand at that reading:

| Listing when read | `postponed` | `cancelled` | `either` |
| - | - | - | - |
| Scheduled or rescheduled, on the scheduled date | No | No | No |
| Postponed, or scheduled or rescheduled on any other date | Yes | No | Yes |
| Canceled, whatever date it gives | No | Yes | Yes |

* A show that is both moved and canceled counts as canceled.
* If the listing has been removed or merged into another, or its status can't be read, the exchange determines the market. `latest_expiration_time` is seven days after `expected_expiration_time`.

Each market's `rules_primary` and `rules_secondary` carry the full terms.

## Limits and errors

The create endpoint is charged against your write [rate limit](https://docs.kalshi.com/getting_started/rate_limits.md), and the listing and search against your read limit. Creation and search limits are separate from request-rate limits.

| Status | `code` | What's going on |
| - | - | - |
| 400 | `bad_request` | The body isn't valid JSON, or a field has the wrong type |
| 400 | `missing_parameters` | A required body field is missing or empty |
| 400 | `invalid_parameters` | The request can't be served as sent: an unknown cover or metro, an id that isn't `jambase:<id>`, a date that isn't YYYY-MM-DD, a `date_to` before `date_from`, or a show scheduled further ahead than `max_days_ahead` |
| 404 | `not_found` | JamBase has no show with that id |
| 409 | `concert_cancellation_market_unavailable` | Valid, but not offered: concert markets or the cover are switched off, the show is now listed on another date, has already been canceled or postponed, starts in an hour or less, isn't a concert, or its market has closed |
| 429 | `concert_cancellation_market_limit_exceeded` | The limit on new concert markets across all users in a rolling 24 hours was reached. Retrying at once doesn't help |
| 429 | `concert_search_limit_exceeded` | The limit on searches across all users was reached. Browse by metro instead, or retry later |
| 429 | `too_many_requests` | Your API rate limit |

The specific reason is in the error's `details` when there is one; a rate-limit error can come without it. A missing or malformed query parameter on the listing, search or availability endpoints returns 400 before the request is looked at further.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.