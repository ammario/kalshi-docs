---
url: https://docs.kalshi.com/api-reference/fcm/delete-fcm-subtrader-event-contract-daily-cap
lastmod: 2026-09-14T19:37:19.906Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete FCM Subtrader Event Contract Daily Cap

> Removes the event-contract daily premium cap for an FCM member's subtrader. Removal
closes the subtrader to new orders on cap-reservation sessions — every subtrader-bound
API key — until a cap is set again. It does not stop orders your own unbound sessions
submit on the subtrader's behalf; to stop the account entirely, block subtrader trading.




## OpenAPI

````yaml /openapi.yaml delete /fcm/subtraders/event_contract_daily_cap
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
  /fcm/subtraders/event_contract_daily_cap:
    delete:
      tags:
        - fcm
      summary: Delete FCM Subtrader Event Contract Daily Cap
      description: >
        Removes the event-contract daily premium cap for an FCM member's
        subtrader. Removal

        closes the subtrader to new orders on cap-reservation sessions — every
        subtrader-bound

        API key — until a cap is set again. It does not stop orders your own
        unbound sessions

        submit on the subtrader's behalf; to stop the account entirely, block
        subtrader trading.
      operationId: DeleteFCMEventContractDailyCap
      parameters:
        - name: subtrader_id
          in: query
          required: true
          description: >-
            The subtrader whose daily cap should be removed. Must belong to the
            requesting FCM.
          schema:
            type: string
      responses:
        '200':
          description: Daily cap deleted successfully
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