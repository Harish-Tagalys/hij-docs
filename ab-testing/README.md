---
description: "Test collection merchandising with HIJ A/B tests: how traffic is split, what each storefront platform has to do, and the install snippet for Liquid, Hydrogen/Oxygen and Remix."
---

# A/B testing overview

**Applies to:** section `A/B testing` (flow step 5 of 8) · product `ab-testing` · version `none` · status `current` · store types `liquid`, `hydrogen`, `custom-frontend` · requires `analytics`

An A/B test compares a **primary collection** with one or more **variant collections**. Each variant has the same products with different merchandising: other pinned products, boosted brands or another default sort. HIJ splits traffic between them, keeps each shopper in one variant for 30 days and reports conversion per variant.

There is one A/B testing release for all platforms. What your storefront does depends on how it renders collection pages.

## How it works

1. You create a test in the HIJ Search app under **Merchandising → A/B tests**. The app creates the variant collections and their metafields.
2. A shopper opens the primary collection's URL.
3. The shopper is assigned to a variant, weighted by traffic share, and the assignment is stored in the `hij_ab` cookie.
4. The page shows the assigned variant's products, sort options and filters. The URL, title, description and canonical tag stay those of the primary collection.
5. `collection_viewed` events carry the test and variant IDs, so conversion can be compared.

{% hint style="warning" %}
A/B test results depend on analytics. Make sure `collection_viewed`, `product_clicked`, `product_added_to_cart` and `order_completed` arrive for your store before you start a test. See the [analytics overview](https://hij.gitbook.io/hij-docs/analytics).
{% endhint %}

## Install

{% tabs %}
{% tab title="Liquid" %}
Save [hij-ab-testing.liquid](.gitbook/assets/hij-ab-testing.liquid) in your theme's `snippets` folder, then render it and load the library in the `<head>` of `layout/theme.liquid`, before the HIJ UI widgets script:

{% file src=".gitbook/assets/hij-ab-testing.liquid" %}
{% endfile %}

```liquid
{% if template.name == 'collection' %}
  {% render 'hij-ab-testing' %}
  <script src="https://cdn.hij-search.example/hij-ab-testing-1.0.2.min.js"></script>
{% endif %}
```

The library swaps `collection` to the assigned variant before the page renders. Continue with the [Liquid guide](liquid.md) for the canonical URL, collection details and navigation.
{% endtab %}
{% tab title="Hydrogen" %}
Resolve the variant in the collection route's `loader` on Oxygen. Pass the shopper's `hij_ab` cookie to the Storefront API and forward the cookie it returns:

```ts
// app/routes/collections.$handle.tsx
export async function loader({ params, request, context }) {
  const res = await fetch(
    `https://api.hij-search.example/v2/collections/${params.handle}?shop_id=${context.env.HIJ_SHOP_ID}&ab=1`,
    {
      headers: {
        "X-HIJ-Storefront-Token": context.env.HIJ_STOREFRONT_TOKEN,
        "X-HIJ-AB": readCookie(request, "hij_ab") ?? "",
      },
    },
  );
  const collection = await res.json(); // collection.ab_test = { test_id, variant_id } | null
  return data({ collection }, {
    headers: {
      "Set-Cookie": res.headers.get("X-HIJ-Set-AB") ?? "",
      "Cache-Control": collection.ab_test ? "private, max-age=0" : "public, max-age=60",
    },
  });
}
```

Continue with the [Hydrogen/Oxygen guide](hydrogen-oxygen.md) for caching and analytics.
{% endtab %}
{% tab title="Remix" %}
Resolve the variant in the collection route's `loader`, the same way on any host:

```ts
// app/routes/collections.$handle.tsx
import { json } from "@remix-run/node";

export async function loader({ params, request }) {
  const res = await fetch(
    `https://api.hij-search.example/v2/collections/${params.handle}?shop_id=${process.env.HIJ_SHOP_ID}&ab=1`,
    {
      headers: {
        "X-HIJ-Storefront-Token": process.env.HIJ_STOREFRONT_TOKEN,
        "X-HIJ-AB": readCookie(request, "hij_ab") ?? "",
      },
    },
  );
  const collection = await res.json();
  return json({ collection }, {
    headers: { "Set-Cookie": res.headers.get("X-HIJ-Set-AB") ?? "", "Vary": "Cookie" },
  });
}
```

Continue with the [Remix guide](remix.md) for client-side navigation and analytics.
{% endtab %}
{% endtabs %}

## Platform guides

<table data-view="cards">
  <thead>
    <tr>
      <th width="48"></th>
      <th></th>
      <th></th>
      <th data-hidden data-card-target data-type="content-ref"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><i class="fa-shopify"></i></td>
      <td><strong>Liquid</strong></td>
      <td>Snippet, library and theme changes.</td>
      <td><a href="liquid.md">liquid.md</a></td>
    </tr>
    <tr>
      <td><i class="fa-bolt"></i></td>
      <td><strong>Hydrogen/Oxygen</strong></td>
      <td>Loader, Oxygen caching and analytics.</td>
      <td><a href="hydrogen-oxygen.md">hydrogen-oxygen.md</a></td>
    </tr>
    <tr>
      <td><i class="fa-code"></i></td>
      <td><strong>Remix</strong></td>
      <td>Loader, cookies and client navigation.</td>
      <td><a href="remix.md">remix.md</a></td>
    </tr>
  </tbody>
</table>
