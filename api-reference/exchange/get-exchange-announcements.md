---
url: https://docs.kalshi.com/api-reference/exchange/get-exchange-announcements
lastmod: 2025-12-04T02:14:27.290Z
---
# Get Exchange Announcements

>  Endpoint for getting all exchange-wide announcements.

## OpenAPI

````yaml openapi.yaml get /exchange/announcements
paths:
  path: /exchange/announcements
  method: get
  servers:
    - url: https://api.elections.kalshi.com/trade-api/v2
      description: Production server
  request:
    security: []
    parameters:
      path: {}
      query: {}
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              announcements:
                allOf:
                  - type: array
                    description: A list of exchange-wide announcements.
                    items:
                      $ref: '#/components/schemas/Announcement'
            refIdentifier: '#/components/schemas/GetExchangeAnnouncementsResponse'
            requiredProperties:
              - announcements
        examples:
          example:
            value:
              announcements:
                - type: info
                  message: <string>
                  delivery_time: '2023-11-07T05:31:56Z'
                  status: active
        description: Exchange announcements retrieved successfully
    '500':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Internal server error
        examples: {}
        description: Internal server error
  deprecated: false
  type: path
components:
  schemas:
    Announcement:
      type: object
      required:
        - type
        - message
        - delivery_time
        - status
      properties:
        type:
          type: string
          enum:
            - info
            - warning
            - error
          description: The type of the announcement.
        message:
          type: string
          description: The message contained within the announcement.
        delivery_time:
          type: string
          format: date-time
          description: The time the announcement was delivered.
        status:
          type: string
          enum:
            - active
            - inactive
          description: The current status of this announcement.

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt