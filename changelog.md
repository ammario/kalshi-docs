---
url: https://docs.kalshi.com/changelog
lastmod: 2025-11-05T23:26:14.087Z
---
# API Changelog

> Stay updated with API changes and version history

You can subscribe to the RSS changelog at `/changelog.rss` if you'd like to stay ahead of breaking changes.

You can reference the pending API spec under the "version" dropdown menu at the top left. When the actual API is upgraded to this new version, you will see the version marked as "Stable" in the drop-down menu and become the new default on the landing page.

This changelog is a work in progress. As always, we welcome any feedback in our Discord #dev channel!

## Recent Updates

<Update
  label="Nov 6, 2025"
  tags={["Upcoming"]}
  rss={{
title: "Portfolio positions now include total_cost_shares",
description: "Added total_cost_shares field to portfolio/positions endpoint showing total shares traded per event."
}}
>
  The `GET /portfolio/positions` endpoint now includes `total_cost_shares`, which tracks the total number of shares traded on an event (including both YES and NO contracts).
</Update>

<Update
  label="Nov 6, 2025"
  tags={["New Feature", "Upcoming"]}
  rss={{
title: "Multivariate Events API and Enhanced Market Filtering",
description: "New endpoint for multivariate events and enhanced market filtering capabilities"
}}
>
  Added comprehensive support for multivariate events (combos) with new API endpoints and enhanced filtering:

  **New Endpoint and deprecation of multivariate events in GetEvents endpoint**

  * `GET /events/multivariate` - Retrieve multivariate events with filtering by series and collection ticker.
  * `GET /events` will EXCLUDE multivariate events upon the next release (November 13th). Please use the new endpoint!

  **Enhanced Market Filtering:**

  * `GET /markets` now supports `mve_filter` parameter:
    * `"only"` - Returns only multivariate events
    * `"exclude"` - Excludes multivariate events
    * No parameter - Returns all events (default behavior)

  Expected release: `November 6th, 2025`
</Update>

<Update
  label="Oct 24, 2025"
  tags={["Bug Fix", "Upcoming"]}
  rss={{
title: "Batch order creation now returns post-only cross errors",
description: "Post-only orders that cross the market in batch requests now return detailed error messages instead of just status canceled."
}}
>
  Fixed batch order creation to return proper error details when post-only orders cross the market. The response now includes:

  * Error code: `"invalid order"`
  * Error details: `"post only cross"`

  This makes the batch endpoint consistent with single order creation and provides clear feedback on why post-only orders were rejected.
</Update>

<Update
  label="Oct 20, 2025"
  tags={["Released"]}
  rss={{
title: "Get Orders endpoint supports multiple event tickers",
description: "The event_ticker parameter now accepts comma-separated values to filter orders across multiple events."
}}
>
  The `GET /portfolio/orders` endpoint's `event_ticker` parameter now supports filtering by multiple events using comma-separated values.

  **Example usage:**

  ```
  GET /portfolio/orders?event_ticker=EVENT1,EVENT2,EVENT3
  ```

  **Backward Compatible:**

  * Single event ticker queries continue to work as before
  * Multiple event tickers return orders from all specified events
</Update>

<Update
  label="Oct 19, 2025"
  tags={["Bug Fix", "Released"]}
  rss={{
title: "Added missing fields to Quote responses",
description: "Restored rfq_target_cost_centi_cents, rfq_creator_order_id, and creator_order_id fields to Quote API responses"
}}
>
  Fixed missing fields in Quote responses: `rfq_target_cost_centi_cents`, `rfq_creator_order_id`, and `creator_order_id` are now properly included in all Quote-related endpoints.
</Update>

<Update
  label="Oct 16, 2025"
  tags={["Released"]}
  rss={{
title: "'with_milestones' flag on Events API",
description: "Adds an optional flag to request milestone data along with events."
}}
>
  The `GET /events` endpoint now supports an optional flag, `with_milestones`, that includes all milestones related to the returned events.

  Expected release: `October 16, 2025`
