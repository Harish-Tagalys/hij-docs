---
title: "HIJ Search developer docs"
seo:
  title: "HIJ Search developer docs"
  description: "Developer documentation for HIJ Search: UI widgets, the headless Connector SDK and the v2 REST API."
---

# HIJ Search developer docs

HIJ Search adds product search, search suggestions and merchandised collections to an online store. There are three ways to integrate it.

| Path | Namespace | Best for | Start here |
| --- | --- | --- | --- |
| Full stack (UI widgets) | `HIJ.UIWidgets.*` | Themes that want ready-made, templatable widgets | [Quick start](/ui-widgets/quick-start) |
| Headless (Connector) | `HIJ.Connector.*` | Custom front ends that render their own UI | [Collections connector](/connector/collections) |
| REST API | `GET https://api.hij-search.example/v2/...` | Server-side rendering and native apps | [API overview](/api/overview) |

Current releases: UI widgets **{% $env.PUBLIC_UI_WIDGETS_VERSION %}**, Connector **{% $env.PUBLIC_CONNECTOR_VERSION %}**.

{% cards columns=2 %}
  {% card title="UI widgets quick start" to="/ui-widgets/quick-start" icon="rocket" %}
    Load the SDK, configure it and render your first widget.
  {% /card %}
  {% card title="Search results widget" to="/ui-widgets/search-results" icon="list" %}
    Full template, option and callback reference.
  {% /card %}
  {% card title="Search suggestions widget" to="/ui-widgets/search-suggestions" icon="keyboard" %}
    Suggestions attached to the store's query input field.
  {% /card %}
  {% card title="Collections connector" to="/connector/collections" icon="layer-group" %}
    Headless product listing pages with filters, sort and pagination.
  {% /card %}
  {% card title="A/B testing with Liquid" to="/ab-testing/setup-liquid" icon="flask" %}
    Split traffic between collection variants in a Liquid theme.
  {% /card %}
  {% card title="Connector changelog" to="/changelog/connector" icon="clock-rotate-left" %}
    Every connector release from 3.0.15 onwards.
  {% /card %}
{% /cards %}

Still running SDK 2.x? The frozen [2.x documentation](/ui-widgets/2.x/quick-start) is kept for existing stores. New integrations should use 3.x.
