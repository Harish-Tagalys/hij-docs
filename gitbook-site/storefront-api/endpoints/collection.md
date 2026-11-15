---
description: "GET /v2/collections/{id}: a merchandised collection with filters, sort options and pagination."
---

# Get a collection

**Applies to:** section `Storefront API` (flow step 2 of 8) · product `storefront-api` · version `v2` · status `current` · store types `server-side`, `hydrogen`, `custom-frontend` · requires `credentials`, `analytics`

```
GET https://api.hij-search.example/v2/collections/{id}
```

Returns a merchandised collection's products, filters, sort options and pagination.

## Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | path | Yes | string | Collection ID. |
| `shop_id` | query | Yes | string | Your shop ID. |
| `X-HIJ-Visitor-Id` | header | No | string | The shopper's `hij_vid` cookie or your own stable anonymous ID. Send it on server-side calls so results stay personalised. |
| `page` | query | No | integer | Minimum 1. Default `1`. |
| `per_page` | query | No | integer | 1 to 96. Default `24`. |
| `sort` | query | No | string | Sort option ID, for example `price-asc`. |
| `market` | query | No | string | Market code. Prices and availability are returned for this market. |
| `include_filters` | query | No | boolean | Default `true`. |
| `promo_tiles` | query | No | boolean | Include promotional tiles and their grid positions. Default `false`. |
| `ab` | query | No | integer | Check for a running A/B test on this collection and return the assigned variant's products, filters and sort options. One of `0`, `1`. Default `0`. |
| `X-HIJ-AB` | header | No | string | The shopper's `hij_ab` cookie, so an existing A/B test assignment is kept. |

Send your public storefront token in the `X-HIJ-Storefront-Token` header.

## Responses

| Code | Description |
| --- | --- |
| `200` | The collection. |
| `401` | The storefront token is missing or wrong. |
| `404` | No collection with this ID. |
| `429` | Too many requests. Retry after the number of seconds in `Retry-After`. |