</Update>

<Update
  label="Oct 14, 2025"
  tags={["Released"]}
  rss={{
title: "Create Order Response Updated",
description: "Create Order now returns the full Order model"
}}
>
  The order returned by create order is now the same model as the model returned by get order.
</Update>

<Update
  label="Oct 13, 2025"
  tags={["Released"]}
  rss={{
title: "Incentive Programs API includes series_ticker",
description: "Incentive Programs API responses now include series_ticker field"
}}
>
  The `GET /v2/incentive_programs` and `GET /incentive_programs` endpoints now return a `series_ticker` field for each incentive program.

  Expected release: `October 13, 2025`
</Update>

<Update
  label="Oct 10, 2025"
  tags={["Breaking Change", "Released"]}
  rss={{
title: "Price level structure moved from event to market level",
description: "Price level structure moved from event to market level"
}}
>
  The `price_level_structure` field has been moved from the event level to the market level. Each market now has its own `price_level_structure` field.

  **Affected endpoints:**

  * `GET /trade-api/v2/events`
  * `GET /trade-api/v2/events/:event_ticker`
  * `GET /trade-api/v2/markets`
  * `GET /trade-api/v2/markets/:ticker`

  **Note:** The `price_level_structure` field on event objects is now deprecated and will be removed. Please use the field on individual market objects instead.

  Expected release date: `Oct 15th, 2025`
</Update>

<Update
  label="Oct 13, 2025"
  tags={["Bug Fix", "Breaking Change", "Released"]}
  rss={{
title: "Fixed series tag filtering to support tags with spaces",
description: "Series tags parameter now only uses comma separation, allowing tags with spaces like 'Rotten Tomatoes' to work correctly"
}}
>
  Fixed the `GET /series` endpoint's tags parameter to properly support tags containing spaces. Previously, the parameter would split on both commas AND spaces, breaking searches for tags like "Rotten Tomatoes".

  **Breaking Change:**

  * The `tags` query parameter now **only** splits on commas (`,`), not spaces
  * Tags with spaces (e.g., "Rotten Tomatoes") now work correctly
  * Multiple tags must be comma-separated: `?tags=Rotten Tomatoes,Television`

  **Before (broken):**

  ```
  GET /series?tags=Rotten Tomatoes
  // Was incorrectly parsed as: ["Rotten", "Tomatoes"]
  // Result: No matches found
  ```

  **After (fixed):**

  ```
  GET /series?tags=Rotten Tomatoes
  // Correctly parsed as: ["Rotten Tomatoes"]
  // Result: Returns series with the "Rotten Tomatoes" tag

  GET /series?tags=Rotten Tomatoes,Television
  // Correctly parsed as: ["Rotten Tomatoes", "Television"]
  // Result: Returns series with either tag
  ```

  This change may affect integrations that relied on space-separated tags. Please update to use comma-separated tags only.
</Update>

<Update
  label="Oct 8, 2025"
  tags={["Bug Fix", "Released"]}
  rss={{
title: "Fixed trailing slash redirects on collection endpoints",
description: "Fixed inconsistent 301 redirects on collection endpoints - requests without trailing slashes now return 200 directly"
}}
>
  Fixed routing inconsistency where certain collection endpoints required trailing slashes, causing unnecessary 301 redirects for requests without them.

  **Endpoints now returning 200 for requests without trailing slash** (previously returned 301):

  * `GET /milestones`
  * `GET /structured_targets`
  * `GET /multivariate_event_collections`
  * `GET /series`
  * `GET /api_keys`
  * `POST /api_keys`

  **Note:** Requests with trailing slashes (e.g., `/milestones/`) will now receive a 301 redirect to the version without the trailing slash, which is the opposite of the previous behavior.
</Update>

