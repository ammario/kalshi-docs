---
url: https://docs.kalshi.com/margin-rest/fcm/delete-fcm-subtrader-risk-controls
lastmod: 2026-09-03T13:47:14.383Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete FCM Subtrader Risk Controls

> Removes the initial margin cap for an FCM member's subtrader on the margined exchange.



## OpenAPI

````yaml /perps_openapi.yaml delete /margin/fcm/subtraders/risk_controls
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
  /margin/fcm/subtraders/risk_controls:
    delete:
      tags:
        - fcm
      summary: Delete FCM Subtrader Risk Controls
      description: >-
        Removes the initial margin cap for an FCM member's subtrader on the
        margined exchange.
      operationId: DeleteFCMSubtraderRiskControls
      parameters:
        - name: subtrader_id
          in: query
          required: true
          description: >-
            The subtrader whose initial margin cap should be removed. Must
            belong to the requesting FCM.
          schema:
            type: string
        - name: market_ticker
          in: query
          required: false
          description: Scopes the initial margin cap removal to this market when supplied.
          schema:
            type: string
            x-go-type-skip-optional-pointer: true
        - name: asset_class
          in: query
          required: false
          description: >-
            Scopes the initial margin cap removal to this asset class when
            supplied. Mutually exclusive with market_ticker.
          schema:
            type: string
            x-go-type-skip-optional-pointer: true
            enum:
              - Crypto
              - Equities
              - Metals
              - FX
              - Energy
              - Indices
              - Rates
              - Compute
              - GPU
      responses:
        '200':
          description: Risk controls deleted successfully
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
        '404':
          $ref: '#/components/responses/NotFoundError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    EmptyResponse:
      type: object
      description: An empty response body
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
    NotFoundError:
      description: Resource not found
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