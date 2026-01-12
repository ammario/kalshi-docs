---
url: https://docs.kalshi.com/api-reference/exchange/get-exchange-status
lastmod: 2026-01-11T23:27:50.552Z
---
# Get Exchange Status

>  Endpoint for getting the exchange status.



## OpenAPI

````yaml openapi.yaml get /exchange/status
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.4.0
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
        exchange_estimated_resume_time:
          type: string
          format: date-time
          description: >-
            Estimated downtime for the current exchange maintenance window.
            However, this is not guaranteed and can be extended.
          nullable: true

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt