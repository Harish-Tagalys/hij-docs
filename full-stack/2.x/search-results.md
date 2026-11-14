---
description: "Legacy: the full stack 2.x search results widget. New integrations should use full stack 3.x."
---

# Search results widget (2.x, legacy)

{% hint style="warning" %}
**Legacy documentation: Full stack 2.x.** This version is frozen and receives security and critical fixes only. New integrations should use the [current Full stack 3.x documentation](https://hij.gitbook.io/hij-docs/full-stack). [View the 3.x version of this page](https://hij.gitbook.io/hij-docs/full-stack/search-results).
{% endhint %}

## Render

```javascript
HIJWidgets.SearchResults.render(selector, {
  query: "linen shirt",
  perPage: 20,
  templates: {},
  onLoad: function (data) {},
});
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `query` | string | | The shopper's query. Required. |
| `perPage` | number | `20` | Products per page. Maximum `60`. |
| `page` | number | `1` | Page to load first. |
| `sort` | string | dashboard default | Sort option ID. |
| `templates` | object | {} | String template overrides. See below. |
| `onLoad` | function | | Called with the raw response after every load. |
| `onError` | function | | Called when the request fails. |

## Templates

Full stack 2.x templates are functions that return HTML strings, not tagged templates.

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

Full stack 2.x can't show recommendation strips on the empty state. That's available in 3.x only.

</details>

## Migrating to 3.x

| 2.x option | 3.x replacement |
| --- | --- |
| `HIJWidgets.SearchResults.render(selector, options)` | `HIJ.UIWidgets.SearchResults.init(selector, configurationOptions)` |
| `query` | `params.query` |
| `perPage` | `params.limit` |
| `onLoad` | `callbacks.onSuccess` |
| `onError` | `callbacks.onFailure` |
| string templates | tagged-template `render` functions |

---

Legacy reference: `HIJ-FS-LEGACY-F2`
