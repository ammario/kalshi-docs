# Events

> Python SDK methods for Events operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                          | HTTP request                            | Description        |
| ----------------------------------------------- | --------------------------------------- | ------------------ |
| [**get\_event**](#get-event)                    | **GET** /events/{event_ticker}          | Get Event          |
| [**get\_event\_metadata**](#get-event-metadata) | **GET** /events/{event_ticker}/metadata | Get Event Metadata |
| [**get\_events**](#get-events)                  | **GET** /events                         | Get Events         |

# **get\_event**

> GetEventResponse get\_event(event\_ticker, with\_nested\_markets=with\_nested\_markets)

Get Event

Get data about an event by its ticker.

An event represents a real-world occurrence that can be traded on, such as an election, sports game, or economic indicator release. Events contain one or more markets where users can place trades on different outcomes.

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_event_response import GetEventResponse
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

event_ticker = 'event_ticker_example' # str | Event ticker

with_nested_markets = False # bool | If true, markets are included within the event object. If false (default), markets are returned as a separate top-level field in the response. (optional) (default to False)

try:
    # Get Event
    api_response = client.get_event(event_ticker, with_nested_markets=with_nested_markets)
    print("The response of EventsApi->get_event:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling EventsApi->get_event: %s\n" % e)
```

### Parameters

| Name                      | Type     | Description                                                                                                                                    | Notes                           |
| ------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| **event\_ticker**         | **str**  | Event ticker                                                                                                                                   |                                 |
| **with\_nested\_markets** | **bool** | If true, markets are included within the event object. If false (default), markets are returned as a separate top-level field in the response. | \[optional] \[default to False] |

### Return type

[**GetEventResponse**](https://docs.kalshi.com/python-sdk/models/GetEventResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Event retrieved successfully           |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_event\_metadata**

> GetEventMetadataResponse get\_event\_metadata(event\_ticker)

Get Event Metadata

Get metadata about an event by its ticker

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_event_metadata_response import GetEventMetadataResponse
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

event_ticker = 'event_ticker_example' # str | Event ticker

try:
    # Get Event Metadata
    api_response = client.get_event_metadata(event_ticker)
    print("The response of EventsApi->get_event_metadata:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling EventsApi->get_event_metadata: %s\n" % e)
```

### Parameters

| Name              | Type    | Description  | Notes |
| ----------------- | ------- | ------------ | ----- |
| **event\_ticker** | **str** | Event ticker |       |

### Return type

[**GetEventMetadataResponse**](https://docs.kalshi.com/python-sdk/models/GetEventMetadataResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Event metadata retrieved successfully  |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_events**

> GetEventsResponse get\_events(limit=limit, cursor=cursor, with\_nested\_markets=with\_nested\_markets, status=status, series\_ticker=series\_ticker, min\_close\_ts=min\_close\_ts)

Get Events

Get data about all events.

An event represents a real-world occurrence that can be traded on, such as an election, sports game, or economic indicator release. Events contain one or more markets where users can place trades on different outcomes.

This endpoint returns a paginated response. Use the 'limit' parameter to control page size (1-200, defaults to 100). The response includes a 'cursor' field - pass this value in the 'cursor' parameter of your next request to get the next page. An empty cursor indicates no more pages are available.

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_events_response import GetEventsResponse
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

with_nested_markets = False # bool | If true, markets are included within the event object. If false (default), markets are returned as a separate top-level field in the response. (optional) (default to False)

status = 'status_example' # str | Filter by status. Possible values depend on the endpoint. (optional)

series_ticker = 'series_ticker_example' # str | Filter by series ticker (optional)

min_close_ts = 56 # int | Filter items that close after this Unix timestamp (optional)

try:
    # Get Events
    api_response = client.get_events(limit=limit, cursor=cursor, with_nested_markets=with_nested_markets, status=status, series_ticker=series_ticker, min_close_ts=min_close_ts)
    print("The response of EventsApi->get_events:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling EventsApi->get_events: %s\n" % e)
```

### Parameters

| Name                      | Type     | Description                                                                                                                                    | Notes                           |
| ------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| **limit**                 | **int**  | Number of results per page. Defaults to 100. Maximum value is 200.                                                                             | \[optional] \[default to 100]   |
| **cursor**                | **str**  | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page.   | \[optional]                     |
| **with\_nested\_markets** | **bool** | If true, markets are included within the event object. If false (default), markets are returned as a separate top-level field in the response. | \[optional] \[default to False] |
| **status**                | **str**  | Filter by status. Possible values depend on the endpoint.                                                                                      | \[optional]                     |
| **series\_ticker**        | **str**  | Filter by series ticker                                                                                                                        | \[optional]                     |
| **min\_close\_ts**        | **int**  | Filter items that close after this Unix timestamp                                                                                              | \[optional]                     |

### Return type

[**GetEventsResponse**](https://docs.kalshi.com/python-sdk/models/GetEventsResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Events retrieved successfully          |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)
