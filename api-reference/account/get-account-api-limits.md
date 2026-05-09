---
url: https://docs.kalshi.com/api-reference/account/get-account-api-limits
lastmod: 2026-05-08T15:40:02.191Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Account API Limits

>  Endpoint to retrieve the API tier limits associated with the authenticated user.



## OpenAPI

````yaml /openapi.yaml get /account/limits
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.16.0
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
  /account/limits:
    get:
      tags:
        - account
      summary: Get Account API Limits
      description: ' Endpoint to retrieve the API tier limits associated with the authenticated user.'
      operationId: GetAccountApiLimits
      responses:
        '200':
          description: Account API tier limits retrieved successfully
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
      properties:
        usage_tier:
          type: string
          description: User's API usage tier.
        read:
          $ref: '#/components/schemas/BucketLimit'
        write:
          $ref: '#/components/schemas/BucketLimit'
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