---
description: "Split traffic between a collection and its variant collections in a Liquid theme with the HIJ A/B testing library."
---

# A/B testing collections in a Liquid theme

**Applies to:** product `ab-testing` · version `none` · store types `liquid` · requires `install-app`, `analytics`

{% hint style="info" %}
This guide is for stores that render collection pages with a Liquid theme. For headless storefronts, see [Hydrogen/Oxygen](hydrogen-oxygen.md) or [Remix](remix.md). Start with the [A/B testing overview](README.md) if you haven't created a test yet.
{% endhint %}

## How it works

An A/B test compares a **primary collection** with one or more **variant collections**. Each variant has the same products but different merchandising, such as other pinned products or another default sort.

1. A shopper opens the primary collection's URL.
2. The A/B testing library assigns the shopper to a variant, weighted by each variant's traffic share, and remembers the choice for 30 days.
3. If the shopper was assigned to a variant, the library loads that variant's products into the page. The URL in the address bar doesn't change.
4. Every collection event is tagged with the test and variant, so the dashboard can compare conversion.

<details>
<summary>Variant collections in detail</summary>

Variant collections are normal collections in your store with two metafields:

| Metafield | On | Type | Value |
| --- | --- | --- | --- |
| `hij.variant_collections` | Primary collection | List of collection references | The variants in this test. |
| `hij.primary_collection` | Each variant | Collection reference | The primary collection. |
| `hij.traffic_weight` | Each variant | Integer | Share of traffic, from 0 to 100. The primary gets what's left. |

The HIJ dashboard creates and fills these metafields when you start a test. Don't edit them by hand while a test is running.

</details>

<details>
<summary>Collection handles with a suffix</summary>

Variants get the primary collection's handle plus a suffix, for example `summer-linen` and `summer-linen-hij-b`. Keep the suffix: Step 6 relies on it to hide variants from navigation and sitemaps.

</details>

## Integration steps

### Step 1: Save the snippet in your theme

Download [hij-ab-testing.liquid](.gitbook/assets/hij-ab-testing.liquid) and save it in the `snippets` folder of your theme as `hij-ab-testing.liquid`.

{% file src=".gitbook/assets/hij-ab-testing.liquid" %}
{% endfile %}

The snippet writes the test configuration for the current collection into a JSON script tag:

```liquid
{%- liquid
  assign hij_primary = collection.metafields.hij.primary_collection.value
  if hij_primary == blank
    assign hij_primary = collection
  endif
  assign hij_variants = hij_primary.metafields.hij.variant_collections.value
-%}

<script type="application/json" id="hij-ab-testing-config">
  { "enabled": {% if hij_variants != blank %}true{% else %}false{% endif %} }
</script>
```

### Step 2: Load the A/B testing library

Render the snippet and load the library in the `<head>` of `layout/theme.liquid`, before the HIJ UI widgets script:

```liquid
{% if template.name == 'collection' %}
  {% render 'hij-ab-testing' %}
  <script src="https://cdn.hij-search.example/hij-ab-testing-1.0.2.min.js"></script>
{% endif %}
```

### Step 3: Point the canonical URL at the primary collection

Search engines should only index the primary collection. Replace the canonical tag in `layout/theme.liquid`:

```liquid
{%- if collection.metafields.hij.primary_collection.value != blank -%}
  <link rel="canonical" href="{{ shop.url }}{{ collection.metafields.hij.primary_collection.value.url }}">
{%- else -%}
  <link rel="canonical" href="{{ canonical_url }}">
{%- endif -%}
```

### Step 4: Render collection details from the primary collection

The title, description and banner should stay the same in every variant. Read them from the primary collection:

```liquid
{%- assign hij_display_collection = collection.metafields.hij.primary_collection.value | default: collection -%}

<header class="collection-hero">
  <h1>{{ hij_display_collection.title | escape }}</h1>
  {%- if hij_display_collection.image -%}
    {{ hij_display_collection.image | image_url: width: 1600 | image_tag: loading: 'eager', alt: hij_display_collection.title }}
  {%- endif -%}
  <div class="rte">{{ hij_display_collection.description }}</div>
</header>
```

