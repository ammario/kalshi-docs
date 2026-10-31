---
url: https://docs.kalshi.com/api-reference/get-funding-estimate-by-asset-class
lastmod: 2026-10-29T03:14:17.599Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Funding Estimate By Asset Class

> Estimated funding at the next scheduled funding time for the authenticated clearing member, keyed by asset class.



## OpenAPI

````yaml /perps_scm_openapi.yaml get /margin/funding_estimate_by_asset_class
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
  /margin/funding_estimate_by_asset_class:
    get:
      summary: Get Funding Estimate By Asset Class
      description: >-
        Estimated funding at the next scheduled funding time for the
        authenticated clearing member, keyed by asset class.
      operationId: GetFundingEstimateByAssetClass
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetFundingEstimateByAssetClassResponse'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  schemas:
    GetFundingEstimateByAssetClassResponse:
      type: object
      required:
        - estimates
      properties:
        estimates:
          type: object
          description: Keyed by asset class.
          additionalProperties:
            $ref: '#/components/schemas/AssetClassFundingEstimate'
    AssetClassFundingEstimate:
      type: object
      required:
        - user_breakdown
        - omitted_subtrader_count
        - omitted_group_count
        - next_funding_time
      properties:
        user_breakdown:
          $ref: '#/components/schemas/FundingEstimate'
        subtrader_breakdowns:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/FundingEstimate'
        group_breakdowns:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/FundingEstimate'
        omitted_subtrader_count:
          type: integer
          format: int64
        omitted_group_count:
          type: integer
          format: int64
        next_funding_time:
          type: string
          format: date-time
          description: Next scheduled funding time for this asset class.
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
    FundingEstimate:
      type: object
      required:
        - funding_amount_centicents
        - funding_amount_fp
      properties:
        funding_amount_centicents:
          type: integer
          format: int64
        funding_amount_fp:
          type: string
          description: >-
            funding_amount_centicents as a fixed-point dollar string with 6
            decimal places.
        positions:
          type: object
          description: >-
            Keyed by market ticker; only present on subtrader and group
            breakdowns.
          additionalProperties:
            $ref: '#/components/schemas/MarketFundingEstimate'
    MarketFundingEstimate:
      type: object
      required:
        - quantity_centicount
        - funding_amount_centicents
        - funding_amount_fp
      properties:
        quantity_centicount:
          type: integer
          format: int64
        funding_amount_centicents:
          type: integer
          format: int64
        funding_amount_fp:
          type: string
          description: >-
            funding_amount_centicents as a fixed-point dollar string with 6
            decimal places.
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