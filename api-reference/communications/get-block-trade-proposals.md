---
url: https://docs.kalshi.com/api-reference/communications/get-block-trade-proposals
lastmod: 2026-06-24T22:54:24.352Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Block Trade Proposals

>  Endpoint for getting block trade proposals visible to the authenticated user.



## OpenAPI

````yaml /openapi.yaml get /communications/block-trade-proposals
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.22.0
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
    get:
      tags:
        - communications
      summary: Get Block Trade Proposals
      description: ' Endpoint for getting block trade proposals visible to the authenticated user.'
      operationId: GetBlockTradeProposals
      parameters:
        - $ref: '#/components/parameters/CursorQuery'
        - $ref: '#/components/parameters/MarketTickerQuery'
        - name: limit
          in: query
          description: >-
            Parameter to specify the number of results per page. Defaults to
            100.
          schema:
            type: integer
            format: int32
            minimum: 1
            maximum: 100
            default: 100
        - name: status
          in: query
          description: Filter block trade proposals by status
          schema:
            type: string
      responses:
        '200':
          description: Block trade proposals retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetBlockTradeProposalsResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - kalshiAccessKey: []
          kalshiAccessSignature: []
          kalshiAccessTimestamp: []
components:
  parameters:
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
    MarketTickerQuery:
      name: market_ticker
      in: query
      description: Filter by market ticker
      schema:
        type: string
        x-go-type-skip-optional-pointer: true
  schemas:
    GetBlockTradeProposalsResponse:
      type: object
      required:
        - block_trade_proposals
      properties:
        block_trade_proposals:
          type: array
          items:
            $ref: '#/components/schemas/BlockTradeProposal'
          description: List of block trade proposals
        cursor:
          type: string
          description: Cursor for pagination to get the next page of results
          x-go-type-skip-optional-pointer: true
    BlockTradeProposal:
      type: object
      required:
        - id
        - proposer_user_id
        - buyer_user_id
        - seller_user_id
        - market_ticker
        - price_centi_cents
        - centicount
        - maker_side
        - expiration_ts
        - status
        - created_ts
        - updated_ts
        - buyer_accepted
        - seller_accepted
      properties:
        id:
          type: string
          description: Unique identifier for the block trade proposal
        proposer_user_id:
          type: string
          description: User ID of the proposal creator
        buyer_user_id:
          type: string
          description: >-
            User ID of the buyer. Empty when the authenticated user is not the
            buyer.
        buyer_subtrader_id:
          type: string
          description: >-
            Subtrader ID of the buyer. Empty when the authenticated user is not
            the buyer.
          x-go-type-skip-optional-pointer: true
        seller_user_id:
          type: string
          description: >-
            User ID of the seller. Empty when the authenticated user is not the
            seller.
        seller_subtrader_id:
          type: string
          description: >-
            Subtrader ID of the seller. Empty when the authenticated user is not
            the seller.
          x-go-type-skip-optional-pointer: true
        market_ticker:
          type: string
          description: The ticker of the market for this block trade
        price_centi_cents:
          type: integer
          format: int64
          description: Price in centi-cents
        centicount:
          type: integer
          format: int64
          description: Number of contracts in centicounts
        maker_side:
          type: string
          description: The maker side of the trade
          enum:
            - 'yes'
            - 'no'
        expiration_ts:
          type: string
          format: date-time
          description: Expiration time of the proposal
        status:
          type: string
          description: Current status of the proposal
        created_ts:
          type: string
          format: date-time
          description: Timestamp when the proposal was created
        updated_ts:
          type: string
          format: date-time
          description: Timestamp when the proposal was last updated
        buyer_accepted:
          type: boolean
          description: Whether the buyer has accepted the proposal
        seller_accepted:
          type: boolean
          description: Whether the seller has accepted the proposal
        buyer_accepted_ts:
          type: string
          format: date-time
          description: Timestamp when the buyer accepted
        seller_accepted_ts:
          type: string
          format: date-time
          description: Timestamp when the seller accepted
        executed_ts:
          type: string
          format: date-time
          description: Timestamp when the proposal was executed
        buyer_order_id:
          type: string
          description: Order ID for the buyer after the proposal is executed
          x-go-type-skip-optional-pointer: true
        seller_order_id:
          type: string
          description: Order ID for the seller after the proposal is executed
          x-go-type-skip-optional-pointer: true
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