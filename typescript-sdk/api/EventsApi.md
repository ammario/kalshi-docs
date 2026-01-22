---
url: https://docs.kalshi.com/typescript-sdk/api/EventsApi
lastmod: 2026-01-22T00:35:02.787Z
---
# Events

> TypeScript SDK methods for Events operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                    | HTTP request                            | Description        |
| ----------------------------------------- | --------------------------------------- | ------------------ |
| [**getEvent**](#getevent)                 | **GET** /events/{event_ticker}          | Get Event          |
| [**getEventMetadata**](#geteventmetadata) | **GET** /events/{event_ticker}/metadata | Get Event Metadata |
| [**getEvents**](#getevents)               | **GET** /events                         | Get Events         |

# **getEvent**

> GetEventResponse getEvent()

Get data about an event by its ticker.  An event represents a real-world occurrence that can be traded on, such as an election, sports game, or economic indicator release. Events contain one or more markets where users can place trades on different outcomes.

### Example

```typescript  theme={null}
import {
    EventsApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new EventsApi(configuration);

let eventTicker: string; //Event ticker (default to undefined)
let withNestedMarkets: boolean; //If true, markets are included within the event object. If false (default), markets are returned as a separate top-level field in the response. (optional) (default to false)

const { status, data } = await apiInstance.getEvent(
    eventTicker,
    withNestedMarkets
);
```

### Parameters

| Name                  | Type           | Description                                                                                                                                    | Notes                        |
| --------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| **eventTicker**       | \[**string**]  | Event ticker                                                                                                                                   | defaults to undefined        |
| **withNestedMarkets** | \[**boolean**] | If true, markets are included within the event object. If false (default), markets are returned as a separate top-level field in the response. | (optional) defaults to false |

### Return type

**GetEventResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Event retrieved successfully           | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getEventMetadata**

> GetEventMetadataResponse getEventMetadata()

Get metadata about an event by its ticker

### Example

```typescript  theme={null}
import {
    EventsApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new EventsApi(configuration);

let eventTicker: string; //Event ticker (default to undefined)

const { status, data } = await apiInstance.getEventMetadata(
    eventTicker
);
```

### Parameters

| Name            | Type          | Description  | Notes                 |
| --------------- | ------------- | ------------ | --------------------- |
| **eventTicker** | \[**string**] | Event ticker | defaults to undefined |

### Return type

**GetEventMetadataResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Event metadata retrieved successfully  | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getEvents**

> GetEventsResponse getEvents()

Get data about all events.  An event represents a real-world occurrence that can be traded on, such as an election, sports game, or economic indicator release. Events contain one or more markets where users can place trades on different outcomes.  This endpoint returns a paginated response. Use the 'limit' parameter to control page size (1-200, defaults to 100). The response includes a 'cursor' field - pass this value in the 'cursor' parameter of your next request to get the next page. An empty cursor indicates no more pages are available.

### Example

```typescript  theme={null}
import {
    EventsApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new EventsApi(configuration);

let limit: number; //Number of results per page. Defaults to 100. Maximum value is 200. (optional) (default to 100)
let cursor: string; //Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. (optional) (default to undefined)
let withNestedMarkets: boolean; //If true, markets are included within the event object. If false (default), markets are returned as a separate top-level field in the response. (optional) (default to false)
let status: string; //Filter by status. Possible values depend on the endpoint. (optional) (default to undefined)
let seriesTicker: string; //Filter by series ticker (optional) (default to undefined)
let minCloseTs: number; //Filter items that close after this Unix timestamp (optional) (default to undefined)

const { status, data } = await apiInstance.getEvents(
    limit,
    cursor,
    withNestedMarkets,
    status,
    seriesTicker,
    minCloseTs
);
```

### Parameters

| Name                  | Type           | Description                                                                                                                                    | Notes                            |
| --------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **limit**             | \[**number**]  | Number of results per page. Defaults to 100. Maximum value is 200.                                                                             | (optional) defaults to 100       |
| **cursor**            | \[**string**]  | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page.   | (optional) defaults to undefined |
| **withNestedMarkets** | \[**boolean**] | If true, markets are included within the event object. If false (default), markets are returned as a separate top-level field in the response. | (optional) defaults to false     |
| **status**            | \[**string**]  | Filter by status. Possible values depend on the endpoint.                                                                                      | (optional) defaults to undefined |
| **seriesTicker**      | \[**string**]  | Filter by series ticker                                                                                                                        | (optional) defaults to undefined |
| **minCloseTs**        | \[**number**]  | Filter items that close after this Unix timestamp                                                                                              | (optional) defaults to undefined |

### Return type

**GetEventsResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Events retrieved successfully          | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt