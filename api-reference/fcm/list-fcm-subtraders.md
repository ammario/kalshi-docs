---
url: https://docs.kalshi.com/api-reference/fcm/list-fcm-subtraders
lastmod: 2026-09-15T21:44:03.314Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# List FCM Subtraders

> Lists the authenticated FCM's event-contract subtraders, including accounts with
no trades. Exchange metadata is asynchronous, so newly created accounts may not
appear immediately. Trading block status includes firm-wide and Kalshi restrictions;
fcm_trading_blocked identifies the FCM's own per-subtrader restriction.




## OpenAPI

````yaml /openapi.yaml get /fcm/subtraders
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.30.0
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
  /fcm/subtraders:
    get:
      tags:
        - fcm
      summary: List FCM Subtraders
      description: >
        Lists the authenticated FCM's event-contract subtraders, including
        accounts with

        no trades. Exchange metadata is asynchronous, so newly created accounts
        may not

        appear immediately. Trading block status includes firm-wide and Kalshi
        restrictions;

        fcm_trading_blocked identifies the FCM's own per-subtrader restriction.
      operationId: ListFCMSubtraders
      responses:
        '200':
          description: Event-contract subtraders
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ListFCMSubtradersResponse'
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
    ListFCMSubtradersResponse:
      type: object
      required:
        - subtraders
      properties:
        subtraders:
          type: array
          items:
            $ref: '#/components/schemas/FCMSubtrader'
    FCMSubtrader:
      type: object
      required:
        - subtrader_id
        - exchange_indices
        - trading_blocked
        - fcm_trading_blocked
        - propagation_pending
      properties:
        subtrader_id:
          type: string
          description: Full subtrader identifier owned by the authenticated FCM.
        exchange_indices:
          type: array
          description: Exchange indices where this subtrader has been observed.
          items:
            type: integer
            format: int32
        trading_blocked:
          type: boolean
          description: >-
            Effective trading block, including firm-wide and Kalshi
            restrictions.
        fcm_trading_blocked:
          type: boolean
          description: Whether an FCM-owned per-subtrader trading block is configured.
        propagation_pending:
          type: boolean
          description: >-
            Whether a configured per-subtrader block is awaiting engine
            application.
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
      description: RSA-PSS signature of the request
    kalshiAccessTimestamp:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-TIMESTAMP
      description: Request timestamp in milliseconds

````