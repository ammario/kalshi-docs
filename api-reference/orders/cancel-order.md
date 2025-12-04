---
url: https://docs.kalshi.com/api-reference/orders/cancel-order
lastmod: 2025-12-04T02:14:27.363Z
---
# Cancel Order

>  Endpoint for canceling orders. The value for the orderId should match the id field of the order you want to decrease. Commonly, DELETE-type endpoints return 204 status with no body content on success. But we can't completely delete the order, as it may be partially filled already. Instead, the DeleteOrder endpoint reduce the order completely, essentially zeroing the remaining resting contracts on it. The zeroed order is returned on the response payload as a form of validation for the client.



---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt