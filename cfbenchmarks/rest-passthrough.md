---
url: https://docs.kalshi.com/cfbenchmarks/rest-passthrough
lastmod: 2026-06-10T21:29:35.251Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# CF Benchmarks REST Passthrough

> Query CF Benchmarks REST data using your existing Kalshi API credentials

## Overview

The CF Benchmarks REST passthrough lets you query the [CF Benchmarks](https://www.cfbenchmarks.com) REST API using your existing Kalshi API credentials. Requests are authenticated the same way as any other Kalshi Trade API call, so you do not need a separate CF Benchmarks API key.

Send a request to the `/cfbenchmarks` endpoint and the path and query string are forwarded to CF Benchmarks. The upstream response is returned wrapped in a standard Kalshi `data` envelope.

## Access

The passthrough requires an authenticated Kalshi Trade API request, and it is available only to accounts with the appropriate entitlement. If you receive an authorization error and believe you should have access, contact Kalshi.

## Rate limit

Each passthrough request costs **50 tokens** from your Read bucket; the default request costs 10. At the Basic tier's 200 tokens-per-second read budget, that sustains 4 requests per second. See [Rate Limits and Tiers](/getting_started/rate_limits) for budgets and bucket behavior.

## Base URL and Path Mapping

Use the production Trade API base URL (see [API Environments](/getting_started/api_environments) for all hosts and the demo environment):

```text theme={null}
https://external-api.kalshi.com/trade-api/v2
```

Everything after `/cfbenchmarks/`, including the query string, is forwarded to the CF Benchmarks REST API at `https://www.cfbenchmarks.com/api/v1/`.

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

## Available Endpoints

The passthrough forwards any path and query parameters supported by CF Benchmarks. For the list of available endpoints, supported parameters, and index identifiers (such as `BRTI`), refer to the official [CF Benchmarks API documentation](https://docs.cfbenchmarks.com).

## Error Handling

The passthrough maps upstream conditions to standard Kalshi error responses:

| Condition                                                | Kalshi response                          |
| -------------------------------------------------------- | ---------------------------------------- |
| Resource not found upstream                              | `404 not_found`                          |
| Upstream rate limit exceeded                             | `429 too_many_requests`                  |
| Upstream authorization failure, server error, or timeout | `503 service_unavailable`                |
| Other upstream client errors                             | `400 bad_request` (with upstream detail) |
