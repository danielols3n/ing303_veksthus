// Enkle strek-ikoner (24×24). Dekorative som standard; send inn label for å gi dem en tekst.
const paths = {
  house: (
    <>
      <path d="M3 21V10l9-6 9 6v11" />
      <path d="M3 21h18" />
      <path d="M9 21v-6h6v6" />
    </>
  ),
  chevronDown: <path d="m6 9 6 6 6-6" />,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  box: (
    <>
      <path d="M21 8 12 3 3 8v8l9 5 9-5z" />
      <path d="M3 8l9 5 9-5" />
      <path d="M12 13v8" />
    </>
  ),
  alertCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </>
  ),
  arrowUp: (
    <>
      <path d="M12 3v12" />
      <path d="m6 9 6-6 6 6" />
      <path d="M5 21h14" />
    </>
  ),
}

export default function Icon({ name, size = 20, color = 'currentColor', label }) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true' }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...a11y}
    >
      {paths[name]}
    </svg>
  )
}
