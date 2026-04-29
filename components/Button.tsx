'use client'

interface ButtonProps {
  label:      string
  hoverLabel: string
  href?:      string
  target?:    string
  onClick?:   () => void
  variant?:   'default' | 'ghost' | 'burgundy'
  className?: string
}

export default function Button({
  label, hoverLabel, href, target, onClick, variant = 'default', className = '',
}: ButtonProps) {
  const variantClass =
    variant === 'ghost'    ? ' btn-ghost' :
    variant === 'burgundy' ? ' btn-burgundy' : ''

  const content = (
    <>
      <span className="label">
        <span className="from">{label}</span>
        <span className="to">{hoverLabel}</span>
      </span>
      <span className="arrow">→</span>
    </>
  )

  if (href) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}
         className={`btn${variantClass} ${className}`}>
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={`btn${variantClass} ${className}`}>
      {content}
    </button>
  )
}
