---
description: "Install the HIJ Search app on your Shopify store, approve its access scopes and wait for the first catalog sync before you integrate."
---

# Install the HIJ Search app

**Applies to:** product `get-started` · version `none` · store types `liquid`, `hydrogen`, `custom-frontend`, `server-side` · requires none

Every HIJ integration starts with the HIJ Search app. The app reads your catalog, keeps it in sync, creates your shop ID and storefront token, and installs the [Shopify Pixel](https://hij.gitbook.io/hij-docs/analytics/shopify-pixel) on Liquid stores.

## Before you start

- You need the **Apps and channels** permission in Shopify admin, or be the store owner.
- Install on a development or staging store first if you have one. Each store gets its own shop ID.
- Hydrogen and other headless storefronts install the app on the Shopify store that holds the catalog, not on the front end.

## Install

{% stepper %}
{% step %}
### Add the app

Open the Shopify App Store, search for **HIJ Search** and select **Add app**.
{% endstep %}
{% step %}
### Approve access

Review the requested scopes and select **Install**. HIJ asks for:

| Scope | Why |
| --- | --- |
| `read_products`, `read_inventory` | Index products, variants and stock for search and collections. |
| `read_product_listings`, `read_markets` | Know which products are published in which market. |
| `write_pixels`, `read_customer_events` | Install and run the Shopify Pixel on Liquid stores. |
| `read_themes` | Detect whether the store runs a Liquid theme. |
| `write_metafields` | Store A/B test settings on collections. See [A/B testing](https://hij.gitbook.io/hij-docs/ab-testing). |
{% endstep %}
{% step %}
### Pick your markets and locales

In the setup screen, select the markets and locales HIJ should index. You can change them later under **Settings → Markets**.
{% endstep %}
{% step %}
### Wait for the first catalog sync

The first sync runs right after install. Most stores finish in under 15 minutes; very large catalogs can take an hour. **Home** in the app shows progress. After that, product changes reach HIJ within about a minute.
{% endstep %}
{% endstepper %}

{% hint style="warning" %}
Don't start integrating before the first sync finishes. Search and collection requests return empty results until the catalog is indexed.
{% endhint %}

## What the app sets up for you

| Item | Liquid theme | Hydrogen or custom front end |
| --- | --- | --- |
| Catalog sync | Yes | Yes |
| Shop ID and storefront token | Yes | Yes |
| Shopify Pixel for store events | Yes, turned on automatically | No. See [analytics](https://hij.gitbook.io/hij-docs/analytics). |
| Theme changes | None. You add the SDK script yourself. | None |

## Next step

Copy your [shop ID and storefront token](credentials.md), then [choose your path](choose-your-path.md).
