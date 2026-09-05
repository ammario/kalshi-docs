---
url: https://docs.kalshi.com/websockets/communications
lastmod: 2026-06-29T20:53:05.774Z
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
- RFQ events (RFQCreated, RFQDeleted) always sent
- Quote events (QuoteCreated, QuoteAccepted, QuoteExecuted) are only sent if you created the quote OR you created the RFQ

**Use case:** Tracking RFQs you create and quotes on your RFQs, or quotes you create on others' RFQs. Use QuoteExecuted to correlate fill messages with quotes via client_order_id.




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
  - RFQ events (RFQCreated, RFQDeleted) always sent

  - Quote events (QuoteCreated, QuoteAccepted, QuoteExecuted) are only sent if
  you created the quote OR you created the RFQ


  **Use case:** Tracking RFQs you create and quotes on your RFQs, or quotes you
  create on others' RFQs. Use QuoteExecuted to correlate fill messages with
  quotes via client_order_id.
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
  - &ref_3
    id: receiveRFQCreated
    title: RFQ Created
    description: Receive RFQ created notifications
    type: send
    messages:
      - &ref_8
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
                      Public communications ID of the RFQ creator (anonymized).
                      Currently empty for rfq_created events.
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
                    Public communications ID of the RFQ creator (anonymized).
                    Currently empty for rfq_created events.
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
                  x-parser-schema-id: <anonymous-schema-210>
                target_cost_dollars:
                  type: string
                  description: Target cost in dollars (optional)
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
                        x-parser-schema-id: <anonymous-schema-219>
                    x-parser-schema-id: <anonymous-schema-215>
                  x-parser-schema-id: <anonymous-schema-214>
              x-parser-schema-id: <anonymous-schema-205>
          x-parser-schema-id: rfqCreatedPayload
        title: RFQ Created
        description: Notification when an RFQ is created
        example: |-
          {
            "type": "rfq_created",
            "sid": 15,
            "seq": 11,
            "msg": {
              "id": "rfq_123",
              "creator_id": "",
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
    extensions: &ref_2
      - id: x-parser-unique-object-id
        value: communications
  - &ref_4
    id: receiveRFQDeleted
    title: RFQ Deleted
    description: Receive RFQ deleted notifications
    type: send
    messages:
      - &ref_9
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
                    description: Public communications ID of the RFQ creator (anonymized)
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
                  description: Public communications ID of the RFQ creator (anonymized)
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
                  x-parser-schema-id: <anonymous-schema-226>
                target_cost_dollars:
                  type: string
                  description: Target cost in dollars (optional)
                  x-parser-schema-id: <anonymous-schema-227>
                deleted_ts:
                  type: string
                  description: Timestamp when the RFQ was deleted
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-228>
              x-parser-schema-id: <anonymous-schema-221>
          x-parser-schema-id: rfqDeletedPayload
        title: RFQ Deleted
        description: Notification when an RFQ is deleted
        example: |-
          {
            "type": "rfq_deleted",
            "sid": 15,
            "seq": 12,
            "msg": {
              "id": "rfq_123",
              "creator_id": "comm_abc123",
              "market_ticker": "FED-23DEC-T3.00",
              "event_ticker": "FED-23DEC",
              "contracts_fp": "100.00",
              "target_cost_dollars": "0.35",
              "deleted_ts": "2024-12-01T10:05:00Z"
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: rfqDeleted
    bindings: []
    extensions: *ref_2
  - &ref_5
    id: receiveQuoteCreated
    title: Quote Created
    description: Receive quote created notifications
    type: send
    messages:
      - &ref_10
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
                    description: Public communications ID of the RFQ creator (anonymized)
                    required: false
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
                  description: Public communications ID of the RFQ creator (anonymized)
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
                  x-parser-schema-id: <anonymous-schema-237>
                no_bid_dollars:
                  type: string
                  description: No side bid price in dollars
                  x-parser-schema-id: <anonymous-schema-238>
                yes_contracts_offered_fp:
                  type: string
                  description: Fixed-point yes contracts offered (2 decimals) (optional)
                  x-parser-schema-id: <anonymous-schema-239>
                no_contracts_offered_fp:
                  type: string
                  description: Fixed-point no contracts offered (2 decimals) (optional)
                  x-parser-schema-id: <anonymous-schema-240>
                rfq_target_cost_dollars:
                  type: string
                  description: Target cost from the RFQ in dollars (optional)
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
          x-parser-schema-id: quoteCreatedPayload
        title: Quote Created
        description: Notification when a quote is created on an RFQ
        example: |-
          {
            "type": "quote_created",
            "sid": 15,
            "seq": 13,
            "msg": {
              "quote_id": "quote_456",
              "rfq_id": "rfq_123",
              "quote_creator_id": "comm_def456",
              "rfq_creator_id": "comm_abc123",
              "market_ticker": "FED-23DEC-T3.00",
              "event_ticker": "FED-23DEC",
              "yes_bid_dollars": "0.35",
              "no_bid_dollars": "0.65",
              "yes_contracts_offered_fp": "100.00",
              "no_contracts_offered_fp": "200.00",
              "rfq_target_cost_dollars": "0.35",
              "created_ts": "2024-12-01T10:02:00Z",
              "subaccount": 3
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: quoteCreated
    bindings: []
    extensions: *ref_2
  - &ref_6
    id: receiveQuoteAccepted
    title: Quote Accepted
    description: Receive quote accepted notifications
    type: send
    messages:
      - &ref_11
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
                    description: Public communications ID of the RFQ creator (anonymized)
                    required: false
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
                  description: Public communications ID of the RFQ creator (anonymized)
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
                  x-parser-schema-id: <anonymous-schema-252>
                no_bid_dollars:
                  type: string
                  description: No side bid price in dollars
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
                  x-parser-schema-id: <anonymous-schema-255>
                yes_contracts_offered_fp:
                  type: string
                  description: Fixed-point yes contracts offered (2 decimals) (optional)
                  x-parser-schema-id: <anonymous-schema-256>
                no_contracts_offered_fp:
                  type: string
                  description: Fixed-point no contracts offered (2 decimals) (optional)
                  x-parser-schema-id: <anonymous-schema-257>
                rfq_target_cost_dollars:
                  type: string
                  description: Target cost from the RFQ in dollars (optional)
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
          x-parser-schema-id: quoteAcceptedPayload
        title: Quote Accepted
        description: Notification when a quote is accepted
        example: |-
          {
            "type": "quote_accepted",
            "sid": 15,
            "seq": 14,
            "msg": {
              "quote_id": "quote_456",
              "rfq_id": "rfq_123",
              "quote_creator_id": "comm_def456",
              "rfq_creator_id": "comm_abc123",
              "market_ticker": "FED-23DEC-T3.00",
              "event_ticker": "FED-23DEC",
              "yes_bid_dollars": "0.35",
              "no_bid_dollars": "0.65",
              "accepted_side": "yes",
              "contracts_accepted_fp": "50.00",
              "yes_contracts_offered_fp": "100.00",
              "no_contracts_offered_fp": "200.00",
              "rfq_target_cost_dollars": "0.35",
              "subaccount": 3
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: quoteAccepted
    bindings: []
    extensions: *ref_2
  - &ref_7
    id: receiveQuoteExecuted
    title: Quote Executed
    description: >-
      Receive quote executed notifications with order details for fill
      correlation
    type: send
    messages:
      - &ref_12
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
              x-parser-schema-id: <anonymous-schema-261>
          x-parser-schema-id: quoteExecutedPayload
        title: Quote Executed
        description: Notification when a quote is executed and orders are placed
        example: |-
          {
            "type": "quote_executed",
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
    extensions: *ref_2
sendOperations: []
receiveOperations:
  - *ref_3
  - *ref_4
  - *ref_5
  - *ref_6
  - *ref_7
sendMessages: []
receiveMessages:
  - *ref_8
  - *ref_9
  - *ref_10
  - *ref_11
  - *ref_12
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