---
url: https://docs.kalshi.com/api-reference/account/get-account-api-limits
lastmod: 2026-02-19T23:17:07.371Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Account API Limits

>  Endpoint to retrieve the API tier limits associated with the authenticated user.



## OpenAPI

````yaml openapi.yaml get /account/limits
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.8.0
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
        - read_limit
        - write_limit
      properties:
        usage_tier:
          type: string
          description: User's API usage tier
        read_limit:
          type: integer
          description: Maximum read requests per second
        write_limit:
          type: integer
          description: Maximum write requests per second
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