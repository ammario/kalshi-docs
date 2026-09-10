---
url: https://docs.kalshi.com/cfbenchmarks/rest-passthrough
lastmod: 2026-09-09T16:10:57.365Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# CF Benchmarks REST Passthrough

> Query CF Benchmarks REST data using your existing Kalshi API credentials

## Overview

The CF Benchmarks REST passthrough lets you query the [CF Benchmarks](https://www.cfbenchmarks.com) REST API using your existing Kalshi API credentials. Requests are authenticated the same way as any other Kalshi Trade API call, so you do not need a separate CF Benchmarks API key.

Send a request to the `/cfbenchmarks` endpoint and the path and supported query parameters are forwarded to CF Benchmarks. The upstream response is returned wrapped in a standard Kalshi `data` envelope.

The passthrough ignores `includeVerification`, regardless of its value, to avoid upstream verification timeouts. Optional on-chain verification data is not available through this endpoint. Other parameters, including `id` and `maxResolution`, are forwarded unchanged.

## Access

The passthrough requires an authenticated Kalshi Trade API request, and it is available only to accounts with the appropriate entitlement. If you receive an authorization error and believe you should have access, contact Kalshi.

## Coins and Index IDs

Use CF Benchmarks index IDs in the `id` query parameter. The [coin and index ID table](/websockets/cfbenchmarks-value#coins-and-index-ids) includes BNB, HYPE, NEAR, ZEC, SUI, BCH, LTC, LINK, SHIB/kSHIB, ADA, WLD, AAVE, and VVV, as well as BTC, ETH, and other coins.

For example, request BNB's latest value with:

```text theme={null}
GET /trade-api/v2/cfbenchmarks/values?id=BNBUSD_RTI
```

For kSHIB, use `id=SHIBUSD_RTI`. The response contains the raw USD price per SHIB; the passthrough does not scale it to kSHIB or a perpetual contract size.

The REST passthrough forwards index IDs to CF Benchmarks without a Kalshi coin allowlist. Data availability depends on CF Benchmarks coverage and the access enabled for Kalshi's REST integration. The table is a reference for coin symbols, not an exhaustive list of REST indices. WebSocket `indexlist` results describe the corresponding WebSocket channel; they do not limit which indices you can request over REST.

## Rate limit

Each passthrough request costs **50 tokens** from your Read bucket; the default request costs 10. At the Basic tier's 200 tokens-per-second read budget, that sustains 4 requests per second. See [Rate Limits and Tiers](/getting_started/rate_limits) for budgets and bucket behavior.

## Base URL and Path Mapping

Use the production Trade API base URL (see [API Environments](/getting_started/api_environments) for all hosts and the demo environment):

```text theme={null}
https://external-api.kalshi.com/trade-api/v2
```

Everything after `/cfbenchmarks/`, including query parameters other than `includeVerification`, is forwarded to the CF Benchmarks REST API at `https://www.cfbenchmarks.com/api/v1/`.

| Kalshi request                                  | Forwarded to                                         |
| ----------------------------------------------- | ---------------------------------------------------- |
| `GET /trade-api/v2/cfbenchmarks/values?id=BRTI` | `https://www.cfbenchmarks.com/api/v1/values?id=BRTI` |

## Authentication

Authenticate with standard Kalshi API key request signing. See [API Keys](/getting_started/api_keys) and [Quick Start: Authenticated Requests](/getting_started/quick_start_authenticated_requests) for the full signing flow.

As with all Trade API endpoints, sign the request path from the API root **without** the query string:

```text theme={null}
/trade-api/v2/cfbenchmarks/values
```

## Example

```bash theme={null}
curl "https://external-api.kalshi.com/trade-api/v2/cfbenchmarks/values?id=BRTI" \
  -H "KALSHI-ACCESS-KEY: <your-access-key>" \
  -H "KALSHI-ACCESS-SIGNATURE: <request-signature>" \
  -H "KALSHI-ACCESS-TIMESTAMP: <timestamp-ms>"
```

The raw CF Benchmarks payload is returned under the `data` field:

```json theme={null}
{
  "data": {
    "serverTime": "2019-08-13T23:30:53.992Z",
    "payload": {}
  }
}
```

## Historical Values

Historical index values are available through the same passthrough via the CF Benchmarks history endpoint. For example, to retrieve one hour of `BRTI` values:

```bash theme={null}
curl "https://external-api.kalshi.com/trade-api/v2/cfbenchmarks/history/values?id=BRTI&timespan=HOUR&timestamp=2026-08-21T14:00:00.000Z" \
  -H "KALSHI-ACCESS-KEY: <your-access-key>" \
  -H "KALSHI-ACCESS-SIGNATURE: <request-signature>" \
  -H "KALSHI-ACCESS-TIMESTAMP: <timestamp-ms>"
```

This forwards to `https://www.cfbenchmarks.com/api/v1/history/values` with the same query parameters, except for `includeVerification`. As with all passthrough requests, sign the path without the query string:

```text theme={null}
/trade-api/v2/cfbenchmarks/history/values
```

The history endpoint returns tick-level values, and some indices publish at intra-second granularity there, so a single window can contain a large number of points. For the supported indices, parameters, and granularities, refer to the official [CF Benchmarks API documentation](https://docs.cfbenchmarks.com/api/category/rest/).

## Available Endpoints

The passthrough forwards any path and query parameters supported by CF Benchmarks, except for `includeVerification`. For the list of available endpoints, supported parameters, and index identifiers (such as `BRTI`), refer to the official [CF Benchmarks API documentation](https://docs.cfbenchmarks.com/api/category/rest/).

## Error Handling

The passthrough maps upstream conditions to standard Kalshi error responses:

| Condition                                                | Kalshi response                          |
| -------------------------------------------------------- | ---------------------------------------- |
| Resource not found upstream                              | `404 not_found`                          |
| Upstream rate limit exceeded                             | `429 too_many_requests`                  |
| Upstream authorization failure, server error, or timeout | `503 service_unavailable`                |
| Other upstream client errors                             | `400 bad_request` (with upstream detail) |
