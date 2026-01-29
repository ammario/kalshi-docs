---
url: https://docs.kalshi.com/typescript-sdk/api/PortfolioApi
lastmod: 2026-01-29T00:38:37.794Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Portfolio

> TypeScript SDK methods for Portfolio operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                                                        | HTTP request                                            | Description                   |
| ----------------------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------- |
| [**applySubaccountTransfer**](#applysubaccounttransfer)                       | **POST** /portfolio/subaccounts/transfer                | Transfer Between Subaccounts  |
| [**createSubaccount**](#createsubaccount)                                     | **POST** /portfolio/subaccounts                         | Create Subaccount             |
| [**getBalance**](#getbalance)                                                 | **GET** /portfolio/balance                              | Get Balance                   |
| [**getFills**](#getfills)                                                     | **GET** /portfolio/fills                                | Get Fills                     |
| [**getPortfolioRestingOrderTotalValue**](#getportfoliorestingordertotalvalue) | **GET** /portfolio/summary/total\_resting\_order\_value | Get Total Resting Order Value |
| [**getPositions**](#getpositions)                                             | **GET** /portfolio/positions                            | Get Positions                 |
| [**getSettlements**](#getsettlements)                                         | **GET** /portfolio/settlements                          | Get Settlements               |
| [**getSubaccountBalances**](#getsubaccountbalances)                           | **GET** /portfolio/subaccounts/balances                 | Get All Subaccount Balances   |
| [**getSubaccountTransfers**](#getsubaccounttransfers)                         | **GET** /portfolio/subaccounts/transfers                | Get Subaccount Transfers      |

# **applySubaccountTransfer**

> object applySubaccountTransfer(applySubaccountTransferRequest)

Transfers funds between the authenticated user's subaccounts. Use 0 for the primary account, or 1-32 for numbered subaccounts.

### Parameters

| Name                               | Type                               | Description | Notes |
| ---------------------------------- | ---------------------------------- | ----------- | ----- |
| **applySubaccountTransferRequest** | **ApplySubaccountTransferRequest** |             |       |

### Return type

**object**

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: application/json
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Transfer completed successfully        | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

# **createSubaccount**

> CreateSubaccountResponse createSubaccount()

Creates a new subaccount for the authenticated user. Subaccounts are numbered sequentially starting from 1. Maximum 32 subaccounts per user.

### Parameters

This endpoint does not have any parameters.

### Return type

**CreateSubaccountResponse**

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **201**     | Subaccount created successfully        | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

# **getBalance**

> GetBalanceResponse getBalance()

Endpoint for getting the balance and portfolio value of a member. Both values are returned in cents.

### Parameters

This endpoint does not have any parameters.

### Return type

**GetBalanceResponse**

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Balance retrieved successfully         | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

# **getFills**

> GetFillsResponse getFills()

Endpoint for getting all fills for the member. A fill is when a trade you have is matched.

### Parameters

| Name           | Type          | Description                                                                                                                                  | Notes                            |
| -------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **ticker**     | \[**string**] | Filter by market ticker                                                                                                                      | (optional) defaults to undefined |
| **orderId**    | \[**string**] | Filter by order ID                                                                                                                           | (optional) defaults to undefined |
| **minTs**      | \[**number**] | Filter items after this Unix timestamp                                                                                                       | (optional) defaults to undefined |
| **maxTs**      | \[**number**] | Filter items before this Unix timestamp                                                                                                      | (optional) defaults to undefined |
| **limit**      | \[**number**] | Number of results per page. Defaults to 100. Maximum value is 200.                                                                           | (optional) defaults to 100       |
| **cursor**     | \[**string**] | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | (optional) defaults to undefined |
| **subaccount** | \[**number**] | Subaccount number (0 for primary, 1-32 for subaccounts)                                                                                      | (optional) defaults to 0         |

### Return type

**GetFillsResponse**

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | Fills retrieved successfully | -                |
| **400**     | Bad request                  | -                |
| **401**     | Unauthorized                 | -                |
| **500**     | Internal server error        | -                |

# **getPortfolioRestingOrderTotalValue**

> GetPortfolioRestingOrderTotalValueResponse getPortfolioRestingOrderTotalValue()

Endpoint for getting the total value, in cents, of resting orders. This endpoint is only intended for use by FCM members (rare). Note: If you're uncertain about this endpoint, it likely does not apply to you.

### Parameters

This endpoint does not have any parameters.

### Return type

**GetPortfolioRestingOrderTotalValueResponse**

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                                      | Response headers |
| ----------- | ------------------------------------------------ | ---------------- |
| **200**     | Total resting order value retrieved successfully | -                |
| **401**     | Unauthorized - authentication required           | -                |
| **500**     | Internal server error                            | -                |

# **getPositions**

> GetPositionsResponse getPositions()

Restricts the positions to those with any of following fields with non-zero values, as a comma separated list. The following values are accepted: position, total\_traded

### Parameters

| Name            | Type          | Description                                                                                                                                                                | Notes                            |
| --------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **cursor**      | \[**string**] | The Cursor represents a pointer to the next page of records in the pagination. Use the value returned from the previous response to get the next page.                     | (optional) defaults to undefined |
| **limit**       | \[**number**] | Parameter to specify the number of results per page. Defaults to 100.                                                                                                      | (optional) defaults to 100       |
| **countFilter** | \[**string**] | Restricts the positions to those with any of following fields with non-zero values, as a comma separated list. The following values are accepted - position, total\_traded | (optional) defaults to undefined |
| **ticker**      | \[**string**] | Filter by market ticker                                                                                                                                                    | (optional) defaults to undefined |
| **eventTicker** | \[**string**] | Event ticker of desired positions. Multiple event tickers can be provided as a comma-separated list (maximum 10).                                                          | (optional) defaults to undefined |
| **subaccount**  | \[**number**] | Subaccount number (0 for primary, 1-32 for subaccounts)                                                                                                                    | (optional) defaults to 0         |

### Return type

**GetPositionsResponse**

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Positions retrieved successfully       | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

# **getSettlements**

> GetSettlementsResponse getSettlements()

Endpoint for getting the member's settlements historical track.

### Parameters

| Name            | Type          | Description                                                                                                                                  | Notes                            |
| --------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **limit**       | \[**number**] | Number of results per page. Defaults to 100. Maximum value is 200.                                                                           | (optional) defaults to 100       |
| **cursor**      | \[**string**] | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | (optional) defaults to undefined |
| **ticker**      | \[**string**] | Filter by market ticker                                                                                                                      | (optional) defaults to undefined |
| **eventTicker** | \[**string**] | Event ticker of desired positions. Multiple event tickers can be provided as a comma-separated list (maximum 10).                            | (optional) defaults to undefined |
| **minTs**       | \[**number**] | Filter items after this Unix timestamp                                                                                                       | (optional) defaults to undefined |
| **maxTs**       | \[**number**] | Filter items before this Unix timestamp                                                                                                      | (optional) defaults to undefined |

### Return type

**GetSettlementsResponse**

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Settlements retrieved successfully     | -                |
| **400**     | Bad request - invalid input            | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

# **getSubaccountBalances**

> GetSubaccountBalancesResponse getSubaccountBalances()

Gets balances for all subaccounts including the primary account.

### Parameters

This endpoint does not have any parameters.

### Return type

**GetSubaccountBalancesResponse**

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Balances retrieved successfully        | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

# **getSubaccountTransfers**

> GetSubaccountTransfersResponse getSubaccountTransfers()

Gets a paginated list of all transfers between subaccounts for the authenticated user.

### Parameters

| Name       | Type          | Description                                                                                                                                  | Notes                            |
| ---------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **limit**  | \[**number**] | Number of results per page. Defaults to 100. Maximum value is 200.                                                                           | (optional) defaults to 100       |
| **cursor** | \[**string**] | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | (optional) defaults to undefined |

### Return type

**GetSubaccountTransfersResponse**

### Authorization

[kalshiAccessSignature](../README.md#kalshiAccessSignature), [kalshiAccessKey](../README.md#kalshiAccessKey), [kalshiAccessTimestamp](../README.md#kalshiAccessTimestamp)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Transfers retrieved successfully       | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |
