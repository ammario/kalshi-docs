---
url: https://docs.kalshi.com/api-reference/api-keys/create-api-key
lastmod: 2026-02-17T01:07:45.215Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Create API Key

>  Endpoint for creating a new API key with a user-provided public key.  This endpoint allows users with Premier or Market Maker API usage levels to create API keys by providing their own RSA public key. The platform will use this public key to verify signatures on API requests.



## OpenAPI

````yaml openapi.yaml post /api_keys
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.7.0
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
  /api_keys:
    post:
      tags:
        - api-keys
      summary: Create API Key
      description: ' Endpoint for creating a new API key with a user-provided public key.  This endpoint allows users with Premier or Market Maker API usage levels to create API keys by providing their own RSA public key. The platform will use this public key to verify signatures on API requests.'
      operationId: CreateApiKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateApiKeyRequest'
      responses:
        '201':
          description: API key created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateApiKeyResponse'
        '400':
          description: Bad request - invalid input
        '401':
          description: Unauthorized
        '403':
          description: Forbidden - insufficient API usage level
        '500':
          description: Internal server error
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    CreateApiKeyRequest:
      type: object
      required:
        - name
        - public_key
      properties:
        name:
          type: string
          description: Name for the API key. This helps identify the key's purpose
        public_key:
          type: string
          description: >-
            RSA public key in PEM format. This will be used to verify signatures
            on API requests
        scopes:
          type: array
          description: >-
            List of scopes to grant to the API key. Valid values are 'read' and
            'write'. If 'write' is included, 'read' must also be included.
            Defaults to full access (['read', 'write']) if not provided.
          items:
            type: string
    CreateApiKeyResponse:
      type: object
      required:
        - api_key_id
      properties:
        api_key_id:
          type: string
          description: Unique identifier for the newly created API key
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