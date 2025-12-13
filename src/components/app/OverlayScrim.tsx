'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface OverlayScrimProps {
  isVisible?: boolean;
  intensity?: 'light' | 'medium' | 'strong';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children?: React.ReactNode;
}

const intensityClasses = {
  light: 'bg-background/10',
  medium: 'bg-background/20',
  strong: 'bg-background/30',
};

const blurClasses = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
};

export function OverlayScrim({
  isVisible = false,
  intensity = 'medium',
  blur = 'md',
  className = '',
  children,
}: OverlayScrimProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            'fixed inset-0 pointer-events-auto z-40',
            intensityClasses[intensity],
            blurClasses[blur],
            className
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}