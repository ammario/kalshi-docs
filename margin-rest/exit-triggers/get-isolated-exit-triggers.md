---
url: https://docs.kalshi.com/margin-rest/exit-triggers/get-isolated-exit-triggers
lastmod: 2026-09-02T22:09:40.956Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Isolated Exit Triggers

> Endpoint for retrieving the live exit triggers on the isolated margin position for a market.



## OpenAPI

````yaml /perps_openapi.yaml get /margin/isolated/positions/{ticker}/exit_trigger
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
  /margin/isolated/positions/{ticker}/exit_trigger:
    get:
      tags:
        - exit-triggers
      summary: Get Isolated Exit Triggers
      description: >-
        Endpoint for retrieving the live exit triggers on the isolated margin
        position for a market.
      operationId: GetIsolatedMarginExitTriggers
      parameters:
        - $ref: '#/components/parameters/ExitTriggerTickerPath'
        - $ref: '#/components/parameters/ExitTriggerKindQuery'
      responses:
        '200':
          description: Exit triggers retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetExitTriggersResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
        '429':
          $ref: '#/components/responses/RateLimitError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  parameters:
    ExitTriggerTickerPath:
      name: ticker
      in: path
      required: true
      description: Ticker of the market whose position the trigger protects.
      schema:
        type: string
    ExitTriggerKindQuery:
      name: kind
      in: query
      required: false
      description: Restricts the request to one trigger family. Omitted covers every kind.
      schema:
        $ref: '#/components/schemas/ExitTriggerKind'
  schemas:
    GetExitTriggersResponse:
      type: object
      required:
        - exit_triggers
      properties:
        exit_triggers:
          type: array
          description: Live triggers on this position slot. Empty when none are set.
          items:
            $ref: '#/components/schemas/ExitTrigger'
    ExitTriggerKind:
      type: string
      description: >-
        Trigger family. `bracket` is a stop-loss / take-profit pair; `trailing`
        is a trailing stop whose stop level ratchets with the liquidation mark.
      enum:
        - bracket
        - trailing
    ExitTrigger:
      type: object
      required:
        - id
        - ticker
        - kind
        - status
        - count
        - filled_count
        - created_time
        - updated_time
      properties:
        id:
          type: string
          description: Unique identifier for this trigger.
        ticker:
          type: string
          description: Market the protected position is on.
        kind:
          $ref: '#/components/schemas/ExitTriggerKind'
        status:
          $ref: '#/components/schemas/ExitTriggerStatus'
        status_reason:
          $ref: '#/components/schemas/ExitTriggerReason'
        triggered_leg:
          $ref: '#/components/schemas/ExitTriggerLeg'
          description: Leg that fired the last time the trigger fired.
        triggered_order_id:
          type: string
          description: >-
            Order placed the last time the trigger fired. An order-anchored
            trigger keeps it after returning to `pending_on_entry`, so its
            presence does not mean the trigger is done.
        anchor_order_id:
          type: string
          description: >-
            Order this trigger follows, for order-anchored triggers. Cleared
            once that order reaches a terminal state, so use `client_trigger_id`
            to correlate a trigger with the request that made it.
        client_trigger_id:
          type: string
          description: The idempotency key the create supplied, for appending creates.
        stop_loss_price:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Stop-loss leg price. Bracket triggers only.
        take_profit_price:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Take-profit leg price. Bracket triggers only.
        trail_amount:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Absolute trailing distance. Trailing triggers only.
        trail_bps:
          type: integer
          description: >-
            Trailing distance in basis points of the watermark. Trailing
            triggers only.
        watermark_price:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Most favorable liquidation mark seen since creation — the peak for
            long positions, the trough for short. Trailing triggers only.
        effective_stop_price:
          $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            Level whose breach fires the stop: watermark minus the trail for
            longs, plus for shorts. Trailing triggers only.
        count:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            Contracts this trigger closes when it fires. `0` means the whole
            position.
        filled_count:
          $ref: '#/components/schemas/FixedPointCount'
          description: Contracts closed so far across fire attempts.
        created_time:
          type: string
          format: date-time
        updated_time:
          type: string
          format: date-time
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
    ExitTriggerStatus:
      type: string
      description: >-
        `pending_on_entry` awaits an initial or further fill from the anchor
        order before arming — an order-anchored trigger returns here after
        closing its current quantity, so this status can follow `active` and
        carries a non-zero `filled_count` when it does. `active` is live and
        evaluated against the mark each tick. `filled`, `failed`, and `canceled`
        are terminal.
      enum:
        - pending_on_entry
        - active
        - filled
        - failed
        - canceled
        - unknown
    ExitTriggerReason:
      type: string
      description: Why the trigger reached its terminal status.
      enum:
        - user_canceled
        - position_closed
        - entry_not_filled
        - order_rejected
        - position_flipped
    ExitTriggerLeg:
      type: string
      description: Which leg of a bracket fired. Present only once a leg has fired.
      enum:
        - stop_loss
        - take_profit
    FixedPointDollars:
      type: string
      description: >-
        Fixed-point US dollar string. Most request fields accept 2-4 decimal
        places (e.g., "0.56", "0.5600"); responses emit up to 6. Valid quote
        intervals for a given market are constrained by that market's price
        level structure.
      example: '0.5600'
    FixedPointCount:
      type: string
      description: >-
        Fixed-point contract count string (2 decimals, e.g., "10.00"; referred
        to as "fp" in field names). Requests accept 0-2 decimal places (e.g.,
        "10", "10.0", "10.00"); responses always emit 2 decimals. Fractional
        contract values (e.g., "2.50") are supported; the minimum granularity is
        0.01 contracts.
      example: '10.00'
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
      description: RSA-PSS signature of the request
    kalshiAccessTimestamp:
      type: apiKey
      in: header
      name: KALSHI-ACCESS-TIMESTAMP
      description: Request timestamp in milliseconds

````