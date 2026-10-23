---
url: https://docs.kalshi.com/api-reference/get-large-trader-positions
lastmod: 2026-10-22T21:54:51.942Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Large Trader Positions

> Positions of the authenticated clearing member that meet the CFTC large-trader reporting levels for a settlement day (17 CFR 15.03(b); each row's reportable_threshold is its market's level), plus exit-day positions that were reportable on the prior settlement day and are now below the threshold. Members with reportable positions are subject to their own CFTC Part 17 large-trader reporting obligations; this endpoint provides the position data needed to meet them. Empty when no positions meet the reporting levels and no prior-day reportable positions need exit reporting. See the CFTC's Large Trader Reporting Program (https://www.cftc.gov/IndustryOversight/MarketSurveillance/LargeTraderReportingProgram/index.htm) and reporting levels at 17 CFR 15.03 (https://www.ecfr.gov/current/title-17/chapter-I/part-15).



## OpenAPI

````yaml /perps_scm_openapi.yaml get /margin/large_trader_positions
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
  /margin/large_trader_positions:
    get:
      summary: Get Large Trader Positions
      description: >-
        Positions of the authenticated clearing member that meet the CFTC
        large-trader reporting levels for a settlement day (17 CFR 15.03(b);
        each row's reportable_threshold is its market's level), plus exit-day
        positions that were reportable on the prior settlement day and are now
        below the threshold. Members with reportable positions are subject to
        their own CFTC Part 17 large-trader reporting obligations; this endpoint
        provides the position data needed to meet them. Empty when no positions
        meet the reporting levels and no prior-day reportable positions need
        exit reporting. See the CFTC's Large Trader Reporting Program
        (https://www.cftc.gov/IndustryOversight/MarketSurveillance/LargeTraderReportingProgram/index.htm)
        and reporting levels at 17 CFR 15.03
        (https://www.ecfr.gov/current/title-17/chapter-I/part-15).
      operationId: GetLargeTraderPositions
      parameters:
        - name: report_date
          in: query
          required: false
          schema:
            type: string
            format: date
          description: >-
            ET settlement day to report, YYYY-MM-DD. Defaults to the most recent
            ET settlement day whose settlement window has closed.
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetLargeTraderPositionsResponse'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    GetLargeTraderPositionsResponse:
      type: object
      properties:
        user_id:
          type: string
        report_date:
          type: string
          format: date
          description: ET settlement day the positions are reported for.
        positions:
          type: array
          items:
            type: object
            properties:
              market_ticker:
                type: string
              position:
                type: integer
                description: >-
                  Signed contract count; positive long, negative short. Can be
                  below the reportable threshold when exit_day is true.
              exit_day:
                type: boolean
                description: >-
                  True when this row is included because the same market was
                  reportable on the prior settlement day but is now below the
                  reportable threshold.
              reportable_threshold:
                type: integer
                format: int64
                description: >-
                  CFTC reporting level for this market, in contracts (17 CFR
                  15.03(b)). A position of at least this size in either
                  direction is reportable.
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