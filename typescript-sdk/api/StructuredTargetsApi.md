---
url: https://docs.kalshi.com/typescript-sdk/api/StructuredTargetsApi
lastmod: 2025-10-07T23:32:04.324Z
---
# StructuredTargets

> TypeScript SDK methods for StructuredTargets operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                            | HTTP request                                        | Description            |
| ------------------------------------------------- | --------------------------------------------------- | ---------------------- |
| [**getStructuredTarget**](#getstructuredtarget)   | **GET** /structured\_targets/{structured_target_id} | Get Structured Target  |
| [**getStructuredTargets**](#getstructuredtargets) | **GET** /structured\_targets                        | Get Structured Targets |

# **getStructuredTarget**

> GetStructuredTargetResponse getStructuredTarget()

Get a single structured target by ID

### Example

```typescript  theme={null}
import {
    StructuredTargetsApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new StructuredTargetsApi(configuration);

let structuredTargetId: string; //Structured target ID (default to undefined)

const { status, data } = await apiInstance.getStructuredTarget(
    structuredTargetId
);
```

### Parameters

| Name                   | Type          | Description          | Notes                 |
| ---------------------- | ------------- | -------------------- | --------------------- |
| **structuredTargetId** | \[**string**] | Structured target ID | defaults to undefined |

### Return type

**GetStructuredTargetResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                              | Response headers |
| ----------- | ---------------------------------------- | ---------------- |
| **200**     | Structured target retrieved successfully | -                |
| **401**     | Unauthorized - authentication required   | -                |
| **404**     | Resource not found                       | -                |
| **500**     | Internal server error                    | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getStructuredTargets**

> GetStructuredTargetsResponse getStructuredTargets()

Get all structured targets

### Example

```typescript  theme={null}
import {
    StructuredTargetsApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new StructuredTargetsApi(configuration);

let status: string; //Filter by structured target status (optional) (default to undefined)
let pageSize: number; //Number of items per page (minimum 100, default 100) (optional) (default to 100)

const { status, data } = await apiInstance.getStructuredTargets(
    status,
    pageSize
);
```

### Parameters

| Name         | Type          | Description                                         | Notes                            |
| ------------ | ------------- | --------------------------------------------------- | -------------------------------- |
| **status**   | \[**string**] | Filter by structured target status                  | (optional) defaults to undefined |
| **pageSize** | \[**number**] | Number of items per page (minimum 100, default 100) | (optional) defaults to 100       |

### Return type

**GetStructuredTargetsResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                               | Response headers |
| ----------- | ----------------------------------------- | ---------------- |
| **200**     | Structured targets retrieved successfully | -                |
| **401**     | Unauthorized - authentication required    | -                |
| **500**     | Internal server error                     | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)
