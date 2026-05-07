---
url: https://docs.kalshi.com/api-reference/account/list-non-default-endpoint-costs
lastmod: 2026-05-07T01:24:56.657Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# List Non-Default Endpoint Costs

> Lists API v2 endpoints whose configured token cost differs from the default cost. Endpoints that use the default cost are omitted.



## OpenAPI

````yaml /openapi.yaml get /account/endpoint_costs
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.16.0
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
  /account/endpoint_costs:
    get:
      tags:
        - account
      summary: List Non-Default Endpoint Costs
      description: >-
        Lists API v2 endpoints whose configured token cost differs from the
        default cost. Endpoints that use the default cost are omitted.
      operationId: GetAccountEndpointCosts
      responses:
        '200':
          description: Non-default endpoint costs retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetAccountEndpointCostsResponse'
        '500':
          description: Internal server error
components:
  schemas:
    GetAccountEndpointCostsResponse:
      type: object
      required:
        - default_cost
        - endpoint_costs
      properties:
        default_cost:
          type: integer
          description: >-
            Default token cost applied to endpoints that are not listed in
            `endpoint_costs`. This is currently 10.
        endpoint_costs:
          type: array
          description: >-
            API v2 endpoints whose configured token cost differs from
            `default_cost`. Endpoints that use the default cost are omitted.
          items:
            $ref: '#/components/schemas/EndpointTokenCost'
    EndpointTokenCost:
      type: object
      required:
        - method
        - path
        - cost
      properties:
        method:
          type: string
          description: HTTP method for the endpoint.
        path:
          type: string
          description: API route path for the endpoint.
        cost:
          type: integer
          description: >-
            Configured token cost for an endpoint whose cost differs from the
            default cost.

````