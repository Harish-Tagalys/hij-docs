---
description: "Configure HIJ for Shopify Markets: set the shopper's market and currency, keep market URL prefixes and switch markets without a reload, with either JS SDK."
---

# Recipe: multi-market stores

**Applies to:** section `Recipes` (flow step 7 of 8) · product `recipes` · SDKs `full-stack`, `headless` · version `3.x` · status `current` · store types `liquid`, `hydrogen`, `custom-frontend` · requires `full-stack`, `headless`

Stores that sell in several Shopify Markets need HIJ to return each shopper's prices, availability and product URLs. Written for full stack 3.0.20 and headless 3.0.21; the configuration is shared.

## 1. Index the markets

In the HIJ Search app, open **Settings → Markets** and select every market you sell in. HIJ indexes prices and product availability per market.

## 2. Pass the shopper's market

{% tabs %}
{% tab title="Liquid theme" %}
```liquid
<script>
  window.hijMarket = {
    marketCode: {{ localization.country.iso_code | json }},
    currency: {{ cart.currency.iso_code | json }},
    routesRoot: {{ routes.root_url | json }},
    locale: {{ request.locale.iso_code | json }}
  };
</script>
```
{% endtab %}
{% tab title="Hydrogen" %}
```tsx
// app/root.tsx: expose the market from the storefront i18n
export async function loader({ context }) {
  const { country, language } = context.storefront.i18n;
  return { hijMarket: { marketCode: country, locale: `${language.toLowerCase()}-${country}` } };
}
```
{% endtab %}
{% endtabs %}

Then use it in the HIJ configuration:

```javascript
function setHIJConfiguration() {
  HIJ.setConfiguration({
    api: { serverUrl: "https://api.hij-search.example", shopId: "<YOUR-SHOP-ID>", storefrontToken: "<YOUR-STOREFRONT-TOKEN>" },
    locale: window.hijMarket.locale,
    currency: { label: window.hijMarket.currency, fractionDigits: 2 },
  });
}

function setHIJPlatformConfiguration() {
  HIJ.setPlatformConfiguration({
    marketCode: window.hijMarket.marketCode,
    baseMarketCode: "US",
  });
}
```

## 3. Keep market URL prefixes

Shopify Markets can serve markets under a path prefix, such as `/de-de/`. Product URLs from HIJ don't include it. Prefix them in the product template:

```javascript
templates: {
  product: {
    productPageUrl: function (product) {
      return window.hijMarket.routesRoot.replace(/\/$/, "") + "/products/" + product.handle;
    },
  },
}
```

Headless storefronts usually build URLs with their router already; use the same locale-aware helper you use for Shopify product links.

## 4. Switch markets without a reload

If the shopper can change market without a page load, update the configuration and re-initialise:

```javascript
function onMarketChange(next) {
  window.hijMarket = next;
  setHIJConfiguration();
  setHIJPlatformConfiguration();
  // Full stack: widgets re-fetch on their next state change; call init again to refresh now.
  // Headless: call your connector's init again with the same params.
}
```

{% hint style="warning" %}
Price filters are offered only to shoppers in the base market (`baseMarketCode`). Other markets see results without a price filter, because converted prices change with exchange rates.
{% endhint %}
