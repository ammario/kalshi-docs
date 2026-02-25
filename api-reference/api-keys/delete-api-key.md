---
url: https://docs.kalshi.com/api-reference/api-keys/delete-api-key
lastmod: 2026-02-25T02:00:19.087Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete API Key

>  Endpoint for deleting an existing API key.  This endpoint permanently deletes an API key. Once deleted, the key can no longer be used for authentication. This action cannot be undone.



## OpenAPI

````yaml openapi.yaml delete /api_keys/{api_key}
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
  /api_keys/{api_key}:
    delete:
      tags:
        - api-keys
      summary: Delete API Key
      description: ' Endpoint for deleting an existing API key.  This endpoint permanently deletes an API key. Once deleted, the key can no longer be used for authentication. This action cannot be undone.'
      operationId: DeleteApiKey
      parameters:
        - name: api_key
          in: path
          required: true
          description: API key ID to delete
          schema:
            type: string
      responses:
        '204':
          description: API key successfully deleted
        '400':
          description: Bad request - invalid API key ID
        '401':
          description: Unauthorized
        '404':
          description: API key not found
        '500':
          description: Internal server error
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
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