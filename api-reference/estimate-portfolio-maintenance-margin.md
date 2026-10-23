---
url: https://docs.kalshi.com/api-reference/estimate-portfolio-maintenance-margin
lastmod: 2026-10-22T21:54:51.952Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Estimate Portfolio Maintenance Margin

> Maintenance margin requirement in dollars for a hypothetical portfolio, margined under the rules that apply to the authenticated clearing member. Positions and prices are supplied by the caller and need not reflect positions held. Every market in `positions` must belong to `asset_class`. The response includes the component breakdown of the estimate; see the response schema for the semantics of each component.



## OpenAPI

````yaml /perps_scm_openapi.yaml post /margin/estimate_maintenance_margin
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
  /margin/estimate_maintenance_margin:
    post:
      summary: Estimate Portfolio Maintenance Margin
      description: >-
        Maintenance margin requirement in dollars for a hypothetical portfolio,
        margined under the rules that apply to the authenticated clearing
        member. Positions and prices are supplied by the caller and need not
        reflect positions held. Every market in `positions` must belong to
        `asset_class`. The response includes the component breakdown of the
        estimate; see the response schema for the semantics of each component.
      operationId: EstimatePortfolioMaintenanceMargin
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/EstimatePortfolioMaintenanceMarginRequest'
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/EstimatePortfolioMaintenanceMarginResponse
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
    EstimatePortfolioMaintenanceMarginRequest:
      type: object
      required:
        - asset_class
        - positions
      properties:
        asset_class:
          $ref: '#/components/schemas/AssetClass'
        date:
          type: string
          format: date
          description: >-
            Margin the portfolio against the matrices calibrated on this
            Eastern-time day (YYYY-MM-DD). Omit to use the current matrices.
            Returns 404 if no matrices were calibrated that day, or 400 if a
            requested market is absent from them.
        clearing_type:
          type: string
          enum:
            - FCM
            - SelfClearing
          description: >-
            Clearing arrangement whose margin rules to apply. Omit to use the
            arrangement on record for the authenticated clearing member.
        positions:
          type: array
          minItems: 1
          maxItems: 500
          description: >-
            Hypothetical portfolio to margin. Market tickers must be unique and
            must name markets that exist in the requested asset class.
          items:
            $ref: '#/components/schemas/EstimatePortfolioMaintenanceMarginPosition'
    EstimatePortfolioMaintenanceMarginResponse:
      type: object
      properties:
        maintenance_margin_fp:
          type: string
          description: >-
            Maintenance margin requirement for the submitted portfolio, in USD
            (e.g. "1234.5600"). Equals base_margin_fp + funding_addon_fp +
            liquidation_addon_fp, subject to per-market minimums on
            gross-margined markets and to each component being rounded
            individually, so the components need not sum exactly to this total.
        base_margin_fp:
          type: string
          description: >-
            Base scenario margin charged, in USD: the larger of the
            historical-VaR and APC candidates, taken per market for
            gross-margined markets and across the whole portfolio for
            portfolio-margined ones, then summed. Equals max(hvar_fp, apc_fp)
            only when the entire portfolio is portfolio-margined; with
            gross-margined markets it can exceed both.
        hvar_fp:
          type: string
          description: >-
            Portfolio total of the historical-VaR candidate for the base
            scenario margin, in USD.
        apc_fp:
          type: string
          description: >-
            Portfolio total of the APC candidate for the base scenario margin,
            in USD, computed over the pooled APC and augmented stress scenario
            set.
        funding_addon_fp:
          type: string
          description: Funding margin add-on, in USD.
        liquidation_addon_fp:
          type: string
          description: Liquidation margin add-on, in USD.
    AssetClass:
      type: string
      enum:
        - Crypto
        - Equities
        - Metals
        - Indices
        - Energy
      description: Asset class of the margin markets covered by this entry.
    EstimatePortfolioMaintenanceMarginPosition:
      type: object
      required:
        - market_ticker
        - quantity
      properties:
        market_ticker:
          type: string
          description: >-
            Market to include in the hypothetical portfolio. Must belong to the
            request's asset class.
        quantity:
          type: integer
          format: int64
          description: >-
            Signed whole contract count; positive long, negative short. Must be
            non-zero.
        price:
          type: string
          description: >-
            Price of one contract in USD, to at most four decimal places (e.g.
            "6.8000"). Must be positive. Omit to use the market's mark price
            from its latest settlement (before the end of `date`, if set);
            returns 400 if there is none.
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