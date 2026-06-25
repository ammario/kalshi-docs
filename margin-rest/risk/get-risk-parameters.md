---
url: https://docs.kalshi.com/margin-rest/risk/get-risk-parameters
lastmod: 2026-06-24T22:54:24.866Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Risk Parameters

> Returns system-wide margin risk parameters including liquidation thresholds and per-market initial margin multipliers.



## OpenAPI

````yaml /perps_openapi.yaml get /margin/risk_parameters
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
  /margin/risk_parameters:
    get:
      tags:
        - risk
      summary: Get Risk Parameters
      description: >-
        Returns system-wide margin risk parameters including liquidation
        thresholds and per-market initial margin multipliers.
      operationId: GetMarginRiskParameters
      responses:
        '200':
          description: Margin risk parameters retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarginRiskParametersResponse'
components:
  schemas:
    GetMarginRiskParametersResponse:
      type: object
      required:
        - liquidation_margin_ratio_threshold
        - queue_entry_margin_ratio_threshold
        - initial_margin_multiplier
      properties:
        liquidation_margin_ratio_threshold:
          type: number
          format: double
          description: Margin ratio at which a position is liquidated.
        queue_entry_margin_ratio_threshold:
          type: number
          format: double
          description: Margin ratio at which a position enters the liquidation queue.
        initial_margin_multiplier:
          type: object
          additionalProperties:
            type: number
            format: double
          description: >-
            Map of market ticker to initial margin multiplier. The initial
            margin requirement is the maintenance margin multiplied by this
            value.

````