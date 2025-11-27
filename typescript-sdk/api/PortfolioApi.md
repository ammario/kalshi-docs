---
url: https://docs.kalshi.com/typescript-sdk/api/PortfolioApi
lastmod: 2025-10-07T23:32:04.330Z
---
# Portfolio

> TypeScript SDK methods for Portfolio operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                                      | HTTP request                                            | Description                   |
| ----------------------------------------------------------- | ------------------------------------------------------- | ----------------------------- |
| [**amendOrder**](#amendorder)                               | **POST** /portfolio/orders/{order_id}/amend             | Amend Order                   |
| [**batchCancelOrders**](#batchcancelorders)                 | **DELETE** /portfolio/orders/batched                    | Batch Cancel Orders           |
| [**batchCreateOrders**](#batchcreateorders)                 | **POST** /portfolio/orders/batched                      | Batch Create Orders           |
| [**cancelOrder**](#cancelorder)                             | **DELETE** /portfolio/orders/{order_id}                 | Cancel Order                  |
| [**createOrder**](#createorder)                             | **POST** /portfolio/orders                              | Create Order                  |
| [**createOrderGroup**](#createordergroup)                   | **POST** /portfolio/order\_groups/create                | Create Order Group            |
| [**decreaseOrder**](#decreaseorder)                         | **POST** /portfolio/orders/{order_id}/decrease          | Decrease Order                |
| [**deleteOrderGroup**](#deleteordergroup)                   | **DELETE** /portfolio/order\_groups/{order_group_id}    | Delete Order Group            |
| [**getBalance**](#getbalance)                               | **GET** /portfolio/balance                              | Get Balance                   |
| [**getFills**](#getfills)                                   | **GET** /portfolio/fills                                | Get Fills                     |
| [**getOrder**](#getorder)                                   | **GET** /portfolio/orders/{order_id}                    | Get Order                     |
| [**getOrderGroup**](#getordergroup)                         | **GET** /portfolio/order\_groups/{order_group_id}       | Get Order Group               |
| [**getOrderGroups**](#getordergroups)                       | **GET** /portfolio/order\_groups                        | Get Order Groups              |
| [**getOrderQueuePosition**](#getorderqueueposition)         | **GET** /portfolio/orders/{order_id}/queue\_position    | Get Order Queue Position      |
| [**getOrders**](#getorders)                                 | **GET** /portfolio/orders                               | Get Orders                    |
| [**getPositions**](#getpositions)                           | **GET** /portfolio/positions                            | Get Positions                 |
| [**getQueuePositions**](#getqueuepositions)                 | **POST** /portfolio/orders/queue\_positions             | Get Queue Positions           |
| [**getSettlements**](#getsettlements)                       | **GET** /portfolio/settlements                          | Get Settlements               |
| [**getTotalRestingOrderValue**](#gettotalrestingordervalue) | **GET** /portfolio/summary/total\_resting\_order\_value | Get Total Resting Order Value |
| [**resetOrderGroup**](#resetordergroup)                     | **PUT** /portfolio/order\_groups/{order_group_id}/reset | Reset Order Group             |

# **amendOrder**

> AmendOrderResponse amendOrder(amendOrderRequest)

Amend an existing order

### Example

```typescript  theme={null}
import {
    PortfolioApi,
    Configuration,
    AmendOrderRequest
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new PortfolioApi(configuration);

let orderId: string; //Order ID (default to undefined)
let amendOrderRequest: AmendOrderRequest; //

const { status, data } = await apiInstance.amendOrder(
    orderId,
    amendOrderRequest
);
```

### Parameters

| Name                  | Type                  | Description | Notes                 |
| --------------------- | --------------------- | ----------- | --------------------- |
| **amendOrderRequest** | **AmendOrderRequest** |             |                       |
| **orderId**           | \[**string**]         | Order ID    | defaults to undefined |

### Return type

**AmendOrderResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: application/json
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Order amended successfully             | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **batchCancelOrders**

> BatchCancelOrdersResponse batchCancelOrders(batchCancelOrdersRequest)

Cancel multiple orders in a single request

### Example

```typescript  theme={null}
import {
    PortfolioApi,
    Configuration,
    BatchCancelOrdersRequest
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new PortfolioApi(configuration);

let batchCancelOrdersRequest: BatchCancelOrdersRequest; //

const { status, data } = await apiInstance.batchCancelOrders(
    batchCancelOrdersRequest
);
```

### Parameters

| Name                         | Type                         | Description | Notes |
| ---------------------------- | ---------------------------- | ----------- | ----- |
| **batchCancelOrdersRequest** | **BatchCancelOrdersRequest** |             |       |

### Return type

**BatchCancelOrdersResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: application/json
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Batch order cancellation completed     | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **batchCreateOrders**

> BatchCreateOrdersResponse batchCreateOrders(batchCreateOrdersRequest)

Create multiple orders in a single request

### Example

```typescript  theme={null}
import {
    PortfolioApi,
    Configuration,
    BatchCreateOrdersRequest
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new PortfolioApi(configuration);

let batchCreateOrdersRequest: BatchCreateOrdersRequest; //

const { status, data } = await apiInstance.batchCreateOrders(
    batchCreateOrdersRequest
);
```

### Parameters

| Name                         | Type                         | Description | Notes |
| ---------------------------- | ---------------------------- | ----------- | ----- |
| **batchCreateOrdersRequest** | **BatchCreateOrdersRequest** |             |       |

### Return type

**BatchCreateOrdersResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: application/json
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Batch order creation completed         | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **cancelOrder**

> CancelOrderResponse cancelOrder()

Cancel an order

### Example

```typescript  theme={null}
import {
    PortfolioApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new PortfolioApi(configuration);

let orderId: string; //Order ID (default to undefined)

const { status, data } = await apiInstance.cancelOrder(
    orderId
);
```

### Parameters

| Name        | Type          | Description | Notes                 |
| ----------- | ------------- | ----------- | --------------------- |
| **orderId** | \[**string**] | Order ID    | defaults to undefined |

### Return type

**CancelOrderResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Order cancelled successfully           | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **createOrder**

> CreateOrderResponse createOrder(createOrderRequest)

Create a new order

### Example

```typescript  theme={null}
import {
    PortfolioApi,
    Configuration,
    CreateOrderRequest
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new PortfolioApi(configuration);

let createOrderRequest: CreateOrderRequest; //

const { status, data } = await apiInstance.createOrder(
    createOrderRequest
);
```

### Parameters

| Name                   | Type                   | Description | Notes |
| ---------------------- | ---------------------- | ----------- | ----- |
| **createOrderRequest** | **CreateOrderRequest** |             |       |

### Return type

**CreateOrderResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: application/json
* **Accept**: application/json

### HTTP response details

| Status code | Description                             | Response headers |
| ----------- | --------------------------------------- | ---------------- |
| **201**     | Order created successfully              | -                |
| **400**     | Bad request - invalid input             | -                |
| **401**     | Unauthorized - authentication required  | -                |
| **429**     | Too Many Requests - rate limit exceeded | -                |
| **500**     | Internal server error                   | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **createOrderGroup**

> CreateOrderGroupResponse createOrderGroup(createOrderGroupRequest)

Create a new order group

### Example

```typescript  theme={null}
import {
    PortfolioApi,
    Configuration,
    CreateOrderGroupRequest
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new PortfolioApi(configuration);

let createOrderGroupRequest: CreateOrderGroupRequest; //

const { status, data } = await apiInstance.createOrderGroup(
    createOrderGroupRequest
);
```

### Parameters

| Name                        | Type                        | Description | Notes |
| --------------------------- | --------------------------- | ----------- | ----- |
| **createOrderGroupRequest** | **CreateOrderGroupRequest** |             |       |

### Return type

**CreateOrderGroupResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: application/json
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **201**     | Order group created successfully       | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **decreaseOrder**

> DecreaseOrderResponse decreaseOrder(decreaseOrderRequest)

Decrease the size of an existing order

### Example

```typescript  theme={null}
import {
    PortfolioApi,
    Configuration,
    DecreaseOrderRequest
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new PortfolioApi(configuration);

let orderId: string; //Order ID (default to undefined)
let decreaseOrderRequest: DecreaseOrderRequest; //

const { status, data } = await apiInstance.decreaseOrder(
    orderId,
    decreaseOrderRequest
);
```

### Parameters

| Name                     | Type                     | Description | Notes                 |
| ------------------------ | ------------------------ | ----------- | --------------------- |
| **decreaseOrderRequest** | **DecreaseOrderRequest** |             |                       |
| **orderId**              | \[**string**]            | Order ID    | defaults to undefined |

### Return type

**DecreaseOrderResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: application/json
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Order decreased successfully           | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **deleteOrderGroup**

> deleteOrderGroup()

Delete an order group

### Example

```typescript  theme={null}
import {
    PortfolioApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new PortfolioApi(configuration);

let orderGroupId: string; //Order group ID (default to undefined)

const { status, data } = await apiInstance.deleteOrderGroup(
    orderGroupId
);
```

### Parameters

| Name             | Type          | Description    | Notes                 |
| ---------------- | ------------- | -------------- | --------------------- |
| **orderGroupId** | \[**string**] | Order group ID | defaults to undefined |

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
| **204**     | Order group deleted successfully       | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getBalance**

> GetBalanceResponse getBalance()

Get the user's current balance

### Example

```typescript  theme={null}
import {
    PortfolioApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new PortfolioApi(configuration);

const { status, data } = await apiInstance.getBalance();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**GetBalanceResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Balance retrieved successfully         | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getFills**

> GetFillsResponse getFills()

Get fills for the logged-in user.  A fill represents a partial or complete execution of an order. When an order matches with another order in the orderbook, a fill is created for each side of the trade.

### Example

```typescript  theme={null}
import {
    PortfolioApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new PortfolioApi(configuration);

let ticker: string; //Filter by market ticker (optional) (default to undefined)
let orderId: string; //Filter by order ID (optional) (default to undefined)
let minTs: number; //Filter items after this Unix timestamp (optional) (default to undefined)
let maxTs: number; //Filter items before this Unix timestamp (optional) (default to undefined)
let limit: number; //Number of results per page. Defaults to 100. Maximum value is 200. (optional) (default to 100)
let cursor: string; //Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. (optional) (default to undefined)

const { status, data } = await apiInstance.getFills(
    ticker,
    orderId,
    minTs,
    maxTs,
    limit,
    cursor
);
```

### Parameters

| Name        | Type          | Description                                                                                                                                  | Notes                            |
| ----------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **ticker**  | \[**string**] | Filter by market ticker                                                                                                                      | (optional) defaults to undefined |
| **orderId** | \[**string**] | Filter by order ID                                                                                                                           | (optional) defaults to undefined |
| **minTs**   | \[**number**] | Filter items after this Unix timestamp                                                                                                       | (optional) defaults to undefined |
| **maxTs**   | \[**number**] | Filter items before this Unix timestamp                                                                                                      | (optional) defaults to undefined |
| **limit**   | \[**number**] | Number of results per page. Defaults to 100. Maximum value is 200.                                                                           | (optional) defaults to 100       |
| **cursor**  | \[**string**] | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | (optional) defaults to undefined |

### Return type

**GetFillsResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Fills retrieved successfully           | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getOrder**

> GetOrderResponse getOrder()

Get a single order by ID

### Example

```typescript  theme={null}
import {
    PortfolioApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new PortfolioApi(configuration);

let orderId: string; //Order ID (default to undefined)

const { status, data } = await apiInstance.getOrder(
    orderId
);
```

### Parameters

| Name        | Type          | Description | Notes                 |
| ----------- | ------------- | ----------- | --------------------- |
| **orderId** | \[**string**] | Order ID    | defaults to undefined |

### Return type

**GetOrderResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Order retrieved successfully           | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getOrderGroup**

> GetOrderGroupResponse getOrderGroup()

Get details of a specific order group

### Example

```typescript  theme={null}
import {
    PortfolioApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new PortfolioApi(configuration);

let orderGroupId: string; //Order group ID (default to undefined)

const { status, data } = await apiInstance.getOrderGroup(
    orderGroupId
);
```

### Parameters

| Name             | Type          | Description    | Notes                 |
| ---------------- | ------------- | -------------- | --------------------- |
| **orderGroupId** | \[**string**] | Order group ID | defaults to undefined |

### Return type

**GetOrderGroupResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Order group retrieved successfully     | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getOrderGroups**

> GetOrderGroupsResponse getOrderGroups()

Get order groups for the logged-in user

### Example

```typescript  theme={null}
import {
    PortfolioApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new PortfolioApi(configuration);

let status: string; //Filter by status. Possible values depend on the endpoint. (optional) (default to undefined)
let limit: number; //Number of results per page. Defaults to 100. Maximum value is 200. (optional) (default to 100)
let cursor: string; //Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. (optional) (default to undefined)

const { status, data } = await apiInstance.getOrderGroups(
    status,
    limit,
    cursor
);
```

### Parameters

| Name       | Type          | Description                                                                                                                                  | Notes                            |
| ---------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **status** | \[**string**] | Filter by status. Possible values depend on the endpoint.                                                                                    | (optional) defaults to undefined |
| **limit**  | \[**number**] | Number of results per page. Defaults to 100. Maximum value is 200.                                                                           | (optional) defaults to 100       |
| **cursor** | \[**string**] | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | (optional) defaults to undefined |

### Return type

**GetOrderGroupsResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Order groups retrieved successfully    | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getOrderQueuePosition**

> GetOrderQueuePositionResponse getOrderQueuePosition()

Get the queue position for an order

### Example

```typescript  theme={null}
import {
    PortfolioApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new PortfolioApi(configuration);

let orderId: string; //Order ID (default to undefined)

const { status, data } = await apiInstance.getOrderQueuePosition(
    orderId
);
```

### Parameters

| Name        | Type          | Description | Notes                 |
| ----------- | ------------- | ----------- | --------------------- |
| **orderId** | \[**string**] | Order ID    | defaults to undefined |

### Return type

**GetOrderQueuePositionResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Queue position retrieved successfully  | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getOrders**

> GetOrdersResponse getOrders()

Get orders for the logged-in user

### Example

```typescript  theme={null}
import {
    PortfolioApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new PortfolioApi(configuration);

let ticker: string; //Filter by market ticker (optional) (default to undefined)
let eventTicker: string; //Filter by event ticker (optional) (default to undefined)
let minTs: number; //Filter items after this Unix timestamp (optional) (default to undefined)
let maxTs: number; //Filter items before this Unix timestamp (optional) (default to undefined)
let status: string; //Filter by status. Possible values depend on the endpoint. (optional) (default to undefined)
let limit: number; //Number of results per page. Defaults to 100. Maximum value is 200. (optional) (default to 100)
let cursor: string; //Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. (optional) (default to undefined)

const { status, data } = await apiInstance.getOrders(
    ticker,
    eventTicker,
    minTs,
    maxTs,
    status,
    limit,
    cursor
);
```

### Parameters

| Name            | Type          | Description                                                                                                                                  | Notes                            |
| --------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **ticker**      | \[**string**] | Filter by market ticker                                                                                                                      | (optional) defaults to undefined |
| **eventTicker** | \[**string**] | Filter by event ticker                                                                                                                       | (optional) defaults to undefined |
| **minTs**       | \[**number**] | Filter items after this Unix timestamp                                                                                                       | (optional) defaults to undefined |
| **maxTs**       | \[**number**] | Filter items before this Unix timestamp                                                                                                      | (optional) defaults to undefined |
| **status**      | \[**string**] | Filter by status. Possible values depend on the endpoint.                                                                                    | (optional) defaults to undefined |
| **limit**       | \[**number**] | Number of results per page. Defaults to 100. Maximum value is 200.                                                                           | (optional) defaults to 100       |
| **cursor**      | \[**string**] | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | (optional) defaults to undefined |

### Return type

**GetOrdersResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Orders retrieved successfully          | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getPositions**

> GetPositionsResponse getPositions()

Get positions for the logged-in user

### Example

```typescript  theme={null}
import {
    PortfolioApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new PortfolioApi(configuration);

let ticker: string; //Filter by market ticker (optional) (default to undefined)
let eventTicker: string; //Filter by event ticker (optional) (default to undefined)
let countDown: number; //Filter positions by minimum count down value (optional) (default to undefined)
let countUp: number; //Filter positions by minimum count up value (optional) (default to undefined)
let limit: number; //Number of results per page. Defaults to 100. Maximum value is 200. (optional) (default to 100)
let cursor: string; //Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. (optional) (default to undefined)

const { status, data } = await apiInstance.getPositions(
    ticker,
    eventTicker,
    countDown,
    countUp,
    limit,
    cursor
);
```

### Parameters

| Name            | Type          | Description                                                                                                                                  | Notes                            |
| --------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **ticker**      | \[**string**] | Filter by market ticker                                                                                                                      | (optional) defaults to undefined |
| **eventTicker** | \[**string**] | Filter by event ticker                                                                                                                       | (optional) defaults to undefined |
| **countDown**   | \[**number**] | Filter positions by minimum count down value                                                                                                 | (optional) defaults to undefined |
| **countUp**     | \[**number**] | Filter positions by minimum count up value                                                                                                   | (optional) defaults to undefined |
| **limit**       | \[**number**] | Number of results per page. Defaults to 100. Maximum value is 200.                                                                           | (optional) defaults to 100       |
| **cursor**      | \[**string**] | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | (optional) defaults to undefined |

### Return type

**GetPositionsResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Positions retrieved successfully       | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getQueuePositions**

> GetQueuePositionsResponse getQueuePositions(getQueuePositionsRequest)

Get queue positions for multiple orders

### Example

```typescript  theme={null}
import {
    PortfolioApi,
    Configuration,
    GetQueuePositionsRequest
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new PortfolioApi(configuration);

let getQueuePositionsRequest: GetQueuePositionsRequest; //

const { status, data } = await apiInstance.getQueuePositions(
    getQueuePositionsRequest
);
```

### Parameters

| Name                         | Type                         | Description | Notes |
| ---------------------------- | ---------------------------- | ----------- | ----- |
| **getQueuePositionsRequest** | **GetQueuePositionsRequest** |             |       |

### Return type

**GetQueuePositionsResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: application/json
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Queue positions retrieved successfully | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getSettlements**

> GetSettlementsResponse getSettlements()

Get settlements for the logged-in user

### Example

```typescript  theme={null}
import {
    PortfolioApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new PortfolioApi(configuration);

let limit: number; //Number of results per page. Defaults to 100. Maximum value is 200. (optional) (default to 100)
let cursor: string; //Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. (optional) (default to undefined)

const { status, data } = await apiInstance.getSettlements(
    limit,
    cursor
);
```

### Parameters

| Name       | Type          | Description                                                                                                                                  | Notes                            |
| ---------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **limit**  | \[**number**] | Number of results per page. Defaults to 100. Maximum value is 200.                                                                           | (optional) defaults to 100       |
| **cursor** | \[**string**] | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | (optional) defaults to undefined |

### Return type

**GetSettlementsResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Settlements retrieved successfully     | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getTotalRestingOrderValue**

> GetTotalRestingOrderValueResponse getTotalRestingOrderValue()

Get the total value of all resting orders

### Example

```typescript  theme={null}
import {
    PortfolioApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new PortfolioApi(configuration);

const { status, data } = await apiInstance.getTotalRestingOrderValue();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**GetTotalRestingOrderValueResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                                      | Response headers |
| ----------- | ------------------------------------------------ | ---------------- |
| **200**     | Total resting order value retrieved successfully | -                |
| **401**     | Unauthorized - authentication required           | -                |
| **500**     | Internal server error                            | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **resetOrderGroup**

> resetOrderGroup()

Reset an order group

### Example

```typescript  theme={null}
import {
    PortfolioApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new PortfolioApi(configuration);

let orderGroupId: string; //Order group ID (default to undefined)

const { status, data } = await apiInstance.resetOrderGroup(
    orderGroupId
);
```

### Parameters

| Name             | Type          | Description    | Notes                 |
| ---------------- | ------------- | -------------- | --------------------- |
| **orderGroupId** | \[**string**] | Order group ID | defaults to undefined |

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
| **204**     | Order group reset successfully         | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: /llms.txt