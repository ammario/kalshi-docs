---
url: https://docs.kalshi.com/websockets/communications
lastmod: 2026-05-06T00:22:37.290Z
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
  - `shard_factor` (1-100) and `shard_key` (0 <= key < shard_factor)
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
    - `shard_factor` (1-100) and `shard_key` (0 <= key < shard_factor)
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
  - &ref_2
    id: receiveRFQCreated
    title: RFQ Created
    description: Receive RFQ created notifications
    type: send
    messages:
      - &ref_7
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
              - name: msg
                type: object
                required: true
                properties:
                  - name: id
                    type: string
                    description: Unique identifier for the RFQ
                    required: false
                  - name: creator_id
                    type: string
                    description: >-
                      Public communications ID of the RFQ creator (anonymized).
                      Currently empty for rfq_created events.
                    required: false
                  - name: market_ticker
                    type: string
                    description: Market ticker for the RFQ
                    required: false
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
                    required: false
                  - name: mve_collection_ticker
                    type: string
                    description: Multivariate event collection ticker (optional)
                    required: false
                  - name: mve_selected_legs
                    type: array
                    description: Selected legs for multivariate events (optional)
                    required: false
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
              const: rfq_created
              x-parser-schema-id: <anonymous-schema-155>
            sid: &ref_0
              type: integer
              description: >-
                Server-generated subscription identifier (sid) used to identify
                the channel
              minimum: 1
              x-parser-schema-id: subscriptionId
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
                  x-parser-schema-id: <anonymous-schema-157>
                creator_id:
                  type: string
                  description: >-
                    Public communications ID of the RFQ creator (anonymized).
                    Currently empty for rfq_created events.
                  x-parser-schema-id: <anonymous-schema-158>
                market_ticker:
                  type: string
                  description: Market ticker for the RFQ
                  x-parser-schema-id: <anonymous-schema-159>
                event_ticker:
                  type: string
                  description: Event ticker (optional)
                  x-parser-schema-id: <anonymous-schema-160>
                contracts_fp:
                  type: string
                  description: Fixed-point contracts requested (2 decimals) (optional)
                  x-parser-schema-id: <anonymous-schema-161>
                target_cost_dollars:
                  type: string
                  description: Target cost in dollars (optional)
                  x-parser-schema-id: <anonymous-schema-162>
                created_ts:
                  type: string
                  description: Timestamp when the RFQ was created
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-163>
                mve_collection_ticker:
                  type: string
                  description: Multivariate event collection ticker (optional)
                  x-parser-schema-id: <anonymous-schema-164>
                mve_selected_legs:
                  type: array
                  description: Selected legs for multivariate events (optional)
                  items:
                    type: object
                    properties:
                      event_ticker:
                        type: string
                        x-parser-schema-id: <anonymous-schema-167>
                      market_ticker:
                        type: string
                        x-parser-schema-id: <anonymous-schema-168>
                      side:
                        type: string
                        x-parser-schema-id: <anonymous-schema-169>
                      yes_settlement_value_dollars:
                        type: string
                        description: >-
                          Yes settlement value in dollars for the selected leg
                          (optional)
                        x-parser-schema-id: <anonymous-schema-170>
                    x-parser-schema-id: <anonymous-schema-166>
                  x-parser-schema-id: <anonymous-schema-165>
              x-parser-schema-id: <anonymous-schema-156>
          x-parser-schema-id: rfqCreatedPayload
        title: RFQ Created
        description: Notification when an RFQ is created
        example: |-
          {
            "type": "rfq_created",
            "sid": 15,
            "msg": {
              "id": "rfq_123",
              "creator_id": "",
              "market_ticker": "FED-23DEC-T3.00",
              "event_ticker": "FED-23DEC",
              "contracts_fp": "100.00",
              "target_cost_dollars": "0.35",
              "created_ts": "2024-12-01T10:00:00Z"
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: rfqCreated
    bindings: []
    extensions: &ref_1
      - id: x-parser-unique-object-id
        value: communications
  - &ref_3
    id: receiveRFQDeleted
    title: RFQ Deleted
    description: Receive RFQ deleted notifications
    type: send
    messages:
      - &ref_8
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
              - name: msg
                type: object
                required: true
                properties:
                  - name: id
                    type: string
                    description: Unique identifier for the RFQ
                    required: false
                  - name: creator_id
                    type: string
                    description: Public communications ID of the RFQ creator (anonymized)
                    required: false
                  - name: market_ticker
                    type: string
                    description: Market ticker for the RFQ
                    required: false
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
                    required: false
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
              const: rfq_deleted
              x-parser-schema-id: <anonymous-schema-171>
            sid: *ref_0
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
                  x-parser-schema-id: <anonymous-schema-173>
                creator_id:
                  type: string
                  description: Public communications ID of the RFQ creator (anonymized)
                  x-parser-schema-id: <anonymous-schema-174>
                market_ticker:
                  type: string
                  description: Market ticker for the RFQ
                  x-parser-schema-id: <anonymous-schema-175>
                event_ticker:
                  type: string
                  description: Event ticker (optional)
                  x-parser-schema-id: <anonymous-schema-176>
                contracts_fp:
                  type: string
                  description: Fixed-point contracts requested (2 decimals) (optional)
                  x-parser-schema-id: <anonymous-schema-177>
                target_cost_dollars:
                  type: string
                  description: Target cost in dollars (optional)
                  x-parser-schema-id: <anonymous-schema-178>
                deleted_ts:
                  type: string
                  description: Timestamp when the RFQ was deleted
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-179>
              x-parser-schema-id: <anonymous-schema-172>
          x-parser-schema-id: rfqDeletedPayload
        title: RFQ Deleted
        description: Notification when an RFQ is deleted
        example: |-
          {
            "type": "rfq_deleted",
            "sid": 15,
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
    extensions: *ref_1
  - &ref_4
    id: receiveQuoteCreated
    title: Quote Created
    description: Receive quote created notifications
    type: send
    messages:
      - &ref_9
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
              - name: msg
                type: object
                required: true
                properties:
                  - name: quote_id
                    type: string
                    description: Unique identifier for the quote
                    required: false
                  - name: rfq_id
                    type: string
                    description: Identifier of the RFQ this quote is for
                    required: false
                  - name: quote_creator_id
                    type: string
                    description: Public communications ID of the quote creator (anonymized)
                    required: false
                  - name: market_ticker
                    type: string
                    description: Market ticker for the quote
                    required: false
                  - name: event_ticker
                    type: string
                    description: Event ticker (optional)
                    required: false
                  - name: yes_bid_dollars
                    type: string
                    description: Yes side bid price in dollars
                    required: false
                  - name: no_bid_dollars
                    type: string
                    description: No side bid price in dollars
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
                  - name: created_ts
                    type: string
                    description: Timestamp when the quote was created
                    required: false
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
              const: quote_created
              x-parser-schema-id: <anonymous-schema-180>
            sid: *ref_0
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
                  x-parser-schema-id: <anonymous-schema-182>
                rfq_id:
                  type: string
                  description: Identifier of the RFQ this quote is for
                  x-parser-schema-id: <anonymous-schema-183>
                quote_creator_id:
                  type: string
                  description: Public communications ID of the quote creator (anonymized)
                  x-parser-schema-id: <anonymous-schema-184>
                market_ticker:
                  type: string
                  description: Market ticker for the quote
                  x-parser-schema-id: <anonymous-schema-185>
                event_ticker:
                  type: string
                  description: Event ticker (optional)
                  x-parser-schema-id: <anonymous-schema-186>
                yes_bid_dollars:
                  type: string
                  description: Yes side bid price in dollars
                  x-parser-schema-id: <anonymous-schema-187>
                no_bid_dollars:
                  type: string
                  description: No side bid price in dollars
                  x-parser-schema-id: <anonymous-schema-188>
                yes_contracts_offered_fp:
                  type: string
                  description: Fixed-point yes contracts offered (2 decimals) (optional)
                  x-parser-schema-id: <anonymous-schema-189>
                no_contracts_offered_fp:
                  type: string
                  description: Fixed-point no contracts offered (2 decimals) (optional)
                  x-parser-schema-id: <anonymous-schema-190>
                rfq_target_cost_dollars:
                  type: string
                  description: Target cost from the RFQ in dollars (optional)
                  x-parser-schema-id: <anonymous-schema-191>
                created_ts:
                  type: string
                  description: Timestamp when the quote was created
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-192>
              x-parser-schema-id: <anonymous-schema-181>
          x-parser-schema-id: quoteCreatedPayload
        title: Quote Created
        description: Notification when a quote is created on an RFQ
        example: |-
          {
            "type": "quote_created",
            "sid": 15,
            "msg": {
              "quote_id": "quote_456",
              "rfq_id": "rfq_123",
              "quote_creator_id": "comm_def456",
              "market_ticker": "FED-23DEC-T3.00",
              "event_ticker": "FED-23DEC",
              "yes_bid_dollars": "0.35",
              "no_bid_dollars": "0.65",
              "yes_contracts_offered_fp": "100.00",
              "no_contracts_offered_fp": "200.00",
              "rfq_target_cost_dollars": "0.35",
              "created_ts": "2024-12-01T10:02:00Z"
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: quoteCreated
    bindings: []
    extensions: *ref_1
  - &ref_5
    id: receiveQuoteAccepted
    title: Quote Accepted
    description: Receive quote accepted notifications
    type: send
    messages:
      - &ref_10
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
              - name: msg
                type: object
                required: true
                properties:
                  - name: quote_id
                    type: string
                    description: Unique identifier for the quote
                    required: false
                  - name: rfq_id
                    type: string
                    description: Identifier of the RFQ this quote is for
                    required: false
                  - name: quote_creator_id
                    type: string
                    description: Public communications ID of the quote creator (anonymized)
                    required: false
                  - name: market_ticker
                    type: string
                    description: Market ticker for the quote
                    required: false
                  - name: event_ticker
                    type: string
                    description: Event ticker (optional)
                    required: false
                  - name: yes_bid_dollars
                    type: string
                    description: Yes side bid price in dollars
                    required: false
                  - name: no_bid_dollars
                    type: string
                    description: No side bid price in dollars
                    required: false
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
              const: quote_accepted
              x-parser-schema-id: <anonymous-schema-193>
            sid: *ref_0
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
                  x-parser-schema-id: <anonymous-schema-195>
                rfq_id:
                  type: string
                  description: Identifier of the RFQ this quote is for
                  x-parser-schema-id: <anonymous-schema-196>
                quote_creator_id:
                  type: string
                  description: Public communications ID of the quote creator (anonymized)
                  x-parser-schema-id: <anonymous-schema-197>
                market_ticker:
                  type: string
                  description: Market ticker for the quote
                  x-parser-schema-id: <anonymous-schema-198>
                event_ticker:
                  type: string
                  description: Event ticker (optional)
                  x-parser-schema-id: <anonymous-schema-199>
                yes_bid_dollars:
                  type: string
                  description: Yes side bid price in dollars
                  x-parser-schema-id: <anonymous-schema-200>
                no_bid_dollars:
                  type: string
                  description: No side bid price in dollars
                  x-parser-schema-id: <anonymous-schema-201>
                accepted_side:
                  type: string
                  description: Which side was accepted (yes/no) (optional)
                  enum:
                    - 'yes'
                    - 'no'
                  x-parser-schema-id: <anonymous-schema-202>
                contracts_accepted_fp:
                  type: string
                  description: Fixed-point contracts accepted (2 decimals) (optional)
                  x-parser-schema-id: <anonymous-schema-203>
                yes_contracts_offered_fp:
                  type: string
                  description: Fixed-point yes contracts offered (2 decimals) (optional)
                  x-parser-schema-id: <anonymous-schema-204>
                no_contracts_offered_fp:
                  type: string
                  description: Fixed-point no contracts offered (2 decimals) (optional)
                  x-parser-schema-id: <anonymous-schema-205>
                rfq_target_cost_dollars:
                  type: string
                  description: Target cost from the RFQ in dollars (optional)
                  x-parser-schema-id: <anonymous-schema-206>
              x-parser-schema-id: <anonymous-schema-194>
          x-parser-schema-id: quoteAcceptedPayload
        title: Quote Accepted
        description: Notification when a quote is accepted
        example: |-
          {
            "type": "quote_accepted",
            "sid": 15,
            "msg": {
              "quote_id": "quote_456",
              "rfq_id": "rfq_123",
              "quote_creator_id": "comm_def456",
              "market_ticker": "FED-23DEC-T3.00",
              "event_ticker": "FED-23DEC",
              "yes_bid_dollars": "0.35",
              "no_bid_dollars": "0.65",
              "accepted_side": "yes",
              "contracts_accepted_fp": "50.00",
              "yes_contracts_offered_fp": "100.00",
              "no_contracts_offered_fp": "200.00",
              "rfq_target_cost_dollars": "0.35"
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: quoteAccepted
    bindings: []
    extensions: *ref_1
  - &ref_6
    id: receiveQuoteExecuted
    title: Quote Executed
    description: >-
      Receive quote executed notifications with order details for fill
      correlation
    type: send
    messages:
      - &ref_11
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
              - name: msg
                type: object
                required: true
                properties:
                  - name: quote_id
                    type: string
                    description: Unique identifier for the quote that was executed
                    required: false
                  - name: rfq_id
                    type: string
                    description: Identifier of the RFQ this quote was for
                    required: false
                  - name: quote_creator_id
                    type: string
                    description: Anonymized identifier for the quote creator
                    required: false
                  - name: rfq_creator_id
                    type: string
                    description: Anonymized identifier for the RFQ creator
                    required: false
                  - name: order_id
                    type: string
                    description: >-
                      Your order ID resulting from the quote execution. Use this
                      to match with fill messages
                    required: false
                  - name: client_order_id
                    type: string
                    description: >-
                      Your client order ID for the executed order. Use this to
                      correlate with fill messages
                    required: false
                  - name: market_ticker
                    type: string
                    description: Market ticker for the executed quote
                    required: false
                  - name: executed_ts
                    type: string
                    description: >-
                      Timestamp when the quote was executed and orders were
                      placed
                    required: false
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
              const: quote_executed
              x-parser-schema-id: <anonymous-schema-207>
            sid: *ref_0
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
                  x-parser-schema-id: <anonymous-schema-209>
                rfq_id:
                  type: string
                  description: Identifier of the RFQ this quote was for
                  x-parser-schema-id: <anonymous-schema-210>
                quote_creator_id:
                  type: string
                  description: Anonymized identifier for the quote creator
                  x-parser-schema-id: <anonymous-schema-211>
                rfq_creator_id:
                  type: string
                  description: Anonymized identifier for the RFQ creator
                  x-parser-schema-id: <anonymous-schema-212>
                order_id:
                  type: string
                  description: >-
                    Your order ID resulting from the quote execution. Use this
                    to match with fill messages
                  x-parser-schema-id: <anonymous-schema-213>
                client_order_id:
                  type: string
                  description: >-
                    Your client order ID for the executed order. Use this to
                    correlate with fill messages
                  x-parser-schema-id: <anonymous-schema-214>
                market_ticker:
                  type: string
                  description: Market ticker for the executed quote
                  x-parser-schema-id: <anonymous-schema-215>
                executed_ts:
                  type: string
                  description: Timestamp when the quote was executed and orders were placed
                  format: date-time
                  x-parser-schema-id: <anonymous-schema-216>
              x-parser-schema-id: <anonymous-schema-208>
          x-parser-schema-id: quoteExecutedPayload
        title: Quote Executed
        description: Notification when a quote is executed and orders are placed
        example: |-
          {
            "type": "quote_executed",
            "sid": 15,
            "msg": {
              "quote_id": "quote_456",
              "rfq_id": "rfq_123",
              "quote_creator_id": "a1b2c3d4e5f6...",
              "rfq_creator_id": "f6e5d4c3b2a1...",
              "order_id": "order_789",
              "client_order_id": "my_client_order_123",
              "market_ticker": "FED-23DEC-T3.00",
              "executed_ts": "2024-12-01T10:05:00Z"
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: quoteExecuted
    bindings: []
    extensions: *ref_1
sendOperations: []
receiveOperations:
  - *ref_2
  - *ref_3
  - *ref_4
  - *ref_5
  - *ref_6
sendMessages: []
receiveMessages:
  - *ref_7
  - *ref_8
  - *ref_9
  - *ref_10
  - *ref_11
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