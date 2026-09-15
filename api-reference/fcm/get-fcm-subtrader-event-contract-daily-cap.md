---
url: https://docs.kalshi.com/api-reference/fcm/get-fcm-subtrader-event-contract-daily-cap
lastmod: 2026-09-14T19:37:19.717Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get FCM Subtrader Event Contract Daily Cap

> Returns the event-contract daily premium cap configured for an FCM member's subtrader,
together with its live utilization. Executed utilization is the net premium deployed by
fills today (sells and settlements credit back); resting and pending utilization reserve
open and in-flight orders at their full worst-case cost plus fees. Executed utilization
resets at midnight New York time on the returned cap date; resting and pending
reservations persist for as long as their orders remain open, including across the reset.
Returns 404 when the subtrader has no cap configured — in that state every order placed
through the subtrader's bound API keys is rejected.




## OpenAPI

````yaml /openapi.yaml get /fcm/subtraders/event_contract_daily_cap
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.30.0
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
  /fcm/subtraders/event_contract_daily_cap:
    get:
      tags:
        - fcm
      summary: Get FCM Subtrader Event Contract Daily Cap
      description: >
        Returns the event-contract daily premium cap configured for an FCM
        member's subtrader,

        together with its live utilization. Executed utilization is the net
        premium deployed by

        fills today (sells and settlements credit back); resting and pending
        utilization reserve

        open and in-flight orders at their full worst-case cost plus fees.
        Executed utilization

        resets at midnight New York time on the returned cap date; resting and
        pending

        reservations persist for as long as their orders remain open, including
        across the reset.

        Returns 404 when the subtrader has no cap configured — in that state
        every order placed

        through the subtrader's bound API keys is rejected.
      operationId: GetFCMEventContractDailyCap
      parameters:
        - name: subtrader_id
          in: query
          required: true
          description: >-
            The subtrader whose daily cap should be returned. Must belong to the
            requesting FCM.
          schema:
            type: string
      responses:
        '200':
          description: Daily cap retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetFCMEventContractDailyCapResponse'
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
    GetFCMEventContractDailyCapResponse:
      type: object
      required:
        - subtrader_id
        - limit
        - executed_utilization
        - resting_order_utilization
        - pending_order_utilization
        - cap_date
      properties:
        subtrader_id:
          type: string
        limit:
          $ref: '#/components/schemas/FixedPointDollars'
        executed_utilization:
          $ref: '#/components/schemas/FixedPointDollars'
        resting_order_utilization:
          $ref: '#/components/schemas/FixedPointDollars'
        pending_order_utilization:
          $ref: '#/components/schemas/FixedPointDollars'
        cap_date:
          type: string
          description: >-
            The New York calendar date the executed utilization applies to.
            Executed utilization resets at midnight New York time; resting and
            pending reservations persist while their orders remain open.
    FixedPointDollars:
      type: string
      description: >-
        Fixed-point US dollar string. Most request fields accept 2-4 decimal
        places (e.g., "0.56", "0.5600"); responses emit up to 6. Valid quote
        intervals for a given market are constrained by that market's price
        level structure.
      example: '0.5600'
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