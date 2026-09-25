---
url: https://docs.kalshi.com/api-reference/fcm/get-fcm-fills
lastmod: 2026-09-24T19:34:00.807Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get FCM Fills

> Returns fills across the authenticated FCM's subtraders. Requires FCM member access.




## OpenAPI

````yaml /openapi.yaml get /fcm/fills
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.31.0
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
  /fcm/fills:
    get:
      tags:
        - fcm
      summary: Get FCM Fills
      description: >
        Returns fills across the authenticated FCM's subtraders. Requires FCM
        member access.
      operationId: GetFCMFills
      parameters:
        - $ref: '#/components/parameters/MinTsQuery'
        - $ref: '#/components/parameters/MaxTsQuery'
        - $ref: '#/components/parameters/CursorQuery'
      responses:
        '200':
          description: Fills retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetFcmFillsResponse'
        '400':
          description: Bad request
        '401':
          description: Unauthorized
        '403':
          description: Forbidden - requires an unrestricted FCM member API key
        '500':
          description: Internal server error
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  parameters:
    MinTsQuery:
      name: min_ts
      in: query
      description: Filter items after this Unix timestamp
      schema:
        type: integer
        format: int64
    MaxTsQuery:
      name: max_ts
      in: query
      description: Filter items before this Unix timestamp
      schema:
        type: integer
        format: int64
    CursorQuery:
      name: cursor
      in: query
      description: >-
        Pagination cursor. Use the cursor value returned from the previous
        response to get the next page of results. Leave empty for the first
        page.
      schema:
        type: string
        x-go-type-skip-optional-pointer: true
  schemas:
    GetFcmFillsResponse:
      type: object
      required:
        - fills
        - cursor
      properties:
        fills:
          type: array
          items:
            $ref: '#/components/schemas/FcmFill'
        cursor:
          type: string
    FcmFill:
      type: object
      required:
        - fill_id
        - exchange_index
        - ticker
        - taker_outcome_side
        - count_fp
        - yes_price_dollars
      properties:
        fill_id:
          type: string
          description: Fill ID.
        exchange_index:
          $ref: '#/components/schemas/ExchangeIndex'
        ticker:
          type: string
          description: Market ticker.
        taker_outcome_side:
          $ref: '#/components/schemas/OutcomeSide'
          description: Taker outcome side. The maker has the opposite outcome.
        count_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: Filled contract count.
        yes_price_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: YES price in dollars.
        created_time:
          type: string
          format: date-time
          description: Fill execution time.
        maker_order_id:
          type: string
          description: Maker order ID when owned by the FCM.
        maker_subtrader_id:
          type: string
          description: Maker subtrader ID when owned by the FCM.
        maker_fee_cost:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Maker fee in dollars when owned by the FCM.
        taker_order_id:
          type: string
          description: Taker order ID when owned by the FCM.
        taker_subtrader_id:
          type: string
          description: Taker subtrader ID when owned by the FCM.
        taker_fee_cost:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Taker fee in dollars when owned by the FCM.
    ExchangeIndex:
      type: integer
      description: Identifier for an exchange shard.
      example: 0
    OutcomeSide:
      type: string
      enum:
        - 'yes'
        - 'no'
      x-enum-varnames:
        - OutcomeSideYes
        - OutcomeSideNo
      description: Outcome side.
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