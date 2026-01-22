---
url: https://docs.kalshi.com/python-sdk/api/PortfolioApi
lastmod: 2026-01-22T00:35:02.255Z
---
# Portfolio

> Python SDK methods for Portfolio operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                                                                       | HTTP request                                            | Description                   |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------- |
| [**get\_balance**](#get-balance)                                                             | **GET** /portfolio/balance                              | Get Balance                   |
| [**get\_fills**](#get-fills)                                                                 | **GET** /portfolio/fills                                | Get Fills                     |
| [**get\_portfolio\_resting\_order\_total\_value**](#get-portfolio-resting-order-total-value) | **GET** /portfolio/summary/total\_resting\_order\_value | Get Total Resting Order Value |
| [**get\_positions**](#get-positions)                                                         | **GET** /portfolio/positions                            | Get Positions                 |
| [**get\_settlements**](#get-settlements)                                                     | **GET** /portfolio/settlements                          | Get Settlements               |

# **get\_balance**

> GetBalanceResponse get\_balance()

Get Balance

Endpoint for getting the balance and portfolio value of a member. Both values are returned in cents.

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetBalanceResponse**](https://docs.kalshi.com/python-sdk/models/GetBalanceResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Balance retrieved successfully         |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

# **get\_fills**

> GetFillsResponse get\_fills(ticker=ticker, order\_id=order\_id, min\_ts=min\_ts, max\_ts=max\_ts, limit=limit, cursor=cursor)

Get Fills

Endpoint for getting all fills for the member. A fill is when a trade you have is matched.

### Parameters

| Name          | Type    | Description                                                                                                                                  | Notes                         |
| ------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **ticker**    | **str** | Filter by market ticker                                                                                                                      | \[optional]                   |
| **order\_id** | **str** | Filter by order ID                                                                                                                           | \[optional]                   |
| **min\_ts**   | **int** | Filter items after this Unix timestamp                                                                                                       | \[optional]                   |
| **max\_ts**   | **int** | Filter items before this Unix timestamp                                                                                                      | \[optional]                   |
| **limit**     | **int** | Number of results per page. Defaults to 100. Maximum value is 200.                                                                           | \[optional] \[default to 100] |
| **cursor**    | **str** | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | \[optional]                   |

### Return type

[**GetFillsResponse**](https://docs.kalshi.com/python-sdk/models/GetFillsResponse)

### HTTP response details

| Status code | Description                  |
| ----------- | ---------------------------- |
| **200**     | Fills retrieved successfully |
| **400**     | Bad request                  |
| **401**     | Unauthorized                 |
| **500**     | Internal server error        |

# **get\_portfolio\_resting\_order\_total\_value**

> GetPortfolioRestingOrderTotalValueResponse get\_portfolio\_resting\_order\_total\_value()

Get Total Resting Order Value

Endpoint for getting the total value, in cents, of resting orders. This endpoint is only intended for use by FCM members (rare). Note: If you're uncertain about this endpoint, it likely does not apply to you.

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetPortfolioRestingOrderTotalValueResponse**](https://docs.kalshi.com/python-sdk/models/GetPortfolioRestingOrderTotalValueResponse)

### HTTP response details

| Status code | Description                                      |
| ----------- | ------------------------------------------------ |
| **200**     | Total resting order value retrieved successfully |
| **401**     | Unauthorized - authentication required           |
| **500**     | Internal server error                            |

# **get\_positions**

> GetPositionsResponse get\_positions(cursor=cursor, limit=limit, count\_filter=count\_filter, settlement\_status=settlement\_status, ticker=ticker, event\_ticker=event\_ticker)

Get Positions

Restricts the positions to those with any of following fields with non-zero values, as a comma separated list. The following values are accepted: position, total\_traded

### Parameters

| Name                   | Type    | Description                                                                                                                                                                | Notes                               |
| ---------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **cursor**             | **str** | The Cursor represents a pointer to the next page of records in the pagination. Use the value returned from the previous response to get the next page.                     | \[optional]                         |
| **limit**              | **int** | Parameter to specify the number of results per page. Defaults to 100.                                                                                                      | \[optional] \[default to 100]       |
| **count\_filter**      | **str** | Restricts the positions to those with any of following fields with non-zero values, as a comma separated list. The following values are accepted - position, total\_traded | \[optional]                         |
| **settlement\_status** | **str** | Settlement status of the markets to return. Defaults to unsettled.                                                                                                         | \[optional] \[default to unsettled] |
| **ticker**             | **str** | Filter by market ticker                                                                                                                                                    | \[optional]                         |
| **event\_ticker**      | **str** | Event ticker of desired positions. Multiple event tickers can be provided as a comma-separated list (maximum 10).                                                          | \[optional]                         |

### Return type

[**GetPositionsResponse**](https://docs.kalshi.com/python-sdk/models/GetPositionsResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Positions retrieved successfully       |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

# **get\_settlements**

> GetSettlementsResponse get\_settlements(limit=limit, cursor=cursor, ticker=ticker, event\_ticker=event\_ticker, min\_ts=min\_ts, max\_ts=max\_ts)

Get Settlements

Endpoint for getting the member's settlements historical track.

### Parameters

| Name              | Type    | Description                                                                                                                                  | Notes                         |
| ----------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **limit**         | **int** | Number of results per page. Defaults to 100. Maximum value is 200.                                                                           | \[optional] \[default to 100] |
| **cursor**        | **str** | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | \[optional]                   |
| **ticker**        | **str** | Filter by market ticker                                                                                                                      | \[optional]                   |
| **event\_ticker** | **str** | Event ticker of desired positions. Multiple event tickers can be provided as a comma-separated list (maximum 10).                            | \[optional]                   |
| **min\_ts**       | **int** | Filter items after this Unix timestamp                                                                                                       | \[optional]                   |
| **max\_ts**       | **int** | Filter items before this Unix timestamp                                                                                                      | \[optional]                   |

### Return type

[**GetSettlementsResponse**](https://docs.kalshi.com/python-sdk/models/GetSettlementsResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Settlements retrieved successfully     |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt