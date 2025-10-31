# Get Volume Incentives

>  List volume incentives with optional filters. Volume incentives are rewards programs for trading activity on specific markets.

## OpenAPI

````yaml openapi.yaml get /incentive_programs
paths:
  path: /incentive_programs
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security: []
    parameters:
      path: {}
      query:
        status:
          schema:
            - type: enum<string>
              enum:
                - all
                - active
                - upcoming
                - closed
                - paid_out
              required: false
              description: >-
                Status filter. Can be "all", "active", "upcoming", "closed", or
                "paid_out". Default is "all".
        type:
          schema:
            - type: enum<string>
              enum:
                - all
                - liquidity
                - volume
              required: false
              description: >-
                Type filter. Can be "all", "liquidity", or "volume". Default is
                "all".
        limit:
          schema:
            - type: integer
              required: false
              description: >-
                Number of results per page. Defaults to 100. Maximum value is
                10000.
              maximum: 10000
              minimum: 1
        cursor:
          schema:
            - type: string
              required: false
              description: Cursor for pagination
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              incentive_programs:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/IncentiveProgram'
              next_cursor:
                allOf:
                  - type: string
                    description: Cursor for pagination to get the next page of results
            refIdentifier: '#/components/schemas/GetIncentiveProgramsResponse'
            requiredProperties:
              - incentive_programs
        examples:
          example:
            value:
              incentive_programs:
                - id: <string>
                  market_ticker: <string>
                  incentive_type: liquidity
                  start_date: '2023-11-07T05:31:56Z'
                  end_date: '2023-11-07T05:31:56Z'
                  period_reward: 123
                  paid_out: true
                  discount_factor_bps: 123
                  target_size: 123
              next_cursor: <string>
        description: Incentive programs retrieved successfully
    '400':
      application/json:
        schemaArray:
          - type: object
            properties:
              code:
                allOf:
                  - &ref_0
                    type: string
                    description: Error code
              message:
                allOf:
                  - &ref_1
                    type: string
                    description: Human-readable error message
              details:
                allOf:
                  - &ref_2
                    type: string
                    description: Additional details about the error, if available
              service:
                allOf:
                  - &ref_3
                    type: string
                    description: The name of the service that generated the error
            refIdentifier: '#/components/schemas/ErrorResponse'
        examples:
          example:
            value:
              code: <string>
              message: <string>
              details: <string>
              service: <string>
        description: Invalid request parameters
    '500':
      application/json:
        schemaArray:
          - type: object
            properties:
              code:
                allOf:
                  - *ref_0
              message:
                allOf:
                  - *ref_1
              details:
                allOf:
                  - *ref_2
              service:
                allOf:
                  - *ref_3
            refIdentifier: '#/components/schemas/ErrorResponse'
        examples:
          example:
            value:
              code: <string>
              message: <string>
              details: <string>
              service: <string>
        description: Internal server error
  deprecated: false
  type: path
components:
  schemas:
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

````