---
url: https://docs.kalshi.com/api-reference/api-keys/generate-api-key
lastmod: 2026-01-14T01:04:44.864Z
---
# Generate API Key

>  Endpoint for generating a new API key with an automatically created key pair.  This endpoint generates both a public and private RSA key pair. The public key is stored on the platform, while the private key is returned to the user and must be stored securely. The private key cannot be retrieved again.



## OpenAPI

````yaml openapi.yaml post /api_keys/generate
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.5.0
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
  /api_keys/generate:
    post:
      tags:
        - api-keys
      summary: Generate API Key
      description: ' Endpoint for generating a new API key with an automatically created key pair.  This endpoint generates both a public and private RSA key pair. The public key is stored on the platform, while the private key is returned to the user and must be stored securely. The private key cannot be retrieved again.'
      operationId: GenerateApiKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/GenerateApiKeyRequest'
      responses:
        '201':
          description: API key generated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GenerateApiKeyResponse'
        '400':
          description: Bad request - invalid input
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
    GenerateApiKeyRequest:
      type: object
      required:
        - name
      properties:
        name:
          type: string
          description: Name for the API key. This helps identify the key's purpose
        scopes:
          type: array
          description: >-
            List of scopes to grant to the API key. Valid values are 'read' and
            'write'. If 'write' is included, 'read' must also be included.
            Defaults to full access (['read', 'write']) if not provided.
          items:
            type: string
    GenerateApiKeyResponse:
      type: object
      required:
        - api_key_id
        - private_key
      properties:
        api_key_id:
          type: string
          description: Unique identifier for the newly generated API key
        private_key:
          type: string
          description: >-
            RSA private key in PEM format. This must be stored securely and
            cannot be retrieved again after this response
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

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt