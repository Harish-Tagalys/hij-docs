---
description: "Recommendation blocks for Shopify checkout: what's planned, how the block will be configured with style tokens, and how to prepare your configuration today."
---

# Checkout recommendations

**Applies to:** product `checkout-recommendations` · version `none` · store types `liquid`, `hydrogen`, `custom-frontend` · requires `install-app`, `analytics`

{% hint style="info" %}
**Not available yet.** Checkout recommendations are in development and aren't exposed to stores today. You can design and save the block's style now with the [style builder](style-builder.md); the configuration will carry over when the block ships.
{% endhint %}

Checkout recommendations add a strip of products to Shopify checkout, between the order summary and the payment step. Shoppers add a product with one tap, without leaving checkout.

## How it will work

| | |
| --- | --- |
| Where it renders | A Shopify checkout UI extension that the HIJ Search app adds. You place it in the checkout editor. |
| Which products | A recommendation from **Recommendations** in the app, usually "Frequently bought together" for the cart's contents. |
| Storefront types | Every store that uses Shopify checkout: Liquid, Hydrogen and other headless front ends. No front-end code. |
| Styling | A fixed set of style tokens, not CSS. Checkout extensions can't load custom styles, so the block only accepts the tokens below. |
| Analytics | The block sends `recommendation_viewed`, `product_clicked` and `product_added_to_cart` itself. |

## Style tokens

| Token | Values | Default |
| --- | --- | --- |
| `layout` | `grid` or `carousel` | `grid` |
| `columns` | `2`, `3` or `4` | `4` |
| `showPrice` | `true` or `false` | `true` |
| `buttonStyle` | `filled` or `outline` | `filled` |
| `accentColour` | `indigo`, `emerald`, `rose`, `amber` or `slate` | `indigo` |
| `heading` | Text, up to 60 characters | `You might also like` |

<table data-view="cards">
  <thead>
    <tr>
      <th width="48"></th>
      <th></th>
      <th></th>
      <th data-hidden data-card-target data-type="content-ref"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><i class="fa-palette"></i></td>
      <td><strong>Open the style builder</strong></td>
      <td>Pick tokens and write the configuration JSON.</td>
      <td><a href="style-builder.md">style-builder.md</a></td>
    </tr>
  </tbody>
</table>
