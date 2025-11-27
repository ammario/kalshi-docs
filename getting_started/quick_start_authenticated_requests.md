---
url: https://docs.kalshi.com/getting_started/quick_start_authenticated_requests
lastmod: 2025-10-12T19:52:48.030Z
---
# Quick Start: Authenticated Requests

> Three simple steps to make your first authenticated API request to Kalshi

This guide shows you how to make authenticated requests to the Kalshi API in three simple steps.

## Step 1: Get Your API Keys

1. Log in to your Kalshi account ([demo](https://demo.kalshi.com) or [production](https://kalshi.com))
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
   * **Important**: Use the path **without query parameters**. For `/portfolio/orders?limit=5`, sign only `/trade-api/v2/portfolio/orders`

2. **Sign with your private key**: Use RSA-PSS with SHA256

3. **Encode as base64**: Convert the signature to base64 string

Here's the signing process in Python:

```python  theme={null}
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

```python  theme={null}
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

```python  theme={null}
import requests
import datetime
import base64
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import padding

# Configuration
API_KEY_ID = 'your-api-key-id-here'
PRIVATE_KEY_PATH = 'path/to/your/kalshi-key.key'
BASE_URL = 'https://demo-api.kalshi.co'  # or 'https://api.kalshi.com' for production

def load_private_key(key_path):
    """Load the private key from file."""
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
    signature = create_signature(private_key, timestamp, "GET", path)

    headers = {
        'KALSHI-ACCESS-KEY': api_key_id,
        'KALSHI-ACCESS-SIGNATURE': signature,
        'KALSHI-ACCESS-TIMESTAMP': timestamp
    }

    return requests.get(base_url + path, headers=headers)

# Load private key
private_key = load_private_key(PRIVATE_KEY_PATH)

# Get balance
response = get(private_key, API_KEY_ID, "/trade-api/v2/portfolio/balance")
print(f"Your balance: ${response.json()['balance'] / 100:.2f}")
```

## Common Issues

| Problem                           | Solution                                                         |
| --------------------------------- | ---------------------------------------------------------------- |
| 401 Unauthorized                  | Check your API Key ID and private key file path                  |
| Signature error                   | Ensure timestamp is in milliseconds (not seconds)                |
| Path not found                    | Path must start with `/trade-api/v2/`                            |
| Signature error with query params | Strip query parameters before signing (use `path.split('?')[0]`) |

## Next Steps

Now you can make authenticated requests! Try these endpoints:

* `/trade-api/v2/portfolio/positions` - Get your positions
* `/trade-api/v2/portfolio/orders` - View your orders
* `/trade-api/v2/markets` - Browse available markets

For more details, see the [Complete Order Lifecycle](./complete_order_lifecycle) guide or explore the [API Reference](/api-reference).


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: /llms.txt