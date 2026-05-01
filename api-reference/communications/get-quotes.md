---
url: https://docs.kalshi.com/api-reference/communications/get-quotes
lastmod: 2026-05-01T00:13:56.554Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Quotes

>  Endpoint for getting quotes



## OpenAPI

````yaml /openapi.yaml get /communications/quotes
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.15.0
  description: >-
    Manually defined OpenAPI spec for endpoints being migrated to spec-first
    approach
servers:
  - url: https://api.elections.kalshi.com/trade-api/v2
    description: Production server
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
  /communications/quotes:
    get:
      tags:
        - communications
      summary: Get Quotes
      description: ' Endpoint for getting quotes'
      operationId: GetQuotes
      parameters:
        - $ref: '#/components/parameters/CursorQuery'
        - $ref: '#/components/parameters/SingleEventTickerQuery'
        - $ref: '#/components/parameters/MarketTickerQuery'
        - name: limit
          in: query
          description: >-
            Parameter to specify the number of results per page. Defaults to
            500.
          schema:
            type: integer
            format: int32
            minimum: 1
            maximum: 500
            default: 500
        - name: status
          in: query
          description: Filter quotes by status
          schema:
            type: string
            x-go-type-skip-optional-pointer: true
        - name: quote_creator_user_id
          in: query
          description: Filter quotes by quote creator user ID
          schema:
            type: string
            x-go-type-skip-optional-pointer: true
        - name: rfq_creator_user_id
          in: query
          description: Filter quotes by RFQ creator user ID
          schema:
            type: string
            x-go-type-skip-optional-pointer: true
        - name: rfq_creator_subtrader_id
          in: query
          description: Filter quotes by RFQ creator subtrader ID (FCM members only)
          schema:
            type: string
            x-go-type-skip-optional-pointer: true
        - name: rfq_id
          in: query
          description: Filter quotes by RFQ ID
          schema:
            type: string
            x-go-type-skip-optional-pointer: true
      responses:
        '200':
          description: Quotes retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetQuotesResponse'
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
    SingleEventTickerQuery:
      name: event_ticker
      in: query
      description: Event ticker to filter by. Only a single event ticker is supported.
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
    GetQuotesResponse:
      type: object
      required:
        - quotes
      properties:
        quotes:
          type: array
          items:
            $ref: '#/components/schemas/Quote'
          description: List of quotes matching the query criteria
        cursor:
          type: string
          description: Cursor for pagination to get the next page of results
          x-go-type-skip-optional-pointer: true
    Quote:
      type: object
      required:
        - id
        - rfq_id
        - creator_id
        - rfq_creator_id
        - market_ticker
        - contracts_fp
        - yes_bid_dollars
        - no_bid_dollars
        - created_ts
        - updated_ts
        - status
      properties:
        id:
          type: string
          description: Unique identifier for the quote
        rfq_id:
          type: string
          description: ID of the RFQ this quote is responding to
        creator_id:
          type: string
          description: Public communications ID of the quote creator
        rfq_creator_id:
          type: string
          description: Public communications ID of the RFQ creator
          x-go-type-skip-optional-pointer: true
        market_ticker:
          type: string
          description: The ticker of the market this quote is for
        contracts_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: String representation of the number of contracts in the quote
        yes_bid_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Bid price for YES contracts, in dollars
        no_bid_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Bid price for NO contracts, in dollars
        created_ts:
          type: string
          format: date-time
          description: Timestamp when the quote was created
        updated_ts:
          type: string
          format: date-time
          description: Timestamp when the quote was last updated
        status:
          type: string
          description: Current status of the quote
          enum:
            - open
            - accepted
            - confirmed
            - executed
            - cancelled
        accepted_side:
          type: string
          description: The side that was accepted (yes or no)
          enum:
            - 'yes'
            - 'no'
        accepted_ts:
          type: string
          format: date-time
          description: Timestamp when the quote was accepted
        confirmed_ts:
          type: string
          format: date-time
          description: Timestamp when the quote was confirmed
        executed_ts:
          type: string
          format: date-time
          description: Timestamp when the quote was executed
        cancelled_ts:
          type: string
          format: date-time
          description: Timestamp when the quote was cancelled
        rest_remainder:
          type: boolean
          description: Whether to rest the remainder of the quote after execution
        cancellation_reason:
          type: string
          description: Reason for quote cancellation if cancelled
          x-go-type-skip-optional-pointer: true
        creator_user_id:
          type: string
          description: User ID of the quote creator (private field)
          x-go-type-skip-optional-pointer: true
        rfq_creator_user_id:
          type: string
          description: User ID of the RFQ creator (private field)
          x-go-type-skip-optional-pointer: true
        rfq_target_cost_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Total value requested in the RFQ in dollars
        rfq_creator_order_id:
          type: string
          description: Order ID for the RFQ creator (private field)
          x-go-type-skip-optional-pointer: true
        creator_order_id:
          type: string
          description: Order ID for the quote creator (private field)
          x-go-type-skip-optional-pointer: true
        creator_subaccount:
          type: integer
          description: >-
            Subaccount number of the quote creator (visible when the caller is
            the quote creator)
        rfq_creator_subaccount:
          type: integer
          description: >-
            Subaccount number of the RFQ creator (visible when the caller is the
            RFQ creator)
        yes_contracts_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: Number of YES contracts offered in the quote (fixed-point)
        no_contracts_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: Number of NO contracts offered in the quote (fixed-point)
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
    FixedPointCount:
      type: string
      description: >-
        Fixed-point contract count string (2 decimals, e.g., "10.00"; referred
        to as "fp" in field names). Requests accept 0–2 decimal places (e.g.,
        "10", "10.0", "10.00"); responses always emit 2 decimals. Fractional
        contract values (e.g., "2.50") are supported on markets with fractional
        trading enabled; the minimum granularity is 0.01 contracts. Integer
        contract count fields are legacy and will be deprecated; when both
        integer and fp fields are provided, they must match.
      example: '10.00'
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with up to 6 decimal
        places of precision. This is the maximum supported precision; valid
        quote intervals for a given market are constrained by that market's
        price level structure.
      example: '0.5600'
  responses:
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