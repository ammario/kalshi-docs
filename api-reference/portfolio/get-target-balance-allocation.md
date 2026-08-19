---
url: https://docs.kalshi.com/api-reference/portfolio/get-target-balance-allocation
lastmod: 2026-08-18T14:45:57.200Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Target Balance Allocation

> Retrieves the caller's target balance allocation across exchange indexes.




## OpenAPI

````yaml /openapi.yaml get /portfolio/target_balance_allocation
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.28.0
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
  /portfolio/target_balance_allocation:
    get:
      tags:
        - portfolio
      summary: Get Target Balance Allocation
      description: >
        Retrieves the caller's target balance allocation across exchange
        indexes.
      operationId: GetTargetBalanceAllocation
      responses:
        '200':
          description: Target balance allocation retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetTargetBalanceAllocationResponse'
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
    GetTargetBalanceAllocationResponse:
      type: object
      required:
        - allocations
      properties:
        allocations:
          type: array
          items:
            $ref: '#/components/schemas/TargetBalanceAllocation'
    TargetBalanceAllocation:
      type: object
      required:
        - exchange_index
        - percent
      properties:
        exchange_index:
          type: integer
          minimum: 0
          description: Exchange index that receives this percentage of sweepable balance
        percent:
          type: integer
          minimum: 0
          maximum: 100
          description: Target percentage of sweepable balance for the exchange index
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