---
url: https://docs.kalshi.com/python-sdk/api/EventsApi
lastmod: 2026-01-27T00:10:36.706Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Events

> Python SDK methods for Events operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                                                                    | HTTP request                                                                  | Description                           |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------- |
| [**get\_event**](#get-event)                                                              | **GET** /events/{event_ticker}                                                | Get Event                             |
| [**get\_event\_forecast\_percentiles\_history**](#get-event-forecast-percentiles-history) | **GET** /series/{series_ticker}/events/{ticker}/forecast\_percentile\_history | Get Event Forecast Percentile History |
| [**get\_event\_metadata**](#get-event-metadata)                                           | **GET** /events/{event_ticker}/metadata                                       | Get Event Metadata                    |
| [**get\_events**](#get-events)                                                            | **GET** /events                                                               | Get Events                            |
| [**get\_market\_candlesticks\_by\_event**](#get-market-candlesticks-by-event)             | **GET** /series/{series_ticker}/events/{ticker}/candlesticks                  | Get Event Candlesticks                |
| [**get\_multivariate\_events**](#get-multivariate-events)                                 | **GET** /events/multivariate                                                  | Get Multivariate Events               |

# **get\_event**

> GetEventResponse get\_event(event\_ticker, with\_nested\_markets=with\_nested\_markets)

Get Event

Endpoint for getting data about an event by its ticker.  An event represents a real-world occurrence that can be traded on, such as an election, sports game, or economic indicator release. Events contain one or more markets where users can place trades on different outcomes.

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

# **get\_event\_forecast\_percentiles\_history**

> GetEventForecastPercentilesHistoryResponse get\_event\_forecast\_percentiles\_history(ticker, series\_ticker, percentiles, start\_ts, end\_ts, period\_interval)

Get Event Forecast Percentile History

Endpoint for getting the historical raw and formatted forecast numbers for an event at specific percentiles.

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

# **get\_event\_metadata**

> GetEventMetadataResponse get\_event\_metadata(event\_ticker)

Get Event Metadata

Endpoint for getting metadata about an event by its ticker.  Returns only the metadata information for an event.

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

# **get\_events**

> GetEventsResponse get\_events(limit=limit, cursor=cursor, with\_nested\_markets=with\_nested\_markets, with\_milestones=with\_milestones, status=status, series\_ticker=series\_ticker, min\_close\_ts=min\_close\_ts)

Get Events

Filter by event status. Possible values: 'open', 'closed', 'settled'. Leave empty to return events with any status.

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

# **get\_market\_candlesticks\_by\_event**

> GetEventCandlesticksResponse get\_market\_candlesticks\_by\_event(ticker, series\_ticker, start\_ts, end\_ts, period\_interval)

Get Event Candlesticks

End-point for returning aggregated data across all markets corresponding to an event.

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

# **get\_multivariate\_events**

> GetMultivariateEventsResponse get\_multivariate\_events(limit=limit, cursor=cursor, series\_ticker=series\_ticker, collection\_ticker=collection\_ticker, with\_nested\_markets=with\_nested\_markets)

Get Multivariate Events

Retrieve multivariate (combo) events. These are dynamically created events from multivariate event collections. Supports filtering by series and collection ticker.

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
