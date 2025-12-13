'use client';

import { forwardRef, ButtonHTMLAttributes, useId } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface LiquidGlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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

export const LiquidGlassButton = forwardRef<HTMLButtonElement, LiquidGlassButtonProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const filterId = useId();

    return (
      <>
        <svg width="0" height="0" className="absolute">
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 20 -10
              "
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </svg>

        <motion.button
          ref={ref}
          className={cn(
            'inline-flex items-center justify-center rounded-md border font-medium',
            'backdrop-blur-md bg-background/80 shadow-lg',
            'transition-all duration-300 ease-out',
            'focus:outline-none focus:ring-2 focus:ring-background/50',
            'disabled:pointer-events-none disabled:opacity-50',
            'active:scale-95 active:bg-background/70',
            'relative overflow-hidden',
            variants[variant],
            sizes[size],
            className
          )}
          style={{
            filter: `url(#${filterId})`,
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          {...props}
        >
          {/* Shimmer effect overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{
              x: '100%',
              transition: { duration: 0.7, ease: 'easeOut' },
            }}
          />
          
          {children}
        </motion.button>
      </>
    );
  }
);

LiquidGlassButton.displayName = 'LiquidGlassButton';