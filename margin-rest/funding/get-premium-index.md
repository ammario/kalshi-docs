---
url: https://docs.kalshi.com/margin-rest/funding/get-premium-index
lastmod: 2026-10-05T21:05:56.281Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Premium Index

> Returns an informational per-second premium index for a market, for a window of up to one hour. Each point is the signed fraction by which the impact-price book sat above or below the underlying index at that second, before any time weighting.

**These values are for informational purposes only and may not exactly match the premium-index values used in actual funding calculations.**

A second with no measurable premium reports `0` — the book was halted, the underlying was closed, or an input was unavailable. Points are only those recorded, so the response may be sparse or empty for a range that predates the retention period or was never recorded.




## OpenAPI

````yaml /perps_openapi.yaml get /margin/funding_rates/premium_index
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
  /margin/funding_rates/premium_index:
    get:
      tags:
        - funding
      summary: Get Premium Index
      description: >
        Returns an informational per-second premium index for a market, for a
        window of up to one hour. Each point is the signed fraction by which the
        impact-price book sat above or below the underlying index at that
        second, before any time weighting.


        **These values are for informational purposes only and may not exactly
        match the premium-index values used in actual funding calculations.**


        A second with no measurable premium reports `0` — the book was halted,
        the underlying was closed, or an input was unavailable. Points are only
        those recorded, so the response may be sparse or empty for a range that
        predates the retention period or was never recorded.
      operationId: GetMarginPremiumIndex
      parameters:
        - name: ticker
          in: query
          required: true
          description: Market ticker
          schema:
            type: string
            x-go-type-skip-optional-pointer: true
            x-oapi-codegen-extra-tags:
              validate: required
        - name: start_ts
          in: query
          required: true
          description: Start of the window, inclusive (Unix timestamp in seconds).
          schema:
            type: integer
            format: int64
        - name: end_ts
          in: query
          required: true
          description: >-
            End of the window, exclusive (Unix timestamp in seconds). Must be
            after start_ts and no more than one hour later.
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: Premium index points retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarginPremiumIndexResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    GetMarginPremiumIndexResponse:
      type: object
      required:
        - points
      properties:
        points:
          type: array
          items:
            $ref: '#/components/schemas/MarginPremiumIndexPoint'
          description: Per-second premium index points, ascending by second_ts
    MarginPremiumIndexPoint:
      type: object
      required:
        - second_ts
        - premium_index
      properties:
        second_ts:
          type: string
          format: date-time
          description: The one-second bucket this point measures
        premium_index:
          type: string
          description: >-
            Signed decimal fraction of the index price, not basis points. For
            informational purposes only; may not exactly match the premium index
            used in actual funding calculations. "0" when no premium was
            measurable for that second.
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
  responses:
    BadRequestError:
      description: Bad request - invalid input
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

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.