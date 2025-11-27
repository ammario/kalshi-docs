---
url: https://docs.kalshi.com/python-sdk/api/StructuredTargetsApi
lastmod: 2025-11-23T22:54:23.509Z
---
# StructuredTargets

> Python SDK methods for StructuredTargets operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                                  | HTTP request                                        | Description            |
| ------------------------------------------------------- | --------------------------------------------------- | ---------------------- |
| [**get\_structured\_target**](#get-structured-target)   | **GET** /structured\_targets/{structured_target_id} | Get Structured Target  |
| [**get\_structured\_targets**](#get-structured-targets) | **GET** /structured\_targets                        | Get Structured Targets |

# **get\_structured\_target**

> GetStructuredTargetResponse get\_structured\_target(structured\_target\_id)

Get Structured Target

Endpoint for getting data about a specific structured target by its ID.

### Parameters

| Name                       | Type    | Description          | Notes |
| -------------------------- | ------- | -------------------- | ----- |
| **structured\_target\_id** | **str** | Structured target ID |       |

### Return type

[**GetStructuredTargetResponse**](https://docs.kalshi.com/python-sdk/models/GetStructuredTargetResponse)

### HTTP response details

| Status code | Description                              |
| ----------- | ---------------------------------------- |
| **200**     | Structured target retrieved successfully |
| **401**     | Unauthorized                             |
| **404**     | Not found                                |
| **500**     | Internal server error                    |

# **get\_structured\_targets**

> GetStructuredTargetsResponse get\_structured\_targets(type=type, competition=competition, page\_size=page\_size, cursor=cursor)

Get Structured Targets

Page size (min: 1, max: 2000)

### Parameters

| Name            | Type    | Description                                             | Notes                         |
| --------------- | ------- | ------------------------------------------------------- | ----------------------------- |
| **type**        | **str** | Filter by structured target type                        | \[optional]                   |
| **competition** | **str** | Filter by competition                                   | \[optional]                   |
| **page\_size**  | **int** | Number of items per page (min 1, max 2000, default 100) | \[optional] \[default to 100] |
| **cursor**      | **str** | Pagination cursor                                       | \[optional]                   |

### Return type

[**GetStructuredTargetsResponse**](https://docs.kalshi.com/python-sdk/models/GetStructuredTargetsResponse)

### HTTP response details

| Status code | Description                               |
| ----------- | ----------------------------------------- |
| **200**     | Structured targets retrieved successfully |
| **401**     | Unauthorized                              |
| **500**     | Internal server error                     |


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: /llms.txt