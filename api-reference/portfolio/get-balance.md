---
url: https://docs.kalshi.com/api-reference/portfolio/get-balance
lastmod: 2026-10-29T03:14:18.208Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Balance

> Returns the balance and portfolio value for a member. Both values include all exchange indexes unless `exchange_index` is provided. Pass `subaccount` to use a subaccount instead of the primary account. This endpoint also accepts API keys with the 'read::portfolio_balance' scope.

**Rate limit:** this endpoint has its own bucket, separate from the Read budget. Basic and Advanced tiers may call it **1 time per second**; all higher tiers may call it **5 times per second**. The bucket holds one second of budget, so there is no burst. Calls to this endpoint do not draw down the Read budget, and other reads do not draw down this bucket. Balance only changes on fills, settlements and transfers, so react to those (for example the user fills websocket channel) instead of polling this endpoint.




## OpenAPI

````yaml /openapi.yaml get /portfolio/balance
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.35.0
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
  /portfolio/balance:
    get:
      tags:
        - portfolio
      summary: Get Balance
      description: >
        Returns the balance and portfolio value for a member. Both values
        include all exchange indexes unless `exchange_index` is provided. Pass
        `subaccount` to use a subaccount instead of the primary account. This
        endpoint also accepts API keys with the 'read::portfolio_balance' scope.


        **Rate limit:** this endpoint has its own bucket, separate from the Read
        budget. Basic and Advanced tiers may call it **1 time per second**; all
        higher tiers may call it **5 times per second**. The bucket holds one
        second of budget, so there is no burst. Calls to this endpoint do not
        draw down the Read budget, and other reads do not draw down this bucket.
        Balance only changes on fills, settlements and transfers, so react to
        those (for example the user fills websocket channel) instead of polling
        this endpoint.
      operationId: GetBalance
      parameters:
        - $ref: '#/components/parameters/SubaccountQueryDefaultPrimary'
        - name: exchange_index
          in: query
          schema:
            $ref: '#/components/schemas/ExchangeIndex'
          description: >-
            Exchange index used to scope the balance and portfolio value. If
            omitted, both include all exchange indexes.
      responses:
        '200':
          description: Balance retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetBalanceResponse'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  parameters:
    SubaccountQueryDefaultPrimary:
      name: subaccount
      in: query
      required: false
      description: >-
        Subaccount number (0 for primary, 1-63 for subaccounts). Defaults to 0.
        Subaccount-restricted API keys default to their locked subaccount and
        must omit this parameter or pass their locked subaccount.
      schema:
        type: integer
        minimum: 0
  schemas:
    ExchangeIndex:
      type: integer
      description: Identifier for an exchange shard.
      example: 0
    GetBalanceResponse:
      type: object
      required:
        - balance
        - balance_dollars
        - portfolio_value
        - updated_ts
      properties:
        balance:
          type: integer
          format: int64
          description: >-
            Member's available balance in cents for the requested account and
            exchange index. It includes all exchange indexes when
            `exchange_index` is omitted.
        balance_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Member's available balance as a fixed-point dollar string for the
            requested account and exchange index. It includes all exchange
            indexes when `exchange_index` is omitted.
        portfolio_value:
          type: integer
          format: int64
          description: >-
            Member's portfolio value in cents for the requested account and
            exchange index. It includes all exchange indexes when
            `exchange_index` is omitted.
        updated_ts:
          type: integer
          format: int64
          description: Unix timestamp of the last update to the balance.
        balance_breakdown:
          type: array
          items:
            $ref: '#/components/schemas/IndexedBalance'
          description: >-
            User balance breakdown per exchange instance, omitted only when
            using a subaccount-restricted API key.
    FixedPointDollars:
      type: string
      description: >-
        Fixed-point US dollar string. Most request fields accept 2-4 decimal
        places (e.g., "0.56", "0.5600"); responses emit up to 6. Valid quote
        intervals for a given market are constrained by that market's price
        level structure.
      example: '0.5600'
    IndexedBalance:
      type: object
      required:
        - exchange_index
        - balance
      properties:
        exchange_index:
          $ref: '#/components/schemas/ExchangeIndex'
        balance:
          $ref: '#/components/schemas/FixedPointDollars'
    ErrorResponse:
      type: object
      properties:
        code:
          type: string
          description: Error code
        message:
          type: string
          description: Human-readable error message
        details:
          type: string
          description: Additional details about the error, if available
  responses:
    UnauthorizedError:
      description: Unauthorized - authentication required
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    InternalServerError:
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
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
      description: >-
        Base64 signature of the pre-sign text (timestamp + method + path) made
        with the API key's algorithm - RSA-PSS with SHA-256 for RSA keys,
        Ed25519 for Ed25519 keys
    kalshiAccessTimestamp:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-TIMESTAMP
      description: Request timestamp in milliseconds

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.