import React from 'react';
import { cn } from '../../utils/helpers';

const BADGE_VARIANTS = {
  orange: 'bg-brand-orange text-white',
  orangeLight: 'bg-orange-50 text-brand-orange border border-orange-200',
  navy: 'bg-brand-navy text-white',
  blue: 'bg-blue-50 text-blue-700 border border-blue-200',
  green: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  slate: 'bg-slate-100 text-slate-700 border border-slate-200',
};

/**
 * Reusable Atomic Badge Component
 */
export const Badge = ({
  children,
  variant = 'orange',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md font-medium',
    md: 'text-xs px-2.5 py-1 rounded-lg font-semibold',
    lg: 'text-sm px-3.5 py-1.5 rounded-xl font-bold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-cairo select-none tracking-wide transition-colors',
        BADGE_VARIANTS[variant] || BADGE_VARIANTS.orange,
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
