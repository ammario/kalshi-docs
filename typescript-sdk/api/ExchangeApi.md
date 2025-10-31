---
url: https://docs.kalshi.com/typescript-sdk/api/ExchangeApi
lastmod: 2025-10-07T23:32:04.315Z
---
# Exchange

> TypeScript SDK methods for Exchange operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                                    | HTTP request                            | Description                |
| --------------------------------------------------------- | --------------------------------------- | -------------------------- |
| [**getExchangeAnnouncements**](#getexchangeannouncements) | **GET** /exchange/announcements         | Get Exchange Announcements |
| [**getExchangeSchedule**](#getexchangeschedule)           | **GET** /exchange/schedule              | Get Exchange Schedule      |
| [**getExchangeStatus**](#getexchangestatus)               | **GET** /exchange/status                | Get Exchange Status        |
| [**getUserDataTimestamp**](#getuserdatatimestamp)         | **GET** /exchange/user\_data\_timestamp | Get User Data Timestamp    |

# **getExchangeAnnouncements**

> GetExchangeAnnouncementsResponse getExchangeAnnouncements()

Get all exchange-wide announcements

### Example

```typescript  theme={null}
import {
    ExchangeApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new ExchangeApi(configuration);

const { status, data } = await apiInstance.getExchangeAnnouncements();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**GetExchangeAnnouncementsResponse**

### Authorization

No authorization required

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                          | Response headers |
| ----------- | ------------------------------------ | ---------------- |
| **200**     | Announcements retrieved successfully | -                |
| **500**     | Internal server error                | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getExchangeSchedule**

> GetExchangeScheduleResponse getExchangeSchedule()

Get the exchange schedule

### Example

```typescript  theme={null}
import {
    ExchangeApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new ExchangeApi(configuration);

const { status, data } = await apiInstance.getExchangeSchedule();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**GetExchangeScheduleResponse**

### Authorization

No authorization required

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                     | Response headers |
| ----------- | ------------------------------- | ---------------- |
| **200**     | Schedule retrieved successfully | -                |
| **500**     | Internal server error           | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getExchangeStatus**

> ExchangeStatus getExchangeStatus()

Get the exchange status

### Example

```typescript  theme={null}
import {
    ExchangeApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new ExchangeApi(configuration);

const { status, data } = await apiInstance.getExchangeStatus();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**ExchangeStatus**

### Authorization

No authorization required

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                   | Response headers |
| ----------- | ----------------------------- | ---------------- |
| **200**     | Status retrieved successfully | -                |
| **500**     | Internal server error         | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getUserDataTimestamp**

> GetUserDataTimestampResponse getUserDataTimestamp()

There is typically a short delay before exchange events are reflected in the API endpoints. Whenever possible, combine API responses to PUT/POST/DELETE requests with websocket data to obtain the most accurate view of the exchange state. This endpoint provides an approximate indication of when the data from the following endpoints was last validated: GetBalance, GetOrder(s), GetFills, GetPositions

### Example

```typescript  theme={null}
import {
    ExchangeApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new ExchangeApi(configuration);

const { status, data } = await apiInstance.getUserDataTimestamp();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**GetUserDataTimestampResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Timestamp retrieved successfully       | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)