<Update
  label="Oct 9, 2025"
  tags={["Released"]}
  rss={{
title: "Missing subpenny fields in Orders and Trades",
description: "Missing subpenny fields in Orders and Trades"
}}
>
  Subpenny fields have been added to orders (`taker_fees_dollars`, `maker_fees_dollars`), as well as to public trades (`yes_price_dollars`, `no_price_dollars`).

  Endpoints affected:

  * `GET /trade-api/v2/portfolio/orders`
  * `GET /trade-api/v2/markets/trades`
</Update>

<Update
  label="Oct 9, 2025"
  tags={["Released"]}
  rss={{
title: "Subpenny support in WS for RFQs and Quotes",
description: "Subpenny support in WS for RFQs and Quotes"
}}
>
  Fields have been added to all RFQ and quote messages to support subpenny pricing via the dollar normalized price fields.
  For more info reference:

  * [Subpenny Pricing](/getting_started/subpenny_pricing)
  * [Websocket Documentation](/api-reference/websockets/communications)
</Update>

<Update
  label="Oct 7, 2025"
  tags={["Released"]}
  rss={{
title: "Enhanced Portfolio Balance Endpoint",
description: "Added portfolio_value field to GET /portfolio/balance endpoint"
}}
>
  Enhanced the existing `GET /portfolio/balance` endpoint to include a `portfolio_value` field that provides the total portfolio value (available balance plus current market value of all positions), both in cents.
</Update>

<Update
  label="Oct 1, 2025"
  tags={["Released"]}
  rss={{
title: "Series Fee Changes API returns user-facing fee type names",
description: "Series Fee Changes API and notifications now return user-facing fee type names"
}}
>
  The `GET /series/fee_changes` endpoint now returns user-facing fee type names (`quadratic`, `quadratic_with_maker_fees`, `flat`) instead of internal fee structure names. This change also applies to CustomerIO notifications for scheduled series fee updates.

  Expected release: `October 1, 2025`
</Update>

<Update
  label="Sep 25, 2025"
  tags={["Released"]}
  rss={{
title: "Websocket subscribe idempotent",
description: "Websocket subscribe idempotent"
}}
>
  Repeated subscriptions on the same websocket call will no longer error. If passing
  the same market tickers as before, no action will be taken. If passing new market tickers,
  they will be added to your existing subscription.

  Additionally, the user may supply WS Command `list_subscriptions` to view their existing subscriptions.

  Expected release: `October 1, 2025`
</Update>

<Update
  label="Sep 25, 2025"
  tags={["Released"]}
  rss={{
title: "FoK orders that self-cross treated as IoC",
description: "FoK orders that self-cross treated as IoC."
}}
>
  For optimization purposes, partial fills generated by self-crossing FoK orders are not rolled back.
  If a FoK order self-crosses, order execution proceeds based on `self_trade_prevention_type`:

  * `taker_at_cross`: the taker is canceled, execution stops. Any partial fills are executed.
  * `maker`: the maker is canceled, execution continues. After execution, remaining taker quantity is canceled.
    Any fills are executed.

  This fixes a bug where partially filled FoK orders with Maker STP entered into the book after self-crossing.
  Expected enforced date: `Oct 1, 2025`.
</Update>

<Update
  label="Sep 22, 2025"
  tags={["Released"]}
  rss={{
title: "Adding purchased_side to REST and ws fills",
description: "User seeking a simple way to determine the direction of their fill should reference purchased_side. Both BUY YES or SELL NO result in purchased_side = YES. The addition of this field is the first step in standardizing the fills websocket and REST endpoints, which have different conventions for the interpretation 'side' and 'user_action'"
}}
>
  User seeking a simple way to determine the direction of their fill should reference purchased\_side. Both BUY YES or SELL NO result in purchased\_side = YES. The addition of this field is the first step in standardizing the fills websocket and REST endpoints, which have different conventions for the interpretation 'side' and 'user\_action'.

  Expected Enforce Date: deprecation date for existing fields not yet scheduled.
