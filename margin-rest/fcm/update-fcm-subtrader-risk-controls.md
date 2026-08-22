---
url: https://docs.kalshi.com/margin-rest/fcm/update-fcm-subtrader-risk-controls
lastmod: 2026-08-21T22:07:02.094Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Update FCM Subtrader Risk Controls

> Sets the initial margin cap for an FCM member's subtrader on the margined exchange.



## OpenAPI

````yaml /perps_openapi.yaml put /margin/fcm/subtraders/risk_controls
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
    put:
      tags:
        - fcm
      summary: Update FCM Subtrader Risk Controls
      description: >-
        Sets the initial margin cap for an FCM member's subtrader on the
        margined exchange.
      operationId: UpdateFCMSubtraderRiskControls
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateFCMSubtraderRiskControlsRequest'
      responses:
        '200':
          description: Risk controls updated successfully
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
    UpdateFCMSubtraderRiskControlsRequest:
      type: object
      required:
        - subtrader_id
        - im_cap
      properties:
        subtrader_id:
          type: string
          description: >-
            The subtrader whose initial margin cap should be updated. Must
            belong to the requesting FCM.
        market_ticker:
          type: string
          description: Scopes the initial margin cap to this market when supplied.
          x-go-type-skip-optional-pointer: true
        asset_class:
          type: string
          description: >-
            Scopes the initial margin cap to this asset class when supplied.
            Mutually exclusive with market_ticker.
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
        im_cap:
          allOf:
            - $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            A non-negative fixed-point US dollar amount with up to 4 decimal
            places.
          pattern: ^[0-9]+(\.[0-9]{1,4})?$
          maxLength: 20
          example: '100.0000'
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