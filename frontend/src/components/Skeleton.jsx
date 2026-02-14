export const Skeleton = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
}) => {
  const baseStyles = 'animate-pulse bg-gray-300';

  const variants = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style = {
    width: width || (variant === 'circular' ? '40px' : '100%'),
    height: height || (variant === 'text' ? '16px' : '100px'),
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={style}
    />
  );
};

export const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
    <Skeleton variant="rectangular" height="200px" />
    <Skeleton variant="text" width="70%" />
    <Skeleton variant="text" width="50%" />
  </div>
);