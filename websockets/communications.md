---
url: https://docs.kalshi.com/websockets/communications
lastmod: 2026-10-25T21:23:08.635Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Communications

> Real-time Request for Quote (RFQ) and quote notifications. Requires authentication.

**Requirements:**
- Authentication required
- Market specification ignored
- Optional sharding for fanout control:
  - `shard_factor` (1-100) and `shard_key` (`0 <= key < shard_factor`)
- RFQ events (RFQCreated, RFQDeleted) are sent for all users by default. Set `user_filter: "self"` to receive only RFQs you created. Omitted or empty `user_filter` keeps the default.
- Quote events (QuoteCreated, QuoteAccepted, QuoteExecuted) are only sent if you created the quote OR you created the RFQ
- RFQ batch events (RFQBatchCreated, RFQBatchDeleted) follow the RFQ event rules: sent for all users by default, or with `user_filter: "self"` only for RFQ batches you created. A batch's child RFQs are announced only inside RFQBatchCreated; each child trade still sends QuoteExecuted, with `rfq_batch_id` set. With sharding, every batch event is partitioned by `rfq_batch_id` instead of the market ticker, so a child's QuoteExecuted can arrive on another shard than its batch's events.
- Each child of an RFQ batch fills at its best quote across makers, and the children execute together as one fill-or-kill: nothing trades unless every child can fill in full. In the rare case that filling one child cancels a maker order another child needed, the batch closes partially executed. Every maker's batch quote prices every child, and each child goes to the maker bidding best on the accepted side, so one batch can have several winning makers. A batch quote counts only for 30 seconds after it was last submitted; resending an unchanged bid within that time keeps its time priority.
- RFQBatchBestQuotes and RFQBatchExecuted are only sent to the RFQ batch creator. RFQBatchBestQuotes carries the best bids across makers without identifying them; the batch creator never receives a maker's individual batch quote.
- Batch quote events (BatchQuoteCreated, BatchQuoteAccepted, BatchQuoteExecuted) are only sent to the maker that created the batch quote. Each winning maker confirms the children it won, and nothing executes until every winning maker has confirmed.

**Use case:** Tracking RFQs and RFQ batches you create and the quotes on them, or quotes and batch quotes you create on others'. Use QuoteExecuted to correlate fill messages with quotes via client_order_id.




## AsyncAPI

````yaml asyncapi.yaml communications
id: communications
title: Communications
description: >
  Real-time Request for Quote (RFQ) and quote notifications. Requires
  authentication.


  **Requirements:**

  - Authentication required

  - Market specification ignored

  - Optional sharding for fanout control:
    - `shard_factor` (1-100) and `shard_key` (`0 <= key < shard_factor`)
  - RFQ events (RFQCreated, RFQDeleted) are sent for all users by default. Set
  `user_filter: "self"` to receive only RFQs you created. Omitted or empty
  `user_filter` keeps the default.

  - Quote events (QuoteCreated, QuoteAccepted, QuoteExecuted) are only sent if
  you created the quote OR you created the RFQ

  - RFQ batch events (RFQBatchCreated, RFQBatchDeleted) follow the RFQ event
  rules: sent for all users by default, or with `user_filter: "self"` only for
  RFQ batches you created. A batch's child RFQs are announced only inside
  RFQBatchCreated; each child trade still sends QuoteExecuted, with
  `rfq_batch_id` set. With sharding, every batch event is partitioned by
  `rfq_batch_id` instead of the market ticker, so a child's QuoteExecuted can
  arrive on another shard than its batch's events.

  - Each child of an RFQ batch fills at its best quote across makers, and the
  children execute together as one fill-or-kill: nothing trades unless every
  child can fill in full. In the rare case that filling one child cancels a
  maker order another child needed, the batch closes partially executed. Every
  maker's batch quote prices every child, and each child goes to the maker
  bidding best on the accepted side, so one batch can have several winning
  makers. A batch quote counts only for 30 seconds after it was last submitted;
  resending an unchanged bid within that time keeps its time priority.

  - RFQBatchBestQuotes and RFQBatchExecuted are only sent to the RFQ batch
  creator. RFQBatchBestQuotes carries the best bids across makers without
  identifying them; the batch creator never receives a maker's individual batch
  quote.

  - Batch quote events (BatchQuoteCreated, BatchQuoteAccepted,
  BatchQuoteExecuted) are only sent to the maker that created the batch quote.
  Each winning maker confirms the children it won, and nothing executes until
  every winning maker has confirmed.


  **Use case:** Tracking RFQs and RFQ batches you create and the quotes on them,
  or quotes and batch quotes you create on others'. Use QuoteExecuted to
  correlate fill messages with quotes via client_order_id.
servers:
  - id: production
    protocol: wss
    host: external-api-ws.kalshi.com
    bindings: []
    variables: []
