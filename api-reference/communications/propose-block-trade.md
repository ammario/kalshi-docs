---
url: https://docs.kalshi.com/api-reference/communications/propose-block-trade
lastmod: 2026-07-22T14:53:03.401Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Propose Block Trade

>  Endpoint for creating a block trade proposal.



## OpenAPI

````yaml /openapi.yaml post /communications/block-trade-proposals
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.26.0
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
  /communications/block-trade-proposals:
    post:
      tags:
        - communications
      summary: Propose Block Trade
      description: ' Endpoint for creating a block trade proposal.'
      operationId: ProposeBlockTrade
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProposeBlockTradeRequest'
      responses:
        '201':
          description: Block trade proposal created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProposeBlockTradeResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  schemas:
    ProposeBlockTradeRequest:
      type: object
      required:
        - buyer_user_id
        - seller_user_id
        - market_ticker
        - price_centi_cents
        - centicount
        - maker_side
        - expiration_ts
      properties:
        buyer_user_id:
          type: string
          description: User ID of the buyer
          x-oapi-codegen-extra-tags:
            validate: required
        buyer_subtrader_id:
          type: string
          description: >-
            Subtrader ID of the buyer. Provide either this or buyer_subaccount,
            not both.
          x-go-type-skip-optional-pointer: true
        buyer_subaccount:
          type: integer
          minimum: 0
          maximum: 63
          description: >-
            User-managed subaccount number of the buyer (0 for primary, 1-63 for
            numbered subaccounts). Provide either this or buyer_subtrader_id,
            not both.
        seller_user_id:
          type: string
          description: User ID of the seller
          x-oapi-codegen-extra-tags:
            validate: required
        seller_subtrader_id:
          type: string
          description: >-
            Subtrader ID of the seller. Provide either this or
            seller_subaccount, not both.
          x-go-type-skip-optional-pointer: true
        seller_subaccount:
          type: integer
          minimum: 0
          maximum: 63
          description: >-
            User-managed subaccount number of the seller (0 for primary, 1-63
            for numbered subaccounts). Provide either this or
            seller_subtrader_id, not both.
        market_ticker:
          type: string
          description: The ticker of the market for this block trade
          x-oapi-codegen-extra-tags:
            validate: required
        price_centi_cents:
          type: integer
          format: int64
          minimum: 1
          description: Price in centi-cents
          x-oapi-codegen-extra-tags:
            validate: required,gt=0
        centicount:
          type: integer
          format: int64
          minimum: 1
          description: Number of contracts in centicounts
          x-oapi-codegen-extra-tags:
            validate: required,gt=0
        maker_side:
          type: string
          description: The maker side of the trade
          enum:
            - 'yes'
            - 'no'
          x-oapi-codegen-extra-tags:
            validate: required,oneof=yes no
        expiration_ts:
          type: string
          format: date-time
          description: Expiration time of the proposal
          x-oapi-codegen-extra-tags:
            validate: required
    ProposeBlockTradeResponse:
      type: object
      required:
        - block_trade_proposal_id
      properties:
        block_trade_proposal_id:
          type: string
          description: The ID of the newly created block trade proposal
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
        service:
          type: string
          description: The name of the service that generated the error
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