// StyleBuilder: pick checkout recommendation style tokens, see a live preview of four sample
// product cards and copy the generated configuration JSON.
// Usage in MDX:  import StyleBuilder from "/snippets/style-builder.jsx"  then  <StyleBuilder />
// Only the tokens below are accepted by the checkout recommendations block. The static token
// table on checkout-recommendations/style-builder.mdx lists the same tokens; keep them in sync.

export const description = "Checkout recommendations style builder: layout, columns, show price, button style, accent colour and heading tokens, with a live preview of four product cards and the generated checkoutRecommendations configuration JSON.";

export const StyleBuilder = () => {
  const palette = [
    { id: "indigo", label: "Indigo", hex: "#4F46E5" },
    { id: "emerald", label: "Emerald", hex: "#059669" },
    { id: "rose", label: "Rose", hex: "#E11D48" },
    { id: "amber", label: "Amber", hex: "#B45309" },
    { id: "slate", label: "Slate", hex: "#334155" },
  ];
  const products = [
    { title: "Relaxed linen shirt", price: "$59.00", tint: "#E0E7FF" },
    { title: "Linen camp shirt", price: "$65.00", tint: "#DCFCE7" },
    { title: "Woven sun hat", price: "$34.00", tint: "#FEF3C7" },
    { title: "Canvas tote bag", price: "$28.00", tint: "#FFE4E6" },
  ];

  const [layout, setLayout] = useState("grid");
  const [columns, setColumns] = useState(4);
  const [showPrice, setShowPrice] = useState(true);
  const [buttonStyle, setButtonStyle] = useState("filled");
  const [accentColour, setAccentColour] = useState("indigo");
  const [heading, setHeading] = useState("You might also like");
  const [copied, setCopied] = useState(false);

  const accent = palette.find((p) => p.id === accentColour).hex;
  const cleanHeading = heading.slice(0, 60);

  const config = {
    layout,
    columns,
    showPrice,
    buttonStyle,
    accentColour,
    heading: cleanHeading,
  };
  const json = JSON.stringify({ checkoutRecommendations: config }, null, 2);

  const copy = () => {
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(json).then(done, () => fallbackCopy(done));
    } else {
      fallbackCopy(done);
    }
  };
  const fallbackCopy = (done) => {
    const ta = document.createElement("textarea");
    ta.value = json;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      done();
    } finally {
      document.body.removeChild(ta);
    }
  };

  const ui = "#4F46E5";
  const box = { border: "1px solid rgba(127,127,127,0.3)", borderRadius: "12px", padding: "20px", margin: "16px 0" };
  const label = { display: "block", fontWeight: 500, fontSize: "0.9em", marginBottom: "6px" };
  const field = { marginBottom: "16px" };
  const seg = (selected) => ({
    padding: "5px 14px",
    border: `1px solid ${selected ? ui : "rgba(127,127,127,0.45)"}`,
    background: selected ? ui : "transparent",
    color: selected ? "#ffffff" : "inherit",
    borderRadius: "8px",
    marginRight: "6px",
    cursor: "pointer",
    fontWeight: 500,
  });

  const cardButton = {
    marginTop: "8px",
    width: "100%",
    padding: "6px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 600,
    border: `1.5px solid ${accent}`,
    background: buttonStyle === "filled" ? accent : "#ffffff",
    color: buttonStyle === "filled" ? "#ffffff" : accent,
    cursor: "default",
  };

  const track =
    layout === "grid"
      ? { display: "grid", gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: "10px" }
      : { display: "flex", gap: "10px", overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: "6px" };
  const cardWidth = layout === "carousel" ? { flex: `0 0 calc((100% - ${(columns - 1) * 10}px) / ${columns} * 0.92)`, scrollSnapAlign: "start" } : {};

  return (
    <div style={box} data-component="style-builder">
      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
        <div style={{ flex: "1 1 240px", minWidth: 0 }}>
          <div style={field}>
            <span style={label}>Layout</span>
            {["grid", "carousel"].map((v) => (
              <button key={v} type="button" data-token={`layout-${v}`} aria-pressed={layout === v} style={seg(layout === v)} onClick={() => setLayout(v)}>
                {v === "grid" ? "Grid" : "Carousel"}
              </button>
            ))}
          </div>

          <div style={field}>
            <label style={label} htmlFor="sb-columns">
              Columns: {columns}
            </label>
            <input
              id="sb-columns"
              data-token="columns"
              type="range"
              min="2"
              max="4"
              step="1"
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
              style={{ width: "100%", accentColor: ui }}
            />
          </div>

          <div style={field}>
            <span style={label}>Show price</span>
            {[true, false].map((v) => (
              <button key={String(v)} type="button" data-token={`showPrice-${v}`} aria-pressed={showPrice === v} style={seg(showPrice === v)} onClick={() => setShowPrice(v)}>
                {v ? "On" : "Off"}
              </button>
            ))}
          </div>

          <div style={field}>
            <span style={label}>Button style</span>
            {["filled", "outline"].map((v) => (
              <button key={v} type="button" data-token={`buttonStyle-${v}`} aria-pressed={buttonStyle === v} style={seg(buttonStyle === v)} onClick={() => setButtonStyle(v)}>
                {v === "filled" ? "Filled" : "Outline"}
              </button>
            ))}
          </div>

          <div style={field}>
            <span style={label}>Accent colour</span>
            <div role="radiogroup" aria-label="Accent colour" style={{ display: "flex", gap: "8px" }}>
              {palette.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={accentColour === p.id}
                  aria-label={p.label}
                  title={p.label}
                  data-token={`accentColour-${p.id}`}
                  onClick={() => setAccentColour(p.id)}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "9999px",
                    background: p.hex,
                    cursor: "pointer",
                    border: "2px solid #ffffff",
                    boxShadow: accentColour === p.id ? `0 0 0 2px ${p.hex}` : "0 0 0 1px rgba(127,127,127,0.45)",
                  }}
                />
              ))}
            </div>
          </div>

          <div style={field}>
            <label style={label} htmlFor="sb-heading">
              Heading text
            </label>
            <input
              id="sb-heading"
              data-token="heading"
              type="text"
              maxLength={60}
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              style={{
                width: "100%",
                padding: "6px 10px",
                borderRadius: "8px",
                border: "1px solid rgba(127,127,127,0.45)",
                background: "transparent",
                color: "inherit",
              }}
            />
          </div>
        </div>

        <div style={{ flex: "2 1 320px", minWidth: 0 }}>
          <span style={label}>Preview</span>
          <div
            data-preview="style-builder"
            data-layout={layout}
            data-columns={columns}
            style={{ background: "#ffffff", color: "#111827", borderRadius: "10px", padding: "16px", border: "1px solid #E5E7EB" }}
          >
            <div data-preview-heading style={{ fontWeight: 700, fontSize: "15px", marginBottom: "12px", color: "#111827" }}>
              {cleanHeading || " "}
            </div>
            <div style={track}>
              {products.map((p) => (
                <div
                  key={p.title}
                  data-preview-card
                  style={{ border: "1px solid #E5E7EB", borderRadius: "8px", padding: "8px", background: "#ffffff", minWidth: 0, ...cardWidth }}
                >
                  <div style={{ background: p.tint, borderRadius: "6px", aspectRatio: "1 / 1", marginBottom: "8px" }} />
                  <div style={{ fontSize: "12px", fontWeight: 600, lineHeight: 1.3, color: "#111827" }}>{p.title}</div>
                  {showPrice && (
                    <div data-preview-price style={{ fontSize: "12px", color: "#4B5563", marginTop: "2px" }}>
                      {p.price}
                    </div>
                  )}
                  <button type="button" tabIndex={-1} style={cardButton} data-preview-button>
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "16px 0 6px" }}>
            <span style={{ ...label, marginBottom: 0 }}>Configuration JSON</span>
            <button type="button" data-copy="style-builder" onClick={copy} style={{ ...seg(false), fontSize: "0.85em", padding: "3px 12px", marginRight: 0 }}>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre
            data-output="style-builder"
            style={{
              margin: 0,
              padding: "12px",
              borderRadius: "8px",
              background: "#0F172A",
              color: "#E2E8F0",
              fontSize: "12.5px",
              overflowX: "auto",
              whiteSpace: "pre",
            }}
          >
            <code style={{ color: "#E2E8F0", background: "transparent", padding: 0, fontSize: "inherit" }}>{json}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
