---
url: https://docs.kalshi.com/getting_started/api_keys
lastmod: 2026-11-13T01:31:27.786Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# API Keys

> API Key usage

> [!NOTE]
>
> This process is the same for the demo or production environment.

## Key types

Kalshi API keys are asymmetric key pairs: you sign each request with the
private key, and Kalshi verifies the signature with the registered public key.
Two key types are supported:

| Key type | Signature | Private key PEM Kalshi generates | When to use |
| - | - | - | - |
| **Ed25519** (recommended) | Ed25519 (RFC 8032) over the pre-sign text | `-----BEGIN PRIVATE KEY-----` (PKCS#8) | Clients that support Ed25519. Lower signing cost than RSA-PSS; 64-byte signatures |
| **RSA** (2048-bit) | RSA-PSS with SHA-256 over the pre-sign text | `-----BEGIN RSA PRIVATE KEY-----` (PKCS#1) | Clients limited to RSA-PSS, including SDK versions before 3.31.0 |

Headers, pre-sign text, permissions and errors are identical for both types. Kalshi
selects the verification algorithm from the registered public key; sign with the
algorithm that matches your key.

The PEM header does not identify the key type: PKCS#8 RSA keys, including
`openssl genpkey` output, also begin with `-----BEGIN PRIVATE KEY-----`.
Determine the type from the parsed key, as the samples below do.

## Generating an API Key

### Access the Account Settings Page:

Log in to your account and navigate to the "Account Settings" page. You can typically find this option by clicking on your profile picture or account icon in the top-right corner of the application.

### Generate a New API Key

In the "Profile Settings" page [https://kalshi.com/account/profile](https://kalshi.com/account/profile), locate the "API Keys" section. Click on the "Create New API Key" button to generate a key pair. Ed25519 is selected by default; choose RSA if your client supports only RSA-PSS. You can also register your own public key (below) or use `POST /trade-api/v2/api_keys/generate` with `key_type`.

To register your own public key of either type, in PEM format:

```bash theme={null}
# Ed25519
openssl genpkey -algorithm ed25519 -out kalshi.key
openssl pkey -in kalshi.key -pubout -out kalshi.pub

# RSA
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out kalshi.key
openssl rsa -in kalshi.key -pubout -out kalshi.pub
```

Paste the contents of `kalshi.pub` into the public key field. The private key never leaves your system.

### Store Your API Key and Key ID:

After generating the key, you will be presented with:
• Private Key: your secret key in PEM format.
• Key ID: This is a unique identifier associated with your private key.

**Important**: For security reasons, the private key will not be stored by our service, and you will not be able to retrieve it again once this page is closed. Please make sure to securely copy and save the private key immediately. The key will also be downloaded as txt file with the name provided.

Keys can also be created through the API: `POST /trade-api/v2/api_keys` registers your public key; `POST /trade-api/v2/api_keys/generate` returns a new key pair of the requested `key_type` (`rsa` when omitted). Both are available on every API tier.

In production, an account can hold up to **100** keys that it manages directly, meaning keys created on the account settings page or with these two endpoints. Creating another returns `409` with code `MAXIMUM_NUMBER_OF_API_KEYS_REACHED`; delete one of those keys with `DELETE /trade-api/v2/api_keys/{api_key}` first. Keys issued to the account in other ways, such as through a partner integration, are counted separately. The limit can differ in the demo environment.

## Using a API Key

Each request to Kalshi trading api will need to be signed with the private key generated above.

The following header values will need to be provided with each request:

`KALSHI-ACCESS-KEY`- the Key ID

`KALSHI-ACCESS-TIMESTAMP` - the request timestamp in ms

`KALSHI-ACCESS-SIGNATURE`- request hash signed with private key

The signature is the base64 encoding of the signed concatenation of the timestamp, the HTTP method and the path. Ed25519 keys sign the string directly; RSA keys use RSA-PSS with SHA-256 (MGF1 with SHA-256, salt length equal to the digest length).

> [!WARNING]
>
> **Important**: When signing requests, use the path **without query parameters**. For example, if your request is to `/trade-api/v2/portfolio/orders?limit=5`, sign only `/trade-api/v2/portfolio/orders` (strip the `?` and everything after it).

> [!WARNING]
>
> **Timestamp tolerance**: `KALSHI-ACCESS-TIMESTAMP` must be within **30 seconds** of Kalshi's clock, in either direction. Outside that window the request returns `401` with code `header_timestamp_expired`, even when the signature is correct. Generate the timestamp immediately before sending, and keep your system clock synchronized (for example with NTP).

The samples below detect the key type and sign accordingly. For end-to-end examples, see [Quick Start: Authenticated Requests](https://docs.kalshi.com/getting_started/quick_start_authenticated_requests.md). The official Python and TypeScript SDKs accept either key type from version 3.31.0.

### Python

Load the private key stored in a file

```python theme={null}
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.backends import default_backend

def load_private_key_from_file(file_path):
    with open(file_path, "rb") as key_file:
        private_key = serialization.load_pem_private_key(
            key_file.read(),
            password=None,  # or provide a password if your key is encrypted
            backend=default_backend()
        )
    return private_key
```

Sign text with private key

```python theme={null}
import base64
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey

def sign_text(private_key, text: str) -> str:
    message = text.encode('utf-8')
    if isinstance(private_key, Ed25519PrivateKey):
        # Ed25519 signs the message itself
        signature = private_key.sign(message)
    else:
        # RSA signs with RSA-PSS over SHA-256
        signature = private_key.sign(
            message,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.DIGEST_LENGTH
            ),
            hashes.SHA256()
        )
    return base64.b64encode(signature).decode('utf-8')
```

Send a request to Kalshi API with signed header

```python theme={null}
import requests
import datetime

current_time = datetime.datetime.now()
timestamp = current_time.timestamp()
current_time_milliseconds = int(timestamp * 1000)
timestampt_str = str(current_time_milliseconds)

private_key = load_private_key_from_file('kalshi-key-2.key')

method = "GET"
base_url = 'https://external-api.demo.kalshi.co'
path='/trade-api/v2/portfolio/balance'

# Strip query parameters from path before signing
path_without_query = path.split('?')[0]
msg_string = timestampt_str + method + path_without_query
sig = sign_text(private_key, msg_string)

headers = {
    'KALSHI-ACCESS-KEY': 'a952bcbe-ec3b-4b5b-b8f9-11dae589608c',
    'KALSHI-ACCESS-SIGNATURE': sig,
    'KALSHI-ACCESS-TIMESTAMP': timestampt_str
}

response = requests.get(base_url + path, headers=headers)

print(response.text)
```

### Javascript

Load the private key stored in a file

```javascript theme={null}
const fs = require('fs');
const path = require('path');

function loadPrivateKeyFromFile(filePath) {
    const absolutePath = path.resolve(filePath);
    const privateKeyPem = fs.readFileSync(absolutePath, 'utf8');
    return privateKeyPem;
}
```

Sign text with private key

```javascript theme={null}
const crypto = require('crypto');

function signText(privateKeyPem, text) {
    const privateKey = crypto.createPrivateKey(privateKeyPem);

    if (privateKey.asymmetricKeyType === 'ed25519') {
        // Ed25519 signs the message itself
        return crypto.sign(null, Buffer.from(text, 'utf8'), privateKey).toString('base64');
    }

    // RSA signs with RSA-PSS over SHA-256
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(text);
    sign.end();

    const signature = sign.sign({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST,
    });

    return signature.toString('base64');
}
```

Send a request to Kalshi API with signed header

```javascript theme={null}
const axios = require('axios');

const currentTimeMilliseconds = Date.now();
const timestampStr = currentTimeMilliseconds.toString();

const privateKeyPem = loadPrivateKeyFromFile('path/to/your/private-key.pem');

const method = "GET";
const baseUrl = 'https://external-api.demo.kalshi.co';
const path = '/trade-api/v2/portfolio/balance';

// Strip query parameters from path before signing
const pathWithoutQuery = path.split('?')[0];
const msgString = timestampStr + method + pathWithoutQuery;
const sig = signText(privateKeyPem, msgString);

const headers = {
    'KALSHI-ACCESS-KEY': 'your-api-key-id',
    'KALSHI-ACCESS-SIGNATURE': sig,
    'KALSHI-ACCESS-TIMESTAMP': timestampStr
};

axios.get(baseUrl + path, { headers })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

## Scopes

Each key carries a list of scopes, set when the key is created (`scopes` on [Create API Key](https://docs.kalshi.com/api-reference/api-keys/create-api-key.md) and [Generate API Key](https://docs.kalshi.com/api-reference/api-keys/generate-api-key.md)). A key created without `scopes` gets `read` and `write`, which is full access. Accounts with data-only access are the exception: their keys are always read-only, whatever `scopes` the request names. Scopes never widen what the account itself is allowed to do.

A parent scope grants its child scopes: `write` covers `write::trade`, `write::transfer`, `write::fcm_risk` and `write::block_trade_accept`, and `read` covers `read::portfolio_balance` and `read::block_trade_accept`. A child scope never grants its parent, and no `write` scope grants `read`.

| REST endpoints | Scope required |
| - | - |
| Every authenticated `GET`, except the two below | `read` |
| `GET /portfolio/balance` | `read::portfolio_balance` |
| `GET /communications/block-trade-proposals` | `read::block_trade_accept` |
| Order create, amend, decrease and cancel, single and batched (`/portfolio/events/orders...`) | `write::trade` |
| Order group create, delete, reset, trigger and limit (`/portfolio/order_groups/...`) | `write::trade` |
| Position exit trigger set and delete (`/portfolio/positions/{ticker}/exit_trigger`) | `write::trade` |
| RFQ, quote and RFQ batch writes (`/communications/rfqs...`, `/communications/quotes...`, `/communications/rfq_batches...`) | `write::trade` |
| Combo market creation (`POST /multivariate_event_collections/{collection_ticker}`) and `POST /weather_point_markets` | `write::trade` |
| Block trade proposal create and cancel | `write::trade` |
| Perps order, order group and exit trigger writes (`/margin/orders...`, `/margin/order_groups/...`, `/margin/.../exit_trigger`) | `write::trade` |
| FCM position transfers (`POST /fcm/positions/transfers`, `POST /margin/fcm/positions/transfers`) | `write::trade` |
| FCM subtrader creation and risk settings: `POST /fcm/subtraders`, `POST /margin/fcm/subtraders`, and `PUT` or `DELETE` on `/fcm/subtraders/event_contract_daily_cap`, `/fcm/subtraders/blocked_categories` (`PUT` only), `/margin/fcm/subtraders/risk_controls` and `/margin/fcm/notional_risk_limit` | `write::fcm_risk` |
| Block trade proposal accept and reject | `write::block_trade_accept` |
| `POST /portfolio/intra_exchange_instance_transfer`, `POST /portfolio/subaccounts/transfer`, `POST /portfolio/target_balance_allocation`, `POST /portfolio/margin/subaccounts/transfer` | `write::transfer` |
| API key create and delete, `POST /portfolio/subaccounts`, `PUT /portfolio/subaccounts/netting`, `POST /account/api_usage_level/upgrade` | `write` |

The table covers the operations listed, not every endpoint. A write that is not listed needs either `write` or one of the child scopes above. A request the key's scopes do not cover returns `403`, and the error `code` names the scope that endpoint needs, for example `insufficient_scope:_write::trade_required`, so you can read the exact requirement from the response.

Because every `GET` needs `read`, a key that holds only `write::trade` can place and cancel orders but cannot list orders, fills or positions. Give a trading key `read` as well, or track state from the write responses.

Public endpoints such as market data need no scope.

## Authentication errors

A request whose credentials are rejected returns `401` with an error object. Problems with the headers themselves have their own `code`:

| `code` | Cause |
| - | - |
| `signature_is_missing_from_headers` | `KALSHI-ACCESS-KEY` was sent without `KALSHI-ACCESS-SIGNATURE`. |
| `timestamp_is_missing_from_headers` | `KALSHI-ACCESS-TIMESTAMP` was not sent. |
| `header_timestamp_is_invalid` | The timestamp is not an integer. |
| `header_timestamp_expired` | The timestamp is more than 30 seconds from Kalshi's clock. |

Every other rejection returns `401` with the code `authentication_error`, and the `details` field carries the reason:

| `details` | Cause |
| - | - |
| `INVALID_PARAMETER` | `KALSHI-ACCESS-KEY` is not a valid key ID. |
| `NOT_FOUND` | No key has this ID. It may have been deleted, or it belongs to the other environment (demo and production keys are separate). |
| `INCORRECT_API_KEY_SIGNATURE` | The signature does not match. Check the signed string (timestamp, then method, then the full path from `/trade-api/v2`, without the query string), the signing algorithm for your key type, and that the private key belongs to this key ID. |
| `PERMISSION_DENIED` | Access was refused for this client. If the key or account is restricted to an IP allowlist, requests from any other address are refused this way. |

```json theme={null}
{
  "error": {
    "code": "authentication_error",
    "message": "We could not authenticate your request",
    "details": "INCORRECT_API_KEY_SIGNATURE"
  }
}
```

The `message` text is generic and is the same for every `authentication_error`, so branch on `details`. Other `details` values are possible.

Check the HTTP status before deciding whether to retry. A `401` means the credentials were rejected, and sending the same request again will not help. The same `authentication_error` code is also returned with a `500` or `503` status when Kalshi could not complete the check, for example during a brief outage. Those are not credential problems: keep your key and retry with backoff.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.