---
url: https://docs.kalshi.com/api-reference/orders/amend-order-v2
lastmod: 2026-04-27T23:34:08.779Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Amend Order (V2)

> Endpoint for amending the price and/or remaining count of an existing event-market order using the V2 request/response shape.



## OpenAPI

````yaml /openapi.yaml post /portfolio/events/orders/{order_id}/amend
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.14.0
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
  /portfolio/events/orders/{order_id}/amend:
    post:
      tags:
        - orders
      summary: Amend Order (V2)
      description: >-
        Endpoint for amending the price and/or remaining count of an existing
        event-market order using the V2 request/response shape.
      operationId: AmendOrderV2
      parameters:
        - $ref: '#/components/parameters/OrderIdPath'
        - $ref: '#/components/parameters/SubaccountQueryDefaultPrimary'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AmendOrderV2Request'
      responses:
        '200':
          description: Order amended successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AmendOrderV2Response'
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
    OrderIdPath:
      name: order_id
      in: path
      required: true
      description: Order ID
      schema:
        type: string
    SubaccountQueryDefaultPrimary:
      name: subaccount
      in: query
      description: Subaccount number (0 for primary, 1-32 for subaccounts). Defaults to 0.
      schema:
        type: integer
  schemas:
    AmendOrderV2Request:
      type: object
      required:
        - ticker
        - side
        - price
        - count
      properties:
        ticker:
          type: string
          description: Market ticker
          x-oapi-codegen-extra-tags:
            validate: required,min=1
        side:
          $ref: '#/components/schemas/BookSide'
          description: Side of the order
          x-oapi-codegen-extra-tags:
            validate: required,oneof=bid ask
        price:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Updated price for the order in fixed-point dollars.
          x-go-type-skip-optional-pointer: true
        count:
          $ref: '#/components/schemas/FixedPointCount'
          description: String representation of the updated quantity for the order.
          x-go-type-skip-optional-pointer: true
        client_order_id:
          type: string
          description: The original client-specified order ID to be amended
          x-go-type-skip-optional-pointer: true
        updated_client_order_id:
          type: string
          description: The new client-specified order ID after amendment
          x-go-type-skip-optional-pointer: true
    AmendOrderV2Response:
      type: object
      required:
        - order_id
      properties:
        order_id:
          type: string
        client_order_id:
          type: string
        remaining_count:
          $ref: '#/components/schemas/FixedPointCount'
          nullable: true
          x-omitempty: false
          description: >-
            Number of contracts remaining after the amend. Only present when the
            amend caused a fill or changed the resting size.
        fill_count:
          $ref: '#/components/schemas/FixedPointCount'
          nullable: true
          x-omitempty: false
          description: >-
            Number of contracts filled as a result of the amend crossing the
            book. Only present when fills occurred or remaining size changed.
        average_fill_price:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          x-omitempty: false
          description: >-
            Volume-weighted average fill price for fills resulting from the
            amend. Only present when fills occurred.
    BookSide:
      type: string
      enum:
        - bid
        - ask
      description: >-
        Side of the book for an order or trade. For event markets, this refers
        to the YES leg only: `bid` means buy YES, `ask` means sell YES. (Selling
        YES is economically equivalent to buying NO at `1 - price`, but this
        endpoint quotes everything from the YES side.)
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with up to 6 decimal
        places of precision. This is the maximum supported precision; valid
        quote intervals for a given market are constrained by that market's
        price level structure.
      example: '0.5600'
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