export default function PageHeading({ title, children, actions }) {
  return (
    <div className="page-heading">
      <div>
        <h1>{title}</h1>
        {children && <p>{children}</p>}
      </div>
      {actions}
    </div>
  )
}
