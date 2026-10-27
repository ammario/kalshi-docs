---
url: https://docs.kalshi.com/api-reference/get-member-funding-payments
lastmod: 2026-10-26T23:17:12.295Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Member Funding Payments

> Returns the member's funding payments for a given funding time, if available. Payments are written shortly after each funding execution, before the settlement that carries them.



## OpenAPI

````yaml /perps_scm_openapi.yaml get /margin/funding_payments
openapi: 3.0.0
info:
  title: Kalshi Clearing Member API
  version: 0.0.1
  description: >
    Klear API endpoints available to clearing members —

    institutional users who clear margin activity directly with

    Kalshi.


    ## Authentication


    All endpoints require an admin access token passed in the `Authorization`
    header:


    `Authorization: Bearer <admin_user_id>:<access_token>`


    To generate an access token and obtain your admin user id, sign in at

    https://klearing.kalshi.com, and navigate to the "Security" page.


    If you are in the process of onboarding to be a clearing member,

    please contact your contact at Kalshi for credentials. Otherwise,

    please contact institutional@kalshi.com.
servers:
  - url: https://api.klear.kalshi.com/klear-api/v1
    description: Production
  - url: https://demo-api.kalshi.co/klear-api/v1
    description: Demo
security:
  - kalshiBearer: []
paths:
  /margin/funding_payments:
    get:
      summary: Get Member Funding Payments
      description: >-
        Returns the member's funding payments for a given funding time, if
        available. Payments are written shortly after each funding execution,
        before the settlement that carries them.
      operationId: GetMemberFundingPayments
      parameters:
        - name: funding_time
          in: query
          required: true
          schema:
            type: string
            format: date-time
          description: >-
            The funding execution to read, as an RFC3339 timestamp. Funding is
            scheduled in ET.
        - name: market_ticker
          in: query
          required: false
          schema:
            type: string
          description: Restrict rows to one market.
        - name: limit
          in: query
          required: false
          schema:
            type: integer
            default: 1000
            maximum: 10000
          description: Number of rows per page.
        - name: cursor
          in: query
          required: false
          schema:
            type: string
          description: Opaque cursor from a previous response to fetch the next page.
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMemberFundingPaymentsResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    GetMemberFundingPaymentsResponse:
      type: object
      required:
        - payments
      properties:
        payments:
          type: array
          items:
            $ref: '#/components/schemas/MemberFundingPayment'
        cursor:
          type: string
          description: >-
            Opaque cursor; pass as the `cursor` query param to fetch the next
            page. Absent when there are no more results.
    MemberFundingPayment:
      allOf:
        - $ref: '#/components/schemas/FundingPaymentDetail'
        - type: object
          required:
            - settlement_execution_time
          properties:
            settlement_execution_time:
              type: string
              format: date-time
              description: >-
                Execution time of the FCM-to-clearinghouse omnibus settlement
                that will carry (or carried) this payment.
    Error:
      type: object
      required:
        - code
        - message
      properties:
        code:
          type: string
          description: Machine-readable error code.
        message:
          type: string
          description: Human-readable error message.
        details:
          type: string
        service:
          type: string
    FundingPaymentDetail:
      type: object
      required:
        - id
        - market_ticker
        - subtrader_id
        - funding_time
        - position_quantity_fp
        - notional_value_centicents
        - funding_amount_centicents
      properties:
        id:
          type: string
        market_ticker:
          type: string
        subtrader_id:
          type: string
        funding_time:
          type: string
          format: date-time
          description: The funding period this payment applies to.
        position_quantity_fp:
          type: string
          description: >-
            Signed position at funding time as a fixed-point contract count
            (e.g. "1.25").
        notional_value_centicents:
          type: integer
          format: int64
          description: >-
            Signed notional value (position times mark price) the funding
            payment was computed from.
        funding_amount_centicents:
          type: integer
          format: int64
          description: Signed funding amount; positive when received, negative when paid.
  responses:
    BadRequestError:
      description: Bad request - invalid input
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    UnauthorizedError:
      description: Missing or invalid authentication
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    ForbiddenError:
      description: Caller is not permitted to access this resource
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    InternalServerError:
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
  securitySchemes:
    kalshiBearer:
      type: http
      scheme: bearer
      bearerFormat: admin_user_id:access_token
      description: >
        Pass `Authorization: Bearer <admin_user_id>:<access_token>` on each
        request.

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.