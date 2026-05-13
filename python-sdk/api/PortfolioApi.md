---
url: https://docs.kalshi.com/python-sdk/api/PortfolioApi
lastmod: 2026-05-13T00:07:30.294Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Portfolio

> Python SDK methods for Portfolio operations

All URIs are relative to *[https://external-api.kalshi.com/trade-api/v2](https://external-api.kalshi.com/trade-api/v2)*

| Method                                                                                       | HTTP request                                            | Description                   |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------- |
| [**apply\_subaccount\_transfer**](#apply-subaccount-transfer)                                | **POST** /portfolio/subaccounts/transfer                | Transfer Between Subaccounts  |
| [**create\_subaccount**](#create-subaccount)                                                 | **POST** /portfolio/subaccounts                         | Create Subaccount             |
| [**get\_balance**](#get-balance)                                                             | **GET** /portfolio/balance                              | Get Balance                   |
| [**get\_deposits**](#get-deposits)                                                           | **GET** /portfolio/deposits                             | Get Deposits                  |
| [**get\_fills**](#get-fills)                                                                 | **GET** /portfolio/fills                                | Get Fills                     |
| [**get\_portfolio\_resting\_order\_total\_value**](#get-portfolio-resting-order-total-value) | **GET** /portfolio/summary/total\_resting\_order\_value | Get Total Resting Order Value |
| [**get\_positions**](#get-positions)                                                         | **GET** /portfolio/positions                            | Get Positions                 |
| [**get\_settlements**](#get-settlements)                                                     | **GET** /portfolio/settlements                          | Get Settlements               |
| [**get\_subaccount\_balances**](#get-subaccount-balances)                                    | **GET** /portfolio/subaccounts/balances                 | Get All Subaccount Balances   |
| [**get\_subaccount\_netting**](#get-subaccount-netting)                                      | **GET** /portfolio/subaccounts/netting                  | Get Subaccount Netting        |
| [**get\_subaccount\_transfers**](#get-subaccount-transfers)                                  | **GET** /portfolio/subaccounts/transfers                | Get Subaccount Transfers      |
| [**get\_withdrawals**](#get-withdrawals)                                                     | **GET** /portfolio/withdrawals                          | Get Withdrawals               |
| [**update\_subaccount\_netting**](#update-subaccount-netting)                                | **PUT** /portfolio/subaccounts/netting                  | Update Subaccount Netting     |

# **apply\_subaccount\_transfer**

> object apply\_subaccount\_transfer(apply\_subaccount\_transfer\_request)

Transfer Between Subaccounts

Transfers funds between the authenticated user's subaccounts. Use 0 for the primary account, or 1-32 for numbered subaccounts.

### Parameters

| Name                                     | Type                                                                                                           | Description | Notes |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------- | ----- |
| **apply\_subaccount\_transfer\_request** | [**ApplySubaccountTransferRequest**](https://docs.kalshi.com/python-sdk/models/ApplySubaccountTransferRequest) |             |       |

### Return type

**object**

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Transfer completed successfully        |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

# **create\_subaccount**

> CreateSubaccountResponse create\_subaccount()

Create Subaccount

Creates a new subaccount for the authenticated user. This endpoint is currently only available to institutions and market makers. Subaccounts are numbered sequentially starting from 1. Maximum 32 subaccounts per user.

### Parameters

This endpoint does not need any parameter.

### Return type

[**CreateSubaccountResponse**](https://docs.kalshi.com/python-sdk/models/CreateSubaccountResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **201**     | Subaccount created successfully        |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

# **get\_balance**

> GetBalanceResponse get\_balance(subaccount=subaccount)

Get Balance

Endpoint for getting the balance and portfolio value of a member. Both values are returned in cents.

### Parameters

| Name           | Type    | Description                                                             | Notes       |
| -------------- | ------- | ----------------------------------------------------------------------- | ----------- |
| **subaccount** | **int** | Subaccount number (0 for primary, 1-32 for subaccounts). Defaults to 0. | \[optional] |

### Return type

[**GetBalanceResponse**](https://docs.kalshi.com/python-sdk/models/GetBalanceResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Balance retrieved successfully         |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

# **get\_deposits**

> GetDepositsResponse get\_deposits(limit=limit, cursor=cursor)

Get Deposits

Endpoint for getting the member's deposit history.

### Parameters

| Name       | Type    | Description                                                                                                                                  | Notes                         |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **limit**  | **int** | Number of results per page. Defaults to 100. Maximum value is 500.                                                                           | \[optional] \[default to 100] |
| **cursor** | **str** | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | \[optional]                   |

### Return type

[**GetDepositsResponse**](https://docs.kalshi.com/python-sdk/models/GetDepositsResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Deposits retrieved successfully        |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

# **get\_fills**

> GetFillsResponse get\_fills(ticker=ticker, order\_id=order\_id, min\_ts=min\_ts, max\_ts=max\_ts, limit=limit, cursor=cursor, subaccount=subaccount)

Get Fills

Endpoint for getting all fills for the member. A fill is when a trade you have is matched.
Fills that occurred before the historical cutoff are only available via `GET /historical/fills`. See [Historical Data](https://docs.kalshi.com/getting_started/historical_data) for details.

### Parameters

| Name           | Type    | Description                                                                                                                                  | Notes                         |
| -------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **ticker**     | **str** | Filter by market ticker                                                                                                                      | \[optional]                   |
| **order\_id**  | **str** | Filter by order ID                                                                                                                           | \[optional]                   |
| **min\_ts**    | **int** | Filter items after this Unix timestamp                                                                                                       | \[optional]                   |
| **max\_ts**    | **int** | Filter items before this Unix timestamp                                                                                                      | \[optional]                   |
| **limit**      | **int** | Number of results per page. Defaults to 100.                                                                                                 | \[optional] \[default to 100] |
| **cursor**     | **str** | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | \[optional]                   |
| **subaccount** | **int** | Subaccount number (0 for primary, 1-32 for subaccounts). If omitted, defaults to all subaccounts.                                            | \[optional]                   |

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

> GetPositionsResponse get\_positions(cursor=cursor, limit=limit, count\_filter=count\_filter, ticker=ticker, event\_ticker=event\_ticker, subaccount=subaccount)

Get Positions

Restricts the positions to those with any of following fields with non-zero values, as a comma separated list. The following values are accepted: position, total\_traded

### Parameters

| Name              | Type    | Description                                                                                                                                                                | Notes                         |
| ----------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **cursor**        | **str** | The Cursor represents a pointer to the next page of records in the pagination. Use the value returned from the previous response to get the next page.                     | \[optional]                   |
| **limit**         | **int** | Parameter to specify the number of results per page. Defaults to 100.                                                                                                      | \[optional] \[default to 100] |
| **count\_filter** | **str** | Restricts the positions to those with any of following fields with non-zero values, as a comma separated list. The following values are accepted - position, total\_traded | \[optional]                   |
| **ticker**        | **str** | Filter by market ticker                                                                                                                                                    | \[optional]                   |
| **event\_ticker** | **str** | Event ticker to filter by. Only a single event ticker is supported.                                                                                                        | \[optional]                   |
| **subaccount**    | **int** | Subaccount number (0 for primary, 1-32 for subaccounts). Defaults to 0.                                                                                                    | \[optional]                   |

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

> GetSettlementsResponse get\_settlements(limit=limit, cursor=cursor, ticker=ticker, event\_ticker=event\_ticker, min\_ts=min\_ts, max\_ts=max\_ts, subaccount=subaccount)

Get Settlements

Endpoint for getting the member's settlements historical track.

### Parameters

| Name              | Type    | Description                                                                                                                                  | Notes                         |
| ----------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **limit**         | **int** | Number of results per page. Defaults to 100.                                                                                                 | \[optional] \[default to 100] |
| **cursor**        | **str** | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | \[optional]                   |
| **ticker**        | **str** | Filter by market ticker                                                                                                                      | \[optional]                   |
| **event\_ticker** | **str** | Event ticker to filter by. Only a single event ticker is supported.                                                                          | \[optional]                   |
| **min\_ts**       | **int** | Filter items after this Unix timestamp                                                                                                       | \[optional]                   |
| **max\_ts**       | **int** | Filter items before this Unix timestamp                                                                                                      | \[optional]                   |
| **subaccount**    | **int** | Subaccount number (0 for primary, 1-32 for subaccounts). If omitted, defaults to all subaccounts.                                            | \[optional]                   |

### Return type

[**GetSettlementsResponse**](https://docs.kalshi.com/python-sdk/models/GetSettlementsResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Settlements retrieved successfully     |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

# **get\_subaccount\_balances**

> GetSubaccountBalancesResponse get\_subaccount\_balances()

Get All Subaccount Balances

Gets balances for all subaccounts including the primary account.

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetSubaccountBalancesResponse**](https://docs.kalshi.com/python-sdk/models/GetSubaccountBalancesResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Balances retrieved successfully        |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

# **get\_subaccount\_netting**

> GetSubaccountNettingResponse get\_subaccount\_netting()

Get Subaccount Netting

Gets the netting enabled settings for all subaccounts.

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetSubaccountNettingResponse**](https://docs.kalshi.com/python-sdk/models/GetSubaccountNettingResponse)

### HTTP response details

| Status code | Description                             |
| ----------- | --------------------------------------- |
| **200**     | Netting settings retrieved successfully |
| **401**     | Unauthorized - authentication required  |
| **500**     | Internal server error                   |

# **get\_subaccount\_transfers**

> GetSubaccountTransfersResponse get\_subaccount\_transfers(limit=limit, cursor=cursor)

Get Subaccount Transfers

Gets a paginated list of all transfers between subaccounts for the authenticated user.

### Parameters

| Name       | Type    | Description                                                                                                                                  | Notes                         |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **limit**  | **int** | Number of results per page. Defaults to 100.                                                                                                 | \[optional] \[default to 100] |
| **cursor** | **str** | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | \[optional]                   |

### Return type

[**GetSubaccountTransfersResponse**](https://docs.kalshi.com/python-sdk/models/GetSubaccountTransfersResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Transfers retrieved successfully       |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

# **get\_withdrawals**

> GetWithdrawalsResponse get\_withdrawals(limit=limit, cursor=cursor)

Get Withdrawals

Endpoint for getting the member's withdrawal history.

### Parameters

| Name       | Type    | Description                                                                                                                                  | Notes                         |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **limit**  | **int** | Number of results per page. Defaults to 100. Maximum value is 500.                                                                           | \[optional] \[default to 100] |
| **cursor** | **str** | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | \[optional]                   |

### Return type

[**GetWithdrawalsResponse**](https://docs.kalshi.com/python-sdk/models/GetWithdrawalsResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Withdrawals retrieved successfully     |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

# **update\_subaccount\_netting**

> update\_subaccount\_netting(update\_subaccount\_netting\_request)

Update Subaccount Netting

Updates the netting enabled setting for a specific subaccount. Use 0 for the primary account, or 1-32 for numbered subaccounts.

### Parameters

| Name                                     | Type                                                                                                           | Description | Notes |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------- | ----- |
| **update\_subaccount\_netting\_request** | [**UpdateSubaccountNettingRequest**](https://docs.kalshi.com/python-sdk/models/UpdateSubaccountNettingRequest) |             |       |

### Return type

void (empty response body)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Netting setting updated successfully   |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |
