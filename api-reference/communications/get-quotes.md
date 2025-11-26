---
url: https://docs.kalshi.com/api-reference/communications/get-quotes
lastmod: 2025-11-25T20:57:32.842Z
---
# Get Quotes

>  Endpoint for getting quotes

## OpenAPI

````yaml openapi.yaml get /communications/quotes
paths:
  path: /communications/quotes
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security:
      - title: kalshiAccessKey & kalshiAccessSignature & kalshiAccessTimestamp
        parameters:
          query: {}
          header:
            KALSHI-ACCESS-KEY:
              type: apiKey
              description: Your API key ID
            KALSHI-ACCESS-SIGNATURE:
              type: apiKey
              description: RSA-PSS signature of the request
            KALSHI-ACCESS-TIMESTAMP:
              type: apiKey
              description: Request timestamp in milliseconds
          cookie: {}
    parameters:
      path: {}
      query:
        cursor:
          schema:
            - type: string
              description: >-
                Pagination cursor. Use the cursor value returned from the
                previous response to get the next page of results. Leave empty
                for the first page.
        event_ticker:
          schema:
            - type: string
              description: >-
                Event ticker of desired positions. Multiple event tickers can be
                provided as a comma-separated list (maximum 10).
        market_ticker:
          schema:
            - type: string
              description: Filter by market ticker
        limit:
          schema:
            - type: integer
              description: >-
                Parameter to specify the number of results per page. Defaults to
                500.
              maximum: 500
              minimum: 1
              default: 500
        status:
          schema:
            - type: string
              description: Filter quotes by status
        quote_creator_user_id:
          schema:
            - type: string
              description: Filter quotes by quote creator user ID
        rfq_creator_user_id:
          schema:
            - type: string
              description: Filter quotes by RFQ creator user ID
        rfq_creator_subtrader_id:
          schema:
            - type: string
              description: Filter quotes by RFQ creator subtrader ID (FCM members only)
        rfq_id:
          schema:
            - type: string
              description: Filter quotes by RFQ ID
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              quotes:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/Quote'
                    description: List of quotes matching the query criteria
              cursor:
                allOf:
                  - type: string
                    description: Cursor for pagination to get the next page of results
                    x-go-type-skip-optional-pointer: true
            refIdentifier: '#/components/schemas/GetQuotesResponse'
            requiredProperties:
              - quotes
        examples:
          example:
            value:
              quotes:
                - id: <string>
                  rfq_id: <string>
                  creator_id: <string>
                  rfq_creator_id: <string>
                  market_ticker: <string>
                  contracts: 123
                  yes_bid: 123
                  no_bid: 123
                  yes_bid_dollars: '0.5600'
                  no_bid_dollars: '0.5600'
                  created_ts: '2023-11-07T05:31:56Z'
                  updated_ts: '2023-11-07T05:31:56Z'
                  status: open
                  accepted_side: 'yes'
                  accepted_ts: '2023-11-07T05:31:56Z'
                  confirmed_ts: '2023-11-07T05:31:56Z'
                  executed_ts: '2023-11-07T05:31:56Z'
                  cancelled_ts: '2023-11-07T05:31:56Z'
                  rest_remainder: true
                  cancellation_reason: <string>
                  creator_user_id: <string>
                  rfq_creator_user_id: <string>
                  rfq_target_cost_centi_cents: 123
                  rfq_creator_order_id: <string>
                  creator_order_id: <string>
              cursor: <string>
        description: Quotes retrieved successfully
    '401':
      application/json:
        schemaArray:
          - type: object
            properties:
              code:
                allOf:
                  - &ref_0
                    type: string
                    description: Error code
              message:
                allOf:
                  - &ref_1
                    type: string
                    description: Human-readable error message
              details:
                allOf:
                  - &ref_2
                    type: string
                    description: Additional details about the error, if available
              service:
                allOf:
                  - &ref_3
                    type: string
                    description: The name of the service that generated the error
            refIdentifier: '#/components/schemas/ErrorResponse'
        examples:
          example:
            value:
              code: <string>
              message: <string>
              details: <string>
              service: <string>
        description: Unauthorized - authentication required
    '500':
      application/json:
        schemaArray:
          - type: object
            properties:
              code:
                allOf:
                  - *ref_0
              message:
                allOf:
                  - *ref_1
              details:
                allOf:
                  - *ref_2
              service:
                allOf:
                  - *ref_3
            refIdentifier: '#/components/schemas/ErrorResponse'
        examples:
          example:
            value:
              code: <string>
              message: <string>
              details: <string>
              service: <string>
        description: Internal server error
  deprecated: false
  type: path
components:
  schemas:
    FixedPointDollars:
      type: string
      description: >-
        US dollar amount as a fixed-point decimal string with exactly 4 decimal
        places
      example: '0.5600'
    Quote:
      type: object
      required:
        - id
        - rfq_id
        - creator_id
        - rfq_creator_id
        - market_ticker
        - contracts
        - yes_bid
        - no_bid
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
        contracts:
          type: integer
          description: Number of contracts in the quote
        yes_bid:
          type: integer
          description: Bid price for YES contracts, in cents
        no_bid:
          type: integer
          description: Bid price for NO contracts, in cents
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
        rfq_target_cost_centi_cents:
          type: integer
          format: int64
          description: Total value requested in the RFQ in centi-cents
        rfq_creator_order_id:
          type: string
          description: Order ID for the RFQ creator (private field)
          x-go-type-skip-optional-pointer: true
        creator_order_id:
          type: string
          description: Order ID for the quote creator (private field)
          x-go-type-skip-optional-pointer: true

````