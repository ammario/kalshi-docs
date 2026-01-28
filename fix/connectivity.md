---
url: https://docs.kalshi.com/fix/connectivity
lastmod: 2026-01-27T23:10:49.941Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Connectivity

> Connection setup and endpoints for Kalshi FIX API

# FIX API Connectivity

## Endpoints

Before logging onto a FIX session, clients must establish a secure connection to the FIX gateway.

<Tabs>
  <Tab title="Production">
    **Host:** `fix.elections.kalshi.com`

    | Purpose                              | Port | TargetCompID |
    | ------------------------------------ | ---- | ------------ |
    | Order Entry (without retransmission) | 8228 | KalshiNR     |
    | Order Entry (with retransmission)    | 8230 | KalshiRT     |
    | Drop Copy                            | 8229 | KalshiDC     |
    | Post Trade                           | 8231 | KalshiPT     |
    | RFQ                                  | 8232 | KalshiRFQ    |
  </Tab>

  <Tab title="Demo">
    **Host:** `fix.demo.kalshi.co`

    | Purpose                              | Port | TargetCompID |
    | ------------------------------------ | ---- | ------------ |
    | Order Entry (without retransmission) | 8228 | KalshiNR     |
    | Order Entry (with retransmission)    | 8230 | KalshiRT     |
    | Drop Copy                            | 8229 | KalshiDC     |
    | Post Trade                           | 8231 | KalshiPT     |
    | RFQ                                  | 8232 | KalshiRFQ    |
  </Tab>
</Tabs>

<Warning>
  Sessions are potentially dropped during trading closed hours for maintenance. For now, this is on Thursdays from 3 AM to 5 AM ET. All users are required to restart their sessions during this time and reset sequence numbers to 0.
</Warning>

## Rate Limits

### Order Entry Session

* **Limit**: Your account-level rate limits are applicable
* **Scope**: Application messages only (from client to server)
* **Excluded**: Session layer messages

<Info>
  Session layer messages excluded from rate limits:

  * Logon (35=A)
  * Logout (35=5)
  * Heartbeat (35=0)
  * TestRequest (35=1)
</Info>

## TCP SSL Configuration

### SSL/TLS Requirements

**You must use TLS/SSL (not plain TCP) to connect to the FIX gateway.** Plain TCP connections will fail because the gateway requires a TLS handshake.

If your FIX implementation does not support native TLS connections, set up a local proxy such as stunnel to establish a secure connection.

<Note>
  Kalshi will provide the certificate for pinning on the initiator side when providing your API key.
</Note>

## Message Retransmission

### Supported Endpoints

Message retransmission is currently only supported on:

* Order Entry with retransmission (KalshiRT)
* RFQ session (KalshiRFQ)

### Unsupported Message Types

For endpoints without retransmission support:

* ResendRequest (35=2) - Not supported
* SequenceReset (35=4) - Not supported

<Warning>
  For sessions without retransmission support, `ResetSeqNumFlag&lt;141&gt;` in the Logon message must always be `true` or the Logon will be rejected.
</Warning>

### Alternative Recovery

The drop copy session endpoint provides an alternative way for clients to query for missed execution reports without using the retransmission protocol.

## Session Configuration

### Required Settings

* **Session Profile**: FIXT.1.1 (required for Application Version Independence)
* **Application Version**: FIX50SP2 (FIX 5.0 SP2)
* **SenderCompID**: Your FIX API Key (UUID format)
* **TargetCompID**: See endpoints table above

### Session Identification

* Session identification uses: `SessionID = TargetCompID + SenderCompID`
* Only one FIX connection is allowed per FIX API Key

<Note>
  Each API key can only be used for a single connection at a time. If you need to establish multiple concurrent connections (e.g., for both order entry and drop copy), you must create separate API keys for each connection.
</Note>

## Best Practices

1. **Connection Management**
   * Implement automatic reconnection logic for the daily maintenance window
   * Monitor heartbeat intervals (default 30 seconds)
   * Handle connection drops gracefully

2. **Sequence Number Management**
   * Reset sequence numbers to 0 after daily maintenance
   * For non-retransmission endpoints, always use `ResetSeqNumFlag=Y`

3. **Security**
   * Store private keys securely
   * Never share private keys, even with Kalshi employees
   * Use certificate pinning when provided

## Troubleshooting

### Common Connection Issues

<AccordionGroup>
  <Accordion title="SSL/TLS Connection Failed">
    * **Verify you are using TLS, not plain TCP** - this is the most common issue
    * Check your FIX library settings to ensure TLS/SSL mode is enabled
    * Verify certificate configuration
    * Check if stunnel or similar proxy is needed if your library doesn't support native TLS
  </Accordion>

  <Accordion title="Logon Rejected">
    * Verify SenderCompID matches your FIX API key
    * Check TargetCompID matches the port number
    * Ensure ResetSeqNumFlag is set correctly for non-retransmission endpoints
    * Verify signature generation uses the exact SendingTime from field 52
  </Accordion>
</AccordionGroup>
