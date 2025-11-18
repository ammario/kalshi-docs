---
url: https://docs.kalshi.com/python-sdk/api/StructuredTargetsApi
lastmod: 2025-11-17T18:05:07.104Z
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

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_structured_target_response import GetStructuredTargetResponse
from kalshi_python.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.elections.kalshi.com/trade-api/v2
# See configuration.py for a list of all supported configuration parameters.
configuration = kalshi_python.Configuration(
    host = "https://api.elections.kalshi.com/trade-api/v2"
)


# Initialize the Kalshi client
client = kalshi_python.KalshiClient(configuration)

structured_target_id = 'structured_target_id_example' # str | Structured target ID

try:
    # Get Structured Target
    api_response = client.get_structured_target(structured_target_id)
    print("The response of StructuredTargetsApi->get_structured_target:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling StructuredTargetsApi->get_structured_target: %s\n" % e)
```

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

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_structured\_targets**

> GetStructuredTargetsResponse get\_structured\_targets(type=type, competition=competition, page\_size=page\_size, cursor=cursor)

Get Structured Targets

Page size (min: 1, max: 2000)

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_structured_targets_response import GetStructuredTargetsResponse
from kalshi_python.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.elections.kalshi.com/trade-api/v2
# See configuration.py for a list of all supported configuration parameters.
configuration = kalshi_python.Configuration(
    host = "https://api.elections.kalshi.com/trade-api/v2"
)


# Initialize the Kalshi client
client = kalshi_python.KalshiClient(configuration)

type = 'type_example' # str | Filter by structured target type (optional)

competition = 'competition_example' # str | Filter by competition (optional)

page_size = 100 # int | Number of items per page (min 1, max 2000, default 100) (optional) (default to 100)

cursor = 'cursor_example' # str | Pagination cursor (optional)

try:
    # Get Structured Targets
    api_response = client.get_structured_targets(type=type, competition=competition, page_size=page_size, cursor=cursor)
    print("The response of StructuredTargetsApi->get_structured_targets:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling StructuredTargetsApi->get_structured_targets: %s\n" % e)
```

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

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)
