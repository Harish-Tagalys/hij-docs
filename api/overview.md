---
title: "Storefront API overview"
seo:
  title: "Storefront API overview"
  description: "Base URL, authentication, response codes, pagination, sorting and filtering for the HIJ Search Storefront API v2."
---

# Storefront API overview

The Storefront API returns the same search, suggestions and collection data as the JavaScript SDKs. Use it for server-side rendering, native apps and anywhere you can't run the SDKs. This reference covers **v2** only.

{% admonition type="info" %}
The SDKs call this API for you. You only need it if you're not using the [UI widgets](/ui-widgets/quick-start) or the [Connector](/connector/collections).
{% /admonition %}

## Base URL

```
https://api.hij-search.example/v2
```

All endpoints are `GET` and return JSON.

## Authentication

Send your public storefront key in the `X-HIJ-Storefront-Key` header and your store ID in the `store_id` query parameter.

```bash
curl "https://api.hij-search.example/v2/search?store_id=<YOUR-STORE-ID>&q=linen+shirt" \
  -H "X-HIJ-Storefront-Key: <YOUR-STOREFRONT-KEY>"
```

{% admonition type="warning" %}
The storefront key is public and read-only. Never send a secret key from a browser or app.
{% /admonition %}

## Response codes

| Code | Meaning | What to do |
| --- | --- | --- |
| `200` | Success. | Render the response. |
| `400` | A parameter is missing or invalid. `error.code` is `invalid_parameter`. | Fix the request. Don't retry. |
| `401` | The storefront key is missing or wrong. | Check the header name and key. |
| `404` | The collection doesn't exist or isn't published in this market. | Show your own not-found page. |
| `429` | Rate limited. | Wait for the seconds in `Retry-After`, then retry once. |
| `5xx` | HIJ Search is unavailable. | Switch to your fallback. The SDKs do this automatically. |

## Pagination

Pass `page` (from 1) and `per_page` (1 to 96, default 24). Every list response includes `total`, `page`, `per_page` and `total_pages`.

## Sorting

Pass a sort option ID in `sort`. Read the available IDs from `sort_options` in any list response; the selected one has `selected: true`.

## Filtering

Filters use the `f` parameter, keyed by filter ID.

| Filter type | Syntax | Example |
| --- | --- | --- |
| Checkbox, one value | `f[<filter-id>][]=<item-id>` | `f[colour][]=blue` |
| Checkbox, several values | repeat the key | `f[colour][]=blue&f[colour][]=green` |
| Range | `f[<filter-id>][min]=<n>&f[<filter-id>][max]=<n>` | `f[price][min]=20&f[price][max]=80` |

## Endpoints

{% cards columns=3 %}
  {% card title="Search" to="/api/openapi/search/search" icon="magnifying-glass" %}
    `GET /v2/search`
  {% /card %}
  {% card title="Suggestions" to="/api/openapi/search/suggestions" icon="keyboard" %}
    `GET /v2/suggestions`
  {% /card %}
  {% card title="Collection" to="/api/openapi/collections/getcollection" icon="layer-group" %}
    `GET /v2/collections/{id}`
  {% /card %}
{% /cards %}
