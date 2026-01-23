---
url: https://docs.kalshi.com/typescript-sdk/api/StructuredTargetsApi
lastmod: 2026-01-22T21:13:32.975Z
---
# StructuredTargets

> TypeScript SDK methods for StructuredTargets operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                            | HTTP request                                        | Description            |
| ------------------------------------------------- | --------------------------------------------------- | ---------------------- |
| [**getStructuredTarget**](#getstructuredtarget)   | **GET** /structured\_targets/{structured_target_id} | Get Structured Target  |
| [**getStructuredTargets**](#getstructuredtargets) | **GET** /structured\_targets                        | Get Structured Targets |

# **getStructuredTarget**

> GetStructuredTargetResponse getStructuredTarget()

Endpoint for getting data about a specific structured target by its ID.

### Parameters

| Name                   | Type          | Description          | Notes                 |
| ---------------------- | ------------- | -------------------- | --------------------- |
| **structuredTargetId** | \[**string**] | Structured target ID | defaults to undefined |

### Return type

**GetStructuredTargetResponse**

### Authorization

No authorization required

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                              | Response headers |
| ----------- | ---------------------------------------- | ---------------- |
| **200**     | Structured target retrieved successfully | -                |
| **401**     | Unauthorized                             | -                |
| **404**     | Not found                                | -                |
| **500**     | Internal server error                    | -                |

# **getStructuredTargets**

> GetStructuredTargetsResponse getStructuredTargets()

Page size (min: 1, max: 2000)

### Parameters

| Name            | Type          | Description                                             | Notes                            |
| --------------- | ------------- | ------------------------------------------------------- | -------------------------------- |
| **type**        | \[**string**] | Filter by structured target type                        | (optional) defaults to undefined |
| **competition** | \[**string**] | Filter by competition                                   | (optional) defaults to undefined |
| **pageSize**    | \[**number**] | Number of items per page (min 1, max 2000, default 100) | (optional) defaults to 100       |
| **cursor**      | \[**string**] | Pagination cursor                                       | (optional) defaults to undefined |

### Return type

**GetStructuredTargetsResponse**

### Authorization

No authorization required

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                               | Response headers |
| ----------- | ----------------------------------------- | ---------------- |
| **200**     | Structured targets retrieved successfully | -                |
| **401**     | Unauthorized                              | -                |
| **500**     | Internal server error                     | -                |


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt