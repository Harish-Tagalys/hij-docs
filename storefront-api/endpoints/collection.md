---
description: "GET /v2/collections/{id}: a merchandised collection with filters, sort options and pagination."
---

# Get a collection

```
GET https://api.hij-search.example/v2/collections/{id}
```

Returns a merchandised collection's products, filters, sort options and pagination.

## Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | path | Yes | string | Collection ID. |
| `store_id` | query | Yes | string | Your store ID. |
| `page` | query | No | integer | Minimum 1. Default `1`. |
| `per_page` | query | No | integer | 1 to 96. Default `24`. |
| `sort` | query | No | string | Sort option ID, for example `price-asc`. |
| `market` | query | No | string | Market code. Prices and availability are returned for this market. |
| `include_filters` | query | No | boolean | Default `true`. |
| `promo_tiles` | query | No | boolean | Include promotional tiles and their grid positions. Default `false`. |

Send your public storefront key in the `X-HIJ-Storefront-Key` header.

## Responses

| Code | Description |
| --- | --- |
| `200` | The collection. |
| `401` | The storefront key is missing or wrong. |
| `404` | No collection with this ID. |
| `429` | Too many requests. Retry after the number of seconds in `Retry-After`. |
