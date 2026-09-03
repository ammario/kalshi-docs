---
url: https://docs.kalshi.com/margin-rest/exit-triggers/cancel-cross-exit-trigger-by-id
lastmod: 2026-09-02T22:09:41.071Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Cancel Cross Exit Trigger by ID

> Endpoint for cancelling one bracket, leaving any others on the position live. Trailing stops are not addressed by id — use the collection route with `kind=trailing`.



## OpenAPI

````yaml /perps_openapi.yaml delete /margin/cross/positions/{ticker}/exit_trigger/{trigger_id}
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
  /margin/cross/positions/{ticker}/exit_trigger/{trigger_id}:
    delete:
      tags:
        - exit-triggers
      summary: Cancel Cross Exit Trigger by ID
      description: >-
        Endpoint for cancelling one bracket, leaving any others on the position
        live. Trailing stops are not addressed by id — use the collection route
        with `kind=trailing`.
      operationId: DeleteCrossMarginExitTriggerById
      parameters:
        - $ref: '#/components/parameters/ExitTriggerTickerPath'
        - $ref: '#/components/parameters/ExitTriggerIdPath'
        - $ref: '#/components/parameters/SubaccountQueryDefaultPrimary'
      responses:
        '204':
          description: Exit trigger canceled
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
        '404':
          $ref: '#/components/responses/NotFoundError'
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
    ExitTriggerIdPath:
      name: trigger_id
      in: path
      required: true
      description: Identifier of a specific exit trigger, as returned by the list endpoint.
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