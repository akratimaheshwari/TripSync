export const ProgressBar = ({
  value,
  max,
  label,
  showPercentage = true,
  color = 'blue',
  size = 'md',
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const colors = {
    blue: 'bg-gradient-to-r from-blue-500 to-teal-500',
    green: 'bg-gradient-to-r from-green-500 to-emerald-500',
    yellow: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    red: 'bg-gradient-to-r from-red-500 to-pink-500',
  };

  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-semibold text-gray-600">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`${colors[color]} ${sizes[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};