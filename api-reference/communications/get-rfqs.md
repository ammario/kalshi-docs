---
url: https://docs.kalshi.com/api-reference/communications/get-rfqs
lastmod: 2026-02-27T20:13:08.384Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get RFQs

>  Endpoint for getting RFQs



## OpenAPI

````yaml openapi.yaml get /communications/rfqs
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.8.0
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
  /communications/rfqs:
    get:
      tags:
        - communications
      summary: Get RFQs
      description: ' Endpoint for getting RFQs'
      operationId: GetRFQs
      parameters:
        - $ref: '#/components/parameters/CursorQuery'
        - $ref: '#/components/parameters/EventTickerQuery'
        - $ref: '#/components/parameters/MarketTickerQuery'
        - $ref: '#/components/parameters/SubaccountQuery'
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
          description: Filter RFQs by status
          schema:
            type: string
        - name: creator_user_id
          in: query
          description: Filter RFQs by creator user ID
          schema:
            type: string
      responses:
        '200':
          description: RFQs retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetRFQsResponse'
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
    EventTickerQuery:
      name: event_ticker
      in: query
      description: >-
        Event ticker of desired positions. Multiple event tickers can be
        provided as a comma-separated list (maximum 10).
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
    SubaccountQuery:
      name: subaccount
      in: query
      description: >-
        Subaccount number (0 for primary, 1-32 for subaccounts). If omitted,
        defaults to all subaccounts.
      schema:
        type: integer
  schemas:
    GetRFQsResponse:
      type: object
      required:
        - rfqs
      properties:
        rfqs:
          type: array
          items:
            $ref: '#/components/schemas/RFQ'
          description: List of RFQs matching the query criteria
        cursor:
          type: string
          description: Cursor for pagination to get the next page of results
          x-go-type-skip-optional-pointer: true
    RFQ:
      type: object
      required:
        - id
        - creator_id
        - contracts
        - contracts_fp
        - market_ticker
        - status
        - created_ts
      properties:
        id:
          type: string
          description: Unique identifier for the RFQ
        creator_id:
          type: string
          description: >-
            Public communications ID of the RFQ creator. Exposed post-execution
            to the creator.
        market_ticker:
          type: string
          description: The ticker of the market this RFQ is for
        contracts:
          type: integer
          description: Number of contracts requested in the RFQ
        contracts_fp:
          $ref: '#/components/schemas/FixedPointCount'
          description: >-
            String representation of the number of contracts requested in the
            RFQ
        target_cost_centi_cents:
          type: integer
          format: int64
          description: >-
            DEPRECATED: Total value of the RFQ in centi-cents. Use
            target_cost_dollars instead.
          deprecated: true
        target_cost_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          description: Total value of the RFQ in dollars
        status:
          type: string
          description: Current status of the RFQ (open, closed)
          enum:
            - open
            - closed
        created_ts:
          type: string
          format: date-time
          description: Timestamp when the RFQ was created
        mve_collection_ticker:
          type: string
          description: Ticker of the MVE collection this market belongs to
          x-go-type-skip-optional-pointer: true
        mve_selected_legs:
          type: array
          x-omitempty: true
          items:
            $ref: '#/components/schemas/MveSelectedLeg'
          description: Selected legs for the MVE collection
          x-go-type-skip-optional-pointer: true
        rest_remainder:
          type: boolean
          description: Whether to rest the remainder of the RFQ after execution
        cancellation_reason:
          type: string
          description: Reason for RFQ cancellation if cancelled
          x-go-type-skip-optional-pointer: true
        creator_user_id:
          type: string
          description: User ID of the RFQ creator (private field)
          x-go-type-skip-optional-pointer: true
        cancelled_ts:
          type: string
          format: date-time
          description: Timestamp when the RFQ was cancelled
        updated_ts:
          type: string
          format: date-time
          description: Timestamp when the RFQ was last updated
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
        "10", "10.0", "10.00"); responses always emit 2 decimals. Currently only
        whole contract values are permitted, but the format supports future
        fractional precision. Integer contract count fields are legacy and will
        be deprecated; when both integer and fp fields are provided, they must
        match.
      example: '10.00'
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with up to 4 decimal
        places of precision. This is the maximum supported precision; valid
        quote intervals for a given market are constrained by that market's
        price level structure.
      example: '0.5600'
    MveSelectedLeg:
      type: object
      properties:
        event_ticker:
          type: string
          description: Unique identifier for the selected event
          x-go-type-skip-optional-pointer: true
        market_ticker:
          type: string
          description: Unique identifier for the selected market
          x-go-type-skip-optional-pointer: true
        side:
          type: string
          description: The side of the selected market
          x-go-type-skip-optional-pointer: true
        yes_settlement_value_dollars:
          $ref: '#/components/schemas/FixedPointDollars'
          nullable: true
          x-omitempty: true
          description: >-
            The settlement value of the YES/LONG side of the contract in
            dollars. Only filled after determination
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