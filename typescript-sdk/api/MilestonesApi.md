---
url: https://docs.kalshi.com/typescript-sdk/api/MilestonesApi
lastmod: 2026-01-27T00:10:37.201Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Milestones

> TypeScript SDK methods for Milestones operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                              | HTTP request                       | Description    |
| ----------------------------------- | ---------------------------------- | -------------- |
| [**getMilestone**](#getmilestone)   | **GET** /milestones/{milestone_id} | Get Milestone  |
| [**getMilestones**](#getmilestones) | **GET** /milestones                | Get Milestones |

# **getMilestone**

> GetMilestoneResponse getMilestone()

Get a single milestone by ID

### Example

```typescript  theme={null}
import {
    MilestonesApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new MilestonesApi(configuration);

let milestoneId: string; //Milestone ID (default to undefined)

const { status, data } = await apiInstance.getMilestone(
    milestoneId
);
```

### Parameters

| Name            | Type          | Description  | Notes                 |
| --------------- | ------------- | ------------ | --------------------- |
| **milestoneId** | \[**string**] | Milestone ID | defaults to undefined |

### Return type

**GetMilestoneResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Milestone retrieved successfully       | -                |
| **401**     | Unauthorized - authentication required | -                |
| **404**     | Resource not found                     | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)

# **getMilestones**

> GetMilestonesResponse getMilestones()

Get all milestones

### Example

```typescript  theme={null}
import {
    MilestonesApi,
    Configuration
} from 'kalshi-typescript';

const configuration = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: '/path/to/private-key.pem'  // or privateKeyPem: 'PEM string'
});
const apiInstance = new MilestonesApi(configuration);

let status: string; //Filter by milestone status (optional) (default to undefined)
let limit: number; //Number of items per page (minimum 1, maximum 500) (optional) (default to 100)

const { status, data } = await apiInstance.getMilestones(
    status,
    limit
);
```

### Parameters

| Name       | Type          | Description                                       | Notes                            |
| ---------- | ------------- | ------------------------------------------------- | -------------------------------- |
| **status** | \[**string**] | Filter by milestone status                        | (optional) defaults to undefined |
| **limit**  | \[**number**] | Number of items per page (minimum 1, maximum 500) | (optional) defaults to 100       |

### Return type

**GetMilestonesResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

* **Content-Type**: Not defined
* **Accept**: application/json

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | Milestones retrieved successfully      | -                |
| **401**     | Unauthorized - authentication required | -                |
| **500**     | Internal server error                  | -                |

[\[Back to top\]](#) [\[Back to API list\]](../README.md#documentation-for-api-endpoints) [\[Back to Model list\]](../README.md#documentation-for-models) [\[Back to README\]](../README.md)
