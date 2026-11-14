#!/usr/bin/env bash
# Regenerate the Redocly (Markdoc) pages from ../mintlify. The Mintlify source is never edited.
# Hand-written files (redocly.yaml, sidebars.yaml, versions.yaml, .env, _partials/, @theme/) are not touched,
# except _partials/failover.md, which is generated from snippets/failover.mdx.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
site="$(cd "$here/.." && pwd)"
src="$(cd "$site/../mintlify" && pwd)"
conv() { node "$here/mdx2markdoc.mjs" "$src" "$1" "$site/$2"; }

conv index index.md
for p in quick-start search-results search-suggestions; do conv "ui-widgets/$p" "ui-widgets/@3.x/$p.md"; done
for p in quick-start search-results; do conv "v2/ui-widgets/$p" "ui-widgets/@2.x/$p.md"; done
for p in connector/collections ab-testing/setup-liquid reuse/page-a reuse/page-b api/overview changelog/connector; do
  conv "$p" "$p.md"
done

# Snippet with props -> partial with Markdoc variables
mkdir -p "$site/_partials"
sed -E 's/\{([a-z]+)\}/{% $\1 %}/g' "$src/snippets/failover.mdx" > "$site/_partials/failover.md"

mkdir -p "$site/assets" "$site/api"
cp "$src"/assets/* "$site/assets/"
cp "$src/api/openapi.yaml" "$site/api/openapi.yaml"
