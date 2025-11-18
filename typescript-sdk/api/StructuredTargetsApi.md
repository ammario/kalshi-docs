---
url: https://docs.kalshi.com/typescript-sdk/api/StructuredTargetsApi
lastmod: 2025-11-17T18:05:14.754Z
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

Endpoint for getting data about a specific structured target by its ID.

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

No authorization required

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                              | Response headers |
| ----------- | ---------------------------------------- | ---------------- |
| **200**     | Structured target retrieved successfully | -                |
| **401**     | Unauthorized                             | -                |
| **404**     | Not found                                | -                |
| **500**     | Internal server error                    | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getStructuredTargets**

> GetStructuredTargetsResponse getStructuredTargets()

Page size (min: 1, max: 2000)

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

let type: string; //Filter by structured target type (optional) (default to undefined)
let competition: string; //Filter by competition (optional) (default to undefined)
let pageSize: number; //Number of items per page (min 1, max 2000, default 100) (optional) (default to 100)
let cursor: string; //Pagination cursor (optional) (default to undefined)

const { status, data } = await apiInstance.getStructuredTargets(
    type,
    competition,
    pageSize,
    cursor
);
```

### Parameters

| Name            | Type          | Description                                             | Notes                            |
| --------------- | ------------- | ------------------------------------------------------- | -------------------------------- |
| **type**        | \[**string**] | Filter by structured target type                        | (optional) defaults to undefined |
| **competition** | \[**string**] | Filter by competition                                   | (optional) defaults to undefined |
| **pageSize**    | \[**number**] | Number of items per page (min 1, max 2000, default 100) | (optional) defaults to 100       |
| **cursor**      | \[**string**] | Pagination cursor                                       | (optional) defaults to undefined |

### Return type

**GetStructuredTargetsResponse**

### Authorization

No authorization required

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                               | Response headers |
| ----------- | ----------------------------------------- | ---------------- |
| **200**     | Structured targets retrieved successfully | -                |
| **401**     | Unauthorized                              | -                |
| **500**     | Internal server error                     | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)
