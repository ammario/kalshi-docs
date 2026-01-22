---
url: https://docs.kalshi.com/python-sdk/api/ExchangeApi
lastmod: 2026-01-22T00:35:02.207Z
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

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetExchangeAnnouncementsResponse**](https://docs.kalshi.com/python-sdk/models/GetExchangeAnnouncementsResponse)

### HTTP response details

| Status code | Description                                   |
| ----------- | --------------------------------------------- |
| **200**     | Exchange announcements retrieved successfully |
| **500**     | Internal server error                         |

# **get\_exchange\_schedule**

> GetExchangeScheduleResponse get\_exchange\_schedule()

Get Exchange Schedule

Endpoint for getting the exchange schedule.

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetExchangeScheduleResponse**](https://docs.kalshi.com/python-sdk/models/GetExchangeScheduleResponse)

### HTTP response details

| Status code | Description                              |
| ----------- | ---------------------------------------- |
| **200**     | Exchange schedule retrieved successfully |
| **500**     | Internal server error                    |

# **get\_exchange\_status**

> ExchangeStatus get\_exchange\_status()

Get Exchange Status

Endpoint for getting the exchange status.

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

# **get\_series\_fee\_changes**

> GetSeriesFeeChangesResponse get\_series\_fee\_changes(series\_ticker=series\_ticker, show\_historical=show\_historical)

Get Series Fee Changes

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

# **get\_user\_data\_timestamp**

> GetUserDataTimestampResponse get\_user\_data\_timestamp()

Get User Data Timestamp

There is typically a short delay before exchange events are reflected in the API endpoints. Whenever possible, combine API responses to PUT/POST/DELETE requests with websocket data to obtain the most accurate view of the exchange state. This endpoint provides an approximate indication of when the data from the following endpoints was last validated: GetBalance, GetOrder(s), GetFills, GetPositions

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetUserDataTimestampResponse**](https://docs.kalshi.com/python-sdk/models/GetUserDataTimestampResponse)

### HTTP response details

| Status code | Description                                |
| ----------- | ------------------------------------------ |
| **200**     | User data timestamp retrieved successfully |
| **500**     | Internal server error                      |


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt