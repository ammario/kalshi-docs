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

Get a single structured target by ID

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

# Read private key from file
with open('path/to/private_key.pem', 'r') as f:
    private_key = f.read()

# Configure API key authentication
configuration.api_key_id = "your-api-key-id"
configuration.private_key_pem = private_key

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
| **401**     | Unauthorized - authentication required   |
| **404**     | Resource not found                       |
| **500**     | Internal server error                    |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_structured\_targets**

> GetStructuredTargetsResponse get\_structured\_targets(status=status, page\_size=page\_size)

Get Structured Targets

Get all structured targets

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

# Read private key from file
with open('path/to/private_key.pem', 'r') as f:
    private_key = f.read()

# Configure API key authentication
configuration.api_key_id = "your-api-key-id"
configuration.private_key_pem = private_key

# Initialize the Kalshi client
client = kalshi_python.KalshiClient(configuration)

status = 'status_example' # str | Filter by structured target status (optional)

page_size = 100 # int | Number of items per page (minimum 100, default 100) (optional) (default to 100)

try:
    # Get Structured Targets
    api_response = client.get_structured_targets(status=status, page_size=page_size)
    print("The response of StructuredTargetsApi->get_structured_targets:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling StructuredTargetsApi->get_structured_targets: %s\n" % e)
```

### Parameters

| Name           | Type    | Description                                         | Notes                         |
| -------------- | ------- | --------------------------------------------------- | ----------------------------- |
| **status**     | **str** | Filter by structured target status                  | \[optional]                   |
| **page\_size** | **int** | Number of items per page (minimum 100, default 100) | \[optional] \[default to 100] |

### Return type

[**GetStructuredTargetsResponse**](https://docs.kalshi.com/python-sdk/models/GetStructuredTargetsResponse)

### HTTP response details

| Status code | Description                               |
| ----------- | ----------------------------------------- |
| **200**     | Structured targets retrieved successfully |
| **401**     | Unauthorized - authentication required    |
| **500**     | Internal server error                     |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)
