type MetricCardProps = {
  label: string
  field: string
  value: string
  detail: string
  accent: 'purple' | 'green' | 'orange' | 'blue'
}

function MetricCard({
  label,
  field,
  value,
  detail,
  accent,
}: MetricCardProps) {
  return (
    <article className={`metric-card metric-card-${accent}`}>
      <p className="metric-label">{label}</p>

      {/* These values are deliberately ordinary DOM text nodes for the DevTools exercise. */}
      <p className="metric-value" data-demo-field={field}>
        {value}
      </p>

      <p className="metric-detail">{detail}</p>
    </article>
  )
}

export default MetricCard