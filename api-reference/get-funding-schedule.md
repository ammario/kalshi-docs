---
url: https://docs.kalshi.com/api-reference/get-funding-schedule
lastmod: 2026-10-25T20:54:46.122Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Funding Schedule

> Returns an asset class's funding schedule as a cron expression evaluated in US Eastern Time. Funding executes at each scheduled tick; schedules differ by asset class.



## OpenAPI

````yaml /perps_scm_openapi.yaml get /margin/funding_schedule
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
  /margin/funding_schedule:
    get:
      summary: Get Funding Schedule
      description: >-
        Returns an asset class's funding schedule as a cron expression evaluated
        in US Eastern Time. Funding executes at each scheduled tick; schedules
        differ by asset class.
      operationId: GetMarginFundingSchedule
      parameters:
        - name: asset_class
          in: query
          required: true
          schema:
            $ref: '#/components/schemas/AssetClass'
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMarginFundingScheduleResponse'
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
    AssetClass:
      type: string
      enum:
        - Crypto
        - Equities
        - Metals
        - Indices
        - Energy
      description: Asset class of the margin markets covered by this entry.
    GetMarginFundingScheduleResponse:
      type: object
      required:
        - schedule
      properties:
        schedule:
          type: string
          description: >-
            Cron expression evaluated in US Eastern Time (e.g. "0 */8 * * *" =
            midnight, 8AM and 4PM ET).
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