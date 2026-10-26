import React from 'react';
import { cn } from '../../utils/helpers';

/**
 * Reusable Atomic Input Component with RTL support
 */
export const Input = React.forwardRef(
  (
    {
      label,
      error,
      helperText,
      icon: Icon,
      className = '',
      id,
      name,
      ...props
    },
    ref
  ) => {
    const inputId = id || name || Math.random().toString(36).substring(7);

    return (
      <div className="w-full text-right font-cairo">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-semibold text-slate-700 mb-1.5">
            {label}
          </label>
        )}

        <div className="relative rounded-xl shadow-sm">
          {Icon && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
              <Icon className="w-5 h-5" />
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            name={name}
            className={cn(
              'block w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 transition-all duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-2',
              Icon ? 'pr-11 pl-4' : 'px-4',
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                : 'border-slate-200 focus:border-brand-orange focus:ring-brand-orange/20',
              className
            )}
            {...props}
          />
        </div>

        {error ? (
          <p className="mt-1.5 text-xs text-red-600 font-medium">{error}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
