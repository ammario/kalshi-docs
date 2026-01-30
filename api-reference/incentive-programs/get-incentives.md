---
url: https://docs.kalshi.com/api-reference/incentive-programs/get-incentives
lastmod: 2026-01-30T01:58:33.833Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Incentives

>  List incentives with optional filters. Incentives are rewards programs for trading activity on specific markets.



## OpenAPI

````yaml openapi.yaml get /incentive_programs
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.6.0
  description: >-
    Manually defined OpenAPI spec for endpoints being migrated to spec-first
    approach
servers:
  - url: https://api.elections.kalshi.com/trade-api/v2
    description: Production server
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
  /incentive_programs:
    get:
      tags:
        - incentive-programs
      summary: Get Incentives
      description: ' List incentives with optional filters. Incentives are rewards programs for trading activity on specific markets.'
      operationId: GetIncentivePrograms
      parameters:
        - name: status
          in: query
          required: false
          description: >-
            Status filter. Can be "all", "active", "upcoming", "closed", or
            "paid_out". Default is "all".
          schema:
            type: string
            enum:
              - all
              - active
              - upcoming
              - closed
              - paid_out
        - name: type
          in: query
          required: false
          description: >-
            Type filter. Can be "all", "liquidity", or "volume". Default is
            "all".
          schema:
            type: string
            enum:
              - all
              - liquidity
              - volume
        - name: limit
          in: query
          required: false
          description: Number of results per page. Defaults to 100. Maximum value is 10000.
          schema:
            type: integer
            minimum: 1
            maximum: 10000
        - name: cursor
          in: query
          required: false
          description: Cursor for pagination
          schema:
            type: string
      responses:
        '200':
          description: Incentive programs retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetIncentiveProgramsResponse'
        '400':
          description: Invalid request parameters
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Internal server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
components:
  schemas:
    GetIncentiveProgramsResponse:
      type: object
      required:
        - incentive_programs
      properties:
        incentive_programs:
          type: array
          items:
            $ref: '#/components/schemas/IncentiveProgram'
        next_cursor:
          type: string
          description: Cursor for pagination to get the next page of results
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
    IncentiveProgram:
      type: object
      required:
        - id
        - market_ticker
        - incentive_type
        - start_date
        - end_date
        - period_reward
        - paid_out
      properties:
        id:
          type: string
          description: Unique identifier for the incentive program
        market_ticker:
          type: string
          description: >-
            The ticker symbol of the market associated with this incentive
            program
        incentive_type:
          type: string
          enum:
            - liquidity
            - volume
          description: Type of incentive program
        start_date:
          type: string
          format: date-time
          description: Start date of the incentive program
        end_date:
          type: string
          format: date-time
          description: End date of the incentive program
        period_reward:
          type: integer
          format: int64
          description: Total reward for the period in centi-cents
        paid_out:
          type: boolean
          description: Whether the incentive has been paid out
        discount_factor_bps:
          type: integer
          format: int32
          nullable: true
          description: Discount factor in basis points (optional)
        target_size:
          type: integer
          format: int32
          nullable: true
          description: Target size for the incentive program (optional)
        target_size_fp:
          $ref: '#/components/schemas/FixedPointCount'
          nullable: true
          description: >-
            String representation of the target size for the incentive program
            (optional)
    FixedPointCount:
      type: string
      description: >-
        Fixed-point contract count string (2 decimals, e.g., "10.00"; referred
        to as "fp" in field names). Requests accept 0–2 decimal places (e.g.,
        "10", "10.0", "10.00"); responses always emit 2 decimals. Currently only
        whole contract values are permitted, but the format supports future
        fractional precision. Integer contract count fields are legacy and will
        be deprecated; when both integer and fp fields are provided, they must
        match.
      example: '10.00'

````