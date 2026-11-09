---
url: https://docs.kalshi.com/margin-rest/fcm/create-margin-fcm-position-transfer
lastmod: 2026-11-08T22:22:07.813Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Create Margin FCM Position Transfer

> Endpoint for FCM members to move a perps position in one market from one of their subtraders
into a subtrader under their FCM's error account.

**This endpoint must be enabled for your FCM by Kalshi.** Kalshi enables it by configuring the
error account that receives transferred positions and gives you that account's user id, which
prefixes `target_subtrader_id`. Contact Kalshi to enable it; until then, requests return 400.
Position transfers are also switched on per exchange; while they are off, requests return 409.

- The destination is always your FCM's error account. `target_subtrader_id` picks the subtrader
  under it, which is created on first use.
- Each request moves one market for one source subtrader. To move many positions, send one
  request per subtrader and market.
- No cash moves when a transfer is booked. Both sides' positions and cost basis change as for a
  fee-free trade at `price`: the source closes at `price` and the error account opens at
  `price`. Both settle in the next settlement cycle: the source realizes the difference
  between `price` and the market's last settlement mark, and the error account's variation
  margin runs from `price` to the next settlement mark. To make a customer whole, use the
  price of the fill being reversed.
- `side` and `count` describe the position being moved: `long` moves a long of `count`
  contracts, `short` moves a short. `count` must be a whole number of contracts. The source's
  current position is not checked; moving more than it holds, or the other side, flips or
  grows its position.
- `client_transfer_id` makes the request idempotent per source subtrader: once a transfer
  with that id has been booked from `source_subtrader_id`, a later request with the same id
  from that subtrader, to any target, books nothing unless the exchange has restarted in
  between. The exchange checks the id only after it re-checks the transfer switch, trading
  status and both accounts' current risk, so a repeat returns 409 with error code
  `transfer_already_applied` only when it passes those checks. Otherwise it gets the error
  for the check it failed, such as 400 `insufficient_balance` once the earlier transfer has
  used the error account's margin, or 409 while trading is paused.
- After a timeout or 5xx, retry with the same id. `transfer_already_applied` confirms that the
  earlier attempt was booked. Any other error refuses only the retry and leaves the earlier
  attempt's outcome unknown: check the source subtrader's position before you send the
  transfer again under a new id.
- The exchange does not keep transfer ids across a restart, such as a maintenance window, so a
  retry sent after one can book the transfer a second time. If the exchange may have
  restarted since the first attempt, check the source subtrader's position before retrying,
  even with the same id.
- The market must have traded at least once and trading must not be paused; otherwise the
  request returns 409. Both accounts must also pass the exchange's risk checks for their
  post-transfer positions (available margin, FCM initial-margin caps, notional risk limits);
  a failed risk check returns 400 with the exchange's reason, such as `insufficient_balance`,
  and a blocked account returns 409.
- Transfers appear on the daily statement and in the `position_transfer_audit` report. They
  never appear as fills or in `trade_audit`.

**Example.** A customer subtrader holds 10 long in `KXBTCPERP`, filled at $63,000. Send
`side` `long`, `count` `10`, `price` `63000.00`: the customer goes from 10 long to flat and the
error account subtrader from flat to 10 long, both at $63,000, with no cash moving.




## OpenAPI

````yaml /perps_openapi.yaml post /margin/fcm/positions/transfers
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 0.0.1
  description: >-
    Manually defined OpenAPI spec for endpoints being migrated to spec-first
    approach
servers:
  - url: https://external-api.kalshi.com/trade-api/v2
    description: Production perps REST API server
  - url: https://external-api.demo.kalshi.co/trade-api/v2
    description: Demo perps REST API server
security: []
tags:
  - name: account
    description: Account information endpoints
  - name: fcm
    description: FCM member specific endpoints
  - name: exchange
    description: Exchange status and information endpoints
  - name: market
    description: Market data endpoints
  - name: orders
    description: Order management endpoints
  - name: order-groups
    description: Order group management endpoints
  - name: portfolio
    description: Portfolio and balance information endpoints
  - name: risk
    description: Margin risk metrics, parameters, and limits
  - name: funding
    description: Funding rates and payment history
  - name: fees
    description: Margin fee schedule
  - name: exit-triggers
    description: Stop-loss, take-profit, and trailing-stop triggers on margin positions
