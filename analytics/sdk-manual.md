---
description: "Send product views, add to cart, checkout and order events with HIJ.Analytics.track() on Hydrogen and other headless storefronts that load a HIJ JS SDK."
---

# SDK manual analytics

**Applies to:** product `analytics` · version `3.x` · store types `hydrogen`, `custom-frontend` · requires `credentials`

Both JS SDKs include `HIJ.Analytics`. The SDK already sends search, suggestion and collection events. Use `HIJ.Analytics.track()` for the store events it can't see: product views, add to cart, checkout and orders.

{% hint style="info" %}
**Liquid stores don't need this page.** The [Shopify Pixel](shopify-pixel.md) sends these events automatically. This page applies to full stack and headless **3.x**. The 2.x SDKs only send their built-in v1 events; upgrade to 3.x to send store events from the SDK.
{% endhint %}

## Track an event

```javascript
HIJ.Analytics.track(eventType, payload)
```

| Argument | Type | Description |
| --- | --- | --- |
| `eventType` | string | One of the store events below. |
| `payload` | object | The event fields from the [Analytics API](analytics-api.md#event-types), without `visitor_id`, `session_id` and `occurred_at`. The SDK adds those. |

`track` returns a promise that resolves once the event is sent, or right away when `analyticsConsentProvided()` returns `false` (the event is dropped). It never rejects.

| Event | Call it |
| --- | --- |
| `product_viewed` | When a product page renders |
| `product_added_to_cart` | After the cart update succeeds |
| `checkout_started` | When the shopper leaves for checkout |
| `order_completed` | Prefer your server: see [send orders from your server](analytics-api.md#send-orders-from-your-server) |

## Examples

{% tabs %}
{% tab title="Hydrogen product route" %}
```tsx
// app/routes/products.$handle.tsx
import { useEffect } from "react";
import { useLoaderData } from "react-router";

export default function Product() {
  const { product } = useLoaderData<typeof loader>();

  useEffect(() => {
    window.onHIJReady?.(() => {
      HIJ.Analytics.track("product_viewed", {
        product_id: product.id.split("/").pop(),
        variant_id: product.selectedVariant?.id.split("/").pop(),
      });
    });
  }, [product.id]);

  return <ProductPage product={product} />;
}
```
{% endtab %}
{% tab title="Add to cart" %}
```javascript
async function addToCart(product, variant, quantity) {
  await cart.addLines([{ merchandiseId: variant.gid, quantity }]);
  HIJ.Analytics.track("product_added_to_cart", {
    product_id: product.id,
    variant_id: variant.id,
    quantity,
    price: variant.price,
  });
}
```
{% endtab %}
{% tab title="Checkout" %}
```javascript
checkoutButton.addEventListener("click", function () {
  HIJ.Analytics.track("checkout_started", {
    cart_token: cart.token,
    line_items: cart.lines.map(function (l) {
      return { product_id: l.productId, variant_id: l.variantId, quantity: l.quantity, price: l.price };
    }),
  }).finally(function () {
    window.location.href = cart.checkoutUrl;
  });
});
```
{% endtab %}
{% endtabs %}

## Single-page apps

`HIJ.Analytics.track()` doesn't watch route changes. Call it in the effect or route hook that runs when a product page renders, keyed on the product ID, so client-side navigation between two products sends two `product_viewed` events.

## Data layer instead?

If your store already pushes GA4-style ecommerce events to `window.dataLayer`, the [GTM template](https://hij.gitbook.io/hij-docs/gtm) maps them to HIJ events without code. Use one method per event; see [avoid duplicate events](README.md#avoid-duplicate-events).
