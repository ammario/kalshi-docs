---
url: https://docs.kalshi.com/api-reference/get-obligation-maintenance-margin-details
lastmod: 2026-10-23T16:35:21.521Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Obligation Maintenance Margin Details

> Pages the full per-subtrader maintenance margin breakdown of one obligation. The inline maintenance_margin_details array on obligation responses is capped at 1000 rows (maintenance_margin_details_truncated is set when the cap applied); this endpoint serves the complete set.



## OpenAPI

````yaml /perps_scm_openapi.yaml get /margin/obligations/{obligation_id}/maintenance_margin_details
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
  /margin/obligations/{obligation_id}/maintenance_margin_details:
    get:
      summary: Get Obligation Maintenance Margin Details
      description: >-
        Pages the full per-subtrader maintenance margin breakdown of one
        obligation. The inline maintenance_margin_details array on obligation
        responses is capped at 1000 rows (maintenance_margin_details_truncated
        is set when the cap applied); this endpoint serves the complete set.
      operationId: GetObligationMaintenanceMarginDetails
      parameters:
        - name: obligation_id
          in: path
          required: true
          schema:
            type: string
        - name: limit
          in: query
          required: false
          schema:
            type: integer
            default: 1000
            maximum: 1000
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
                $ref: >-
                  #/components/schemas/GetObligationMaintenanceMarginDetailsResponse
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
components:
  schemas:
    GetObligationMaintenanceMarginDetailsResponse:
      type: object
      required:
        - maintenance_margin_details
      properties:
        maintenance_margin_details:
          type: array
          items:
            $ref: '#/components/schemas/MaintenanceMarginDetail'
        cursor:
          type: string
          description: >-
            Opaque cursor; pass as the `cursor` query param to fetch the next
            page. Absent when there are no more results.
    MaintenanceMarginDetail:
      type: object
      required:
        - id
        - subtrader_id
        - maintenance_margin_centicents
        - maintenance_margin_delta_centicents
      properties:
        id:
          type: string
        subtrader_id:
          type: string
          description: >-
            Empty when not populated or when the subtrader is part of a
            subtrader group.
        margin_group_id:
          type: string
          description: Set when the subtrader is part of a subtrader group.
        maintenance_margin_centicents:
          type: integer
          format: int64
          description: Maintenance margin requirement after this settlement.
        maintenance_margin_delta_centicents:
          type: integer
          format: int64
          description: >-
            Change in maintenance margin between the previous settlement and
            this one.
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
    NotFoundError:
      description: Resource not found
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