---
url: https://docs.kalshi.com/api-reference/get-margin-reports
lastmod: 2026-10-15T20:06:16.125Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Margin Reports

> Margin reports for the authenticated clearing member, filterable by date range.



## OpenAPI

````yaml /perps_scm_openapi.yaml get /margin/reports
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
  /margin/reports:
    get:
      summary: Get Margin Reports
      description: >-
        Margin reports for the authenticated clearing member, filterable by date
        range.
      operationId: GetMarginReports
      parameters:
        - name: start_date
          in: query
          required: true
          schema:
            type: string
            format: date
        - name: end_date
          in: query
          required: true
          schema:
            type: string
            format: date
          description: Must be within 90 days of start_date.
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarginReportsResponse'
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
    GetMarginReportsResponse:
      type: object
      required:
        - reports
      properties:
        reports:
          type: array
          items:
            $ref: '#/components/schemas/MarginReport'
    MarginReport:
      type: object
      required:
        - report_type
        - url
        - date
        - created_ts
        - is_end_of_day
      properties:
        report_type:
          type: string
          enum:
            - trade_audit
            - position_snapshot
            - market_price_snapshot
            - funding_periods
            - settlement_periods
            - maintenance_margin
            - maintenance_margin_aggregate
            - cash_balance_daily
            - cash_activity_daily
            - daily_financial_summary
            - interest_on_collateral_monthly
            - daily_statement
          description: >-
            Report file type. Every type is a CSV except `daily_statement`, the
            end-of-day PDF statement that lays out the same date's position,
            trade, settlement, funding, and cash files with an account summary.
        url:
          type: string
          description: Presigned download URL (omitted from logs).
        date:
          type: string
          format: date
          description: >-
            The ET report date the file belongs to. Intraday snapshots after 4pm
            ET belong to the next report date.
        created_ts:
          type: string
          format: date-time
        is_end_of_day:
          type: boolean
        snapshot_ts:
          type: string
          format: date-time
          description: >-
            Snapshot instant for intraday files (noon and hourly cycles);
            omitted for end-of-day files.
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