---
url: https://docs.kalshi.com/api-reference/portfolio/set-target-balance-allocation
lastmod: 2026-09-03T13:47:14.278Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Set Target Balance Allocation

> Replaces the caller's target balance allocation across exchange indexes.
Percentages must total 100. Passing an empty allocations array disables automatic rebalancing.




## OpenAPI

````yaml /openapi.yaml post /portfolio/target_balance_allocation
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.29.0
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
    post:
      tags:
        - portfolio
      summary: Set Target Balance Allocation
      description: >
        Replaces the caller's target balance allocation across exchange indexes.

        Percentages must total 100. Passing an empty allocations array disables
        automatic rebalancing.
      operationId: SetTargetBalanceAllocation
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SetTargetBalanceAllocationRequest'
      responses:
        '200':
          description: Target balance allocation updated successfully
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
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    SetTargetBalanceAllocationRequest:
      type: object
      required:
        - allocations
      properties:
        allocations:
          type: array
          maxItems: 101
          x-oapi-codegen-extra-tags:
            validate: max=101,dive
          items:
            $ref: '#/components/schemas/TargetBalanceAllocationInput'
        resting_margin_reservation:
          allOf:
            - $ref: '#/components/schemas/RestingMarginReservation'
          description: Defaults to `sum` when omitted.
          x-oapi-codegen-extra-tags:
            validate: omitempty,oneof=max sum
          x-go-type-skip-optional-pointer: true
    EmptyResponse:
      type: object
      description: An empty response body
    TargetBalanceAllocationInput:
      type: object
      required:
        - exchange_index
        - percent
      properties:
        exchange_index:
          type: integer
          minimum: 0
          description: Exchange index that receives this percentage of sweepable balance
          x-go-type: '*int'
          x-oapi-codegen-extra-tags:
            validate: required,gte=0
        percent:
          type: integer
          minimum: 0
          maximum: 100
          description: Target percentage of sweepable balance for the exchange index
          x-go-type: '*int'
          x-oapi-codegen-extra-tags:
            validate: required,gte=0,lte=100
    RestingMarginReservation:
      type: string
      enum:
        - max
        - sum
      x-enum-varnames:
        - RestingMarginReservationMax
        - RestingMarginReservationSum
      description: >
        Collateral an automatic rebalance leaves behind for resting orders.
        `max` reserves the

        largest single market-side commitment. `sum` reserves the summed margin
        of every resting order.
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