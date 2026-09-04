---
url: https://docs.kalshi.com/margin-rest/fees/get-fee-tier-rates
lastmod: 2026-09-03T23:31:13.724Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Fee Tier Rates

> Returns the fee schedule that applies to the authenticated margin-enabled account, as tier numbers with maker and taker fee rates ordered from the entry tier upward.



## OpenAPI

````yaml /perps_openapi.yaml get /margin/fee_tier_rates
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
  /margin/fee_tier_rates:
    get:
      tags:
        - fees
      summary: Get Fee Tier Rates
      description: >-
        Returns the fee schedule that applies to the authenticated
        margin-enabled account, as tier numbers with maker and taker fee rates
        ordered from the entry tier upward.
      operationId: GetMarginFeeTierRates
      responses:
        '200':
          description: Fee tier rates retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarginFeeTierRatesResponse'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          description: The account is not margin-enabled or no fee schedule applies to it
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    GetMarginFeeTierRatesResponse:
      type: object
      required:
        - fee_tier_rates
      properties:
        fee_tier_rates:
          type: array
          items:
            $ref: '#/components/schemas/MarginFeeTierRate'
    MarginFeeTierRate:
      type: object
      required:
        - fee_schedule
        - tier
        - maker_fee_rate
        - taker_fee_rate
      properties:
        fee_schedule:
          type: string
          enum:
            - self_clearing_members
            - kalshi_prime
          description: Fee schedule containing this tier.
        tier:
          type: integer
          format: int32
          minimum: 0
          description: >-
            Stable fee tier number within the indicated fee schedule. Existing
            numbers never change when the schedule is reshaped.
        maker_fee_rate:
          type: number
          format: double
          description: >-
            Maker fee rate as a decimal fraction of notional (e.g. 0.0005 =
            0.05% = 5 bps).
        taker_fee_rate:
          type: number
          format: double
          description: >-
            Taker fee rate as a decimal fraction of notional (e.g. 0.0012 =
            0.12% = 12 bps).
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
      description: RSA-PSS signature of the request
    kalshiAccessTimestamp:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-TIMESTAMP
      description: Request timestamp in milliseconds

````