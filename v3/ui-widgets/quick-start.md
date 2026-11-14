---
description: "Load the HIJ UI widgets SDK, configure it, handle analytics consent and render your first widget."
---

# Full stack quick start: HIJ UI widgets

## Overview

The HIJ UI widgets are ready-made, templatable front-end components for search results, search suggestions and collections. Each widget fetches its own data, keeps its own state (applied filters, sort option, page) and re-renders when that state changes. You customise the markup with templates and hook in your own logic with callbacks.

All widgets live in the `HIJ.UIWidgets` namespace. If you'd rather render everything yourself, use the headless SDK in the `HIJ.Connector` namespace instead. See the [Collections connector](../connector/collections.md).

Looking for the legacy SDK? [View the 2.x version of this page](https://app.gitbook.com/s/XSPACE_V2/).

## Quick start

{% stepper %}
{% step %}
### Include the HIJ UI widgets SDK

Add the script tag to the `<head>` of every page that shows a widget. The `defer` attribute is optional. Leave it out only if you can guarantee that widgets are initialised after this tag.

```html
<script src="https://cdn.hij-search.example/hij-ui-widgets-3.0.20.min.js" defer></script>
```

The current release is **3.0.20**. Pin the exact version: the CDN never serves a "latest" alias.

{% endstep %}

{% step %}
### Set the HIJ configuration

Set your server URL, storefront key, locale and currency. Your storefront key is in the HIJ dashboard under **Settings → Keys**. It is a public, read-only key.

```javascript
function setHIJConfiguration() {
  HIJ.setConfiguration({
    api: {
      serverUrl: "https://api.hij-search.example",
      storefrontKey: "<YOUR-STOREFRONT-KEY>",
    },
    locale: "en-US",
    currency: {
      displayFormatter: "{{currencyLabel}} {{value}}",
      label: "$",
      fractionDigits: 2,
    },
  });
}
```

<details>
<summary>Configuration options</summary>

| Option | Type | Required | Description |
| --- | --- | --- | --- |
| `api.serverUrl` | string | Yes | The HIJ API server the SDK calls. Always `https://api.hij-search.example` unless support gives you a regional host. |
| `api.storefrontKey` | string | Yes | Public storefront key. Safe to expose in the browser. Never put a secret key here. |
| `locale` | string | Yes | BCP 47 locale used for formatting and for translated product fields. It should match the store's locale. |
| `currency.displayFormatter` | string | No | Template for prices. The SDK replaces `{{currencyLabel}}` and `{{value}}` when rendering. |
| `currency.label` | string | No | Currency label shown to shoppers, for example `$` or `EUR`. |
| `currency.fractionDigits` | number | No | Number of decimal places. Defaults to `2`. |

</details>

{% endstep %}

{% step %}
### Set the platform configuration

Tell the SDK which market the shopper is browsing and which extra product fields your product tiles need.

```javascript
function setHIJPlatformConfiguration() {
  HIJ.setPlatformConfiguration({
    marketCode: "<SHOPPER-MARKET-CODE>", // the market the shopper picked, for example "DE"
    baseMarketCode: "<STORE-BASE-MARKET-CODE>",
    catalogFeed: {
      feedUrl: "https://feeds.hij-search.example/<YOUR-STORE-ID>/catalog.json",
      refreshMinutes: 15,
    },
    productFields: ["material", "care_instructions", "badge_text"],
  });
}
```

<details>
<summary>Platform configuration options</summary>

| Option | Type | Required | Description |
| --- | --- | --- | --- |
| `marketCode` | string | Yes | The shopper's market. HIJ returns prices and availability for this market. |
| `baseMarketCode` | string | Yes | Your store's base market. Price filters are offered only to shoppers in the base market. |
| `catalogFeed.feedUrl` | string | No | Your catalog feed, used by the fallback widgets when the HIJ API can't be reached. |
| `catalogFeed.refreshMinutes` | number | No | How often the fallback re-reads the feed. Defaults to `15`. |
| `productFields` | string[] | No | Extra product fields to fetch and expose to product tile templates. Fields must be enabled in the dashboard first. |

</details>

{% endstep %}

{% step %}
### Use `onHIJReady` to run code safely

Use this helper anywhere on the page to make sure the SDK is loaded and configured before you call widget or analytics code.

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

onHIJReady(function () {
  // HIJ.UIWidgets.* and HIJ.Analytics.* calls go here
});
```
{% endstep %}
{% endstepper %}

{% hint style="info" %}
You can call `onHIJReady` as often as you need. Re-applying the configuration is safe and doesn't send duplicate events. `onHIJReady` doesn't support SDK scripts loaded with `async` or injected dynamically.
{% endhint %}

## Analytics and consent

Analytics tracking is off by default. To turn it on and connect it to your consent banner, set these options:

```javascript
HIJ.setConfiguration({
  // ...the options from step 2
  analyticsConsentProvided: function () {
    // Return true only when the shopper has accepted analytics storage.
    return window.consentState && window.consentState.analytics === "granted";
  },
  track: true,
  analyticsCookieDomain: ".shop.example",
});
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `analyticsConsentProvided` | Function | `() => false` | Called before every analytics event. Return `true` to send it. While it returns `false`, events are dropped (not queued) and the HIJ analytics cookies are removed. Because it runs per event, consent given after page load is picked up without re-initialising. |
| `track` | Boolean | `false` | Whether the SDK sends its built-in analytics events. Set it to `false` if you'd rather read the event data and send it through your own tag manager. |
| `analyticsCookieDomain` | String | current host | Cookie domain for the visitor and session cookies. Set it to the parent domain when the store spans subdomains. |

How the consent result maps to SDK behaviour:

| `analyticsConsentProvided()` returns | Events | Cookies `hij_vid` / `hij_sid` | Personalised results |
| --- | --- | --- | --- |
| `true` | Sent | Set and refreshed | Yes |
| `false` | Dropped | Removed | No, results are not personalised |
| Throws an error | Dropped, error logged once | Left as they are | No |

## Markets

When the store sells in several markets, set `marketCode` to the shopper's chosen market. HIJ then responds with:

1. Prices in that market's currency
2. Only the products published in that market

```javascript
HIJ.setPlatformConfiguration({
  marketCode: "<SHOPPER-MARKET-CODE>",
});
```

## UI widgets

Initialise a widget by calling its `init` method with a CSS selector and options. Call `init` only after the widget's container is visible and has a width.

- Search
  - [Search results](search-results.md)
  - [Search suggestions](search-suggestions.md) (attached to the store's query input field)
- Collections
  - HIJ-powered: render with the [Collections connector](../connector/collections.md)
  - Fallback: reads your catalog feed when the API can't be reached (see [failover](../reuse/page-a.md))
- Experiments
  - [A/B testing in a Liquid theme](../ab-testing/setup-liquid.md)

## Headless alternative

The headless SDK has its own script and version number. The two SDKs are released separately, so their versions differ.

```html
<script src="https://cdn.hij-search.example/hij-connector-3.0.21.min.js" defer></script>
```

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
      <td><i class="fa-list"></i></td>
      <td><strong>Search results widget</strong></td>
      <td>Templates, options and callbacks for the results page.</td>
      <td><a href="search-results.md">search-results.md</a></td>
    </tr>
    <tr>
      <td><i class="fa-code"></i></td>
      <td><strong>REST API overview</strong></td>
      <td>Call the v2 API directly from a server or app.</td>
      <td><a href="../api/overview.md">overview.md</a></td>
    </tr>
  </tbody>
</table>