{% hint style="info" %}
Only the product grid, sort options and filters come from the variant. Everything else on the page comes from the primary collection.
{% endhint %}

### Step 5: Use `collection` for products, sort options and filters

Keep using the plain `collection` object for the product grid, sort options and filters. The library swaps `collection` to the assigned variant before the page renders, so these follow the variant automatically.

```liquid
{%- paginate collection.products by 24 -%}
  <ul class="product-grid">
    {%- for product in collection.products -%}
      <li>{% render 'product-card', product: product %}</li>
    {%- endfor -%}
  </ul>
  {{ paginate | default_pagination }}
{%- endpaginate -%}
```

### Step 6: Hide variant collections from navigation

Variant collections must not be discoverable in menus, sitemaps or collection lists.

{% hint style="info" %}
Shoppers who open a variant's URL directly are redirected to the primary collection, so a leaked link is harmless. Hiding variants keeps them out of your own menus and lists.
{% endhint %}

```liquid
{%- for c in collections -%}
  {%- unless c.handle contains '-hij-' -%}
    <a href="{{ c.url }}">{{ c.title | escape }}</a>
  {%- endunless -%}
{%- endfor -%}
```

{% hint style="success" %}
After deploying, open the primary collection in a private window a few times. You should land in different variants, and the canonical tag should always point at the primary collection.
{% endhint %}

## Customisation

Set options on `window.HIJABTesting` before the library script loads.

<details>
<summary>Prevent initialisation for specific visitors</summary>

```javascript
window.HIJABTesting = window.HIJABTesting || {};
window.HIJABTesting.shouldInitialise = function (context) {
  // Never put staff previews into a test.
  return !document.cookie.includes("staff_preview=1");
};
```

</details>

<details>
<summary>Force-assign a visitor to a variant</summary>

Useful for QA. The assignment lasts until the cookie expires.

```javascript
window.HIJABTesting = window.HIJABTesting || {};
window.HIJABTesting.forceVariant = function (configuration) {
  var forced = new URLSearchParams(window.location.search).get("hij_variant");
  return forced || null; // a variant handle, or null for normal assignment
};
```

</details>

<details>
<summary>Customise collection URLs and redirection</summary>

```javascript
window.HIJABTesting = window.HIJABTesting || {};
window.HIJABTesting.getCollectionUrl = function (collection, context) {
  // Keep market prefixes such as /de-de/ in the URL.
  return context.routesRoot.replace(/\/$/, "") + "/collections/" + collection.handle;
};
window.HIJABTesting.onRedirect = function (redirect) {
  // redirect = { from: "/collections/summer-linen-hij-b", to: "/collections/summer-linen", reason: "direct-variant-visit" }
  window.location.replace(redirect.to + window.location.search);
  return false; // tell the library you handled it
};
```

</details>

<details>
<summary>Check whether a collection is a test variant</summary>

```javascript
if (window.HIJABTesting.isVariant(collectionHandle)) {
  // e.g. skip a third-party badge that shouldn't appear on variants
}
```

</details>

### Data formats

<details>
<summary>configuration</summary>

```javascript
{
  enabled: true,
  primaryCollection: { id: 4011, handle: "summer-linen", url: "/collections/summer-linen" },
  currentCollection: { id: 4011, handle: "summer-linen" },
  variants: [
    { id: 4012, handle: "summer-linen-hij-b", url: "/collections/summer-linen-hij-b", weight: 50 }
  ],
  canonicalUrl: "https://shop.example/collections/summer-linen",
  locale: "en"
}
```

</details>

<details>
<summary>redirect</summary>

```javascript
{
  from: "/collections/summer-linen-hij-b",
  to: "/collections/summer-linen",
  reason: "direct-variant-visit" // or "test-ended"
}
```

</details>
