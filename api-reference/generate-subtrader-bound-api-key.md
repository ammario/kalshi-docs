---
url: https://docs.kalshi.com/api-reference/generate-subtrader-bound-api-key
lastmod: 2026-10-22T21:54:52.138Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Generate Subtrader-Bound API Key

> FCM clearing members only. Mint a subtrader-bound API key with a platform-generated RSA key pair. The private key appears exactly once in this response and cannot be retrieved again; store it securely before leaving the page or discarding the response.



## OpenAPI

````yaml /perps_scm_openapi.yaml post /fcm/margin/api_keys/generate
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
  /fcm/margin/api_keys/generate:
    post:
      summary: Generate Subtrader-Bound API Key
      description: >-
        FCM clearing members only. Mint a subtrader-bound API key with a
        platform-generated RSA key pair. The private key appears exactly once in
        this response and cannot be retrieved again; store it securely before
        leaving the page or discarding the response.
      operationId: GenerateMarginFcmApiKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/GenerateMarginFcmApiKeyRequest'
      responses:
        '201':
          description: API key generated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GenerateMarginFcmApiKeyResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
        '409':
          description: >-
            The bound subtrader is not yet visible in the credential registry,
            which updates asynchronously. Retry shortly after creating the
            subtrader.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    GenerateMarginFcmApiKeyRequest:
      type: object
      required:
        - name
        - fcm_subtrader_id
      properties:
        name:
          type: string
          description: >-
            Name identifying the key's purpose, e.g. the institution it is
            issued to.
        fcm_subtrader_id:
          type: string
          description: >-
            The subtrader to bind, spelled {your_account_id}_{suffix} with a
            suffix of 1-16 characters of [a-z0-9]. Must already exist and belong
            to you.
    GenerateMarginFcmApiKeyResponse:
      type: object
      required:
        - api_key_id
        - private_key
      properties:
        api_key_id:
          type: string
        private_key:
          type: string
          description: >-
            RSA private key in PEM format. Returned exactly once and never
            stored; it cannot be retrieved again.
        warning:
          type: string
          nullable: true
          description: >-
            Present only when the bound subtrader is missing a per-subtrader
            risk control - the initial-margin cap (margin lane) or the
            event-contract daily cap. The mint still succeeds; the warning names
            each missing control - an event-contract subtrader without a daily
            cap has its event-contract orders rejected until one is set, while a
            margin subtrader without an initial-margin cap is bounded only by
            firm-level risk limits.
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