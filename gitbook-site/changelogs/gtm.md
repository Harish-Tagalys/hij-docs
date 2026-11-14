---
description: "Every release of the HIJ Search Analytics tag template for Google Tag Manager, newest first."
---

# GTM template releases

**Applies to:** product `analytics` · version `all` · store types `liquid`, `hydrogen`, `custom-frontend` · requires none

Template releases are named by date. The Community Template Gallery always installs the current release. Each release has its own setup page in the GTM template version menu.

## r20260217

*Feb 17, 2026*

**Features:**

- Added the `consentMode` field (`required`, `cookieless`, `off`) for Google consent mode.

**Changes:**

- The storefront credential field is now called `storefrontToken`.

[Set up r20260217](https://hij.gitbook.io/hij-docs/gtm)

## r20250801

*Aug 1, 2025*

**Breaking changes:**

- Sends the analytics API v2 event set (`product_viewed`, `search_performed`, ...) to `/v2/events`.
- The `hijShopId` variable is renamed to `hijStoreId`.

**Features:**

- Added `select_item` → `product_clicked` and `view_item_list` → `collection_viewed` mappings.
- Added the optional `marketCode` field.

[Set up r20250801](https://hij.gitbook.io/hij-docs/gtm/r20250801)

## r20240718

*Jul 18, 2024*

**Features:**

- First release. Sends v1 events (`view_product`, `add_to_cart`, `search`, `purchase`) to `/v1/track`.

[Set up r20240718](https://hij.gitbook.io/hij-docs/gtm/r20240718)
