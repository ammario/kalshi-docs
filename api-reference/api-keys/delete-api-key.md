---
url: https://docs.kalshi.com/api-reference/api-keys/delete-api-key
lastmod: 2025-11-14T19:42:41.364Z
---
# Delete API Key

>  Endpoint for deleting an existing API key.  This endpoint permanently deletes an API key. Once deleted, the key can no longer be used for authentication. This action cannot be undone.

## OpenAPI

````yaml openapi.yaml delete /api_keys/{api_key}
paths:
  path: /api_keys/{api_key}
  method: delete
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
      path:
        api_key:
          schema:
            - type: string
              required: true
              description: API key ID to delete
      query: {}
      header: {}
      cookie: {}
    body: {}
  response:
    '204':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: API key successfully deleted
        examples: {}
        description: API key successfully deleted
    '400':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Bad request - invalid API key ID
        examples: {}
        description: Bad request - invalid API key ID
    '401':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Unauthorized
        examples: {}
        description: Unauthorized
    '404':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: API key not found
        examples: {}
        description: API key not found
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