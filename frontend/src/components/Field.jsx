// Labelled input group (.ig). Wraps any control as children, or renders a
// text/date input when `value`/`onChange` are provided for convenience.
export function Field({ label, required = false, children, ...inputProps }) {
  return (
    <div className="ig">
      <label>
        {label}
        {required && <span style={{ color: '#ef4444' }}> *</span>}
      </label>
      {children ?? <input {...inputProps} />}
    </div>
  )
}

// Section heading used inside report forms.
export function FieldTitle({ children, style }) {
  return <p className="ftitle" style={style}>{children}</p>
}
