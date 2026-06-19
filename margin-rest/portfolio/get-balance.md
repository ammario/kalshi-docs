---
url: https://docs.kalshi.com/margin-rest/portfolio/get-balance
lastmod: 2026-06-18T20:42:25.243Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Balance

> Endpoint for retrieving the balance breakdown for the authenticated direct margin user. Returns cash balance (aggregate and per-subaccount), position value, total balance, and maintenance margin requirement.

<Note>
  **Rate limit:** 5 tokens per request, or 50 tokens when `compute_available_balance=true` (the available-balance computation scans all resting orders). See `GET /trade-api/v2/account/endpoint_costs` for current non-default endpoint costs.
</Note>


## OpenAPI

````yaml /perps_openapi.yaml get /margin/balance
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
  - name: fcm
    description: FCM member specific endpoints
  - name: risk
    description: Margin risk metrics, parameters, and limits
  - name: funding
    description: Funding rates and payment history
  - name: fees
    description: Margin fee schedule
paths:
  /margin/balance:
    get:
      tags:
        - portfolio
      summary: Get Balance
      description: >-
        Endpoint for retrieving the balance breakdown for the authenticated
        direct margin user. Returns cash balance (aggregate and per-subaccount),
        position value, total balance, and maintenance margin requirement.
      operationId: GetMarginBalance
      parameters:
        - name: compute_available_balance
          in: query
          required: false
          schema:
            type: boolean
            default: false
          x-go-type-skip-optional-pointer: true
          description: >-
            When true, computes available_balance per subaccount at an increased
            rate limit cost. Available balance is 0 when the flag is false or
            omitted.
      responses:
        '200':
          description: Margin balance retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarginBalanceResponse'
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
  schemas:
    GetMarginBalanceResponse:
      type: object
      required:
        - subaccount_balances
        - settled_funds
      properties:
        subaccount_balances:
          type: array
          items:
            $ref: '#/components/schemas/MarginSubaccountBalance'
          description: Per-subaccount balance breakdown
        settled_funds:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Total settled funds across all subaccounts in fixed-point dollars
    MarginSubaccountBalance:
      type: object
      required:
        - subaccount
        - position_value
        - account_equity
        - maintenance_margin
        - initial_margin
        - resting_orders_margin
        - available_balance
      properties:
        subaccount:
          type: integer
          description: The subaccount number (0 for primary, 1-63 for subaccounts)
        position_value:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Mark-to-market value of open positions for this subaccount in
            fixed-point dollars
        account_equity:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Account equity for this subaccount in fixed-point dollars. 0 for
            self clearing members.
        maintenance_margin:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Maintenance margin requirement for this subaccount in fixed-point
            dollars
        initial_margin:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Initial margin requirement for this subaccount in fixed-point
            dollars. 0 for self clearing members.
        resting_orders_margin:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Margin locked by resting orders for this subaccount in fixed-point
            dollars. 0 unless compute_available_balance is passed.
        available_balance:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Available balance for this subaccount in fixed-point dollars. 0 for
            institutional users or if compute_available_balance was not passed.
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with up to 6 decimal
        places of precision. This is the maximum supported precision; valid
        quote intervals for a given market are constrained by that market's
        price level structure.
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
        service:
          type: string
          description: The name of the service that generated the error
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