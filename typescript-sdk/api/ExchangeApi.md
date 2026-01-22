---
url: https://docs.kalshi.com/typescript-sdk/api/ExchangeApi
lastmod: 2026-01-22T00:35:02.792Z
---
# Exchange

> TypeScript SDK methods for Exchange operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                                    | HTTP request                            | Description                |
| --------------------------------------------------------- | --------------------------------------- | -------------------------- |
| [**getExchangeAnnouncements**](#getexchangeannouncements) | **GET** /exchange/announcements         | Get Exchange Announcements |
| [**getExchangeSchedule**](#getexchangeschedule)           | **GET** /exchange/schedule              | Get Exchange Schedule      |
| [**getExchangeStatus**](#getexchangestatus)               | **GET** /exchange/status                | Get Exchange Status        |
| [**getSeriesFeeChanges**](#getseriesfeechanges)           | **GET** /series/fee\_changes            | Get Series Fee Changes     |
| [**getUserDataTimestamp**](#getuserdatatimestamp)         | **GET** /exchange/user\_data\_timestamp | Get User Data Timestamp    |

# **getExchangeAnnouncements**

> GetExchangeAnnouncementsResponse getExchangeAnnouncements()

Endpoint for getting all exchange-wide announcements.

### Parameters

This endpoint does not have any parameters.

### Return type

**GetExchangeAnnouncementsResponse**

### Authorization

No authorization required

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                                   | Response headers |
| ----------- | --------------------------------------------- | ---------------- |
| **200**     | Exchange announcements retrieved successfully | -                |
| **500**     | Internal server error                         | -                |

# **getExchangeSchedule**

> GetExchangeScheduleResponse getExchangeSchedule()

Endpoint for getting the exchange schedule.

### Parameters

This endpoint does not have any parameters.

### Return type

**GetExchangeScheduleResponse**

### Authorization

No authorization required

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                              | Response headers |
| ----------- | ---------------------------------------- | ---------------- |
| **200**     | Exchange schedule retrieved successfully | -                |
| **500**     | Internal server error                    | -                |

# **getExchangeStatus**

> ExchangeStatus getExchangeStatus()

Endpoint for getting the exchange status.

### Parameters

This endpoint does not have any parameters.

### Return type

**ExchangeStatus**

### Authorization

No authorization required

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Exchange status retrieved successfully | -                |
| **500**     | Internal server error                  | -                |
| **503**     | Service unavailable                    | -                |
| **504**     | Gateway timeout                        | -                |

# **getSeriesFeeChanges**

> GetSeriesFeeChangesResponse getSeriesFeeChanges()

### Parameters

| Name               | Type           | Description | Notes                            |
| ------------------ | -------------- | ----------- | -------------------------------- |
| **seriesTicker**   | \[**string**]  |             | (optional) defaults to undefined |
| **showHistorical** | \[**boolean**] |             | (optional) defaults to false     |

### Return type

**GetSeriesFeeChangesResponse**

### Authorization

No authorization required

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                               | Response headers |
| ----------- | ----------------------------------------- | ---------------- |
| **200**     | Series fee changes retrieved successfully | -                |
| **400**     | Bad request - invalid input               | -                |
| **500**     | Internal server error                     | -                |

# **getUserDataTimestamp**

> GetUserDataTimestampResponse getUserDataTimestamp()

There is typically a short delay before exchange events are reflected in the API endpoints. Whenever possible, combine API responses to PUT/POST/DELETE requests with websocket data to obtain the most accurate view of the exchange state. This endpoint provides an approximate indication of when the data from the following endpoints was last validated: GetBalance, GetOrder(s), GetFills, GetPositions

### Parameters

This endpoint does not have any parameters.

### Return type

**GetUserDataTimestampResponse**

### Authorization

No authorization required

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                                | Response headers |
| ----------- | ------------------------------------------ | ---------------- |
| **200**     | User data timestamp retrieved successfully | -                |
| **500**     | Internal server error                      | -                |


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt