/*
 * HIJ nav: version row in the sidebar + same-page version switching.
 *
 * Mintlify includes every .js file in the content folder on every page
 * (https://www.mintlify.com/docs/customize/custom-scripts). This file:
 *  1. Adds a version row under the sidebar dropdown on versioned pages, so the
 *     sidebar shows one stacked card: [product dropdown] over [version row].
 *  2. Makes version switches (this row and Mintlify's own version menu) open the
 *     matching page in the other version, falling back to its first page.
 *
 * VERSIONS mirrors the "versions" arrays in docs.json. Keep the two in sync.
 */
(function () {
  if (window.__hijNav) return;
  window.__hijNav = true;

  var VERSIONS = [
    {
      product: 'Full stack',
      versions: [
        { name: 'Full stack 3.x', short: '3.x', tag: 'Latest', pages: ['/full-stack/quick-start', '/full-stack/search-results', '/full-stack/search-suggestions', '/full-stack/failover'] },
        { name: 'Full stack 2.x', short: '2.x', tag: 'Legacy', pages: ['/full-stack/v2/quick-start', '/full-stack/v2/search-results'] }
      ]
    },
    {
      product: 'Headless',
      versions: [
        { name: 'Headless 3.x', short: '3.x', tag: 'Latest', pages: ['/headless/quick-start', '/headless/collections', '/headless/failover'] },
        { name: 'Headless 2.x', short: '2.x', tag: 'Legacy', pages: ['/headless/v2/quick-start', '/headless/v2/collections'] }
      ]
    },
    {
      product: 'GTM template',
      versions: [
        { name: 'GTM r20260217', short: 'r20260217', tag: 'Latest', pages: ['/analytics/gtm/setup'] },
        { name: 'GTM r20250801', short: 'r20250801', tag: 'Legacy', pages: ['/analytics/gtm/r20250801/setup'] },
        { name: 'GTM r20240718', short: 'r20240718', tag: 'Legacy', pages: ['/analytics/gtm/r20240718/setup'] }
      ]
    }
  ];

  function cleanPath(p) {
    p = (p || '/').split(/[?#]/)[0].replace(/\.md$/, '');
    if (p.length > 1) p = p.replace(/\/+$/, '');
    return p;
  }

  // "/full-stack/v2/search-results" -> "/full-stack/search-results",
  // "/analytics/gtm/r20250801/setup" -> "/analytics/gtm/setup".
  function pageKey(p) {
    return cleanPath(p).replace(/\/(v\d+|r\d{8})(?=\/)/, '');
  }

  function findCurrent(path) {
    path = cleanPath(path);
    for (var i = 0; i < VERSIONS.length; i++) {
      for (var j = 0; j < VERSIONS[i].versions.length; j++) {
        if (VERSIONS[i].versions[j].pages.indexOf(path) !== -1) {
          return { product: VERSIONS[i], version: VERSIONS[i].versions[j] };
        }
      }
    }
    return null;
  }

  function findVersionByName(name) {
    for (var i = 0; i < VERSIONS.length; i++) {
      for (var j = 0; j < VERSIONS[i].versions.length; j++) {
        if (VERSIONS[i].versions[j].name === name) return VERSIONS[i].versions[j];
      }
    }
    return null;
  }

  // The matching page in another version, or that version's first page.
  function targetFor(version, fromPath) {
    var key = pageKey(fromPath);
    for (var i = 0; i < version.pages.length; i++) {
      if (pageKey(version.pages[i]) === key) return version.pages[i];
    }
    return version.pages[0];
  }

  var ICON_LAYERS =
    '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></svg>';
  var ICON_UPDOWN =
    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>';
  var ICON_CHECK =
    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function buildRow(cur, path) {
    var row = document.createElement('div');
    row.className = 'hij-version-row';
    row.setAttribute('data-hij-version-row', cur.version.name);
    var items = cur.product.versions
      .map(function (v) {
        var active = v === cur.version;
        return (
          '<a role="menuitem" class="hij-version-item" href="' + esc(targetFor(v, path)) + '"' +
          ' data-version="' + esc(v.name) + '"' + (active ? ' data-active="true" aria-current="true"' : '') + '>' +
          '<span class="hij-version-item-label">' + esc(v.short) + '</span>' +
          '<span class="hij-badge" data-tag="' + esc(v.tag) + '">' + esc(v.tag) + '</span>' +
          '<span class="hij-version-check">' + (active ? ICON_CHECK : '') + '</span>' +
          '</a>'
        );
      })
      .join('');
    row.innerHTML =
      '<button type="button" class="hij-version-trigger" aria-haspopup="menu" aria-expanded="false">' +
      '<span class="hij-version-icon">' + ICON_LAYERS + '</span>' +
      '<span class="hij-version-label">' + esc(cur.version.name) + '</span>' +
      '<span class="hij-badge" data-tag="' + esc(cur.version.tag) + '">' + esc(cur.version.tag) + '</span>' +
      '<span class="hij-version-updown">' + ICON_UPDOWN + '</span>' +
      '</button>' +
      '<div class="hij-version-menu" role="menu" hidden>' + items + '</div>';

    var trigger = row.querySelector('.hij-version-trigger');
    var menu = row.querySelector('.hij-version-menu');
    trigger.addEventListener('click', function () {
      var open = menu.hasAttribute('hidden');
      if (open) menu.removeAttribute('hidden');
      else menu.setAttribute('hidden', '');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    return row;
  }

  function closeMenus(except) {
    document.querySelectorAll('.hij-version-row').forEach(function (row) {
      if (row === except) return;
      var m = row.querySelector('.hij-version-menu');
      var t = row.querySelector('.hij-version-trigger');
      if (m && !m.hasAttribute('hidden')) {
        m.setAttribute('hidden', '');
        t.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.addEventListener('click', function (e) {
    closeMenus(e.target.closest && e.target.closest('.hij-version-row'));
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenus(null);
  });

  // The sidebar's dropdown trigger (Mintlify renders it as the first button in
  // #navigation-items when the current menu item has "dropdowns").
  function dropdownTriggers() {
    var out = [];
    document.querySelectorAll('#navigation-items').forEach(function (nav) {
      var first = nav.firstElementChild;
      if (first && first.tagName === 'BUTTON' && first.getAttribute('aria-haspopup') === 'menu') out.push(first);
    });
    return out;
  }

  function sync() {
    var path = location.pathname;
    var cur = findCurrent(path);
    document.documentElement.toggleAttribute('data-hij-versioned', !!cur);
    var triggers = dropdownTriggers();
    // Remove rows that are stale or no longer next to a dropdown.
    document.querySelectorAll('.hij-version-row').forEach(function (row) {
      var prev = row.previousElementSibling;
      var ok = cur && row.getAttribute('data-hij-version-row') === cur.version.name &&
        row.getAttribute('data-hij-path') === path && prev && triggers.indexOf(prev) !== -1;
      if (!ok) row.remove();
    });
    if (!cur) return;
    triggers.forEach(function (t) {
      var next = t.nextElementSibling;
      if (next && next.classList.contains('hij-version-row')) return;
      var row = buildRow(cur, path);
      row.setAttribute('data-hij-path', path);
      t.insertAdjacentElement('afterend', row);
    });
  }

  // Mintlify's own version menu (header on desktop, drawer on mobile) opens a
  // version's first page. Send it to the matching page instead.
  window.addEventListener(
    'click',
    function (e) {
      var item = e.target.closest && e.target.closest('[data-component-part="version-select-item"]');
      if (!item) return;
      var label = item.textContent.replace(/(Latest|Legacy)\s*$/, '').trim();
      var v = findVersionByName(label);
      if (!v) return;
      var target = targetFor(v, location.pathname);
      if (target === item.getAttribute('data-nav-href')) return;
      e.preventDefault();
      e.stopPropagation();
      location.assign(target);
    },
    true
  );

  var scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      sync();
    });
  }

  window.addEventListener('mintlify:navigate', schedule);
  window.addEventListener('popstate', schedule);
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  sync();
})();
