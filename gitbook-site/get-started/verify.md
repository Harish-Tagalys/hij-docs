---
description: "A checklist to confirm search, collections, analytics, consent and failover work before you launch HIJ Search on your store."
---

# Verify your integration

**Applies to:** section `Get started` (flow step 1 of 8) · product `get-started` · version `none` · status `current` · store types `liquid`, `hydrogen`, `custom-frontend`, `server-side` · requires `analytics`

Run through this checklist on a staging store or preview theme before you launch, and again after any theme or front-end release.

## Catalog

- [ ] **Home** in the HIJ Search app shows the first sync as complete, with a product count that matches Shopify.
- [ ] A product you edit in Shopify shows the change in search within about a minute.

## Requests

- [ ] Search for a product you know exists. The request to `/v2/search` returns `200` and the product.
- [ ] Open a collection. The request to `/v2/collections/{id}` returns `200` with the collection's merchandising (pinned products first).
- [ ] Requests send your shop ID and storefront token. A `401` means one of them is wrong; see [credentials](credentials.md).
- [ ] Multi-market stores: switch market and check that prices and availability change. See the [multi-market recipe](https://hij.gitbook.io/hij-docs/recipes/multi-market).

## Analytics

Open **Analytics → Live events** in the app, then browse the store in another window.

| Do this | Expect this event | Sent by |
| --- | --- | --- |
| Search for a query | `search_performed` | SDK, or your code on the Storefront API path |
| Click a product in the results | `product_clicked` | SDK, or your code |
| Open a product page | `product_viewed` | Shopify Pixel (Liquid), or your code |
| Open a collection | `collection_viewed` | Shopify Pixel (Liquid) or the SDK |
| Add to cart | `product_added_to_cart` | Shopify Pixel (Liquid), or your code |
| Place an order with a 100% discount code | `order_completed` | Shopify Pixel (Liquid), or your code |

- [ ] Every event arrives once. Duplicates usually mean two methods send the same event; see the [analytics overview](https://hij.gitbook.io/hij-docs/analytics#avoid-duplicate-events).
- [ ] Before you accept analytics cookies, no events arrive and no `hij_vid` or `hij_sid` cookies are set.

## Failover

- [ ] Block `api.hij-search.example` in your browser's developer tools and reload a search page. The fallback renders from your catalog feed. See [full stack failover](https://hij.gitbook.io/hij-docs/full-stack/widgets/failover) or [headless failover](https://hij.gitbook.io/hij-docs/headless/connectors/failover).

## Ready to launch

When every box is ticked, publish the theme or deploy the front end. Then consider [A/B testing](https://hij.gitbook.io/hij-docs/ab-testing) your collection merchandising.
