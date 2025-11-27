---
url: https://docs.kalshi.com/typescript-sdk/api/MarketsApi
lastmod: 2025-10-07T23:32:04.318Z
---
# Markets

> TypeScript SDK methods for Markets operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                              | HTTP request                                                  | Description             |
| --------------------------------------------------- | ------------------------------------------------------------- | ----------------------- |
| [**getMarket**](#getmarket)                         | **GET** /markets/{ticker}                                     | Get Market              |
| [**getMarketCandlesticks**](#getmarketcandlesticks) | **GET** /series/{ticker}/markets/{market_ticker}/candlesticks | Get Market Candlesticks |
| [**getMarketOrderbook**](#getmarketorderbook)       | **GET** /markets/{ticker}/orderbook                           | Get Market Orderbook    |
| [**getMarkets**](#getmarkets)                       | **GET** /markets                                              | Get Markets             |
| [**getTrades**](#gettrades)                         | **GET** /markets/trades                                       | Get Trades              |

# **getMarket**

> GetMarketResponse getMarket()

Get a single market by its ticker.  A market represents a specific binary outcome within an event that users can trade on (e.g., "Will candidate X win?"). Markets have yes/no positions, current prices, volume, and settlement rules.

### Example

```typescript  theme={null}
import {
    MarketsApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new MarketsApi(configuration);

let ticker: string; //Market ticker (default to undefined)

const { status, data } = await apiInstance.getMarket(
    ticker
);
```

### Parameters

| Name       | Type          | Description   | Notes                 |
| ---------- | ------------- | ------------- | --------------------- |
| **ticker** | \[**string**] | Market ticker | defaults to undefined |

### Return type

**GetMarketResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Market retrieved successfully          | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getMarketCandlesticks**

> GetMarketCandlesticksResponse getMarketCandlesticks()

Get candlestick data for a market within a series

### Example

```typescript  theme={null}
import {
    MarketsApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new MarketsApi(configuration);

let ticker: string; //The series ticker (default to undefined)
let marketTicker: string; //The market ticker (default to undefined)
let startTs: number; //Start timestamp for the range (optional) (default to undefined)
let endTs: number; //End timestamp for the range (optional) (default to undefined)
let periodInterval: string; //Period interval for candlesticks (e.g., 1m, 5m, 1h, 1d) (optional) (default to undefined)

const { status, data } = await apiInstance.getMarketCandlesticks(
    ticker,
    marketTicker,
    startTs,
    endTs,
    periodInterval
);
```

### Parameters

| Name               | Type          | Description                                             | Notes                            |
| ------------------ | ------------- | ------------------------------------------------------- | -------------------------------- |
| **ticker**         | \[**string**] | The series ticker                                       | defaults to undefined            |
| **marketTicker**   | \[**string**] | The market ticker                                       | defaults to undefined            |
| **startTs**        | \[**number**] | Start timestamp for the range                           | (optional) defaults to undefined |
| **endTs**          | \[**number**] | End timestamp for the range                             | (optional) defaults to undefined |
| **periodInterval** | \[**string**] | Period interval for candlesticks (e.g., 1m, 5m, 1h, 1d) | (optional) defaults to undefined |

### Return type

**GetMarketCandlesticksResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Candlesticks retrieved successfully    | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getMarketOrderbook**

> GetMarketOrderbookResponse getMarketOrderbook()

Get the orderbook for a market

### Example

```typescript  theme={null}
import {
    MarketsApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new MarketsApi(configuration);

let ticker: string; //Market ticker (default to undefined)
let depth: number; //Depth of the orderbook to retrieve (optional) (default to 10)

const { status, data } = await apiInstance.getMarketOrderbook(
    ticker,
    depth
);
```

### Parameters

| Name       | Type          | Description                        | Notes                     |
| ---------- | ------------- | ---------------------------------- | ------------------------- |
| **ticker** | \[**string**] | Market ticker                      | defaults to undefined     |
| **depth**  | \[**number**] | Depth of the orderbook to retrieve | (optional) defaults to 10 |

### Return type

**GetMarketOrderbookResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Orderbook retrieved successfully       | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getMarkets**

> GetMarketsResponse getMarkets()

List and discover markets on Kalshi.  A market represents a specific binary outcome within an event that users can trade on (e.g., "Will candidate X win?"). Markets have yes/no positions, current prices, volume, and settlement rules.  This endpoint returns a paginated response. Use the 'limit' parameter to control page size (1-1000, defaults to 100). The response includes a 'cursor' field - pass this value in the 'cursor' parameter of your next request to get the next page. An empty cursor indicates no more pages are available.

### Example

```typescript  theme={null}
import {
    MarketsApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new MarketsApi(configuration);

let limit: number; //Number of results per page. Defaults to 100. Maximum value is 1000. (optional) (default to 100)
let cursor: string; //Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. (optional) (default to undefined)
let eventTicker: string; //Filter by event ticker (optional) (default to undefined)
let seriesTicker: string; //Filter by series ticker (optional) (default to undefined)
let maxCloseTs: number; //Filter items that close before this Unix timestamp (optional) (default to undefined)
let minCloseTs: number; //Filter items that close after this Unix timestamp (optional) (default to undefined)
let status: string; //Filter by market status. Comma-separated list. Possible values are \'initialized\', \'open\', \'closed\', \'settled\', \'determined\'. Note that the API accepts \'open\' for filtering but returns \'active\' in the response. Leave empty to return markets with any status. (optional) (default to undefined)
let tickers: string; //Filter by specific market tickers. Comma-separated list of market tickers to retrieve. (optional) (default to undefined)

const { status, data } = await apiInstance.getMarkets(
    limit,
    cursor,
    eventTicker,
    seriesTicker,
    maxCloseTs,
    minCloseTs,
    status,
    tickers
);
```

### Parameters

| Name             | Type          | Description                                                                                                                                                                                                                                                                                                                            | Notes                            |
| ---------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **limit**        | \[**number**] | Number of results per page. Defaults to 100. Maximum value is 1000.                                                                                                                                                                                                                                                                    | (optional) defaults to 100       |
| **cursor**       | \[**string**] | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page.                                                                                                                                                                                           | (optional) defaults to undefined |
| **eventTicker**  | \[**string**] | Filter by event ticker                                                                                                                                                                                                                                                                                                                 | (optional) defaults to undefined |
| **seriesTicker** | \[**string**] | Filter by series ticker                                                                                                                                                                                                                                                                                                                | (optional) defaults to undefined |
| **maxCloseTs**   | \[**number**] | Filter items that close before this Unix timestamp                                                                                                                                                                                                                                                                                     | (optional) defaults to undefined |
| **minCloseTs**   | \[**number**] | Filter items that close after this Unix timestamp                                                                                                                                                                                                                                                                                      | (optional) defaults to undefined |
| **status**       | \[**string**] | Filter by market status. Comma-separated list. Possible values are \&#39;initialized\&#39;, \&#39;open\&#39;, \&#39;closed\&#39;, \&#39;settled\&#39;, \&#39;determined\&#39;. Note that the API accepts \&#39;open\&#39; for filtering but returns \&#39;active\&#39; in the response. Leave empty to return markets with any status. | (optional) defaults to undefined |
| **tickers**      | \[**string**] | Filter by specific market tickers. Comma-separated list of market tickers to retrieve.                                                                                                                                                                                                                                                 | (optional) defaults to undefined |

### Return type

**GetMarketsResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Markets retrieved successfully         | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getTrades**

> GetTradesResponse getTrades()

Get all trades for all markets.  A trade represents a completed transaction between two users on a specific market. Each trade includes the market ticker, price, quantity, and timestamp information.  This endpoint returns a paginated response. Use the 'limit' parameter to control page size (1-1000, defaults to 100). The response includes a 'cursor' field - pass this value in the 'cursor' parameter of your next request to get the next page. An empty cursor indicates no more pages are available.

### Example

```typescript  theme={null}
import {
    MarketsApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new MarketsApi(configuration);

let limit: number; //Number of results per page. Defaults to 100. Maximum value is 1000. (optional) (default to 100)
let cursor: string; //Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. (optional) (default to undefined)
let ticker: string; //Filter by market ticker (optional) (default to undefined)
let minTs: number; //Filter items after this Unix timestamp (optional) (default to undefined)
let maxTs: number; //Filter items before this Unix timestamp (optional) (default to undefined)

const { status, data } = await apiInstance.getTrades(
    limit,
    cursor,
    ticker,
    minTs,
    maxTs
);
```

### Parameters

| Name       | Type          | Description                                                                                                                                  | Notes                            |
| ---------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **limit**  | \[**number**] | Number of results per page. Defaults to 100. Maximum value is 1000.                                                                          | (optional) defaults to 100       |
| **cursor** | \[**string**] | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | (optional) defaults to undefined |
| **ticker** | \[**string**] | Filter by market ticker                                                                                                                      | (optional) defaults to undefined |
| **minTs**  | \[**number**] | Filter items after this Unix timestamp                                                                                                       | (optional) defaults to undefined |
| **maxTs**  | \[**number**] | Filter items before this Unix timestamp                                                                                                      | (optional) defaults to undefined |

### Return type

**GetTradesResponse**

### Authorization

No authorization required

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                   | Response headers |
| ----------- | ----------------------------- | ---------------- |
| **200**     | Trades retrieved successfully | -                |
| **400**     | Bad request - invalid input   | -                |
| **500**     | Internal server error         | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: /llms.txt