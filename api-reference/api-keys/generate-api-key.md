---
url: https://docs.kalshi.com/api-reference/api-keys/generate-api-key
lastmod: 2026-09-04T22:37:02.943Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Generate API Key

>  Endpoint for generating a new API key with an automatically created key pair.  This endpoint generates both a public and private RSA key pair. The public key is stored on the platform, while the private key is returned to the user and must be stored securely. The private key cannot be retrieved again.



## OpenAPI

````yaml /openapi.yaml post /api_keys/generate
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.29.0
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
  /api_keys/generate:
    post:
      tags:
        - api-keys
      summary: Generate API Key
      description: ' Endpoint for generating a new API key with an automatically created key pair.  This endpoint generates both a public and private RSA key pair. The public key is stored on the platform, while the private key is returned to the user and must be stored securely. The private key cannot be retrieved again.'
      operationId: GenerateApiKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/GenerateApiKeyRequest'
      responses:
        '201':
          description: API key generated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GenerateApiKeyResponse'
        '400':
          description: Bad request - invalid input
        '401':
          description: Unauthorized
        '403':
          description: Forbidden - fcm_subtrader_id requires an FCM member caller
        '409':
          description: >-
            Conflict - the bound FCM subtrader is not yet visible in the
            credential registry; retry after the subtrader create propagates
        '500':
          description: Internal server error
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    GenerateApiKeyRequest:
      type: object
      required:
        - name
      properties:
        name:
          type: string
          description: Name for the API key. This helps identify the key's purpose
        scopes:
          type: array
          description: >-
            List of scopes to grant to the API key. If the broad `write` parent
            scope is included, `read` must also be included. Child scopes may be
            granted without the broad parent scope. Defaults to full access
            (`read`, `write`) if not provided.
          items:
            $ref: '#/components/schemas/ApiKeyScope'
        subaccount:
          type: integer
          minimum: 0
          maximum: 63
          description: >-
            If set, restricts the API key to a single sub-account (0-63) that
            you own. A restricted key may only read and trade on that
            sub-account; it cannot act on other sub-accounts, transfer funds
            between sub-accounts, or create sub-accounts. Omit to leave the key
            unrestricted. Mutually exclusive with fcm_subtrader_id.
        fcm_subtrader_id:
          type: string
          description: >-
            FCM members only. If set, binds the API key to a single FCM
            subtrader that you own, spelled {your_user_id}_{suffix} with a
            suffix of 1-16 lowercase alphanumeric characters. The subtrader must
            already exist. A bound key is the institution's trading credential
            for that subtrader - FIX order-entry and market-data sessions, plus
            margin WebSocket sessions scoped to the subtrader's own data - and
            is denied on every REST endpoint, including key management. Mutually
            exclusive with subaccount.
    GenerateApiKeyResponse:
      type: object
      required:
        - api_key_id
        - private_key
      properties:
        api_key_id:
          type: string
          description: Unique identifier for the newly generated API key
        private_key:
          type: string
          description: >-
            RSA private key in PEM format. This must be stored securely and
            cannot be retrieved again after this response
        warning:
          type: string
          nullable: true
          description: >-
            Present only when the minted key is bound to an FCM subtrader that
            has no initial-margin cap at any scope. The mint still succeeds;
            once SMA enforcement is enabled, the subtrader's orders will be
            rejected until a cap is set.
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