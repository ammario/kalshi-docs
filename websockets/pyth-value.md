---
url: https://docs.kalshi.com/websockets/pyth-value
lastmod: 2026-10-20T16:22:11.196Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Pyth Value Feed

> Real-time Pyth price and Treasury yield updates for configured underlying tickers. Requires authentication.

## Access and pricing

The Pyth data feed costs **$1,000/month**, with the **first seven days free**. [Subscribe to the Pyth data feed](https://buy.stripe.com/eVqaEXfmu9eN2ZB8gr4ZG0a).

Connect using an authenticated Kalshi WebSocket session. See [Quick Start: WebSockets](/getting_started/quick_start_websockets#authentication) for API key authentication and request signing.

## Underlying tickers

The reference table below lists supported underlyings: spot metals, metal and commodity indices, an equity index, FX pairs, and Treasury yields. Index descriptions note Pyth's publishing schedule (24/7, 24/5, or 23/5); spot metals, FX pairs, and Treasury yields follow their market sessions.

| Pyth feed ID | Pyth symbol                     | Description                                             |
|--------------|---------------------------------|---------------------------------------------------------|
| 345          | `Metal.XAG/USD`                 | Silver price in USD                                     |
| 346          | `Metal.XAU/USD`                 | Gold price in USD                                       |
| 1780         | `Metal.XPD/USD`                 | Palladium price in USD                                  |
| 1781         | `Metal.XPT/USD`                 | Platinum price in USD                                   |
| 3153         | `Metal.Index.GOLD/USD`          | Blended Gold Index in USD (24/7)                        |
| 3712         | `Metal.Index.1OZGOLD/USD`       | 1-Ounce Gold Index in USD (24/7)                        |
| 3154         | `Metal.Index.SILVER/USD`        | Blended Silver Index in USD (24/7)                      |
| 3063         | `Commodities.Index.PYTHOIL/USD` | Blended Oil Index in USD (24/7)                         |
| 3707         | `Commodities.Index.WTI1M/USD`   | Constant 1-Month WTI Crude Index in USD (23/5)          |
| 3446         | `Commodities.Index.BRENT/USD`   | Blended Brent Crude Index in USD (24/7)                 |
| 3265         | `Commodities.Index.NATGAS/USD`  | Natural Gas Index in USD (24/7)                         |
| 3525         | `Commodities.Index.CU/USD`      | Copper Index in USD (24/7)                              |
| 3266         | `Commodities.Index.COPPER/USD`  | Copper Index in USD (23/5)                              |
| 3292         | `Equity.Index.US30/USD`         | US30 (Dow Jones Industrial Average) Index in USD (24/5) |
| 1530         | `InterestRate.US2Y`             | US 2-year Treasury yield in percent                     |
| 1534         | `InterestRate.US5Y`             | US 5-year Treasury yield in percent                     |
| 1527         | `InterestRate.US10Y`            | US 10-year Treasury yield in percent                    |
| 1531         | `InterestRate.US30Y`            | US 30-year Treasury yield in percent                    |
| 327          | `FX.EUR/USD`                    | Euro / US Dollar                                        |
| 333          | `FX.GBP/USD`                    | British Pound / US Dollar                               |
| 315          | `FX.AUD/USD`                    | Australian Dollar / US Dollar                           |
| 337          | `FX.NZD/USD`                    | New Zealand Dollar / US Dollar                          |
| 340          | `FX.USD/JPY`                    | US Dollar / Japanese Yen                                |
| 338          | `FX.USD/CAD`                    | US Dollar / Canadian Dollar                             |
| 339          | `FX.USD/CHF`                    | US Dollar / Swiss Franc                                 |
| 1514         | `FX.USD/NOK`                    | US Dollar / Norwegian Krone                             |
| 1517         | `FX.USD/SEK`                    | US Dollar / Swedish Krona                               |
| 341          | `FX.USD/MXN`                    | US Dollar / Mexican Peso                                |
| 1512         | `FX.USD/INR`                    | US Dollar / Indian Rupee (offshore spot)                |
| 1506         | `FX.USD/BRL`                    | US Dollar / Brazilian Real                              |

Pass the exact **Pyth symbol** in `underlying_tickers`. The numeric Pyth feed IDs are reference information and are not subscription parameters for this channel. Kalshi market tickers are not Pyth underlying tickers.

Use `underlying_list` to discover recently streamed tickers on your connection. Availability can change, including as futures contracts expire; the table does not guarantee that every feed is streaming in every environment.

Treasury yields use the exact symbols above, without a `/USD` suffix. They are included in `["all"]` subscriptions and can also be requested individually, for example with `underlying_tickers: ["InterestRate.US2Y"]`. These are the yield feeds behind the `KX{2,5,10,30}YRRATE15M` and `KX{2,5,10,30}YRRATEH` markets; `/USD` symbols identify separate bond-price feeds.

## Requirements

- Authentication required
- Seed `underlying_tickers` in the initial subscribe, or add them later
- Use `underlying_tickers: ["all"]` to receive every available underlying
- Supports `update_subscription` with `subscribe_underlyings`, `unsubscribe_underlyings`, and `underlying_list` actions
- Duplicate and out-of-order source timestamps are ignored independently per underlying ticker

## Subscription workflow

Subscribe to `pyth_value` with the underlying tickers you want to receive. For example, request gold, oil, and natural gas prices:

```json
{
  "id": 1,
  "cmd": "subscribe",
  "params": {
    "channels": ["pyth_value"],
    "underlying_tickers": [
      "Metal.XAU/USD",
      "Commodities.Index.PYTHOIL/USD",
      "Commodities.Index.NATGAS/USD"
    ]
  }
}
```

A successful subscribe returns a `subscribed` response with the assigned `sid`. Use that subscription ID in subsequent commands; replace `sid: 1` in the examples below with the returned ID.

You can also omit `underlying_tickers` to create an empty subscription, discover tickers, and add them later. An empty subscription sends no price updates until you add tickers or switch to `["all"]`.

### Discover recently streamed tickers

```json
{
  "id": 2,
  "cmd": "update_subscription",
  "params": {
    "sid": 1,
    "action": "underlying_list"
  }
}
```

Read `msg.underlying_tickers` in the `pyth_value_underlying_list` response. This lists tickers observed on the stream within the last two hours without changing your subscription. It is not a complete catalog: inactive feeds can be absent. A successful subscribe response alone does not confirm that a requested ticker is streaming.

### Add or remove tickers

Add platinum to the existing subscription:

```json
{
  "id": 3,
  "cmd": "update_subscription",
  "params": {
    "sid": 1,
    "action": "subscribe_underlyings",
    "underlying_tickers": ["Metal.XPT/USD"]
  }
}
```

Remove platinum from the subscription:

```json
{
  "id": 4,
  "cmd": "update_subscription",
  "params": {
    "sid": 1,
    "action": "unsubscribe_underlyings",
    "underlying_tickers": ["Metal.XPT/USD"]
  }
}
```

### Receive all available underlyings

Set `underlying_tickers` to `["all"]` in the initial subscribe, or enable it on an existing subscription:

```json
{
  "id": 5,
  "cmd": "update_subscription",
  "params": {
    "sid": 1,
    "action": "subscribe_underlyings",
    "underlying_tickers": ["all"]
  }
}
```

While all-mode is enabled, removing an individual ticker does not exclude it. Send `unsubscribe_underlyings` with `["all"]` to disable all-mode; any explicitly subscribed tickers remain selected.

## Integration notes

- `sid` identifies the subscription stream; use it for `update_subscription` and `unsubscribe`.
- Missing or empty `underlying_tickers` for `subscribe_underlyings` or `unsubscribe_underlyings` returns an `error` with `code: 28` ("Underlying tickers required").
- `value_usd` is formatted to eight decimal places. The field name is retained for compatibility: for Treasury yield symbols it contains the yield in percent, so `"4.25000000"` means **4.25%**, not a dollar price or a decimal fraction. Other symbols retain their quoted price units.
- `source_ts_ms` is the source timestamp in Unix milliseconds; `received_at` is when Kalshi received the update, also in Unix milliseconds.




## AsyncAPI

````yaml asyncapi.yaml pyth_value
id: pyth_value
title: Pyth Value Feed
description: >
  Real-time Pyth price and Treasury yield updates for configured underlying
  tickers. Requires authentication.


  ## Access and pricing


  The Pyth data feed costs **$1,000/month**, with the **first seven days free**.
  [Subscribe to the Pyth data
  feed](https://buy.stripe.com/eVqaEXfmu9eN2ZB8gr4ZG0a).


  Connect using an authenticated Kalshi WebSocket session. See [Quick Start:
  WebSockets](/getting_started/quick_start_websockets#authentication) for API
  key authentication and request signing.


  ## Underlying tickers


  The reference table below lists supported underlyings: spot metals, metal and
  commodity indices, an equity index, FX pairs, and Treasury yields. Index
  descriptions note Pyth's publishing schedule (24/7, 24/5, or 23/5); spot
  metals, FX pairs, and Treasury yields follow their market sessions.


  | Pyth feed ID | Pyth symbol                     |
  Description                                             |

  |--------------|---------------------------------|---------------------------------------------------------|

  | 345          | `Metal.XAG/USD`                 | Silver price in
  USD                                     |

  | 346          | `Metal.XAU/USD`                 | Gold price in
  USD                                       |

  | 1780         | `Metal.XPD/USD`                 | Palladium price in
  USD                                  |

  | 1781         | `Metal.XPT/USD`                 | Platinum price in
  USD                                   |

  | 3153         | `Metal.Index.GOLD/USD`          | Blended Gold Index in USD
  (24/7)                        |

  | 3712         | `Metal.Index.1OZGOLD/USD`       | 1-Ounce Gold Index in USD
  (24/7)                        |

  | 3154         | `Metal.Index.SILVER/USD`        | Blended Silver Index in USD
  (24/7)                      |

  | 3063         | `Commodities.Index.PYTHOIL/USD` | Blended Oil Index in USD
  (24/7)                         |

  | 3707         | `Commodities.Index.WTI1M/USD`   | Constant 1-Month WTI Crude
  Index in USD (23/5)          |

  | 3446         | `Commodities.Index.BRENT/USD`   | Blended Brent Crude Index
  in USD (24/7)                 |

  | 3265         | `Commodities.Index.NATGAS/USD`  | Natural Gas Index in USD
  (24/7)                         |

  | 3525         | `Commodities.Index.CU/USD`      | Copper Index in USD
  (24/7)                              |

  | 3266         | `Commodities.Index.COPPER/USD`  | Copper Index in USD
  (23/5)                              |

  | 3292         | `Equity.Index.US30/USD`         | US30 (Dow Jones Industrial
  Average) Index in USD (24/5) |

  | 1530         | `InterestRate.US2Y`             | US 2-year Treasury yield in
  percent                     |

  | 1534         | `InterestRate.US5Y`             | US 5-year Treasury yield in
  percent                     |

  | 1527         | `InterestRate.US10Y`            | US 10-year Treasury yield
  in percent                    |

  | 1531         | `InterestRate.US30Y`            | US 30-year Treasury yield
  in percent                    |

  | 327          | `FX.EUR/USD`                    | Euro / US
  Dollar                                        |

  | 333          | `FX.GBP/USD`                    | British Pound / US
  Dollar                               |

  | 315          | `FX.AUD/USD`                    | Australian Dollar / US
  Dollar                           |

  | 337          | `FX.NZD/USD`                    | New Zealand Dollar / US
  Dollar                          |

  | 340          | `FX.USD/JPY`                    | US Dollar / Japanese
  Yen                                |

  | 338          | `FX.USD/CAD`                    | US Dollar / Canadian
  Dollar                             |

  | 339          | `FX.USD/CHF`                    | US Dollar / Swiss
  Franc                                 |

  | 1514         | `FX.USD/NOK`                    | US Dollar / Norwegian
  Krone                             |

  | 1517         | `FX.USD/SEK`                    | US Dollar / Swedish
  Krona                               |

  | 341          | `FX.USD/MXN`                    | US Dollar / Mexican
  Peso                                |

  | 1512         | `FX.USD/INR`                    | US Dollar / Indian Rupee
  (offshore spot)                |

  | 1506         | `FX.USD/BRL`                    | US Dollar / Brazilian
  Real                              |


  Pass the exact **Pyth symbol** in `underlying_tickers`. The numeric Pyth feed
  IDs are reference information and are not subscription parameters for this
  channel. Kalshi market tickers are not Pyth underlying tickers.


  Use `underlying_list` to discover recently streamed tickers on your
  connection. Availability can change, including as futures contracts expire;
  the table does not guarantee that every feed is streaming in every
  environment.


  Treasury yields use the exact symbols above, without a `/USD` suffix. They are
  included in `["all"]` subscriptions and can also be requested individually,
  for example with `underlying_tickers: ["InterestRate.US2Y"]`. These are the
  yield feeds behind the `KX{2,5,10,30}YRRATE15M` and `KX{2,5,10,30}YRRATEH`
  markets; `/USD` symbols identify separate bond-price feeds.


  ## Requirements


  - Authentication required

  - Seed `underlying_tickers` in the initial subscribe, or add them later

  - Use `underlying_tickers: ["all"]` to receive every available underlying

  - Supports `update_subscription` with `subscribe_underlyings`,
  `unsubscribe_underlyings`, and `underlying_list` actions

  - Duplicate and out-of-order source timestamps are ignored independently per
  underlying ticker


  ## Subscription workflow


  Subscribe to `pyth_value` with the underlying tickers you want to receive. For
  example, request gold, oil, and natural gas prices:


  ```json

  {
    "id": 1,
    "cmd": "subscribe",
    "params": {
      "channels": ["pyth_value"],
      "underlying_tickers": [
        "Metal.XAU/USD",
        "Commodities.Index.PYTHOIL/USD",
        "Commodities.Index.NATGAS/USD"
      ]
    }
  }

  ```


  A successful subscribe returns a `subscribed` response with the assigned
  `sid`. Use that subscription ID in subsequent commands; replace `sid: 1` in
  the examples below with the returned ID.


  You can also omit `underlying_tickers` to create an empty subscription,
  discover tickers, and add them later. An empty subscription sends no price
  updates until you add tickers or switch to `["all"]`.


  ### Discover recently streamed tickers


  ```json

  {
    "id": 2,
    "cmd": "update_subscription",
    "params": {
      "sid": 1,
      "action": "underlying_list"
    }
  }

  ```


  Read `msg.underlying_tickers` in the `pyth_value_underlying_list` response.
  This lists tickers observed on the stream within the last two hours without
  changing your subscription. It is not a complete catalog: inactive feeds can
  be absent. A successful subscribe response alone does not confirm that a
  requested ticker is streaming.


  ### Add or remove tickers


  Add platinum to the existing subscription:


  ```json

  {
    "id": 3,
    "cmd": "update_subscription",
    "params": {
      "sid": 1,
      "action": "subscribe_underlyings",
      "underlying_tickers": ["Metal.XPT/USD"]
    }
  }

  ```


  Remove platinum from the subscription:


  ```json

  {
    "id": 4,
    "cmd": "update_subscription",
    "params": {
      "sid": 1,
      "action": "unsubscribe_underlyings",
      "underlying_tickers": ["Metal.XPT/USD"]
    }
  }

  ```


  ### Receive all available underlyings


  Set `underlying_tickers` to `["all"]` in the initial subscribe, or enable it
  on an existing subscription:


  ```json

  {
    "id": 5,
    "cmd": "update_subscription",
    "params": {
      "sid": 1,
      "action": "subscribe_underlyings",
      "underlying_tickers": ["all"]
    }
  }

  ```


  While all-mode is enabled, removing an individual ticker does not exclude it.
  Send `unsubscribe_underlyings` with `["all"]` to disable all-mode; any
  explicitly subscribed tickers remain selected.


  ## Integration notes


  - `sid` identifies the subscription stream; use it for `update_subscription`
  and `unsubscribe`.

  - Missing or empty `underlying_tickers` for `subscribe_underlyings` or
  `unsubscribe_underlyings` returns an `error` with `code: 28` ("Underlying
  tickers required").

  - `value_usd` is formatted to eight decimal places. The field name is retained
  for compatibility: for Treasury yield symbols it contains the yield in
  percent, so `"4.25000000"` means **4.25%**, not a dollar price or a decimal
  fraction. Other symbols retain their quoted price units.

  - `source_ts_ms` is the source timestamp in Unix milliseconds; `received_at`
  is when Kalshi received the update, also in Unix milliseconds.
servers:
  - id: production
    protocol: wss
    host: external-api-ws.kalshi.com
    bindings: []
    variables: []
address: pyth_value
parameters: []
bindings: []
operations:
  - &ref_4
    id: receivePythValue
    title: Pyth Value Update
    description: Receive deduplicated real-time Pyth prices
    type: send
    messages:
      - &ref_6
        id: pythValue
        contentType: application/json
        payload:
          - name: Pyth Value Update
            description: >-
              Deduplicated real-time Pyth price or Treasury yield for an
              underlying ticker
            type: object
            properties:
              - name: type
                type: string
                description: pyth_value
                required: true
              - name: sid
                type: integer
                description: >-
                  Server-generated subscription identifier (sid) used to
                  identify the channel
                required: true
              - name: seq
                type: integer
                description: >-
                  Sequential number that should be checked if you want to
                  guarantee you received all the messages. Used for
                  snapshot/delta consistency
                required: true
              - name: msg
                type: object
                required: true
                properties:
                  - name: underlying_ticker
                    type: string
                    description: Qualified Pyth underlying ticker
                    required: true
                  - name: value_usd
                    type: string
                    description: >-
                      Value formatted to 8 decimal places in the underlying's
                      quoted units. For Treasury yields (InterestRate.US2Y,
                      InterestRate.US5Y, InterestRate.US10Y,
                      InterestRate.US30Y), this is percent: "4.25000000" means
                      4.25%. The field name is retained for compatibility.
                    required: true
                  - name: source_ts_ms
                    type: integer
                    description: Pyth source timestamp (unix ms)
                    required: true
                  - name: received_at
                    type: integer
                    description: When Kalshi received the Pyth update (unix ms)
                    required: true
              - name: sending_ts_ms
                type: integer
                description: >-
                  Unix timestamp in milliseconds when Kalshi queued this message
                  at the network layer.
                required: false
        headers: []
        jsonPayloadSchema:
          type: object
          required:
            - type
            - sid
            - seq
            - msg
          properties:
            type:
              type: string
              const: pyth_value
              x-parser-schema-id: <anonymous-schema-438>
            sid: &ref_0
              type: integer
              description: >-
                Server-generated subscription identifier (sid) used to identify
                the channel
              minimum: 1
              x-parser-schema-id: subscriptionId
            seq: &ref_1
              type: integer
              description: >-
                Sequential number that should be checked if you want to
                guarantee you received all the messages. Used for snapshot/delta
                consistency
              minimum: 1
              x-parser-schema-id: sequenceNumber
            msg:
              type: object
              required:
                - underlying_ticker
                - value_usd
                - source_ts_ms
                - received_at
              properties:
                underlying_ticker:
                  type: string
                  description: Qualified Pyth underlying ticker
                  x-parser-schema-id: <anonymous-schema-440>
                value_usd:
                  type: string
                  description: >-
                    Value formatted to 8 decimal places in the underlying's
                    quoted units. For Treasury yields (InterestRate.US2Y,
                    InterestRate.US5Y, InterestRate.US10Y, InterestRate.US30Y),
                    this is percent: "4.25000000" means 4.25%. The field name is
                    retained for compatibility.
                  x-parser-schema-id: <anonymous-schema-441>
                source_ts_ms:
                  type: integer
                  description: Pyth source timestamp (unix ms)
                  x-parser-schema-id: <anonymous-schema-442>
                received_at:
                  type: integer
                  description: When Kalshi received the Pyth update (unix ms)
                  x-parser-schema-id: <anonymous-schema-443>
              x-parser-schema-id: <anonymous-schema-439>
            sending_ts_ms: &ref_2
              type: integer
              format: int64
              description: >-
                Unix timestamp in milliseconds when Kalshi queued this message
                at the network layer.
              x-parser-schema-id: sendingTimestampMs
          x-parser-schema-id: pythValuePayload
        title: Pyth Value Update
        description: >-
          Deduplicated real-time Pyth price or Treasury yield for an underlying
          ticker
        example: |-
          {
            "type": "pyth_value",
            "sending_ts_ms": 1669149841234,
            "sid": 1,
            "seq": 42,
            "msg": {
              "underlying_ticker": "Commodities.Index.PYTHOIL/USD",
              "value_usd": "82.12345000",
              "source_ts_ms": 1710000000100,
              "received_at": 1710000000123
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: pythValue
    bindings: []
    extensions: &ref_3
      - id: x-parser-unique-object-id
        value: pyth_value
  - &ref_5
    id: receivePythUnderlyingList
    title: Pyth Underlying List
    description: Receive recently streamed Pyth underlying tickers
    type: send
    messages:
      - &ref_7
        id: pythUnderlyingList
        contentType: application/json
        payload:
          - name: Pyth Underlying List
            description: Recently streamed Pyth underlying tickers
            type: object
            properties:
              - name: type
                type: string
                description: pyth_value_underlying_list
                required: true
              - name: id
                type: integer
                description: >
                  Unique ID of the command request. Generated by the client and
                  should be unique within a WS session.

                  The simplest way to use it would be to start from 1 and then
                  increment the value for every new command sent to the server.

                  If the id is set to 0, the server treats it the same way as if
                  there was no id.
                required: false
              - name: sid
                type: integer
                description: >-
                  Server-generated subscription identifier (sid) used to
                  identify the channel
                required: true
              - name: seq
                type: integer
                description: >-
                  Sequential number that should be checked if you want to
                  guarantee you received all the messages. Used for
                  snapshot/delta consistency
                required: true
              - name: msg
                type: object
                required: true
                properties:
                  - name: underlying_tickers
                    type: array
                    description: >-
                      Underlying tickers observed on the Pyth stream in the last
                      two hours
                    required: true
                    properties:
                      - name: item
                        type: string
                        required: false
              - name: sending_ts_ms
                type: integer
                description: >-
                  Unix timestamp in milliseconds when Kalshi queued this message
                  at the network layer.
                required: false
        headers: []
        jsonPayloadSchema:
          type: object
          required:
            - type
            - sid
            - seq
            - msg
          properties:
            type:
              type: string
              const: pyth_value_underlying_list
              x-parser-schema-id: <anonymous-schema-444>
            id:
              type: integer
              description: >
                Unique ID of the command request. Generated by the client and
                should be unique within a WS session.

                The simplest way to use it would be to start from 1 and then
                increment the value for every new command sent to the server.

                If the id is set to 0, the server treats it the same way as if
                there was no id.
              minimum: 0
              x-parser-schema-id: commandId
            sid: *ref_0
            seq: *ref_1
            msg:
              type: object
              required:
                - underlying_tickers
              properties:
                underlying_tickers:
                  type: array
                  description: >-
                    Underlying tickers observed on the Pyth stream in the last
                    two hours
                  items:
                    type: string
                    x-parser-schema-id: <anonymous-schema-447>
                  x-parser-schema-id: <anonymous-schema-446>
              x-parser-schema-id: <anonymous-schema-445>
            sending_ts_ms: *ref_2
          x-parser-schema-id: pythUnderlyingListPayload
        title: Pyth Underlying List
        description: Recently streamed Pyth underlying tickers
        example: |-
          {
            "type": "pyth_value_underlying_list",
            "sending_ts_ms": 1669149841234,
            "id": 2,
            "sid": 1,
            "seq": 1,
            "msg": {
              "underlying_tickers": [
                "Commodities.Index.NATGAS/USD",
                "Commodities.Index.PYTHOIL/USD",
                "Metal.XAG/USD",
                "Metal.XAU/USD"
              ]
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: pythUnderlyingList
    bindings: []
    extensions: *ref_3
sendOperations: []
receiveOperations:
  - *ref_4
  - *ref_5
sendMessages: []
receiveMessages:
  - *ref_6
  - *ref_7
extensions:
  - id: x-parser-unique-object-id
    value: pyth_value
securitySchemes:
  - id: apiKey
    name: apiKey
    type: apiKey
    description: |
      API key authentication required for WebSocket connections.
      The API key should be provided during the WebSocket handshake.
    in: user
    extensions: []

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.