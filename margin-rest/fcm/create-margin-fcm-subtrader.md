---
url: https://docs.kalshi.com/margin-rest/fcm/create-margin-fcm-subtrader
lastmod: 2026-10-05T21:05:55.887Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Create Margin FCM Subtrader

> Endpoint for FCM members to create a margin subtrader.



## OpenAPI

````yaml /perps_openapi.yaml post /margin/fcm/subtraders
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
  /margin/fcm/subtraders:
    post:
      tags:
        - fcm
      summary: Create Margin FCM Subtrader
      description: Endpoint for FCM members to create a margin subtrader.
      operationId: CreateMarginFCMSubtrader
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateMarginFCMSubtraderRequest'
      responses:
        '201':
          description: Subtrader created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateMarginFCMSubtraderResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
        '409':
          $ref: '#/components/responses/ConflictError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    CreateMarginFCMSubtraderRequest:
      type: object
      required:
        - subtrader_suffix
        - require_category_cap
      properties:
        subtrader_suffix:
          type: string
          pattern: ^[A-Za-z0-9]{1,16}$
          description: >-
            Suffix for the new subtrader. The full subtrader id is composed
            server-side as {user_id}_{subtrader_suffix}.
        require_category_cap:
          type: boolean
          x-go-type: '*bool'
          description: >-
            Required. Explicitly choose true or false. When true, ordinary
            orders require an explicit asset-class initial margin cap.
            Subtrader-wide and market caps do not satisfy this requirement.
            Dedicated liquidation remains allowed. Set only when explicitly
            creating a subtrader and cannot be changed afterward.
    CreateMarginFCMSubtraderResponse:
      type: object
      required:
        - subtrader_id
      properties:
        subtrader_id:
          type: string
          description: >-
            The full id of the created subtrader, in the form
            {user_id}_{subtrader_suffix}.
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
    ConflictError:
      description: Conflict - resource already exists or cannot be modified
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