// RecipeFilter: filter the recipes by SDK and store type.
// Usage in MDX:  import RecipeFilter from "/snippets/recipe-filter.jsx"  then  <RecipeFilter />
// The recipe list here mirrors the cards and frontmatter on recipes/*.mdx; keep them in sync.

export const description = "Recipe filter: narrow the recipes by SDK (full stack, headless) and store type (Liquid, Hydrogen, custom front end).";

export const RecipeFilter = () => {
  const recipes = [
    {
      title: "Colour swatches",
      href: "/recipes/colour-swatches",
      summary: "Render the colour filter and product tiles with swatches.",
      sdks: ["full-stack"],
      version: "Full stack 3.x",
      paths: ["liquid", "hydrogen", "custom-frontend"],
    },
    {
      title: "Similar products on the product page",
      href: "/recipes/similar-products-pdp",
      summary: "Fetch a similar-products strip with the Connector and render it yourself.",
      sdks: ["headless"],
      version: "Headless 3.x",
      paths: ["hydrogen", "custom-frontend", "liquid"],
    },
    {
      title: "Lazy widget initialisation",
      href: "/recipes/lazy-widget-init",
      summary: "Initialise widgets only when their container scrolls into view.",
      sdks: ["full-stack"],
      version: "Full stack 3.x",
      paths: ["liquid", "custom-frontend"],
    },
    {
      title: "Multi-market stores",
      href: "/recipes/multi-market",
      summary: "Set the market, currency and URLs for Shopify Markets.",
      sdks: ["full-stack", "headless"],
      version: "Full stack 3.x, Headless 3.x",
      paths: ["liquid", "hydrogen", "custom-frontend"],
    },
  ];
  const sdkOptions = [
    { id: "all", label: "Any SDK" },
    { id: "full-stack", label: "Full stack" },
    { id: "headless", label: "Headless" },
  ];
  const pathOptions = [
    { id: "all", label: "Any store" },
    { id: "liquid", label: "Liquid" },
    { id: "hydrogen", label: "Hydrogen" },
    { id: "custom-frontend", label: "Custom front end" },
  ];
  const [sdk, setSdk] = useState("all");
  const [path, setPath] = useState("all");

  const shown = recipes.filter(
    (r) => (sdk === "all" || r.sdks.includes(sdk)) && (path === "all" || r.paths.includes(path))
  );

  const ui = "#4F46E5";
  const chip = (selected) => ({
    padding: "4px 12px",
    borderRadius: "9999px",
    border: `1px solid ${selected ? ui : "rgba(127,127,127,0.45)"}`,
    background: selected ? ui : "transparent",
    color: selected ? "#ffffff" : "inherit",
    fontSize: "0.85em",
    fontWeight: 500,
    cursor: "pointer",
    margin: "0 6px 6px 0",
  });

  return (
    <div data-component="recipe-filter" style={{ margin: "16px 0" }}>
      <div style={{ marginBottom: "4px" }}>
        {sdkOptions.map((o) => (
          <button key={o.id} type="button" data-filter={`sdk-${o.id}`} aria-pressed={sdk === o.id} style={chip(sdk === o.id)} onClick={() => setSdk(o.id)}>
            {o.label}
          </button>
        ))}
      </div>
      <div style={{ marginBottom: "12px" }}>
        {pathOptions.map((o) => (
          <button key={o.id} type="button" data-filter={`path-${o.id}`} aria-pressed={path === o.id} style={chip(path === o.id)} onClick={() => setPath(o.id)}>
            {o.label}
          </button>
        ))}
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {shown.map((r) => (
          <li key={r.href} data-recipe style={{ border: "1px solid rgba(127,127,127,0.3)", borderRadius: "10px", padding: "10px 14px", marginBottom: "8px" }}>
            <a href={r.href} style={{ fontWeight: 600, color: "#6366F1" }}>
              {r.title}
            </a>
            <div style={{ fontSize: "0.9em", margin: "2px 0" }}>{r.summary}</div>
            <div style={{ fontSize: "0.78em", opacity: 0.7 }}>
              {r.version} · {r.paths.join(", ")}
            </div>
          </li>
        ))}
        {shown.length === 0 && <li style={{ opacity: 0.75 }}>No recipe matches both filters yet.</li>}
      </ul>
    </div>
  );
};
