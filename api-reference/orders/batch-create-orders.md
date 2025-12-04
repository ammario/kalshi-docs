---
url: https://docs.kalshi.com/api-reference/orders/batch-create-orders
lastmod: 2025-12-04T02:14:27.373Z
---
# Batch Create Orders

>  Endpoint for submitting a batch of orders. Each order in the batch is counted against the total rate limit for order operations. Consequently, the size of the batch is capped by the current per-second rate-limit configuration applicable to the user. At the moment of writing, the limit is 20 orders per batch.



---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt