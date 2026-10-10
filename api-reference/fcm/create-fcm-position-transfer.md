---
url: https://docs.kalshi.com/api-reference/fcm/create-fcm-position-transfer
lastmod: 2026-10-09T15:36:12.608Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Create FCM Position Transfer

> Endpoint for FCM members to move a position in one market from one of their subtraders into a
subtrader under their FCM's error account.

**This endpoint must be enabled for your FCM by Kalshi.** Kalshi enables it by configuring the
error account that receives transferred positions and gives you that account's user id, which
prefixes `target_subtrader_id`. Contact Kalshi to enable it; until then, requests return 400.

- The destination is always your FCM's error account. `target_subtrader_id` picks the subtrader
  under it, which is created on first use.
- Each request moves one market for one source subtrader. To move many positions, send one
  request per subtrader and market.
- The transfer is booked like a trade at `price_centicents`, which is always the YES price, even
  when moving NO. No fee is charged and no fill is created. For YES, the error account pays the
  price per contract; for NO, it pays $1 minus the price per contract. The FCM receives the same
  amount. Use 0 for YES or 10000 for NO to move no cash. These amounts assume the source holds
  the side being moved and the target subtrader holds no opposite position in that market;
  otherwise the positions net like a trade and the balance changes differ.
- The source's current position is not checked. A request for more than the source holds, or
  with the opposite sign, flips or grows the source's position.
- Requests are not idempotent. After a timeout or 5xx, check the position before retrying.
- The market must be open, neither account may be blocked, and the error account must have
  enough available balance on the market's exchange index to pay for the transfer. Otherwise
  the request returns 409.

**Example: moving YES.** A customer subtrader holds 10 YES contracts. Send
`position_centicount` 1000 and `price_centicents` 4500 (YES at 45 cents):
- The customer subtrader goes from 10 YES to 0, and the error account subtrader from 0 to 10 YES.
- The error account pays 10 x $0.45 = $4.50 and the FCM receives $4.50.
- Sending `price_centicents` 0 instead moves the position with no cash.

**Example: moving NO.** A customer subtrader holds 5 NO contracts. Send `position_centicount`
-500 and `price_centicents` 7000 (YES at 70 cents, so NO at 30 cents):
- The customer subtrader goes from 5 NO to 0, and the error account subtrader from 0 to 5 NO.
- The error account pays 5 x $0.30 = $1.50 and the FCM receives $1.50.
- Sending `price_centicents` 10000 instead moves the position with no cash. Sending 0 makes the
  error account pay the full $1 per contract ($5.00).




## OpenAPI

````yaml /openapi.yaml post /fcm/positions/transfers
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.34.0
  description: >-
    Manually defined OpenAPI spec for endpoints being migrated to spec-first
    approach
servers:
  - url: https://external-api.kalshi.com/trade-api/v2
    description: Production Trade API server
  - url: https://api.elections.kalshi.com/trade-api/v2
    description: Production shared API server, also supported
  - url: https://external-api.demo.kalshi.co/trade-api/v2
    description: Demo Trade API server
  - url: https://demo-api.kalshi.co/trade-api/v2
    description: Demo shared API server, also supported
security: []
tags:
  - name: api-keys
    description: API key management endpoints
  - name: orders
    description: Order management endpoints
  - name: order-groups
    description: Order group management endpoints
  - name: portfolio
    description: Portfolio and balance information endpoints
  - name: communications
    description: Request-for-quote (RFQ) endpoints
  - name: multivariate
    description: Multivariate event collection endpoints
  - name: exchange
    description: Exchange status and information endpoints
  - name: live-data
    description: Live data endpoints
  - name: markets
    description: Market data endpoints
  - name: milestone
    description: Milestone endpoints
  - name: search
    description: Search and filtering endpoints
  - name: incentive-programs
    description: Incentive program endpoints
  - name: fcm
    description: FCM member specific endpoints
  - name: events
    description: Event endpoints
  - name: structured-targets
    description: Structured targets endpoints
