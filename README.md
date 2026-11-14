---
description: "Legacy: set up the HIJ widgets SDK 2.x. New integrations should use SDK 3.x."
---

# Quick start (SDK 2.x, legacy)

{% hint style="warning" %}
**Legacy documentation: SDK 2.x.** This version is frozen and receives security and critical fixes only. New integrations should use [SDK 3.x](https://app.gitbook.com/s/XSPACE_V3/ui-widgets/quick-start). [View the 3.x version of this page](https://app.gitbook.com/s/XSPACE_V3/ui-widgets/quick-start).
{% endhint %}

## Include the SDK

SDK 2.x is served from the legacy CDN path and uses the `HIJSearch.Widgets` namespace.

```html
<script src="https://cdn.hij-search.example/legacy/hij-widgets-2.1.8.min.js"></script>
```

## Configure

```javascript
HIJSearch.configure({
  apiServer: "https://api.hij-search.example",
  apiVersion: "v1",
  storeId: "<YOUR-STORE-ID>",
  publicKey: "<YOUR-STOREFRONT-KEY>",
  currency: { symbol: "$", position: "before" },
});
```

| Option | Type | Description |
| --- | --- | --- |
| `apiServer` | string | API server. |
| `apiVersion` | string | Always `v1` in SDK 2.x. The v1 API is not documented separately. |
| `storeId` | string | Your store ID. |
| `publicKey` | string | Public storefront key. |
| `currency.symbol` | string | Currency symbol. |
| `currency.position` | string | `before` or `after` the amount. |

## Render a widget

```javascript
HIJSearch.Widgets.SearchResults.render("#results", { query: "linen shirt" });
```

{% hint style="info" %}
SDK 2.x has no consent hook. Analytics run whenever `track: true` is set. Upgrading to 3.x adds `analyticsConsentProvided`.
{% endhint %}

Legacy reference: `HIJ-LEGACY-CANARY-7Q`
