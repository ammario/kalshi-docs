---
url: https://docs.kalshi.com/margin-rest/exchange/get-exchange-status
lastmod: 2026-06-16T21:43:50.577Z
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

````