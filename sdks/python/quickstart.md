---
url: https://docs.kalshi.com/sdks/python/quickstart
lastmod: 2025-10-07T23:32:04.286Z
---
# Python SDK Quick Start

> Get started with the Kalshi Python SDK

## Installation

```bash  theme={null}
pip install kalshi-python
```

## Quick Start

```python  theme={null}
from kalshi_python import Configuration, KalshiClient

# Configure the client
config = Configuration(
    host="https://api.elections.kalshi.com/trade-api/v2"
)

# For authenticated requests
# Read private key from file
with open("path/to/private_key.pem", "r") as f:
    private_key = f.read()

config.api_key_id = "your-api-key-id"
config.private_key_pem = private_key

# Initialize the client
client = KalshiClient(config)

# Make API calls
balance = client.get_balance()
print(f"Balance: ${balance.balance / 100:.2f}")
```

## Source Code

* PyPI: [https://pypi.org/project/kalshi-python/](https://pypi.org/project/kalshi-python/)
