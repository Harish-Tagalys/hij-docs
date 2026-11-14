---
description: "GET /v2/search: products matching a query, with filters, sort options and pagination."
---

# Search products

**Applies to:** product `storefront-api` · version `v2` · store types `server-side`, `hydrogen`, `custom-frontend` · requires `credentials`, `analytics`

```
GET https://api.hij-search.example/v2/search
```

Returns products matching a query, with filters, sort options and pagination. Use it to render a search results page. If the query matches a redirect and `redirects` is `true`, the response contains only a `redirect` object.

## Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `shop_id` | query | Yes | string | Your shop ID. |
| `X-HIJ-Visitor-Id` | header | No | string | The shopper's `hij_vid` cookie or your own stable anonymous ID. Send it on server-side calls so results stay personalised. |
| `q` | query | Yes | string | The shopper's query. |
| `page` | query | No | integer | Minimum 1. Default `1`. |
| `per_page` | query | No | integer | 1 to 96. Default `24`. |
| `sort` | query | No | string | Sort option ID, for example `price-asc`. |
| `market` | query | No | string | Market code. Prices and availability are returned for this market. |
| `redirects` | query | No | boolean | Follow redirects configured for the query. Default `true`. |
| `match_all` | query | No | boolean | Require every word of the query to match. Default `false`. |

Send your public storefront token in the `X-HIJ-Storefront-Token` header.

## Responses

| Code | Description |
| --- | --- |
| `200` | Results, or a redirect. |
| `400` | A parameter is missing or invalid. |
| `401` | The storefront token is missing or wrong. |
| `429` | Too many requests. Retry after the number of seconds in `Retry-After`. |
