// "Added in" badge.
// Usage in MDX:  import { Since } from "/snippets/since.jsx";  then  <Since sdk="connector" v="3.0.15" />
// Renders the plain text "Added in connector 3.0.15".
export const Since = ({ sdk, v }) => (
  <span
    className="since-badge"
    title={`Added in ${sdk} ${v}`}
    style={{
      fontSize: "0.75em",
      padding: "1px 6px",
      borderRadius: "9999px",
      border: "1px solid currentColor",
      marginLeft: "4px",
      whiteSpace: "nowrap",
    }}
  >
    Added in {sdk} {v}
  </span>
);
