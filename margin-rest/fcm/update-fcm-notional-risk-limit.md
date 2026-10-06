---
url: https://docs.kalshi.com/margin-rest/fcm/update-fcm-notional-risk-limit
lastmod: 2026-10-05T21:05:55.932Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Update FCM Notional Risk Limit

> Sets the calling FCM member's own account-level notional value risk limit on the margined
exchange. The limit is stored separately from the limit Kalshi administration sets on the
same account; the exchange accepts any value and always enforces the smaller of the two,
so this value can tighten but never raise the effective limit. As a courtesy, a value
above the current Kalshi-set limit is rejected with a 400 naming that ceiling — a larger
value would never govern. Lowering the limit cancels resting orders until the account is
back within it, exactly like an administrative lowering.




## OpenAPI

````yaml /perps_openapi.yaml put /margin/fcm/notional_risk_limit
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
  /margin/fcm/notional_risk_limit:
    put:
      tags:
        - fcm
      summary: Update FCM Notional Risk Limit
      description: >
        Sets the calling FCM member's own account-level notional value risk
        limit on the margined

        exchange. The limit is stored separately from the limit Kalshi
        administration sets on the

        same account; the exchange accepts any value and always enforces the
        smaller of the two,

        so this value can tighten but never raise the effective limit. As a
        courtesy, a value

        above the current Kalshi-set limit is rejected with a 400 naming that
        ceiling — a larger

        value would never govern. Lowering the limit cancels resting orders
        until the account is

        back within it, exactly like an administrative lowering.
      operationId: UpdateFCMNotionalRiskLimit
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateFCMNotionalRiskLimitRequest'
      responses:
        '200':
          description: Notional risk limit updated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/EmptyResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
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
    UpdateFCMNotionalRiskLimitRequest:
      type: object
      required:
        - notional_value_risk_limit
      properties:
        notional_value_risk_limit:
          allOf:
            - $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            A non-negative fixed-point US dollar amount with up to 4 decimal
            places. A value above the current Kalshi-set limit on the account
            gets a courtesy 400, since it would never govern.
          pattern: ^[0-9]+(\.[0-9]{1,4})?$
          maxLength: 20
          example: '5000.0000'
    EmptyResponse:
      type: object
      description: An empty response body
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
    BadRequestError:
      description: Bad request - invalid input
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
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