---
url: https://docs.kalshi.com/typescript-sdk/api/SeriesApi
lastmod: 2026-01-29T00:38:37.820Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Series

> TypeScript SDK methods for Series operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                      | HTTP request             | Description          |
| ------------------------------------------- | ------------------------ | -------------------- |
| [**getSeries**](#getseries)                 | **GET** /series          | Get Series           |
| [**getSeriesByTicker**](#getseriesbyticker) | **GET** /series/{ticker} | Get Series by Ticker |

# **getSeries**

> GetSeriesResponse getSeries()

Get all market series

### Example

```typescript  theme={null}
import {
    SeriesApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new SeriesApi(configuration);

let status: string; //Filter by series status (optional) (default to undefined)

const { status, data } = await apiInstance.getSeries(
    status
);
```

### Parameters

| Name       | Type          | Description             | Notes                            |
| ---------- | ------------- | ----------------------- | -------------------------------- |
| **status** | \[**string**] | Filter by series status | (optional) defaults to undefined |

### Return type

**GetSeriesResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Series retrieved successfully          | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getSeriesByTicker**

> GetSeriesByTickerResponse getSeriesByTicker()

Get a single series by its ticker

### Example

```typescript  theme={null}
import {
    SeriesApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new SeriesApi(configuration);

let ticker: string; //The series ticker (default to undefined)

const { status, data } = await apiInstance.getSeriesByTicker(
    ticker
);
```

### Parameters

| Name       | Type          | Description       | Notes                 |
| ---------- | ------------- | ----------------- | --------------------- |
| **ticker** | \[**string**] | The series ticker | defaults to undefined |

### Return type

**GetSeriesByTickerResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Series retrieved successfully          | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)
