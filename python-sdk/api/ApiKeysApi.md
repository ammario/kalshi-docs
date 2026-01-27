---
url: https://docs.kalshi.com/python-sdk/api/ApiKeysApi
lastmod: 2026-01-27T00:10:36.709Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# ApiKeys

> Python SDK methods for ApiKeys operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                      | HTTP request                    | Description      |
| ------------------------------------------- | ------------------------------- | ---------------- |
| [**create\_api\_key**](#create-api-key)     | **POST** /api\_keys             | Create API Key   |
| [**delete\_api\_key**](#delete-api-key)     | **DELETE** /api\_keys/{api_key} | Delete API Key   |
| [**generate\_api\_key**](#generate-api-key) | **POST** /api\_keys/generate    | Generate API Key |
| [**get\_api\_keys**](#get-api-keys)         | **GET** /api\_keys              | Get API Keys     |

# **create\_api\_key**

> CreateApiKeyResponse create\_api\_key(create\_api\_key\_request)

Create API Key

Endpoint for creating a new API key with a user-provided public key.  This endpoint allows users with Premier or Market Maker API usage levels to create API keys by providing their own RSA public key. The platform will use this public key to verify signatures on API requests.

### Parameters

| Name                          | Type                                                                                     | Description | Notes |
| ----------------------------- | ---------------------------------------------------------------------------------------- | ----------- | ----- |
| **create\_api\_key\_request** | [**CreateApiKeyRequest**](https://docs.kalshi.com/python-sdk/models/CreateApiKeyRequest) |             |       |

### Return type

[**CreateApiKeyResponse**](https://docs.kalshi.com/python-sdk/models/CreateApiKeyResponse)

### HTTP response details

| Status code | Description                              |
| ----------- | ---------------------------------------- |
| **201**     | API key created successfully             |
| **400**     | Bad request - invalid input              |
| **401**     | Unauthorized                             |
| **403**     | Forbidden - insufficient API usage level |
| **500**     | Internal server error                    |

# **delete\_api\_key**

> delete\_api\_key(api\_key)

Delete API Key

Endpoint for deleting an existing API key.  This endpoint permanently deletes an API key. Once deleted, the key can no longer be used for authentication. This action cannot be undone.

### Parameters

| Name         | Type    | Description          | Notes |
| ------------ | ------- | -------------------- | ----- |
| **api\_key** | **str** | API key ID to delete |       |

### Return type

void (empty response body)

### HTTP response details

| Status code | Description                      |
| ----------- | -------------------------------- |
| **204**     | API key successfully deleted     |
| **400**     | Bad request - invalid API key ID |
| **401**     | Unauthorized                     |
| **404**     | API key not found                |
| **500**     | Internal server error            |

# **generate\_api\_key**

> GenerateApiKeyResponse generate\_api\_key(generate\_api\_key\_request)

Generate API Key

Endpoint for generating a new API key with an automatically created key pair.  This endpoint generates both a public and private RSA key pair. The public key is stored on the platform, while the private key is returned to the user and must be stored securely. The private key cannot be retrieved again.

### Parameters

| Name                            | Type                                                                                         | Description | Notes |
| ------------------------------- | -------------------------------------------------------------------------------------------- | ----------- | ----- |
| **generate\_api\_key\_request** | [**GenerateApiKeyRequest**](https://docs.kalshi.com/python-sdk/models/GenerateApiKeyRequest) |             |       |

### Return type

[**GenerateApiKeyResponse**](https://docs.kalshi.com/python-sdk/models/GenerateApiKeyResponse)

### HTTP response details

| Status code | Description                    |
| ----------- | ------------------------------ |
| **201**     | API key generated successfully |
| **400**     | Bad request - invalid input    |
| **401**     | Unauthorized                   |
| **500**     | Internal server error          |

# **get\_api\_keys**

> GetApiKeysResponse get\_api\_keys()

Get API Keys

Endpoint for retrieving all API keys associated with the authenticated user.  API keys allow programmatic access to the platform without requiring username/password authentication. Each key has a unique identifier and name.

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetApiKeysResponse**](https://docs.kalshi.com/python-sdk/models/GetApiKeysResponse)

### HTTP response details

| Status code | Description                             |
| ----------- | --------------------------------------- |
| **200**     | List of API keys retrieved successfully |
| **401**     | Unauthorized                            |
| **500**     | Internal server error                   |
