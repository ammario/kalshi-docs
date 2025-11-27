---
url: https://docs.kalshi.com/python-sdk/api/CommunicationsApi
lastmod: 2025-11-23T22:54:23.461Z
---
# Communications

> Python SDK methods for Communications operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                                | HTTP request                                      | Description           |
| ----------------------------------------------------- | ------------------------------------------------- | --------------------- |
| [**accept\_quote**](#accept-quote)                    | **PUT** /communications/quotes/{quote_id}/accept  | Accept Quote          |
| [**confirm\_quote**](#confirm-quote)                  | **PUT** /communications/quotes/{quote_id}/confirm | Confirm Quote         |
| [**create\_quote**](#create-quote)                    | **POST** /communications/quotes                   | Create Quote          |
| [**create\_rfq**](#create-rfq)                        | **POST** /communications/rfqs                     | Create RFQ            |
| [**delete\_quote**](#delete-quote)                    | **DELETE** /communications/quotes/{quote_id}      | Delete Quote          |
| [**delete\_rfq**](#delete-rfq)                        | **DELETE** /communications/rfqs/{rfq_id}          | Delete RFQ            |
| [**get\_communications\_id**](#get-communications-id) | **GET** /communications/id                        | Get Communications ID |
| [**get\_quote**](#get-quote)                          | **GET** /communications/quotes/{quote_id}         | Get Quote             |
| [**get\_quotes**](#get-quotes)                        | **GET** /communications/quotes                    | Get Quotes            |
| [**get\_rfq**](#get-rfq)                              | **GET** /communications/rfqs/{rfq_id}             | Get RFQ               |
| [**get\_rfqs**](#get-rfqs)                            | **GET** /communications/rfqs                      | Get RFQs              |

# **accept\_quote**

> accept\_quote(quote\_id, accept\_quote\_request)

Accept Quote

Endpoint for accepting a quote. This will require the quoter to confirm

### Parameters

| Name                       | Type                                                                                   | Description | Notes |
| -------------------------- | -------------------------------------------------------------------------------------- | ----------- | ----- |
| **quote\_id**              | **str**                                                                                | Quote ID    |       |
| **accept\_quote\_request** | [**AcceptQuoteRequest**](https://docs.kalshi.com/python-sdk/models/AcceptQuoteRequest) |             |       |

### Return type

void (empty response body)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **204**     | Quote accepted successfully            |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

# **confirm\_quote**

> confirm\_quote(quote\_id)

Confirm Quote

Endpoint for confirming a quote. This will start a timer for order execution

### Parameters

| Name          | Type    | Description | Notes |
| ------------- | ------- | ----------- | ----- |
| **quote\_id** | **str** | Quote ID    |       |

### Return type

void (empty response body)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **204**     | Quote confirmed successfully           |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

# **create\_quote**

> CreateQuoteResponse create\_quote(create\_quote\_request)

Create Quote

Endpoint for creating a quote in response to an RFQ

### Parameters

| Name                       | Type                                                                                   | Description | Notes |
| -------------------------- | -------------------------------------------------------------------------------------- | ----------- | ----- |
| **create\_quote\_request** | [**CreateQuoteRequest**](https://docs.kalshi.com/python-sdk/models/CreateQuoteRequest) |             |       |

### Return type

[**CreateQuoteResponse**](https://docs.kalshi.com/python-sdk/models/CreateQuoteResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **201**     | Quote created successfully             |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

# **create\_rfq**

> CreateRFQResponse create\_rfq(create\_rfq\_request)

Create RFQ

Endpoint for creating a new RFQ. You can have a maximum of 100 open RFQs at a time.

### Parameters

| Name                     | Type                                                                               | Description | Notes |
| ------------------------ | ---------------------------------------------------------------------------------- | ----------- | ----- |
| **create\_rfq\_request** | [**CreateRFQRequest**](https://docs.kalshi.com/python-sdk/models/CreateRFQRequest) |             |       |

### Return type

[**CreateRFQResponse**](https://docs.kalshi.com/python-sdk/models/CreateRFQResponse)

### HTTP response details

| Status code | Description                                              |
| ----------- | -------------------------------------------------------- |
| **201**     | RFQ created successfully                                 |
| **400**     | Bad request - invalid input                              |
| **401**     | Unauthorized - authentication required                   |
| **409**     | Conflict - resource already exists or cannot be modified |
| **500**     | Internal server error                                    |

# **delete\_quote**

> delete\_quote(quote\_id)

Delete Quote

Endpoint for deleting a quote, which means it can no longer be accepted.

### Parameters

| Name          | Type    | Description | Notes |
| ------------- | ------- | ----------- | ----- |
| **quote\_id** | **str** | Quote ID    |       |

### Return type

void (empty response body)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **204**     | Quote deleted successfully             |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

# **delete\_rfq**

> delete\_rfq(rfq\_id)

Delete RFQ

Endpoint for deleting an RFQ by ID

### Parameters

| Name        | Type    | Description | Notes |
| ----------- | ------- | ----------- | ----- |
| **rfq\_id** | **str** | RFQ ID      |       |

### Return type

void (empty response body)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **204**     | RFQ deleted successfully               |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

# **get\_communications\_id**

> GetCommunicationsIDResponse get\_communications\_id()

Get Communications ID

Endpoint for getting the communications ID of the logged-in user.

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetCommunicationsIDResponse**](https://docs.kalshi.com/python-sdk/models/GetCommunicationsIDResponse)

### HTTP response details

| Status code | Description                              |
| ----------- | ---------------------------------------- |
| **200**     | Communications ID retrieved successfully |
| **401**     | Unauthorized - authentication required   |
| **500**     | Internal server error                    |

# **get\_quote**

> GetQuoteResponse get\_quote(quote\_id)

Get Quote

Endpoint for getting a particular quote

### Parameters

| Name          | Type    | Description | Notes |
| ------------- | ------- | ----------- | ----- |
| **quote\_id** | **str** | Quote ID    |       |

### Return type

[**GetQuoteResponse**](https://docs.kalshi.com/python-sdk/models/GetQuoteResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Quote retrieved successfully           |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

# **get\_quotes**

> GetQuotesResponse get\_quotes(cursor=cursor, event\_ticker=event\_ticker, market\_ticker=market\_ticker, limit=limit, status=status, quote\_creator\_user\_id=quote\_creator\_user\_id, rfq\_creator\_user\_id=rfq\_creator\_user\_id, rfq\_creator\_subtrader\_id=rfq\_creator\_subtrader\_id, rfq\_id=rfq\_id)

Get Quotes

Endpoint for getting quotes

### Parameters

| Name                            | Type    | Description                                                                                                                                  | Notes                         |
| ------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **cursor**                      | **str** | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | \[optional]                   |
| **event\_ticker**               | **str** | Event ticker of desired positions. Multiple event tickers can be provided as a comma-separated list (maximum 10).                            | \[optional]                   |
| **market\_ticker**              | **str** | Filter by market ticker                                                                                                                      | \[optional]                   |
| **limit**                       | **int** | Parameter to specify the number of results per page. Defaults to 500.                                                                        | \[optional] \[default to 500] |
| **status**                      | **str** | Filter quotes by status                                                                                                                      | \[optional]                   |
| **quote\_creator\_user\_id**    | **str** | Filter quotes by quote creator user ID                                                                                                       | \[optional]                   |
| **rfq\_creator\_user\_id**      | **str** | Filter quotes by RFQ creator user ID                                                                                                         | \[optional]                   |
| **rfq\_creator\_subtrader\_id** | **str** | Filter quotes by RFQ creator subtrader ID (FCM members only)                                                                                 | \[optional]                   |
| **rfq\_id**                     | **str** | Filter quotes by RFQ ID                                                                                                                      | \[optional]                   |

### Return type

[**GetQuotesResponse**](https://docs.kalshi.com/python-sdk/models/GetQuotesResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Quotes retrieved successfully          |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

# **get\_rfq**

> GetRFQResponse get\_rfq(rfq\_id)

Get RFQ

Endpoint for getting a single RFQ by id

### Parameters

| Name        | Type    | Description | Notes |
| ----------- | ------- | ----------- | ----- |
| **rfq\_id** | **str** | RFQ ID      |       |

### Return type

[**GetRFQResponse**](https://docs.kalshi.com/python-sdk/models/GetRFQResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | RFQ retrieved successfully             |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

# **get\_rfqs**

> GetRFQsResponse get\_rfqs(cursor=cursor, event\_ticker=event\_ticker, market\_ticker=market\_ticker, limit=limit, status=status, creator\_user\_id=creator\_user\_id)

Get RFQs

Endpoint for getting RFQs

### Parameters

| Name                  | Type    | Description                                                                                                                                  | Notes                         |
| --------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **cursor**            | **str** | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | \[optional]                   |
| **event\_ticker**     | **str** | Event ticker of desired positions. Multiple event tickers can be provided as a comma-separated list (maximum 10).                            | \[optional]                   |
| **market\_ticker**    | **str** | Filter by market ticker                                                                                                                      | \[optional]                   |
| **limit**             | **int** | Parameter to specify the number of results per page. Defaults to 100.                                                                        | \[optional] \[default to 100] |
| **status**            | **str** | Filter RFQs by status                                                                                                                        | \[optional]                   |
| **creator\_user\_id** | **str** | Filter RFQs by creator user ID                                                                                                               | \[optional]                   |

### Return type

[**GetRFQsResponse**](https://docs.kalshi.com/python-sdk/models/GetRFQsResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | RFQs retrieved successfully            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: /llms.txt