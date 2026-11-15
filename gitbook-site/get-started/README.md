---
description: "Add HIJ search, suggestions, merchandised collections and recommendations to a Shopify store: install the app, choose the Storefront API or a JS SDK, send analytics, then add A/B testing."
---

# Integrate HIJ Search with Shopify

**Applies to:** section `Get started` (flow step 1 of 8) · product `get-started` · version `none` · status `current` · store types `liquid`, `hydrogen`, `custom-frontend`, `server-side` · requires none

HIJ Search adds product search, search suggestions, merchandised collections and recommendations to a Shopify store. Every integration follows the same steps:

{% stepper %}
{% step %}
### Install the HIJ Search app

Install the app from the Shopify App Store and let the first catalog sync finish. See [install the app](install-app.md).
{% endstep %}
{% step %}
### Collect your credentials

Copy your shop ID and storefront token. See [credentials](credentials.md).
{% endstep %}
{% step %}
### Choose your path

Call the [Storefront API](https://hij.gitbook.io/hij-docs/storefront-api) directly, or load a [JS SDK](https://hij.gitbook.io/hij-docs/sdks): full stack (ready-made widgets) or headless (your own UI). Use the table below.
{% endstep %}
{% step %}
### Send analytics

Analytics drive ranking, personalisation and reports. Which events you send yourself depends on your store type. See the [analytics overview](https://hij.gitbook.io/hij-docs/analytics).
{% endstep %}
{% step %}
### Verify, then extend

Run the [verification checklist](verify.md), then add [A/B testing](https://hij.gitbook.io/hij-docs/ab-testing), [checkout recommendations](https://hij.gitbook.io/hij-docs/checkout-recommendations) and [recipes](https://hij.gitbook.io/hij-docs/recipes).
{% endstep %}
{% endstepper %}

## Choose your path

Answer three questions about your store, then find the matching row. It gives the recommended path, how store events reach HIJ, and where to start.

| Liquid theme? | Own UI? | Server-side rendering? | Path | Store-event analytics | Start here |
| --- | --- | --- | --- | --- | --- |
| Yes | No | No | Full stack (UI widgets SDK 3.0.20) | [Shopify Pixel](https://hij.gitbook.io/hij-docs/analytics/shopify-pixel), automatic | [Full stack quick start](https://hij.gitbook.io/hij-docs/full-stack) |
| Yes | Yes | No | Headless (Connector SDK 3.0.21) | [Shopify Pixel](https://hij.gitbook.io/hij-docs/analytics/shopify-pixel), automatic | [Headless quick start](https://hij.gitbook.io/hij-docs/headless) |
| Yes | Either | Yes | Storefront API v2 | [Shopify Pixel](https://hij.gitbook.io/hij-docs/analytics/shopify-pixel) for store events, [Analytics API](https://hij.gitbook.io/hij-docs/analytics/analytics-api) for search and click events | [Storefront API overview](https://hij.gitbook.io/hij-docs/storefront-api) |
| No | No | No | Full stack (UI widgets SDK 3.0.20) | [SDK manual analytics](https://hij.gitbook.io/hij-docs/analytics/sdk-manual) or the [GTM template](https://hij.gitbook.io/hij-docs/gtm) | [Full stack quick start](https://hij.gitbook.io/hij-docs/full-stack) |
| No | Yes | No | Headless (Connector SDK 3.0.21) | [SDK manual analytics](https://hij.gitbook.io/hij-docs/analytics/sdk-manual) or the [GTM template](https://hij.gitbook.io/hij-docs/gtm) | [Headless quick start](https://hij.gitbook.io/hij-docs/headless) |
| No | Either | Yes | Storefront API v2 | [Analytics API](https://hij.gitbook.io/hij-docs/analytics/analytics-api) for every event | [Storefront API overview](https://hij.gitbook.io/hij-docs/storefront-api) |

On both SDK paths the SDK itself sends search, suggestion, collection and widget events. "Store-event analytics" covers the rest: product views, add to cart, checkout and orders. The [choose your path](choose-your-path.md) page explains each row.

{% hint style="info" %}
Hydrogen storefronts render on the server, but that alone doesn't mean "server-side rendering" here. Answer **yes** only if HIJ results must be in the server-rendered HTML. Client-side search and collection UI inside a Hydrogen app uses the headless SDK.
{% endhint %}

## Explore the docs

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
      <td><i class="fa-code"></i></td>
      <td><strong>Storefront API</strong></td>
      <td>Call the v2 REST API from a server or app.</td>
      <td><a href="https://hij.gitbook.io/hij-docs/storefront-api">storefront-api</a></td>
    </tr>
    <tr>
      <td><i class="fa-js"></i></td>
      <td><strong>JS SDKs</strong></td>
      <td>Full stack UI widgets or the headless Connector, in the browser.</td>
      <td><a href="https://hij.gitbook.io/hij-docs/sdks">sdks</a></td>
    </tr>
    <tr>
      <td><i class="fa-chart-line"></i></td>
      <td><strong>Analytics</strong></td>
      <td>Shopify Pixel, Analytics API, SDK manual analytics and the GTM template.</td>
      <td><a href="https://hij.gitbook.io/hij-docs/analytics">analytics</a></td>
    </tr>
    <tr>
      <td><i class="fa-flask"></i></td>
      <td><strong>A/B testing</strong></td>
      <td>Test collection merchandising on Liquid, Hydrogen/Oxygen and Remix.</td>
      <td><a href="https://hij.gitbook.io/hij-docs/ab-testing">ab-testing</a></td>
    </tr>
    <tr>
      <td><i class="fa-cart-shopping"></i></td>
      <td><strong>Checkout recommendations</strong></td>
      <td>Recommendation blocks for checkout, with a style builder.</td>
      <td><a href="https://hij.gitbook.io/hij-docs/checkout-recommendations">checkout-recommendations</a></td>
    </tr>
    <tr>
      <td><i class="fa-book-open"></i></td>
      <td><strong>Recipes</strong></td>
      <td>Colour swatches, similar products, lazy widgets and multi-market stores.</td>
      <td><a href="https://hij.gitbook.io/hij-docs/recipes">recipes</a></td>
    </tr>
  </tbody>
</table>

Still running an older release? Full stack 2.x, headless 2.x and earlier GTM template releases stay documented for existing stores. Open the product, then pick the release in its version menu.
