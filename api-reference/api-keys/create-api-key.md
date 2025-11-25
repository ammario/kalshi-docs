---
url: https://docs.kalshi.com/api-reference/api-keys/create-api-key
lastmod: 2025-11-25T00:26:23.544Z
---
# Create API Key

>  Endpoint for creating a new API key with a user-provided public key.  This endpoint allows users with Premier or Market Maker API usage levels to create API keys by providing their own RSA public key. The platform will use this public key to verify signatures on API requests.

## OpenAPI

````yaml openapi.yaml post /api_keys
paths:
  path: /api_keys
  method: post
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security:
      - title: kalshiAccessKey & kalshiAccessSignature & kalshiAccessTimestamp
        parameters:
          query: {}
          header:
            KALSHI-ACCESS-KEY:
              type: apiKey
              description: Your API key ID
            KALSHI-ACCESS-SIGNATURE:
              type: apiKey
              description: RSA-PSS signature of the request
            KALSHI-ACCESS-TIMESTAMP:
              type: apiKey
              description: Request timestamp in milliseconds
          cookie: {}
    parameters:
      path: {}
      query: {}
      header: {}
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              name:
                allOf:
                  - type: string
                    description: >-
                      Name for the API key. This helps identify the key's
                      purpose
              public_key:
                allOf:
                  - type: string
                    description: >-
                      RSA public key in PEM format. This will be used to verify
                      signatures on API requests
            required: true
            refIdentifier: '#/components/schemas/CreateApiKeyRequest'
            requiredProperties:
              - name
              - public_key
        examples:
          example:
            value:
              name: <string>
              public_key: <string>
  response:
    '201':
      application/json:
        schemaArray:
          - type: object
            properties:
              api_key_id:
                allOf:
                  - type: string
                    description: Unique identifier for the newly created API key
            refIdentifier: '#/components/schemas/CreateApiKeyResponse'
            requiredProperties:
              - api_key_id
        examples:
          example:
            value:
              api_key_id: <string>
        description: API key created successfully
    '400':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Bad request - invalid input
        examples: {}
        description: Bad request - invalid input
    '401':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Unauthorized
        examples: {}
        description: Unauthorized
    '403':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Forbidden - insufficient API usage level
        examples: {}
        description: Forbidden - insufficient API usage level
    '500':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Internal server error
        examples: {}
        description: Internal server error
  deprecated: false
  type: path
components:
  schemas: {}

````