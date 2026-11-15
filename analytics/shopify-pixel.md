---
description: "On Liquid stores, the HIJ Shopify Pixel sends product views, collection views, add to cart and checkout events automatically. No code needed."
---

# Shopify Pixel

**Applies to:** section `Analytics` (flow step 4 of 8) · product `analytics` · version `none` · status `current` · store types `liquid` · requires `install-app`

The HIJ Search app installs a Shopify web pixel on Liquid stores. It listens to Shopify's standard customer events and sends the matching HIJ events, so you don't write any analytics code for store events.

{% hint style="info" %}
The Pixel is for **Liquid themes**. Hydrogen and other headless storefronts send store events with [SDK manual analytics](sdk-manual.md), the [GTM template](https://hij.gitbook.io/hij-docs/gtm) or the [Analytics API](analytics-api.md).
{% endhint %}

## Events it sends

| Shopify customer event | HIJ event |
| --- | --- |
| `product_viewed` | `product_viewed` |
| `collection_viewed` | `collection_viewed` |
| `product_added_to_cart` | `product_added_to_cart` |
| `checkout_started` | `checkout_started` |
| `checkout_completed` | `order_completed` |

The Pixel doesn't see searches, suggestions or clicks inside HIJ widgets. The [JS SDKs](https://hij.gitbook.io/hij-docs/sdks) send those. On the Storefront API path, send them with the [Analytics API](analytics-api.md).

## Turn it on

The app turns the Pixel on during install when it detects a Liquid theme. To check:

1. In Shopify admin, open **Settings → Customer events**.
2. Find **HIJ Search** in the list. Its status should be **Connected**.
3. In the HIJ Search app, **Settings → Analytics** shows **Shopify Pixel: On**.

If you switched from a headless front end to a Liquid theme, turn it on under **Settings → Analytics** in the app.

## Consent

The Pixel uses Shopify's Customer Privacy API. It sends events only when the shopper has allowed analytics in your cookie banner, and it sets the `hij_vid` and `hij_sid` cookies only then. No configuration is needed.

## Connect search to orders

The Pixel and the SDKs share the `hij_vid` visitor cookie, so HIJ connects a search made with the SDK to the order the Pixel reports. Keep `analyticsCookieDomain` in the SDK configuration on the same domain as your shop if the store spans subdomains.

## Check it works

Open **Analytics → Live events** in the app, accept cookies on your store and open a product page. A `product_viewed` event with source **Shopify Pixel** should appear within a few seconds.
