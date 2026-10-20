---
url: https://docs.kalshi.com/getting_started/api_environments
lastmod: 2026-10-19T21:50:46.233Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# API Environments and Endpoints

> REST and WebSocket base URLs for production and demo

Kalshi provides separate production and demo environments. Credentials are not shared between environments, so demo API keys only work against demo endpoints and production API keys only work against production endpoints.

## REST API

Use these base URLs for the Trade API:

| Environment | Recommended base URL | Also supported |
| - | - | - |
| Production | `https://external-api.kalshi.com/trade-api/v2` | `https://api.elections.kalshi.com/trade-api/v2` |
| Demo | `https://external-api.demo.kalshi.co/trade-api/v2` | `https://demo-api.kalshi.co/trade-api/v2` |

The `external-api` hosts are dedicated to the external Trade API and are the recommended hosts for API traders. The existing shared hosts remain supported for compatibility with existing clients.

<Note>
  Despite the `elections` subdomain, the production Trade API provides access to all Kalshi markets, not only election-related markets.
</Note>

## WebSocket API

Use these WebSocket URLs for the Trade API:

| Environment | Recommended URL | Also supported |
| - | - | - |
| Production | `wss://external-api-ws.kalshi.com/trade-api/ws/v2` | `wss://api.elections.kalshi.com/trade-api/ws/v2` |
| Demo | `wss://external-api-ws.demo.kalshi.co/trade-api/ws/v2` | `wss://demo-api.kalshi.co/trade-api/ws/v2` |

## External Feeds WebSocket

<Note>
  External feeds are moving to dedicated hostnames. Existing feed URLs remain
  supported during the migration.
</Note>

The dedicated feed endpoints are:

| Environment | External feeds URL |
| - | - |
| Production | `wss://external-feeds.kalshi.com/trade-api/v2/external-feeds` |
| Demo | `wss://external-feeds.demo.kalshi.co/trade-api/v2/external-feeds` |

Update your feed client's connection URL when the new endpoint is available.
Continue signing `GET /trade-api/v2/external-feeds` with the existing API-key
authentication. The path, channel entitlements, subscription messages, and
payloads do not change. The Trade API REST and standard WebSocket URLs above
are unaffected by this feed hostname change.

Server-to-server clients may omit `Origin`. Both the old and new feed Origins
are accepted during the migration window. If your client explicitly sets
`Origin` to the old feed hostname, update it along with your connection URL to
`https://external-feeds.kalshi.com` in production or
`https://external-feeds.demo.kalshi.co` in demo. This change does not require
browser clients to override their browser-managed `Origin` header.

## Private Connectivity

For participants requiring network-level isolation, Kalshi supports private connectivity to the REST and WebSocket APIs via [AWS PrivateLink](https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html). With PrivateLink, your API traffic is routed entirely within the AWS backbone and never traverses the public internet.

PrivateLink is available for the production hosts `external-api.kalshi.com` (REST) and `external-api-ws.kalshi.com` (WebSocket). The two APIs are provisioned as separate interface endpoints, each reachable over TLS on port 443. Connect to the endpoint's DNS name from within your VPC and set the matching host above as the TLS server name (SNI).

Members on the Premier tier or above can contact [institutional@kalshi.com](mailto:institutional@kalshi.com) to provision PrivateLink endpoints for their AWS account.

Members on the Prime tier or above can also contact [institutional@kalshi.com](mailto:institutional@kalshi.com) to discuss VPC peering for production WebSocket connectivity from their AWS VPC.

## Request Signing

The host does not change the signature payload. Sign the full request path from the API root, without query parameters.

For example, all of these hosts use the same signed path for an order request:

```text theme={null}
/trade-api/v2/portfolio/orders
```

If the request URL is:

```text theme={null}
https://external-api.kalshi.com/trade-api/v2/portfolio/orders?limit=5
```

sign:

```text theme={null}
/trade-api/v2/portfolio/orders
```

not the hostname and not the query string.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.