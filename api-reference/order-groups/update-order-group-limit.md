---
url: https://docs.kalshi.com/api-reference/order-groups/update-order-group-limit
lastmod: 2026-01-29T00:38:21.663Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Update Order Group Limit

>  Updates the order group contracts limit (rolling 15-second window). If the updated limit would immediately trigger the group, all orders in the group are canceled and the group is triggered.



## OpenAPI

````yaml openapi.yaml put /portfolio/order_groups/{order_group_id}/limit
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
  /portfolio/order_groups/{order_group_id}/limit:
    put:
      tags:
        - order-groups
      summary: Update Order Group Limit
      description: ' Updates the order group contracts limit (rolling 15-second window). If the updated limit would immediately trigger the group, all orders in the group are canceled and the group is triggered.'
      operationId: UpdateOrderGroupLimit
      parameters:
        - $ref: '#/components/parameters/OrderGroupIdPath'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateOrderGroupLimitRequest'
      responses:
        '200':
          description: Order group limit updated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/EmptyResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '404':
          $ref: '#/components/responses/NotFoundError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  parameters:
    OrderGroupIdPath:
      name: order_group_id
      in: path
      required: true
      description: Order group ID
      schema:
        type: string
  schemas:
    UpdateOrderGroupLimitRequest:
      type: object
      properties:
        contracts_limit:
          type: integer
          format: int64
          minimum: 1
          description: >-
            New maximum number of contracts that can be matched within this
            group over a rolling 15-second window. Whole contracts only. Provide
            contracts_limit or contracts_limit_fp; if both provided they must
            match.
          x-go-type-skip-optional-pointer: true
          x-oapi-codegen-extra-tags:
            validate: omitempty,gte=1
        contracts_limit_fp:
          $ref: '#/components/schemas/FixedPointCount'
          nullable: true
          description: >-
            String representation of the new maximum number of contracts that
            can be matched within this group over a rolling 15-second window
            (whole contracts only). Provide contracts_limit or
            contracts_limit_fp; if both provided they must match.
    EmptyResponse:
      type: object
      description: An empty response body
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