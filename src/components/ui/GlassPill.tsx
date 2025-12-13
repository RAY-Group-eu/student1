'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface GlassPillProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variants = {
  default: 'text-foreground bg-background/80 border-white/30',
  secondary: 'text-secondary-foreground bg-secondary/80 border-white/20',
  accent: 'text-accent-foreground bg-accent/80 border-accent/20',
};

const sizes = {
  sm: 'h-6 px-2 text-xs',
  md: 'h-8 px-3 text-sm',
  lg: 'h-10 px-4 text-base',
};

export const GlassPill = forwardRef<HTMLDivElement, GlassPillProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium',
          'backdrop-blur-md border shadow-md',
          'transition-all duration-300 ease-out',
          'hover:scale-105 hover:shadow-lg',
          variants[variant],
          sizes[size],
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassPill.displayName = 'GlassPill';