paths:
  /fcm/positions/transfers:
    post:
      tags:
        - fcm
      summary: Create FCM Position Transfer
      description: >
        Endpoint for FCM members to move a position in one market from one of
        their subtraders into a

        subtrader under their FCM's error account.


        **This endpoint must be enabled for your FCM by Kalshi.** Kalshi enables
        it by configuring the

        error account that receives transferred positions and gives you that
        account's user id, which

        prefixes `target_subtrader_id`. Contact Kalshi to enable it; until then,
        requests return 400.


        - The destination is always your FCM's error account.
        `target_subtrader_id` picks the subtrader
          under it, which is created on first use.
        - Each request moves one market for one source subtrader. To move many
        positions, send one
          request per subtrader and market.
        - The transfer is booked like a trade at `price_centicents`, which is
        always the YES price, even
          when moving NO. No fee is charged and no fill is created. For YES, the error account pays the
          price per contract; for NO, it pays $1 minus the price per contract. The FCM receives the same
          amount. Use 0 for YES or 10000 for NO to move no cash. These amounts assume the source holds
          the side being moved and the target subtrader holds no opposite position in that market;
          otherwise the positions net like a trade and the balance changes differ.
        - The source's current position is not checked. A request for more than
        the source holds, or
          with the opposite sign, flips or grows the source's position.
        - Requests are not idempotent. After a timeout or 5xx, check the
        position before retrying.

        - The market must be open, neither account may be blocked, and the error
        account must have
          enough available balance on the market's exchange index to pay for the transfer. Otherwise
          the request returns 409.

        **Example: moving YES.** A customer subtrader holds 10 YES contracts.
        Send

        `position_centicount` 1000 and `price_centicents` 4500 (YES at 45
        cents):

        - The customer subtrader goes from 10 YES to 0, and the error account
        subtrader from 0 to 10 YES.

        - The error account pays 10 x $0.45 = $4.50 and the FCM receives $4.50.

        - Sending `price_centicents` 0 instead moves the position with no cash.


        **Example: moving NO.** A customer subtrader holds 5 NO contracts. Send
        `position_centicount`

        -500 and `price_centicents` 7000 (YES at 70 cents, so NO at 30 cents):

        - The customer subtrader goes from 5 NO to 0, and the error account
        subtrader from 0 to 5 NO.

        - The error account pays 5 x $0.30 = $1.50 and the FCM receives $1.50.

        - Sending `price_centicents` 10000 instead moves the position with no
        cash. Sending 0 makes the
          error account pay the full $1 per contract ($5.00).
      operationId: CreateFCMPositionTransfer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateFCMPositionTransferRequest'
            examples:
              move_yes:
                summary: Move 10 YES at 45 cents
                value:
                  source_subtrader_id: 3f2a8c1e-5b7d-4e9a-8c6f-1d2b3a4e5f60_CUST123
                  target_subtrader_id: 9b8c7d6e-5f4a-4b3c-9d2e-1f0a9b8c7d6e_ERR1
                  market_ticker: KXEXAMPLE-26DEC31
                  position_centicount: 1000
                  price_centicents: 4500
              move_no:
                summary: Move 5 NO at 30 cents (YES price 70 cents)
                value:
                  source_subtrader_id: 3f2a8c1e-5b7d-4e9a-8c6f-1d2b3a4e5f60_CUST123
                  target_subtrader_id: 9b8c7d6e-5f4a-4b3c-9d2e-1f0a9b8c7d6e_ERR1
                  market_ticker: KXEXAMPLE-26DEC31
                  position_centicount: -500
                  price_centicents: 7000
      responses:
        '201':
          description: Position transferred
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateFCMPositionTransferResponse'
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
    CreateFCMPositionTransferRequest:
      type: object
      required:
        - source_subtrader_id
        - target_subtrader_id
        - market_ticker
        - position_centicount
        - price_centicents
      properties:
        source_subtrader_id:
          type: string
          description: >-
            Full id of the FCM subtrader giving up the position, as returned by
            `GET /fcm/subtraders`.
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
        market_ticker:
          type: string
          description: Ticker of the market whose position is moved.
          x-oapi-codegen-extra-tags:
            validate: required
        position_centicount:
          type: integer
          format: int64
          description: >-
            Contracts to move, in centicounts (contracts x 100). Positive moves
            YES, negative moves NO. Must be a non-zero whole number of
            contracts, e.g. 1000 for 10 YES or -500 for 5 NO.
          x-oapi-codegen-extra-tags:
            validate: required,ne=0
        price_centicents:
          type: integer
          format: int64
          minimum: 0
          maximum: 10000
          description: >-
            YES price per contract in centicents (cents x 100), in whole cents,
            even when moving NO. For example, 4500 is 45 cents.
          x-oapi-codegen-extra-tags:
            validate: gte=0,lte=10000
    CreateFCMPositionTransferResponse:
      type: object
      required:
        - position_transfer_id
      properties:
        position_transfer_id:
          type: string
          description: >-
            Id of the executed transfer. Store it; no Trade API endpoint lists
            past transfers.
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