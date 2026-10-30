---
url: https://docs.kalshi.com/margin-rest/exchange/get-exchange-status
lastmod: 2026-10-29T03:14:19.258Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Exchange Status

> Endpoint for getting the margin exchange status.



## OpenAPI

````yaml /perps_openapi.yaml get /margin/exchange/status
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
  - name: fcm
    description: FCM member specific endpoints
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
  - name: risk
    description: Margin risk metrics, parameters, and limits
  - name: funding
    description: Funding rates and payment history
  - name: fees
    description: Margin fee schedule
  - name: exit-triggers
    description: Stop-loss, take-profit, and trailing-stop triggers on margin positions
paths:
  /margin/exchange/status:
    get:
      tags:
        - exchange
      summary: Get Exchange Status
      description: Endpoint for getting the margin exchange status.
      operationId: GetMarginExchangeStatus
      responses:
        '200':
          description: Margin exchange status retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ExchangeStatus'
        '500':
          description: Internal server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ExchangeStatus'
        '503':
          description: Service unavailable
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ExchangeStatus'
        '504':
          description: Gateway timeout
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ExchangeStatus'
components:
  schemas:
    ExchangeStatus:
      type: object
      required:
        - exchange_active
        - trading_active
      properties:
        exchange_active:
          type: boolean
          description: >-
            False if the exchange is no longer taking any state changes at all.
            True unless under maintenance.
        trading_active:
          type: boolean
          description: >-
            True if trading is currently permitted on the exchange. False
            outside exchange hours or during pauses.
        intra_exchange_transfers_active:
          type: boolean
          description: >-
            True if intra-exchange transfers are currently permitted. False when
            transfers are temporarily blocked. The Perps exchange status never
            includes this field.
        exchange_estimated_resume_time:
          type: string
          format: date-time
          description: >-
            Estimated downtime for the current exchange maintenance window.
            However, this is not guaranteed and can be extended.
          nullable: true
        exchange_index_statuses:
          type: array
          description: >-
            Status of each exchange index. The top-level fields above reflect
            the default exchange index (0). The Perps exchange status never
            includes this field.
          items:
            $ref: '#/components/schemas/ExchangeIndexStatus'
    ExchangeIndexStatus:
      type: object
      required:
        - exchange_index
        - description
        - exchange_active
        - trading_active
        - intra_exchange_transfers_active
      properties:
        exchange_index:
          $ref: '#/components/schemas/ExchangeIndex'
        description:
          type: string
          description: Description of this exchange shard.
        exchange_active:
          type: boolean
          description: >-
            False if this exchange index is no longer taking any state changes
            at all. True unless under maintenance.
        trading_active:
          type: boolean
          description: >-
            True if trading is currently permitted on this exchange index. False
            outside exchange hours or during pauses.
        intra_exchange_transfers_active:
          type: boolean
          description: >-
            True if intra-exchange transfers are currently permitted on this
            exchange index. False when transfers are temporarily blocked.
    ExchangeIndex:
      type: integer
      description: Identifier for an exchange shard. Defaults to 0 if unspecified.
      example: 0

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.