---
url: https://docs.kalshi.com/python-sdk/api/MarketsApi
lastmod: 2026-01-27T00:10:36.738Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Markets

> Python SDK methods for Markets operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                                    | HTTP request                                                  | Description             |
| --------------------------------------------------------- | ------------------------------------------------------------- | ----------------------- |
| [**get\_market**](#get-market)                            | **GET** /markets/{ticker}                                     | Get Market              |
| [**get\_market\_candlesticks**](#get-market-candlesticks) | **GET** /series/{ticker}/markets/{market_ticker}/candlesticks | Get Market Candlesticks |
| [**get\_market\_orderbook**](#get-market-orderbook)       | **GET** /markets/{ticker}/orderbook                           | Get Market Orderbook    |
| [**get\_markets**](#get-markets)                          | **GET** /markets                                              | Get Markets             |
| [**get\_trades**](#get-trades)                            | **GET** /markets/trades                                       | Get Trades              |

# **get\_market**

> GetMarketResponse get\_market(ticker)

Get Market

Get a single market by its ticker.

A market represents a specific binary outcome within an event that users can trade on (e.g., "Will candidate X win?"). Markets have yes/no positions, current prices, volume, and settlement rules.

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_market_response import GetMarketResponse
from kalshi_python.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.elections.kalshi.com/trade-api/v2
# See configuration.py for a list of all supported configuration parameters.
configuration = kalshi_python.Configuration(
    host = "https://api.elections.kalshi.com/trade-api/v2"
)

# Read private key from file
with open('path/to/private_key.pem', 'r') as f:
    private_key = f.read()

# Configure API key authentication
configuration.api_key_id = "your-api-key-id"
configuration.private_key_pem = private_key

# Initialize the Kalshi client
client = kalshi_python.KalshiClient(configuration)

ticker = 'ticker_example' # str | Market ticker

try:
    # Get Market
    api_response = client.get_market(ticker)
    print("The response of MarketsApi->get_market:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling MarketsApi->get_market: %s\n" % e)
```

### Parameters

| Name       | Type    | Description   | Notes |
| ---------- | ------- | ------------- | ----- |
| **ticker** | **str** | Market ticker |       |

### Return type

[**GetMarketResponse**](https://docs.kalshi.com/python-sdk/models/GetMarketResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Market retrieved successfully          |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_market\_candlesticks**

> GetMarketCandlesticksResponse get\_market\_candlesticks(ticker, market\_ticker, start\_ts=start\_ts, end\_ts=end\_ts, period\_interval=period\_interval)

Get Market Candlesticks

Get candlestick data for a market within a series

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_market_candlesticks_response import GetMarketCandlesticksResponse
from kalshi_python.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.elections.kalshi.com/trade-api/v2
# See configuration.py for a list of all supported configuration parameters.
configuration = kalshi_python.Configuration(
    host = "https://api.elections.kalshi.com/trade-api/v2"
)

# Read private key from file
with open('path/to/private_key.pem', 'r') as f:
    private_key = f.read()

# Configure API key authentication
configuration.api_key_id = "your-api-key-id"
configuration.private_key_pem = private_key

# Initialize the Kalshi client
client = kalshi_python.KalshiClient(configuration)

ticker = 'ticker_example' # str | The series ticker

market_ticker = 'market_ticker_example' # str | The market ticker

start_ts = 56 # int | Start timestamp for the range (optional)

end_ts = 56 # int | End timestamp for the range (optional)

period_interval = 'period_interval_example' # str | Period interval for candlesticks (e.g., 1m, 5m, 1h, 1d) (optional)

try:
    # Get Market Candlesticks
    api_response = client.get_market_candlesticks(ticker, market_ticker, start_ts=start_ts, end_ts=end_ts, period_interval=period_interval)
    print("The response of MarketsApi->get_market_candlesticks:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling MarketsApi->get_market_candlesticks: %s\n" % e)
```

### Parameters

| Name                 | Type    | Description                                             | Notes       |
| -------------------- | ------- | ------------------------------------------------------- | ----------- |
| **ticker**           | **str** | The series ticker                                       |             |
| **market\_ticker**   | **str** | The market ticker                                       |             |
| **start\_ts**        | **int** | Start timestamp for the range                           | \[optional] |
| **end\_ts**          | **int** | End timestamp for the range                             | \[optional] |
| **period\_interval** | **str** | Period interval for candlesticks (e.g., 1m, 5m, 1h, 1d) | \[optional] |

### Return type

[**GetMarketCandlesticksResponse**](https://docs.kalshi.com/python-sdk/models/GetMarketCandlesticksResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Candlesticks retrieved successfully    |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_market\_orderbook**

> GetMarketOrderbookResponse get\_market\_orderbook(ticker, depth=depth)

Get Market Orderbook

Get the orderbook for a market

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_market_orderbook_response import GetMarketOrderbookResponse
from kalshi_python.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.elections.kalshi.com/trade-api/v2
# See configuration.py for a list of all supported configuration parameters.
configuration = kalshi_python.Configuration(
    host = "https://api.elections.kalshi.com/trade-api/v2"
)

# Read private key from file
with open('path/to/private_key.pem', 'r') as f:
    private_key = f.read()

# Configure API key authentication
configuration.api_key_id = "your-api-key-id"
configuration.private_key_pem = private_key

# Initialize the Kalshi client
client = kalshi_python.KalshiClient(configuration)

ticker = 'ticker_example' # str | Market ticker

depth = 10 # int | Depth of the orderbook to retrieve (optional) (default to 10)

try:
    # Get Market Orderbook
    api_response = client.get_market_orderbook(ticker, depth=depth)
    print("The response of MarketsApi->get_market_orderbook:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling MarketsApi->get_market_orderbook: %s\n" % e)
```

### Parameters

| Name       | Type    | Description                        | Notes                        |
| ---------- | ------- | ---------------------------------- | ---------------------------- |
| **ticker** | **str** | Market ticker                      |                              |
| **depth**  | **int** | Depth of the orderbook to retrieve | \[optional] \[default to 10] |

### Return type

[**GetMarketOrderbookResponse**](https://docs.kalshi.com/python-sdk/models/GetMarketOrderbookResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Orderbook retrieved successfully       |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_markets**

> GetMarketsResponse get\_markets(limit=limit, cursor=cursor, event\_ticker=event\_ticker, series\_ticker=series\_ticker, max\_close\_ts=max\_close\_ts, min\_close\_ts=min\_close\_ts, status=status, tickers=tickers)

Get Markets

List and discover markets on Kalshi.

A market represents a specific binary outcome within an event that users can trade on (e.g., "Will candidate X win?"). Markets have yes/no positions, current prices, volume, and settlement rules.

This endpoint returns a paginated response. Use the 'limit' parameter to control page size (1-1000, defaults to 100). The response includes a 'cursor' field - pass this value in the 'cursor' parameter of your next request to get the next page. An empty cursor indicates no more pages are available.

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_markets_response import GetMarketsResponse
from kalshi_python.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.elections.kalshi.com/trade-api/v2
# See configuration.py for a list of all supported configuration parameters.
configuration = kalshi_python.Configuration(
    host = "https://api.elections.kalshi.com/trade-api/v2"
)

# Read private key from file
with open('path/to/private_key.pem', 'r') as f:
    private_key = f.read()

# Configure API key authentication
configuration.api_key_id = "your-api-key-id"
configuration.private_key_pem = private_key

# Initialize the Kalshi client
client = kalshi_python.KalshiClient(configuration)

limit = 100 # int | Number of results per page. Defaults to 100. Maximum value is 1000. (optional) (default to 100)

cursor = 'cursor_example' # str | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. (optional)

event_ticker = 'event_ticker_example' # str | Filter by event ticker (optional)

series_ticker = 'series_ticker_example' # str | Filter by series ticker (optional)

max_close_ts = 56 # int | Filter items that close before this Unix timestamp (optional)

min_close_ts = 56 # int | Filter items that close after this Unix timestamp (optional)

status = 'status_example' # str | Filter by market status. Comma-separated list. Possible values are 'initialized', 'open', 'closed', 'settled', 'determined'. Note that the API accepts 'open' for filtering but returns 'active' in the response. Leave empty to return markets with any status. (optional)

tickers = 'tickers_example' # str | Filter by specific market tickers. Comma-separated list of market tickers to retrieve. (optional)

try:
    # Get Markets
    api_response = client.get_markets(limit=limit, cursor=cursor, event_ticker=event_ticker, series_ticker=series_ticker, max_close_ts=max_close_ts, min_close_ts=min_close_ts, status=status, tickers=tickers)
    print("The response of MarketsApi->get_markets:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling MarketsApi->get_markets: %s\n" % e)
```

### Parameters

| Name               | Type    | Description                                                                                                                                                                                                                                                      | Notes                         |
| ------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **limit**          | **int** | Number of results per page. Defaults to 100. Maximum value is 1000.                                                                                                                                                                                              | \[optional] \[default to 100] |
| **cursor**         | **str** | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page.                                                                                                                     | \[optional]                   |
| **event\_ticker**  | **str** | Filter by event ticker                                                                                                                                                                                                                                           | \[optional]                   |
| **series\_ticker** | **str** | Filter by series ticker                                                                                                                                                                                                                                          | \[optional]                   |
| **max\_close\_ts** | **int** | Filter items that close before this Unix timestamp                                                                                                                                                                                                               | \[optional]                   |
| **min\_close\_ts** | **int** | Filter items that close after this Unix timestamp                                                                                                                                                                                                                | \[optional]                   |
| **status**         | **str** | Filter by market status. Comma-separated list. Possible values are 'initialized', 'open', 'closed', 'settled', 'determined'. Note that the API accepts 'open' for filtering but returns 'active' in the response. Leave empty to return markets with any status. | \[optional]                   |
| **tickers**        | **str** | Filter by specific market tickers. Comma-separated list of market tickers to retrieve.                                                                                                                                                                           | \[optional]                   |

### Return type

[**GetMarketsResponse**](https://docs.kalshi.com/python-sdk/models/GetMarketsResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Markets retrieved successfully         |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_trades**

> GetTradesResponse get\_trades(limit=limit, cursor=cursor, ticker=ticker, min\_ts=min\_ts, max\_ts=max\_ts)

Get Trades

Get all trades for all markets.

A trade represents a completed transaction between two users on a specific market. Each trade includes the market ticker, price, quantity, and timestamp information.

This endpoint returns a paginated response. Use the 'limit' parameter to control page size (1-1000, defaults to 100). The response includes a 'cursor' field - pass this value in the 'cursor' parameter of your next request to get the next page. An empty cursor indicates no more pages are available.

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_trades_response import GetTradesResponse
from kalshi_python.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.elections.kalshi.com/trade-api/v2
# See configuration.py for a list of all supported configuration parameters.
configuration = kalshi_python.Configuration(
    host = "https://api.elections.kalshi.com/trade-api/v2"
)


# Initialize the Kalshi client
client = kalshi_python.KalshiClient(configuration)

limit = 100 # int | Number of results per page. Defaults to 100. Maximum value is 1000. (optional) (default to 100)

cursor = 'cursor_example' # str | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. (optional)

ticker = 'ticker_example' # str | Filter by market ticker (optional)

min_ts = 56 # int | Filter items after this Unix timestamp (optional)

max_ts = 56 # int | Filter items before this Unix timestamp (optional)

try:
    # Get Trades
    api_response = client.get_trades(limit=limit, cursor=cursor, ticker=ticker, min_ts=min_ts, max_ts=max_ts)
    print("The response of MarketsApi->get_trades:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling MarketsApi->get_trades: %s\n" % e)
```

### Parameters

| Name        | Type    | Description                                                                                                                                  | Notes                         |
| ----------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **limit**   | **int** | Number of results per page. Defaults to 100. Maximum value is 1000.                                                                          | \[optional] \[default to 100] |
| **cursor**  | **str** | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | \[optional]                   |
| **ticker**  | **str** | Filter by market ticker                                                                                                                      | \[optional]                   |
| **min\_ts** | **int** | Filter items after this Unix timestamp                                                                                                       | \[optional]                   |
| **max\_ts** | **int** | Filter items before this Unix timestamp                                                                                                      | \[optional]                   |

### Return type

[**GetTradesResponse**](https://docs.kalshi.com/python-sdk/models/GetTradesResponse)

### HTTP response details

| Status code | Description                   |
| ----------- | ----------------------------- |
| **200**     | Trades retrieved successfully |
| **400**     | Bad request - invalid input   |
| **500**     | Internal server error         |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)
