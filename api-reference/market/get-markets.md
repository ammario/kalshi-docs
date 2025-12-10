---
url: https://docs.kalshi.com/api-reference/market/get-markets
lastmod: 2025-12-09T18:09:29.315Z
---
# Get Markets

> Filter by market status. Possible values: `unopened`, `open`, `closed`, `settled`. Leave empty to return markets with any status.
 - Only one `status` filter may be supplied at a time. 
 - Timestamp filters will be mutually exclusive from other timestamp filters and certain status filters.

 | Compatible Timestamp Filters | Additional Status Filters|
 |------------------------------|--------------------------|
 | min_created_ts, max_created_ts | `unopened`, `open`, *empty* |
 | min_close_ts, max_close_ts | `closed`, *empty* |
 | min_settled_ts, max_settled_ts | `settled`, *empty* |




---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt