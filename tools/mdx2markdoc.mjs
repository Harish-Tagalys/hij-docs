#!/usr/bin/env node
// Mintlify-flavoured MDX -> Redocly (Realm) Markdoc converter for the HIJ Search docs.
// Line-based and fence-aware, extended from the earlier Redocly converter for every
// component this source uses.
// Usage: node mdx2markdoc.mjs <mintlify-dir> <route> <out-file>
//
//   frontmatter title       -> kept, plus a "# title" H1 (Redocly doesn't render the title as the H1)
//   description             -> seo.description;  sidebarTitle -> dropped (label lives in sidebars.yaml)
//   <Accordion title>       -> {% accordion title %} (works nested and inside list items)
//   <Info>/<Note>           -> {% admonition type="info" %}, <Warning> -> warning, <Tip> -> success
//   <CardGroup cols>/<Card> -> {% cards columns %} / {% card title to icon %}
//   <Update label desc>     -> "## <label> {% #x-y-z %}" stable anchor + date line
//   {{UI_WIDGETS_VERSION}}  -> {% $env.PUBLIC_UI_WIDGETS_VERSION %} (also inside code fences; .env holds the values)
//   fences containing {% %} -> {% process=false %}, or Markdoc parses the Liquid and the block renders empty
//   <Failover .../>         -> {% partial file="/_partials/failover.md" variables={...} /%}
//   <Since sdk v />         -> <span class="since-badge">Added in sdk v</span> (custom Markdoc tags need Scale)
//   links                   -> /v2/ui-widgets/* -> /ui-widgets/2.x/*, /api/endpoints/* -> generated operation pages
import fs from 'node:fs';
import path from 'node:path';

const [, , srcDir, route, outFile] = process.argv;
const stats = { accordion: 0, admonition: 0, card: 0, fenceNoProcess: 0, vars: 0, since: 0, updates: 0 };
const ENV = { UI_WIDGETS_VERSION: 'PUBLIC_UI_WIDGETS_VERSION', CONNECTOR_VERSION: 'PUBLIC_CONNECTOR_VERSION' };
const CALLOUT = { Info: 'info', Note: 'info', Warning: 'warning', Tip: 'success' };
// Mintlify generated one page per operation; Redocly generates its own operation routes.
const LINKS = {
  '/api/endpoints/search': '/api/openapi/search/search',
  '/api/endpoints/suggestions': '/api/openapi/search/suggestions',
  '/api/endpoints/collection': '/api/openapi/collections/getcollection',
};

