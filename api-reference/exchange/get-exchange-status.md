---
url: https://docs.kalshi.com/api-reference/exchange/get-exchange-status
lastmod: 2026-06-30T23:08:49.253Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Exchange Status

>  Endpoint for getting the exchange status.



## OpenAPI

````yaml /openapi.yaml get /exchange/status
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.23.0
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
  /exchange/status:
    get:
      tags:
        - exchange
      summary: Get Exchange Status
      description: ' Endpoint for getting the exchange status.'
      operationId: GetExchangeStatus
      responses:
        '200':
          description: Exchange status retrieved successfully
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
            False if the core Kalshi exchange is no longer taking any state
            changes at all. This includes but is not limited to trading, new
            users, and transfers. True unless we are under maintenance.
        trading_active:
          type: boolean
          description: >-
            True if we are currently permitting trading on the exchange. This is
            true during trading hours and false outside exchange hours. Kalshi
            reserves the right to pause at any time in case issues are detected.
        intra_exchange_transfers_active:
          type: boolean
          description: >-
            True if intra-exchange transfers are currently permitted. False when
            transfers are temporarily blocked.
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
            the default exchange index (0). Absent when the per-index breakdown
            is unavailable.
          items:
            $ref: '#/components/schemas/ExchangeIndexStatus'
    ExchangeIndexStatus:
      type: object
      required:
        - exchange_index
        - exchange_active
        - trading_active
        - intra_exchange_transfers_active
      properties:
        exchange_index:
          $ref: '#/components/schemas/ExchangeIndex'
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
      description: >-
        Identifier for an exchange shard. Defaults to 0 if unspecified. Note:
        currently only 0 supported.
      example: 0

````