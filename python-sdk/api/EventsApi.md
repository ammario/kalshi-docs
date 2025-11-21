---
url: https://docs.kalshi.com/python-sdk/api/EventsApi
lastmod: 2025-11-20T17:55:12.065Z
---
# Events

> Python SDK methods for Events operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                                                                    | HTTP request                                                                  | Description                              |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------- |
| [**get\_event**](#get-event)                                                              | **GET** /events/{event_ticker}                                                | Get Event                                |
| [**get\_event\_forecast\_percentiles\_history**](#get-event-forecast-percentiles-history) | **GET** /series/{series_ticker}/events/{ticker}/forecast\_percentile\_history | Get Event Forecast Percentile History    |
| [**get\_event\_metadata**](#get-event-metadata)                                           | **GET** /events/{event_ticker}/metadata                                       | Get Event Metadata                       |
| [**get\_events**](#get-events)                                                            | **GET** /events                                                               | Get Events                               |
| [**get\_events\_candlesticks**](#get-events-candlesticks)                                 | **GET** /events/candlesticks                                                  | Get Event Candlesticks (Multiple Events) |
| [**get\_market\_candlesticks\_by\_event**](#get-market-candlesticks-by-event)             | **GET** /series/{series_ticker}/events/{ticker}/candlesticks                  | Get Event Candlesticks                   |
| [**get\_multivariate\_events**](#get-multivariate-events)                                 | **GET** /events/multivariate                                                  | Get Multivariate Events                  |

# **get\_event**

> GetEventResponse get\_event(event\_ticker, with\_nested\_markets=with\_nested\_markets)

Get Event

Endpoint for getting data about an event by its ticker.  An event represents a real-world occurrence that can be traded on, such as an election, sports game, or economic indicator release. Events contain one or more markets where users can place trades on different outcomes.

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

| Status code | Description                  |
| ----------- | ---------------------------- |
| **200**     | Event retrieved successfully |
| **400**     | Bad request                  |
| **404**     | Event not found              |
| **401**     | Unauthorized                 |
| **500**     | Internal server error        |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_event\_forecast\_percentiles\_history**

> GetEventForecastPercentilesHistoryResponse get\_event\_forecast\_percentiles\_history(ticker, series\_ticker, percentiles, start\_ts, end\_ts, period\_interval)

Get Event Forecast Percentile History

Endpoint for getting the historical raw and formatted forecast numbers for an event at specific percentiles.

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_event_forecast_percentiles_history_response import GetEventForecastPercentilesHistoryResponse
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

ticker = 'ticker_example' # str | The event ticker

series_ticker = 'series_ticker_example' # str | The series ticker

percentiles = [56] # List[int] | Array of percentile values to retrieve (0-10000, max 10 values)

start_ts = 56 # int | Start timestamp for the range

end_ts = 56 # int | End timestamp for the range

period_interval = 56 # int | Specifies the length of each forecast period, in minutes. 0 for 5-second intervals, or 1, 60, or 1440 for minute-based intervals.

try:
    # Get Event Forecast Percentile History
    api_response = client.get_event_forecast_percentiles_history(ticker, series_ticker, percentiles, start_ts, end_ts, period_interval)
    print("The response of EventsApi->get_event_forecast_percentiles_history:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling EventsApi->get_event_forecast_percentiles_history: %s\n" % e)
```

### Parameters

| Name                 | Type                                                             | Description                                                                                                                       | Notes |
| -------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **ticker**           | **str**                                                          | The event ticker                                                                                                                  |       |
| **series\_ticker**   | **str**                                                          | The series ticker                                                                                                                 |       |
| **percentiles**      | [**List\[int\]**](https://docs.kalshi.com/python-sdk/models/int) | Array of percentile values to retrieve (0-10000, max 10 values)                                                                   |       |
| **start\_ts**        | **int**                                                          | Start timestamp for the range                                                                                                     |       |
| **end\_ts**          | **int**                                                          | End timestamp for the range                                                                                                       |       |
| **period\_interval** | **int**                                                          | Specifies the length of each forecast period, in minutes. 0 for 5-second intervals, or 1, 60, or 1440 for minute-based intervals. |       |

### Return type

[**GetEventForecastPercentilesHistoryResponse**](https://docs.kalshi.com/python-sdk/models/GetEventForecastPercentilesHistoryResponse)

### HTTP response details

| Status code | Description                                              |
| ----------- | -------------------------------------------------------- |
| **200**     | Event forecast percentile history retrieved successfully |
| **400**     | Bad request                                              |
| **401**     | Unauthorized                                             |
| **500**     | Internal server error                                    |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_event\_metadata**

> GetEventMetadataResponse get\_event\_metadata(event\_ticker)

Get Event Metadata

Endpoint for getting metadata about an event by its ticker.  Returns only the metadata information for an event.

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

| Status code | Description                           |
| ----------- | ------------------------------------- |
| **200**     | Event metadata retrieved successfully |
| **400**     | Bad request                           |
| **404**     | Event not found                       |
| **401**     | Unauthorized                          |
| **500**     | Internal server error                 |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_events**

> GetEventsResponse get\_events(limit=limit, cursor=cursor, with\_nested\_markets=with\_nested\_markets, with\_milestones=with\_milestones, status=status, series\_ticker=series\_ticker, min\_close\_ts=min\_close\_ts)

Get Events

Filter by event status. Possible values: 'open', 'closed', 'settled'. Leave empty to return events with any status.

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


# Initialize the Kalshi client
client = kalshi_python.KalshiClient(configuration)

limit = 200 # int | Parameter to specify the number of results per page. Defaults to 200. Maximum value is 200. (optional) (default to 200)

cursor = 'cursor_example' # str | Parameter to specify the pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. (optional)

with_nested_markets = False # bool | Parameter to specify if nested markets should be included in the response. When true, each event will include a 'markets' field containing a list of Market objects associated with that event. (optional) (default to False)

with_milestones = False # bool | If true, includes related milestones as a field alongside events. (optional) (default to False)

status = 'status_example' # str | Filter by event status. Possible values are 'open', 'closed', 'settled'. Leave empty to return events with any status. (optional)

series_ticker = 'series_ticker_example' # str | Filter by series ticker (optional)

min_close_ts = 56 # int | Filter events with at least one market with close timestamp greater than this Unix timestamp (in seconds). (optional)

try:
    # Get Events
    api_response = client.get_events(limit=limit, cursor=cursor, with_nested_markets=with_nested_markets, with_milestones=with_milestones, status=status, series_ticker=series_ticker, min_close_ts=min_close_ts)
    print("The response of EventsApi->get_events:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling EventsApi->get_events: %s\n" % e)
```

### Parameters

| Name                      | Type     | Description                                                                                                                                                                                     | Notes                           |
| ------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| **limit**                 | **int**  | Parameter to specify the number of results per page. Defaults to 200. Maximum value is 200.                                                                                                     | \[optional] \[default to 200]   |
| **cursor**                | **str**  | Parameter to specify the pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page.                           | \[optional]                     |
| **with\_nested\_markets** | **bool** | Parameter to specify if nested markets should be included in the response. When true, each event will include a 'markets' field containing a list of Market objects associated with that event. | \[optional] \[default to False] |
| **with\_milestones**      | **bool** | If true, includes related milestones as a field alongside events.                                                                                                                               | \[optional] \[default to False] |
| **status**                | **str**  | Filter by event status. Possible values are 'open', 'closed', 'settled'. Leave empty to return events with any status.                                                                          | \[optional]                     |
| **series\_ticker**        | **str**  | Filter by series ticker                                                                                                                                                                         | \[optional]                     |
| **min\_close\_ts**        | **int**  | Filter events with at least one market with close timestamp greater than this Unix timestamp (in seconds).                                                                                      | \[optional]                     |

### Return type

[**GetEventsResponse**](https://docs.kalshi.com/python-sdk/models/GetEventsResponse)

### HTTP response details

| Status code | Description                   |
| ----------- | ----------------------------- |
| **200**     | Events retrieved successfully |
| **400**     | Bad request                   |
| **401**     | Unauthorized                  |
| **500**     | Internal server error         |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_events\_candlesticks**

> GetEventsCandlesticksResponse get\_events\_candlesticks(event\_tickers, start\_ts, end\_ts, period\_interval)

Get Event Candlesticks (Multiple Events)

End-point for returning aggregated data across all markets corresponding to multiple events. Limited to 5000 candlesticks total across all events and markets.

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_events_candlesticks_response import GetEventsCandlesticksResponse
from kalshi_python.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.elections.kalshi.com/trade-api/v2
# See configuration.py for a list of all supported configuration parameters.
configuration = kalshi_python.Configuration(
    host = "https://api.elections.kalshi.com/trade-api/v2"
)


# Initialize the Kalshi client
client = kalshi_python.KalshiClient(configuration)

event_tickers = 'event_tickers_example' # str | Comma-separated list of event tickers

start_ts = 56 # int | Start timestamp for the range

end_ts = 56 # int | End timestamp for the range

period_interval = 56 # int | Specifies the length of each candlestick period, in minutes. Must be one minute, one hour, or one day.

try:
    # Get Event Candlesticks (Multiple Events)
    api_response = client.get_events_candlesticks(event_tickers, start_ts, end_ts, period_interval)
    print("The response of EventsApi->get_events_candlesticks:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling EventsApi->get_events_candlesticks: %s\n" % e)
```

### Parameters

| Name                 | Type    | Description                                                                                            | Notes |
| -------------------- | ------- | ------------------------------------------------------------------------------------------------------ | ----- |
| **event\_tickers**   | **str** | Comma-separated list of event tickers                                                                  |       |
| **start\_ts**        | **int** | Start timestamp for the range                                                                          |       |
| **end\_ts**          | **int** | End timestamp for the range                                                                            |       |
| **period\_interval** | **int** | Specifies the length of each candlestick period, in minutes. Must be one minute, one hour, or one day. |       |

### Return type

[**GetEventsCandlesticksResponse**](https://docs.kalshi.com/python-sdk/models/GetEventsCandlesticksResponse)

### HTTP response details

| Status code | Description                               |
| ----------- | ----------------------------------------- |
| **200**     | Event candlesticks retrieved successfully |
| **400**     | Bad request                               |
| **401**     | Unauthorized                              |
| **500**     | Internal server error                     |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_market\_candlesticks\_by\_event**

> GetEventCandlesticksResponse get\_market\_candlesticks\_by\_event(ticker, series\_ticker, start\_ts, end\_ts, period\_interval)

Get Event Candlesticks

End-point for returning aggregated data across all markets corresponding to an event.

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_event_candlesticks_response import GetEventCandlesticksResponse
from kalshi_python.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.elections.kalshi.com/trade-api/v2
# See configuration.py for a list of all supported configuration parameters.
configuration = kalshi_python.Configuration(
    host = "https://api.elections.kalshi.com/trade-api/v2"
)


# Initialize the Kalshi client
client = kalshi_python.KalshiClient(configuration)

ticker = 'ticker_example' # str | The event ticker

series_ticker = 'series_ticker_example' # str | The series ticker

start_ts = 56 # int | Start timestamp for the range

end_ts = 56 # int | End timestamp for the range

period_interval = 56 # int | Specifies the length of each candlestick period, in minutes. Must be one minute, one hour, or one day.

try:
    # Get Event Candlesticks
    api_response = client.get_market_candlesticks_by_event(ticker, series_ticker, start_ts, end_ts, period_interval)
    print("The response of EventsApi->get_market_candlesticks_by_event:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling EventsApi->get_market_candlesticks_by_event: %s\n" % e)
```

### Parameters

| Name                 | Type    | Description                                                                                            | Notes |
| -------------------- | ------- | ------------------------------------------------------------------------------------------------------ | ----- |
| **ticker**           | **str** | The event ticker                                                                                       |       |
| **series\_ticker**   | **str** | The series ticker                                                                                      |       |
| **start\_ts**        | **int** | Start timestamp for the range                                                                          |       |
| **end\_ts**          | **int** | End timestamp for the range                                                                            |       |
| **period\_interval** | **int** | Specifies the length of each candlestick period, in minutes. Must be one minute, one hour, or one day. |       |

### Return type

[**GetEventCandlesticksResponse**](https://docs.kalshi.com/python-sdk/models/GetEventCandlesticksResponse)

### HTTP response details

| Status code | Description                               |
| ----------- | ----------------------------------------- |
| **200**     | Event candlesticks retrieved successfully |
| **400**     | Bad request                               |
| **401**     | Unauthorized                              |
| **500**     | Internal server error                     |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_multivariate\_events**

> GetMultivariateEventsResponse get\_multivariate\_events(limit=limit, cursor=cursor, series\_ticker=series\_ticker, collection\_ticker=collection\_ticker, with\_nested\_markets=with\_nested\_markets)

Get Multivariate Events

Retrieve multivariate (combo) events. These are dynamically created events from multivariate event collections. Supports filtering by series and collection ticker.

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_multivariate_events_response import GetMultivariateEventsResponse
from kalshi_python.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.elections.kalshi.com/trade-api/v2
# See configuration.py for a list of all supported configuration parameters.
configuration = kalshi_python.Configuration(
    host = "https://api.elections.kalshi.com/trade-api/v2"
)


# Initialize the Kalshi client
client = kalshi_python.KalshiClient(configuration)

limit = 100 # int | Number of results per page. Defaults to 100. Maximum value is 200. (optional) (default to 100)

cursor = 'cursor_example' # str | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. (optional)

series_ticker = 'series_ticker_example' # str | Filter by series ticker (optional)

collection_ticker = 'collection_ticker_example' # str | Filter events by collection ticker. Returns only multivariate events belonging to the specified collection. Cannot be used together with series_ticker. (optional)

with_nested_markets = False # bool | Parameter to specify if nested markets should be included in the response. When true, each event will include a 'markets' field containing a list of Market objects associated with that event. (optional) (default to False)

try:
    # Get Multivariate Events
    api_response = client.get_multivariate_events(limit=limit, cursor=cursor, series_ticker=series_ticker, collection_ticker=collection_ticker, with_nested_markets=with_nested_markets)
    print("The response of EventsApi->get_multivariate_events:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling EventsApi->get_multivariate_events: %s\n" % e)
```

### Parameters

| Name                      | Type     | Description                                                                                                                                                                                     | Notes                           |
| ------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| **limit**                 | **int**  | Number of results per page. Defaults to 100. Maximum value is 200.                                                                                                                              | \[optional] \[default to 100]   |
| **cursor**                | **str**  | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results.                                                                                    | \[optional]                     |
| **series\_ticker**        | **str**  | Filter by series ticker                                                                                                                                                                         | \[optional]                     |
| **collection\_ticker**    | **str**  | Filter events by collection ticker. Returns only multivariate events belonging to the specified collection. Cannot be used together with series\_ticker.                                        | \[optional]                     |
| **with\_nested\_markets** | **bool** | Parameter to specify if nested markets should be included in the response. When true, each event will include a 'markets' field containing a list of Market objects associated with that event. | \[optional] \[default to False] |

### Return type

[**GetMultivariateEventsResponse**](https://docs.kalshi.com/python-sdk/models/GetMultivariateEventsResponse)

### HTTP response details

| Status code | Description                                |
| ----------- | ------------------------------------------ |
| **200**     | Multivariate events retrieved successfully |
| **400**     | Bad request - invalid parameters           |
| **401**     | Unauthorized                               |
| **500**     | Internal server error                      |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)
