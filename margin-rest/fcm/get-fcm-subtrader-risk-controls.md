---
url: https://docs.kalshi.com/margin-rest/fcm/get-fcm-subtrader-risk-controls
lastmod: 2026-08-17T23:23:10.791Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get FCM Subtrader Risk Controls

> Returns the initial margin caps configured for an FCM member's subtrader on the margined
exchange. A cap with no market_ticker applies across all markets; the remaining caps are
scoped to a single market each. Markets without a cap are omitted.




## OpenAPI

````yaml /perps_openapi.yaml get /margin/fcm/subtraders/risk_controls
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
    get:
      tags:
        - fcm
      summary: Get FCM Subtrader Risk Controls
      description: >
        Returns the initial margin caps configured for an FCM member's subtrader
        on the margined

        exchange. A cap with no market_ticker applies across all markets; the
        remaining caps are

        scoped to a single market each. Markets without a cap are omitted.
      operationId: GetFCMSubtraderRiskControls
      parameters:
        - name: subtrader_id
          in: query
          required: true
          description: >-
            The subtrader whose initial margin caps should be returned. Must
            belong to the requesting FCM.
          schema:
            type: string
        - name: market_ticker
          in: query
          required: false
          description: >-
            Restricts the response to the cap scoped to this market when
            supplied.
          schema:
            type: string
            x-go-type-skip-optional-pointer: true
      responses:
        '200':
          description: Risk controls retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetFCMSubtraderRiskControlsResponse'
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
    GetFCMSubtraderRiskControlsResponse:
      type: object
      required:
        - risk_controls
      properties:
        risk_controls:
          type: array
          description: One entry per configured initial margin cap.
          items:
            $ref: '#/components/schemas/FCMSubtraderRiskControls'
    FCMSubtraderRiskControls:
      type: object
      required:
        - subtrader_id
        - im_cap
      properties:
        subtrader_id:
          type: string
          description: The subtrader the initial margin cap applies to.
        market_ticker:
          type: string
          description: >-
            The market the cap is scoped to. Absent when the cap applies across
            all markets.
          x-go-type-skip-optional-pointer: true
        im_cap:
          allOf:
            - $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            A non-negative fixed-point US dollar amount with up to 4 decimal
            places.
          example: '100.0000'
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
    FixedPointDollars:
      type: string
      description: >-
        Fixed-point US dollar string. Most request fields accept 2-4 decimal
        places (e.g., "0.56", "0.5600"); responses emit up to 6. Valid quote
        intervals for a given market are constrained by that market's price
        level structure.
      example: '0.5600'
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