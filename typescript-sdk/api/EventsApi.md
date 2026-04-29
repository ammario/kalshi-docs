---
url: https://docs.kalshi.com/typescript-sdk/api/EventsApi
lastmod: 2026-04-28T23:46:47.633Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Events

> TypeScript SDK methods for Events operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                                                        | HTTP request                                                                  | Description                           |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------- |
| [**getEvent**](#getevent)                                                     | **GET** /events/{event_ticker}                                                | Get Event                             |
| [**getEventForecastPercentilesHistory**](#geteventforecastpercentileshistory) | **GET** /series/{series_ticker}/events/{ticker}/forecast\_percentile\_history | Get Event Forecast Percentile History |
| [**getEventMetadata**](#geteventmetadata)                                     | **GET** /events/{event_ticker}/metadata                                       | Get Event Metadata                    |
| [**getEvents**](#getevents)                                                   | **GET** /events                                                               | Get Events                            |
| [**getMarketCandlesticksByEvent**](#getmarketcandlesticksbyevent)             | **GET** /series/{series_ticker}/events/{ticker}/candlesticks                  | Get Event Candlesticks                |
| [**getMultivariateEvents**](#getmultivariateevents)                           | **GET** /events/multivariate                                                  | Get Multivariate Events               |

# **getEvent**

> GetEventResponse getEvent()

Endpoint for getting data about an event by its ticker. An event represents a real-world occurrence that can be traded on, such as an election, sports game, or economic indicator release. Events contain one or more markets where users can place trades on different outcomes. All events are accessible through this endpoint, even if their associated markets are older than the historical cutoff.

### Parameters

| Name                  | Type           | Description                                                                                                                                                                                                                  | Notes                        |
| --------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| **eventTicker**       | \[**string**]  | Event ticker                                                                                                                                                                                                                 | defaults to undefined        |
| **withNestedMarkets** | \[**boolean**] | If true, markets are included within the event object. If false (default), markets are returned as a separate top-level field in the response. Historical markets settled before the historical cutoff will not be included. | (optional) defaults to false |

### Return type

**GetEventResponse**

### Authorization

No authorization required

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | Event retrieved successfully | -                |
| **400**     | Bad request                  | -                |
| **404**     | Event not found              | -                |
| **401**     | Unauthorized                 | -                |
| **500**     | Internal server error        | -                |

# **getEventForecastPercentilesHistory**

> GetEventForecastPercentilesHistoryResponse getEventForecastPercentilesHistory()

Endpoint for getting the historical raw and formatted forecast numbers for an event at specific percentiles.

### Parameters

| Name               | Type               | Description                                                     | Notes                 |                                           |                                                                                                                                   |                       |
| ------------------ | ------------------ | --------------------------------------------------------------- | --------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| **ticker**         | \[**string**]      | The event ticker                                                | defaults to undefined |                                           |                                                                                                                                   |                       |
| **seriesTicker**   | \[**string**]      | The series ticker                                               | defaults to undefined |                                           |                                                                                                                                   |                       |
| **percentiles**    | **Array\<number>** | Array of percentile values to retrieve (0-10000, max 10 values) | defaults to undefined |                                           |                                                                                                                                   |                       |
| **startTs**        | \[**number**]      | Start timestamp for the range                                   | defaults to undefined |                                           |                                                                                                                                   |                       |
| **endTs**          | \[**number**]      | End timestamp for the range                                     | defaults to undefined |                                           |                                                                                                                                   |                       |
| **periodInterval** | \[\*\*0            | 1                                                               | 60                    | 1440\*\*]**Array\<0 \| 1 \| 60 \| 1440>** | Specifies the length of each forecast period, in minutes. 0 for 5-second intervals, or 1, 60, or 1440 for minute-based intervals. | defaults to undefined |

### Return type

**GetEventForecastPercentilesHistoryResponse**

### Authorization

No authorization required

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                                              | Response headers |
| ----------- | -------------------------------------------------------- | ---------------- |
| **200**     | Event forecast percentile history retrieved successfully | -                |
| **400**     | Bad request                                              | -                |
| **401**     | Unauthorized                                             | -                |
| **500**     | Internal server error                                    | -                |

# **getEventMetadata**

> GetEventMetadataResponse getEventMetadata()

Endpoint for getting metadata about an event by its ticker.  Returns only the metadata information for an event.

### Parameters

| Name            | Type          | Description  | Notes                 |
| --------------- | ------------- | ------------ | --------------------- |
| **eventTicker** | \[**string**] | Event ticker | defaults to undefined |

### Return type

**GetEventMetadataResponse**

### Authorization

No authorization required

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                           | Response headers |
| ----------- | ------------------------------------- | ---------------- |
| **200**     | Event metadata retrieved successfully | -                |
| **400**     | Bad request                           | -                |
| **404**     | Event not found                       | -                |
| **401**     | Unauthorized                          | -                |
| **500**     | Internal server error                 | -                |

# **getEvents**

> GetEventsResponse getEvents()

Get all events. This endpoint excludes multivariate events. To retrieve multivariate events, use the GET /events/multivariate endpoint. All events are accessible through this endpoint, even if their associated markets are older than the historical cutoff.

### Parameters

| Name                  | Type             | Description                                                                                                                                                                                                                                                                             | Notes                            |                                                                         |                                                                                                                                                                            |                                  |
| --------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **limit**             | \[**number**]    | Parameter to specify the number of results per page. Defaults to 200. Maximum value is 200.                                                                                                                                                                                             | (optional) defaults to 200       |                                                                         |                                                                                                                                                                            |                                  |
| **cursor**            | \[**string**]    | Parameter to specify the pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page.                                                                                                                   | (optional) defaults to undefined |                                                                         |                                                                                                                                                                            |                                  |
| **withNestedMarkets** | \[**boolean**]   | Parameter to specify if nested markets should be included in the response. When true, each event will include a \&#39;markets\&#39; field containing a list of Market objects associated with that event. Historical markets settled before the historical cutoff will not be included. | (optional) defaults to false     |                                                                         |                                                                                                                                                                            |                                  |
| **withMilestones**    | \[**boolean**]   | If true, includes related milestones as a field alongside events.                                                                                                                                                                                                                       | (optional) defaults to false     |                                                                         |                                                                                                                                                                            |                                  |
| **status**            | \[\*\*'unopened' | 'open'                                                                                                                                                                                                                                                                                  | 'closed'                         | 'settled'\*\*]**Array\<'unopened' \| 'open' \| 'closed' \| 'settled'>** | Filter by event status. Possible values are \&#39;unopened\&#39;, \&#39;open\&#39;, \&#39;closed\&#39;, \&#39;settled\&#39;. Leave empty to return events with any status. | (optional) defaults to undefined |
| **seriesTicker**      | \[**string**]    | Filter by series ticker                                                                                                                                                                                                                                                                 | (optional) defaults to undefined |                                                                         |                                                                                                                                                                            |                                  |
| **minCloseTs**        | \[**number**]    | Filter events with at least one market with close timestamp greater than this Unix timestamp (in seconds).                                                                                                                                                                              | (optional) defaults to undefined |                                                                         |                                                                                                                                                                            |                                  |
| **minUpdatedTs**      | \[**number**]    | Filter events with metadata updated after this Unix timestamp (in seconds). Use this to efficiently poll for changes.                                                                                                                                                                   | (optional) defaults to undefined |                                                                         |                                                                                                                                                                            |                                  |

### Return type

**GetEventsResponse**

### Authorization

No authorization required

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                   | Response headers |
| ----------- | ----------------------------- | ---------------- |
| **200**     | Events retrieved successfully | -                |
| **400**     | Bad request                   | -                |
| **401**     | Unauthorized                  | -                |
| **500**     | Internal server error         | -                |

# **getMarketCandlesticksByEvent**

> GetEventCandlesticksResponse getMarketCandlesticksByEvent()

End-point for returning aggregated data across all markets corresponding to an event.

### Parameters

| Name               | Type          | Description                   | Notes                                |                                                                                                        |                       |
| ------------------ | ------------- | ----------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------ | --------------------- |
| **ticker**         | \[**string**] | The event ticker              | defaults to undefined                |                                                                                                        |                       |
| **seriesTicker**   | \[**string**] | The series ticker             | defaults to undefined                |                                                                                                        |                       |
| **startTs**        | \[**number**] | Start timestamp for the range | defaults to undefined                |                                                                                                        |                       |
| **endTs**          | \[**number**] | End timestamp for the range   | defaults to undefined                |                                                                                                        |                       |
| **periodInterval** | \[\*\*1       | 60                            | 1440\*\*]**Array\<1 \| 60 \| 1440>** | Specifies the length of each candlestick period, in minutes. Must be one minute, one hour, or one day. | defaults to undefined |

### Return type

**GetEventCandlesticksResponse**

### Authorization

No authorization required

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                               | Response headers |
| ----------- | ----------------------------------------- | ---------------- |
| **200**     | Event candlesticks retrieved successfully | -                |
| **400**     | Bad request                               | -                |
| **401**     | Unauthorized                              | -                |
| **500**     | Internal server error                     | -                |

# **getMultivariateEvents**

> GetMultivariateEventsResponse getMultivariateEvents()

Retrieve multivariate (combo) events. These are dynamically created events from multivariate event collections. Supports filtering by series and collection ticker.

### Parameters

| Name                  | Type           | Description                                                                                                                                                                                               | Notes                            |
| --------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **limit**             | \[**number**]  | Number of results per page. Defaults to 100. Maximum value is 200.                                                                                                                                        | (optional) defaults to 100       |
| **cursor**            | \[**string**]  | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results.                                                                                              | (optional) defaults to undefined |
| **seriesTicker**      | \[**string**]  | Filter by series ticker                                                                                                                                                                                   | (optional) defaults to undefined |
| **collectionTicker**  | \[**string**]  | Filter events by collection ticker. Returns only multivariate events belonging to the specified collection. Cannot be used together with series\_ticker.                                                  | (optional) defaults to undefined |
| **withNestedMarkets** | \[**boolean**] | Parameter to specify if nested markets should be included in the response. When true, each event will include a \&#39;markets\&#39; field containing a list of Market objects associated with that event. | (optional) defaults to false     |

### Return type

**GetMultivariateEventsResponse**

### Authorization

No authorization required

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                                | Response headers |
| ----------- | ------------------------------------------ | ---------------- |
| **200**     | Multivariate events retrieved successfully | -                |
| **400**     | Bad request - invalid parameters           | -                |
| **401**     | Unauthorized                               | -                |
| **500**     | Internal server error                      | -                |
