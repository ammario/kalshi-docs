---
url: https://docs.kalshi.com/typescript-sdk/api/ApiKeysApi
lastmod: 2025-10-07T23:32:04.292Z
---
# ApiKeys

> TypeScript SDK methods for ApiKeys operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                | HTTP request                    | Description      |
| ------------------------------------- | ------------------------------- | ---------------- |
| [**createApiKey**](#createapikey)     | **POST** /api\_keys             | Create API Key   |
| [**deleteApiKey**](#deleteapikey)     | **DELETE** /api\_keys/{api_key} | Delete API Key   |
| [**generateApiKey**](#generateapikey) | **POST** /api\_keys/generate    | Generate API Key |
| [**getApiKeys**](#getapikeys)         | **GET** /api\_keys              | Get API Keys     |

# **createApiKey**

> CreateApiKeyResponse createApiKey(createApiKeyRequest)

Create a new API key with a user-provided public key.  This endpoint allows users with Premier or Market Maker API usage levels to create API keys by providing their own RSA public key. The platform will use this public key to verify signatures on API requests.

### Example

```typescript  theme={null}
import {
    ApiKeysApi,
    Configuration,
    CreateApiKeyRequest
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new ApiKeysApi(configuration);

let createApiKeyRequest: CreateApiKeyRequest; //

const { status, data } = await apiInstance.createApiKey(
    createApiKeyRequest
);
```

### Parameters

| Name                    | Type                    | Description | Notes |
| ----------------------- | ----------------------- | ----------- | ----- |
| **createApiKeyRequest** | **CreateApiKeyRequest** |             |       |

### Return type

**CreateApiKeyResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: application/json
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **201**     | API key created successfully           | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **403**     | Forbidden - insufficient permissions   | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **deleteApiKey**

> deleteApiKey()

Delete an existing API key.  This endpoint permanently deletes an API key. Once deleted, the key can no longer be used for authentication. This action cannot be undone.

### Example

```typescript  theme={null}
import {
    ApiKeysApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new ApiKeysApi(configuration);

let apiKey: string; //API key ID to delete (default to undefined)

const { status, data } = await apiInstance.deleteApiKey(
    apiKey
);
```

### Parameters

| Name       | Type          | Description          | Notes                 |
| ---------- | ------------- | -------------------- | --------------------- |
| **apiKey** | \[**string**] | API key ID to delete | defaults to undefined |

### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **204**     | API key successfully deleted           | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **generateApiKey**

> GenerateApiKeyResponse generateApiKey(generateApiKeyRequest)

Generate a new API key with an automatically created key pair.  This endpoint generates both a public and private RSA key pair. The public key is stored on the platform, while the private key is returned to the user and must be stored securely. The private key cannot be retrieved again.

### Example

```typescript  theme={null}
import {
    ApiKeysApi,
    Configuration,
    GenerateApiKeyRequest
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new ApiKeysApi(configuration);

let generateApiKeyRequest: GenerateApiKeyRequest; //

const { status, data } = await apiInstance.generateApiKey(
    generateApiKeyRequest
);
```

### Parameters

| Name                      | Type                      | Description | Notes |
| ------------------------- | ------------------------- | ----------- | ----- |
| **generateApiKeyRequest** | **GenerateApiKeyRequest** |             |       |

### Return type

**GenerateApiKeyResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: application/json
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **201**     | API key generated successfully         | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getApiKeys**

> GetApiKeysResponse getApiKeys()

Retrieve all API keys associated with the authenticated user.  API keys allow programmatic access to the platform without requiring username/password authentication. Each key has a unique identifier and name.

### Example

```typescript  theme={null}
import {
    ApiKeysApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new ApiKeysApi(configuration);

const { status, data } = await apiInstance.getApiKeys();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**GetApiKeysResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                             | Response headers |
| ----------- | --------------------------------------- | ---------------- |
| **200**     | List of API keys retrieved successfully | -                |
| **401**     | Unauthorized - authentication required  | -                |
| **500**     | Internal server error                   | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)
