---
url: https://docs.kalshi.com/api-reference/create-subtrader-group
lastmod: 2026-10-14T21:44:02.416Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Create Subtrader Group

> Create a margin subtrader group. Grouped subtraders are margined as one netted portfolio at each settlement.



## OpenAPI

````yaml /perps_scm_openapi.yaml post /fcm/margin/subtrader_groups
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
  /fcm/margin/subtrader_groups:
    post:
      summary: Create Subtrader Group
      description: >-
        Create a margin subtrader group. Grouped subtraders are margined as one
        netted portfolio at each settlement.
      operationId: CreateMarginSubtraderGroup
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateMarginSubtraderGroupRequest'
      responses:
        '200':
          description: Group created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateMarginSubtraderGroupResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
        '404':
          $ref: '#/components/responses/NotFoundError'
        '409':
          $ref: '#/components/responses/ConflictError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    CreateMarginSubtraderGroupRequest:
      type: object
      required:
        - subtrader_ids
      properties:
        subtrader_ids:
          type: array
          minItems: 1
          items:
            type: string
            minLength: 1
          description: >-
            List of subtrader IDs belonging to the clearing member that will
            comprise the group. Subtraders must not belong to another group.
    CreateMarginSubtraderGroupResponse:
      type: object
      required:
        - group_id
      properties:
        group_id:
          type: string
          format: uuid
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
    ConflictError:
      description: Request conflicts with existing state
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