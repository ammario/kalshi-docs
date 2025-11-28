---
url: https://docs.kalshi.com/typescript-sdk/api/ApiKeysApi
lastmod: 2025-11-23T22:54:23.875Z
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

Endpoint for creating a new API key with a user-provided public key.  This endpoint allows users with Premier or Market Maker API usage levels to create API keys by providing their own RSA public key. The platform will use this public key to verify signatures on API requests.

### Parameters

| Name                    | Type                    | Description | Notes |
| ----------------------- | ----------------------- | ----------- | ----- |
| **createApiKeyRequest** | **CreateApiKeyRequest** |             |       |

### Return type

**CreateApiKeyResponse**

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: application/json
* **Accept**: application/json

### HTTP response details

| Status code | Description                              | Response headers |
| ----------- | ---------------------------------------- | ---------------- |
| **201**     | API key created successfully             | -                |
| **400**     | Bad request - invalid input              | -                |
| **401**     | Unauthorized                             | -                |
| **403**     | Forbidden - insufficient API usage level | -                |
| **500**     | Internal server error                    | -                |

# **deleteApiKey**

> deleteApiKey()

Endpoint for deleting an existing API key.  This endpoint permanently deletes an API key. Once deleted, the key can no longer be used for authentication. This action cannot be undone.

### Parameters

| Name       | Type          | Description          | Notes                 |
| ---------- | ------------- | -------------------- | --------------------- |
| **apiKey** | \[**string**] | API key ID to delete | defaults to undefined |

### Return type

void (empty response body)

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: Not defined

### HTTP response details

| Status code | Description                      | Response headers |
| ----------- | -------------------------------- | ---------------- |
| **204**     | API key successfully deleted     | -                |
| **400**     | Bad request - invalid API key ID | -                |
| **401**     | Unauthorized                     | -                |
| **404**     | API key not found                | -                |
| **500**     | Internal server error            | -                |

# **generateApiKey**

> GenerateApiKeyResponse generateApiKey(generateApiKeyRequest)

Endpoint for generating a new API key with an automatically created key pair.  This endpoint generates both a public and private RSA key pair. The public key is stored on the platform, while the private key is returned to the user and must be stored securely. The private key cannot be retrieved again.

### Parameters

| Name                      | Type                      | Description | Notes |
| ------------------------- | ------------------------- | ----------- | ----- |
| **generateApiKeyRequest** | **GenerateApiKeyRequest** |             |       |

### Return type

**GenerateApiKeyResponse**

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: application/json
* **Accept**: application/json

### HTTP response details

| Status code | Description                    | Response headers |
| ----------- | ------------------------------ | ---------------- |
| **201**     | API key generated successfully | -                |
| **400**     | Bad request - invalid input    | -                |
| **401**     | Unauthorized                   | -                |
| **500**     | Internal server error          | -                |

# **getApiKeys**

> GetApiKeysResponse getApiKeys()

Endpoint for retrieving all API keys associated with the authenticated user.  API keys allow programmatic access to the platform without requiring username/password authentication. Each key has a unique identifier and name.

### Parameters

This endpoint does not have any parameters.

### Return type

**GetApiKeysResponse**

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                             | Response headers |
| ----------- | --------------------------------------- | ---------------- |
| **200**     | List of API keys retrieved successfully | -                |
| **401**     | Unauthorized                            | -                |
| **500**     | Internal server error                   | -                |


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt