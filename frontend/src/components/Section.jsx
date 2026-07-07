// Standard content section with a title and subtitle.
export function Section({ title, subtitle, children }) {
  return (
    <section className="sec on">
      <h1>{title}</h1>
      {subtitle && <p className="sub">{subtitle}</p>}
      {children}
    </section>
  )
}
