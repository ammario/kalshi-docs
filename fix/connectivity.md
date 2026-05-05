---
url: https://docs.kalshi.com/fix/connectivity
lastmod: 2026-05-04T19:23:16.030Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Connectivity

> Endpoints, transport configuration, and rate limits for the Kalshi FIX API

## Endpoints

<Tabs>
  <Tab title="Production">
    **Host:** `mm.fix.elections.kalshi.com`

    | Purpose                              | Port | TargetCompID | Description                                                                                                                                                                                                                                          |
    | ------------------------------------ | ---- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | Order Entry (without retransmission) | 8228 | KalshiNR     | Submit, modify, and cancel orders; no message persistence or retransmission. Supports [Listener Sessions](/fix/listener-sessions) for read-only streaming                                                                                            |
    | Order Entry (with retransmission)    | 8230 | KalshiRT     | Order entry with message retransmission, RFQ creation, and optional settlement reports. Supports [Listener Sessions](/fix/listener-sessions) for read-only streaming. Contact [institutional@kalshi.com](mailto:institutional@kalshi.com) for access |
    | Drop Copy                            | 8229 | KalshiDC     | Request-response queries for historical execution reports                                                                                                                                                                                            |
    | Post Trade                           | 8231 | KalshiPT     | Read-only stream for market settlement reports and position resolution. Contact [institutional@kalshi.com](mailto:institutional@kalshi.com) for access                                                                                               |
    | RFQ                                  | 8232 | KalshiRFQ    | Market maker session for receiving RFQ broadcasts, submitting quotes, and managing quote lifecycle                                                                                                                                                   |
  </Tab>

  <Tab title="Demo">
    **Host:** `fix.demo.kalshi.co`

    | Purpose                              | Port | TargetCompID | Description                                                                                                                                                                                                                                          |
    | ------------------------------------ | ---- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | Order Entry (without retransmission) | 8228 | KalshiNR     | Submit, modify, and cancel orders; no message persistence or retransmission. Supports [Listener Sessions](/fix/listener-sessions) for read-only streaming                                                                                            |
    | Order Entry (with retransmission)    | 8230 | KalshiRT     | Order entry with message retransmission, RFQ creation, and optional settlement reports. Supports [Listener Sessions](/fix/listener-sessions) for read-only streaming. Contact [institutional@kalshi.com](mailto:institutional@kalshi.com) for access |
    | Drop Copy                            | 8229 | KalshiDC     | Request-response queries for historical execution reports                                                                                                                                                                                            |
    | Post Trade                           | 8231 | KalshiPT     | Read-only stream for market settlement reports and position resolution. Contact [institutional@kalshi.com](mailto:institutional@kalshi.com) for access                                                                                               |
    | RFQ                                  | 8232 | KalshiRFQ    | Market maker session for receiving RFQ broadcasts, submitting quotes, and managing quote lifecycle                                                                                                                                                   |
  </Tab>
</Tabs>

## Session Configuration

All connections use **FIXT.1.1** with application version **FIX50SP2**.

| Parameter    | Value                          |
| ------------ | ------------------------------ |
| SenderCompID | Your FIX API Key (UUID format) |
| TargetCompID | See endpoints table above      |
| Session ID   | `TargetCompID + SenderCompID`  |

Only one FIX connection is allowed per API key. Separate API keys are required for concurrent connections.

## SSL/TLS

You must use TLS 1.2 or higher (not plain TCP) to connect to the FIX gateway. Cipher suites follow [AWS Network Load Balancer TLS policies](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/create-tls-listener.html#describe-ssl-policies). If your FIX implementation does not support native TLS connections, use a local proxy such as [stunnel](https://www.stunnel.org/).

To obtain the server certificate for pinning on the initiator side:

```bash theme={null}
openssl s_client -showcerts -connect <host>:<port> < /dev/null | openssl x509 > kalshi-fix.pem
```

For example, to pin against the demo order entry endpoint:

```bash theme={null}
openssl s_client -showcerts -connect fix.demo.kalshi.co:8228 < /dev/null | openssl x509 > kalshi-fix.pem
```

## Private Connectivity

For participants requiring network-level isolation, Kalshi supports private connectivity via [AWS PrivateLink](https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html). With PrivateLink, FIX traffic is routed entirely within the AWS backbone and never traverses the public internet.

Contact [institutional@kalshi.com](mailto:institutional@kalshi.com) to provision a PrivateLink endpoint for your AWS account.

## Rate Limits

* **Limit**: Your account-level rate limits are applicable
* **Scope**: Application messages only (from client to server)
* **Excluded**: Logout (35=5), Heartbeat (35=0), TestRequest (35=1)
* Logon (35=A) **is** rate-limited.

## Maintenance Window

See [Maintenance and Pauses](/getting_started/maintenance_and_pauses) for scheduled maintenance times and the difference between trading pauses and exchange pauses.

Sessions may be disconnected during the maintenance window. Kalshi does not initiate sequence number resets during maintenance; clients should reset sequence numbers on their side when reconnecting.

KalshiRT sessions retain message continuity across the maintenance window. If your KalshiRT session is disconnected, you can request retransmission of any messages missed during the downtime after reconnecting.

### CancelOrderOnPause

To control what happens to your resting orders during a [pause](/getting_started/maintenance_and_pauses), set tag `21006` (CancelOrderOnPause) on your **New Order Single (35=D)** messages:

| Value       | Behavior                                                                 |
| ----------- | ------------------------------------------------------------------------ |
| Y           | Order is automatically cancelled when a trading or exchange pause begins |
| N (default) | Order remains resting on the book and resumes when activity reopens      |
