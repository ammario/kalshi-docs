---
url: https://docs.kalshi.com/api-reference/list-subtrader-bound-api-keys
lastmod: 2026-10-14T21:44:02.465Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# List Subtrader-Bound API Keys

> FCM clearing members only. List your API keys that carry a subtrader binding, optionally filtered to one subtrader.



## OpenAPI

````yaml /perps_scm_openapi.yaml get /fcm/margin/api_keys
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
  /fcm/margin/api_keys:
    get:
      summary: List Subtrader-Bound API Keys
      description: >-
        FCM clearing members only. List your API keys that carry a subtrader
        binding, optionally filtered to one subtrader.
      operationId: ListMarginFcmApiKeys
      parameters:
        - name: fcm_subtrader_id
          in: query
          required: false
          schema:
            type: string
          description: Return only keys bound to this subtrader.
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ListMarginFcmApiKeysResponse'
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
    ListMarginFcmApiKeysResponse:
      type: object
      required:
        - api_keys
      properties:
        api_keys:
          type: array
          items:
            $ref: '#/components/schemas/MarginFcmApiKey'
    MarginFcmApiKey:
      type: object
      required:
        - api_key_id
        - name
        - fcm_subtrader_id
      properties:
        api_key_id:
          type: string
        name:
          type: string
        fcm_subtrader_id:
          type: string
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