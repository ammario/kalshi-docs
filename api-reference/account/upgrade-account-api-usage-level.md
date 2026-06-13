---
url: https://docs.kalshi.com/api-reference/account/upgrade-account-api-usage-level
lastmod: 2026-06-12T23:36:34.945Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Upgrade Account API Usage Level

> Grants a permanent Advanced API usage-level grant. Currently only the Predictions exchange instance is supported. Criteria: at least 1 of the user's last 100 Predictions orders was created via API. Use Get Account API Limits to inspect the resulting usage tier and grants.

<Note>
  **Rate limit:** 30 tokens per request. See `GET /trade-api/v2/account/endpoint_costs` for current non-default endpoint costs.
</Note>


## OpenAPI

````yaml /openapi.yaml post /account/api_usage_level/upgrade
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.21.0
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
  /account/api_usage_level/upgrade:
    post:
      tags:
        - account
      summary: Upgrade Account API Usage Level
      description: >-
        Grants a permanent Advanced API usage-level grant. Currently only the
        Predictions exchange instance is supported. Criteria: at least 1 of the
        user's last 100 Predictions orders was created via API. Use Get Account
        API Limits to inspect the resulting usage tier and grants.
      operationId: UpgradeAccountApiUsageLevel
      responses:
        '201':
          description: Advanced API usage-level grant created or refreshed successfully
        '401':
          description: Unauthorized
        '403':
          description: >-
            No API-created order was found in the user's latest 100 Predictions
            orders
        '429':
          description: >-
            Rate limit exceeded. This endpoint costs 30 tokens and uses the
            Predictions Write bucket.
        '500':
          description: Internal server error
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
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
      description: RSA-PSS signature of the request
    kalshiAccessTimestamp:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-TIMESTAMP
      description: Request timestamp in milliseconds

````