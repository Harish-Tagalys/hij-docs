---
description: "Decide between the Storefront API, the full stack UI widgets SDK and the headless Connector SDK, and which analytics method your store needs."
---

# Choose your integration path

**Applies to:** section `Get started` (flow step 1 of 8) · product `get-started` · version `none` · status `current` · store types `liquid`, `hydrogen`, `custom-frontend`, `server-side` · requires none

HIJ offers two integration paths. Both use the same catalog, merchandising and analytics.

| | Storefront API | JS SDKs |
| --- | --- | --- |
| What it is | REST API, `GET https://api.hij-search.example/v2/...` | Browser scripts: full stack (`HIJ.UIWidgets.*`) or headless (`HIJ.Connector.*`) |
| Runs | Anywhere: server, app, edge function | In the browser only |
| Renders UI | No | Full stack: yes, templatable widgets. Headless: no, you render. |
| Keeps request state (filters, sort, page) | No, you build each request | Yes |
| Sends analytics | No. You send every event. | Search, suggestion, collection and widget events |
| Versions | v2 | Full stack 3.x and 2.x, headless 3.x and 2.x |

## Decision table

| Your store | Path | Store-event analytics |
| --- | --- | --- |
| Liquid theme, ready-made UI | [Full stack](https://hij.gitbook.io/hij-docs/full-stack) | [Shopify Pixel](https://hij.gitbook.io/hij-docs/analytics/shopify-pixel) (automatic) |
| Liquid theme, your own UI | [Headless](https://hij.gitbook.io/hij-docs/headless) | [Shopify Pixel](https://hij.gitbook.io/hij-docs/analytics/shopify-pixel) (automatic) |
| Hydrogen/Oxygen, results rendered in the browser | [Headless](https://hij.gitbook.io/hij-docs/headless) | [SDK manual analytics](https://hij.gitbook.io/hij-docs/analytics/sdk-manual) |
| Hydrogen/Oxygen, results in server-rendered HTML | [Storefront API](https://hij.gitbook.io/hij-docs/storefront-api) | [Analytics API](https://hij.gitbook.io/hij-docs/analytics/analytics-api) |
| Other custom front end (Remix, Next.js, Vue) | [Headless](https://hij.gitbook.io/hij-docs/headless), or [full stack](https://hij.gitbook.io/hij-docs/full-stack) for ready-made widgets | [SDK manual analytics](https://hij.gitbook.io/hij-docs/analytics/sdk-manual) or the [GTM template](https://hij.gitbook.io/hij-docs/gtm) |
| Native app or backend job | [Storefront API](https://hij.gitbook.io/hij-docs/storefront-api) | [Analytics API](https://hij.gitbook.io/hij-docs/analytics/analytics-api) |

{% hint style="success" %}
You can mix paths. A Hydrogen store can render collection pages on the server with the Storefront API and use the headless SDK for search suggestions in the browser. Send each event once, from the place that knows about it.
{% endhint %}

## Why analytics matter on every path

HIJ ranks results with shopper behaviour: views, clicks, add to cart and orders. Without these events, results fall back to catalog order and the dashboard reports stay empty. The [analytics overview](https://hij.gitbook.io/hij-docs/analytics) shows which events each path sends for you and which ones you send yourself.

## Server-side SDK

The JS SDKs don't run in Node.js or other server runtimes. A server-side SDK is planned. See [server-side SDK](https://hij.gitbook.io/hij-docs/sdks/server-side).
