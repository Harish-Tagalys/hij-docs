---
description: "The HIJ JS SDKs run in the browser only. A server-side SDK for Node.js and edge runtimes is planned; until then, call the Storefront API from your server."
---

# Server-side SDK (planned)

**Applies to:** section `JS SDKs` (flow step 3 of 8) · product `sdks` · version `none` · status `current` · store types `server-side`, `hydrogen` · requires `storefront-api`

{% hint style="info" %}
**Planned.** A server-side SDK for Node.js and edge runtimes such as Oxygen is planned. It isn't available yet. To be told when early access opens, contact HIJ support from **Help** in the HIJ Search app and mention "server-side SDK".
{% endhint %}

The full stack and headless SDKs need a browser: they read and write cookies, watch the URL and attach to DOM elements. Loading them in a server runtime throws `ReferenceError: window is not defined`.

## What to do today

| You want to | Use |
| --- | --- |
| Render search or collection results in server-rendered HTML | The [Storefront API](https://hij.gitbook.io/hij-docs/storefront-api) from your loader or route handler |
| Keep results personalised on the server | Pass the shopper's IDs with the [server headers](https://hij.gitbook.io/hij-docs/storefront-api/authentication#calls-from-a-server) |
| Add interactive filters, sort and suggestions after the page loads | The [headless SDK](https://hij.gitbook.io/hij-docs/headless) in the browser, hydrated from the server response |
| Send analytics from the server | The [Analytics API](https://hij.gitbook.io/hij-docs/analytics/analytics-api) |

{% hint style="success" %}
In Hydrogen, render the first page of a collection with the Storefront API in the route `loader`, then let the headless SDK take over in the browser for filter and page changes. Pass the server response to `HIJ.Connector.Collection.init()` as `initialResponse` so it doesn't fetch the first page twice.
{% endhint %}
