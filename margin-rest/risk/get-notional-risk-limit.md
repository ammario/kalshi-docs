---
url: https://docs.kalshi.com/margin-rest/risk/get-notional-risk-limit
lastmod: 2026-07-16T22:25:53.314Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Notional Risk Limit

> Endpoint for retrieving the notional value risk limit for the authenticated margin user.



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
  - name: fcm
    description: FCM member specific endpoints
  - name: risk
    description: Margin risk metrics, parameters, and limits
  - name: funding
    description: Funding rates and payment history
  - name: fees
    description: Margin fee schedule
paths:
  /margin/notional_risk_limit:
    get:
      tags:
        - risk
      summary: Get Notional Risk Limit
      description: >-
        Endpoint for retrieving the notional value risk limit for the
        authenticated margin user.
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
        service:
          type: string
          description: The name of the service that generated the error
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
      description: RSA-PSS signature of the request
    kalshiAccessTimestamp:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-TIMESTAMP
      description: Request timestamp in milliseconds

````