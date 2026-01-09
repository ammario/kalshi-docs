---
url: https://docs.kalshi.com/api-reference/search/get-tags-for-series-categories
lastmod: 2026-01-09T02:22:56.303Z
---
# Get Tags for Series Categories

> Retrieve tags organized by series categories.

This endpoint returns a mapping of series categories to their associated tags, which can be used for filtering and search functionality.




## OpenAPI

````yaml openapi.yaml get /search/tags_by_categories
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.4.0
  description: >-
    Manually defined OpenAPI spec for endpoints being migrated to spec-first
    approach
servers:
  - url: https://api.elections.kalshi.com/trade-api/v2
    description: Production server
security: []
tags:
  - name: api-keys
    description: API key management endpoints
  - name: orders
    description: Order management endpoints
  - name: order-groups
    description: Order group management endpoints
  - name: portfolio
    description: Portfolio and balance information endpoints
  - name: communications
    description: Request-for-quote (RFQ) endpoints
  - name: multivariate
    description: Multivariate event collection endpoints
  - name: exchange
    description: Exchange status and information endpoints
  - name: live-data
    description: Live data endpoints
  - name: markets
    description: Market data endpoints
  - name: milestone
    description: Milestone endpoints
  - name: search
    description: Search and filtering endpoints
  - name: incentive-programs
    description: Incentive program endpoints
  - name: fcm
    description: FCM member specific endpoints
  - name: events
    description: Event endpoints
  - name: structured-targets
    description: Structured targets endpoints
paths:
  /search/tags_by_categories:
    get:
      tags:
        - search
      summary: Get Tags for Series Categories
      description: >
        Retrieve tags organized by series categories.


        This endpoint returns a mapping of series categories to their associated
        tags, which can be used for filtering and search functionality.
      operationId: GetTagsForSeriesCategories
      responses:
        '200':
          description: Tags retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetTagsForSeriesCategoriesResponse'
        '401':
          description: Unauthorized
        '500':
          description: Internal server error
components:
  schemas:
    GetTagsForSeriesCategoriesResponse:
      type: object
      required:
        - tags_by_categories
      properties:
        tags_by_categories:
          type: object
          description: Mapping of series categories to their associated tags
          additionalProperties:
            type: array
            items:
              type: string

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt