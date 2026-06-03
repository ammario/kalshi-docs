---
url: https://docs.kalshi.com/websockets/cfbenchmarks-value
lastmod: 2026-06-02T15:31:02.805Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# CF Benchmarks Value Feed

> How to subscribe to and consume cfbenchmarks_value over the Predictions API WebSocket

## Overview

The `cfbenchmarks_value` channel streams real-time CF Benchmarks value updates through the Predictions API WebSocket.

Each update includes:

* `index_id`: the CF Benchmarks index ID (for example `BRTI`)
* `received_at`: when Kalshi received the upstream frame (unix ms)
* `data`: the raw CF Benchmarks JSON frame
* `avg_60s_data`: trailing 60-second average metadata
* `last_60s_windowed_average_15min`: quarter-hour final-minute accumulation metadata (only present in the active final-minute window)

## Access and authentication

* Use the same authenticated WebSocket connection flow as other Predictions WebSocket channels.

For connection setup and signing, see:

* [WebSocket Connection](/websockets/websocket-connection)
* [Quick Start: WebSockets](/getting_started/quick_start_websockets)

## Channel subscription workflow

### 1) Subscribe to the channel

You can seed `index_ids` in the initial subscribe, or subscribe first and add indices later.

```json theme={null}
{
  "id": 1,
  "cmd": "subscribe",
  "params": {
    "channels": ["cfbenchmarks_value"],
    "index_ids": ["BRTI", "ETHUSD_RTI"]
  }
}
```

Success response:

```json theme={null}
{
  "id": 1,
  "type": "subscribed",
  "sid": 1
}
```

### 2) Discover available index IDs

```json theme={null}
{
  "id": 2,
  "cmd": "update_subscription",
  "params": {
    "sid": 1,
    "action": "indexlist"
  }
}
```

Server response type: `cfbenchmarks_value_indexlist`

### 3) Add or remove tracked index IDs

Add:

```json theme={null}
{
  "id": 3,
  "cmd": "update_subscription",
  "params": {
    "sid": 1,
    "action": "subscribe_indices",
    "index_ids": ["BRTI"]
  }
}
```

Remove:

```json theme={null}
{
  "id": 4,
  "cmd": "update_subscription",
  "params": {
    "sid": 1,
    "action": "unsubscribe_indices",
    "index_ids": ["BRTI"]
  }
}
```

Use `"all"` to receive all index IDs:

```json theme={null}
{
  "id": 5,
  "cmd": "update_subscription",
  "params": {
    "sid": 1,
    "action": "subscribe_indices",
    "index_ids": ["all"]
  }
}
```

## Message format

Example `cfbenchmarks_value` payload:

```json theme={null}
{
  "type": "cfbenchmarks_value",
  "sid": 1,
  "msg": {
    "index_id": "BRTI",
    "received_at": 1710000000123,
    "data": "{\"type\":\"value\",\"id\":\"BRTI\",\"time\":1710000000123,\"value\":\"68000.12\"}",
    "avg_60s_data": {
      "value": "68000.12000000",
      "window_size": 3,
      "window_start_ts_ms": 1709999940123,
      "window_end_ts_exclusive": 1710000000123
    },
    "last_60s_windowed_average_15min": {
      "value": "68000.23000000",
      "window_size": 14,
      "window_start_ts_ms": 1709999980000,
      "window_end_ts_exclusive": 1710000000123
    }
  }
}
```

## Averaging semantics

### `avg_60s_data`

* Window is trailing and per tick: `[source_ts_ms - 60000, source_ts_ms)`
* `window_size` counts prior ticks only
* If there are no prior ticks in the trailing window, average falls back to the current tick value

### `last_60s_windowed_average_15min`

* Field is only present in the final minute before quarter-hour close (`:00`, `:15`, `:30`, `:45`)
* Active accumulation window is: `(quarter_close_ts_ms - 60000, quarter_close_ts_ms]`
* Start boundary tick is excluded and close tick is included
* This produces second-indexed counts:
  * `:01 -> 1`
  * `:14 -> 14`
  * `:59 -> 59`
  * close tick (`:00/:15/:30/:45`) -> `60`
* Field is omitted outside that final-minute window

## Integration notes

* If you subscribe to the channel without any `index_ids`, no value events flow until you add indices or switch to `"all"`.
* Duplicate or out-of-order upstream source timestamps are ignored.
* `sid` identifies the subscription stream; use it for `update_subscription` and `unsubscribe`.

## Common errors

* Missing `index_ids` for `subscribe_indices` or `unsubscribe_indices` returns:
  * `type: "error"`
  * `msg.code: 24`
  * `msg.msg: "Index IDs required"`
* Unsupported actions return standard websocket `error` responses.

For general websocket error codes and behavior, see [Quick Start: WebSockets](/getting_started/quick_start_websockets#error-handling).
