export const Card = ({ children, className = '', hover = false, padding = 'md' }) => {
  const hoverClass = hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : '';

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={`bg-white rounded-xl shadow-md ${hoverClass} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};