---
url: https://docs.kalshi.com/margin-rest/orders/amend-order
lastmod: 2026-07-15T15:03:20.780Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Amend Order

> Endpoint for amending the price and/or max number of fillable contracts in an existing margin order.

<Note>
  Amending a resting order preserves queue position only when the amendment decreases size. All other amendments — like increasing size or changing price forfeit queue position and place the order at the back of the queue.
</Note>


## OpenAPI

````yaml /perps_openapi.yaml post /margin/orders/{order_id}/amend
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
  /margin/orders/{order_id}/amend:
    post:
      tags:
        - orders
      summary: Amend Order
      description: >-
        Endpoint for amending the price and/or max number of fillable contracts
        in an existing margin order.
      operationId: AmendMarginOrder
      parameters:
        - $ref: '#/components/parameters/OrderIdPath'
        - $ref: '#/components/parameters/SubaccountQueryDefaultPrimary'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AmendMarginOrderRequest'
      responses:
        '200':
          description: Order amended successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AmendMarginOrderResponse'
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
      required: false
      description: Subaccount number (0 for primary, 1-63 for subaccounts). Defaults to 0.
      schema:
        type: integer
        minimum: 0
        default: 0
  schemas:
    AmendMarginOrderRequest:
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
    AmendMarginOrderResponse:
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
        average_fee_paid:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          x-omitempty: false
          description: >-
            Volume-weighted average fee paid per contract for fills resulting
            from the amend. Only present when fills occurred.
    BookSide:
      type: string
      enum:
        - bid
        - ask
      description: The side of an order or trade (bid or ask)
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
        to as "fp" in field names). Requests accept 0-2 decimal places (e.g.,
        "10", "10.0", "10.00"); responses always emit 2 decimals. Fractional
        contract values (e.g., "2.50") are supported; the minimum granularity is
        0.01 contracts.
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