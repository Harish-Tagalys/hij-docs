---
description: "What the HIJ UI widgets do when HIJ Search can't be reached, and how to configure the fallback widgets."
---

# Failover for UI widgets

**Applies to:** section `JS SDKs` (flow step 3 of 8) · product `full-stack` · version `Full stack 3.x` · status `current` · store types `liquid`, `hydrogen`, `custom-frontend` · requires `full-stack`

If the HIJ Search API can't be reached, the SearchResults widget switches to the CatalogSearchResults widget, which reads products straight from your store's own catalog feed. Keep the fallback configured even if you never expect an outage.

## Configure the fallback

Set `catalogFeed` in the platform configuration (see the [quick start](README.md)). No other change is needed: the widget switches automatically and switches back on the next page load.

| Trigger | Falls back? |
| --- | --- |
| Network error or timeout (5 seconds) | Yes |
| `5xx` response | Yes |
| `429` rate limit | Yes |
| Other `4xx` responses | No. `onFailure` is called instead. |
