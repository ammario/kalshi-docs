---
url: https://docs.kalshi.com/api-reference/api-keys/get-api-keys
lastmod: 2026-02-15T22:56:22.404Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get API Keys

>  Endpoint for retrieving all API keys associated with the authenticated user.  API keys allow programmatic access to the platform without requiring username/password authentication. Each key has a unique identifier and name.



## OpenAPI

````yaml openapi.yaml get /api_keys
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.7.0
  description: >-
    Manually defined OpenAPI spec for endpoints being migrated to spec-first
    approach
servers:
  - url: https://api.elections.kalshi.com/trade-api/v2
    description: Production server
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
  /api_keys:
    get:
      tags:
        - api-keys
      summary: Get API Keys
      description: ' Endpoint for retrieving all API keys associated with the authenticated user.  API keys allow programmatic access to the platform without requiring username/password authentication. Each key has a unique identifier and name.'
      operationId: GetApiKeys
      responses:
        '200':
          description: List of API keys retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetApiKeysResponse'
        '401':
          description: Unauthorized
        '500':
          description: Internal server error
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    GetApiKeysResponse:
      type: object
      required:
        - api_keys
      properties:
        api_keys:
          type: array
          description: List of all API keys associated with the user
          items:
            $ref: '#/components/schemas/ApiKey'
    ApiKey:
      type: object
      required:
        - api_key_id
        - name
        - scopes
      properties:
        api_key_id:
          type: string
          description: Unique identifier for the API key
        name:
          type: string
          description: User-provided name for the API key
        scopes:
          type: array
          description: >-
            List of scopes granted to this API key. Valid values are 'read' and
            'write'.
          items:
            type: string
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