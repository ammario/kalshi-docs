---
url: https://docs.kalshi.com/margin-rest/exit-triggers/cancel-cross-exit-triggers
lastmod: 2026-08-21T22:07:02.541Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Cancel Cross Exit Triggers

> Endpoint for cancelling exit triggers on a non-isolated margin position, including partial and order-anchored brackets. Succeeds even when nothing is live; use the `{trigger_id}` route to cancel a single bracket.



## OpenAPI

````yaml /perps_openapi.yaml delete /margin/cross/positions/{ticker}/exit_trigger
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
  /margin/cross/positions/{ticker}/exit_trigger:
    delete:
      tags:
        - exit-triggers
      summary: Cancel Cross Exit Triggers
      description: >-
        Endpoint for cancelling exit triggers on a non-isolated margin position,
        including partial and order-anchored brackets. Succeeds even when
        nothing is live; use the `{trigger_id}` route to cancel a single
        bracket.
      operationId: DeleteCrossMarginExitTrigger
      parameters:
        - $ref: '#/components/parameters/ExitTriggerTickerPath'
        - $ref: '#/components/parameters/SubaccountQueryDefaultPrimary'
        - $ref: '#/components/parameters/ExitTriggerKindQuery'
      responses:
        '204':
          description: Exit triggers canceled
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
        '429':
          $ref: '#/components/responses/RateLimitError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  parameters:
    ExitTriggerTickerPath:
      name: ticker
      in: path
      required: true
      description: Ticker of the market whose position the trigger protects.
      schema:
        type: string
    SubaccountQueryDefaultPrimary:
      name: subaccount
      in: query
      required: false
      description: Subaccount number (0 for primary, 1-63 for subaccounts). Defaults to 0.
      schema:
        type: integer
        minimum: 0
        default: 0
    ExitTriggerKindQuery:
      name: kind
      in: query
      required: false
      description: Restricts the request to one trigger family. Omitted covers every kind.
      schema:
        $ref: '#/components/schemas/ExitTriggerKind'
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
    RateLimitError:
      description: >-
        Rate limit exceeded. The default cost is 10 tokens per request. Use GET
        /trade-api/v2/account/endpoint_costs to list non-default endpoint costs.
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
  schemas:
    ExitTriggerKind:
      type: string
      description: >-
        Trigger family. `bracket` is a stop-loss / take-profit pair; `trailing`
        is a trailing stop whose stop level ratchets with the liquidation mark.
      enum:
        - bracket
        - trailing
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