</Update>

<Update
  label="Sep 21, 2025"
  tags={["Released"]}
  rss={{
title: "Scheduled Series Fees API Endpoint",
description: "New endpoint for getting all of a series' scheduled fees"
}}
>
  Added new public API endpoint for getting all of a series' scheduled fees:

  * `GET /series/fee_changes` - Get a series' fee changes. If query string parameter show\_historical is set to true, ALL fee changes previous and upcoming will be shown. If set to false, only upcoming fee changes will be shown
</Update>

<Update
  label="Sep 25, 2025"
  tags={["Breaking Change", "Released"]}
  rss={{
title: "Deprecating order type `market`",
description: "Deprecating order type `market`"
}}
>
  Specifying `order_type` is no longer required and only `limit` type orders will be supported.
  Price must be supplied based on the underlying market structure. Example usage:

  ```
  {"yes_price": 99, "side: "yes"} // buy yes or sell no at market price
  {"no_price": 99, "side: "no"} // buy no or sell yes at market price
  ```

  Expected enforce date: `Sep 25, 2025`
</Update>

<Update
  label="Sep 18, 2025"
  tags={["Breaking change", "Released"]}
  rss={{
title: "Websocket API Session Limit",
description: "Websocket API Session Limit"
}}
>
  WebSocket connections per user are limited by usage tier. The default limit begins at 200 and increases based on API usage tier.
</Update>

<Update
  label="Sep 18, 2025"
  tags={["Released"]}
  rss={{
title: "Communications WS channel",
description: "Streamed RFQs and quotes"
}}
>
  A new WS channel is being introduced for streaming information related to pre-trade communications (RFQs and quotes).
</Update>

<Update
  label="Sep 15, 2025"
  tags={["Released"]}
  rss={{
title: "Additional RFQ and market metadata",
description: "MVE related meatadata"
}}
>
  Additional metadata is being added to RFQs on multivarate events (MVEs) that break down their component parts explicitly. Market payloads are also being expanded with these new optional fields that are filled only for MVE markets.
</Update>

<Update
  label="Sep 15, 2025"
  tags={["Released"]}
  rss={{
title: "Event Candlesticks API Endpoint",
description: "New endpoint for getting event candlesticks"
}}
>
  Added new public API endpoint for event candlesticks:

  * `GET /candlesticks` - Get candlesticks for all markets associated with an event. If the # of candlesticks exceeds 5000, paginate the results and return an adjustedEndTs which should be used as the start\_ts for your next request.
</Update>

<Update
  label="Sept 11, 2025"
  tags={["SDK", "Released"]}
  rss={{
title: "TypeScript SDK Release",
description: "Official TypeScript SDK now available via NPM"
}}
>
  The TypeScript SDK is now available through NPM! Install with `npm install kalshi-typescript`.

  Documentation and examples available at docs.kalshi.com
</Update>

<Update
  label="Sep 11, 2025"
  tags={["Released"]}
  rss={{
title: "Forecast Percentiles History API Endpoint",
description: "New endpoint for getting forecast percentiles history"
}}
>
  Added new public API endpoint for forecast percentiles history:

  * `GET /forecast_percentiles_history` - Get percentile history of a event forecast
</Update>

<Update
  label="Sep 10, 2025"
  tags={["Released"]}
  rss={{
title: "Incentive Programs API Endpoint",
description: "New endpoint for retrieving incentive program information"
}}
>
  Added new public API endpoint for incentive programs (not yet live):

  * `GET /incentive_programs` - List incentive programs with filtering options (by market ticker, active status, payout status)
</Update>

<Update
  label="Sep 9, 2025"
  tags={["Released"]}
  rss={{
title: "Subpenny pricing added to websocket",
description: "Subpenny pricing added to websocket"
}}
>
  Subpenny pricing fields have been added to websocket messages. Any message bearing price in cents will now also bear
  an equivalent fixed-point dollars field.

  For more info, see [Subpenny Pricing](/getting_started/subpenny_pricing).
