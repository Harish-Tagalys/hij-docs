---
description: "Legacy: set up the HIJ UI widgets SDK 2.x. New integrations should use full stack 3.x."
---

# Full stack quick start (2.x, legacy)

{% hint style="warning" %}
**Legacy documentation: Full stack 2.x.** This version is frozen and receives security and critical fixes only. New integrations should use the [current Full stack 3.x documentation](https://hij.gitbook.io/hij-docs/full-stack). [View the 3.x version of this page](https://hij.gitbook.io/hij-docs/full-stack).
{% endhint %}

## Include the SDK

Full stack 2.x uses the `HIJWidgets` namespace. The latest 2.x release is **2.1.8**.

```html
<script src="https://cdn.hij-search.example/hij-ui-widgets-2.1.8.min.js"></script>
```

The 2.x script must load without `defer`, before any code that calls `HIJWidgets`.

## Configure

```javascript
HIJWidgets.configure({
  apiServer: "https://api.hij-search.example",
  apiVersion: "v1",
  storeId: "<YOUR-STORE-ID>",
  publicKey: "<YOUR-STOREFRONT-KEY>",
  currency: { symbol: "$", position: "before" },
  track: true,
});
```

| Option | Type | Description |
| --- | --- | --- |
| `apiServer` | string | API server. |
| `apiVersion` | string | Always `v1` in 2.x. |
| `storeId` | string | Your store ID. |
| `publicKey` | string | Public storefront key. |
| `currency.symbol` | string | Currency symbol. |
| `currency.position` | string | `before` or `after` the amount. |
| `track` | boolean | Send analytics events. Defaults to `false`. |

## Render a widget

```javascript
HIJWidgets.SearchResults.render("#results", { query: "linen shirt", perPage: 20 });
```

See the [2.x search results widget](search-results.md) for every option.

{% hint style="info" %}
Full stack 2.x has no consent hook. Analytics run whenever `track: true` is set. Upgrading to 3.x adds `analyticsConsentProvided`.
{% endhint %}

## Upgrading to 3.x

| 2.x | 3.x |
| --- | --- |
| `HIJWidgets.configure({ ... })` | `HIJ.setConfiguration({ ... })` and `HIJ.setPlatformConfiguration({ ... })` |
| `HIJWidgets.SearchResults.render(selector, options)` | `HIJ.UIWidgets.SearchResults.init(selector, configurationOptions)` |
| `perPage` | `params.limit` |
| `track: true` | `track: true` plus `analyticsConsentProvided` |

---

Legacy reference: `HIJ-FS-LEGACY-F2`
