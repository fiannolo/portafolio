export function AquaTextField({
  value,
  onChange,
  placeholder,
  type = 'text',
  className = '',
  ...props
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-2 py-1 rounded border border-gray-300 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${className}`}
      {...props}
    />
  );
}
