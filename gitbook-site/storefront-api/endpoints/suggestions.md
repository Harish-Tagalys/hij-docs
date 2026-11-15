---
description: "GET /v2/suggestions: query suggestions, product suggestions and popular queries for the text typed so far."
---

# Get search suggestions

**Applies to:** section `Storefront API` (flow step 2 of 8) · product `storefront-api` · version `v2` · status `current` · store types `server-side`, `hydrogen`, `custom-frontend` · requires `credentials`, `analytics`

```
GET https://api.hij-search.example/v2/suggestions
```

Returns query suggestions, product suggestions and popular queries for the text the shopper has typed so far into the query input field. With an empty `q`, only popular queries are returned.

## Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `shop_id` | query | Yes | string | Your shop ID. |
| `X-HIJ-Visitor-Id` | header | No | string | The shopper's `hij_vid` cookie or your own stable anonymous ID. Send it on server-side calls so results stay personalised. |
| `q` | query | No | string | Text typed so far. May be empty. Default ``. |
| `query_limit` | query | No | integer | 0 to 10. Default `6`. |
| `product_limit` | query | No | integer | 0 to 10. Default `6`. |
| `market` | query | No | string | Market code. Prices and availability are returned for this market. |

Send your public storefront token in the `X-HIJ-Storefront-Token` header.

## Responses

| Code | Description |
| --- | --- |
| `200` | Suggestions. |
| `401` | The storefront token is missing or wrong. |
| `429` | Too many requests. Retry after the number of seconds in `Retry-After`. |
