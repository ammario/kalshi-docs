---
url: https://docs.kalshi.com/websockets/communications
lastmod: 2025-10-30T21:07:42.053Z
---
# Communications

> Real-time Request for Quote (RFQ) and quote notifications. Requires authentication.

**Requirements:**
- Authentication required
- Market specification ignored
- RFQ events (RFQCreated, RFQDeleted) always sent
- Quote events (QuoteCreated, QuoteAccepted) are only sent if you created the quote OR you created the RFQ

**Use case:** Tracking RFQs you create and quotes on your RFQs, or quotes you create on others' RFQs




---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt