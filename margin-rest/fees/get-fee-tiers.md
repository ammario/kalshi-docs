---
url: https://docs.kalshi.com/margin-rest/fees/get-fee-tiers
lastmod: 2026-06-18T20:42:25.263Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Fee Tiers

> Endpoint for retrieving the margin fee tiers for the authenticated direct margin user. Returns a map of margin market tickers to their fee tier strings.



## OpenAPI

````yaml /perps_openapi.yaml get /margin/fee_tiers
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
  /margin/fee_tiers:
    get:
      tags:
        - fees
      summary: Get Fee Tiers
      description: >-
        Endpoint for retrieving the margin fee tiers for the authenticated
        direct margin user. Returns a map of margin market tickers to their fee
        tier strings.
      operationId: GetMarginFeeTiers
      responses:
        '200':
          description: Fee tiers retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarginFeeTiersResponse'
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
    GetMarginFeeTiersResponse:
      type: object
      required:
        - maker_fee_rates
        - taker_fee_rates
      properties:
        maker_fee_rates:
          type: object
          additionalProperties:
            type: number
            format: double
          description: >-
            A map of margin market ticker to the maker-side fee rate as a
            decimal fraction of notional (e.g. 0.0005 = 0.05% = 5 bps). Multiply
            notional by this value to compute the fee.
        taker_fee_rates:
          type: object
          additionalProperties:
            type: number
            format: double
          description: >-
            A map of margin market ticker to the taker-side fee rate as a
            decimal fraction of notional (e.g. 0.0012 = 0.12% = 12 bps).
            Multiply notional by this value to compute the fee.
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