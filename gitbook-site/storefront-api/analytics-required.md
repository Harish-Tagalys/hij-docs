---
description: "The Storefront API doesn't send analytics events. Liquid stores get store events from the Shopify Pixel; every other store sends events with the Analytics API."
---

# Analytics is required

**Applies to:** product `storefront-api` · version `v2` · store types `server-side`, `hydrogen`, `custom-frontend`, `liquid` · requires `credentials`, `analytics`

The Storefront API returns data and nothing else. It doesn't know what the shopper did with the results, so it can't send analytics events. Without events, ranking and personalisation stop learning and the dashboard reports stay empty.

| Your store | Store events (product view, collection view, add to cart, checkout) | Search and click events |
| --- | --- | --- |
| Liquid theme | [Shopify Pixel](https://hij.gitbook.io/hij-docs/analytics/shopify-pixel), automatic | [Analytics API](https://hij.gitbook.io/hij-docs/analytics/analytics-api) |
| Anything else | [Analytics API](https://hij.gitbook.io/hij-docs/analytics/analytics-api) | [Analytics API](https://hij.gitbook.io/hij-docs/analytics/analytics-api) |

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
      <td>Every event, who sends it and how.</td>
      <td><a href="https://hij.gitbook.io/hij-docs/analytics">analytics</a></td>
    </tr>
    <tr>
      <td><i class="fa-paper-plane"></i></td>
      <td><strong>Analytics API</strong></td>
      <td>Send events with <code>POST /v2/events</code>.</td>
      <td><a href="https://hij.gitbook.io/hij-docs/analytics/analytics-api">analytics-api</a></td>
    </tr>
  </tbody>
</table>
