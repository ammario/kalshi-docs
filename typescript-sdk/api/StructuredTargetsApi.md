---
url: https://docs.kalshi.com/typescript-sdk/api/StructuredTargetsApi
lastmod: 2026-03-30T23:16:28.580Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

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

| Name            | Type               | Description                                                                                                              | Notes                            |
| --------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| **ids**         | **Array\<string>** | Filter by specific structured target IDs. Pass multiple IDs by repeating the parameter (e.g. \`?ids=uuid1\&ids=uuid2\`). | (optional) defaults to undefined |
| **type**        | \[**string**]      | Filter by structured target type                                                                                         | (optional) defaults to undefined |
| **competition** | \[**string**]      | Filter by competition. Matches against the league, conference, division, or tour in the structured target details.       | (optional) defaults to undefined |
| **pageSize**    | \[**number**]      | Number of items per page (min 1, max 2000, default 100)                                                                  | (optional) defaults to 100       |
| **cursor**      | \[**string**]      | Pagination cursor                                                                                                        | (optional) defaults to undefined |

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


Built with [Mintlify](https://mintlify.com).