---
url: https://docs.kalshi.com/python-sdk/api/MilestonesApi
lastmod: 2026-01-27T23:10:50.548Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Milestones

> Python SDK methods for Milestones operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                 | HTTP request                       | Description    |
| -------------------------------------- | ---------------------------------- | -------------- |
| [**get\_milestone**](#get-milestone)   | **GET** /milestones/{milestone_id} | Get Milestone  |
| [**get\_milestones**](#get-milestones) | **GET** /milestones                | Get Milestones |

# **get\_milestone**

> GetMilestoneResponse get\_milestone(milestone\_id)

Get Milestone

Get a single milestone by ID

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_milestone_response import GetMilestoneResponse
from kalshi_python.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.elections.kalshi.com/trade-api/v2
# See configuration.py for a list of all supported configuration parameters.
configuration = kalshi_python.Configuration(
    host = "https://api.elections.kalshi.com/trade-api/v2"
)

# Read private key from file
with open('path/to/private_key.pem', 'r') as f:
    private_key = f.read()

# Configure API key authentication
configuration.api_key_id = "your-api-key-id"
configuration.private_key_pem = private_key

# Initialize the Kalshi client
client = kalshi_python.KalshiClient(configuration)

milestone_id = 'milestone_id_example' # str | Milestone ID

try:
    # Get Milestone
    api_response = client.get_milestone(milestone_id)
    print("The response of MilestonesApi->get_milestone:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling MilestonesApi->get_milestone: %s\n" % e)
```

### Parameters

| Name              | Type    | Description  | Notes |
| ----------------- | ------- | ------------ | ----- |
| **milestone\_id** | **str** | Milestone ID |       |

### Return type

[**GetMilestoneResponse**](https://docs.kalshi.com/python-sdk/models/GetMilestoneResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Milestone retrieved successfully       |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_milestones**

> GetMilestonesResponse get\_milestones(status=status, limit=limit)

Get Milestones

Get all milestones

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_milestones_response import GetMilestonesResponse
from kalshi_python.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.elections.kalshi.com/trade-api/v2
# See configuration.py for a list of all supported configuration parameters.
configuration = kalshi_python.Configuration(
    host = "https://api.elections.kalshi.com/trade-api/v2"
)

# Read private key from file
with open('path/to/private_key.pem', 'r') as f:
    private_key = f.read()

# Configure API key authentication
configuration.api_key_id = "your-api-key-id"
configuration.private_key_pem = private_key

# Initialize the Kalshi client
client = kalshi_python.KalshiClient(configuration)

status = 'status_example' # str | Filter by milestone status (optional)

limit = 100 # int | Number of items per page (minimum 1, maximum 500) (optional) (default to 100)

try:
    # Get Milestones
    api_response = client.get_milestones(status=status, limit=limit)
    print("The response of MilestonesApi->get_milestones:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling MilestonesApi->get_milestones: %s\n" % e)
```

### Parameters

| Name       | Type    | Description                                       | Notes                         |
| ---------- | ------- | ------------------------------------------------- | ----------------------------- |
| **status** | **str** | Filter by milestone status                        | \[optional]                   |
| **limit**  | **int** | Number of items per page (minimum 1, maximum 500) | \[optional] \[default to 100] |

### Return type

[**GetMilestonesResponse**](https://docs.kalshi.com/python-sdk/models/GetMilestonesResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Milestones retrieved successfully      |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)
