---
url: https://docs.kalshi.com/typescript-sdk/api/MultivariateCollectionsApi
lastmod: 2026-01-27T23:10:51.938Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# MultivariateCollections

> TypeScript SDK methods for MultivariateCollections operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                                                                  | HTTP request                                                          | Description                                 |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------- |
| [**getMultivariateEventCollection**](#getmultivariateeventcollection)                   | **GET** /multivariate\_event\_collections/{collection_ticker}         | Get Multivariate Event Collection           |
| [**getMultivariateEventCollections**](#getmultivariateeventcollections)                 | **GET** /multivariate\_event\_collections                             | Get Multivariate Event Collections          |
| [**lookupMultivariateEventCollectionBundle**](#lookupmultivariateeventcollectionbundle) | **POST** /multivariate\_event\_collections/{collection_ticker}/lookup | Lookup Multivariate Event Collection Bundle |

# **getMultivariateEventCollection**

> GetMultivariateEventCollectionResponse getMultivariateEventCollection()

Get a single multivariate event collection by ticker

### Example

```typescript  theme={null}
import {
    MultivariateCollectionsApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new MultivariateCollectionsApi(configuration);

let collectionTicker: string; //Collection ticker (default to undefined)

const { status, data } = await apiInstance.getMultivariateEventCollection(
    collectionTicker
);
```

### Parameters

| Name                 | Type          | Description       | Notes                 |
| -------------------- | ------------- | ----------------- | --------------------- |
| **collectionTicker** | \[**string**] | Collection ticker | defaults to undefined |

### Return type

**GetMultivariateEventCollectionResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Collection retrieved successfully      | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getMultivariateEventCollections**

> GetMultivariateEventCollectionsResponse getMultivariateEventCollections()

Get all multivariate event collections

### Example

```typescript  theme={null}
import {
    MultivariateCollectionsApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new MultivariateCollectionsApi(configuration);

let status: string; //Filter by multivariate collection status (optional) (default to undefined)

const { status, data } = await apiInstance.getMultivariateEventCollections(
    status
);
```

### Parameters

| Name       | Type          | Description                              | Notes                            |
| ---------- | ------------- | ---------------------------------------- | -------------------------------- |
| **status** | \[**string**] | Filter by multivariate collection status | (optional) defaults to undefined |

### Return type

**GetMultivariateEventCollectionsResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Collections retrieved successfully     | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **lookupMultivariateEventCollectionBundle**

> LookupBundleResponse lookupMultivariateEventCollectionBundle(lookupBundleRequest)

Lookup a bundle in a multivariate event collection

### Example

```typescript  theme={null}
import {
    MultivariateCollectionsApi,
    Configuration,
    LookupBundleRequest
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new MultivariateCollectionsApi(configuration);

let collectionTicker: string; //Collection ticker (default to undefined)
let lookupBundleRequest: LookupBundleRequest; //

const { status, data } = await apiInstance.lookupMultivariateEventCollectionBundle(
    collectionTicker,
    lookupBundleRequest
);
```

### Parameters

| Name                    | Type                    | Description       | Notes                 |
| ----------------------- | ----------------------- | ----------------- | --------------------- |
| **lookupBundleRequest** | **LookupBundleRequest** |                   |                       |
| **collectionTicker**    | \[**string**]           | Collection ticker | defaults to undefined |

### Return type

**LookupBundleResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: application/json
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Bundle lookup successful               | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)
