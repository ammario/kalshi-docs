---
url: https://docs.kalshi.com/getting_started/weather_rfqs
lastmod: 2026-11-12T04:15:11.788Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# On-Request Weather Markets

> Create a weather market for a location and time window you choose, then trade it through an RFQ

> [!NOTE]
>
> On-request weather markets are not live yet. They will be released soon, and this page describes how they will work at launch.

On-request weather markets let you trade the weather at a point you choose: a latitude and longitude, a window of hours on one day, and a threshold. The market doesn't exist until someone asks for it. You create it with one request, then trade it through the [RFQ system](https://docs.kalshi.com/getting_started/rfqs.md).

## Flow

1. Check what can be created with [Get Weather Point Market Availability](https://docs.kalshi.com/api-reference/markets/get-weather-point-market-availability.md).
2. Call [Create Weather Point Market](https://docs.kalshi.com/api-reference/markets/create-weather-point-market.md) with the location, window and threshold. It returns the `market_ticker`, creating the market if it doesn't exist yet.
3. Send an RFQ for that ticker with `POST /communications/rfqs`.
4. Makers quote, you accept one side, and the maker confirms. This part is the same as for any other RFQ.
5. The market closes when its window ends. Settlement is expected about two hours later.

Makers skip steps 1 to 3: the RFQ arrives as `rfq_created` on the `communications` WebSocket channel with the market's ticker, and the ticker says what the market is (see [Tickers](#tickers)). For rain markets, [weather pricing](#weather-pricing) gives a reference probability to quote around.

## What you can request

| `variable` | Measures | Threshold unit | Series |
| - | - | - | - |
| `precip_hours` | Number of hours in the window with at least 0.01 inch of precipitation | Whole hours, 0 to the length of the window | `KXRFQRAINHOURS` |
| `precip_total` | Total precipitation over the window | Hundredths of an inch, 0 to 2000, so 25 is 0.25 inch | `KXRFQRAIN` |
| `max_temp` | Highest hourly temperature in the window | Whole °F, -80 to 140 | `KXRFQHIGH` |
| `min_temp` | Lowest hourly temperature in the window | Whole °F, -80 to 140 | `KXRFQLOW` |

Not every variable is offered everywhere, and the set differs between production and demo. The availability endpoint is the source of truth: a variable missing from its `variables` list can't be created, and `enabled: false` means creation is off entirely. It needs no authentication.

**Location.** A point inside an offered region whose grid cell touches land in a US state or territory. A cell entirely over open water is refused, and so is a cell entirely outside the US even where a region's rectangle covers it, such as Toronto inside `conus`. The point snaps to the center of the NOAA MRMS grid cell that contains it, roughly 1 km across (about half that in Hawaii and Guam), so every request for a point in the same cell, with the same variable, window, strike type and thresholds, resolves to the same market. The response returns the snapped coordinates.

**Window.** Whole local hours on one calendar day: `date`, `start_hour` (0 to 23), `end_hour` (1 to 24, exclusive, and after `start_hour`) and an IANA `timezone`. `0` to `24` is the whole day. A new market's window must start at least 15 minutes from now and within 365 days. The window must start and end on whole UTC hours, so time zones offset by a fraction of an hour are refused. A window can span a clock change, but it can't start or end on an hour that the change skips or repeats.

**Threshold.** `strike_type` with `floor_value` and `cap_value`, in the variable's threshold unit:

| `strike_type` | Settles Yes when the value is | Fields |
| - | - | - |
| `greater` | Strictly above `floor_value` | `floor_value` only; leave out `cap_value` |
| `less` | Strictly below `cap_value` | `cap_value` only; leave out `floor_value` |
| `between` | From `floor_value` to `cap_value`, inclusive | both |

Some thresholds are refused:

* For `precip_hours` with `greater`, `floor_value` must be below the number of hours in the window.
* For the precipitation variables with `less`, `cap_value` must be above 0.
* For `between`, `cap_value` must not be below `floor_value`, and a `precip_hours` range can't cover every count from 0 to the length of the window.

## Create a market

```bash theme={null}
curl -X POST https://external-api.demo.kalshi.co/trade-api/v2/weather_point_markets \
  -H "KALSHI-ACCESS-KEY: $KEY_ID" \
  -H "KALSHI-ACCESS-SIGNATURE: $SIGNATURE" \
  -H "KALSHI-ACCESS-TIMESTAMP: $TIMESTAMP" \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 40.785,
    "longitude": -73.965,
    "variable": "precip_hours",
    "strike_type": "greater",
    "floor_value": 2,
    "date": "<YYYY-MM-DD>",
    "start_hour": 0,
    "end_hour": 24,
    "timezone": "America/New_York"
  }'
```

```json theme={null}
{
  "event_ticker": "KXRFQRAINHOURS-40785N73965W-26NOV2005Z-24H",
  "market_ticker": "KXRFQRAINHOURS-40785N73965W-26NOV2005Z-24H-G2",
  "created": true,
  "latitude": 40.785,
  "longitude": -73.965
}
```

Sign the request like any other authenticated request (see [Quick Start: Authenticated Requests](https://docs.kalshi.com/getting_started/quick_start_authenticated_requests.md)), and replace `<YYYY-MM-DD>` with a date whose window hasn't started. The response below is for `2026-11-20`.

The same request returns the same market, with `created: false` once it exists, until its window ends. You can call it before each RFQ. An existing market is normally returned even where new markets like it are no longer offered. If weather markets are switched off entirely, the request can be refused whether or not the market exists. A market created a moment ago may not be readable yet: if `GET /markets/{ticker}` returns 404 right after creation, retry.

Then request quotes on it with `POST /communications/rfqs`:

```json theme={null}
{
  "market_ticker": "KXRFQRAINHOURS-40785N73965W-26NOV2005Z-24H-G2",
  "contracts_fp": "100.00",
  "rest_remainder": false
}
```

Sizing, quoting, acceptance and timing follow [Request for Quote (RFQ)](https://docs.kalshi.com/getting_started/rfqs.md).

## Tickers

A ticker fully defines its market, so a maker can tell what an RFQ is for from the ticker alone.

`KXRFQRAINHOURS-40785N73965W-26NOV2005Z-24H-G2`

| Segment | Example | Meaning |
| - | - | - |
| Series | `KXRFQRAINHOURS` | The variable (see the table above) |
| Point | `40785N73965W` | Latitude and longitude in thousandths of a degree, with hemispheres: 40.785°N, 73.965°W |
| Window start | `26NOV2005Z` | `YYMONDDHH` followed by `Z`, in UTC: November 20, 2026 at 05:00 UTC |
| Window length | `24H` | Hours in the window |
| Threshold | `G2` | `G` greater than, `L` less than, `B` between with the two values joined by `_` (`B1_4`). A leading `M` marks a negative value (`LM5` is below -5) |

The first four segments are the event ticker. One event holds every threshold requested for the same variable, point and window, with a creation limit of 40 markets.

Threshold values in the ticker are in the variable's threshold unit, so `KXRFQRAIN-…-G25` is more than 0.25 inch. The market's `floor_strike` and `cap_strike` give the same thresholds in display units (0.25 for that market), and `rules_primary` states the location, the local window and the comparison in words.

## Finding these markets

Series starting with `KXRFQ` are left out of unscoped listings, so that markets created for one request don't crowd out everything else:

* `GET /markets` and `GET /historical/markets` skip them unless the request sets `series_ticker`, `event_ticker` or `tickers` to one of them. On `GET /markets`, `mve_filter=exclude` skips them even then. `GET /historical/markets` takes only one of those four filters at a time.
* `GET /markets/trades` and `GET /historical/trades` skip their trades unless the request sets `ticker`.
* `GET /events` leaves them out, including when the request sets `series_ticker` to one of their series. `GET /series` leaves their series out.
* The WebSocket `trade` and `ticker` channels deliver them only to subscriptions that list the market. `market_lifecycle_v2` leaves them out.

Fetching one by ticker works as for any market: `GET /markets/{ticker}`, `GET /events/{event_ticker}` and `GET /series/{series_ticker}`.

## Settlement

* The market closes at the end of its window (`close_time`).
* It settles on the hourly data the exchange's weather data provider reports for the market's point, as available when the market is determined. That is expected about two hours after the window ends (`expected_expiration_time`), and takes longer when the data for the window arrives late. Later revisions to the data don't change the outcome.
* Precipitation totals are rounded to the nearest hundredth of an inch and temperatures to the nearest whole °F before they are compared to the threshold.
* If the provider's data for the window is missing, the exchange determines the market. `latest_expiration_time` is seven days after close.

Each market's `rules_primary` and `rules_secondary` carry the full terms.

## Weather pricing

> [!NOTE]
>
> Weather pricing is not live yet. At launch it will be released to all API users for a limited period. After that period, access may be restricted or withdrawn.

`GET /weather_point_markets/{market_ticker}/pricing` returns the weather data provider's probability that a rain market settles Yes. Makers can use it as a reference when quoting an RFQ.

```bash theme={null}
curl https://external-api.demo.kalshi.co/trade-api/v2/weather_point_markets/KXRFQRAINHOURS-40785N73965W-26NOV2005Z-24H-G2/pricing \
  -H "KALSHI-ACCESS-KEY: $KEY_ID" \
  -H "KALSHI-ACCESS-SIGNATURE: $SIGNATURE" \
  -H "KALSHI-ACCESS-TIMESTAMP: $TIMESTAMP"
```

An abbreviated example (a real response has one point per threshold):

```json theme={null}
{
  "market_ticker": "KXRFQRAINHOURS-40785N73965W-26NOV2005Z-24H-G2",
  "yes_probability": 0.3713675214,
  "exceedances": [
    {
      "request_id": "…",
      "calculation": "hourly",
      "weather_variable": "precipitation",
      "unit": "mm",
      "parameter_max": 0.254,
      "points": [
        { "threshold": 0, "probability": 1 },
        { "threshold": 3, "probability": 0.3713675214 }
      ],
      "source_model": "gefs",
      "ensemble_init_time": "2026-11-18T12:00:00",
      "ensemble_members": "30",
      "generated_at": "2026-11-18T18:55:19.925677581Z"
    }
  ]
}
```

* `yes_probability` (0 to 1) is the chance this exact market settles Yes, computed with the market's own settlement rules: an hour counts as rainy at 0.01 inch or more, totals are rounded to hundredths of an inch, `greater` is strictly above, `less` is strictly below and `between` is inclusive.
* `exceedances` carry selected fields of the provider responses behind that number. Each point is the probability that the value is at least `threshold`. For `calculation: "hourly"`, `threshold` is a number of hours and `parameter_max` is the amount, in `unit`, that makes an hour count. For `calculation: "aggregation"`, `threshold` is a total in `unit`.
* `source_model`, `ensemble_init_time` and `ensemble_members` say what the probability is based on. For a forecast they identify the run, so you can tell when it has updated. For windows priced from climatology, `source_model` is `climatology` and the other two can be empty strings.

**Which markets.** Rain markets only (`KXRFQRAINHOURS` and `KXRFQRAIN`). The market must exist and its window must not have ended.

| Status | What's going on |
| - | - |
| 404 | Not a weather market, or the market doesn't exist |
| 409 | The market can't be priced: a temperature market, a window that has ended, or a point or window the provider can't price |
| 500 | Internal error |
| 503 | Pricing is temporarily unavailable: the provider returned an error or throttled the request, or the forecast updated during it. Retry after a pause |

For 404 and 409 the reason is in the error's `message`. A 500 or 503 carries only a generic message. Requests count against your read [rate limit](https://docs.kalshi.com/getting_started/rate_limits.md).

Please note:

* The data is licensed from the provider. Use it only for quoting on Kalshi, and don't redistribute it or store it for other use.
* Responses are sent with `Cache-Control: no-store`. Fetch a fresh price for each quote.
* It is a reference, not a recommended price. You are responsible for your own quotes.

## Limits and errors

The create endpoint is charged against your write [rate limit](https://docs.kalshi.com/getting_started/rate_limits.md). Creation limits are separate from request-rate limits.

| Status | `code` | What's going on |
| - | - | - |
| 400 | `bad_request` | The body isn't valid JSON, or a field has the wrong type |
| 400 | `missing_parameters` | A required field is missing or empty |
| 400 | `invalid_parameters` | The request can't define a market: an hour or threshold out of range, a location outside coverage, an unknown time zone, or a window that has ended |
| 409 | `weather_point_market_unavailable` | Valid, but not offered: the variable isn't offered at that location, the point is over open water or outside US land, or the window starts in less than 15 minutes |
| 429 | `weather_point_market_limit_exceeded` | A creation limit was reached: the limit on new weather markets across all users in a rolling 24 hours, or 40 markets for one variable, point and window. Retrying at once doesn't help |
| 429 | `too_many_requests` | Your API rate limit |

The specific reason is in the error's `details` when there is one; a rate-limit error can come without it.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.