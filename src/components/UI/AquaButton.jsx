export function AquaButton({ children, primary, onClick, disabled, className = '' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`aqua-button ${primary ? 'aqua-button-primary' : ''} ${className}`}
    >
      {children}
    </button>
  );
}
