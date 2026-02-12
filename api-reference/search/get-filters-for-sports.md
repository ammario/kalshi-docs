---
url: https://docs.kalshi.com/api-reference/search/get-filters-for-sports
lastmod: 2026-02-11T23:56:06.215Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Filters for Sports

> Retrieve available filters organized by sport.

This endpoint returns filtering options available for each sport, including scopes and competitions. It also provides an ordered list of sports for display purposes.




## OpenAPI

````yaml openapi.yaml get /search/filters_by_sport
openapi: 3.0.0
info:
  title: Kalshi Trade API Manual Endpoints
  version: 3.7.0
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
  /search/filters_by_sport:
    get:
      tags:
        - search
      summary: Get Filters for Sports
      description: >
        Retrieve available filters organized by sport.


        This endpoint returns filtering options available for each sport,
        including scopes and competitions. It also provides an ordered list of
        sports for display purposes.
      operationId: GetFiltersForSports
      responses:
        '200':
          description: Filters retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetFiltersBySportsResponse'
        '401':
          description: Unauthorized
        '500':
          description: Internal server error
components:
  schemas:
    GetFiltersBySportsResponse:
      type: object
      required:
        - filters_by_sports
        - sport_ordering
      properties:
        filters_by_sports:
          type: object
          description: Mapping of sports to their filter details
          additionalProperties:
            $ref: '#/components/schemas/SportFilterDetails'
        sport_ordering:
          type: array
          description: Ordered list of sports for display
          items:
            type: string
    SportFilterDetails:
      type: object
      required:
        - scopes
        - competitions
      properties:
        scopes:
          type: array
          description: List of scopes available for this sport
          items:
            type: string
        competitions:
          type: object
          description: Mapping of competitions to their scope lists
          additionalProperties:
            $ref: '#/components/schemas/ScopeList'
    ScopeList:
      type: object
      required:
        - scopes
      properties:
        scopes:
          type: array
          description: List of scopes
          items:
            type: string

````