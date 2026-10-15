---
url: https://docs.kalshi.com/api-reference/get-settlement-balance-history
lastmod: 2026-10-14T21:44:02.364Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Settlement Balance History

> Settlement balance changes for the authenticated clearing member, ordered by most recent first.



## OpenAPI

````yaml /perps_scm_openapi.yaml get /margin/settlement_balance_history
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
  /margin/settlement_balance_history:
    get:
      summary: Get Settlement Balance History
      description: >-
        Settlement balance changes for the authenticated clearing member,
        ordered by most recent first.
      operationId: GetSettlementBalanceHistory
      parameters:
        - name: limit
          in: query
          required: false
          schema:
            type: integer
            default: 100
            maximum: 500
          description: Number of results per page.
        - name: cursor
          in: query
          required: false
          schema:
            type: string
          description: Cursor from a previous response to fetch the next page.
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetSettlementBalanceHistoryResponse'
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
    GetSettlementBalanceHistoryResponse:
      type: object
      required:
        - entries
      properties:
        entries:
          type: array
          items:
            $ref: '#/components/schemas/SettlementBalanceHistoryEntry'
        cursor:
          type: string
          description: >-
            Pass as the `cursor` query param to fetch the next page. Absent when
            there are no more results.
    SettlementBalanceHistoryEntry:
      type: object
      required:
        - balance_delta_centicents
        - locked_balance_delta_centicents
        - reason
        - business_transaction_id
        - created_ts
      properties:
        balance_delta_centicents:
          type: integer
          format: int64
          description: Change to the settlement buffer balance.
        locked_balance_delta_centicents:
          type: integer
          format: int64
          description: >-
            Change to the locked settlement balance. Funds are locked during
            pending withdrawals.
        reason:
          type: string
          description: Reason for the balance change.
        business_transaction_id:
          type: string
          description: Identifier of the business transaction that caused this entry.
        created_ts:
          type: string
          format: date-time
          description: Timestamp when the entry was created.
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