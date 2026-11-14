---
description: "Authenticate Storefront API v2 requests with your shop ID and storefront token, pass visitor IDs for personalisation, and handle rate limits."
---

# Storefront API authentication

**Applies to:** product `storefront-api` · version `v2` · store types `server-side`, `hydrogen`, `custom-frontend` · requires `credentials`, `analytics`

Every Storefront API request carries two credentials from [Credentials](https://hij.gitbook.io/hij-docs/get-started/credentials):

| Credential | Sent as | Example |
| --- | --- | --- |
| Shop ID | `shop_id` query parameter | `shop_id=shp_4k7q2m9x1c` |
| Storefront token | `X-HIJ-Storefront-Token` header | `X-HIJ-Storefront-Token: sft_...` |

```bash
curl "https://api.hij-search.example/v2/collections/summer-linen?shop_id=<YOUR-SHOP-ID>&market=US" \
  -H "X-HIJ-Storefront-Token: <YOUR-STOREFRONT-TOKEN>"
```

The token is public and read-only, so you can call the API from a browser, an app or a server. Keep it in an environment variable anyway, so you can [rotate it](https://hij.gitbook.io/hij-docs/get-started/credentials#rotate-the-storefront-token) without a code change.

## Calls from a server

When your server calls the API on behalf of a shopper, add these headers so results stay personalised and rate limits apply per shopper rather than to your server:

| Header | Value | Required |
| --- | --- | --- |
| `X-HIJ-Visitor-Id` | The shopper's `hij_vid` cookie, or your own stable anonymous ID | Recommended |
| `X-HIJ-Session-Id` | The shopper's `hij_sid` cookie, or your own session ID | Recommended |
| `X-HIJ-Forwarded-For` | The shopper's IP address | Recommended for rate limiting |
| `User-Agent` | Your app name and version, for example `acme-storefront/4.2` | Yes |

Use the same visitor and session IDs in the events you send with the [Analytics API](https://hij.gitbook.io/hij-docs/analytics/analytics-api), or HIJ can't connect a search to the click and order that followed.

```ts
// Hydrogen or Remix loader
export async function loader({ request, context }) {
  const cookies = request.headers.get("Cookie") ?? "";
  const visitorId = /(?:^|; )hij_vid=([^;]+)/.exec(cookies)?.[1];
  const url = new URL("https://api.hij-search.example/v2/search");
  url.searchParams.set("shop_id", context.env.HIJ_SHOP_ID);
  url.searchParams.set("q", new URL(request.url).searchParams.get("q") ?? "");

  const res = await fetch(url, {
    headers: {
      "X-HIJ-Storefront-Token": context.env.HIJ_STOREFRONT_TOKEN,
      ...(visitorId ? { "X-HIJ-Visitor-Id": visitorId } : {}),
      "X-HIJ-Forwarded-For": request.headers.get("X-Forwarded-For") ?? "",
      "User-Agent": "acme-storefront/4.2",
    },
  });
  return res.json();
}
```

## Rate limits

| Limit | Value |
| --- | --- |
| Per shopper (visitor ID or forwarded IP) | 20 requests per second |
| Per shop | 1,000 requests per second |

Over the limit, the API returns `429` with a `Retry-After` header. Wait that many seconds and retry once. Cache collection responses for up to 60 seconds if you render the same page for many shoppers.

## Errors

| Code | Cause |
| --- | --- |
| `401` | Missing or wrong storefront token, or a token that was rotated more than 24 hours ago. |
| `403` | The shop ID doesn't belong to this token. |

The full list of response codes is in the [overview](README.md#response-codes).
