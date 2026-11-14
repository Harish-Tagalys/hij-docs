---
title: "Failover for the Connector"
seo:
  title: "Failover for the Connector"
  description: "What the headless HIJ Connector does when HIJ Search can't be reached, and how to handle the fallback in your own UI."
---

# Failover for the Connector

{% partial file="/_partials/failover.md" variables={connector: "SearchResults connector", fallback: "CatalogSearchResults connector"} /%}

## Handle the fallback in your UI

The fallback connector returns the same response shape, with `response.source` set to `"catalog"` instead of `"hij"`. Filters from the catalog feed are limited to the fields in the feed, so hide controls you can't support.

```javascript
HIJ.Connector.SearchResults.call({
  params: { query: "linen shirt" },
  onSuccess: function (response, helpers) {
    document.body.classList.toggle("is-fallback", response.source === "catalog");
    renderResults(response, helpers);
  },
});
```
