---
url: https://docs.kalshi.com/api-reference/get-obligation-corporate-action-payments
lastmod: 2026-10-23T16:35:21.512Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Obligation Corporate Action Payments

> Pages the cash and split corporate-action payments settled by one obligation owned by the authenticated clearing member. The inline corporate_action_payments array is capped at 1000 rows; corporate_action_payments_truncated indicates when to use this endpoint for the complete set. These rows explain amounts already included in settlement PnL and must not be added to the obligation total again.



## OpenAPI

````yaml /perps_scm_openapi.yaml get /margin/obligations/{obligation_id}/corporate_action_payments
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
  /margin/obligations/{obligation_id}/corporate_action_payments:
    get:
      summary: Get Obligation Corporate Action Payments
      description: >-
        Pages the cash and split corporate-action payments settled by one
        obligation owned by the authenticated clearing member. The inline
        corporate_action_payments array is capped at 1000 rows;
        corporate_action_payments_truncated indicates when to use this endpoint
        for the complete set. These rows explain amounts already included in
        settlement PnL and must not be added to the obligation total again.
      operationId: GetObligationCorporateActionPayments
      parameters:
        - name: obligation_id
          in: path
          required: true
          schema:
            type: string
            format: uuid
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
                  #/components/schemas/GetObligationCorporateActionPaymentsResponse
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
    GetObligationCorporateActionPaymentsResponse:
      type: object
      required:
        - corporate_action_payments
      properties:
        corporate_action_payments:
          type: array
          items:
            $ref: '#/components/schemas/CorporateActionPaymentDetail'
        cursor:
          type: string
          description: >-
            Opaque cursor; pass as the `cursor` query param to fetch the next
            page until it is absent. The final page may be empty.
    CorporateActionPaymentDetail:
      type: object
      description: >-
        Cash distributions and split adjustments already reflected in settlement
        PnL; these are not additional amounts to add to the obligation total.
      required:
        - id
        - type
        - ca_id
        - market_id
        - market_ticker
        - asset_class
        - subtrader_id
        - position_quantity_fp
        - post_position_quantity_fp
        - payment_amount_centicents
        - payment_time
        - settlement_execution_time
        - created_ts
      properties:
        id:
          type: string
        type:
          type: string
          description: Corporate-action type.
        ca_id:
          type: string
          description: Identifier of the corporate action that generated this payment.
        market_id:
          type: string
          format: uuid
        market_ticker:
          type: string
        asset_class:
          $ref: '#/components/schemas/AssetClass'
        subtrader_id:
          type: string
        position_quantity_fp:
          type: string
          description: Signed position before the action as a fixed-point contract count.
        post_position_quantity_fp:
          type: string
          description: >-
            Signed position after the action as a fixed-point contract count;
            unchanged for cash distributions.
        payment_amount_centicents:
          type: integer
          format: int64
          description: >-
            Signed cash amount; positive when received and negative when paid.
            For splits this is cash in lieu and excludes position revaluation.
        payment_time:
          type: string
          format: date-time
          nullable: true
          description: Scheduled cash payment time; null for splits.
        settlement_execution_time:
          type: string
          format: date-time
          description: Settlement cycle that carries this payment.
        pre_split_price_centicents:
          type: integer
          format: int64
          description: Mark price before the split; omitted when not applicable.
        post_split_price_centicents:
          type: integer
          format: int64
          description: Mark price after the split; omitted when not applicable.
        exchange_ts:
          type: string
          format: date-time
          description: Exchange event timestamp when available.
        created_ts:
          type: string
          format: date-time
          description: Time the payment row was created.
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
    AssetClass:
      type: string
      enum:
        - Crypto
        - Equities
        - Metals
        - Indices
        - Energy
      description: Asset class of the margin markets covered by this entry.
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