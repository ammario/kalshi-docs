---
url: https://docs.kalshi.com/margin-rest/orders/cancel-all-orders
lastmod: 2026-09-04T22:37:03.307Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Cancel All Orders

> Cancels all resting margin orders for the authenticated Direct member. If `subaccount` is omitted, matching orders may come from any subaccount. If it is provided, only orders for that subaccount are eligible. Newly placed orders may also be cancelled during the minute after the request.

<Note>
  **Rate limit:** 10 tokens per request, the same cost as cancelling one margin order. See `GET /trade-api/v2/account/endpoint_costs` for current non-default endpoint costs.
</Note>


## OpenAPI

````yaml /perps_openapi.yaml delete /margin/orders
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
  /margin/orders:
    delete:
      tags:
        - orders
      summary: Cancel All Orders
      description: >-
        Cancels all resting margin orders for the authenticated Direct member.
        If `subaccount` is omitted, matching orders may come from any
        subaccount. If it is provided, only orders for that subaccount are
        eligible. Newly placed orders may also be cancelled during the minute
        after the request.
      operationId: CancelAllMarginOrders
      parameters:
        - $ref: '#/components/parameters/SubaccountQuery'
      responses:
        '204':
          description: All matching resting margin orders were cancelled
        '401':
          $ref: '#/components/responses/UnauthorizedError'
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
    SubaccountQuery:
      name: subaccount
      in: query
      required: false
      description: >-
        Subaccount number (0 for primary, 1-63 for subaccounts). If omitted,
        defaults to all subaccounts.
      schema:
        type: integer
        minimum: 0
  responses:
    UnauthorizedError:
      description: Unauthorized - authentication required
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