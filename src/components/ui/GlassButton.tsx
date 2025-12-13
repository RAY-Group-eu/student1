'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variants = {
  default: 'text-foreground hover:bg-background/90 border-white/30',
  secondary: 'text-secondary-foreground hover:bg-secondary/80 border-white/20',
  destructive: 'text-destructive hover:bg-destructive/80 border-destructive/20',
  ghost: 'hover:bg-background/70 border-white/10',
};

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
};

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md border font-medium',
          'backdrop-blur-md bg-background/80 shadow-lg',
          'transition-all duration-300 ease-out',
          'focus:outline-none focus:ring-2 focus:ring-background/50',
          'disabled:pointer-events-none disabled:opacity-50',
          'active:scale-95 active:bg-background/70',
          variants[variant],
          sizes[size],
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

GlassButton.displayName = 'GlassButton';