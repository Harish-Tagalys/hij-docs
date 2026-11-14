// PathChooser: three questions about the store, then the recommended integration path,
// the analytics method for store events and the pages to read next.
// Usage in MDX:  import { PathChooser } from "/snippets/path-chooser.jsx";  then  <PathChooser />
// The same logic is published as a static table right below the component on index.mdx.
// Keep the two in sync when either changes.

export const PathChooser = () => {
  const [answers, setAnswers] = useState({ liquid: null, ownUi: null, serverSide: null });

  const questions = [
    {
      key: "liquid",
      label: "Is your storefront a Shopify Liquid theme?",
      hint: "Answer no for Hydrogen, Remix or any other custom front end.",
    },
    {
      key: "ownUi",
      label: "Do you want to render your own UI for search and collections?",
      hint: "No means you'd rather use ready-made, templatable widgets.",
    },
    {
      key: "serverSide",
      label: "Must HIJ results be rendered on your server?",
      hint: "For example in server-rendered HTML, a native app or a backend job. The JS SDKs run in the browser only.",
    },
  ];

  const ready = answers.liquid !== null && answers.ownUi !== null && answers.serverSide !== null;

  const recommend = () => {
    const liquid = answers.liquid;
    let path;
    if (answers.serverSide) {
      path = {
        name: "Storefront API v2",
        why: "The JS SDKs run in the browser only, so server-rendered pages and apps call the REST API directly.",
        start: [
          { label: "Storefront API overview", href: "/storefront-api/overview" },
          { label: "Authentication", href: "/storefront-api/authentication" },
          { label: "Analytics is required", href: "/storefront-api/analytics-required" },
        ],
      };
    } else if (answers.ownUi) {
      path = {
        name: "Headless (Connector SDK 3.x)",
        why: "The Connector fetches data, keeps request state and sends search and collection events. Your code renders everything.",
        start: [
          { label: "JS SDKs overview", href: "/sdks/overview" },
          { label: "Headless quick start", href: "/headless/quick-start" },
          { label: "Collections connector", href: "/headless/collections" },
        ],
      };
    } else {
      path = {
        name: "Full stack (UI widgets SDK 3.x)",
        why: "Ready-made widgets fetch their own data, render with your templates and send search and widget events.",
        start: [
          { label: "JS SDKs overview", href: "/sdks/overview" },
          { label: "Full stack quick start", href: "/full-stack/quick-start" },
          { label: "Search results widget", href: "/full-stack/search-results" },
        ],
      };
    }

    let analytics;
    if (answers.serverSide) {
      analytics = liquid
        ? {
            name: "Shopify Pixel + Analytics API",
            detail: "The Shopify Pixel sends store events automatically. Send search and product click events yourself with the Analytics API.",
            links: [
              { label: "Shopify Pixel", href: "/analytics/shopify-pixel" },
              { label: "Analytics API", href: "/analytics/analytics-api" },
            ],
          }
        : {
            name: "Analytics API",
            detail: "Nothing sends events for you on this path. Send every event with the Analytics API.",
            links: [{ label: "Analytics API", href: "/analytics/analytics-api" }],
          };
    } else {
      analytics = liquid
        ? {
            name: "Shopify Pixel",
            detail: "The SDK sends search and widget events. The Shopify Pixel sends product views, collection views, add to cart and checkout automatically.",
            links: [{ label: "Shopify Pixel", href: "/analytics/shopify-pixel" }],
          }
        : {
            name: "SDK manual analytics (or the GTM template)",
            detail: "The SDK sends search and widget events. Send product views, add to cart and orders with HIJ.Analytics.track(), or with the GTM template if you already push a data layer.",
            links: [
              { label: "SDK manual analytics", href: "/analytics/sdk-manual" },
              { label: "GTM template", href: "/analytics/gtm/setup" },
            ],
          };
    }

    const abTesting = liquid
      ? { label: "A/B testing in a Liquid theme", href: "/ab-testing/liquid" }
      : { label: "A/B testing for Hydrogen and Remix", href: "/ab-testing/overview" };

    return { path, analytics, abTesting };
  };

  const set = (key, value) => setAnswers((prev) => ({ ...prev, [key]: value }));
  const reset = () => setAnswers({ liquid: null, ownUi: null, serverSide: null });

  const accent = "#4F46E5";
  const box = {
    border: "1px solid rgba(127,127,127,0.3)",
    borderRadius: "12px",
    padding: "20px",
    margin: "16px 0",
  };
  const choice = (selected) => ({
    padding: "6px 16px",
    borderRadius: "9999px",
    border: `1px solid ${selected ? accent : "rgba(127,127,127,0.45)"}`,
    background: selected ? accent : "transparent",
    color: selected ? "#ffffff" : "inherit",
    fontWeight: 500,
    cursor: "pointer",
    marginRight: "8px",
  });
  const linkStyle = { color: "#6366F1", fontWeight: 500, textDecoration: "underline" };

  const result = ready ? recommend() : null;

  return (
    <div style={box} data-component="path-chooser">
      <p style={{ fontWeight: 600, fontSize: "1.05em", margin: "0 0 12px" }}>Find your integration path</p>
      <ol style={{ margin: 0, paddingLeft: "1.2em" }}>
        {questions.map((q) => (
          <li key={q.key} style={{ marginBottom: "16px" }}>
            <div style={{ fontWeight: 500 }}>{q.label}</div>
            <div style={{ fontSize: "0.85em", opacity: 0.75, margin: "2px 0 8px" }}>{q.hint}</div>
            <div role="radiogroup" aria-label={q.label}>
              <button
                type="button"
                role="radio"
                aria-checked={answers[q.key] === true}
                data-answer={`${q.key}-yes`}
                style={choice(answers[q.key] === true)}
                onClick={() => set(q.key, true)}
              >
                Yes
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={answers[q.key] === false}
                data-answer={`${q.key}-no`}
                style={choice(answers[q.key] === false)}
                onClick={() => set(q.key, false)}
              >
                No
              </button>
            </div>
          </li>
        ))}
      </ol>

      {!ready && (
        <p style={{ fontSize: "0.9em", opacity: 0.75, margin: "4px 0 0" }}>
          Answer all three questions to see your path.
        </p>
      )}

      {result && (
        <div
          data-result="path-chooser"
          aria-live="polite"
          style={{ borderTop: "1px solid rgba(127,127,127,0.3)", marginTop: "8px", paddingTop: "16px" }}
        >
          <div style={{ fontSize: "0.8em", textTransform: "uppercase", letterSpacing: "0.04em", opacity: 0.7 }}>
            Recommended path
          </div>
          <div data-result-path style={{ fontSize: "1.15em", fontWeight: 600, margin: "2px 0 4px" }}>
            {result.path.name}
          </div>
          <p style={{ margin: "0 0 8px" }}>{result.path.why}</p>
          <p style={{ margin: "0 0 16px" }}>
            {result.path.start.map((l, i) => (
              <span key={l.href}>
                {i > 0 && " · "}
                <a href={l.href} style={linkStyle}>
                  {l.label}
                </a>
              </span>
            ))}
          </p>

          <div style={{ fontSize: "0.8em", textTransform: "uppercase", letterSpacing: "0.04em", opacity: 0.7 }}>
            Analytics for store events
          </div>
          <div data-result-analytics style={{ fontWeight: 600, margin: "2px 0 4px" }}>
            {result.analytics.name}
          </div>
          <p style={{ margin: "0 0 8px" }}>{result.analytics.detail}</p>
          <p style={{ margin: "0 0 16px" }}>
            {result.analytics.links.map((l, i) => (
              <span key={l.href}>
                {i > 0 && " · "}
                <a href={l.href} style={linkStyle}>
                  {l.label}
                </a>
              </span>
            ))}
            {" · "}
            <a href="/analytics/overview" style={linkStyle}>
              Analytics overview
            </a>
          </p>

          <p style={{ margin: "0 0 12px" }}>
            Then: <a href="/get-started/verify" style={linkStyle}>verify the integration</a> and, when you're ready,{" "}
            <a href={result.abTesting.href} style={linkStyle}>
              {result.abTesting.label}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={reset}
            style={{ ...choice(false), fontSize: "0.85em", padding: "4px 12px" }}
          >
            Start over
          </button>
        </div>
      )}
    </div>
  );
};
