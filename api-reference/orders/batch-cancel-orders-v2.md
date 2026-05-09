---
url: https://docs.kalshi.com/api-reference/orders/batch-cancel-orders-v2
lastmod: 2026-05-08T15:40:01.814Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Batch Cancel Orders (V2)

> Endpoint for cancelling a batch of event-market orders using the V2 response shape. The maximum batch size scales with your tier's write budget — see [Rate Limits and Tiers](/getting_started/rate_limits).

<Note>
  **Rate limit:** 2 tokens per order in the batch — billed per item, so total cost for a batch of N cancels is N × 2. Other endpoints cost 10 tokens per request unless noted on their own page. See [Rate Limits and Tiers](/getting_started/rate_limits).
</Note>


## OpenAPI

````yaml /openapi.yaml delete /portfolio/events/orders/batched
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.16.0
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
  /portfolio/events/orders/batched:
    delete:
      tags:
        - orders
      summary: Batch Cancel Orders (V2)
      description: >-
        Endpoint for cancelling a batch of event-market orders using the V2
        response shape. The maximum batch size scales with your tier's write
        budget — see [Rate Limits and Tiers](/getting_started/rate_limits).
      operationId: BatchCancelOrdersV2
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/BatchCancelOrdersV2Request'
      responses:
        '200':
          description: Batch order cancellation completed
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BatchCancelOrdersV2Response'
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
    BatchCancelOrdersV2Request:
      type: object
      required:
        - orders
      properties:
        orders:
          type: array
          x-oapi-codegen-extra-tags:
            validate: required,dive
          description: >-
            An array of orders to cancel, each optionally specifying a
            subaccount.
          items:
            type: object
            required:
              - order_id
            properties:
              order_id:
                type: string
                description: Order ID to cancel.
              subaccount:
                type: integer
                minimum: 0
                default: 0
                description: >-
                  Optional subaccount number to use for this cancellation (0 for
                  primary, 1-32 for subaccounts).
                x-go-type-skip-optional-pointer: true
    BatchCancelOrdersV2Response:
      type: object
      required:
        - orders
      properties:
        orders:
          type: array
          items:
            type: object
            required:
              - order_id
              - reduced_by
            properties:
              order_id:
                type: string
                description: >-
                  The order ID identifying which order this entry corresponds
                  to.
              client_order_id:
                type: string
                nullable: true
              reduced_by:
                $ref: '#/components/schemas/FixedPointCount'
                description: >-
                  Number of contracts that were canceled (i.e. the remaining
                  count at time of cancellation). Zero if the cancel errored.
              ts_ms:
                type: integer
                format: int64
                nullable: true
                x-omitempty: false
                description: >-
                  Matching engine timestamp at which the cancellation was
                  processed, as Unix epoch milliseconds. Absent when the cancel
                  errored.
              error:
                allOf:
                  - $ref: '#/components/schemas/ErrorResponse'
                nullable: true
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