---
url: https://docs.kalshi.com/api-reference/api-keys/get-api-keys
lastmod: 2025-11-14T01:04:15.508Z
---
# Get API Keys

>  Endpoint for retrieving all API keys associated with the authenticated user.  API keys allow programmatic access to the platform without requiring username/password authentication. Each key has a unique identifier and name.

## OpenAPI

````yaml openapi.yaml get /api_keys
paths:
  path: /api_keys
  method: get
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
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              api_keys:
                allOf:
                  - type: array
                    description: List of all API keys associated with the user
                    items:
                      $ref: '#/components/schemas/ApiKey'
            refIdentifier: '#/components/schemas/GetApiKeysResponse'
            requiredProperties:
              - api_keys
        examples:
          example:
            value:
              api_keys:
                - api_key_id: <string>
                  name: <string>
        description: List of API keys retrieved successfully
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
  schemas:
    ApiKey:
      type: object
      required:
        - api_key_id
        - name
      properties:
        api_key_id:
          type: string
          description: Unique identifier for the API key
        name:
          type: string
          description: User-provided name for the API key

````