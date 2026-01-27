---
url: https://docs.kalshi.com/python-sdk/api/MultivariateCollectionsApi
lastmod: 2026-01-27T00:10:36.737Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# MultivariateCollections

> Python SDK methods for MultivariateCollections operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                                                                              | HTTP request                                                          | Description                                 |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------- |
| [**get\_multivariate\_event\_collection**](#get-multivariate-event-collection)                      | **GET** /multivariate\_event\_collections/{collection_ticker}         | Get Multivariate Event Collection           |
| [**get\_multivariate\_event\_collections**](#get-multivariate-event-collections)                    | **GET** /multivariate\_event\_collections                             | Get Multivariate Event Collections          |
| [**lookup\_multivariate\_event\_collection\_bundle**](#lookup-multivariate-event-collection-bundle) | **POST** /multivariate\_event\_collections/{collection_ticker}/lookup | Lookup Multivariate Event Collection Bundle |

# **get\_multivariate\_event\_collection**

> GetMultivariateEventCollectionResponse get\_multivariate\_event\_collection(collection\_ticker)

Get Multivariate Event Collection

Get a single multivariate event collection by ticker

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_multivariate_event_collection_response import GetMultivariateEventCollectionResponse
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

collection_ticker = 'collection_ticker_example' # str | Collection ticker

try:
    # Get Multivariate Event Collection
    api_response = client.get_multivariate_event_collection(collection_ticker)
    print("The response of MultivariateCollectionsApi->get_multivariate_event_collection:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling MultivariateCollectionsApi->get_multivariate_event_collection: %s\n" % e)
```

### Parameters

| Name                   | Type    | Description       | Notes |
| ---------------------- | ------- | ----------------- | ----- |
| **collection\_ticker** | **str** | Collection ticker |       |

### Return type

[**GetMultivariateEventCollectionResponse**](https://docs.kalshi.com/python-sdk/models/GetMultivariateEventCollectionResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Collection retrieved successfully      |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_multivariate\_event\_collections**

> GetMultivariateEventCollectionsResponse get\_multivariate\_event\_collections(status=status)

Get Multivariate Event Collections

Get all multivariate event collections

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_multivariate_event_collections_response import GetMultivariateEventCollectionsResponse
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

status = 'status_example' # str | Filter by multivariate collection status (optional)

try:
    # Get Multivariate Event Collections
    api_response = client.get_multivariate_event_collections(status=status)
    print("The response of MultivariateCollectionsApi->get_multivariate_event_collections:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling MultivariateCollectionsApi->get_multivariate_event_collections: %s\n" % e)
```

### Parameters

| Name       | Type    | Description                              | Notes       |
| ---------- | ------- | ---------------------------------------- | ----------- |
| **status** | **str** | Filter by multivariate collection status | \[optional] |

### Return type

[**GetMultivariateEventCollectionsResponse**](https://docs.kalshi.com/python-sdk/models/GetMultivariateEventCollectionsResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Collections retrieved successfully     |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **lookup\_multivariate\_event\_collection\_bundle**

> LookupBundleResponse lookup\_multivariate\_event\_collection\_bundle(collection\_ticker, lookup\_bundle\_request)

Lookup Multivariate Event Collection Bundle

Lookup a bundle in a multivariate event collection

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.lookup_bundle_request import LookupBundleRequest
from kalshi_python.models.lookup_bundle_response import LookupBundleResponse
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

collection_ticker = 'collection_ticker_example' # str | Collection ticker

lookup_bundle_request = kalshi_python.LookupBundleRequest() # LookupBundleRequest |

try:
    # Lookup Multivariate Event Collection Bundle
    api_response = client.lookup_multivariate_event_collection_bundle(collection_ticker, lookup_bundle_request)
    print("The response of MultivariateCollectionsApi->lookup_multivariate_event_collection_bundle:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling MultivariateCollectionsApi->lookup_multivariate_event_collection_bundle: %s\n" % e)
```

### Parameters

| Name                        | Type                                                                                     | Description       | Notes |
| --------------------------- | ---------------------------------------------------------------------------------------- | ----------------- | ----- |
| **collection\_ticker**      | **str**                                                                                  | Collection ticker |       |
| **lookup\_bundle\_request** | [**LookupBundleRequest**](https://docs.kalshi.com/python-sdk/models/LookupBundleRequest) |                   |       |

### Return type

[**LookupBundleResponse**](https://docs.kalshi.com/python-sdk/models/LookupBundleResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Bundle lookup successful               |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)
