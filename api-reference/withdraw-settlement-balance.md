---
url: https://docs.kalshi.com/api-reference/withdraw-settlement-balance
lastmod: 2026-10-22T21:54:52.039Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Withdraw Settlement Balance

> Initiate a wire withdrawal from the clearing member's settlement buffer. The withdrawal is processed asynchronously.



## OpenAPI

````yaml /perps_scm_openapi.yaml post /margin/withdraw_settlement_balance
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
  /margin/withdraw_settlement_balance:
    post:
      summary: Withdraw Settlement Balance
      description: >-
        Initiate a wire withdrawal from the clearing member's settlement buffer.
        The withdrawal is processed asynchronously.
      operationId: WithdrawSettlementBalance
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/WithdrawSettlementBalanceRequest'
      responses:
        '200':
          description: Withdrawal initiated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/WithdrawSettlementBalanceResponse'
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
    WithdrawSettlementBalanceRequest:
      type: object
      required:
        - amount
      properties:
        amount:
          type: string
          description: >-
            Amount to withdraw in USD as a fixed-point string (e.g. "500.00").
            Must be positive.
    WithdrawSettlementBalanceResponse:
      type: object
      required:
        - id
      properties:
        id:
          type: string
          description: ID of the withdrawal. The withdrawal is processed asynchronously.
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