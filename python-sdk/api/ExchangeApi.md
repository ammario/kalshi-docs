---
url: https://docs.kalshi.com/python-sdk/api/ExchangeApi
lastmod: 2025-11-17T18:05:02.650Z
---
# Exchange

> Python SDK methods for Exchange operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                                          | HTTP request                            | Description                |
| --------------------------------------------------------------- | --------------------------------------- | -------------------------- |
| [**get\_exchange\_announcements**](#get-exchange-announcements) | **GET** /exchange/announcements         | Get Exchange Announcements |
| [**get\_exchange\_schedule**](#get-exchange-schedule)           | **GET** /exchange/schedule              | Get Exchange Schedule      |
| [**get\_exchange\_status**](#get-exchange-status)               | **GET** /exchange/status                | Get Exchange Status        |
| [**get\_series\_fee\_changes**](#get-series-fee-changes)        | **GET** /series/fee\_changes            | Get Series Fee Changes     |
| [**get\_user\_data\_timestamp**](#get-user-data-timestamp)      | **GET** /exchange/user\_data\_timestamp | Get User Data Timestamp    |

# **get\_exchange\_announcements**

> GetExchangeAnnouncementsResponse get\_exchange\_announcements()

Get Exchange Announcements

Endpoint for getting all exchange-wide announcements.

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_exchange_announcements_response import GetExchangeAnnouncementsResponse
from kalshi_python.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.elections.kalshi.com/trade-api/v2
# See configuration.py for a list of all supported configuration parameters.
configuration = kalshi_python.Configuration(
    host = "https://api.elections.kalshi.com/trade-api/v2"
)


# Initialize the Kalshi client
client = kalshi_python.KalshiClient(configuration)

try:
    # Get Exchange Announcements
    api_response = client.get_exchange_announcements()
    print("The response of ExchangeApi->get_exchange_announcements:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling ExchangeApi->get_exchange_announcements: %s\n" % e)
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetExchangeAnnouncementsResponse**](https://docs.kalshi.com/python-sdk/models/GetExchangeAnnouncementsResponse)

### HTTP response details

| Status code | Description                                   |
| ----------- | --------------------------------------------- |
| **200**     | Exchange announcements retrieved successfully |
| **500**     | Internal server error                         |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_exchange\_schedule**

> GetExchangeScheduleResponse get\_exchange\_schedule()

Get Exchange Schedule

Endpoint for getting the exchange schedule.

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_exchange_schedule_response import GetExchangeScheduleResponse
from kalshi_python.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.elections.kalshi.com/trade-api/v2
# See configuration.py for a list of all supported configuration parameters.
configuration = kalshi_python.Configuration(
    host = "https://api.elections.kalshi.com/trade-api/v2"
)


# Initialize the Kalshi client
client = kalshi_python.KalshiClient(configuration)

try:
    # Get Exchange Schedule
    api_response = client.get_exchange_schedule()
    print("The response of ExchangeApi->get_exchange_schedule:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling ExchangeApi->get_exchange_schedule: %s\n" % e)
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetExchangeScheduleResponse**](https://docs.kalshi.com/python-sdk/models/GetExchangeScheduleResponse)

### HTTP response details

| Status code | Description                              |
| ----------- | ---------------------------------------- |
| **200**     | Exchange schedule retrieved successfully |
| **500**     | Internal server error                    |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_exchange\_status**

> ExchangeStatus get\_exchange\_status()

Get Exchange Status

Endpoint for getting the exchange status.

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.exchange_status import ExchangeStatus
from kalshi_python.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.elections.kalshi.com/trade-api/v2
# See configuration.py for a list of all supported configuration parameters.
configuration = kalshi_python.Configuration(
    host = "https://api.elections.kalshi.com/trade-api/v2"
)


# Initialize the Kalshi client
client = kalshi_python.KalshiClient(configuration)

try:
    # Get Exchange Status
    api_response = client.get_exchange_status()
    print("The response of ExchangeApi->get_exchange_status:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling ExchangeApi->get_exchange_status: %s\n" % e)
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**ExchangeStatus**](https://docs.kalshi.com/python-sdk/models/ExchangeStatus)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Exchange status retrieved successfully |
| **500**     | Internal server error                  |
| **503**     | Service unavailable                    |
| **504**     | Gateway timeout                        |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_series\_fee\_changes**

> GetSeriesFeeChangesResponse get\_series\_fee\_changes(series\_ticker=series\_ticker, show\_historical=show\_historical)

Get Series Fee Changes

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_series_fee_changes_response import GetSeriesFeeChangesResponse
from kalshi_python.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.elections.kalshi.com/trade-api/v2
# See configuration.py for a list of all supported configuration parameters.
configuration = kalshi_python.Configuration(
    host = "https://api.elections.kalshi.com/trade-api/v2"
)


# Initialize the Kalshi client
client = kalshi_python.KalshiClient(configuration)

series_ticker = 'series_ticker_example' # str |  (optional)

show_historical = False # bool |  (optional) (default to False)

try:
    # Get Series Fee Changes
    api_response = client.get_series_fee_changes(series_ticker=series_ticker, show_historical=show_historical)
    print("The response of ExchangeApi->get_series_fee_changes:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling ExchangeApi->get_series_fee_changes: %s\n" % e)
```

### Parameters

| Name                 | Type     | Description | Notes                           |
| -------------------- | -------- | ----------- | ------------------------------- |
| **series\_ticker**   | **str**  |             | \[optional]                     |
| **show\_historical** | **bool** |             | \[optional] \[default to False] |

### Return type

[**GetSeriesFeeChangesResponse**](https://docs.kalshi.com/python-sdk/models/GetSeriesFeeChangesResponse)

### HTTP response details

| Status code | Description                               |
| ----------- | ----------------------------------------- |
| **200**     | Series fee changes retrieved successfully |
| **400**     | Bad request - invalid input               |
| **500**     | Internal server error                     |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_user\_data\_timestamp**

> GetUserDataTimestampResponse get\_user\_data\_timestamp()

Get User Data Timestamp

There is typically a short delay before exchange events are reflected in the API endpoints. Whenever possible, combine API responses to PUT/POST/DELETE requests with websocket data to obtain the most accurate view of the exchange state. This endpoint provides an approximate indication of when the data from the following endpoints was last validated: GetBalance, GetOrder(s), GetFills, GetPositions

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_user_data_timestamp_response import GetUserDataTimestampResponse
from kalshi_python.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.elections.kalshi.com/trade-api/v2
# See configuration.py for a list of all supported configuration parameters.
configuration = kalshi_python.Configuration(
    host = "https://api.elections.kalshi.com/trade-api/v2"
)


# Initialize the Kalshi client
client = kalshi_python.KalshiClient(configuration)

try:
    # Get User Data Timestamp
    api_response = client.get_user_data_timestamp()
    print("The response of ExchangeApi->get_user_data_timestamp:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling ExchangeApi->get_user_data_timestamp: %s\n" % e)
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetUserDataTimestampResponse**](https://docs.kalshi.com/python-sdk/models/GetUserDataTimestampResponse)

### HTTP response details

| Status code | Description                                |
| ----------- | ------------------------------------------ |
| **200**     | User data timestamp retrieved successfully |
| **500**     | Internal server error                      |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)
