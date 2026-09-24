---
url: https://docs.kalshi.com/getting_started/api_keys
lastmod: 2026-09-23T21:55:39.786Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# API Keys

> API Key usage

<Info>
  This process is the same for the demo or production environment.
</Info>

## Key types

Kalshi API keys are asymmetric key pairs: you sign each request with the
private key, and Kalshi verifies the signature with the registered public key.
Two key types are supported:

| Key type                  | Signature                                   | Private key PEM Kalshi generates           | When to use                                                                       |
| ------------------------- | ------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------- |
| **Ed25519** (recommended) | Ed25519 (RFC 8032) over the pre-sign text   | `-----BEGIN PRIVATE KEY-----` (PKCS#8)     | Clients that support Ed25519. Lower signing cost than RSA-PSS; 64-byte signatures |
| **RSA** (2048-bit)        | RSA-PSS with SHA-256 over the pre-sign text | `-----BEGIN RSA PRIVATE KEY-----` (PKCS#1) | Clients limited to RSA-PSS, including the current official SDKs                   |

Headers, pre-sign text, permissions and errors are identical for both types.
Kalshi selects the verification algorithm from the registered public key;
sign with the algorithm that matches your key.

The PEM header does not identify the key type: PKCS#8 RSA keys, including
`openssl genpkey` output, also begin with `-----BEGIN PRIVATE KEY-----`.
Determine the type from the parsed key, as the samples below do.

## Generating an API Key

### Access the Account Settings Page:

Log in to your account and navigate to the "Account Settings" page. You can typically find this option by clicking on your profile picture or account icon in the top-right corner of the application.

### Generate a New API Key

In the "Profile Settings" page [https://kalshi.com/account/profile](https://kalshi.com/account/profile), locate the "API Keys" section. Click on the "Create New API Key" button to generate an RSA key pair. For an Ed25519 key, register your own public key (below) or use `POST /trade-api/v2/api_keys/generate` with `key_type: ed25519`.

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

Keys can also be created through the API: `POST /trade-api/v2/api_keys` registers your public key; `POST /trade-api/v2/api_keys/generate` returns a new key pair of the requested `key_type` (`rsa` when omitted).

## Using a API Key

Each request to Kalshi trading api will need to be signed with the private key generated above.

The following header values will need to be provided with each request:

`KALSHI-ACCESS-KEY`- the Key ID

`KALSHI-ACCESS-TIMESTAMP` - the request timestamp in ms

`KALSHI-ACCESS-SIGNATURE`- request hash signed with private key

The signature is the base64 encoding of the signed concatenation of the timestamp, the HTTP method and the path. Ed25519 keys sign the string directly; RSA keys use RSA-PSS with SHA-256 (MGF1 with SHA-256, salt length equal to the digest length).

<Warning>
  **Important**: When signing requests, use the path **without query parameters**. For example, if your request is to `/trade-api/v2/portfolio/orders?limit=5`, sign only `/trade-api/v2/portfolio/orders` (strip the `?` and everything after it).
</Warning>

The samples below detect the key type and sign accordingly. For end-to-end examples, see [Quick Start: Authenticated Requests](/getting_started/quick_start_authenticated_requests). The official SDKs currently support RSA keys only.

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