paths:
  /margin/fcm/positions/transfers:
    post:
      tags:
        - fcm
      summary: Create Margin FCM Position Transfer
      description: >
        Endpoint for FCM members to move a perps position in one market from one
        of their subtraders

        into a subtrader under their FCM's error account.


        **This endpoint must be enabled for your FCM by Kalshi.** Kalshi enables
        it by configuring the

        error account that receives transferred positions and gives you that
        account's user id, which

        prefixes `target_subtrader_id`. Contact Kalshi to enable it; until then,
        requests return 400.

        Position transfers are also switched on per exchange; while they are
        off, requests return 409.


        - The destination is always your FCM's error account.
        `target_subtrader_id` picks the subtrader
          under it, which is created on first use.
        - Each request moves one market for one source subtrader. To move many
        positions, send one
          request per subtrader and market.
        - No cash moves when a transfer is booked. Both sides' positions and
        cost basis change as for a
          fee-free trade at `price`: the source closes at `price` and the error account opens at
          `price`. Both settle in the next settlement cycle: the source realizes the difference
          between `price` and the market's last settlement mark, and the error account's variation
          margin runs from `price` to the next settlement mark. To make a customer whole, use the
          price of the fill being reversed.
        - `side` and `count` describe the position being moved: `long` moves a
        long of `count`
          contracts, `short` moves a short. `count` must be a whole number of contracts. The source's
          current position is not checked; moving more than it holds, or the other side, flips or
          grows its position.
        - `client_transfer_id` makes the request idempotent per source
        subtrader: once a transfer
          with that id has been booked from `source_subtrader_id`, a later request with the same id
          from that subtrader, to any target, books nothing unless the exchange has restarted in
          between. The exchange checks the id only after it re-checks the transfer switch, trading
          status and both accounts' current risk, so a repeat returns 409 with error code
          `transfer_already_applied` only when it passes those checks. Otherwise it gets the error
          for the check it failed, such as 400 `insufficient_balance` once the earlier transfer has
          used the error account's margin, or 409 while trading is paused.
        - After a timeout or 5xx, retry with the same id.
        `transfer_already_applied` confirms that the
          earlier attempt was booked. Any other error refuses only the retry and leaves the earlier
          attempt's outcome unknown: check the source subtrader's position before you send the
          transfer again under a new id.
        - The exchange does not keep transfer ids across a restart, such as a
        maintenance window, so a
          retry sent after one can book the transfer a second time. If the exchange may have
          restarted since the first attempt, check the source subtrader's position before retrying,
          even with the same id.
        - The market must have traded at least once and trading must not be
        paused; otherwise the
          request returns 409. Both accounts must also pass the exchange's risk checks for their
          post-transfer positions (available margin, FCM initial-margin caps, notional risk limits);
          a failed risk check returns 400 with the exchange's reason, such as `insufficient_balance`,
          and a blocked account returns 409.
        - Transfers appear on the daily statement and in the
        `position_transfer_audit` report. They
          never appear as fills or in `trade_audit`.

        **Example.** A customer subtrader holds 10 long in `KXBTCPERP`, filled
        at $63,000. Send

        `side` `long`, `count` `10`, `price` `63000.00`: the customer goes from
        10 long to flat and the

        error account subtrader from flat to 10 long, both at $63,000, with no
        cash moving.
      operationId: CreateMarginFCMPositionTransfer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateMarginFCMPositionTransferRequest'
            examples:
              move_long:
                summary: Move 10 long at $63,000
                value:
                  source_subtrader_id: 3f2a8c1e-5b7d-4e9a-8c6f-1d2b3a4e5f60_CUST123
                  target_subtrader_id: 9b8c7d6e-5f4a-4b3c-9d2e-1f0a9b8c7d6e_ERR1
                  ticker: KXBTCPERP
                  side: long
                  count: '10'
                  price: '63000.00'
                  client_transfer_id: 6d1f0c5a-2b3e-4f7a-9c8d-0e1f2a3b4c5d
              move_short_by_market_id:
                summary: Move 5 short at $4,500, selecting the market by id
                value:
                  source_subtrader_id: 3f2a8c1e-5b7d-4e9a-8c6f-1d2b3a4e5f60_CUST123
                  target_subtrader_id: 9b8c7d6e-5f4a-4b3c-9d2e-1f0a9b8c7d6e_ERR1
                  market_id: 0a1b2c3d-4e5f-4a6b-8c9d-0e1f2a3b4c5d
                  side: short
                  count: '5'
                  price: '4500.00'
                  client_transfer_id: 7e2a1d6b-3c4f-4a8b-9d0e-1f2a3b4c5d6e
      responses:
        '201':
          description: Position transferred
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateMarginFCMPositionTransferResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
        '404':
          $ref: '#/components/responses/NotFoundError'
        '409':
          $ref: '#/components/responses/ConflictError'
        '429':
          $ref: '#/components/responses/RateLimitError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    CreateMarginFCMPositionTransferRequest:
      type: object
      required:
        - source_subtrader_id
        - target_subtrader_id
        - side
        - count
        - price
        - client_transfer_id
      properties:
        source_subtrader_id:
          type: string
          description: >-
            Full id of the FCM subtrader giving up the position,
            `{user_id}_{subtrader_suffix}`, as returned by `POST
            /margin/fcm/subtraders`.
          x-oapi-codegen-extra-tags:
            validate: required
        target_subtrader_id:
          type: string
          description: >-
            Subtrader under your error account that receives the position,
            `{error_account_id}_{suffix}` with a 1-16 character alphanumeric
            suffix. Created if it does not exist.
          x-oapi-codegen-extra-tags:
            validate: required
        ticker:
          type: string
          description: >-
            Market ticker. Supply ticker or market_id; ticker takes precedence
            when both are provided.
          x-go-type-skip-optional-pointer: true
        market_id:
          type: string
          description: Stable exchange market UUID. May be supplied instead of ticker.
          x-go-type-skip-optional-pointer: true
        side:
          type: string
          enum:
            - long
            - short
          description: >-
            Side of the position being moved. `long` moves a long position,
            `short` moves a short one.
          x-oapi-codegen-extra-tags:
            validate: required,oneof=long short
        count:
          allOf:
            - $ref: '#/components/schemas/FixedPointCount'
          description: >-
            Contracts to move, as a whole number of exchange contracts (e.g.
            "10").
          x-oapi-codegen-extra-tags:
            validate: required
        price:
          allOf:
            - $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Transfer price in dollars per contract with 2-4 decimal places (e.g.
            "63000.00"), greater than zero. Both sides' cost basis moves at this
            price.
          x-oapi-codegen-extra-tags:
            validate: required
        client_transfer_id:
          type: string
          format: uuid
          description: >-
            Client-chosen UUID that makes the request idempotent for the source
            subtrader. A repeat from the same source, to any target, returns 409
            with code `transfer_already_applied`.
          x-oapi-codegen-extra-tags:
            validate: required,uuid
    CreateMarginFCMPositionTransferResponse:
      type: object
      required:
        - position_transfer_id
      properties:
        position_transfer_id:
          type: string
          description: >-
            Id of the executed transfer, as it appears in the
            `position_transfer_audit` report.
    FixedPointCount:
      type: string
      description: >-
        Fixed-point contract count string (2 decimals, e.g., "10.00"; referred
        to as "fp" in field names). Requests accept 0-2 decimal places (e.g.,
        "10", "10.0", "10.00"); responses always emit 2 decimals. Fractional
        contract values (e.g., "2.50") are supported; the minimum granularity is
        0.01 contracts.
      example: '10.00'
    FixedPointDollars:
      type: string
      description: >-
        Fixed-point US dollar string. Most request fields accept 2-4 decimal
        places (e.g., "0.56", "0.5600"); responses emit up to 6. Valid quote
        intervals for a given market are constrained by that market's price
        level structure.
      example: '0.5600'
    ErrorResponse:
      type: object
      properties:
        code:
          type: string
          description: Error code
        message:
          type: string
          description: Human-readable error message
        details:
          type: string
          description: Additional details about the error, if available
  responses:
    BadRequestError:
      description: Bad request - invalid input
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    UnauthorizedError:
      description: Unauthorized - authentication required
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    ForbiddenError:
      description: Forbidden - insufficient permissions
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    NotFoundError:
      description: Resource not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    ConflictError:
      description: Conflict - resource already exists or cannot be modified
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    RateLimitError:
      description: >-
        Rate limit exceeded. The default cost is 10 tokens per request. Use GET
        /trade-api/v2/account/endpoint_costs to list non-default endpoint costs.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    InternalServerError:
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
  securitySchemes:
    kalshiAccessKey:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-KEY
      description: Your API key ID
    kalshiAccessSignature:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-SIGNATURE
      description: >-
        Base64 signature of the pre-sign text (timestamp + method + path) made
        with the API key's algorithm - RSA-PSS with SHA-256 for RSA keys,
        Ed25519 for Ed25519 keys
    kalshiAccessTimestamp:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-TIMESTAMP
      description: Request timestamp in milliseconds

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.