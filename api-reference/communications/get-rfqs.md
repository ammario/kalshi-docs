---
url: https://docs.kalshi.com/api-reference/communications/get-rfqs
lastmod: 2025-10-31T21:41:14.434Z
---
# Get RFQs

>  Endpoint for getting RFQs

## OpenAPI

````yaml openapi.yaml get /communications/rfqs
paths:
  path: /communications/rfqs
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
                The cursor represents a pointer to the next page of records in
                the pagination
        limit:
          schema:
            - type: integer
              description: >-
                Parameter to specify the number of results per page. Defaults to
                100.
              maximum: 100
              minimum: 1
              default: 100
        market_ticker:
          schema:
            - type: string
              description: Filter RFQs by market ticker
        event_ticker:
          schema:
            - type: string
              description: Filter RFQs by event ticker
        status:
          schema:
            - type: string
              description: Filter RFQs by status
        creator_user_id:
          schema:
            - type: string
              description: Filter RFQs by creator user ID
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              rfqs:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/RFQ'
                    description: List of RFQs matching the query criteria
              cursor:
                allOf:
                  - type: string
                    description: Cursor for pagination to get the next page of results
            refIdentifier: '#/components/schemas/GetRFQsResponse'
            requiredProperties:
              - rfqs
        examples:
          example:
            value:
              rfqs:
                - id: <string>
                  creator_id: <string>
                  market_ticker: <string>
                  contracts: 123
                  target_cost_centi_cents: 123
                  status: open
                  created_ts: '2023-11-07T05:31:56Z'
                  mve_collection_ticker: <string>
                  mve_selected_legs:
                    - event_ticker: <string>
                      market_ticker: <string>
                      side: <string>
                  rest_remainder: true
                  cancellation_reason: <string>
                  creator_user_id: <string>
                  cancelled_ts: '2023-11-07T05:31:56Z'
                  updated_ts: '2023-11-07T05:31:56Z'
              cursor: <string>
        description: RFQs retrieved successfully
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
    RFQ:
      type: object
      required:
        - id
        - creator_id
        - market_ticker
        - status
        - created_ts
      properties:
        id:
          type: string
          description: Unique identifier for the RFQ
        creator_id:
          type: string
          description: Public communications ID of the RFQ creator
        market_ticker:
          type: string
          description: The ticker of the market this RFQ is for
        contracts:
          type: integer
          description: Number of contracts requested in the RFQ
        target_cost_centi_cents:
          type: integer
          format: int64
          description: Total value of the RFQ in centi-cents
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
        mve_selected_legs:
          type: array
          nullable: true
          items:
            $ref: '#/components/schemas/MveSelectedLeg'
          description: Selected legs for the MVE collection
        rest_remainder:
          type: boolean
          description: Whether to rest the remainder of the RFQ after execution
        cancellation_reason:
          type: string
          description: Reason for RFQ cancellation if cancelled
        creator_user_id:
          type: string
          description: User ID of the RFQ creator (private field)
        cancelled_ts:
          type: string
          format: date-time
          description: Timestamp when the RFQ was cancelled
        updated_ts:
          type: string
          format: date-time
          description: Timestamp when the RFQ was last updated
    MveSelectedLeg:
      type: object
      properties:
        event_ticker:
          type: string
          description: Unique identifier for the selected event
        market_ticker:
          type: string
          description: Unique identifier for the selected market
        side:
          type: string
          description: The side of the selected market

````