address: communications
parameters: []
bindings: []
operations:
  - &ref_4
    id: receiveRFQCreated
    title: RFQ Created
    description: Receive RFQ created notifications
    type: send
    messages:
      - &ref_16
        id: rfqCreated
        contentType: application/json
        payload:
          - name: RFQ Created
            description: Notification when an RFQ is created
            type: object
            properties:
              - name: type
                type: string
                description: rfq_created
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
                  - name: id
                    type: string
                    description: Unique identifier for the RFQ
                    required: true
                  - name: creator_id
                    type: string
                    description: >-
                      Public communications ID of the RFQ creator
                      (pseudonymous). When obscure_creator_id is enabled, other
                      users receive the shared placeholder
                      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                      (SHA-256 of empty input). The creator sees their normal
                      ID.
                    required: true
                  - name: market_ticker
                    type: string
                    description: Market ticker for the RFQ
                    required: true
                  - name: event_ticker
                    type: string
                    description: Event ticker (optional)
                    required: false
                  - name: contracts_fp
                    type: string
                    description: Fixed-point contracts requested (2 decimals) (optional)
                    required: false
                  - name: target_cost_dollars
                    type: string
                    description: Target cost in dollars (optional)
                    required: false
                  - name: created_ts
                    type: string
                    description: Timestamp when the RFQ was created
                    required: true
                  - name: mve_collection_ticker
                    type: string
                    description: >-
                      Multivariate event collection ticker. Omitted for non-MVE
                      RFQs.
                    required: false
                  - name: mve_selected_legs
                    type: array
                    description: >-
                      Selected legs for an MVE RFQ. Omitted when the array is
                      empty.
                    required: false
                    properties:
                      - name: event_ticker
                        type: string
                        description: Event ticker for the selected leg
                        required: true
                      - name: market_ticker
                        type: string
                        description: Market ticker for the selected leg
                        required: true
                      - name: side
                        type: string
                        description: Side selected for the leg
                        enumValues:
                          - 'yes'
                          - 'no'
                        required: true
                      - name: yes_settlement_value_dollars
                        type: string
                        description: >-
                          Yes settlement value in dollars for the selected leg.
                          Omitted when unavailable.
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
              const: rfq_created
              x-parser-schema-id: <anonymous-schema-204>
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
                - id
                - creator_id
                - market_ticker
                - created_ts
              properties:
                id:
                  type: string
                  description: Unique identifier for the RFQ
                  x-parser-schema-id: <anonymous-schema-206>
                creator_id:
                  type: string
                  description: >-
                    Public communications ID of the RFQ creator (pseudonymous).
                    When obscure_creator_id is enabled, other users receive the
                    shared placeholder
                    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                    (SHA-256 of empty input). The creator sees their normal ID.
                  x-parser-schema-id: <anonymous-schema-207>
                market_ticker:
                  type: string
                  description: Market ticker for the RFQ
                  x-parser-schema-id: <anonymous-schema-208>
                event_ticker:
                  type: string
                  description: Event ticker (optional)
                  x-parser-schema-id: <anonymous-schema-209>
                contracts_fp:
                  type: string
                  description: Fixed-point contracts requested (2 decimals) (optional)
                  x-rust-type: i64
                  x-rust-serialize-with: >-
                    ws::dto::serde_money::serialize_optional_centicount_fixed_point_count
                  x-parser-schema-id: <anonymous-schema-210>
                target_cost_dollars:
                  type: string
                  description: Target cost in dollars (optional)
                  x-rust-type: common::types::Value
                  x-rust-serialize-with: ws::dto::serde_money::serialize_option_value_dollars
                  x-parser-schema-id: <anonymous-schema-211>
                created_ts:
                  type: string
                  description: Timestamp when the RFQ was created
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-212>
                mve_collection_ticker:
                  type: string
                  description: >-
                    Multivariate event collection ticker. Omitted for non-MVE
                    RFQs.
                  x-parser-schema-id: <anonymous-schema-213>
                mve_selected_legs:
                  type: array
                  minItems: 1
                  description: >-
                    Selected legs for an MVE RFQ. Omitted when the array is
                    empty.
                  items:
                    type: object
                    required:
                      - event_ticker
                      - market_ticker
                      - side
                    properties:
                      event_ticker:
                        type: string
                        description: Event ticker for the selected leg
                        x-parser-schema-id: <anonymous-schema-216>
                      market_ticker:
                        type: string
                        description: Market ticker for the selected leg
                        x-parser-schema-id: <anonymous-schema-217>
                      side:
                        type: string
                        enum:
                          - 'yes'
                          - 'no'
                        description: Side selected for the leg
                        x-parser-schema-id: <anonymous-schema-218>
                      yes_settlement_value_dollars:
                        type: string
                        description: >-
                          Yes settlement value in dollars for the selected leg.
                          Omitted when unavailable.
                        x-rust-type: common::types::Price
                        x-rust-serialize-with: ws::dto::serde_money::serialize_option_price_dollars
                        x-parser-schema-id: <anonymous-schema-219>
                    x-parser-schema-id: <anonymous-schema-215>
                  x-parser-schema-id: <anonymous-schema-214>
              x-parser-schema-id: <anonymous-schema-205>
            sending_ts_ms: &ref_2
              type: integer
              format: int64
              description: >-
                Unix timestamp in milliseconds when Kalshi queued this message
                at the network layer.
              x-parser-schema-id: sendingTimestampMs
          x-parser-schema-id: rfqCreatedPayload
        title: RFQ Created
        description: Notification when an RFQ is created
        example: |-
          {
            "type": "rfq_created",
            "sending_ts_ms": 1669149841234,
            "sid": 15,
            "seq": 11,
            "msg": {
              "id": "rfq_123",
              "creator_id": "43fc3733603f4830a8c3b2986011a5f78d67b03b473dbfd3a3847abd85b63a51",
              "market_ticker": "FED-23DEC-T3.00",
              "event_ticker": "FED-23DEC",
              "contracts_fp": "100.00",
              "created_ts": "2024-12-01T10:00:00Z"
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: rfqCreated
    bindings: []
    extensions: &ref_3
      - id: x-parser-unique-object-id
        value: communications
  - &ref_5
    id: receiveRFQDeleted
    title: RFQ Deleted
    description: Receive RFQ deleted notifications
    type: send
    messages:
      - &ref_17
        id: rfqDeleted
        contentType: application/json
        payload:
          - name: RFQ Deleted
            description: Notification when an RFQ is deleted
            type: object
            properties:
              - name: type
                type: string
                description: rfq_deleted
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
                  - name: id
                    type: string
                    description: Unique identifier for the RFQ
                    required: true
                  - name: creator_id
                    type: string
                    description: >-
                      Public communications ID of the RFQ creator
                      (pseudonymous). When obscure_creator_id is enabled, other
                      users receive the shared placeholder
                      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                      (SHA-256 of empty input). The creator sees their normal
                      ID.
                    required: true
                  - name: market_ticker
                    type: string
                    description: Market ticker for the RFQ
                    required: true
                  - name: event_ticker
                    type: string
                    description: Event ticker (optional)
                    required: false
                  - name: contracts_fp
                    type: string
                    description: Fixed-point contracts requested (2 decimals) (optional)
                    required: false
                  - name: target_cost_dollars
                    type: string
                    description: Target cost in dollars (optional)
                    required: false
                  - name: deleted_ts
                    type: string
                    description: Timestamp when the RFQ was deleted
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
              const: rfq_deleted
              x-parser-schema-id: <anonymous-schema-220>
            sid: *ref_0
            seq: *ref_1
            msg:
              type: object
              required:
                - id
                - creator_id
                - market_ticker
                - deleted_ts
              properties:
                id:
                  type: string
                  description: Unique identifier for the RFQ
                  x-parser-schema-id: <anonymous-schema-222>
                creator_id:
                  type: string
                  description: >-
                    Public communications ID of the RFQ creator (pseudonymous).
                    When obscure_creator_id is enabled, other users receive the
                    shared placeholder
                    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                    (SHA-256 of empty input). The creator sees their normal ID.
                  x-parser-schema-id: <anonymous-schema-223>
                market_ticker:
                  type: string
                  description: Market ticker for the RFQ
                  x-parser-schema-id: <anonymous-schema-224>
                event_ticker:
                  type: string
                  description: Event ticker (optional)
                  x-parser-schema-id: <anonymous-schema-225>
                contracts_fp:
                  type: string
                  description: Fixed-point contracts requested (2 decimals) (optional)
                  x-rust-type: i64
                  x-rust-serialize-with: >-
                    ws::dto::serde_money::serialize_optional_centicount_fixed_point_count
                  x-parser-schema-id: <anonymous-schema-226>
                target_cost_dollars:
                  type: string
                  description: Target cost in dollars (optional)
                  x-rust-type: common::types::Value
                  x-rust-serialize-with: ws::dto::serde_money::serialize_option_value_dollars
                  x-parser-schema-id: <anonymous-schema-227>
                deleted_ts:
                  type: string
                  description: Timestamp when the RFQ was deleted
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-228>
              x-parser-schema-id: <anonymous-schema-221>
            sending_ts_ms: *ref_2
          x-parser-schema-id: rfqDeletedPayload
        title: RFQ Deleted
        description: Notification when an RFQ is deleted
        example: |-
          {
            "type": "rfq_deleted",
            "sending_ts_ms": 1669149841234,
            "sid": 15,
            "seq": 12,
            "msg": {
              "id": "rfq_123",
              "creator_id": "comm_abc123",
              "market_ticker": "FED-23DEC-T3.00",
              "event_ticker": "FED-23DEC",
              "contracts_fp": "100.00",
              "target_cost_dollars": "0.3500",
              "deleted_ts": "2024-12-01T10:05:00Z"
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: rfqDeleted
    bindings: []
    extensions: *ref_3
  - &ref_6
    id: receiveQuoteCreated
    title: Quote Created
    description: Receive quote created notifications
    type: send
    messages:
      - &ref_18
        id: quoteCreated
        contentType: application/json
        payload:
          - name: Quote Created
            description: Notification when a quote is created on an RFQ
            type: object
            properties:
              - name: type
                type: string
                description: quote_created
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
                  - name: quote_id
                    type: string
                    description: Unique identifier for the quote
                    required: true
                  - name: rfq_id
                    type: string
                    description: Identifier of the RFQ this quote is for
                    required: true
                  - name: quote_creator_id
                    type: string
                    description: Public communications ID of the quote creator (anonymized)
                    required: true
                  - name: rfq_creator_id
                    type: string
                    description: >-
                      Public communications ID of the RFQ creator
                      (pseudonymous). When obscure_creator_id is enabled, other
                      users receive the shared placeholder
                      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                      (SHA-256 of empty input). The creator sees their normal
                      ID.
                    required: true
                  - name: market_ticker
                    type: string
                    description: Market ticker for the quote
                    required: true
                  - name: event_ticker
                    type: string
                    description: Event ticker (optional)
                    required: false
                  - name: yes_bid_dollars
                    type: string
                    description: Yes side bid price in dollars
                    required: true
                  - name: no_bid_dollars
                    type: string
                    description: No side bid price in dollars
                    required: true
                  - name: yes_contracts_offered_fp
                    type: string
                    description: Fixed-point yes contracts offered (2 decimals) (optional)
                    required: false
                  - name: no_contracts_offered_fp
                    type: string
                    description: Fixed-point no contracts offered (2 decimals) (optional)
                    required: false
                  - name: rfq_target_cost_dollars
                    type: string
                    description: Target cost from the RFQ in dollars (optional)
                    required: false
                  - name: created_ts
                    type: string
                    description: Timestamp when the quote was created
                    required: true
                  - name: subaccount
                    type: integer
                    description: >
                      Optional - Present only when your side of this quote used
                      a subaccount.

                      Contains your own subaccount number; the counterparty's
                      subaccount is never shared.
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
              const: quote_created
              x-parser-schema-id: <anonymous-schema-229>
            sid: *ref_0
            seq: *ref_1
            msg:
              type: object
              required:
                - quote_id
                - rfq_id
                - quote_creator_id
                - rfq_creator_id
                - market_ticker
                - yes_bid_dollars
                - no_bid_dollars
                - created_ts
              properties:
                quote_id:
                  type: string
                  description: Unique identifier for the quote
                  x-parser-schema-id: <anonymous-schema-231>
                rfq_id:
                  type: string
                  description: Identifier of the RFQ this quote is for
                  x-parser-schema-id: <anonymous-schema-232>
                quote_creator_id:
                  type: string
                  description: Public communications ID of the quote creator (anonymized)
                  x-parser-schema-id: <anonymous-schema-233>
                rfq_creator_id:
                  type: string
                  description: >-
                    Public communications ID of the RFQ creator (pseudonymous).
                    When obscure_creator_id is enabled, other users receive the
                    shared placeholder
                    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                    (SHA-256 of empty input). The creator sees their normal ID.
                  x-parser-schema-id: <anonymous-schema-234>
                market_ticker:
                  type: string
                  description: Market ticker for the quote
                  x-parser-schema-id: <anonymous-schema-235>
                event_ticker:
                  type: string
                  description: Event ticker (optional)
                  x-parser-schema-id: <anonymous-schema-236>
                yes_bid_dollars:
                  type: string
                  description: Yes side bid price in dollars
                  x-rust-type: common::types::Price
                  x-rust-serialize-with: ws::dto::serde_money::serialize_price_dollars
                  x-parser-schema-id: <anonymous-schema-237>
                no_bid_dollars:
                  type: string
                  description: No side bid price in dollars
                  x-rust-type: common::types::Price
                  x-rust-serialize-with: ws::dto::serde_money::serialize_price_dollars
                  x-parser-schema-id: <anonymous-schema-238>
                yes_contracts_offered_fp:
                  type: string
                  description: Fixed-point yes contracts offered (2 decimals) (optional)
                  x-rust-type: i64
                  x-rust-serialize-with: >-
                    ws::dto::serde_money::serialize_optional_centicount_fixed_point_count
                  x-parser-schema-id: <anonymous-schema-239>
                no_contracts_offered_fp:
                  type: string
                  description: Fixed-point no contracts offered (2 decimals) (optional)
                  x-rust-type: i64
                  x-rust-serialize-with: >-
                    ws::dto::serde_money::serialize_optional_centicount_fixed_point_count
                  x-parser-schema-id: <anonymous-schema-240>
                rfq_target_cost_dollars:
                  type: string
                  description: Target cost from the RFQ in dollars (optional)
                  x-rust-type: common::types::Value
                  x-rust-serialize-with: ws::dto::serde_money::serialize_option_value_dollars
                  x-parser-schema-id: <anonymous-schema-241>
                created_ts:
                  type: string
                  description: Timestamp when the quote was created
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-242>
                subaccount:
                  type: integer
                  description: >
                    Optional - Present only when your side of this quote used a
                    subaccount.

                    Contains your own subaccount number; the counterparty's
                    subaccount is never shared.
                  x-parser-schema-id: <anonymous-schema-243>
              x-parser-schema-id: <anonymous-schema-230>
            sending_ts_ms: *ref_2
          x-parser-schema-id: quoteCreatedPayload
        title: Quote Created
        description: Notification when a quote is created on an RFQ
        example: |-
          {
            "type": "quote_created",
            "sending_ts_ms": 1669149841234,
            "sid": 15,
            "seq": 13,
            "msg": {
              "quote_id": "quote_456",
              "rfq_id": "rfq_123",
              "quote_creator_id": "comm_def456",
              "rfq_creator_id": "comm_abc123",
              "market_ticker": "FED-23DEC-T3.00",
              "event_ticker": "FED-23DEC",
              "yes_bid_dollars": "0.3500",
              "no_bid_dollars": "0.6500",
              "yes_contracts_offered_fp": "100.00",
              "no_contracts_offered_fp": "200.00",
              "rfq_target_cost_dollars": "0.3500",
              "created_ts": "2024-12-01T10:02:00Z",
              "subaccount": 3
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: quoteCreated
    bindings: []
    extensions: *ref_3
  - &ref_7
    id: receiveQuoteAccepted
    title: Quote Accepted
    description: Receive quote accepted notifications
    type: send
    messages:
      - &ref_19
        id: quoteAccepted
        contentType: application/json
        payload:
          - name: Quote Accepted
            description: Notification when a quote is accepted
            type: object
            properties:
              - name: type
                type: string
                description: quote_accepted
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
                  - name: quote_id
                    type: string
                    description: Unique identifier for the quote
                    required: true
                  - name: rfq_id
                    type: string
                    description: Identifier of the RFQ this quote is for
                    required: true
                  - name: quote_creator_id
                    type: string
                    description: Public communications ID of the quote creator (anonymized)
                    required: true
                  - name: rfq_creator_id
                    type: string
                    description: >-
                      Public communications ID of the RFQ creator
                      (pseudonymous). When obscure_creator_id is enabled, other
                      users receive the shared placeholder
                      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                      (SHA-256 of empty input). The creator sees their normal
                      ID.
                    required: true
                  - name: market_ticker
                    type: string
                    description: Market ticker for the quote
                    required: true
                  - name: event_ticker
                    type: string
                    description: Event ticker (optional)
                    required: false
                  - name: yes_bid_dollars
                    type: string
                    description: Yes side bid price in dollars
                    required: true
                  - name: no_bid_dollars
                    type: string
                    description: No side bid price in dollars
                    required: true
                  - name: accepted_side
                    type: string
                    description: Which side was accepted (yes/no) (optional)
                    enumValues:
                      - 'yes'
                      - 'no'
                    required: false
                  - name: contracts_accepted_fp
                    type: string
                    description: Fixed-point contracts accepted (2 decimals) (optional)
                    required: false
                  - name: yes_contracts_offered_fp
                    type: string
                    description: Fixed-point yes contracts offered (2 decimals) (optional)
                    required: false
                  - name: no_contracts_offered_fp
                    type: string
                    description: Fixed-point no contracts offered (2 decimals) (optional)
                    required: false
                  - name: rfq_target_cost_dollars
                    type: string
                    description: Target cost from the RFQ in dollars (optional)
                    required: false
                  - name: subaccount
                    type: integer
                    description: >
                      Optional - Present only when your side of this quote used
                      a subaccount.

                      Contains your own subaccount number; the counterparty's
                      subaccount is never shared.
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
              const: quote_accepted
              x-parser-schema-id: <anonymous-schema-244>
            sid: *ref_0
            seq: *ref_1
            msg:
              type: object
              required:
                - quote_id
                - rfq_id
                - quote_creator_id
                - rfq_creator_id
                - market_ticker
                - yes_bid_dollars
                - no_bid_dollars
              properties:
                quote_id:
                  type: string
                  description: Unique identifier for the quote
                  x-parser-schema-id: <anonymous-schema-246>
                rfq_id:
                  type: string
                  description: Identifier of the RFQ this quote is for
                  x-parser-schema-id: <anonymous-schema-247>
                quote_creator_id:
                  type: string
                  description: Public communications ID of the quote creator (anonymized)
                  x-parser-schema-id: <anonymous-schema-248>
                rfq_creator_id:
                  type: string
                  description: >-
                    Public communications ID of the RFQ creator (pseudonymous).
                    When obscure_creator_id is enabled, other users receive the
                    shared placeholder
                    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                    (SHA-256 of empty input). The creator sees their normal ID.
                  x-parser-schema-id: <anonymous-schema-249>
                market_ticker:
                  type: string
                  description: Market ticker for the quote
                  x-parser-schema-id: <anonymous-schema-250>
                event_ticker:
                  type: string
                  description: Event ticker (optional)
                  x-parser-schema-id: <anonymous-schema-251>
                yes_bid_dollars:
                  type: string
                  description: Yes side bid price in dollars
                  x-rust-type: common::types::Price
                  x-rust-serialize-with: ws::dto::serde_money::serialize_price_dollars
                  x-parser-schema-id: <anonymous-schema-252>
                no_bid_dollars:
                  type: string
                  description: No side bid price in dollars
                  x-rust-type: common::types::Price
                  x-rust-serialize-with: ws::dto::serde_money::serialize_price_dollars
                  x-parser-schema-id: <anonymous-schema-253>
                accepted_side:
                  type: string
                  description: Which side was accepted (yes/no) (optional)
                  enum:
                    - 'yes'
                    - 'no'
                  x-parser-schema-id: <anonymous-schema-254>
                contracts_accepted_fp:
                  type: string
                  description: Fixed-point contracts accepted (2 decimals) (optional)
                  x-rust-type: i64
                  x-rust-serialize-with: >-
                    ws::dto::serde_money::serialize_optional_centicount_fixed_point_count
                  x-parser-schema-id: <anonymous-schema-255>
                yes_contracts_offered_fp:
                  type: string
                  description: Fixed-point yes contracts offered (2 decimals) (optional)
                  x-rust-type: i64
                  x-rust-serialize-with: >-
                    ws::dto::serde_money::serialize_optional_centicount_fixed_point_count
                  x-parser-schema-id: <anonymous-schema-256>
                no_contracts_offered_fp:
                  type: string
                  description: Fixed-point no contracts offered (2 decimals) (optional)
                  x-rust-type: i64
                  x-rust-serialize-with: >-
                    ws::dto::serde_money::serialize_optional_centicount_fixed_point_count
                  x-parser-schema-id: <anonymous-schema-257>
                rfq_target_cost_dollars:
                  type: string
                  description: Target cost from the RFQ in dollars (optional)
                  x-rust-type: common::types::Value
                  x-rust-serialize-with: ws::dto::serde_money::serialize_option_value_dollars
                  x-parser-schema-id: <anonymous-schema-258>
                subaccount:
                  type: integer
                  description: >
                    Optional - Present only when your side of this quote used a
                    subaccount.

                    Contains your own subaccount number; the counterparty's
                    subaccount is never shared.
                  x-parser-schema-id: <anonymous-schema-259>
              x-parser-schema-id: <anonymous-schema-245>
            sending_ts_ms: *ref_2
          x-parser-schema-id: quoteAcceptedPayload
        title: Quote Accepted
        description: Notification when a quote is accepted
        example: |-
          {
            "type": "quote_accepted",
            "sending_ts_ms": 1669149841234,
            "sid": 15,
            "seq": 14,
            "msg": {
              "quote_id": "quote_456",
              "rfq_id": "rfq_123",
              "quote_creator_id": "comm_def456",
              "rfq_creator_id": "comm_abc123",
              "market_ticker": "FED-23DEC-T3.00",
              "event_ticker": "FED-23DEC",
              "yes_bid_dollars": "0.3500",
              "no_bid_dollars": "0.6500",
              "accepted_side": "yes",
              "contracts_accepted_fp": "50.00",
              "yes_contracts_offered_fp": "100.00",
              "no_contracts_offered_fp": "200.00",
              "rfq_target_cost_dollars": "0.3500",
              "subaccount": 3
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: quoteAccepted
    bindings: []
    extensions: *ref_3
  - &ref_8
    id: receiveQuoteExecuted
    title: Quote Executed
    description: >-
      Receive quote executed notifications with order details for fill
      correlation
    type: send
    messages:
      - &ref_20
        id: quoteExecuted
        contentType: application/json
        payload:
          - name: Quote Executed
            description: Notification when a quote is executed and orders are placed
            type: object
            properties:
              - name: type
                type: string
                description: quote_executed
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
                  - name: quote_id
                    type: string
                    description: Unique identifier for the quote that was executed
                    required: true
                  - name: rfq_id
                    type: string
                    description: Identifier of the RFQ this quote was for
                    required: true
                  - name: quote_creator_id
                    type: string
                    description: Anonymized identifier for the quote creator
                    required: true
                  - name: rfq_creator_id
                    type: string
                    description: Anonymized identifier for the RFQ creator
                    required: true
                  - name: order_id
                    type: string
                    description: >-
                      Your order ID resulting from the quote execution. Use this
                      to match with fill messages
                    required: true
                  - name: client_order_id
                    type: string
                    description: >-
                      Your client order ID for the executed order. Use this to
                      correlate with fill messages
                    required: true
                  - name: market_ticker
                    type: string
                    description: Market ticker for the executed quote
                    required: true
                  - name: executed_ts
                    type: string
                    description: >-
                      Timestamp when the quote was executed and orders were
                      placed
                    required: true
                  - name: subaccount
                    type: integer
                    description: >
                      Optional - Present only when your side of this quote used
                      a subaccount.

                      Contains your own subaccount number; the counterparty's
                      subaccount is never shared.
                    required: false
                  - name: rfq_batch_id
                    type: string
                    description: >-
                      Identifier of the RFQ batch, when the quote was accepted
                      as part of a batch quote. Omitted otherwise.
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
              const: quote_executed
              x-parser-schema-id: <anonymous-schema-260>
            sid: *ref_0
            seq: *ref_1
            msg:
              type: object
              required:
                - quote_id
                - rfq_id
                - quote_creator_id
                - rfq_creator_id
                - order_id
                - client_order_id
                - market_ticker
                - executed_ts
              properties:
                quote_id:
                  type: string
                  description: Unique identifier for the quote that was executed
                  x-parser-schema-id: <anonymous-schema-262>
                rfq_id:
                  type: string
                  description: Identifier of the RFQ this quote was for
                  x-parser-schema-id: <anonymous-schema-263>
                quote_creator_id:
                  type: string
                  description: Anonymized identifier for the quote creator
                  x-parser-schema-id: <anonymous-schema-264>
                rfq_creator_id:
                  type: string
                  description: Anonymized identifier for the RFQ creator
                  x-parser-schema-id: <anonymous-schema-265>
                order_id:
                  type: string
                  description: >-
                    Your order ID resulting from the quote execution. Use this
                    to match with fill messages
                  x-parser-schema-id: <anonymous-schema-266>
                client_order_id:
                  type: string
                  description: >-
                    Your client order ID for the executed order. Use this to
                    correlate with fill messages
                  x-parser-schema-id: <anonymous-schema-267>
                market_ticker:
                  type: string
                  description: Market ticker for the executed quote
                  x-parser-schema-id: <anonymous-schema-268>
                executed_ts:
                  type: string
                  description: Timestamp when the quote was executed and orders were placed
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-269>
                subaccount:
                  type: integer
                  description: >
                    Optional - Present only when your side of this quote used a
                    subaccount.

                    Contains your own subaccount number; the counterparty's
                    subaccount is never shared.
                  x-parser-schema-id: <anonymous-schema-270>
                rfq_batch_id:
                  type: string
                  description: >-
                    Identifier of the RFQ batch, when the quote was accepted as
                    part of a batch quote. Omitted otherwise.
                  x-parser-schema-id: <anonymous-schema-271>
              x-parser-schema-id: <anonymous-schema-261>
            sending_ts_ms: *ref_2
          x-parser-schema-id: quoteExecutedPayload
        title: Quote Executed
        description: Notification when a quote is executed and orders are placed
        example: |-
          {
            "type": "quote_executed",
            "sending_ts_ms": 1669149841234,
            "sid": 15,
            "seq": 15,
            "msg": {
              "quote_id": "quote_456",
              "rfq_id": "rfq_123",
              "quote_creator_id": "a1b2c3d4e5f6...",
              "rfq_creator_id": "f6e5d4c3b2a1...",
              "order_id": "order_789",
              "client_order_id": "my_client_order_123",
              "market_ticker": "FED-23DEC-T3.00",
              "executed_ts": "2024-12-01T10:05:00Z",
              "subaccount": 3
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: quoteExecuted
    bindings: []
    extensions: *ref_3
  - &ref_9
    id: receiveRFQBatchCreated
    title: RFQ Batch Created
    description: Receive RFQ batch created notifications
    type: send
    messages:
      - &ref_21
        id: rfqBatchCreated
        contentType: application/json
        payload:
          - name: RFQ Batch Created
            description: Notification when an RFQ batch is created
            type: object
            properties:
              - name: type
                type: string
                description: rfq_batch_created
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
                  - name: id
                    type: string
                    description: Unique identifier for the RFQ batch
                    required: true
                  - name: creator_id
                    type: string
                    description: >-
                      Public communications ID of the batch creator
                      (pseudonymous). When obscure_creator_id is enabled, other
                      users receive the shared placeholder
                      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                      (SHA-256 of empty input). The creator sees their normal
                      ID.
                    required: true
                  - name: created_ts
                    type: string
                    description: Timestamp when the RFQ batch was created
                    required: true
                  - name: legs
                    type: array
                    description: Distinct legs across the batch's combos, each listed once
                    required: true
                    properties:
                      - name: event_ticker
                        type: string
                        description: Event ticker for the leg
                        required: true
                      - name: market_ticker
                        type: string
                        description: Market ticker for the leg
                        required: true
                      - name: side
                        type: string
                        description: Side selected for the leg
                        enumValues:
                          - 'yes'
                          - 'no'
                        required: true
                      - name: yes_settlement_value_dollars
                        type: string
                        description: >-
                          Yes settlement value in dollars for the leg. Omitted
                          when unavailable.
                        required: false
                  - name: rfqs
                    type: array
                    description: The child RFQs, in the order they were requested
                    required: true
                    properties:
                      - name: id
                        type: string
                        description: Unique identifier for the child RFQ
                        required: true
                      - name: market_ticker
                        type: string
                        description: Combo market ticker of the child RFQ
                        required: true
                      - name: event_ticker
                        type: string
                        description: Event ticker (optional)
                        required: false
                      - name: contracts_fp
                        type: string
                        description: >-
                          Fixed-point contracts requested (2 decimals)
                          (optional)
                        required: false
                      - name: target_cost_dollars
                        type: string
                        description: Target cost in dollars (optional)
                        required: false
                      - name: mve_collection_ticker
                        type: string
                        description: Multivariate event collection ticker (optional)
                        required: false
                      - name: leg_indices
                        type: array
                        description: Indexes into legs of this combo's legs
                        required: true
                        properties:
                          - name: item
                            type: integer
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
              const: rfq_batch_created
              x-parser-schema-id: <anonymous-schema-272>
            sid: *ref_0
            seq: *ref_1
            msg:
              type: object
              required:
                - id
                - creator_id
                - created_ts
                - legs
                - rfqs
              properties:
                id:
                  type: string
                  description: Unique identifier for the RFQ batch
                  x-parser-schema-id: <anonymous-schema-274>
                creator_id:
                  type: string
                  description: >-
                    Public communications ID of the batch creator
                    (pseudonymous). When obscure_creator_id is enabled, other
                    users receive the shared placeholder
                    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                    (SHA-256 of empty input). The creator sees their normal ID.
                  x-parser-schema-id: <anonymous-schema-275>
                created_ts:
                  type: string
                  description: Timestamp when the RFQ batch was created
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-276>
                legs:
                  type: array
                  description: Distinct legs across the batch's combos, each listed once
                  items:
                    type: object
                    required:
                      - event_ticker
                      - market_ticker
                      - side
                    properties:
                      event_ticker:
                        type: string
                        description: Event ticker for the leg
                        x-parser-schema-id: <anonymous-schema-279>
                      market_ticker:
                        type: string
                        description: Market ticker for the leg
                        x-parser-schema-id: <anonymous-schema-280>
                      side:
                        type: string
                        enum:
                          - 'yes'
                          - 'no'
                        description: Side selected for the leg
                        x-parser-schema-id: <anonymous-schema-281>
                      yes_settlement_value_dollars:
                        type: string
                        description: >-
                          Yes settlement value in dollars for the leg. Omitted
                          when unavailable.
                        x-rust-type: common::types::Price
                        x-rust-serialize-with: ws::dto::serde_money::serialize_option_price_dollars
                        x-parser-schema-id: <anonymous-schema-282>
                    x-parser-schema-id: <anonymous-schema-278>
                  x-parser-schema-id: <anonymous-schema-277>
                rfqs:
                  type: array
                  description: The child RFQs, in the order they were requested
                  items:
                    type: object
                    required:
                      - id
                      - market_ticker
                      - leg_indices
                    properties:
                      id:
                        type: string
                        description: Unique identifier for the child RFQ
                        x-parser-schema-id: <anonymous-schema-285>
                      market_ticker:
                        type: string
                        description: Combo market ticker of the child RFQ
                        x-parser-schema-id: <anonymous-schema-286>
                      event_ticker:
                        type: string
                        description: Event ticker (optional)
                        x-parser-schema-id: <anonymous-schema-287>
                      contracts_fp:
                        type: string
                        description: >-
                          Fixed-point contracts requested (2 decimals)
                          (optional)
                        x-rust-type: i64
                        x-rust-serialize-with: >-
                          ws::dto::serde_money::serialize_optional_centicount_fixed_point_count
                        x-parser-schema-id: <anonymous-schema-288>
                      target_cost_dollars:
                        type: string
                        description: Target cost in dollars (optional)
                        x-rust-type: common::types::Value
                        x-rust-serialize-with: ws::dto::serde_money::serialize_option_value_dollars
                        x-parser-schema-id: <anonymous-schema-289>
                      mve_collection_ticker:
                        type: string
                        description: Multivariate event collection ticker (optional)
                        x-parser-schema-id: <anonymous-schema-290>
                      leg_indices:
                        type: array
                        description: Indexes into legs of this combo's legs
                        items:
                          type: integer
                          x-parser-schema-id: <anonymous-schema-292>
                        x-parser-schema-id: <anonymous-schema-291>
                    x-parser-schema-id: <anonymous-schema-284>
                  x-parser-schema-id: <anonymous-schema-283>
              x-parser-schema-id: <anonymous-schema-273>
            sending_ts_ms: *ref_2
          x-parser-schema-id: rfqBatchCreatedPayload
        title: RFQ Batch Created
        description: Notification when an RFQ batch is created
        example: |-
          {
            "type": "rfq_batch_created",
            "sending_ts_ms": 1669149841234,
            "sid": 15,
            "seq": 16,
            "msg": {
              "id": "rfq_batch_123",
              "creator_id": "43fc3733603f4830a8c3b2986011a5f78d67b03b473dbfd3a3847abd85b63a51",
              "created_ts": "2024-12-01T10:00:00Z",
              "legs": [
                {
                  "event_ticker": "KXEVENTA-24DEC",
                  "market_ticker": "KXEVENTA-24DEC-YES",
                  "side": "yes"
                },
                {
                  "event_ticker": "KXEVENTB-24DEC",
                  "market_ticker": "KXEVENTB-24DEC-YES",
                  "side": "yes"
                },
                {
                  "event_ticker": "KXEVENTC-24DEC",
                  "market_ticker": "KXEVENTC-24DEC-YES",
                  "side": "no"
                }
              ],
              "rfqs": [
                {
                  "id": "rfq_456",
                  "market_ticker": "KXMVE-24DEC-COMBO-AB",
                  "event_ticker": "KXMVE-24DEC-EVENT-AB",
                  "target_cost_dollars": "5.0000",
                  "mve_collection_ticker": "KXMVE-24DEC",
                  "leg_indices": [
                    0,
                    1
                  ]
                },
                {
                  "id": "rfq_457",
                  "market_ticker": "KXMVE-24DEC-COMBO-AC",
                  "event_ticker": "KXMVE-24DEC-EVENT-AC",
                  "target_cost_dollars": "5.0000",
                  "mve_collection_ticker": "KXMVE-24DEC",
                  "leg_indices": [
                    0,
                    2
                  ]
                }
              ]
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: rfqBatchCreated
    bindings: []
    extensions: *ref_3
  - &ref_10
    id: receiveRFQBatchDeleted
    title: RFQ Batch Deleted
    description: Receive RFQ batch deleted notifications
    type: send
    messages:
      - &ref_22
        id: rfqBatchDeleted
        contentType: application/json
        payload:
          - name: RFQ Batch Deleted
            description: Notification when an RFQ batch closes
            type: object
            properties:
              - name: type
                type: string
                description: rfq_batch_deleted
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
                  - name: id
                    type: string
                    description: Unique identifier for the RFQ batch
                    required: true
                  - name: creator_id
                    type: string
                    description: >-
                      Public communications ID of the batch creator, obscured as
                      in rfq_batch_created
                    required: true
                  - name: rfq_ids
                    type: array
                    description: The child RFQs, which closed with the batch
                    required: true
                    properties:
                      - name: item
                        type: string
                        required: false
                  - name: deleted_ts
                    type: string
                    description: Timestamp when the RFQ batch closed
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
              const: rfq_batch_deleted
              x-parser-schema-id: <anonymous-schema-293>
            sid: *ref_0
            seq: *ref_1
            msg:
              type: object
              required:
                - id
                - creator_id
                - rfq_ids
                - deleted_ts
              properties:
                id:
                  type: string
                  description: Unique identifier for the RFQ batch
                  x-parser-schema-id: <anonymous-schema-295>
                creator_id:
                  type: string
                  description: >-
                    Public communications ID of the batch creator, obscured as
                    in rfq_batch_created
                  x-parser-schema-id: <anonymous-schema-296>
                rfq_ids:
                  type: array
                  description: The child RFQs, which closed with the batch
                  items:
                    type: string
                    x-parser-schema-id: <anonymous-schema-298>
                  x-parser-schema-id: <anonymous-schema-297>
                deleted_ts:
                  type: string
                  description: Timestamp when the RFQ batch closed
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-299>
              x-parser-schema-id: <anonymous-schema-294>
            sending_ts_ms: *ref_2
          x-parser-schema-id: rfqBatchDeletedPayload
        title: RFQ Batch Deleted
        description: Notification when an RFQ batch closes
        example: |-
          {
            "type": "rfq_batch_deleted",
            "sending_ts_ms": 1669149841234,
            "sid": 15,
            "seq": 17,
            "msg": {
              "id": "rfq_batch_123",
              "creator_id": "43fc3733603f4830a8c3b2986011a5f78d67b03b473dbfd3a3847abd85b63a51",
              "rfq_ids": [
                "rfq_456",
                "rfq_457"
              ],
              "deleted_ts": "2024-12-01T10:05:00Z"
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: rfqBatchDeleted
    bindings: []
    extensions: *ref_3
  - &ref_11
    id: receiveBatchQuoteCreated
    title: Batch Quote Created
    description: Receive batch quote created notifications
    type: send
    messages:
      - &ref_23
        id: batchQuoteCreated
        contentType: application/json
        payload:
          - name: Batch Quote Created
            description: Notification when you create a batch quote on an RFQ batch
            type: object
            properties:
              - name: type
                type: string
                description: batch_quote_created
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
                  - name: batch_quote_id
                    type: string
                    description: Unique identifier for the batch quote
                    required: true
                  - name: rfq_batch_id
                    type: string
                    description: Identifier of the RFQ batch this batch quote prices
                    required: true
                  - name: quote_creator_id
                    type: string
                    description: Your public communications ID as the batch quote creator
                    required: true
                  - name: created_ts
                    type: string
                    description: Timestamp when the batch quote was created
                    required: true
                  - name: quotes
                    type: array
                    description: One quote per child RFQ
                    required: true
                    properties:
                      - name: quote_id
                        type: string
                        description: Identifier the child quote keeps if it wins the child
                        required: true
                      - name: rfq_id
                        type: string
                        description: Identifier of the child RFQ
                        required: true
                      - name: market_ticker
                        type: string
                        description: Combo market ticker of the child RFQ
                        required: true
                      - name: event_ticker
                        type: string
                        description: Event ticker (optional)
                        required: false
                      - name: yes_bid_dollars
                        type: string
                        description: Yes side bid price in dollars
                        required: true
                      - name: no_bid_dollars
                        type: string
                        description: No side bid price in dollars
                        required: true
                      - name: yes_contracts_offered_fp
                        type: string
                        description: >-
                          Fixed-point yes contracts offered (2 decimals)
                          (optional)
                        required: false
                      - name: no_contracts_offered_fp
                        type: string
                        description: >-
                          Fixed-point no contracts offered (2 decimals)
                          (optional)
                        required: false
                      - name: rfq_target_cost_dollars
                        type: string
                        description: Target cost from the child RFQ in dollars (optional)
                        required: false
                  - name: subaccount
                    type: integer
                    description: >
                      Optional - Present only when your batch quote used a
                      subaccount.

                      Contains your own subaccount number.
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
              const: batch_quote_created
              x-parser-schema-id: <anonymous-schema-300>
            sid: *ref_0
            seq: *ref_1
            msg:
              type: object
              required:
                - batch_quote_id
                - rfq_batch_id
                - quote_creator_id
                - created_ts
                - quotes
              properties:
                batch_quote_id:
                  type: string
                  description: Unique identifier for the batch quote
                  x-parser-schema-id: <anonymous-schema-302>
                rfq_batch_id:
                  type: string
                  description: Identifier of the RFQ batch this batch quote prices
                  x-parser-schema-id: <anonymous-schema-303>
                quote_creator_id:
                  type: string
                  description: Your public communications ID as the batch quote creator
                  x-parser-schema-id: <anonymous-schema-304>
                created_ts:
                  type: string
                  description: Timestamp when the batch quote was created
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-305>
                quotes:
                  type: array
                  description: One quote per child RFQ
                  items:
                    type: object
                    required:
                      - quote_id
                      - rfq_id
                      - market_ticker
                      - yes_bid_dollars
                      - no_bid_dollars
                    properties:
                      quote_id:
                        type: string
                        description: Identifier the child quote keeps if it wins the child
                        x-parser-schema-id: <anonymous-schema-308>
                      rfq_id:
                        type: string
                        description: Identifier of the child RFQ
                        x-parser-schema-id: <anonymous-schema-309>
                      market_ticker:
                        type: string
                        description: Combo market ticker of the child RFQ
                        x-parser-schema-id: <anonymous-schema-310>
                      event_ticker:
                        type: string
                        description: Event ticker (optional)
                        x-parser-schema-id: <anonymous-schema-311>
                      yes_bid_dollars:
                        type: string
                        description: Yes side bid price in dollars
                        x-rust-type: common::types::Price
                        x-rust-serialize-with: ws::dto::serde_money::serialize_price_dollars
                        x-parser-schema-id: <anonymous-schema-312>
                      no_bid_dollars:
                        type: string
                        description: No side bid price in dollars
                        x-rust-type: common::types::Price
                        x-rust-serialize-with: ws::dto::serde_money::serialize_price_dollars
                        x-parser-schema-id: <anonymous-schema-313>
                      yes_contracts_offered_fp:
                        type: string
                        description: >-
                          Fixed-point yes contracts offered (2 decimals)
                          (optional)
                        x-rust-type: i64
                        x-rust-serialize-with: >-
                          ws::dto::serde_money::serialize_optional_centicount_fixed_point_count
                        x-parser-schema-id: <anonymous-schema-314>
                      no_contracts_offered_fp:
                        type: string
                        description: >-
                          Fixed-point no contracts offered (2 decimals)
                          (optional)
                        x-rust-type: i64
                        x-rust-serialize-with: >-
                          ws::dto::serde_money::serialize_optional_centicount_fixed_point_count
                        x-parser-schema-id: <anonymous-schema-315>
                      rfq_target_cost_dollars:
                        type: string
                        description: Target cost from the child RFQ in dollars (optional)
                        x-rust-type: common::types::Value
                        x-rust-serialize-with: ws::dto::serde_money::serialize_option_value_dollars
                        x-parser-schema-id: <anonymous-schema-316>
                    x-parser-schema-id: <anonymous-schema-307>
                  x-parser-schema-id: <anonymous-schema-306>
                subaccount:
                  type: integer
                  description: >
                    Optional - Present only when your batch quote used a
                    subaccount.

                    Contains your own subaccount number.
                  x-parser-schema-id: <anonymous-schema-317>
              x-parser-schema-id: <anonymous-schema-301>
            sending_ts_ms: *ref_2
          x-parser-schema-id: batchQuoteCreatedPayload
        title: Batch Quote Created
        description: Notification when you create a batch quote on an RFQ batch
        example: |-
          {
            "type": "batch_quote_created",
            "sending_ts_ms": 1669149841234,
            "sid": 15,
            "seq": 18,
            "msg": {
              "batch_quote_id": "batch_quote_789",
              "rfq_batch_id": "rfq_batch_123",
              "quote_creator_id": "comm_def456",
              "created_ts": "2024-12-01T10:02:00Z",
              "quotes": [
                {
                  "quote_id": "quote_1",
                  "rfq_id": "rfq_456",
                  "market_ticker": "KXMVE-24DEC-COMBO-AB",
                  "event_ticker": "KXMVE-24DEC-EVENT-AB",
                  "yes_bid_dollars": "0.0000",
                  "no_bid_dollars": "0.7500",
                  "no_contracts_offered_fp": "20.00",
                  "rfq_target_cost_dollars": "5.0000"
                },
                {
                  "quote_id": "quote_2",
                  "rfq_id": "rfq_457",
                  "market_ticker": "KXMVE-24DEC-COMBO-AC",
                  "event_ticker": "KXMVE-24DEC-EVENT-AC",
                  "yes_bid_dollars": "0.0000",
                  "no_bid_dollars": "0.8000",
                  "no_contracts_offered_fp": "25.00",
                  "rfq_target_cost_dollars": "5.0000"
                }
              ],
              "subaccount": 2
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: batchQuoteCreated
    bindings: []
    extensions: *ref_3
  - &ref_12
    id: receiveRFQBatchBestQuotes
    title: RFQ Batch Best Quotes
    description: Receive the best quotes across makers on your RFQ batch
    type: send
    messages:
      - &ref_24
        id: rfqBatchBestQuotes
        contentType: application/json
        payload:
          - name: RFQ Batch Best Quotes
            description: The best quotes across makers on your RFQ batch
            type: object
            properties:
              - name: type
                type: string
                description: rfq_batch_best_quotes
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
                  - name: rfq_batch_id
                    type: string
                    description: Identifier of your RFQ batch
                    required: true
                  - name: client_batch_id
                    type: string
                    description: >-
                      The client_batch_id you gave when creating the batch.
                      Omitted when none was given.
                    required: false
                  - name: version
                    type: integer
                    description: >-
                      Increases with every snapshot of this batch. Apply a
                      snapshot only if its version is greater than the last one
                      you applied.
                    required: true
                  - name: updated_ts
                    type: string
                    description: Timestamp when a best bid last changed
                    required: true
                  - name: yes_complete
                    type: boolean
                    description: >-
                      Whether every child has a yes bid, so the batch can be
                      accepted on the yes side
                    required: true
                  - name: no_complete
                    type: boolean
                    description: >-
                      Whether every child has a no bid, so the batch can be
                      accepted on the no side
                    required: true
                  - name: rfqs
                    type: array
                    description: >-
                      One entry per child RFQ, in the order the children were
                      requested
                    required: true
                    properties:
                      - name: rfq_id
                        type: string
                        description: Identifier of the child RFQ
                        required: true
                      - name: market_ticker
                        type: string
                        description: Combo market ticker of the child RFQ
                        required: true
                      - name: event_ticker
                        type: string
                        description: Event ticker (optional)
                        required: false
                      - name: yes_bid_dollars
                        type: string
                        description: >-
                          Best yes bid across makers, in dollars. Omitted when
                          no maker bids yes on this child.
                        required: false
                      - name: no_bid_dollars
                        type: string
                        description: >-
                          Best no bid across makers, in dollars. Omitted when no
                          maker bids no on this child.
                        required: false
                      - name: contracts_fp
                        type: string
                        description: >-
                          Fixed-point contracts requested by the child RFQ (2
                          decimals). Omitted when the child is sized by target
                          cost.
                        required: false
                      - name: yes_contracts_offered_fp
                        type: string
                        description: >-
                          Fixed-point contracts the best yes bid offers (2
                          decimals). Omitted when no maker bids yes on this
                          child.
                        required: false
                      - name: no_contracts_offered_fp
                        type: string
                        description: >-
                          Fixed-point contracts the best no bid offers (2
                          decimals). Omitted when no maker bids no on this
                          child.
                        required: false
                      - name: rfq_target_cost_dollars
                        type: string
                        description: Target cost from the child RFQ in dollars (optional)
                        required: false
                  - name: subaccount
                    type: integer
                    description: >
                      Optional - Present only when your RFQ batch used a
                      subaccount.

                      Contains your own subaccount number.
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
              const: rfq_batch_best_quotes
              x-parser-schema-id: <anonymous-schema-318>
            sid: *ref_0
            seq: *ref_1
            msg:
              type: object
              required:
                - rfq_batch_id
                - version
                - updated_ts
                - yes_complete
                - no_complete
                - rfqs
              properties:
                rfq_batch_id:
                  type: string
                  description: Identifier of your RFQ batch
                  x-parser-schema-id: <anonymous-schema-320>
                client_batch_id:
                  type: string
                  description: >-
                    The client_batch_id you gave when creating the batch.
                    Omitted when none was given.
                  x-parser-schema-id: <anonymous-schema-321>
                version:
                  type: integer
                  format: int64
                  minimum: 1
                  description: >-
                    Increases with every snapshot of this batch. Apply a
                    snapshot only if its version is greater than the last one
                    you applied.
                  x-parser-schema-id: <anonymous-schema-322>
                updated_ts:
                  type: string
                  description: Timestamp when a best bid last changed
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-323>
                yes_complete:
                  type: boolean
                  description: >-
                    Whether every child has a yes bid, so the batch can be
                    accepted on the yes side
                  x-parser-schema-id: <anonymous-schema-324>
                no_complete:
                  type: boolean
                  description: >-
                    Whether every child has a no bid, so the batch can be
                    accepted on the no side
                  x-parser-schema-id: <anonymous-schema-325>
                rfqs:
                  type: array
                  description: >-
                    One entry per child RFQ, in the order the children were
                    requested
                  items:
                    type: object
                    required:
                      - rfq_id
                      - market_ticker
                    properties:
                      rfq_id:
                        type: string
                        description: Identifier of the child RFQ
                        x-parser-schema-id: <anonymous-schema-328>
                      market_ticker:
                        type: string
                        description: Combo market ticker of the child RFQ
                        x-parser-schema-id: <anonymous-schema-329>
                      event_ticker:
                        type: string
                        description: Event ticker (optional)
                        x-parser-schema-id: <anonymous-schema-330>
                      yes_bid_dollars:
                        type: string
                        description: >-
                          Best yes bid across makers, in dollars. Omitted when
                          no maker bids yes on this child.
                        x-rust-type: common::types::Price
                        x-rust-serialize-with: ws::dto::serde_money::serialize_option_price_dollars
                        x-parser-schema-id: <anonymous-schema-331>
                      no_bid_dollars:
                        type: string
                        description: >-
                          Best no bid across makers, in dollars. Omitted when no
                          maker bids no on this child.
                        x-rust-type: common::types::Price
                        x-rust-serialize-with: ws::dto::serde_money::serialize_option_price_dollars
                        x-parser-schema-id: <anonymous-schema-332>
                      contracts_fp:
                        type: string
                        description: >-
                          Fixed-point contracts requested by the child RFQ (2
                          decimals). Omitted when the child is sized by target
                          cost.
                        x-rust-type: i64
                        x-rust-serialize-with: >-
                          ws::dto::serde_money::serialize_optional_centicount_fixed_point_count
                        x-parser-schema-id: <anonymous-schema-333>
                      yes_contracts_offered_fp:
                        type: string
                        description: >-
                          Fixed-point contracts the best yes bid offers (2
                          decimals). Omitted when no maker bids yes on this
                          child.
                        x-rust-type: i64
                        x-rust-serialize-with: >-
                          ws::dto::serde_money::serialize_optional_centicount_fixed_point_count
                        x-parser-schema-id: <anonymous-schema-334>
                      no_contracts_offered_fp:
                        type: string
                        description: >-
                          Fixed-point contracts the best no bid offers (2
                          decimals). Omitted when no maker bids no on this
                          child.
                        x-rust-type: i64
                        x-rust-serialize-with: >-
                          ws::dto::serde_money::serialize_optional_centicount_fixed_point_count
                        x-parser-schema-id: <anonymous-schema-335>
                      rfq_target_cost_dollars:
                        type: string
                        description: Target cost from the child RFQ in dollars (optional)
                        x-rust-type: common::types::Value
                        x-rust-serialize-with: ws::dto::serde_money::serialize_option_value_dollars
                        x-parser-schema-id: <anonymous-schema-336>
                    x-parser-schema-id: <anonymous-schema-327>
                  x-parser-schema-id: <anonymous-schema-326>
                subaccount:
                  type: integer
                  description: >
                    Optional - Present only when your RFQ batch used a
                    subaccount.

                    Contains your own subaccount number.
                  x-parser-schema-id: <anonymous-schema-337>
              x-parser-schema-id: <anonymous-schema-319>
            sending_ts_ms: *ref_2
          x-parser-schema-id: rfqBatchBestQuotesPayload
        title: RFQ Batch Best Quotes
        description: The best quotes across makers on your RFQ batch
        example: |-
          {
            "type": "rfq_batch_best_quotes",
            "sending_ts_ms": 1669149841234,
            "sid": 15,
            "seq": 20,
            "msg": {
              "rfq_batch_id": "rfq_batch_123",
              "client_batch_id": "my_round_robin_1",
              "version": 7,
              "updated_ts": "2024-12-01T10:02:30Z",
              "yes_complete": false,
              "no_complete": true,
              "rfqs": [
                {
                  "rfq_id": "rfq_456",
                  "market_ticker": "KXMVE-24DEC-COMBO-AB",
                  "event_ticker": "KXMVE-24DEC-EVENT-AB",
                  "yes_bid_dollars": "0.2000",
                  "no_bid_dollars": "0.7500",
                  "yes_contracts_offered_fp": "6.25",
                  "no_contracts_offered_fp": "20.00",
                  "rfq_target_cost_dollars": "5.0000"
                },
                {
                  "rfq_id": "rfq_457",
                  "market_ticker": "KXMVE-24DEC-COMBO-AC",
                  "event_ticker": "KXMVE-24DEC-EVENT-AC",
                  "no_bid_dollars": "0.8000",
                  "no_contracts_offered_fp": "25.00",
                  "rfq_target_cost_dollars": "5.0000"
                }
              ]
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: rfqBatchBestQuotes
    bindings: []
    extensions: *ref_3
  - &ref_13
    id: receiveBatchQuoteAccepted
    title: Batch Quote Accepted
    description: Receive batch quote accepted notifications
    type: send
    messages:
      - &ref_25
        id: batchQuoteAccepted
        contentType: application/json
        payload:
          - name: Batch Quote Accepted
            description: >-
              Notification when your batch quote wins children of an accepted
              RFQ batch
            type: object
            properties:
              - name: type
                type: string
                description: batch_quote_accepted
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
                  - name: batch_quote_id
                    type: string
                    description: >-
                      Identifier of your batch quote. Confirm the children you
                      won with it.
                    required: true
                  - name: rfq_batch_id
                    type: string
                    description: Identifier of the RFQ batch
                    required: true
                  - name: quote_creator_id
                    type: string
                    description: Your public communications ID as the batch quote creator
                    required: true
                  - name: rfq_creator_id
                    type: string
                    description: >-
                      Public communications ID of the RFQ batch creator,
                      obscured as in quote_accepted
                    required: true
                  - name: accepted_side
                    type: string
                    description: >-
                      Which side the RFQ batch creator accepted on every child
                      (yes/no)
                    enumValues:
                      - 'yes'
                      - 'no'
                    required: true
                  - name: accepted_ts
                    type: string
                    description: Timestamp when the RFQ batch was accepted
                    required: true
                  - name: quotes
                    type: array
                    description: >-
                      Only the children you won, each with your accepted quote.
                      Other children went to other makers.
                    required: true
                    properties:
                      - name: quote_id
                        type: string
                        description: Identifier of the accepted child quote
                        required: true
                      - name: rfq_id
                        type: string
                        description: Identifier of the child RFQ
                        required: true
                      - name: market_ticker
                        type: string
                        description: Combo market ticker of the child RFQ
                        required: true
                      - name: event_ticker
                        type: string
                        description: Event ticker (optional)
                        required: false
                      - name: yes_bid_dollars
                        type: string
                        description: Yes side bid price in dollars
                        required: true
                      - name: no_bid_dollars
                        type: string
                        description: No side bid price in dollars
                        required: true
                      - name: contracts_accepted_fp
                        type: string
                        description: >-
                          Fixed-point contracts requested by the child RFQ (2
                          decimals) (optional)
                        required: false
                      - name: yes_contracts_offered_fp
                        type: string
                        description: >-
                          Fixed-point yes contracts offered (2 decimals)
                          (optional)
                        required: false
                      - name: no_contracts_offered_fp
                        type: string
                        description: >-
                          Fixed-point no contracts offered (2 decimals)
                          (optional)
                        required: false
                      - name: rfq_target_cost_dollars
                        type: string
                        description: Target cost from the child RFQ in dollars (optional)
                        required: false
                  - name: subaccount
                    type: integer
                    description: >
                      Optional - Present only when your batch quote used a
                      subaccount.

                      Contains your own subaccount number; the counterparty's
                      subaccount is never shared.
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
              const: batch_quote_accepted
              x-parser-schema-id: <anonymous-schema-338>
            sid: *ref_0
            seq: *ref_1
            msg:
              type: object
              required:
                - batch_quote_id
                - rfq_batch_id
                - quote_creator_id
                - rfq_creator_id
                - accepted_side
                - accepted_ts
                - quotes
              properties:
                batch_quote_id:
                  type: string
                  description: >-
                    Identifier of your batch quote. Confirm the children you won
                    with it.
                  x-parser-schema-id: <anonymous-schema-340>
                rfq_batch_id:
                  type: string
                  description: Identifier of the RFQ batch
                  x-parser-schema-id: <anonymous-schema-341>
                quote_creator_id:
                  type: string
                  description: Your public communications ID as the batch quote creator
                  x-parser-schema-id: <anonymous-schema-342>
                rfq_creator_id:
                  type: string
                  description: >-
                    Public communications ID of the RFQ batch creator, obscured
                    as in quote_accepted
                  x-parser-schema-id: <anonymous-schema-343>
                accepted_side:
                  type: string
                  description: >-
                    Which side the RFQ batch creator accepted on every child
                    (yes/no)
                  enum:
                    - 'yes'
                    - 'no'
                  x-parser-schema-id: <anonymous-schema-344>
                accepted_ts:
                  type: string
                  description: Timestamp when the RFQ batch was accepted
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-345>
                quotes:
                  type: array
                  description: >-
                    Only the children you won, each with your accepted quote.
                    Other children went to other makers.
                  items:
                    type: object
                    required:
                      - quote_id
                      - rfq_id
                      - market_ticker
                      - yes_bid_dollars
                      - no_bid_dollars
                    properties:
                      quote_id:
                        type: string
                        description: Identifier of the accepted child quote
                        x-parser-schema-id: <anonymous-schema-348>
                      rfq_id:
                        type: string
                        description: Identifier of the child RFQ
                        x-parser-schema-id: <anonymous-schema-349>
                      market_ticker:
                        type: string
                        description: Combo market ticker of the child RFQ
                        x-parser-schema-id: <anonymous-schema-350>
                      event_ticker:
                        type: string
                        description: Event ticker (optional)
                        x-parser-schema-id: <anonymous-schema-351>
                      yes_bid_dollars:
                        type: string
                        description: Yes side bid price in dollars
                        x-rust-type: common::types::Price
                        x-rust-serialize-with: ws::dto::serde_money::serialize_price_dollars
                        x-parser-schema-id: <anonymous-schema-352>
                      no_bid_dollars:
                        type: string
                        description: No side bid price in dollars
                        x-rust-type: common::types::Price
                        x-rust-serialize-with: ws::dto::serde_money::serialize_price_dollars
                        x-parser-schema-id: <anonymous-schema-353>
                      contracts_accepted_fp:
                        type: string
                        description: >-
                          Fixed-point contracts requested by the child RFQ (2
                          decimals) (optional)
                        x-rust-type: i64
                        x-rust-serialize-with: >-
                          ws::dto::serde_money::serialize_optional_centicount_fixed_point_count
                        x-parser-schema-id: <anonymous-schema-354>
                      yes_contracts_offered_fp:
                        type: string
                        description: >-
                          Fixed-point yes contracts offered (2 decimals)
                          (optional)
                        x-rust-type: i64
                        x-rust-serialize-with: >-
                          ws::dto::serde_money::serialize_optional_centicount_fixed_point_count
                        x-parser-schema-id: <anonymous-schema-355>
                      no_contracts_offered_fp:
                        type: string
                        description: >-
                          Fixed-point no contracts offered (2 decimals)
                          (optional)
                        x-rust-type: i64
                        x-rust-serialize-with: >-
                          ws::dto::serde_money::serialize_optional_centicount_fixed_point_count
                        x-parser-schema-id: <anonymous-schema-356>
                      rfq_target_cost_dollars:
                        type: string
                        description: Target cost from the child RFQ in dollars (optional)
                        x-rust-type: common::types::Value
                        x-rust-serialize-with: ws::dto::serde_money::serialize_option_value_dollars
                        x-parser-schema-id: <anonymous-schema-357>
                    x-parser-schema-id: <anonymous-schema-347>
                  x-parser-schema-id: <anonymous-schema-346>
                subaccount:
                  type: integer
                  description: >
                    Optional - Present only when your batch quote used a
                    subaccount.

                    Contains your own subaccount number; the counterparty's
                    subaccount is never shared.
                  x-parser-schema-id: <anonymous-schema-358>
              x-parser-schema-id: <anonymous-schema-339>
            sending_ts_ms: *ref_2
          x-parser-schema-id: batchQuoteAcceptedPayload
        title: Batch Quote Accepted
        description: >-
          Notification when your batch quote wins children of an accepted RFQ
          batch
        example: |-
          {
            "type": "batch_quote_accepted",
            "sending_ts_ms": 1669149841234,
            "sid": 15,
            "seq": 19,
            "msg": {
              "batch_quote_id": "batch_quote_789",
              "rfq_batch_id": "rfq_batch_123",
              "quote_creator_id": "comm_def456",
              "rfq_creator_id": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
              "accepted_side": "no",
              "accepted_ts": "2024-12-01T10:03:00Z",
              "quotes": [
                {
                  "quote_id": "quote_2",
                  "rfq_id": "rfq_457",
                  "market_ticker": "KXMVE-24DEC-COMBO-AC",
                  "yes_bid_dollars": "0.0000",
                  "no_bid_dollars": "0.8000",
                  "no_contracts_offered_fp": "25.00",
                  "rfq_target_cost_dollars": "5.0000"
                }
              ],
              "subaccount": 2
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: batchQuoteAccepted
    bindings: []
    extensions: *ref_3
  - &ref_14
    id: receiveRFQBatchExecuted
    title: RFQ Batch Executed
    description: Receive RFQ batch executed notifications
    type: send
    messages:
      - &ref_26
        id: rfqBatchExecuted
        contentType: application/json
        payload:
          - name: RFQ Batch Executed
            description: Notification when your accepted RFQ batch has executed or failed
            type: object
            properties:
              - name: type
                type: string
                description: rfq_batch_executed
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
                  - name: rfq_batch_id
                    type: string
                    description: Identifier of your RFQ batch
                    required: true
                  - name: client_batch_id
                    type: string
                    description: >-
                      The client_batch_id you gave when creating the batch.
                      Omitted when none was given.
                    required: false
                  - name: rfq_creator_id
                    type: string
                    description: Your public communications ID as the RFQ batch creator
                    required: true
                  - name: executed_rfq_ids
                    type: array
                    description: Child RFQs whose trades executed
                    required: true
                    properties:
                      - name: item
                        type: string
                        required: false
                  - name: failed_rfq_ids
                    type: array
                    description: Child RFQs whose trades failed to execute
                    required: true
                    properties:
                      - name: item
                        type: string
                        required: false
                  - name: executed_ts
                    type: string
                    description: Timestamp when the last child finished
                    required: true
                  - name: close_reason
                    type: string
                    description: >-
                      How the batch ended. `executed` when every child executed,
                      `execution failed` when none did, and `partially executed`
                      in the rare case that filling one child cancelled a maker
                      order another child needed.
                    required: true
                  - name: subaccount
                    type: integer
                    description: >
                      Optional - Present only when your RFQ batch used a
                      subaccount.

                      Contains your own subaccount number.
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
              const: rfq_batch_executed
              x-parser-schema-id: <anonymous-schema-359>
            sid: *ref_0
            seq: *ref_1
            msg:
              type: object
              required:
                - rfq_batch_id
                - rfq_creator_id
                - executed_rfq_ids
                - failed_rfq_ids
                - executed_ts
                - close_reason
              properties:
                rfq_batch_id:
                  type: string
                  description: Identifier of your RFQ batch
                  x-parser-schema-id: <anonymous-schema-361>
                client_batch_id:
                  type: string
                  description: >-
                    The client_batch_id you gave when creating the batch.
                    Omitted when none was given.
                  x-parser-schema-id: <anonymous-schema-362>
                rfq_creator_id:
                  type: string
                  description: Your public communications ID as the RFQ batch creator
                  x-parser-schema-id: <anonymous-schema-363>
                executed_rfq_ids:
                  type: array
                  description: Child RFQs whose trades executed
                  items:
                    type: string
                    x-parser-schema-id: <anonymous-schema-365>
                  x-parser-schema-id: <anonymous-schema-364>
                failed_rfq_ids:
                  type: array
                  description: Child RFQs whose trades failed to execute
                  items:
                    type: string
                    x-parser-schema-id: <anonymous-schema-367>
                  x-parser-schema-id: <anonymous-schema-366>
                executed_ts:
                  type: string
                  description: Timestamp when the last child finished
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-368>
                close_reason:
                  type: string
                  description: >-
                    How the batch ended. `executed` when every child executed,
                    `execution failed` when none did, and `partially executed`
                    in the rare case that filling one child cancelled a maker
                    order another child needed.
                  x-parser-schema-id: <anonymous-schema-369>
                subaccount:
                  type: integer
                  description: >
                    Optional - Present only when your RFQ batch used a
                    subaccount.

                    Contains your own subaccount number.
                  x-parser-schema-id: <anonymous-schema-370>
              x-parser-schema-id: <anonymous-schema-360>
            sending_ts_ms: *ref_2
          x-parser-schema-id: rfqBatchExecutedPayload
        title: RFQ Batch Executed
        description: Notification when your accepted RFQ batch has executed or failed
        example: |-
          {
            "type": "rfq_batch_executed",
            "sending_ts_ms": 1669149841234,
            "sid": 15,
            "seq": 22,
            "msg": {
              "rfq_batch_id": "rfq_batch_123",
              "client_batch_id": "my_round_robin_1",
              "rfq_creator_id": "43fc3733603f4830a8c3b2986011a5f78d67b03b473dbfd3a3847abd85b63a51",
              "executed_rfq_ids": [
                "rfq_456",
                "rfq_457"
              ],
              "failed_rfq_ids": [],
              "executed_ts": "2024-12-01T10:03:05Z",
              "close_reason": "executed"
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: rfqBatchExecuted
    bindings: []
    extensions: *ref_3
  - &ref_15
    id: receiveBatchQuoteExecuted
    title: Batch Quote Executed
    description: Receive batch quote executed notifications
    type: send
    messages:
      - &ref_27
        id: batchQuoteExecuted
        contentType: application/json
        payload:
          - name: Batch Quote Executed
            description: >-
              Notification when the RFQ batch your batch quote won children of
              has executed or failed
            type: object
            properties:
              - name: type
                type: string
                description: batch_quote_executed
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
                  - name: batch_quote_id
                    type: string
                    description: Identifier of your batch quote
                    required: true
                  - name: rfq_batch_id
                    type: string
                    description: Identifier of the RFQ batch
                    required: true
                  - name: rfq_creator_id
                    type: string
                    description: >-
                      Public communications ID of the RFQ batch creator. When
                      the creator obscured their ID, it is revealed only if at
                      least one of your children executed.
                    required: true
                  - name: executed_rfq_ids
                    type: array
                    description: Your children whose trades executed
                    required: true
                    properties:
                      - name: item
                        type: string
                        required: false
                  - name: failed_rfq_ids
                    type: array
                    description: Your children whose trades failed to execute
                    required: true
                    properties:
                      - name: item
                        type: string
                        required: false
                  - name: executed_ts
                    type: string
                    description: Timestamp when the last child of the batch finished
                    required: true
                  - name: close_reason
                    type: string
                    description: >-
                      How your children ended. `executed` when every one
                      executed, `execution failed` when none did, and `partially
                      executed` in the rare case that filling one child of the
                      batch cancelled a maker order another child needed.
                    required: true
                  - name: subaccount
                    type: integer
                    description: >
                      Optional - Present only when your batch quote used a
                      subaccount.

                      Contains your own subaccount number; the counterparty's
                      subaccount is never shared.
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
              const: batch_quote_executed
              x-parser-schema-id: <anonymous-schema-371>
            sid: *ref_0
            seq: *ref_1
            msg:
              type: object
              required:
                - batch_quote_id
                - rfq_batch_id
                - rfq_creator_id
                - executed_rfq_ids
                - failed_rfq_ids
                - executed_ts
                - close_reason
              properties:
                batch_quote_id:
                  type: string
                  description: Identifier of your batch quote
                  x-parser-schema-id: <anonymous-schema-373>
                rfq_batch_id:
                  type: string
                  description: Identifier of the RFQ batch
                  x-parser-schema-id: <anonymous-schema-374>
                rfq_creator_id:
                  type: string
                  description: >-
                    Public communications ID of the RFQ batch creator. When the
                    creator obscured their ID, it is revealed only if at least
                    one of your children executed.
                  x-parser-schema-id: <anonymous-schema-375>
                executed_rfq_ids:
                  type: array
                  description: Your children whose trades executed
                  items:
                    type: string
                    x-parser-schema-id: <anonymous-schema-377>
                  x-parser-schema-id: <anonymous-schema-376>
                failed_rfq_ids:
                  type: array
                  description: Your children whose trades failed to execute
                  items:
                    type: string
                    x-parser-schema-id: <anonymous-schema-379>
                  x-parser-schema-id: <anonymous-schema-378>
                executed_ts:
                  type: string
                  description: Timestamp when the last child of the batch finished
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-380>
                close_reason:
                  type: string
                  description: >-
                    How your children ended. `executed` when every one executed,
                    `execution failed` when none did, and `partially executed`
                    in the rare case that filling one child of the batch
                    cancelled a maker order another child needed.
                  x-parser-schema-id: <anonymous-schema-381>
                subaccount:
                  type: integer
                  description: >
                    Optional - Present only when your batch quote used a
                    subaccount.

                    Contains your own subaccount number; the counterparty's
                    subaccount is never shared.
                  x-parser-schema-id: <anonymous-schema-382>
              x-parser-schema-id: <anonymous-schema-372>
            sending_ts_ms: *ref_2
          x-parser-schema-id: batchQuoteExecutedPayload
        title: Batch Quote Executed
        description: >-
          Notification when the RFQ batch your batch quote won children of has
          executed or failed
        example: |-
          {
            "type": "batch_quote_executed",
            "sending_ts_ms": 1669149841234,
            "sid": 15,
            "seq": 23,
            "msg": {
              "batch_quote_id": "batch_quote_789",
              "rfq_batch_id": "rfq_batch_123",
              "rfq_creator_id": "43fc3733603f4830a8c3b2986011a5f78d67b03b473dbfd3a3847abd85b63a51",
              "executed_rfq_ids": [
                "rfq_457"
              ],
              "failed_rfq_ids": [],
              "executed_ts": "2024-12-01T10:03:05Z",
              "close_reason": "executed",
              "subaccount": 2
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: batchQuoteExecuted
    bindings: []
    extensions: *ref_3
sendOperations: []
receiveOperations:
  - *ref_4
  - *ref_5
  - *ref_6
  - *ref_7
  - *ref_8
  - *ref_9
  - *ref_10
  - *ref_11
  - *ref_12
  - *ref_13
  - *ref_14
  - *ref_15
sendMessages: []
receiveMessages:
  - *ref_16
  - *ref_17
  - *ref_18
  - *ref_19
  - *ref_20
  - *ref_21
  - *ref_22
  - *ref_23
  - *ref_24
  - *ref_25
  - *ref_26
  - *ref_27
extensions:
  - id: x-parser-unique-object-id
    value: communications
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