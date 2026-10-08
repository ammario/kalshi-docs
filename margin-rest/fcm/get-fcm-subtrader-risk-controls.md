---
url: https://docs.kalshi.com/margin-rest/fcm/get-fcm-subtrader-risk-controls
lastmod: 2026-10-07T15:39:42.977Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get FCM Subtrader Risk Controls

> Returns the risk controls configured for an FCM member's subtrader on the margined
exchange: the FCM-set initial margin caps in `risk_controls`, and the admin-set notional
value risk limits in `notional_limits` — one call returns the subtrader's complete limit
picture. A cap with neither market_ticker nor asset_class applies across all markets; the
remaining caps are scoped to a single market or a single asset class each. A
notional_limits entry without a market_ticker is the whole-subtrader (all-markets) limit;
the rest are per-market. Every cap or limit in scope for an order is enforced
independently. Markets without a cap are omitted.
API keys bound to a single FCM subtrader may also call this endpoint: `subtrader_id` may be
omitted and defaults to the key's bound subtrader, and if supplied it must equal the bound
subtrader or the request is rejected.




## OpenAPI

````yaml /perps_openapi.yaml get /margin/fcm/subtraders/risk_controls
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
  /margin/fcm/subtraders/risk_controls:
    get:
      tags:
        - fcm
      summary: Get FCM Subtrader Risk Controls
      description: >
        Returns the risk controls configured for an FCM member's subtrader on
        the margined

        exchange: the FCM-set initial margin caps in `risk_controls`, and the
        admin-set notional

        value risk limits in `notional_limits` — one call returns the
        subtrader's complete limit

        picture. A cap with neither market_ticker nor asset_class applies across
        all markets; the

        remaining caps are scoped to a single market or a single asset class
        each. A

        notional_limits entry without a market_ticker is the whole-subtrader
        (all-markets) limit;

        the rest are per-market. Every cap or limit in scope for an order is
        enforced

        independently. Markets without a cap are omitted.

        API keys bound to a single FCM subtrader may also call this endpoint:
        `subtrader_id` may be

        omitted and defaults to the key's bound subtrader, and if supplied it
        must equal the bound

        subtrader or the request is rejected.
      operationId: GetFCMSubtraderRiskControls
      parameters:
        - name: subtrader_id
          in: query
          required: false
          description: >-
            The subtrader whose risk controls and notional value risk limits
            should be returned. Must belong to the requesting FCM; newly created
            subtrader IDs take the form {your_account_id}_{suffix}, and any
            subtrader ID of yours (including legacy UUID-form IDs) is accepted.
            Required unless the API key is bound to a subtrader, in which case
            it defaults to the bound subtrader when omitted and must equal it
            when supplied.
          schema:
            type: string
            x-go-type-skip-optional-pointer: true
        - name: market_ticker
          in: query
          required: false
          description: >-
            Restricts the response to the cap scoped to this market when
            supplied.
          schema:
            type: string
            x-go-type-skip-optional-pointer: true
        - name: asset_class
          in: query
          required: false
          description: >-
            Restricts the response to the cap scoped to this asset class when
            supplied. Mutually exclusive with market_ticker.
          schema:
            type: string
            x-go-type-skip-optional-pointer: true
            enum:
              - Crypto
              - Equities
              - Metals
      responses:
        '200':
          description: Risk controls retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetFCMSubtraderRiskControlsResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
        '404':
          $ref: '#/components/responses/NotFoundError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    GetFCMSubtraderRiskControlsResponse:
      type: object
      required:
        - risk_controls
        - notional_limits
      properties:
        risk_controls:
          type: array
          description: One entry per configured initial margin cap.
          items:
            $ref: '#/components/schemas/FCMSubtraderRiskControls'
        notional_limits:
          type: array
          description: >-
            The admin-set notional value risk limits for the same subtrader as
            the rest of the response, sorted by market_ticker. An entry without
            a market_ticker is the whole-subtrader (all-markets) limit and sorts
            first; the rest are per-market. Set by exchange administration and
            read-only through this API; markets without a configured limit are
            omitted, and the market_ticker/asset_class filters apply only to
            risk_controls. Newly created subtrader IDs take the form
            {your_account_id}_{suffix}; legacy UUID-form subtraders are included
            as well.
          items:
            $ref: '#/components/schemas/FCMSubtraderNotionalRiskLimit'
    FCMSubtraderRiskControls:
      type: object
      required:
        - subtrader_id
        - im_cap
        - current_im
      properties:
        subtrader_id:
          type: string
          description: The subtrader the initial margin cap applies to.
        market_ticker:
          type: string
          description: Present only on a market-scoped cap.
          x-go-type-skip-optional-pointer: true
        asset_class:
          type: string
          description: >-
            Present only on an asset-class-scoped cap. A cap with neither
            market_ticker nor asset_class applies across all markets.
          x-go-type-skip-optional-pointer: true
          enum:
            - Crypto
            - Equities
            - Metals
        im_cap:
          allOf:
            - $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            A non-negative fixed-point US dollar amount with up to 4 decimal
            places.
          example: '100.0000'
        current_im:
          allOf:
            - $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            The initial margin currently attributable to this cap's scope, in
            fixed-point US dollars — the value the exchange compares against
            im_cap when admitting an order. Computed from the exchange's read
            model (positions plus resting orders), so it excludes orders still
            in flight and may slightly trail the engine. A market-scoped cap
            prices that market standalone; an asset-class cap prices the
            class-filtered portfolio, so hedged positions within the class
            margin jointly rather than summing per-market.
          example: '42.0000'
    FCMSubtraderNotionalRiskLimit:
      type: object
      required:
        - subtrader_id
        - notional_value_risk_limit
        - current_notional
      properties:
        subtrader_id:
          type: string
          description: The subtrader the notional value risk limit applies to.
        market_ticker:
          type: string
          description: >-
            The market the notional value risk limit applies to. Absent on the
            whole-subtrader (all-markets) limit.
          x-go-type-skip-optional-pointer: true
        notional_value_risk_limit:
          allOf:
            - $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            The notional value risk limit as a fixed-point US dollar string with
            4 decimal places.
          example: '5000.0000'
        current_notional:
          allOf:
            - $ref: '#/components/schemas/FixedPointDollars'
          description: >-
            The notional currently consumed against this limit, in fixed-point
            US dollars. Per market it is the larger of the subtrader's long side
            (position plus resting bids) and short side (position minus resting
            asks), over the signed net position; a whole-subtrader entry carries
            that value summed across every market the subtrader touches. Every
            term is priced through the market's risk-notional model, the same
            pricing the exchange's limit check uses: the cached mark for
            positions and the limit price for resting orders on mark-model asset
            classes, quantity times the fixed DV01 base on Rates. Computed from
            the exchange's read model, so it excludes orders still in flight and
            may slightly trail the engine.
          example: '1250.0000'
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
    FixedPointDollars:
      type: string
      description: >-
        Fixed-point US dollar string. Most request fields accept 2-4 decimal
        places (e.g., "0.56", "0.5600"); responses emit up to 6. Valid quote
        intervals for a given market are constrained by that market's price
        level structure.
      example: '0.5600'
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