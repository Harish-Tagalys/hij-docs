---
description: "GET /v2/suggestions: query suggestions, product suggestions and popular queries for the text typed so far."
---

# Get search suggestions

```
GET https://api.hij-search.example/v2/suggestions
```

Returns query suggestions, product suggestions and popular queries for the text the shopper has typed so far into the query input field. With an empty `q`, only popular queries are returned.

## Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `store_id` | query | Yes | string | Your store ID. |
| `q` | query | No | string | Text typed so far. May be empty. Default ``. |
| `query_limit` | query | No | integer | 0 to 10. Default `6`. |
| `product_limit` | query | No | integer | 0 to 10. Default `6`. |
| `market` | query | No | string | Market code. Prices and availability are returned for this market. |

Send your public storefront key in the `X-HIJ-Storefront-Key` header.

## Responses

| Code | Description |
| --- | --- |
| `200` | Suggestions. |
| `401` | The storefront key is missing or wrong. |
| `429` | Too many requests. Retry after the number of seconds in `Retry-After`. |
