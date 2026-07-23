---
url: https://docs.kalshi.com/api-reference/api-keys/get-api-keys
lastmod: 2026-07-22T14:53:03.557Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get API Keys

>  Endpoint for retrieving all API keys associated with the authenticated user.  API keys allow programmatic access to the platform without requiring username/password authentication. Each key has a unique identifier and name.



## OpenAPI

````yaml /openapi.yaml get /api_keys
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.26.0
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
          description: List of scopes granted to this API key.
          items:
            $ref: '#/components/schemas/ApiKeyScope'
        subaccount:
          type: integer
          nullable: true
          minimum: 0
          maximum: 63
          description: >-
            If set, the API key is restricted to this single sub-account and may
            only read and trade on it. Absent/null means the key is
            unrestricted.
    ApiKeyScope:
      type: string
      enum:
        - read
        - write
        - read::block_trade_accept
        - read::portfolio_balance
        - write::trade
        - write::transfer
        - write::block_trade_accept
      x-enum-varnames:
        - ApiKeyScopeRead
        - ApiKeyScopeWrite
        - ApiKeyScopeReadBlockTradeAccept
        - ApiKeyScopeReadPortfolioBalance
        - ApiKeyScopeWriteTrade
        - ApiKeyScopeWriteTransfer
        - ApiKeyScopeWriteBlockTradeAccept
      description: >-
        Scope granted to an API key. Parent scopes grant broad access; for
        example, `read` grants all read endpoints and `write` grants all write
        endpoints. Child scopes such as `read::block_trade_accept`,
        `read::portfolio_balance`, `write::trade`, `write::transfer`, and
        `write::block_trade_accept` grant only their specific endpoint group and
        can be granted without the parent scope.
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