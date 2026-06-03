---
url: https://docs.kalshi.com/margin-rest/order-groups/trigger-order-group
lastmod: 2026-06-02T19:56:47.736Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Trigger Order Group

> Triggers the order group on the margin exchange, canceling all orders in the group and preventing new orders until the group is reset.



## OpenAPI

````yaml /perps_openapi.yaml put /margin/order_groups/{order_group_id}/trigger
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
  /margin/order_groups/{order_group_id}/trigger:
    put:
      tags:
        - order-groups
      summary: Trigger Order Group
      description: >-
        Triggers the order group on the margin exchange, canceling all orders in
        the group and preventing new orders until the group is reset.
      operationId: TriggerMarginOrderGroup
      parameters:
        - $ref: '#/components/parameters/OrderGroupIdPath'
        - $ref: '#/components/parameters/SubaccountQueryDefaultPrimary'
      requestBody:
        required: false
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/EmptyResponse'
      responses:
        '200':
          description: Order group triggered successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/EmptyResponse'
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
    SubaccountQueryDefaultPrimary:
      name: subaccount
      in: query
      required: false
      description: Subaccount number (0 for primary, 1-32 for subaccounts). Defaults to 0.
      schema:
        type: integer
        minimum: 0
        default: 0
  schemas:
    EmptyResponse:
      type: object
      description: An empty response body
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