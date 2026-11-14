---
description: "Load the headless HIJ Connector SDK, configure it, handle analytics consent and fetch your first collection or search results."
---

# Headless quick start: HIJ Connector

**Applies to:** product `headless` · version `3.x` · store types `liquid`, `hydrogen`, `custom-frontend` · requires `install-app`, `credentials`

## Overview

The HIJ Connector is the headless SDK. It fetches search results, search suggestions and merchandised collections, keeps the request state (applied filters, sort option, page) and sends analytics events. It doesn't render anything: your code builds the page from the data and helpers it returns.

All connectors live in the `HIJ.Connector` namespace. If you'd rather use ready-made, templatable widgets, see the [full stack quick start](https://hij.gitbook.io/hij-docs/full-stack) instead.

This page covers headless **3.x**. Still on the 2.x Connector? [View the 2.x version of this page](https://hij.gitbook.io/hij-docs/headless/v2).

## Quick start

{% stepper %}
{% step %}
### Include the HIJ Connector SDK

Add the script tag to the `<head>` of every page that fetches HIJ data.

```html
<script src="https://cdn.hij-search.example/hij-connector-3.0.21.min.js" defer></script>
```

The current release is **3.0.21**. Pin the exact version: the CDN never serves a "latest" alias. The Connector is released separately from the UI widgets, so the two version numbers differ.

{% endstep %}

{% step %}
### Set the HIJ configuration

The configuration is the same one the UI widgets use. Your storefront token is in the HIJ dashboard under **Settings → Credentials**. It is public and read-only. See [credentials](https://hij.gitbook.io/hij-docs/get-started/credentials) for where to find your shop ID and token.

```javascript
function setHIJConfiguration() {
  HIJ.setConfiguration({
    api: {
      serverUrl: "https://api.hij-search.example",
      shopId: "<YOUR-SHOP-ID>",
      storefrontToken: "<YOUR-STOREFRONT-TOKEN>",
    },
    locale: "en-US",
    currency: {
      label: "$",
      fractionDigits: 2,
    },
  });
}
```

| Option | Type | Required | Description |
| --- | --- | --- | --- |
| `api.serverUrl` | string | Yes | The HIJ API server the SDK calls. Always `https://api.hij-search.example` unless support gives you a regional host. |
| `api.shopId` | string | Yes | Your HIJ shop ID, for example `shp_4k7q2m9x1c`. |
| `api.storefrontToken` | string | Yes | Public storefront token. Safe to expose in the browser. Never put the Shopify Admin API token or any other secret here. |
| `locale` | string | Yes | BCP 47 locale used for translated product fields. |
| `currency.label` | string | No | Currency label used by `helpers.formatPrice()`. |
| `currency.fractionDigits` | number | No | Number of decimal places. Defaults to `2`. |

{% endstep %}

{% step %}
### Set the platform configuration

```javascript
function setHIJPlatformConfiguration() {
  HIJ.setPlatformConfiguration({
    marketCode: "<SHOPPER-MARKET-CODE>",
    baseMarketCode: "<STORE-BASE-MARKET-CODE>",
    catalogFeed: {
      feedUrl: "https://feeds.hij-search.example/<YOUR-SHOP-ID>/catalog.json",
    },
  });
}
```

`catalogFeed` is used by the fallback connectors when HIJ Search can't be reached. See [failover](failover.md).

{% endstep %}

{% step %}
### Wait until the SDK is ready

```javascript
function onHIJReady(callback) {
  function run() {
    setHIJConfiguration();
    setHIJPlatformConfiguration();
    callback();
  }
  if (window.HIJ) {
    run();
  } else {
    window.addEventListener("DOMContentLoaded", run);
  }
}
```

In a single-page app, call `setHIJConfiguration()` and `setHIJPlatformConfiguration()` once after the script loads, and again whenever the shopper changes market or locale.

{% endstep %}

{% step %}
### Fetch your first data

Every connector has an `init` method that takes request parameters and callbacks.

```javascript
onHIJReady(function () {
  HIJ.Connector.SearchResults.init({
    params: { query: "linen shirt", perPage: 24 },
    onSuccess: function (response, helpers) {
      renderSearchResults(response, helpers);
    },
    onFailure: function (error) {
      console.warn("HIJ search unavailable:", error.type, error.message);
    },
  });
});
```

`helpers` reads and changes the state of the request. Calling a helper that changes state, such as `helpers.applyFilter()`, fetches again and calls `onSuccess` with the new response.
{% endstep %}
{% endstepper %}

## Analytics and consent

The Connector sends its analytics events only when the shopper has consented:

```javascript
HIJ.setConfiguration({
  // ...the options from step 2
  analyticsConsentProvided: function () {
    return window.consentState && window.consentState.analytics === "granted";
  },
  track: true,
});
```

`analyticsConsentProvided` is called before every event, so consent given after page load is picked up without re-initialising. While it returns `false`, events are dropped and the HIJ analytics cookies are removed. Product clicks must be tracked by your code with `helpers.trackProductClick(product)`, because the Connector doesn't own your markup.

### Store events

The Connector sends search, suggestion and collection events. Product views, add to cart and orders happen in your own code, so you send them:

- **Liquid theme:** the [Shopify Pixel](https://hij.gitbook.io/hij-docs/analytics/shopify-pixel) sends them automatically.
- **Hydrogen or another custom front end:** use [SDK manual analytics](https://hij.gitbook.io/hij-docs/analytics/sdk-manual) (`HIJ.Analytics.track()`) or the [GTM template](https://hij.gitbook.io/hij-docs/gtm).

See the [analytics overview](https://hij.gitbook.io/hij-docs/analytics) for the full event list.

## Connectors

| Connector | Method | Use it for |
| --- | --- | --- |
| Search results | `HIJ.Connector.SearchResults.init()` | The results page for a query. |
| Search suggestions | `HIJ.Connector.SearchSuggestions.init()` | Suggestions while the shopper types. |
| Collections | `HIJ.Connector.Collection.init()` | [Merchandised product listing pages](collections.md). |
| Recommendations | `HIJ.Connector.Recommendations.init()` | Strips such as similar products. See the [similar products recipe](https://hij.gitbook.io/hij-docs/recipes/similar-products-pdp). |

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
      <td><i class="fa-layer-group"></i></td>
      <td><strong>Collections connector</strong></td>
      <td>Filters, sort options, pagination and promotional tiles.</td>
      <td><a href="collections.md">collections.md</a></td>
    </tr>
    <tr>
      <td><i class="fa-clock-rotate-left"></i></td>
      <td><strong>Headless changelog</strong></td>
      <td>Every Connector release, newest first.</td>
      <td><a href="https://hij.gitbook.io/hij-docs/changelogs/headless">headless</a></td>
    </tr>
  </tbody>
</table>

{% hint style="success" %}
Rendering on a server or in a native app? Call the [Storefront API](https://hij.gitbook.io/hij-docs/storefront-api) directly instead of loading the Connector.
{% endhint %}
