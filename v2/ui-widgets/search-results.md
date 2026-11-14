---
description: "Legacy: the SDK 2.x search results widget. New integrations should use SDK 3.x."
---

# Search results widget (SDK 2.x, legacy)

{% hint style="warning" %}
**Legacy documentation: SDK 2.x.** This version is frozen and receives security and critical fixes only. New integrations should use [SDK 3.x](https://app.gitbook.com/s/XSPACE_V3/ui-widgets/search-results). [View the 3.x version of this page](https://app.gitbook.com/s/XSPACE_V3/ui-widgets/search-results).
{% endhint %}

## Render

```javascript
HIJSearch.Widgets.SearchResults.render(selector, {
  query: "linen shirt",
  perPage: 20,
  templates: {},
  onLoad: function (data) {},
});
```

## Templates

SDK 2.x templates return HTML strings, not tagged templates.

<details>
<summary>filterCheckBoxes</summary>

```javascript
templates: {
  filterCheckBoxes: function (filter) {
    return "<ul>" + filter.items.map(function (item) {
      return '<li><label><input type="checkbox" data-filter="' + filter.id + '" value="' + item.id + '"' +
        (item.selected ? " checked" : "") + "> " + item.name + " (" + item.count + ")</label></li>";
    }).join("") + "</ul>";
  },
}
```

</details>

<details>
<summary>product</summary>

```javascript
templates: {
  product: function (product) {
    return '<a href="' + product.link + '"><img src="' + product.image_url + '"><span>' + product.name + "</span></a>";
  },
}
```

</details>

<details>
<summary>noResults</summary>

SDK 2.x can't show recommendation strips on the empty state. That's available in 3.x only.

</details>

| 2.x option | 3.x replacement |
| --- | --- |
| `render(selector, options)` | `init(selector, configurationOptions)` |
| `query` | `params.query` |
| `onLoad` | `callbacks.onSuccess` |
| string templates | tagged-template `render` functions |

Legacy reference: `HIJ-LEGACY-CANARY-7Q`
