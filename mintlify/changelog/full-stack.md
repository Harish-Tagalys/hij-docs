# Changelog

All notable changes to the HIJ UI widgets SDK are listed here, newest first.

### 3.0.20 - Nov 10, 2026

#### Changes:

- The search results widget now uses Connector 3.0.21 internally, so `beforeAPICall` can set `match_all`.

#### Fixes:

- Fixed the suggestions panel staying open after the query input field was cleared with Escape.

### 3.0.19 - Oct 14, 2026

#### Changes:

- Fallback widgets now take over only when HIJ Search can't be reached, returns a 5xx error or rate limits requests (429).

#### Fixes:

- Fixed `onFailure` not being called when the response couldn't be parsed.

### 3.0.12 - Jul 21, 2026

#### Features:

- Added the `noResultsWidgets` option to show recommendation strips on the search results empty state.

### 3.0.9 - May 28, 2026

#### Features:

- Added the `scrollToTopOnChange` option to the search results widget.

### 3.0.4 - Mar 30, 2026

#### Features:

- Added the `queryStringPrefix` option.

### 3.0.2 - Mar 9, 2026

#### Features:

- Added the `breakpoints` option.

### 3.0.0 - Feb 16, 2026

#### Breaking changes:

- New `HIJ.UIWidgets` namespace and `init(selector, configurationOptions)` method.
- The `perPage` option is now `params.limit`.
- Templates are tagged-template `render` functions.

#### Features:

- Added `analyticsConsentProvided`.

## 2.x (legacy)

### 2.1.8 - May 5, 2026

#### Fixes:

- Security fix: query strings are now escaped in the default `noResults` template.
