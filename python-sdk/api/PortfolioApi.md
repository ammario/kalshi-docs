---
url: https://docs.kalshi.com/python-sdk/api/PortfolioApi
lastmod: 2025-11-17T18:05:04.797Z
---
# Portfolio

> Python SDK methods for Portfolio operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                                                                       | HTTP request                                            | Description                   |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------- |
| [**get\_balance**](#get-balance)                                                             | **GET** /portfolio/balance                              | Get Balance                   |
| [**get\_fills**](#get-fills)                                                                 | **GET** /portfolio/fills                                | Get Fills                     |
| [**get\_portfolio\_resting\_order\_total\_value**](#get-portfolio-resting-order-total-value) | **GET** /portfolio/summary/total\_resting\_order\_value | Get Total Resting Order Value |
| [**get\_positions**](#get-positions)                                                         | **GET** /portfolio/positions                            | Get Positions                 |
| [**get\_settlements**](#get-settlements)                                                     | **GET** /portfolio/settlements                          | Get Settlements               |

# **get\_balance**

> GetBalanceResponse get\_balance()

Get Balance

Endpoint for getting the balance and portfolio value of a member. Both values are returned in cents.

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_balance_response import GetBalanceResponse
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

try:
    # Get Balance
    api_response = client.get_balance()
    print("The response of PortfolioApi->get_balance:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->get_balance: %s\n" % e)
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetBalanceResponse**](https://docs.kalshi.com/python-sdk/models/GetBalanceResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Balance retrieved successfully         |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_fills**

> GetFillsResponse get\_fills(ticker=ticker, order\_id=order\_id, min\_ts=min\_ts, max\_ts=max\_ts, limit=limit, cursor=cursor)

Get Fills

Endpoint for getting all fills for the member. A fill is when a trade you have is matched.

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_fills_response import GetFillsResponse
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

ticker = 'ticker_example' # str | Filter by market ticker (optional)

order_id = 'order_id_example' # str | Filter by order ID (optional)

min_ts = 56 # int | Filter items after this Unix timestamp (optional)

max_ts = 56 # int | Filter items before this Unix timestamp (optional)

limit = 100 # int | Number of results per page. Defaults to 100. Maximum value is 200. (optional) (default to 100)

cursor = 'cursor_example' # str | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. (optional)

try:
    # Get Fills
    api_response = client.get_fills(ticker=ticker, order_id=order_id, min_ts=min_ts, max_ts=max_ts, limit=limit, cursor=cursor)
    print("The response of PortfolioApi->get_fills:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->get_fills: %s\n" % e)
```

### Parameters

| Name          | Type    | Description                                                                                                                                  | Notes                         |
| ------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **ticker**    | **str** | Filter by market ticker                                                                                                                      | \[optional]                   |
| **order\_id** | **str** | Filter by order ID                                                                                                                           | \[optional]                   |
| **min\_ts**   | **int** | Filter items after this Unix timestamp                                                                                                       | \[optional]                   |
| **max\_ts**   | **int** | Filter items before this Unix timestamp                                                                                                      | \[optional]                   |
| **limit**     | **int** | Number of results per page. Defaults to 100. Maximum value is 200.                                                                           | \[optional] \[default to 100] |
| **cursor**    | **str** | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | \[optional]                   |

### Return type

[**GetFillsResponse**](https://docs.kalshi.com/python-sdk/models/GetFillsResponse)

### HTTP response details

| Status code | Description                  |
| ----------- | ---------------------------- |
| **200**     | Fills retrieved successfully |
| **400**     | Bad request                  |
| **401**     | Unauthorized                 |
| **500**     | Internal server error        |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_portfolio\_resting\_order\_total\_value**

> GetPortfolioRestingOrderTotalValueResponse get\_portfolio\_resting\_order\_total\_value()

Get Total Resting Order Value

Endpoint for getting the total value, in cents, of resting orders. This endpoint is only intended for use by FCM members (rare). Note: If you're uncertain about this endpoint, it likely does not apply to you.

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_portfolio_resting_order_total_value_response import GetPortfolioRestingOrderTotalValueResponse
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

try:
    # Get Total Resting Order Value
    api_response = client.get_portfolio_resting_order_total_value()
    print("The response of PortfolioApi->get_portfolio_resting_order_total_value:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->get_portfolio_resting_order_total_value: %s\n" % e)
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetPortfolioRestingOrderTotalValueResponse**](https://docs.kalshi.com/python-sdk/models/GetPortfolioRestingOrderTotalValueResponse)

### HTTP response details

| Status code | Description                                      |
| ----------- | ------------------------------------------------ |
| **200**     | Total resting order value retrieved successfully |
| **401**     | Unauthorized - authentication required           |
| **500**     | Internal server error                            |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_positions**

> GetPositionsResponse get\_positions(cursor=cursor, limit=limit, count\_filter=count\_filter, settlement\_status=settlement\_status, ticker=ticker, event\_ticker=event\_ticker)

Get Positions

Restricts the positions to those with any of following fields with non-zero values, as a comma separated list. The following values are accepted: position, total\_traded

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_positions_response import GetPositionsResponse
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

cursor = 'cursor_example' # str | The Cursor represents a pointer to the next page of records in the pagination. Use the value returned from the previous response to get the next page. (optional)

limit = 100 # int | Parameter to specify the number of results per page. Defaults to 100. (optional) (default to 100)

count_filter = 'count_filter_example' # str | Restricts the positions to those with any of following fields with non-zero values, as a comma separated list. The following values are accepted - position, total_traded (optional)

settlement_status = unsettled # str | Settlement status of the markets to return. Defaults to unsettled. (optional) (default to unsettled)

ticker = 'ticker_example' # str | Filter by market ticker (optional)

event_ticker = 'event_ticker_example' # str | Event ticker of desired positions. Multiple event tickers can be provided as a comma-separated list (maximum 10). (optional)

try:
    # Get Positions
    api_response = client.get_positions(cursor=cursor, limit=limit, count_filter=count_filter, settlement_status=settlement_status, ticker=ticker, event_ticker=event_ticker)
    print("The response of PortfolioApi->get_positions:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->get_positions: %s\n" % e)
```

### Parameters

| Name                   | Type    | Description                                                                                                                                                                | Notes                               |
| ---------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **cursor**             | **str** | The Cursor represents a pointer to the next page of records in the pagination. Use the value returned from the previous response to get the next page.                     | \[optional]                         |
| **limit**              | **int** | Parameter to specify the number of results per page. Defaults to 100.                                                                                                      | \[optional] \[default to 100]       |
| **count\_filter**      | **str** | Restricts the positions to those with any of following fields with non-zero values, as a comma separated list. The following values are accepted - position, total\_traded | \[optional]                         |
| **settlement\_status** | **str** | Settlement status of the markets to return. Defaults to unsettled.                                                                                                         | \[optional] \[default to unsettled] |
| **ticker**             | **str** | Filter by market ticker                                                                                                                                                    | \[optional]                         |
| **event\_ticker**      | **str** | Event ticker of desired positions. Multiple event tickers can be provided as a comma-separated list (maximum 10).                                                          | \[optional]                         |

### Return type

[**GetPositionsResponse**](https://docs.kalshi.com/python-sdk/models/GetPositionsResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Positions retrieved successfully       |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_settlements**

> GetSettlementsResponse get\_settlements(limit=limit, cursor=cursor, ticker=ticker, event\_ticker=event\_ticker, min\_ts=min\_ts, max\_ts=max\_ts)

Get Settlements

Endpoint for getting the member's settlements historical track.

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_settlements_response import GetSettlementsResponse
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

limit = 100 # int | Number of results per page. Defaults to 100. Maximum value is 200. (optional) (default to 100)

cursor = 'cursor_example' # str | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. (optional)

ticker = 'ticker_example' # str | Filter by market ticker (optional)

event_ticker = 'event_ticker_example' # str | Event ticker of desired positions. Multiple event tickers can be provided as a comma-separated list (maximum 10). (optional)

min_ts = 56 # int | Filter items after this Unix timestamp (optional)

max_ts = 56 # int | Filter items before this Unix timestamp (optional)

try:
    # Get Settlements
    api_response = client.get_settlements(limit=limit, cursor=cursor, ticker=ticker, event_ticker=event_ticker, min_ts=min_ts, max_ts=max_ts)
    print("The response of PortfolioApi->get_settlements:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->get_settlements: %s\n" % e)
```

### Parameters

| Name              | Type    | Description                                                                                                                                  | Notes                         |
| ----------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **limit**         | **int** | Number of results per page. Defaults to 100. Maximum value is 200.                                                                           | \[optional] \[default to 100] |
| **cursor**        | **str** | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | \[optional]                   |
| **ticker**        | **str** | Filter by market ticker                                                                                                                      | \[optional]                   |
| **event\_ticker** | **str** | Event ticker of desired positions. Multiple event tickers can be provided as a comma-separated list (maximum 10).                            | \[optional]                   |
| **min\_ts**       | **int** | Filter items after this Unix timestamp                                                                                                       | \[optional]                   |
| **max\_ts**       | **int** | Filter items before this Unix timestamp                                                                                                      | \[optional]                   |

### Return type

[**GetSettlementsResponse**](https://docs.kalshi.com/python-sdk/models/GetSettlementsResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Settlements retrieved successfully     |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)
