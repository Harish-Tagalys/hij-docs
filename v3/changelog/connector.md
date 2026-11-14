---
description: "Release notes for every HIJ Connector SDK release, newest first."
---

# Connector changelog

Release notes for the headless Connector SDK (`HIJ.Connector.*`). The current release is **3.0.21**.
Link to a release with its version anchor, for example [3.0.19](#3-0-19).

## 3.0.21

*Nov 13, 2026*

**Features:**

- Search results now accept the `match_all` parameter when it's sent through `beforeAPICall`.

**Fixes:**

- Fixed `helpers.getPageUrl()` dropping the `hij_sort` key when the default sort option was applied.
- Fixed suggestions requests being sent twice when the query input field lost and regained focus within the debounce window.

## 3.0.20

*Oct 14, 2026*

**Changes:**

- Failover is now triggered only when HIJ Search can't be reached, returns a 5xx error or rate limits requests (429). Other 4xx errors, such as an invalid parameter, no longer trigger it.

**Fixes:**

- Fixed `onFailure` not being called when the response couldn't be parsed. It's now called with `{ error: { type, message } }`.
- Fixed `collection_viewed` events not including `product_ids` when `fields` excluded products.

## 3.0.19

*Sep 15, 2026*

**Breaking changes:**

- **Renamed `helpers.getSortChoices()` to `helpers.getSortOptions()`.** The old name was removed, not deprecated. Search for `getSortChoices` in your code before upgrading from 3.0.18 or earlier.

**Fixes:**

- Fixed `removeRecentQuery()` failing for queries with spaces or special characters.

## 3.0.18

*Sep 7, 2026*

**Changes:**

- `getEncodedQueryString()` now encodes range filters as `f[price][min]` and `f[price][max]` instead of `f[price]=20-80`. Old URLs are still read.

**Fixes:**

- Fixed nested filter items losing their `selected` state after a page change.

## 3.0.17

*Aug 26, 2026*

**Features:**

- Added `helpers.trackProductClick(product)`, which returns a promise that resolves once the click event is sent.

**Fixes:**

- Fixed `analyticsCookieDomain` being ignored for the session cookie.

## 3.0.16

*Aug 5, 2026*

**Fixes:**

- Fixed `promoTiles` positions being off by one when `page` was greater than 1.

## 3.0.15

*Aug 5, 2026*

**Features:**

- Added the `promoTiles` request parameter to the Collections connector. Promotional tiles are returned in `response.promo_tiles` with their grid positions.
