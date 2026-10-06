---
url: https://docs.kalshi.com/margin-rest/risk/get-notional-risk-limit
lastmod: 2026-10-05T21:05:56.194Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Notional Risk Limit

> Endpoint for retrieving the notional value risk limits for the authenticated margin user.
Direct members and FCM members may read their own account's limits. For an FCM member the
account-level limit covers the whole omnibus account: exposure across all client accounts
is aggregated against it.




## OpenAPI

````yaml /perps_openapi.yaml get /margin/notional_risk_limit
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 0.0.1
  description: >-
    Manually defined OpenAPI spec for endpoints being migrated to spec-first
    approach
servers:
  - url: https://external-api.kalshi.com/trade-api/v2
    description: Production perps REST API server
  - url: https://external-api.demo.kalshi.co/trade-api/v2
    description: Demo perps REST API server
security: []
tags:
  - name: account
    description: Account information endpoints
  - name: fcm
    description: FCM member specific endpoints
  - name: exchange
    description: Exchange status and information endpoints
  - name: market
    description: Market data endpoints
  - name: orders
    description: Order management endpoints
  - name: order-groups
    description: Order group management endpoints
  - name: portfolio
    description: Portfolio and balance information endpoints
  - name: risk
    description: Margin risk metrics, parameters, and limits
  - name: funding
    description: Funding rates and payment history
  - name: fees
    description: Margin fee schedule
  - name: exit-triggers
    description: Stop-loss, take-profit, and trailing-stop triggers on margin positions
paths:
  /margin/notional_risk_limit:
    get:
      tags:
        - risk
      summary: Get Notional Risk Limit
      description: >
        Endpoint for retrieving the notional value risk limits for the
        authenticated margin user.

        Direct members and FCM members may read their own account's limits. For
        an FCM member the

        account-level limit covers the whole omnibus account: exposure across
        all client accounts

        is aggregated against it.
      operationId: GetMarginNotionalRiskLimit
      responses:
        '200':
          description: Notional risk limit retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/NotionalRiskLimitResponse'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    NotionalRiskLimitResponse:
      type: object
      required:
        - default_notional_value_risk_limit
        - notional_value_risk_limits_by_market_ticker
        - total_current_usage
        - current_usage_by_market_ticker
      properties:
        default_notional_value_risk_limit:
          type: string
          description: >-
            The notional value risk limit for the user as a fixed-point dollar
            string with 4 decimal places (e.g., "5000.0000")
          example: '5000.0000'
        notional_value_risk_limits_by_market_ticker:
          type: object
          additionalProperties:
            type: string
          description: >-
            Map of market_ticker to notional value risk limit as a fixed-point
            dollar string with 4 decimal places (e.g., "5000.0000"). If present,
            the market-level risk limit overrides the default notional value
            risk limit.
          example:
            market-abc-123: '5000.0000'
        total_current_usage:
          allOf:
            - $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            The account's current notional usage in fixed-point US dollars,
            aggregated the way the exchange checks the account-level limit: per
            market, the larger of the long side (long positions plus resting
            bids) and the short side (short positions plus resting asks), summed
            across every market the account holds positions or resting orders in
            — for an FCM, across the whole omnibus account. Every term is priced
            through the market's risk-notional model, the same pricing the
            exchange's limit check uses: the cached mark for positions and the
            limit price for resting orders. Computed from the exchange's read
            model, so it excludes orders still in flight and may slightly trail
            the engine.
          example: '1250.0000'
        current_usage_by_market_ticker:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Per-market components of total_current_usage, as fixed-point US
            dollar strings. Entries exist only for markets where the account
            holds positions or resting orders; like the total, values come from
            the exchange's read model and may slightly trail the engine.
          example:
            market-abc-123: '1250.0000'
        member_notional_value_risk_limit:
          allOf:
            - $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            The account-level notional value risk limit the member set on its
            own account (FCM members only), as a fixed-point dollar string.
            Stored separately from the Kalshi-set limit; the exchange enforces
            the smaller of the two. Absent when the member has not set one.
          example: '5000.0000'
        effective_account_notional_value_risk_limit:
          allOf:
            - $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            The account-level notional value risk limit the exchange enforces,
            as a fixed-point dollar string - the smaller of the Kalshi-set limit
            and the member-set limit, or whichever one is set. Absent when
            neither is set.
          example: '5000.0000'
    FixedPointDollars:
      type: string
      description: >-
        Fixed-point US dollar string. Most request fields accept 2-4 decimal
        places (e.g., "0.56", "0.5600"); responses emit up to 6. Valid quote
        intervals for a given market are constrained by that market's price
        level structure.
      example: '0.5600'
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
    ForbiddenError:
      description: Forbidden - insufficient permissions
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