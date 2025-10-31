---
url: https://docs.kalshi.com/python-sdk/api/ExchangeApi
lastmod: 2025-10-07T23:32:03.929Z
---
# Exchange

> Python SDK methods for Exchange operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                                          | HTTP request                            | Description                |
| --------------------------------------------------------------- | --------------------------------------- | -------------------------- |
| [**get\_exchange\_announcements**](#get-exchange-announcements) | **GET** /exchange/announcements         | Get Exchange Announcements |
| [**get\_exchange\_schedule**](#get-exchange-schedule)           | **GET** /exchange/schedule              | Get Exchange Schedule      |
| [**get\_exchange\_status**](#get-exchange-status)               | **GET** /exchange/status                | Get Exchange Status        |
| [**get\_user\_data\_timestamp**](#get-user-data-timestamp)      | **GET** /exchange/user\_data\_timestamp | Get User Data Timestamp    |

# **get\_exchange\_announcements**

> GetExchangeAnnouncementsResponse get\_exchange\_announcements()

Get Exchange Announcements

Get all exchange-wide announcements

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

| Status code | Description                          |
| ----------- | ------------------------------------ |
| **200**     | Announcements retrieved successfully |
| **500**     | Internal server error                |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_exchange\_schedule**

> GetExchangeScheduleResponse get\_exchange\_schedule()

Get Exchange Schedule

Get the exchange schedule

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

| Status code | Description                     |
| ----------- | ------------------------------- |
| **200**     | Schedule retrieved successfully |
| **500**     | Internal server error           |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_exchange\_status**

> ExchangeStatus get\_exchange\_status()

Get Exchange Status

Get the exchange status

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

| Status code | Description                   |
| ----------- | ----------------------------- |
| **200**     | Status retrieved successfully |
| **500**     | Internal server error         |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_user\_data\_timestamp**

> GetUserDataTimestampResponse get\_user\_data\_timestamp()

Get User Data Timestamp

There is typically a short delay before exchange events are reflected in the API endpoints.
Whenever possible, combine API responses to PUT/POST/DELETE requests with websocket data to obtain the most accurate view of the exchange state.
This endpoint provides an approximate indication of when the data from the following endpoints was last validated: GetBalance, GetOrder(s), GetFills, GetPositions

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

# Read private key from file
with open('path/to/private_key.pem', 'r') as f:
    private_key = f.read()

# Configure API key authentication
configuration.api_key_id = "your-api-key-id"
configuration.private_key_pem = private_key

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

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Timestamp retrieved successfully       |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)
