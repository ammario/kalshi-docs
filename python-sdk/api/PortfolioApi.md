---
url: https://docs.kalshi.com/python-sdk/api/PortfolioApi
lastmod: 2025-10-07T23:32:03.962Z
---
# Portfolio

> Python SDK methods for Portfolio operations

All URIs are relative to *[https://api.elections.kalshi.com/trade-api/v2](https://api.elections.kalshi.com/trade-api/v2)*

| Method                                                                  | HTTP request                                            | Description                   |
| ----------------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------- |
| [**amend\_order**](#amend-order)                                        | **POST** /portfolio/orders/{order_id}/amend             | Amend Order                   |
| [**batch\_cancel\_orders**](#batch-cancel-orders)                       | **DELETE** /portfolio/orders/batched                    | Batch Cancel Orders           |
| [**batch\_create\_orders**](#batch-create-orders)                       | **POST** /portfolio/orders/batched                      | Batch Create Orders           |
| [**cancel\_order**](#cancel-order)                                      | **DELETE** /portfolio/orders/{order_id}                 | Cancel Order                  |
| [**create\_order**](#create-order)                                      | **POST** /portfolio/orders                              | Create Order                  |
| [**create\_order\_group**](#create-order-group)                         | **POST** /portfolio/order\_groups/create                | Create Order Group            |
| [**decrease\_order**](#decrease-order)                                  | **POST** /portfolio/orders/{order_id}/decrease          | Decrease Order                |
| [**delete\_order\_group**](#delete-order-group)                         | **DELETE** /portfolio/order\_groups/{order_group_id}    | Delete Order Group            |
| [**get\_balance**](#get-balance)                                        | **GET** /portfolio/balance                              | Get Balance                   |
| [**get\_fills**](#get-fills)                                            | **GET** /portfolio/fills                                | Get Fills                     |
| [**get\_order**](#get-order)                                            | **GET** /portfolio/orders/{order_id}                    | Get Order                     |
| [**get\_order\_group**](#get-order-group)                               | **GET** /portfolio/order\_groups/{order_group_id}       | Get Order Group               |
| [**get\_order\_groups**](#get-order-groups)                             | **GET** /portfolio/order\_groups                        | Get Order Groups              |
| [**get\_order\_queue\_position**](#get-order-queue-position)            | **GET** /portfolio/orders/{order_id}/queue\_position    | Get Order Queue Position      |
| [**get\_orders**](#get-orders)                                          | **GET** /portfolio/orders                               | Get Orders                    |
| [**get\_positions**](#get-positions)                                    | **GET** /portfolio/positions                            | Get Positions                 |
| [**get\_queue\_positions**](#get-queue-positions)                       | **POST** /portfolio/orders/queue\_positions             | Get Queue Positions           |
| [**get\_settlements**](#get-settlements)                                | **GET** /portfolio/settlements                          | Get Settlements               |
| [**get\_total\_resting\_order\_value**](#get-total-resting-order-value) | **GET** /portfolio/summary/total\_resting\_order\_value | Get Total Resting Order Value |
| [**reset\_order\_group**](#reset-order-group)                           | **PUT** /portfolio/order\_groups/{order_group_id}/reset | Reset Order Group             |

# **amend\_order**

> AmendOrderResponse amend\_order(order\_id, amend\_order\_request)

Amend Order

Amend an existing order

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.amend_order_request import AmendOrderRequest
from kalshi_python.models.amend_order_response import AmendOrderResponse
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

order_id = 'order_id_example' # str | Order ID

amend_order_request = kalshi_python.AmendOrderRequest() # AmendOrderRequest |

try:
    # Amend Order
    api_response = client.amend_order(order_id, amend_order_request)
    print("The response of PortfolioApi->amend_order:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->amend_order: %s\n" % e)
```

### Parameters

| Name                      | Type                                                                                 | Description | Notes |
| ------------------------- | ------------------------------------------------------------------------------------ | ----------- | ----- |
| **order\_id**             | **str**                                                                              | Order ID    |       |
| **amend\_order\_request** | [**AmendOrderRequest**](https://docs.kalshi.com/python-sdk/models/AmendOrderRequest) |             |       |

### Return type

[**AmendOrderResponse**](https://docs.kalshi.com/python-sdk/models/AmendOrderResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Order amended successfully             |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **batch\_cancel\_orders**

> BatchCancelOrdersResponse batch\_cancel\_orders(batch\_cancel\_orders\_request)

Batch Cancel Orders

Cancel multiple orders in a single request

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.batch_cancel_orders_request import BatchCancelOrdersRequest
from kalshi_python.models.batch_cancel_orders_response import BatchCancelOrdersResponse
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

batch_cancel_orders_request = kalshi_python.BatchCancelOrdersRequest() # BatchCancelOrdersRequest |

try:
    # Batch Cancel Orders
    api_response = client.batch_cancel_orders(batch_cancel_orders_request)
    print("The response of PortfolioApi->batch_cancel_orders:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->batch_cancel_orders: %s\n" % e)
```

### Parameters

| Name                               | Type                                                                                               | Description | Notes |
| ---------------------------------- | -------------------------------------------------------------------------------------------------- | ----------- | ----- |
| **batch\_cancel\_orders\_request** | [**BatchCancelOrdersRequest**](https://docs.kalshi.com/python-sdk/models/BatchCancelOrdersRequest) |             |       |

### Return type

[**BatchCancelOrdersResponse**](https://docs.kalshi.com/python-sdk/models/BatchCancelOrdersResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Batch order cancellation completed     |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **batch\_create\_orders**

> BatchCreateOrdersResponse batch\_create\_orders(batch\_create\_orders\_request)

Batch Create Orders

Create multiple orders in a single request

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.batch_create_orders_request import BatchCreateOrdersRequest
from kalshi_python.models.batch_create_orders_response import BatchCreateOrdersResponse
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

batch_create_orders_request = kalshi_python.BatchCreateOrdersRequest() # BatchCreateOrdersRequest |

try:
    # Batch Create Orders
    api_response = client.batch_create_orders(batch_create_orders_request)
    print("The response of PortfolioApi->batch_create_orders:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->batch_create_orders: %s\n" % e)
```

### Parameters

| Name                               | Type                                                                                               | Description | Notes |
| ---------------------------------- | -------------------------------------------------------------------------------------------------- | ----------- | ----- |
| **batch\_create\_orders\_request** | [**BatchCreateOrdersRequest**](https://docs.kalshi.com/python-sdk/models/BatchCreateOrdersRequest) |             |       |

### Return type

[**BatchCreateOrdersResponse**](https://docs.kalshi.com/python-sdk/models/BatchCreateOrdersResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Batch order creation completed         |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **cancel\_order**

> CancelOrderResponse cancel\_order(order\_id)

Cancel Order

Cancel an order

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.cancel_order_response import CancelOrderResponse
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

order_id = 'order_id_example' # str | Order ID

try:
    # Cancel Order
    api_response = client.cancel_order(order_id)
    print("The response of PortfolioApi->cancel_order:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->cancel_order: %s\n" % e)
```

### Parameters

| Name          | Type    | Description | Notes |
| ------------- | ------- | ----------- | ----- |
| **order\_id** | **str** | Order ID    |       |

### Return type

[**CancelOrderResponse**](https://docs.kalshi.com/python-sdk/models/CancelOrderResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Order cancelled successfully           |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **create\_order**

> CreateOrderResponse create\_order(create\_order\_request)

Create Order

Create a new order

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.create_order_request import CreateOrderRequest
from kalshi_python.models.create_order_response import CreateOrderResponse
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

create_order_request = kalshi_python.CreateOrderRequest() # CreateOrderRequest |

try:
    # Create Order
    api_response = client.create_order(create_order_request)
    print("The response of PortfolioApi->create_order:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->create_order: %s\n" % e)
```

### Parameters

| Name                       | Type                                                                                   | Description | Notes |
| -------------------------- | -------------------------------------------------------------------------------------- | ----------- | ----- |
| **create\_order\_request** | [**CreateOrderRequest**](https://docs.kalshi.com/python-sdk/models/CreateOrderRequest) |             |       |

### Return type

[**CreateOrderResponse**](https://docs.kalshi.com/python-sdk/models/CreateOrderResponse)

### HTTP response details

| Status code | Description                             |
| ----------- | --------------------------------------- |
| **201**     | Order created successfully              |
| **400**     | Bad request - invalid input             |
| **401**     | Unauthorized - authentication required  |
| **429**     | Too Many Requests - rate limit exceeded |
| **500**     | Internal server error                   |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **create\_order\_group**

> CreateOrderGroupResponse create\_order\_group(create\_order\_group\_request)

Create Order Group

Create a new order group

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.create_order_group_request import CreateOrderGroupRequest
from kalshi_python.models.create_order_group_response import CreateOrderGroupResponse
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

create_order_group_request = kalshi_python.CreateOrderGroupRequest() # CreateOrderGroupRequest |

try:
    # Create Order Group
    api_response = client.create_order_group(create_order_group_request)
    print("The response of PortfolioApi->create_order_group:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->create_order_group: %s\n" % e)
```

### Parameters

| Name                              | Type                                                                                             | Description | Notes |
| --------------------------------- | ------------------------------------------------------------------------------------------------ | ----------- | ----- |
| **create\_order\_group\_request** | [**CreateOrderGroupRequest**](https://docs.kalshi.com/python-sdk/models/CreateOrderGroupRequest) |             |       |

### Return type

[**CreateOrderGroupResponse**](https://docs.kalshi.com/python-sdk/models/CreateOrderGroupResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **201**     | Order group created successfully       |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **decrease\_order**

> DecreaseOrderResponse decrease\_order(order\_id, decrease\_order\_request)

Decrease Order

Decrease the size of an existing order

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.decrease_order_request import DecreaseOrderRequest
from kalshi_python.models.decrease_order_response import DecreaseOrderResponse
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

order_id = 'order_id_example' # str | Order ID

decrease_order_request = kalshi_python.DecreaseOrderRequest() # DecreaseOrderRequest |

try:
    # Decrease Order
    api_response = client.decrease_order(order_id, decrease_order_request)
    print("The response of PortfolioApi->decrease_order:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->decrease_order: %s\n" % e)
```

### Parameters

| Name                         | Type                                                                                       | Description | Notes |
| ---------------------------- | ------------------------------------------------------------------------------------------ | ----------- | ----- |
| **order\_id**                | **str**                                                                                    | Order ID    |       |
| **decrease\_order\_request** | [**DecreaseOrderRequest**](https://docs.kalshi.com/python-sdk/models/DecreaseOrderRequest) |             |       |

### Return type

[**DecreaseOrderResponse**](https://docs.kalshi.com/python-sdk/models/DecreaseOrderResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Order decreased successfully           |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **delete\_order\_group**

> delete\_order\_group(order\_group\_id)

Delete Order Group

Delete an order group

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

order_group_id = 'order_group_id_example' # str | Order group ID

try:
    # Delete Order Group
    client.delete_order_group(order_group_id)
except Exception as e:
    print("Exception when calling PortfolioApi->delete_order_group: %s\n" % e)
```

### Parameters

| Name                 | Type    | Description    | Notes |
| -------------------- | ------- | -------------- | ----- |
| **order\_group\_id** | **str** | Order group ID |       |

### Return type

void (empty response body)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **204**     | Order group deleted successfully       |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_balance**

> GetBalanceResponse get\_balance()

Get Balance

Get the user's current balance

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_balance_response import GetBalanceResponse
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
    # Get Balance
    api_response = client.get_balance()
    print("The response of PortfolioApi->get_balance:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->get_balance: %s\n" % e)
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetBalanceResponse**](https://docs.kalshi.com/python-sdk/models/GetBalanceResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Balance retrieved successfully         |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_fills**

> GetFillsResponse get\_fills(ticker=ticker, order\_id=order\_id, min\_ts=min\_ts, max\_ts=max\_ts, limit=limit, cursor=cursor)

Get Fills

Get fills for the logged-in user.

A fill represents a partial or complete execution of an order. When an order matches with another order in the orderbook, a fill is created for each side of the trade.

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_fills_response import GetFillsResponse
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

ticker = 'ticker_example' # str | Filter by market ticker (optional)

order_id = 'order_id_example' # str | Filter by order ID (optional)

min_ts = 56 # int | Filter items after this Unix timestamp (optional)

max_ts = 56 # int | Filter items before this Unix timestamp (optional)

limit = 100 # int | Number of results per page. Defaults to 100. Maximum value is 200. (optional) (default to 100)

cursor = 'cursor_example' # str | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. (optional)

try:
    # Get Fills
    api_response = client.get_fills(ticker=ticker, order_id=order_id, min_ts=min_ts, max_ts=max_ts, limit=limit, cursor=cursor)
    print("The response of PortfolioApi->get_fills:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->get_fills: %s\n" % e)
```

### Parameters

| Name          | Type    | Description                                                                                                                                  | Notes                         |
| ------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **ticker**    | **str** | Filter by market ticker                                                                                                                      | \[optional]                   |
| **order\_id** | **str** | Filter by order ID                                                                                                                           | \[optional]                   |
| **min\_ts**   | **int** | Filter items after this Unix timestamp                                                                                                       | \[optional]                   |
| **max\_ts**   | **int** | Filter items before this Unix timestamp                                                                                                      | \[optional]                   |
| **limit**     | **int** | Number of results per page. Defaults to 100. Maximum value is 200.                                                                           | \[optional] \[default to 100] |
| **cursor**    | **str** | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | \[optional]                   |

### Return type

[**GetFillsResponse**](https://docs.kalshi.com/python-sdk/models/GetFillsResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Fills retrieved successfully           |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_order**

> GetOrderResponse get\_order(order\_id)

Get Order

Get a single order by ID

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_order_response import GetOrderResponse
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

order_id = 'order_id_example' # str | Order ID

try:
    # Get Order
    api_response = client.get_order(order_id)
    print("The response of PortfolioApi->get_order:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->get_order: %s\n" % e)
```

### Parameters

| Name          | Type    | Description | Notes |
| ------------- | ------- | ----------- | ----- |
| **order\_id** | **str** | Order ID    |       |

### Return type

[**GetOrderResponse**](https://docs.kalshi.com/python-sdk/models/GetOrderResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Order retrieved successfully           |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_order\_group**

> GetOrderGroupResponse get\_order\_group(order\_group\_id)

Get Order Group

Get details of a specific order group

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_order_group_response import GetOrderGroupResponse
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

order_group_id = 'order_group_id_example' # str | Order group ID

try:
    # Get Order Group
    api_response = client.get_order_group(order_group_id)
    print("The response of PortfolioApi->get_order_group:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->get_order_group: %s\n" % e)
```

### Parameters

| Name                 | Type    | Description    | Notes |
| -------------------- | ------- | -------------- | ----- |
| **order\_group\_id** | **str** | Order group ID |       |

### Return type

[**GetOrderGroupResponse**](https://docs.kalshi.com/python-sdk/models/GetOrderGroupResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Order group retrieved successfully     |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_order\_groups**

> GetOrderGroupsResponse get\_order\_groups(status=status, limit=limit, cursor=cursor)

Get Order Groups

Get order groups for the logged-in user

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_order_groups_response import GetOrderGroupsResponse
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

status = 'status_example' # str | Filter by status. Possible values depend on the endpoint. (optional)

limit = 100 # int | Number of results per page. Defaults to 100. Maximum value is 200. (optional) (default to 100)

cursor = 'cursor_example' # str | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. (optional)

try:
    # Get Order Groups
    api_response = client.get_order_groups(status=status, limit=limit, cursor=cursor)
    print("The response of PortfolioApi->get_order_groups:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->get_order_groups: %s\n" % e)
```

### Parameters

| Name       | Type    | Description                                                                                                                                  | Notes                         |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **status** | **str** | Filter by status. Possible values depend on the endpoint.                                                                                    | \[optional]                   |
| **limit**  | **int** | Number of results per page. Defaults to 100. Maximum value is 200.                                                                           | \[optional] \[default to 100] |
| **cursor** | **str** | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | \[optional]                   |

### Return type

[**GetOrderGroupsResponse**](https://docs.kalshi.com/python-sdk/models/GetOrderGroupsResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Order groups retrieved successfully    |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_order\_queue\_position**

> GetOrderQueuePositionResponse get\_order\_queue\_position(order\_id)

Get Order Queue Position

Get the queue position for an order

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_order_queue_position_response import GetOrderQueuePositionResponse
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

order_id = 'order_id_example' # str | Order ID

try:
    # Get Order Queue Position
    api_response = client.get_order_queue_position(order_id)
    print("The response of PortfolioApi->get_order_queue_position:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->get_order_queue_position: %s\n" % e)
```

### Parameters

| Name          | Type    | Description | Notes |
| ------------- | ------- | ----------- | ----- |
| **order\_id** | **str** | Order ID    |       |

### Return type

[**GetOrderQueuePositionResponse**](https://docs.kalshi.com/python-sdk/models/GetOrderQueuePositionResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Queue position retrieved successfully  |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_orders**

> GetOrdersResponse get\_orders(ticker=ticker, event\_ticker=event\_ticker, min\_ts=min\_ts, max\_ts=max\_ts, status=status, limit=limit, cursor=cursor)

Get Orders

Get orders for the logged-in user

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_orders_response import GetOrdersResponse
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

ticker = 'ticker_example' # str | Filter by market ticker (optional)

event_ticker = 'event_ticker_example' # str | Filter by event ticker (optional)

min_ts = 56 # int | Filter items after this Unix timestamp (optional)

max_ts = 56 # int | Filter items before this Unix timestamp (optional)

status = 'status_example' # str | Filter by status. Possible values depend on the endpoint. (optional)

limit = 100 # int | Number of results per page. Defaults to 100. Maximum value is 200. (optional) (default to 100)

cursor = 'cursor_example' # str | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. (optional)

try:
    # Get Orders
    api_response = client.get_orders(ticker=ticker, event_ticker=event_ticker, min_ts=min_ts, max_ts=max_ts, status=status, limit=limit, cursor=cursor)
    print("The response of PortfolioApi->get_orders:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->get_orders: %s\n" % e)
```

### Parameters

| Name              | Type    | Description                                                                                                                                  | Notes                         |
| ----------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **ticker**        | **str** | Filter by market ticker                                                                                                                      | \[optional]                   |
| **event\_ticker** | **str** | Filter by event ticker                                                                                                                       | \[optional]                   |
| **min\_ts**       | **int** | Filter items after this Unix timestamp                                                                                                       | \[optional]                   |
| **max\_ts**       | **int** | Filter items before this Unix timestamp                                                                                                      | \[optional]                   |
| **status**        | **str** | Filter by status. Possible values depend on the endpoint.                                                                                    | \[optional]                   |
| **limit**         | **int** | Number of results per page. Defaults to 100. Maximum value is 200.                                                                           | \[optional] \[default to 100] |
| **cursor**        | **str** | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | \[optional]                   |

### Return type

[**GetOrdersResponse**](https://docs.kalshi.com/python-sdk/models/GetOrdersResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Orders retrieved successfully          |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_positions**

> GetPositionsResponse get\_positions(ticker=ticker, event\_ticker=event\_ticker, count\_down=count\_down, count\_up=count\_up, limit=limit, cursor=cursor)

Get Positions

Get positions for the logged-in user

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_positions_response import GetPositionsResponse
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

ticker = 'ticker_example' # str | Filter by market ticker (optional)

event_ticker = 'event_ticker_example' # str | Filter by event ticker (optional)

count_down = 56 # int | Filter positions by minimum count down value (optional)

count_up = 56 # int | Filter positions by minimum count up value (optional)

limit = 100 # int | Number of results per page. Defaults to 100. Maximum value is 200. (optional) (default to 100)

cursor = 'cursor_example' # str | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. (optional)

try:
    # Get Positions
    api_response = client.get_positions(ticker=ticker, event_ticker=event_ticker, count_down=count_down, count_up=count_up, limit=limit, cursor=cursor)
    print("The response of PortfolioApi->get_positions:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->get_positions: %s\n" % e)
```

### Parameters

| Name              | Type    | Description                                                                                                                                  | Notes                         |
| ----------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **ticker**        | **str** | Filter by market ticker                                                                                                                      | \[optional]                   |
| **event\_ticker** | **str** | Filter by event ticker                                                                                                                       | \[optional]                   |
| **count\_down**   | **int** | Filter positions by minimum count down value                                                                                                 | \[optional]                   |
| **count\_up**     | **int** | Filter positions by minimum count up value                                                                                                   | \[optional]                   |
| **limit**         | **int** | Number of results per page. Defaults to 100. Maximum value is 200.                                                                           | \[optional] \[default to 100] |
| **cursor**        | **str** | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | \[optional]                   |

### Return type

[**GetPositionsResponse**](https://docs.kalshi.com/python-sdk/models/GetPositionsResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Positions retrieved successfully       |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_queue\_positions**

> GetQueuePositionsResponse get\_queue\_positions(get\_queue\_positions\_request)

Get Queue Positions

Get queue positions for multiple orders

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_queue_positions_request import GetQueuePositionsRequest
from kalshi_python.models.get_queue_positions_response import GetQueuePositionsResponse
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

get_queue_positions_request = kalshi_python.GetQueuePositionsRequest() # GetQueuePositionsRequest |

try:
    # Get Queue Positions
    api_response = client.get_queue_positions(get_queue_positions_request)
    print("The response of PortfolioApi->get_queue_positions:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->get_queue_positions: %s\n" % e)
```

### Parameters

| Name                               | Type                                                                                               | Description | Notes |
| ---------------------------------- | -------------------------------------------------------------------------------------------------- | ----------- | ----- |
| **get\_queue\_positions\_request** | [**GetQueuePositionsRequest**](https://docs.kalshi.com/python-sdk/models/GetQueuePositionsRequest) |             |       |

### Return type

[**GetQueuePositionsResponse**](https://docs.kalshi.com/python-sdk/models/GetQueuePositionsResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Queue positions retrieved successfully |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_settlements**

> GetSettlementsResponse get\_settlements(limit=limit, cursor=cursor)

Get Settlements

Get settlements for the logged-in user

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_settlements_response import GetSettlementsResponse
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

limit = 100 # int | Number of results per page. Defaults to 100. Maximum value is 200. (optional) (default to 100)

cursor = 'cursor_example' # str | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. (optional)

try:
    # Get Settlements
    api_response = client.get_settlements(limit=limit, cursor=cursor)
    print("The response of PortfolioApi->get_settlements:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->get_settlements: %s\n" % e)
```

### Parameters

| Name       | Type    | Description                                                                                                                                  | Notes                         |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **limit**  | **int** | Number of results per page. Defaults to 100. Maximum value is 200.                                                                           | \[optional] \[default to 100] |
| **cursor** | **str** | Pagination cursor. Use the cursor value returned from the previous response to get the next page of results. Leave empty for the first page. | \[optional]                   |

### Return type

[**GetSettlementsResponse**](https://docs.kalshi.com/python-sdk/models/GetSettlementsResponse)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **200**     | Settlements retrieved successfully     |
| **400**     | Bad request - invalid input            |
| **401**     | Unauthorized - authentication required |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **get\_total\_resting\_order\_value**

> GetTotalRestingOrderValueResponse get\_total\_resting\_order\_value()

Get Total Resting Order Value

Get the total value of all resting orders

### Example

```python  theme={null}
import kalshi_python
from kalshi_python.models.get_total_resting_order_value_response import GetTotalRestingOrderValueResponse
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
    # Get Total Resting Order Value
    api_response = client.get_total_resting_order_value()
    print("The response of PortfolioApi->get_total_resting_order_value:\n")
    pprint(api_response)
except Exception as e:
    print("Exception when calling PortfolioApi->get_total_resting_order_value: %s\n" % e)
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetTotalRestingOrderValueResponse**](https://docs.kalshi.com/python-sdk/models/GetTotalRestingOrderValueResponse)

### HTTP response details

| Status code | Description                                      |
| ----------- | ------------------------------------------------ |
| **200**     | Total resting order value retrieved successfully |
| **401**     | Unauthorized - authentication required           |
| **500**     | Internal server error                            |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)

# **reset\_order\_group**

> reset\_order\_group(order\_group\_id)

Reset Order Group

Reset an order group

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

order_group_id = 'order_group_id_example' # str | Order group ID

try:
    # Reset Order Group
    client.reset_order_group(order_group_id)
except Exception as e:
    print("Exception when calling PortfolioApi->reset_order_group: %s\n" % e)
```

### Parameters

| Name                 | Type    | Description    | Notes |
| -------------------- | ------- | -------------- | ----- |
| **order\_group\_id** | **str** | Order group ID |       |

### Return type

void (empty response body)

### HTTP response details

| Status code | Description                            |
| ----------- | -------------------------------------- |
| **204**     | Order group reset successfully         |
| **401**     | Unauthorized - authentication required |
| **404**     | Resource not found                     |
| **500**     | Internal server error                  |

[\[Back to top\]](#) [\[Back to API list\]](https://docs.kalshi.com/python-sdk/api) [\[Back to Model list\]](https://docs.kalshi.com/python-sdk/models) [\[Back to README\]](https://docs.kalshi.com/python-sdk)
