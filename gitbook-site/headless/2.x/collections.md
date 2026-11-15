---
description: "Legacy: fetch a merchandised collection with the HIJ Connector 2.x. New integrations should use headless 3.x."
---

# Collections connector (2.x, legacy)

{% hint style="warning" %}
**Legacy documentation: Headless 2.x.** This version is frozen and receives security and critical fixes only. New integrations should use the [current Headless 3.x documentation](https://hij.gitbook.io/hij-docs/headless). [View the 3.x version of this page](https://hij.gitbook.io/hij-docs/headless/connectors/collections).
{% endhint %}

**Applies to:** section `JS SDKs` (flow step 3 of 8) · product `headless` · version `Headless 2.x` · status `legacy` (current: [Headless 3.x](https://hij.gitbook.io/hij-docs/headless/connectors/collections)) · store types `hydrogen`, `custom-frontend` · requires `headless`

## Fetch a collection

```javascript
HIJConnector.Collection.fetch({
  collectionId: "<COLLECTION-ID>",
  perPage: 24,
  page: 1,
  sort: "featured",
  filters: { colour: ["blue"] },
})
  .then(function (response) {
    renderProductListingPage(response);
  })
  .catch(function (error) {
    renderFallbackMessage(error);
  });
```

## Parameters

| Param | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `collectionId` | string | Yes | | ID of the collection. |
| `perPage` | number | No | `24` | Products per page. Maximum `60`. |
| `page` | number | No | `1` | Page number, starting at 1. |
| `sort` | string | No | collection default | Sort option ID. |
| `filters` | object | No | {} | Applied filters keyed by filter ID. Range filters take `"min-max"` strings, for example `{ price: "20-80" }`. |

## Response

The 2.x response uses the v1 field names: `name` instead of `title`, `image_url` instead of `image.src`, and `sort_choices` instead of `sort_options`.

```json
{
  "collection": { "id": "summer-linen", "name": "Summer linen" },
  "total": 132,
  "page": 1,
  "sort_choices": [{ "id": "featured", "name": "Featured", "selected": true }],
  "filters": [{ "id": "colour", "name": "Colour", "items": [{ "id": "blue", "name": "Blue", "count": 41, "selected": true }] }],
  "products": [{ "id": "1001", "name": "Relaxed linen shirt", "link": "/products/relaxed-linen-shirt", "price": 59.0, "image_url": "https://cdn.hij-search.example/demo/1001.jpg" }]
}
```

## Keeping state

2.x has no helpers. To apply a filter, change the sort option or go to another page, build new parameters and call `fetch` again. Keep the parameters in the URL yourself if shoppers should be able to share or restore the page.

```javascript
function applyFilter(params, filterId, itemId) {
  var next = Object.assign({}, params, { page: 1 });
  next.filters = Object.assign({}, params.filters);
  next.filters[filterId] = (next.filters[filterId] || []).concat(itemId);
  return HIJConnector.Collection.fetch(next).then(renderProductListingPage);
}
```

| 2.x | 3.x replacement |
| --- | --- |
| `HIJConnector.Collection.fetch(params)` | `HIJ.Connector.Collection.init({ params, onSuccess })` |
| `.then(response)` | `onSuccess(response, helpers)` |
| `.catch(error)` | `onFailure(error, helpers)` |
| Re-fetch with new params | `helpers.applyFilter()`, `helpers.applySortOption()`, `helpers.goToPage()` |
| `sort_choices` | `sort_options` / `helpers.getSortOptions()` |

---

Legacy reference: `HIJ-HL-LEGACY-H2`
