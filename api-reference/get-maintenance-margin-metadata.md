---
url: https://docs.kalshi.com/api-reference/get-maintenance-margin-metadata
lastmod: 2026-10-14T21:44:02.268Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Maintenance Margin Metadata

> Inputs to the maintenance margin calculation for an asset class.



## OpenAPI

````yaml /perps_scm_openapi.yaml get /margin/estimate_maintenance_margin/metadata
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
  /margin/estimate_maintenance_margin/metadata:
    get:
      summary: Get Maintenance Margin Metadata
      description: Inputs to the maintenance margin calculation for an asset class.
      operationId: GetMaintenanceMarginMetadata
      parameters:
        - name: asset_class
          in: query
          required: true
          schema:
            $ref: '#/components/schemas/AssetClass'
        - name: date
          in: query
          required: true
          schema:
            type: string
            format: date
          description: >-
            Return the matrices calibrated on this Eastern-time day
            (YYYY-MM-DD), the liquidation parameters in effect at the end of
            that day, and the current subgroups of the markets they cover for
            the caller. Returns 404 if no matrices were calibrated that day.
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetMaintenanceMarginMetadataResponse'
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
    AssetClass:
      type: string
      enum:
        - Crypto
        - Equities
        - Metals
        - Indices
        - Energy
      description: Asset class of the margin markets covered by this entry.
    GetMaintenanceMarginMetadataResponse:
      type: object
      required:
        - asset_class
        - base_tail_percentile
        - funding_tail_percentile
        - matrices
        - liquidation_configs
        - subgroups
      properties:
        asset_class:
          $ref: '#/components/schemas/AssetClass'
        base_tail_percentile:
          type: number
          format: double
          description: >-
            Lower-tail percentile of the scenario P&L distribution used for the
            base margin.
        funding_tail_percentile:
          type: number
          format: double
          description: >-
            Lower-tail percentile of the scenario P&L distribution used for the
            funding margin.
        matrices:
          $ref: '#/components/schemas/MaintenanceMarginMatrices'
        liquidation_configs:
          type: array
          description: >-
            Liquidation margin parameters for each active market with a
            calibrated margin config.
          items:
            $ref: '#/components/schemas/MaintenanceMarginLiquidationConfig'
        subgroups:
          type: array
          description: >-
            Partition of the asset class's active markets; positions within a
            subgroup are margined together.
          items:
            type: array
            items:
              type: string
    MaintenanceMarginMatrices:
      type: object
      properties:
        hvar:
          $ref: '#/components/schemas/MaintenanceMarginMatrix'
        apc:
          $ref: '#/components/schemas/MaintenanceMarginMatrix'
        aug:
          $ref: '#/components/schemas/MaintenanceMarginMatrix'
        funding:
          $ref: '#/components/schemas/MaintenanceMarginMatrix'
    MaintenanceMarginLiquidationConfig:
      type: object
      required:
        - market_ticker
        - market_impact_volatility
        - market_impact_coefficient
        - market_impact_exponent
        - market_impact_forecasted_volume
        - spread_rate
      properties:
        market_ticker:
          type: string
        market_impact_volatility:
          type: number
          format: double
        market_impact_coefficient:
          type: number
          format: double
        market_impact_exponent:
          type: number
          format: double
        market_impact_forecasted_volume:
          type: number
          format: double
        spread_rate:
          type: number
          format: double
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
    MaintenanceMarginMatrix:
      type: object
      required:
        - market_tickers
        - returns
      properties:
        market_tickers:
          type: array
          items:
            type: string
          description: Markets covered by the matrix, in column order.
        returns:
          type: array
          items:
            type: array
            items:
              type: number
              format: double
          description: >-
            One row per scenario; each row holds one return per entry in
            market_tickers.
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