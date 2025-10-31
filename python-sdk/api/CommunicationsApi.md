---
url: https://docs.kalshi.com/python-sdk/api/CommunicationsApi
lastmod: 2025-10-07T23:32:03.932Z
---
# Communications

> Python SDK methods for Communications operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                                | HTTP request                                      | Description           |
| ----------------------------------------------------- | ------------------------------------------------- | --------------------- |
| [**accept\_quote**](#accept-quote)                    | **PUT** /communications/quotes/{quote_id}/accept  | Accept Quote          |
| [**confirm\_quote**](#confirm-quote)                  | **PUT** /communications/quotes/{quote_id}/confirm | Confirm Quote         |
| [**create\_quote**](#create-quote)                    | **POST** /communications/quotes                   | Create Quote          |
| [**create\_rfq**](#create-rfq)                        | **POST** /communications/rfqs                     | Create RFQ            |
| [**delete\_quote**](#delete-quote)                    | **DELETE** /communications/quotes/{quote_id}      | Delete Quote          |
| [**delete\_rfq**](#delete-rfq)                        | **DELETE** /communications/rfqs/{rfq_id}          | Delete RFQ            |
| [**get\_communications\_id**](#get-communications-id) | **GET** /communications/id                        | Get Communications ID |
| [**get\_quote**](#get-quote)                          | **GET** /communications/quotes/{quote_id}         | Get Quote             |
| [**get\_quotes**](#get-quotes)                        | **GET** /communications/quotes                    | Get Quotes            |
| [**get\_rfq**](#get-rfq)                              | **GET** /communications/rfqs/{rfq_id}             | Get RFQ               |
| [**get\_rfqs**](#get-rfqs)                            | **GET** /communications/rfqs                      | Get RFQs              |

# **accept\_quote**

> accept\_quote(quote\_id, accept\_quote\_request)

Accept Quote

Accept a quote. This will require the quoter to confirm

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.accept_quote_request import AcceptQuoteRequest
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

quote_id = 'quote_id_example' # str | Quote ID

accept_quote_request = kalshi_python.AcceptQuoteRequest() # AcceptQuoteRequest |

try:
    # Accept Quote
    client.accept_quote(quote_id, accept_quote_request)
except Exception as e:
    print("Exception when calling CommunicationsApi->accept_quote: %s\n" % e)
```

### Parameters

| Name                       | Type                                                                                   | Description | Notes |
| -------------------------- | -------------------------------------------------------------------------------------- | ----------- | ----- |
| **quote\_id**              | **str**                                                                                | Quote ID    |       |
| **accept\_quote\_request** | [**AcceptQuoteRequest**](https://docs.kalshi.com/python-sdk/models/AcceptQuoteRequest) |             |       |

### Return type

void (empty response body)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **204**     | Quote accepted successfully            |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **confirm\_quote**

> confirm\_quote(quote\_id)

Confirm Quote

Confirm a quote. This will start a timer for order execution

### Example

```python  theme={null}
import kalshi_python
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

quote_id = 'quote_id_example' # str | Quote ID

try:
    # Confirm Quote
    client.confirm_quote(quote_id)
except Exception as e:
    print("Exception when calling CommunicationsApi->confirm_quote: %s\n" % e)
```

### Parameters

| Name          | Type    | Description | Notes |
| ------------- | ------- | ----------- | ----- |
| **quote\_id** | **str** | Quote ID    |       |

### Return type

void (empty response body)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **204**     | Quote confirmed successfully           |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **create\_quote**

> CreateQuoteResponse create\_quote(create\_quote\_request)

Create Quote

Create a quote in response to an RFQ

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.create_quote_request import CreateQuoteRequest
from kalshi_python.models.create_quote_response import CreateQuoteResponse
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

create_quote_request = kalshi_python.CreateQuoteRequest() # CreateQuoteRequest |

try:
    # Create Quote
    api_response = client.create_quote(create_quote_request)
    print("The response of CommunicationsApi->create_quote:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling CommunicationsApi->create_quote: %s\n" % e)
```

### Parameters

| Name                       | Type                                                                                   | Description | Notes |
| -------------------------- | -------------------------------------------------------------------------------------- | ----------- | ----- |
| **create\_quote\_request** | [**CreateQuoteRequest**](https://docs.kalshi.com/python-sdk/models/CreateQuoteRequest) |             |       |

### Return type

[**CreateQuoteResponse**](https://docs.kalshi.com/python-sdk/models/CreateQuoteResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **201**     | Quote created successfully             |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **create\_rfq**

> CreateRFQResponse create\_rfq(create\_rfq\_request)

Create RFQ

Create a new RFQ

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.create_rfq_request import CreateRFQRequest
from kalshi_python.models.create_rfq_response import CreateRFQResponse
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

create_rfq_request = kalshi_python.CreateRFQRequest() # CreateRFQRequest |

try:
    # Create RFQ
    api_response = client.create_rfq(create_rfq_request)
    print("The response of CommunicationsApi->create_rfq:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling CommunicationsApi->create_rfq: %s\n" % e)
```

### Parameters

| Name                     | Type                                                                               | Description | Notes |
| ------------------------ | ---------------------------------------------------------------------------------- | ----------- | ----- |
| **create\_rfq\_request** | [**CreateRFQRequest**](https://docs.kalshi.com/python-sdk/models/CreateRFQRequest) |             |       |

### Return type

[**CreateRFQResponse**](https://docs.kalshi.com/python-sdk/models/CreateRFQResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **201**     | RFQ created successfully               |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **delete\_quote**

> delete\_quote(quote\_id)

Delete Quote

Delete a quote, which means it can no longer be accepted

### Example

```python  theme={null}
import kalshi_python
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

quote_id = 'quote_id_example' # str | Quote ID

try:
    # Delete Quote
    client.delete_quote(quote_id)
except Exception as e:
    print("Exception when calling CommunicationsApi->delete_quote: %s\n" % e)
```

### Parameters

| Name          | Type    | Description | Notes |
| ------------- | ------- | ----------- | ----- |
| **quote\_id** | **str** | Quote ID    |       |

### Return type

void (empty response body)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **204**     | Quote deleted successfully             |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **delete\_rfq**

> delete\_rfq(rfq\_id)

Delete RFQ

Delete an RFQ by ID

### Example

```python  theme={null}
import kalshi_python
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

rfq_id = 'rfq_id_example' # str | RFQ ID

try:
    # Delete RFQ
    client.delete_rfq(rfq_id)
except Exception as e:
    print("Exception when calling CommunicationsApi->delete_rfq: %s\n" % e)
```

### Parameters

| Name        | Type    | Description | Notes |
| ----------- | ------- | ----------- | ----- |
| **rfq\_id** | **str** | RFQ ID      |       |

### Return type

void (empty response body)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **204**     | RFQ deleted successfully               |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_communications\_id**

> GetCommunicationsIDResponse get\_communications\_id()

Get Communications ID

Get the communications ID of the logged-in user

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_communications_id_response import GetCommunicationsIDResponse
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

try:
    # Get Communications ID
    api_response = client.get_communications_id()
    print("The response of CommunicationsApi->get_communications_id:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling CommunicationsApi->get_communications_id: %s\n" % e)
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetCommunicationsIDResponse**](https://docs.kalshi.com/python-sdk/models/GetCommunicationsIDResponse)

### HTTP response details

| Status code | Description                              |
| ----------- | ---------------------------------------- |
| **200**     | Communications ID retrieved successfully |
| **401**     | Unauthorized - authentication required   |
| **500**     | Internal server error                    |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_quote**

> GetQuoteResponse get\_quote(quote\_id)

Get Quote

Get a particular quote by ID

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_quote_response import GetQuoteResponse
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

quote_id = 'quote_id_example' # str | Quote ID

try:
    # Get Quote
    api_response = client.get_quote(quote_id)
    print("The response of CommunicationsApi->get_quote:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling CommunicationsApi->get_quote: %s\n" % e)
```

### Parameters

| Name          | Type    | Description | Notes |
| ------------- | ------- | ----------- | ----- |
| **quote\_id** | **str** | Quote ID    |       |

### Return type

[**GetQuoteResponse**](https://docs.kalshi.com/python-sdk/models/GetQuoteResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Quote retrieved successfully           |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_quotes**

> GetQuotesResponse get\_quotes()

Get Quotes

Retrieve all quotes

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_quotes_response import GetQuotesResponse
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

try:
    # Get Quotes
    api_response = client.get_quotes()
    print("The response of CommunicationsApi->get_quotes:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling CommunicationsApi->get_quotes: %s\n" % e)
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetQuotesResponse**](https://docs.kalshi.com/python-sdk/models/GetQuotesResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Quotes retrieved successfully          |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_rfq**

> GetRFQResponse get\_rfq(rfq\_id)

Get RFQ

Get a single RFQ by ID

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_rfq_response import GetRFQResponse
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

rfq_id = 'rfq_id_example' # str | RFQ ID

try:
    # Get RFQ
    api_response = client.get_rfq(rfq_id)
    print("The response of CommunicationsApi->get_rfq:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling CommunicationsApi->get_rfq: %s\n" % e)
```

### Parameters

| Name        | Type    | Description | Notes |
| ----------- | ------- | ----------- | ----- |
| **rfq\_id** | **str** | RFQ ID      |       |

### Return type

[**GetRFQResponse**](https://docs.kalshi.com/python-sdk/models/GetRFQResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | RFQ retrieved successfully             |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_rfqs**

> GetRFQsResponse get\_rfqs()

Get RFQs

Retrieve all RFQs

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_rfqs_response import GetRFQsResponse
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

try:
    # Get RFQs
    api_response = client.get_rfqs()
    print("The response of CommunicationsApi->get_rfqs:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling CommunicationsApi->get_rfqs: %s\n" % e)
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetRFQsResponse**](https://docs.kalshi.com/python-sdk/models/GetRFQsResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | RFQs retrieved successfully            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)
