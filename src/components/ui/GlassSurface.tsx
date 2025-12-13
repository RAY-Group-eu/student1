'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: 'light' | 'medium' | 'strong';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const intensityClasses = {
  light: 'bg-background/60 border-white/20',
  medium: 'bg-background/80 border-white/30',
  strong: 'bg-background/90 border-white/40',
};

const blurClasses = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
};

export const GlassSurface = forwardRef<HTMLDivElement, GlassSurfaceProps>(
  ({ className, intensity = 'medium', blur = 'md', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border shadow-lg transition-all duration-300',
          intensityClasses[intensity],
          blurClasses[blur],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassSurface.displayName = 'GlassSurface';