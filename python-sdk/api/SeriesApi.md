---
url: https://docs.kalshi.com/python-sdk/api/SeriesApi
lastmod: 2026-01-24T01:03:13.126Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Series

> Python SDK methods for Series operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                               | HTTP request             | Description          |
| ---------------------------------------------------- | ------------------------ | -------------------- |
| [**get\_series**](#get-series)                       | **GET** /series          | Get Series           |
| [**get\_series\_by\_ticker**](#get-series-by-ticker) | **GET** /series/{ticker} | Get Series by Ticker |

# **get\_series**

> GetSeriesResponse get\_series(status=status)

Get Series

Get all market series

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_series_response import GetSeriesResponse
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

status = 'status_example' # str | Filter by series status (optional)

try:
    # Get Series
    api_response = client.get_series(status=status)
    print("The response of SeriesApi->get_series:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling SeriesApi->get_series: %s\n" % e)
```

### Parameters

| Name       | Type    | Description             | Notes       |
| ---------- | ------- | ----------------------- | ----------- |
| **status** | **str** | Filter by series status | \[optional] |

### Return type

[**GetSeriesResponse**](https://docs.kalshi.com/python-sdk/models/GetSeriesResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Series retrieved successfully          |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_series\_by\_ticker**

> GetSeriesByTickerResponse get\_series\_by\_ticker(ticker)

Get Series by Ticker

Get a single series by its ticker

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_series_by_ticker_response import GetSeriesByTickerResponse
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

try:
    # Get Series by Ticker
    api_response = client.get_series_by_ticker(ticker)
    print("The response of SeriesApi->get_series_by_ticker:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling SeriesApi->get_series_by_ticker: %s\n" % e)
```

### Parameters

| Name       | Type    | Description       | Notes |
| ---------- | ------- | ----------------- | ----- |
| **ticker** | **str** | The series ticker |       |

### Return type

[**GetSeriesByTickerResponse**](https://docs.kalshi.com/python-sdk/models/GetSeriesByTickerResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Series retrieved successfully          |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)
