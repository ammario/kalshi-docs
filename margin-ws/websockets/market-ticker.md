---
url: https://docs.kalshi.com/margin-ws/websockets/market-ticker
lastmod: 2026-05-31T16:40:03.969Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Market Ticker

> Margin market updates are delivered on a single channel. `ticker` messages include
price, top-of-book size, volume, open-interest, and optional reference/mark prices.

Messages are coalesced to at most one per market per second (latest value wins
within the window).

Requirements:
- no additional channel-level auth beyond the authenticated WebSocket connection
- market specification optional
- supports `market_ticker`/`market_tickers`




## AsyncAPI

````yaml perps_asyncapi.yaml ticker
id: ticker
title: Market Ticker
description: >
  Margin market updates are delivered on a single channel. `ticker` messages
  include

  price, top-of-book size, volume, open-interest, and optional reference/mark
  prices.


  Messages are coalesced to at most one per market per second (latest value wins

  within the window).


  Requirements:

  - no additional channel-level auth beyond the authenticated WebSocket
  connection

  - market specification optional

  - supports `market_ticker`/`market_tickers`
servers:
  - id: production
    protocol: wss
    host: external-api-margin-ws.kalshi.com
    bindings: []
    variables: []
  - id: demo
    protocol: wss
    host: external-api-margin-ws.demo.kalshi.co
    bindings: []
    variables: []
