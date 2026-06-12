---
url: https://docs.kalshi.com/margin-rest/account/get-perps-account-api-limits
lastmod: 2026-06-11T21:15:35.954Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Perps Account API Limits

>  Endpoint to retrieve the Perps (margin) API tier limits associated with the authenticated user.



## OpenAPI

````yaml /perps_openapi.yaml get /account/limits/perps
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
  /account/limits/perps:
    get:
      tags:
        - account
      summary: Get Perps Account API Limits
      description: ' Endpoint to retrieve the Perps (margin) API tier limits associated with the authenticated user.'
      operationId: GetPerpsAccountApiLimits
      responses:
        '200':
          description: Perps account API tier limits retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetAccountApiLimitsResponse'
        '401':
          description: Unauthorized
        '500':
          description: Internal server error
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    GetAccountApiLimitsResponse:
      type: object
      required:
        - usage_tier
        - read
        - write
        - grants
      properties:
        usage_tier:
          type: string
          description: User's API usage tier.
        read:
          $ref: '#/components/schemas/BucketLimit'
        write:
          $ref: '#/components/schemas/BucketLimit'
        grants:
          type: array
          description: >-
            The caller's active API usage level grants across exchange lanes,
            where each grant applies to its exchange_instance and usage_tier
            reflects the effective tier for the lane reported by this endpoint.
          items:
            $ref: '#/components/schemas/ApiUsageLevelGrant'
    BucketLimit:
      type: object
      description: |
        Token-bucket budget for one rate-limit bucket. Each request deducts
        tokens equal to its endpoint cost; the bucket refills at refill_rate
        tokens per second up to bucket_capacity. A request is allowed if the
        bucket holds enough tokens to cover its cost; otherwise the request
        is rejected with HTTP 429.
      required:
        - refill_rate
        - bucket_capacity
      properties:
        refill_rate:
          type: integer
          description: Tokens added to the bucket per second.
        bucket_capacity:
          type: integer
          description: |
            Maximum tokens the bucket can hold. When equal to refill_rate the
            bucket holds one second of budget; larger values represent burst
            headroom that idle clients accumulate and can spend in a single
            pulse (e.g. write buckets at non-Basic tiers hold two seconds of
            budget).
    ApiUsageLevelGrant:
      type: object
      required:
        - exchange_instance
        - level
        - source
      properties:
        exchange_instance:
          $ref: '#/components/schemas/ExchangeInstance'
        level:
          type: string
          description: API usage level this grant confers (e.g. premier, paragon, prime).
        expires_ts:
          type: integer
          format: int64
          nullable: true
          description: >-
            Unix timestamp (seconds) when the grant expires. Absent for
            permanent grants.
        source:
          type: string
          description: >-
            How the grant was created: "volume" (earned from trading volume) or
            "manual" (assigned by Kalshi).
    ExchangeInstance:
      type: string
      enum:
        - event_contract
        - margined
      description: The exchange instance type
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