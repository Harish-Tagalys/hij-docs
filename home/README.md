---
description: "Developer documentation for HIJ Search: full stack UI widgets, the headless Connector SDK, the Storefront API, A/B testing and the Google Tag Manager template."
---

# HIJ Search developer docs

HIJ Search adds product search, search suggestions and merchandised collections to an online store. Pick the product that matches how your store is built. Each product is versioned on its own, so the version menu inside a product only changes that product's pages.

| Product | Namespace or interface | Best for | Current version |
| --- | --- | --- | --- |
| [Full stack](https://hij.gitbook.io/hij-docs/full-stack) | `HIJ.UIWidgets.*` | Themes that want ready-made, templatable widgets | 3.0.20 |
| [Headless](https://hij.gitbook.io/hij-docs/headless) | `HIJ.Connector.*` | Custom front ends that render their own UI | 3.0.21 |
| [Storefront API](https://hij.gitbook.io/hij-docs/storefront-api) | `GET https://api.hij-search.example/v2/...` | Server-side rendering and native apps | v2 |
| [A/B testing](https://hij.gitbook.io/hij-docs/ab-testing) | Liquid snippet and library | Testing collection merchandising in a Liquid theme | |
| [Google Tag Manager](https://hij.gitbook.io/hij-docs/gtm) | GTM tag template | Sending analytics events from your data layer | |

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
      <td><strong>Full stack</strong></td>
      <td>Load the UI widgets SDK and render search results, suggestions and collections.</td>
      <td><a href="https://hij.gitbook.io/hij-docs/full-stack">full-stack</a></td>
    </tr>
    <tr>
      <td><i class="fa-plug"></i></td>
      <td><strong>Headless</strong></td>
      <td>Fetch search and collection data with the Connector and render your own UI.</td>
      <td><a href="https://hij.gitbook.io/hij-docs/headless">headless</a></td>
    </tr>
    <tr>
      <td><i class="fa-code"></i></td>
      <td><strong>Storefront API</strong></td>
      <td>Call the v2 REST API directly from a server or app.</td>
      <td><a href="https://hij.gitbook.io/hij-docs/storefront-api">storefront-api</a></td>
    </tr>
    <tr>
      <td><i class="fa-flask"></i></td>
      <td><strong>A/B testing</strong></td>
      <td>Split traffic between collection variants in a Liquid theme.</td>
      <td><a href="https://hij.gitbook.io/hij-docs/ab-testing">ab-testing</a></td>
    </tr>
    <tr>
      <td><i class="fa-tags"></i></td>
      <td><strong>Google Tag Manager</strong></td>
      <td>Send HIJ analytics events with the GTM tag template.</td>
      <td><a href="https://hij.gitbook.io/hij-docs/gtm">gtm</a></td>
    </tr>
  </tbody>
</table>

Still running an older release? Full stack 2.x, headless 2.x and earlier GTM template releases stay documented for existing stores. Open the product, then pick the release in its version menu.