address: ticker
parameters: []
bindings: []
operations:
  - &ref_1
    id: receiveTicker
    title: Ticker Update
    type: send
    messages:
      - &ref_2
        id: ticker
        contentType: application/json
        payload:
          - name: Ticker Update
            description: Margin market ticker information
            type: object
            properties:
              - name: type
                type: string
                description: ticker
                required: true
              - name: sid
                type: integer
                description: Server-generated subscription identifier
                required: true
              - name: msg
                type: object
                required: true
                properties:
                  - name: market_ticker
                    type: string
                    description: Unique market identifier
                    required: true
                  - name: price
                    type: string
                    description: >-
                      Last traded price in USD as a fixed-point decimal string
                      (4 decimals).
                    required: true
                  - name: bid
                    type: string
                    description: USD price as a fixed-point decimal string (4 decimals).
                    required: true
                  - name: ask
                    type: string
                    description: USD price as a fixed-point decimal string (4 decimals).
                    required: true
                  - name: bid_size_fp
                    type: string
                    required: true
                  - name: ask_size_fp
                    type: string
                    required: true
                  - name: last_trade_size_fp
                    type: string
                    required: true
                  - name: volume
                    type: string
                    description: One sided total trade volume in contracts.
                    required: true
                  - name: volume_notional_value_dollars
                    type: string
                    description: Total notional value of one sided trade volume in dollars.
                    required: true
                  - name: volume_24h
                    type: string
                    description: One sided trade volume in the last 24 hours in contracts.
                    required: true
                  - name: volume_24h_notional_value_dollars
                    type: string
                    description: >-
                      Total notional value of one sided trade volume in the last
                      24 hours in dollars.
                    required: true
                  - name: open_interest
                    type: string
                    description: One sided open interest in contracts.
                    required: true
                  - name: open_interest_notional_value_dollars
                    type: string
                    description: >-
                      Total notional value of one sided open interest in
                      dollars.
                    required: true
                  - name: reference_price
                    type: object
                    description: Reference price of underlying asset, when available.
                    required: false
                    properties:
                      - name: price
                        type: string
                        description: USD price as a fixed-point decimal string (4 decimals)
                        required: true
                      - name: ts_ms
                        type: integer
                        description: Unix timestamp in milliseconds.
                        required: true
                  - name: settlement_mark_price
                    type: object
                    required: false
                    properties:
                      - name: price
                        type: string
                        description: USD price as a fixed-point decimal string (4 decimals)
                        required: true
                      - name: ts_ms
                        type: integer
                        description: Unix timestamp in milliseconds.
                        required: true
                  - name: liquidation_mark_price
                    type: object
                    required: false
                    properties:
                      - name: price
                        type: string
                        description: USD price as a fixed-point decimal string (4 decimals)
                        required: true
                      - name: ts_ms
                        type: integer
                        description: Unix timestamp in milliseconds.
                        required: true
                  - name: funding_rate
                    type: object
                    required: false
                    properties:
                      - name: rate
                        type: number
                        description: Funding rate as a decimal value.
                        required: true
                      - name: next_funding_time_ms
                        type: integer
                        description: >-
                          Unix timestamp in milliseconds for the next funding
                          time.
                        required: true
                      - name: ts_ms
                        type: integer
                        description: >-
                          Unix timestamp in milliseconds for the funding
                          snapshot.
                        required: true
                  - name: ts_ms
                    type: integer
                    description: Unix timestamp in milliseconds.
                    required: true
        headers: []
        jsonPayloadSchema:
          type: object
          required:
            - type
            - sid
            - msg
          properties:
            type:
              type: string
              const: ticker
              x-parser-schema-id: <anonymous-schema-52>
            sid:
              type: integer
              minimum: 1
              description: Server-generated subscription identifier
              x-parser-schema-id: subscriptionId
            msg:
              type: object
              required:
                - market_ticker
                - price
                - bid
                - ask
                - bid_size_fp
                - ask_size_fp
                - last_trade_size_fp
                - volume
                - volume_notional_value_dollars
                - volume_24h
                - volume_24h_notional_value_dollars
                - open_interest
                - open_interest_notional_value_dollars
                - ts_ms
              properties:
                market_ticker:
                  type: string
                  description: Unique market identifier
                  x-parser-schema-id: marketTicker
                price:
                  type: string
                  description: >-
                    Last traded price in USD as a fixed-point decimal string (4
                    decimals).
                  x-parser-schema-id: <anonymous-schema-54>
                bid:
                  type: string
                  description: USD price as a fixed-point decimal string (4 decimals).
                  x-parser-schema-id: <anonymous-schema-55>
                ask:
                  type: string
                  description: USD price as a fixed-point decimal string (4 decimals).
                  x-parser-schema-id: <anonymous-schema-56>
                bid_size_fp:
                  type: string
                  x-parser-schema-id: <anonymous-schema-57>
                ask_size_fp:
                  type: string
                  x-parser-schema-id: <anonymous-schema-58>
                last_trade_size_fp:
                  type: string
                  x-parser-schema-id: <anonymous-schema-59>
                volume:
                  type: string
                  description: One sided total trade volume in contracts.
                  x-parser-schema-id: <anonymous-schema-60>
                volume_notional_value_dollars:
                  type: string
                  description: Total notional value of one sided trade volume in dollars.
                  x-parser-schema-id: <anonymous-schema-61>
                volume_24h:
                  type: string
                  description: One sided trade volume in the last 24 hours in contracts.
                  x-parser-schema-id: <anonymous-schema-62>
                volume_24h_notional_value_dollars:
                  type: string
                  description: >-
                    Total notional value of one sided trade volume in the last
                    24 hours in dollars.
                  x-parser-schema-id: <anonymous-schema-63>
                open_interest:
                  type: string
                  description: One sided open interest in contracts.
                  x-parser-schema-id: <anonymous-schema-64>
                open_interest_notional_value_dollars:
                  type: string
                  description: Total notional value of one sided open interest in dollars.
                  x-parser-schema-id: <anonymous-schema-65>
                reference_price:
                  description: Reference price of underlying asset, when available.
                  allOf:
                    - &ref_0
                      type: object
                      required:
                        - price
                        - ts_ms
                      properties:
                        price:
                          type: string
                          description: >-
                            USD price as a fixed-point decimal string (4
                            decimals)
                          x-parser-schema-id: <anonymous-schema-67>
                        ts_ms:
                          type: integer
                          format: int64
                          description: Unix timestamp in milliseconds.
                          x-parser-schema-id: <anonymous-schema-68>
                      x-parser-schema-id: tickerPrice
                  x-parser-schema-id: <anonymous-schema-66>
                settlement_mark_price: *ref_0
                liquidation_mark_price: *ref_0
                funding_rate:
                  type: object
                  required:
                    - rate
                    - next_funding_time_ms
                    - ts_ms
                  properties:
                    rate:
                      type: number
                      format: double
                      description: Funding rate as a decimal value.
                      x-parser-schema-id: <anonymous-schema-69>
                    next_funding_time_ms:
                      type: integer
                      format: int64
                      description: >-
                        Unix timestamp in milliseconds for the next funding
                        time.
                      x-parser-schema-id: <anonymous-schema-70>
                    ts_ms:
                      type: integer
                      format: int64
                      description: Unix timestamp in milliseconds for the funding snapshot.
                      x-parser-schema-id: <anonymous-schema-71>
                  x-parser-schema-id: fundingRate
                ts_ms:
                  type: integer
                  format: int64
                  description: Unix timestamp in milliseconds.
                  x-parser-schema-id: <anonymous-schema-72>
              x-parser-schema-id: <anonymous-schema-53>
          x-parser-schema-id: marginTickerPayload
        title: Ticker Update
        description: Margin market ticker information
        example: No examples found
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: ticker
    bindings: []
    extensions:
      - id: x-parser-unique-object-id
        value: ticker
sendOperations: []
receiveOperations:
  - *ref_1
sendMessages: []
receiveMessages:
  - *ref_2
extensions:
  - id: x-parser-unique-object-id
    value: ticker
securitySchemes:
  - id: apiKey
    name: apiKey
    type: apiKey
    description: API key authentication required for margin WebSocket connections.
    in: user
    extensions: []

````