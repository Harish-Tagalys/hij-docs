---
title: "Search results widget (SDK 2.x, legacy)"
seo:
  title: "Search results widget (SDK 2.x, legacy)"
  description: "Legacy: the SDK 2.x search results widget. New integrations should use SDK 3.x."
---

# Search results widget (SDK 2.x, legacy)

{% admonition type="warning" %}
**Legacy documentation: SDK 2.x.** This version is frozen and receives security and critical fixes only. New integrations should use [SDK 3.x](/ui-widgets/search-results). [View the 3.x version of this page](/ui-widgets/search-results).
{% /admonition %}

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

{% accordion title="filterCheckBoxes" %}

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

{% /accordion %}

{% accordion title="product" %}

```javascript
templates: {
  product: function (product) {
    return '<a href="' + product.link + '"><img src="' + product.image_url + '"><span>' + product.name + "</span></a>";
  },
}
```

{% /accordion %}

{% accordion title="noResults" %}

SDK 2.x can't show recommendation strips on the empty state. That's available in 3.x only.

{% /accordion %}

| 2.x option | 3.x replacement |
| --- | --- |
| `render(selector, options)` | `init(selector, configurationOptions)` |
| `query` | `params.query` |
| `onLoad` | `callbacks.onSuccess` |
| string templates | tagged-template `render` functions |

Legacy reference: `HIJ-LEGACY-CANARY-7Q`
