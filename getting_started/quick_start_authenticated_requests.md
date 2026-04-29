---
url: https://docs.kalshi.com/getting_started/quick_start_authenticated_requests
lastmod: 2026-04-28T16:38:08.233Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Quick Start: Authenticated Requests

> Three simple steps to make your first authenticated API request to Kalshi

This guide shows you how to make authenticated requests to the Kalshi API in three simple steps.

## Step 1: Get Your API Keys

1. Log in to your Kalshi account ([demo](https://demo.kalshi.co) or [production](https://kalshi.com))
2. Navigate to **Account & security** → **API Keys**
3. Click **Create Key**
4. Save both:
   * **Private Key**: Downloaded as a `.key` file
   * **API Key ID**: Displayed on screen (looks like `a952bcbe-ec3b-4b5b-b8f9-11dae589608c`)

<Warning>
  Your private key cannot be retrieved after this page is closed. Store it securely!
</Warning>

## Step 2: Set Up Your Request

Every authenticated request to Kalshi requires three headers:

| Header                    | Description                   | Example                                |
| ------------------------- | ----------------------------- | -------------------------------------- |
| `KALSHI-ACCESS-KEY`       | Your API Key ID               | `a952bcbe-ec3b-4b5b-b8f9-11dae589608c` |
| `KALSHI-ACCESS-TIMESTAMP` | Current time in milliseconds  | `1703123456789`                        |
| `KALSHI-ACCESS-SIGNATURE` | Request signature (see below) | `base64_encoded_signature`             |

### How to Create the Signature

The signature proves you own the private key. Here's how it works:

1. **Create a message string**: Concatenate `timestamp + HTTP_METHOD + path`
   * Example: `1703123456789GET/trade-api/v2/portfolio/balance`
   * **Important**: Sign the full URL path from the API root, without query parameters. For `https://demo-api.kalshi.co/trade-api/v2/portfolio/orders?limit=5`, sign `/trade-api/v2/portfolio/orders`.

2. **Sign with your private key**: Use RSA-PSS with SHA256

3. **Encode as base64**: Convert the signature to base64 string

Here's the signing process in Python:

```python theme={null}
import base64
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding

def sign_request(private_key, timestamp, method, path):
    # Strip query parameters from path before signing
    path_without_query = path.split('?')[0]

    # Create the message to sign
    message = f"{timestamp}{method}{path_without_query}".encode('utf-8')

    # Sign with RSA-PSS
    signature = private_key.sign(
        message,
        padding.PSS(
            mgf=padding.MGF1(hashes.SHA256()),
            salt_length=padding.PSS.DIGEST_LENGTH
        ),
        hashes.SHA256()
    )

    # Return base64 encoded
    return base64.b64encode(signature).decode('utf-8')
```

## Step 3: Get Your Balance

Now let's make your first authenticated request to get your account balance:

```python theme={null}
import requests
import datetime

# Set up the request
timestamp = str(int(datetime.datetime.now().timestamp() * 1000))
method = "GET"
path = "/trade-api/v2/portfolio/balance"

# Create signature (using function from Step 2)
signature = sign_request(private_key, timestamp, method, path)

# Make the request
headers = {
    'KALSHI-ACCESS-KEY': 'your-api-key-id',
    'KALSHI-ACCESS-SIGNATURE': signature,
    'KALSHI-ACCESS-TIMESTAMP': timestamp
}

response = requests.get('https://demo-api.kalshi.co' + path, headers=headers)
balance = response.json()

print(f"Your balance: ${balance['balance'] / 100:.2f}")
```

## Complete Working Example

Here's the minimal code to get your balance:

```python theme={null}
import requests
import datetime
import base64
from urllib.parse import urlparse
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import padding

# Configuration
API_KEY_ID = 'your-api-key-id-here'
PRIVATE_KEY_PATH = 'path/to/your/kalshi-key.key'
BASE_URL = 'https://demo-api.kalshi.co/trade-api/v2'  # or 'https://api.elections.kalshi.com/trade-api/v2' for production

def load_private_key(key_path):
    with open(key_path, "rb") as f:
        return serialization.load_pem_private_key(f.read(), password=None, backend=default_backend())

def create_signature(private_key, timestamp, method, path):
    """Create the request signature."""
    # Strip query parameters before signing
    path_without_query = path.split('?')[0]
    message = f"{timestamp}{method}{path_without_query}".encode('utf-8')
    signature = private_key.sign(
        message,
        padding.PSS(mgf=padding.MGF1(hashes.SHA256()), salt_length=padding.PSS.DIGEST_LENGTH),
        hashes.SHA256()
    )
    return base64.b64encode(signature).decode('utf-8')

def get(private_key, api_key_id, path, base_url=BASE_URL):
    """Make an authenticated GET request to the Kalshi API."""
    timestamp = str(int(datetime.datetime.now().timestamp() * 1000))
    # Signing requires the full URL path from root (e.g. /trade-api/v2/portfolio/balance)
    sign_path = urlparse(base_url + path).path
    signature = create_signature(private_key, timestamp, "GET", sign_path)

    headers = {
        'KALSHI-ACCESS-KEY': api_key_id,
        'KALSHI-ACCESS-SIGNATURE': signature,
        'KALSHI-ACCESS-TIMESTAMP': timestamp
    }

    return requests.get(base_url + path, headers=headers)

# Load private key
private_key = load_private_key(PRIVATE_KEY_PATH)

# Get balance
response = get(private_key, API_KEY_ID, "/portfolio/balance")
print(f"Your balance: ${response.json()['balance'] / 100:.2f}")
```

## Common Issues

| Problem                           | Solution                                                                                                                                                                                                     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 401 Unauthorized                  | Check your API Key ID and private key file path                                                                                                                                                              |
| Signature error                   | Ensure timestamp is in milliseconds (not seconds)                                                                                                                                                            |
| Path not found                    | If your `BASE_URL` already ends with `/trade-api/v2`, pass only the endpoint path to the helper (e.g. `/portfolio/balance`, not `/trade-api/v2/portfolio/balance`) so the request URL is not double-prefixed |
| Signature error with query params | Sign the request path without query parameters. The examples do this with `path.split('?')[0]` after building the full URL path                                                                              |

## Next Steps

Now you can make authenticated requests! Try these endpoints (relative to `BASE_URL`):

* `/portfolio/positions` - Get your positions
* `/portfolio/orders` - View your orders
* `/markets` - Browse available markets

For more details, see the [Complete Order Lifecycle](/getting_started/quick_start_create_order) guide or explore the [API Reference](/api-reference).
