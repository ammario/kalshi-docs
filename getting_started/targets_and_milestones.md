---
url: https://docs.kalshi.com/getting_started/targets_and_milestones
lastmod: 2026-10-19T17:32:18.646Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Targets & Milestones

> Using milestones and structured targets in the Trade API

Kalshi exposes two related metadata objects that are useful when working with event and market data:

* `milestones` describe a real-world occurrence tied to one or more events
* `structured_targets` describe a real-world entity that a milestone or market can reference

If you need to group related events, start with milestones. If you need to identify a team, player, or other entity referenced by a market, use structured targets.

## Milestones

A milestone links Kalshi events to a real-world occurrence.

Useful fields on a milestone include:

* `id`, `type`, `title`, `start_date`, `end_date`
* `primary_event_tickers` for the milestone's core markets
* `related_event_tickers` for the broader set of events tied to the same occurrence
* `details` for type-specific metadata
* `source_id` and `source_ids` when external identifiers are available

`details` is flexible JSON and varies by milestone type. For sports milestones, it commonly contains structured target IDs such as `home_team_id` or `away_team_id`.

A milestone's `details.status`, when present, is maintained by a periodic background job. It lags the game's live state and may be stale or inaccurate, for example remaining `live` after the game ends. For game status, prefer live data, which is updated far more often: `live_data.details.status` from [Get Live Data](/api-reference/live-data/get-live-data.md), or each entry's `details.status` from [Get Multiple Live Data](/api-reference/live-data/get-multiple-live-data.md). Scores are in the sport-specific fields of that live data `details` object. Live data is not guaranteed to be current either: if the provider feed falls behind, a cached board may still be served, and the live data `details.live_data_delayed` is set to `true` only once it is significantly stale, so a missing flag does not by itself mean the feed is healthy.

In practice, `related_event_tickers` is often a superset of `primary_event_tickers`.

For example, a recent `Wyoming General Elections` `one_off_milestone` in Redshift had:

* `primary_event_tickers`: `SENATEWY-26`
* `related_event_tickers`: `SENATEWY-26`, `GOVPARTYWY-26`, and `KXHOUSERACE-WYAL-26`

Those are event tickers, not display titles. In this case they point to the Wyoming Senate, Wyoming Governor, and Wyoming at-large House race events.

That broader grouping is useful when you want all of the markets tied to one real-world occurrence. For milestone types that expose live updates, the same milestone ID is also the key used by the live data API.

### Fetch milestones

Use the [Get Milestone](/api-reference/milestone/get-milestone.md) and [Get Milestones](/api-reference/milestone/get-milestones.md) endpoint docs for the supported parameters and response shape.

If you want milestones returned alongside events, use [Get Events](/api-reference/events/get-events.md) with `with_milestones=true`. The events response includes a top-level `milestones` array alongside `events`.

### Use milestones to group events

A milestone is often the easiest way to find other events tied to the same occurrence. Query by `related_event_ticker`, then read `related_event_tickers` or `primary_event_tickers` from the returned milestone.

Once you have the right milestone, use [Get Live Data](/api-reference/live-data/get-live-data.md) when that milestone type supports live updates.

## Structured Targets

A structured target identifies a real-world entity that can be referenced elsewhere in the API.

Useful fields on a structured target include:

* `id`, `name`, `type`
* `details` for type-specific metadata
* `source_id` and `source_ids` when external identifiers are available

Like milestone `details`, structured target `details` is flexible JSON and depends on the target type.

### Fetch structured targets

Use the [Get Structured Target](/api-reference/structured-targets/get-structured-target.md) and [Get Structured Targets](/api-reference/structured-targets/get-structured-targets.md) endpoint docs for the supported parameters and response shape.

`type` values are not a short fixed list. Integrations should filter by the values they need rather than hardcoding a small allowlist.

## How They Connect To Markets

Markets can reference structured targets through `custom_strike`.

```json theme={null}
{
  "strike_type": "structured",
  "custom_strike": {
    "basketball_team": "2ef4d31c-0b46-4f43-a403-f44d62489034"
  }
}
```

For `strike_type: "structured"`, the value inside `custom_strike` is a structured target ID. You can resolve it with the [Get Structured Target](/api-reference/structured-targets/get-structured-target.md) endpoint.

For numeric strike types, use `floor_strike` and `cap_strike` instead of `custom_strike`.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.