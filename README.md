---
description: "Developer documentation for HIJ Search: UI widgets, the headless Connector SDK and the v2 REST API."
---

# HIJ Search developer docs

HIJ Search adds product search, search suggestions and merchandised collections to an online store. There are three ways to integrate it.

| Path | Namespace | Best for | Start here |
| --- | --- | --- | --- |
| Full stack (UI widgets) | `HIJ.UIWidgets.*` | Themes that want ready-made, templatable widgets | [Quick start](ui-widgets/quick-start.md) |
| Headless (Connector) | `HIJ.Connector.*` | Custom front ends that render their own UI | [Collections connector](connector/collections.md) |
| REST API | `GET https://api.hij-search.example/v2/...` | Server-side rendering and native apps | [API overview](api/overview.md) |

Current releases: UI widgets **3.0.20**, Connector **3.0.21**.

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
      <td><i class="fa-rocket"></i></td>
      <td><strong>UI widgets quick start</strong></td>
      <td>Load the SDK, configure it and render your first widget.</td>
      <td><a href="ui-widgets/quick-start.md">quick-start.md</a></td>
    </tr>
    <tr>
      <td><i class="fa-list"></i></td>
      <td><strong>Search results widget</strong></td>
      <td>Full template, option and callback reference.</td>
      <td><a href="ui-widgets/search-results.md">search-results.md</a></td>
    </tr>
    <tr>
      <td><i class="fa-keyboard"></i></td>
      <td><strong>Search suggestions widget</strong></td>
      <td>Suggestions attached to the store's query input field.</td>
      <td><a href="ui-widgets/search-suggestions.md">search-suggestions.md</a></td>
    </tr>
    <tr>
      <td><i class="fa-layer-group"></i></td>
      <td><strong>Collections connector</strong></td>
      <td>Headless product listing pages with filters, sort and pagination.</td>
      <td><a href="connector/collections.md">collections.md</a></td>
    </tr>
    <tr>
      <td><i class="fa-flask"></i></td>
      <td><strong>A/B testing with Liquid</strong></td>
      <td>Split traffic between collection variants in a Liquid theme.</td>
      <td><a href="ab-testing/setup-liquid.md">setup-liquid.md</a></td>
    </tr>
    <tr>
      <td><i class="fa-clock-rotate-left"></i></td>
      <td><strong>Connector changelog</strong></td>
      <td>Every connector release from 3.0.15 onwards.</td>
      <td><a href="changelog/connector.md">connector.md</a></td>
    </tr>
  </tbody>
</table>

Still running SDK 2.x? The frozen [2.x documentation](https://app.gitbook.com/s/XSPACE_V2/) is kept for existing stores. New integrations should use 3.x.
