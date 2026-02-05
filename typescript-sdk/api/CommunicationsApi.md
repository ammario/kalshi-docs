---
url: https://docs.kalshi.com/typescript-sdk/api/CommunicationsApi
lastmod: 2026-02-04T19:40:30.609Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Communications

> TypeScript SDK methods for Communications operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                          | HTTP request                                      | Description           |
| ----------------------------------------------- | ------------------------------------------------- | --------------------- |
| [**acceptQuote**](#acceptquote)                 | **PUT** /communications/quotes/{quote_id}/accept  | Accept Quote          |
| [**confirmQuote**](#confirmquote)               | **PUT** /communications/quotes/{quote_id}/confirm | Confirm Quote         |
| [**createQuote**](#createquote)                 | **POST** /communications/quotes                   | Create Quote          |
| [**createRFQ**](#createrfq)                     | **POST** /communications/rfqs                     | Create RFQ            |
| [**deleteQuote**](#deletequote)                 | **DELETE** /communications/quotes/{quote_id}      | Delete Quote          |
| [**deleteRFQ**](#deleterfq)                     | **DELETE** /communications/rfqs/{rfq_id}          | Delete RFQ            |
| [**getCommunicationsID**](#getcommunicationsid) | **GET** /communications/id                        | Get Communications ID |
| [**getQuote**](#getquote)                       | **GET** /communications/quotes/{quote_id}         | Get Quote             |
| [**getQuotes**](#getquotes)                     | **GET** /communications/quotes                    | Get Quotes            |
| [**getRFQ**](#getrfq)                           | **GET** /communications/rfqs/{rfq_id}             | Get RFQ               |
| [**getRFQs**](#getrfqs)                         | **GET** /communications/rfqs                      | Get RFQs              |

# **acceptQuote**

> acceptQuote(acceptQuoteRequest)

Endpoint for accepting a quote. This will require the quoter to confirm

### Parameters

| Name                   | Type                   | Description | Notes                 |
| ---------------------- | ---------------------- | ----------- | --------------------- |
| **acceptQuoteRequest** | **AcceptQuoteRequest** |             |                       |
| **quoteId**            | \[**string**]          | Quote ID    | defaults to undefined |

### Return type

void (empty response body)

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: application/json
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **204**     | Quote accepted successfully            | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

# **confirmQuote**

> confirmQuote()

Endpoint for confirming a quote. This will start a timer for order execution

### Parameters

| Name        | Type          | Description | Notes                 |
| ----------- | ------------- | ----------- | --------------------- |
| **body**    | **object**    |             |                       |
| **quoteId** | \[**string**] | Quote ID    | defaults to undefined |

### Return type

void (empty response body)

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: application/json
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **204**     | Quote confirmed successfully           | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

# **createQuote**

> CreateQuoteResponse createQuote(createQuoteRequest)

Endpoint for creating a quote in response to an RFQ

### Parameters

| Name                   | Type                   | Description | Notes |
| ---------------------- | ---------------------- | ----------- | ----- |
| **createQuoteRequest** | **CreateQuoteRequest** |             |       |

### Return type

**CreateQuoteResponse**

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: application/json
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **201**     | Quote created successfully             | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

# **createRFQ**

> CreateRFQResponse createRFQ(createRFQRequest)

Endpoint for creating a new RFQ. You can have a maximum of 100 open RFQs at a time.

### Parameters

| Name                 | Type                 | Description | Notes |
| -------------------- | -------------------- | ----------- | ----- |
| **createRFQRequest** | **CreateRFQRequest** |             |       |

### Return type

**CreateRFQResponse**

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: application/json
* **Accept**: application/json

### HTTP response details

| Status code | Description                                              | Response headers |
| ----------- | -------------------------------------------------------- | ---------------- |
| **201**     | RFQ created successfully                                 | -                |
| **400**     | Bad request - invalid input                              | -                |
| **401**     | Unauthorized - authentication required                   | -                |
| **409**     | Conflict - resource already exists or cannot be modified | -                |
| **500**     | Internal server error                                    | -                |

# **deleteQuote**

> deleteQuote()

Endpoint for deleting a quote, which means it can no longer be accepted.

### Parameters

| Name        | Type          | Description | Notes                 |
| ----------- | ------------- | ----------- | --------------------- |
| **quoteId** | \[**string**] | Quote ID    | defaults to undefined |

### Return type

void (empty response body)

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **204**     | Quote deleted successfully             | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

# **deleteRFQ**

> deleteRFQ()

Endpoint for deleting an RFQ by ID

### Parameters

| Name      | Type          | Description | Notes                 |
| --------- | ------------- | ----------- | --------------------- |
| **rfqId** | \[**string**] | RFQ ID      | defaults to undefined |

### Return type

void (empty response body)

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **204**     | RFQ deleted successfully               | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

# **getCommunicationsID**

> GetCommunicationsIDResponse getCommunicationsID()

Endpoint for getting the communications ID of the logged-in user.

### Parameters

This endpoint does not have any parameters.

### Return type

**GetCommunicationsIDResponse**

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                              | Response headers |
| ----------- | ---------------------------------------- | ---------------- |
| **200**     | Communications ID retrieved successfully | -                |
| **401**     | Unauthorized - authentication required   | -                |
| **500**     | Internal server error                    | -                |

# **getQuote**

> GetQuoteResponse getQuote()

Endpoint for getting a particular quote

### Parameters

| Name        | Type          | Description | Notes                 |
| ----------- | ------------- | ----------- | --------------------- |
| **quoteId** | \[**string**] | Quote ID    | defaults to undefined |

### Return type

**GetQuoteResponse**

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Quote retrieved successfully           | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

# **getQuotes**

> GetQuotesResponse getQuotes()

Endpoint for getting quotes

### Parameters

| Name                      | Type          | Description                                                                                                                                  | Notes                            |
| ------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **cursor**                | \[**string**] | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | (optional) defaults to undefined |
| **eventTicker**           | \[**string**] | Event ticker of desired positions. Multiple event tickers can be provided as a comma-separated list (maximum 10).                            | (optional) defaults to undefined |
| **marketTicker**          | \[**string**] | Filter by market ticker                                                                                                                      | (optional) defaults to undefined |
| **limit**                 | \[**number**] | Parameter to specify the number of results per page. Defaults to 500.                                                                        | (optional) defaults to 500       |
| **status**                | \[**string**] | Filter quotes by status                                                                                                                      | (optional) defaults to undefined |
| **quoteCreatorUserId**    | \[**string**] | Filter quotes by quote creator user ID                                                                                                       | (optional) defaults to undefined |
| **rfqCreatorUserId**      | \[**string**] | Filter quotes by RFQ creator user ID                                                                                                         | (optional) defaults to undefined |
| **rfqCreatorSubtraderId** | \[**string**] | Filter quotes by RFQ creator subtrader ID (FCM members only)                                                                                 | (optional) defaults to undefined |
| **rfqId**                 | \[**string**] | Filter quotes by RFQ ID                                                                                                                      | (optional) defaults to undefined |

### Return type

**GetQuotesResponse**

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Quotes retrieved successfully          | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

# **getRFQ**

> GetRFQResponse getRFQ()

Endpoint for getting a single RFQ by id

### Parameters

| Name      | Type          | Description | Notes                 |
| --------- | ------------- | ----------- | --------------------- |
| **rfqId** | \[**string**] | RFQ ID      | defaults to undefined |

### Return type

**GetRFQResponse**

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | RFQ retrieved successfully             | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

# **getRFQs**

> GetRFQsResponse getRFQs()

Endpoint for getting RFQs

### Parameters

| Name              | Type          | Description                                                                                                                                  | Notes                            |
| ----------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **cursor**        | \[**string**] | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | (optional) defaults to undefined |
| **eventTicker**   | \[**string**] | Event ticker of desired positions. Multiple event tickers can be provided as a comma-separated list (maximum 10).                            | (optional) defaults to undefined |
| **marketTicker**  | \[**string**] | Filter by market ticker                                                                                                                      | (optional) defaults to undefined |
| **subaccount**    | \[**number**] | Subaccount number (0 for primary, 1-32 for subaccounts). If omitted, returns results across all subaccounts.                                 | (optional) defaults to undefined |
| **limit**         | \[**number**] | Parameter to specify the number of results per page. Defaults to 100.                                                                        | (optional) defaults to 100       |
| **status**        | \[**string**] | Filter RFQs by status                                                                                                                        | (optional) defaults to undefined |
| **creatorUserId** | \[**string**] | Filter RFQs by creator user ID                                                                                                               | (optional) defaults to undefined |

### Return type

**GetRFQsResponse**

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | RFQs retrieved successfully            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |
