---
url: https://docs.kalshi.com/api-reference/order-groups/create-order-group
lastmod: 2026-05-15T18:45:52.350Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Create Order Group

>  Creates a new order group with a contracts limit measured over a rolling 15-second window. When the limit is hit, all orders in the group are cancelled and no new orders can be placed until reset.



## OpenAPI

````yaml /openapi.yaml post /portfolio/order_groups/create
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.18.0
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
  /portfolio/order_groups/create:
    post:
      tags:
        - order-groups
      summary: Create Order Group
      description: ' Creates a new order group with a contracts limit measured over a rolling 15-second window. When the limit is hit, all orders in the group are cancelled and no new orders can be placed until reset.'
      operationId: CreateOrderGroup
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateOrderGroupRequest'
      responses:
        '201':
          description: Order group created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateOrderGroupResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    CreateOrderGroupRequest:
      type: object
      properties:
        subaccount:
          type: integer
          minimum: 0
          description: >-
            Optional subaccount number to use for this order group (0 for
            primary, 1-32 for subaccounts)
          default: 0
          x-go-type-skip-optional-pointer: true
        contracts_limit:
          type: integer
          format: int64
          minimum: 1
          description: >-
            Specifies the maximum number of contracts that can be matched within
            this group over a rolling 15-second window. Whole contracts only.
            Provide contracts_limit or contracts_limit_fp; if both provided they
            must match.
          x-go-type-skip-optional-pointer: true
          x-oapi-codegen-extra-tags:
            validate: omitempty,gte=1
        contracts_limit_fp:
          $ref: '#/components/schemas/FixedPointCount'
          nullable: true
          description: >-
            String representation of the maximum number of contracts that can be
            matched within this group over a rolling 15-second window. Provide
            contracts_limit or contracts_limit_fp; if both provided they must
            match.
        exchange_index:
          allOf:
            - $ref: '#/components/schemas/ExchangeIndex'
          default: 0
          x-go-type-skip-optional-pointer: true
    CreateOrderGroupResponse:
      type: object
      required:
        - order_group_id
        - subaccount
      properties:
        order_group_id:
          type: string
          description: The unique identifier for the created order group
        subaccount:
          type: integer
          minimum: 0
          description: >-
            Subaccount number that owns the created order group (0 for primary,
            1-32 for subaccounts).
          x-go-type-skip-optional-pointer: true
        exchange_index:
          allOf:
            - $ref: '#/components/schemas/ExchangeIndex'
          x-go-type-skip-optional-pointer: true
    FixedPointCount:
      type: string
      description: >-
        Fixed-point contract count string (2 decimals, e.g., "10.00"; referred
        to as "fp" in field names). Requests accept 0–2 decimal places (e.g.,
        "10", "10.0", "10.00"); responses always emit 2 decimals. Fractional
        contract values (e.g., "2.50") are supported on markets with fractional
        trading enabled; the minimum granularity is 0.01 contracts. Integer
        contract count fields are legacy and will be deprecated; when both
        integer and fp fields are provided, they must match.
      example: '10.00'
    ExchangeIndex:
      type: integer
      description: >-
        Identifier for an exchange shard. Defaults to 0 if unspecified. Note:
        currently only 0 supported.
      example: 0
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