const q = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const attrs = (s) => Object.fromEntries([...s.matchAll(/(\w+)=(?:"([^"]*)"|\{([^}]*)\})/g)].map((m) => [m[1], m[2] ?? m[3]]));
const envVar = (s) => s.replace(/\{\{(UI_WIDGETS_VERSION|CONNECTOR_VERSION)\}\}/g, (a, k) => { stats.vars++; return `{% $env.${ENV[k]} %}`; });
const mapHref = (h) => {
  const [p, hash] = h.split('#');
  let r = LINKS[p] ?? p.replace(/^\/v2\/ui-widgets\//, '/ui-widgets/2.x/');
  return r + (hash ? '#' + hash : '');
};

const lines = fs.readFileSync(path.join(srcDir, route + '.mdx'), 'utf8').split('\n');
const out = [];
let inFence = false, fenceMarker = '', inFrontmatter = false;
const fm = {};

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  if (i === 0 && line === '---') { inFrontmatter = true; continue; }
  if (inFrontmatter) {
    if (line === '---') {
      inFrontmatter = false;
      out.push('---', `title: "${q(fm.title)}"`);
      if (fm.description) out.push('seo:', `  title: "${q(fm.title)}"`, `  description: "${q(fm.description)}"`);
      out.push('---', '', `# ${fm.title}`);
      continue;
    }
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) fm[m[1]] = m[2].replace(/^"(.*)"$/, '$1');
    continue;
  }

  const fmm = line.match(/^(\s*)(```+|~~~+)(.*)$/);
  if (fmm) {
    if (!inFence) {
      inFence = true; fenceMarker = fmm[2];
      let j = i + 1, hasTag = false;
      while (j < lines.length && !lines[j].trimStart().startsWith(fenceMarker)) { if (/\{%/.test(lines[j])) hasTag = true; j++; }
      if (hasTag) { line = `${fmm[1]}${fmm[2]}${fmm[3]} {% process=false %}`; stats.fenceNoProcess++; }
      out.push(line); continue;
    } else if (fmm[2].startsWith(fenceMarker) && fmm[3].trim() === '') {
      inFence = false; out.push(line); continue;
    }
  }
  if (inFence) {
    const v = envVar(line);
    // Redocly's validator reports "The string attribute must have an opening and closing quote" for
    // {% $var %} inside a double-quoted string in a fence (the output is still right). Single quotes avoid it.
    out.push(v !== line ? v.replace(/="([^"]*\{%[^"]*)"/g, "='$1'") : v); continue;
  }

  let m;
  if (/^import .* from /.test(line)) { if (lines[i + 1] === '') i++; continue; }
  if (/^\{\/\*.*\*\/\}\s*$/.test(line)) { if (lines[i + 1] === '') i++; continue; }
  if ((m = line.match(/^(\s*)<Accordion title="(.*)">\s*$/))) { line = `${m[1]}{% accordion title="${q(m[2])}" %}`; stats.accordion++; }
  else if ((m = line.match(/^(\s*)<\/Accordion>\s*$/))) line = `${m[1]}{% /accordion %}`;
  else if ((m = line.match(/^(\s*)<(Info|Note|Warning|Tip)>\s*$/))) { line = `${m[1]}{% admonition type="${CALLOUT[m[2]]}" %}`; stats.admonition++; }
  else if ((m = line.match(/^(\s*)<\/(Info|Note|Warning|Tip)>\s*$/))) line = `${m[1]}{% /admonition %}`;
  else if ((m = line.match(/^(\s*)<CardGroup(?:\s+cols=\{(\d+)\})?>\s*$/))) line = `${m[1]}{% cards${m[2] ? ` columns=${m[2]}` : ''} %}`;
  else if ((m = line.match(/^(\s*)<\/CardGroup>\s*$/))) line = `${m[1]}{% /cards %}`;
  else if ((m = line.match(/^(\s*)<Card\s+(.*?)\s*(\/?)>\s*$/))) {
    const a = attrs(m[2]); stats.card++;
    const icon = a.icon ? ` icon="${a.icon}"` : '';
    line = `${m[1]}{% card title="${q(a.title)}" to="${mapHref(a.href)}"${icon} ${m[3] ? '/%}' : '%}'}`;
  }
  else if ((m = line.match(/^(\s*)<\/Card>\s*$/))) line = `${m[1]}{% /card %}`;
  else if ((m = line.match(/^<Update\s+(.*?)>\s*$/))) {
    const a = attrs(m[1]); stats.updates++;
    out.push(`## ${a.label} {% #${a.label.replace(/\./g, '-')} %}`, '', `_${a.description}_`); continue;
  }
  else if (/^<\/Update>\s*$/.test(line)) { if (out[out.length - 1] === '') out.pop(); continue; }
  else if ((m = line.match(/^<Failover\s+(.*?)\s*\/>\s*$/))) {
    const a = attrs(m[1]);
    const vars = Object.entries(a).map(([k, v]) => `${k}: "${q(v)}"`).join(', ');
    line = `{% partial file="/_partials/failover.md" variables={${vars}} /%}`;
  }

  line = line.replace(/<Since\s+sdk="([^"]+)"\s+v="([^"]+)"\s*\/>/g, (a, sdk, v) => { stats.since++; return `<span class="since-badge">Added in ${sdk} ${v}</span>`; });
  line = envVar(line);
  line = line.replace(/\]\((\/[^)\s]*)\)/g, (a, h) => `](${mapHref(h)})`);
  out.push(line);
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, out.join('\n').replace(/\n{3,}/g, '\n\n'));
console.error(`${route}.mdx -> ${outFile}`, JSON.stringify(stats));
