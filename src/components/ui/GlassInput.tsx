'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'search';
}

const variants = {
  default: 'text-foreground placeholder:text-foreground/60',
  search: 'text-foreground placeholder:text-foreground/40',
};

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, variant = 'default', type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border px-3 py-2 text-sm',
          'backdrop-blur-md bg-background/80 border-white/30',
          'transition-all duration-200 ease-out',
          'focus:bg-background/90 focus:border-white/40 focus:shadow-lg',
          'focus:outline-none focus:ring-2 focus:ring-background/50',
          variants[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

GlassInput.displayName = 'GlassInput';