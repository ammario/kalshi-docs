---
url: https://docs.kalshi.com/sdks/python/quickstart
lastmod: 2026-01-22T21:13:32.898Z
---
# Python SDK Quick Start

> Get started with the Kalshi Python SDK

## Installation

```bash  theme={null}
pip install kalshi_python_sync
```

Or for async support:

```bash  theme={null}
pip install kalshi_python_async
```

<Note>
  The old `kalshi-python` package is deprecated. Please use `kalshi_python_sync` or `kalshi_python_async` instead.
</Note>

## Quick Start

```python  theme={null}
from kalshi_python_sync import Configuration, KalshiClient

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

* PyPI (sync): [https://pypi.org/project/kalshi\_python\_sync/](https://pypi.org/project/kalshi_python_sync/)
* PyPI (async): [https://pypi.org/project/kalshi\_python\_async/](https://pypi.org/project/kalshi_python_async/)


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt