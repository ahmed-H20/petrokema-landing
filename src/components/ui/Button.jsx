import React from 'react';
import { cn } from '../../utils/helpers';
import { Loader2, ArrowLeft } from 'lucide-react';

const VARIANTS = {
  primary:
    'bg-brand-orange text-white hover:bg-brand-orange-hover shadow-md hover:shadow-lg focus-visible:ring-brand-orange/50 active:scale-[0.98]',
  navy:
    'bg-brand-navy text-white hover:bg-brand-navy-light shadow-md hover:shadow-lg focus-visible:ring-brand-navy/50 active:scale-[0.98]',
  outline:
    'border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white focus-visible:ring-brand-orange/50 active:scale-[0.98]',
  white:
    'bg-white text-brand-navy hover:bg-slate-100 shadow-md hover:shadow-lg focus-visible:ring-white/50 active:scale-[0.98]',
  ghost:
    'text-slate-700 hover:bg-slate-100 hover:text-brand-orange focus-visible:ring-slate-300',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs font-semibold rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm font-bold rounded-xl gap-2',
  lg: 'px-7 py-3 text-base font-bold rounded-2xl gap-2.5',
};

/**
 * Reusable Accessible Button Component
 */
export const Button = React.forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      showArrow = false,
      className = '',
      disabled = false,
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-200 select-none outline-none font-cairo disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
          VARIANTS[variant] || VARIANTS.primary,
          SIZES[size] || SIZES.md,
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        <span>{children}</span>
        {showArrow && !isLoading && (
          <ArrowLeft className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-1" />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