</Update>

<Update
  label="Sep 9, 2025"
  tags={["Released"]}
  rss={{
title: "Events endpoints now return broker availability",
description: "Events endpoints now return broker availabilit"
}}
>
  Both the individual and batch `GET` events endpoints now also return `available_on_brokers` which indicates that they are available on intermediate platforms/ brokers.
</Update>

<Update
  label="Sep 6, 2025"
  tags={["Breaking Change", "Released"]}
  rss={{
title: "Python SDK",
description: "Python SDK"
}}
>
  The python SDK is being generated from our OpenAPI spec and is available through pip with pip install kalshi-python.
  Docs for the new SDK are available on docs.kalshi.com/python-sdk.
</Update>

<Update
  label="Aug 31, 2025"
  tags={["Breaking Change", "Released"]}
  rss={{
title: "Exposing read-only subpenny pricing",
description: "Exposing read-only subpenny pricing in the API."
}}
>
  Subpenny pricing fields have been added to APIs involving price, fees, and money in general.
  E.g. next to a field called `"price": 12` (representing 12 cents), you will also see `"price_dollars": "0.1200"`,
  which is a string bearing a fixed-point representation of money accuate to at 4 decimal points.

  For now, this change is read-only, meaning that the minimum allowable tick size for orders is still 1c. Eventually,
  we will introduce sub-penny pricing on orders. For now, please prepare for an eventual migration to the higher granularity
  price representation.

  For more info, see [Subpenny Pricing](/getting_started/subpenny_pricing).
</Update>

<Update
  label="Sep 2, 2025"
  tags={["Released"]}
  rss={{
title: "New Market Fields for Multivariate Event Collections",
description: "Optional fields added to describe markets that are part of MVEs"
}}
>
  The market payload has been updated to include two new fields that describe markets which are part of Multivariate Events.
</Update>

<Update
  label="Sep 2, 2025"
  tags={["Released"]}
  rss={{
title: "New Market Fields for Multivariate Event Collections",
description: "Optional fields added to describe markets that are part of MVEs"
}}
>
  The market payload has been updated to include two new fields that describe markets which are part of Multivariate Events.
</Update>

<Update
  label="Aug 21, 2025"
  tags={["Released"]}
  rss={{
title: "Multivariate Event Collections Extension",
description: "The MVE payload has been expanded to support more flexible structures."
}}
>
  The MVE payload has been expanded to support more flexible structures. Several fields that are now redundant are deprecated, but not yet removed.
</Update>

<Update
  label="Aug 21, 2025"
  tags={["New Feature", "Released"]}
  rss={{
title: "Settlement value added to Settlements API",
description: "Settlement value added to Settlements API."
}}
>
  The Settlements API now includes the settlement value for a yes contract.
</Update>

<Update
  label="Aug 21, 2025"
  tags={["Bug Fix", "Released"]}
  rss={{
title: "Case-insensitive category filtering for milestones",
description: "Fixed get_milestones endpoint to use case-insensitive matching for the category parameter."
}}
>
  The get\_milestones endpoint now uses case-insensitive matching for the category parameter, resolving inconsistent filtering behavior between "Sports" and "sports".
</Update>

<Update
  label="Aug 14, 2025"
  tags={["New Feature", "Released"]}
  rss={{
title: "Additional Events and Series Filters",
description: "Filtering events by close ts and series by tags supported in the API."
}}
>
  Filtering events by close ts and series by tags supported in the API.
</Update>

