export default function ErrorMessage({ message }) { if (!message) return null; return <div className="error-state"><strong>Something went wrong</strong><span>{message}</span></div>; }
