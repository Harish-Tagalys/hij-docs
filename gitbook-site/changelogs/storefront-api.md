---
description: "Dated changes to the HIJ Storefront API v2, newest first."
---

# Storefront API changelog

**Applies to:** section `Changelogs` (flow step 8 of 8) · product `storefront-api` · version `v2` · status `current` · store types `server-side`, `hydrogen`, `custom-frontend` · requires none

The Storefront API has one version, v2. Changes are additive unless marked **Breaking**. Link to an entry with its date anchor, for example [2026-09-15](#id-2026-09-15).

## 2026-11-03

*Nov 3, 2026*

**Features:**

- `GET /v2/search` accepts `match_all=true` to require every word of the query to match.

## 2026-09-15

*Sep 15, 2026*

**Features:**

- The `X-HIJ-Visitor-Id`, `X-HIJ-Session-Id` and `X-HIJ-Forwarded-For` headers personalise server-side requests and apply rate limits per shopper. See [authentication](https://hij.gitbook.io/hij-docs/storefront-api/authentication#calls-from-a-server).

## 2026-08-05

*Aug 5, 2026*

**Features:**

- `GET /v2/collections/{id}` accepts `promo_tiles=true` and returns promotional tiles with their grid positions.

## 2026-06-10

*Jun 10, 2026*

**Changes:**

- Range filters use `f[price][min]` and `f[price][max]`. The older `f[price]=20-80` form is still accepted.

## 2026-02-16

*Feb 16, 2026*

**Breaking changes:**

- Authentication moved to the `X-HIJ-Storefront-Token` header and the `shop_id` query parameter.
- v1 endpoints are frozen. v1 field names (`name`, `image_url`, `sort_choices`) are replaced by `title`, `image.src` and `sort_options`.