<Update
  label="Aug 13, 2025"
  tags={["Released"]}
  rss={{
title: "Batch endpoints now available to all users in demo environment",
description: "BatchCreateOrders and BatchCancelOrders endpoints are now accessible to Basic tier users in the demo environment for testing purposes."
}}
>
  The batch order endpoints are now available to all API users in the demo environment:

  **Affected Endpoints:**

  * `POST /portfolio/orders/batched` (BatchCreateOrders)
  * `DELETE /portfolio/orders/batched` (BatchCancelOrders)

  **Changes:**

  * Basic tier users can now access batch endpoints in demo environment
  * Production environment remains unchanged - Advanced tier or higher still required
  * Rate limits still apply based on user tier

  This change enables developers to test batch order functionality without needing Advanced tier access in the demo environment.
</Update>

<Update
  label="Aug 13, 2025"
  tags={["Documentation", "Released"]}
  rss={{
title: "API Signing Error Messages Improved",
description: "The error messages when an incorrect API signature is passed have been improved"
}}
>
  The error messages when an incorrect API signature is passed have been improved
</Update>

<Update
  label="Aug 9, 2025"
  tags={["Documentation", "Released"]}
  rss={{
title: "OpenAPI Specification Now Available",
description: "The OpenAPI specification is now available for download at docs.kalshi.com/openapi.yaml"
}}
>
  The OpenAPI specification for the Kalshi API is now available at `https://docs.kalshi.com/openapi.yaml`. This allows developers to easily generate client libraries and integrate with the API using OpenAPI-compatible tools.
</Update>

<Update
  label="Aug 8, 2025"
  tags={["Released", "New Feature"]}
  rss={{
title: "Added client_order_id to orderbook delta messages",
description: "Orderbook delta WebSocket messages now include client_order_id field when the change is caused by your own order."
}}
>
  Added `client_order_id` field to orderbook delta WebSocket messages. This field appears only when you caused the orderbook change and contains the client\_order\_id of your order that triggered the delta.

  **WebSocket Message Enhancement:**

  * New field: `client_order_id` (string, optional)
  * Present only when the authenticated user's order causes the orderbook change
  * Contains the client-provided order ID of the triggering order

  See the WebSocket documentation for implementation details.
</Update>

<Update
  label="Aug 1, 2025"
  tags={["Released", "New Feature"]}
  rss={{
title: "Added GetOrderQueuePositions Endpoint",
description: "New endpoint for retrieving queue positions for multiple orders in a single request."
}}
>
  Added `GET /portfolio/orders/queue_positions` endpoint for retrieving queue positions of multiple resting orders.

  **Request Parameters:**

  * `market_tickers` (optional): Array of market tickers to filter by
  * `event_ticker` (optional): Event ticker to filter by

  Note: You must specify one of `market_tickers` and `event_ticker` in the request.
</Update>

<Update
  label="July 31, 2025"
  tags={["Released", "Breaking Change", "Documentation"]}
  rss={{
title: "Documentation and RSS Feed Migration",
description: "RSS feed moved from trading-api.readme.io/changelog.rss to docs.kalshi.com/changelog/rss.xml. The trading-api.readme.io site is deprecated - use docs.kalshi.com instead."
}}
>
  We are migrating our API documentation to a new platform:

  * **RSS feed moved** from `https://trading-api.readme.io/changelog.rss` to `https://docs.kalshi.com/changelog/rss.xml`
  * **Documentation site** `trading-api.readme.io` is now deprecated
  * **New documentation home**: `https://docs.kalshi.com`
  * Historical changelog entries will not be backfilled to the new RSS feed

  Please update your bookmarks and RSS subscriptions.
</Update>

<Update
  label="July 31, 2025"
  tags={["Released"]}
  rss={{
title: "Additional event metadata",
description: "The GetEventMetadata endpoint has been expanded to include settlement sources."
}}
>
  The GetEventMetadata endpoint has been expanded to include settlement sources.
</Update>

<Update
  label="July 29, 2025"
  tags={["Released", "Breaking Change"]}
  rss={{
title: "Removed API versioning",
description: "The GetApiVersion endpoint has been removed. API versioning will not be available for the time being."
}}
>
  The GetApiVersion endpoint has been removed. API versioning will not be available for the time being.
</Update>
