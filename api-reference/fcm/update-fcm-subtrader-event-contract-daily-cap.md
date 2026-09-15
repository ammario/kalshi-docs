---
url: https://docs.kalshi.com/api-reference/fcm/update-fcm-subtrader-event-contract-daily-cap
lastmod: 2026-09-14T19:37:19.775Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Update FCM Subtrader Event Contract Daily Cap

> Sets the event-contract daily premium cap for an FCM member's subtrader. The cap bounds
the subtrader's net premium at risk per trading day. It is enforced on cap-reservation
sessions — which every subtrader-bound API key uses — and is mandatory there: a subtrader
with no cap cannot trade through its bound keys. Cap changes take effect immediately;
existing resting orders are never cancelled by a cap change.




## OpenAPI

````yaml /openapi.yaml put /fcm/subtraders/event_contract_daily_cap
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
    put:
      tags:
        - fcm
      summary: Update FCM Subtrader Event Contract Daily Cap
      description: >
        Sets the event-contract daily premium cap for an FCM member's subtrader.
        The cap bounds

        the subtrader's net premium at risk per trading day. It is enforced on
        cap-reservation

        sessions — which every subtrader-bound API key uses — and is mandatory
        there: a subtrader

        with no cap cannot trade through its bound keys. Cap changes take effect
        immediately;

        existing resting orders are never cancelled by a cap change.
      operationId: UpdateFCMEventContractDailyCap
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateFCMEventContractDailyCapRequest'
      responses:
        '200':
          description: Daily cap updated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/EmptyResponse'
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
    UpdateFCMEventContractDailyCapRequest:
      type: object
      required:
        - subtrader_id
        - limit
      properties:
        subtrader_id:
          type: string
          description: >-
            The subtrader whose daily cap should be set. Must belong to the
            requesting FCM.
        limit:
          $ref: '#/components/schemas/FixedPointDollars'
    EmptyResponse:
      type: object
      description: An empty response body
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