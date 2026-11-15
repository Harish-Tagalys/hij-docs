---
description: "Which analytics events HIJ needs, which ones the SDKs and the Shopify Pixel send for you, and how to send the rest from a headless store, the Storefront API or GTM."
---

# Analytics overview

**Applies to:** section `Analytics` (flow step 4 of 8) · product `analytics` · version `none` · status `current` · store types `liquid`, `hydrogen`, `custom-frontend`, `server-side` · requires `credentials`

HIJ learns from shopper behaviour. Searches, clicks, product views, add to cart and orders drive ranking, personalisation, merchandising reports and [A/B test](https://hij.gitbook.io/hij-docs/ab-testing) results. Every integration path needs analytics; what changes is who sends each event.

## Events

| Event | When | Group |
| --- | --- | --- |
| `search_performed` | A results page is shown for a query | Search and widget |
| `suggestion_selected` | The shopper picks a query or product suggestion | Search and widget |
| `product_clicked` | The shopper clicks a product in search results, a collection or a recommendation strip | Search and widget |
| `recommendation_viewed` | A recommendation strip is shown | Search and widget |
| `collection_viewed` | A collection page is shown (page 1) | Store |
| `product_viewed` | A product page is shown | Store |
| `product_added_to_cart` | A product is added to the cart | Store |
| `checkout_started` | The shopper starts checkout | Store |
| `order_completed` | An order is placed | Store |

Event fields are listed on the [Analytics API](analytics-api.md#event-types) page. Every method sends the same event set.

## Who sends what

| Your store and path | Search and widget events | Store events |
| --- | --- | --- |
| Liquid theme + full stack or headless SDK | The SDK, automatically | [Shopify Pixel](shopify-pixel.md), automatically |
| Liquid theme + Storefront API | You, with the [Analytics API](analytics-api.md) | [Shopify Pixel](shopify-pixel.md), automatically |
| Hydrogen or custom front end + SDK | The SDK, automatically | You, with [SDK manual analytics](sdk-manual.md) or the [GTM template](https://hij.gitbook.io/hij-docs/gtm) |
| Hydrogen or custom front end + Storefront API | You, with the [Analytics API](analytics-api.md) | You, with the [Analytics API](analytics-api.md) |
| Native app or backend | You, with the [Analytics API](analytics-api.md) | You, with the [Analytics API](analytics-api.md) |

### How do I send analytics from a headless store?

If your headless store loads a JS SDK in the browser, the SDK already sends search, suggestion and collection events. Send product views, add to cart, checkout and orders with `HIJ.Analytics.track()` ([SDK manual analytics](sdk-manual.md)), or with the [GTM template](https://hij.gitbook.io/hij-docs/gtm) if you already push ecommerce events to a data layer. If your headless store calls the Storefront API without an SDK, send every event with the [Analytics API](analytics-api.md), from the browser or your server.

## Methods

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
      <td><strong>Shopify Pixel</strong></td>
      <td>Liquid stores. Installed by the app; sends store events automatically.</td>
      <td><a href="shopify-pixel.md">shopify-pixel.md</a></td>
    </tr>
    <tr>
      <td><i class="fa-paper-plane"></i></td>
      <td><strong>Analytics API</strong></td>
      <td><code>POST /v2/events</code> from a browser, app or server. Works on every path.</td>
      <td><a href="analytics-api.md">analytics-api.md</a></td>
    </tr>
    <tr>
      <td><i class="fa-js"></i></td>
      <td><strong>SDK manual analytics</strong></td>
      <td><code>HIJ.Analytics.track()</code> for store events on SDK storefronts.</td>
      <td><a href="sdk-manual.md">sdk-manual.md</a></td>
    </tr>
    <tr>
      <td><i class="fa-tags"></i></td>
      <td><strong>GTM template</strong></td>
      <td>Map data layer ecommerce events to HIJ events in Google Tag Manager.</td>
      <td><a href="https://hij.gitbook.io/hij-docs/gtm">gtm</a></td>
    </tr>
  </tbody>
</table>

## Avoid duplicate events

Send each event from one place only. Duplicates inflate conversion rates and skew ranking.

| Combination | Rule |
| --- | --- |
| Shopify Pixel + SDK on a Liquid store | Don't call `HIJ.Analytics.track()` for product views, add to cart or checkout. The Collections connector detects the Pixel and skips its own `collection_viewed`. |
| Shopify Pixel + GTM template | Don't add GTM triggers for `view_item`, `view_item_list`, `add_to_cart` or `purchase`. |
| SDK manual analytics + GTM template | Pick one per event. Use `track: false` in the SDK if GTM sends everything. |
| Analytics API from the server + the browser | Send `order_completed` from your order webhook only, not also from the thank-you page. |

## Consent

Every method respects the shopper's analytics consent:

| Method | Consent source |
| --- | --- |
| Shopify Pixel | Shopify's Customer Privacy API (your cookie banner) |
| JS SDKs | `analyticsConsentProvided()` in the [full stack](https://hij.gitbook.io/hij-docs/full-stack#analytics-and-consent) or [headless](https://hij.gitbook.io/hij-docs/headless#analytics-and-consent) configuration |
| GTM template | The `consentMode` field |
| Analytics API | You. Send events, visitor IDs and session IDs only after consent. |
