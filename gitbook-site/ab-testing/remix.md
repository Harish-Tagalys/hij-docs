---
description: "Run HIJ collection A/B tests on a Remix storefront on any host: resolve the variant in the loader, handle cookies and client-side navigation, and tag analytics."
---

# A/B testing on Remix

**Applies to:** section `A/B testing` (flow step 5 of 8) · product `ab-testing` · version `none` · status `current` · store types `custom-frontend` · requires `storefront-api`, `analytics`

Remix storefronts resolve the variant on the server like [Hydrogen](hydrogen-oxygen.md): the loader passes the assignment cookie to the Storefront API and forwards the updated cookie. This page covers what's different on a self-hosted or platform-hosted Remix app.

## Step 1: Load the collection

```ts
// app/routes/collections.$handle.tsx
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { readCookie } from "~/lib/hij.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const url = new URL(`https://api.hij-search.example/v2/collections/${params.handle}`);
  url.searchParams.set("shop_id", process.env.HIJ_SHOP_ID!);
  url.searchParams.set("ab", "1");

  const res = await fetch(url, {
    headers: {
      "X-HIJ-Storefront-Token": process.env.HIJ_STOREFRONT_TOKEN!,
      "X-HIJ-AB": readCookie(request, "hij_ab") ?? "",
      "X-HIJ-Visitor-Id": readCookie(request, "hij_vid") ?? "",
      "X-HIJ-Forwarded-For": request.headers.get("X-Forwarded-For") ?? "",
    },
  });
  const collection = await res.json();

  const headers = new Headers({ Vary: "Cookie" });
  const setAb = res.headers.get("X-HIJ-Set-AB");
  if (setAb) headers.append("Set-Cookie", setAb);
  if (collection.ab_test) headers.set("Cache-Control", "private, max-age=0");

  return json({ collection }, { headers });
}
```

`readCookie` is the same helper as in the [Hydrogen guide](hydrogen-oxygen.md#step-1-read-the-assignment-cookie).

## Step 2: Client-side navigation

Remix runs loaders through a `fetch` from the browser when the shopper navigates between routes. The browser sends the `hij_ab` cookie with that request, so assignments stay stable. Two things to check:

- If your API routes are on another domain, set `credentials: "include"` and allow credentials in CORS, or the cookie isn't sent.
- Don't revalidate the collection loader on filter changes made with the headless SDK. Return `false` from `shouldRevalidate` when only `hij_` query string keys changed.

```ts
export function shouldRevalidate({ currentUrl, nextUrl, defaultShouldRevalidate }) {
  const strip = (u: URL) => [...u.searchParams.keys()].filter((k) => !k.startsWith("hij_")).join();
  if (currentUrl.pathname === nextUrl.pathname && strip(currentUrl) === strip(nextUrl)) return false;
  return defaultShouldRevalidate;
}
```

## Step 3: CDN caching

Most CDNs in front of Remix apps cache on URL only. With `Vary: Cookie`, many skip caching entirely, which is what you want while a test runs. If your CDN ignores `Vary`, make sure `Cache-Control: private` reaches it for collection pages under test.

## Step 4: Tag analytics events

Same as Hydrogen: pass the loader response to `HIJ.Connector.Collection.init()` as `initialResponse`, or add `ab_test` to the `collection_viewed` event you send with the [Analytics API](https://hij.gitbook.io/hij-docs/analytics/analytics-api#event-types).
