---
description: "Pick the layout, columns, price display, button style, accent colour and heading for the checkout recommendations block, and write its configuration JSON."
---

# Checkout recommendations style builder

**Applies to:** product `checkout-recommendations` · version `none` · store types `liquid`, `hydrogen`, `custom-frontend` · requires none

Choose the style tokens for the [checkout recommendations](README.md) block: pick one value per token from the table below, then write the configuration JSON, starting from the example.

When the configuration is ready, paste it into **Recommendations → Checkout → Style** in the HIJ Search app. The app rejects any key or value that isn't in the table below.

## Tokens

| Token | Type | Values | Default | Effect |
| --- | --- | --- | --- | --- |
| `layout` | string | `grid`, `carousel` | `grid` | Grid shows every product at once. Carousel shows one row that the shopper swipes. |
| `columns` | number | `2`, `3`, `4` | `4` | Products per row. Narrow checkouts drop to 2 automatically. |
| `showPrice` | boolean | `true`, `false` | `true` | Show the price under each product title. |
| `buttonStyle` | string | `filled`, `outline` | `filled` | Filled uses the accent colour as the button background. Outline uses it for the border and text. |
| `accentColour` | string | `indigo` (#4F46E5), `emerald` (#059669), `rose` (#E11D48), `amber` (#B45309), `slate` (#334155) | `indigo` | Colour of the add button. Only these five are accepted, so contrast always passes. |
| `heading` | string | Up to 60 characters | `You might also like` | Text above the products. Translated per locale under **Recommendations → Checkout → Translations**. |

## Example configuration

```json
{
  "checkoutRecommendations": {
    "layout": "carousel",
    "columns": 3,
    "showPrice": true,
    "buttonStyle": "outline",
    "accentColour": "emerald",
    "heading": "Complete the look"
  }
}
```
