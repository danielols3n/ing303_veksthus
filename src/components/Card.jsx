export default function Card({ title, meta, className = '', children }) {
  return (
    <section className={`card ${className}`}>
      {meta ? (
        <div className="card-header">
          <h2 className="card-title">{title}</h2>
          {meta}
        </div>
      ) : (
        <h2 className="card-title">{title}</h2>
      )}
      {children}
    </section>
  )
}
