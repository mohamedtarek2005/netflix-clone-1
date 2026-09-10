export default function Button({ children, variant = 'primary', ...props }) {
  const styles = {
    primary: { background: 'var(--accent)', color: '#fff' },
    secondary: { background: '#333', color: '#fff' },
    ghost: { background: 'transparent', color: '#fff', border: '1px solid #555' }
  };

  return (
    <button
      {...props}
      style={{
        padding: '10px 20px',
        borderRadius: 4,
        border: 'none',
        fontWeight: 600,
        ...styles[variant],
        ...props.style
      }}
    >
      {children}
    </button>
  );
}
