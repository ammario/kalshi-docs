---
url: https://docs.kalshi.com/api-reference/api-keys/generate-api-key
lastmod: 2025-11-16T23:50:39.881Z
---
# Generate API Key

>  Endpoint for generating a new API key with an automatically created key pair.  This endpoint generates both a public and private RSA key pair. The public key is stored on the platform, while the private key is returned to the user and must be stored securely. The private key cannot be retrieved again.

## OpenAPI

````yaml openapi.yaml post /api_keys/generate
paths:
  path: /api_keys/generate
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
            required: true
            refIdentifier: '#/components/schemas/GenerateApiKeyRequest'
            requiredProperties:
              - name
        examples:
          example:
            value:
              name: <string>
  response:
    '201':
      application/json:
        schemaArray:
          - type: object
            properties:
              api_key_id:
                allOf:
                  - type: string
                    description: Unique identifier for the newly generated API key
              private_key:
                allOf:
                  - type: string
                    description: >-
                      RSA private key in PEM format. This must be stored
                      securely and cannot be retrieved again after this response
            refIdentifier: '#/components/schemas/GenerateApiKeyResponse'
            requiredProperties:
              - api_key_id
              - private_key
        examples:
          example:
            value:
              api_key_id: <string>
              private_key: <string>
        description: API key generated successfully
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