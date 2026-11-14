---
description: "Choose between the full stack UI widgets SDK and the headless Connector SDK. Both run in the browser, are versioned separately and send search and widget analytics for you."
---

# JS SDKs overview

**Applies to:** product `sdks` · version `3.x` · store types `liquid`, `hydrogen`, `custom-frontend` · requires `credentials`

HIJ has two JavaScript SDKs. Both load from the HIJ CDN, read the same [credentials](https://hij.gitbook.io/hij-docs/get-started/credentials) and call the [Storefront API](https://hij.gitbook.io/hij-docs/storefront-api) for you.

| | Full stack | Headless |
| --- | --- | --- |
| SDK | UI widgets, `HIJ.UIWidgets.*` | Connector, `HIJ.Connector.*` |
| Current release | 3.0.20 | 3.0.21 |
| Script | `hij-ui-widgets-3.0.20.min.js` | `hij-connector-3.0.21.min.js` |
| Renders UI | Yes. Templatable widgets for search results, suggestions and collections. | No. Returns data and state helpers; your code renders. |
| Best for | Liquid themes and stores that want ready-made widgets | Hydrogen, Remix and other front ends with their own components |
| Keeps request state | Yes, and writes it to the URL | Yes, through helpers |
| Analytics sent for you | Search, suggestions, product clicks, recommendation strips | Search, suggestions, collection views. Product clicks with `helpers.trackProductClick()`. |
| Legacy release | 2.x (`HIJWidgets.*`, 2.1.8) | 2.x (`HIJConnector.*`, 2.4.3) |

Each SDK has its own version menu. Changing the full stack version doesn't change the headless pages, and the reverse.

{% hint style="warning" %}
**Browser only.** The SDKs need `window`, `document` and cookies. They don't run in Node.js, Oxygen workers or other server runtimes. To render HIJ results on a server, call the [Storefront API](https://hij.gitbook.io/hij-docs/storefront-api). A [server-side SDK](server-side.md) is planned.
{% endhint %}

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
      <td><i class="fa-table-cells"></i></td>
      <td><strong>Full stack quick start</strong></td>
      <td>Load the UI widgets and render your first widget.</td>
      <td><a href="https://hij.gitbook.io/hij-docs/full-stack">full-stack</a></td>
    </tr>
    <tr>
      <td><i class="fa-plug"></i></td>
      <td><strong>Headless quick start</strong></td>
      <td>Load the Connector and fetch your first data.</td>
      <td><a href="https://hij.gitbook.io/hij-docs/headless">headless</a></td>
    </tr>
  </tbody>
</table>

## Analytics on the SDK path

The SDKs send the events they know about: searches, suggestions, collection views and clicks inside their widgets. They can't see your product pages, cart or checkout. Those **store events** come from somewhere else:

| Store | Store events from |
| --- | --- |
| Liquid theme | The [Shopify Pixel](https://hij.gitbook.io/hij-docs/analytics/shopify-pixel), automatically |
| Hydrogen or another custom front end | Your code, with [SDK manual analytics](https://hij.gitbook.io/hij-docs/analytics/sdk-manual) or the [GTM template](https://hij.gitbook.io/hij-docs/gtm) |

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
      <td><i class="fa-chart-line"></i></td>
      <td><strong>Analytics overview</strong></td>
      <td>Every event, who sends it, and how to avoid sending one twice.</td>
      <td><a href="https://hij.gitbook.io/hij-docs/analytics">analytics</a></td>
    </tr>
  </tbody>
</table>
