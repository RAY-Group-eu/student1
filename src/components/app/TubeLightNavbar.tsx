'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassPill } from '@/components/ui/GlassPill';

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface TubeLightNavbarProps {
  logo?: React.ReactNode;
  navItems?: NavItem[];
  actions?: React.ReactNode;
  className?: string;
}

export function TubeLightNavbar({
  logo,
  navItems = [],
  actions,
  className = '',
}: TubeLightNavbarProps) {
  const [activeItem, setActiveItem] = useState(navItems.find(item => item.active)?.href || '/');

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <GlassSurface
        intensity="medium"
        blur="xl"
        className="mx-4 mt-4 px-6 py-4 border-b border-white/20"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            {logo && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {logo}
              </motion.div>
            )}
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <GlassPill
                key={item.href}
                variant={activeItem === item.href ? 'default' : 'secondary'}
                className="cursor-pointer transition-all duration-300"
                onClick={() => setActiveItem(item.href)}
              >
                {item.label}
              </GlassPill>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {actions}
            <GlassButton variant="ghost" size="sm">
              Menu
            </GlassButton>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <GlassPill
                key={item.href}
                variant={activeItem === item.href ? 'default' : 'secondary'}
                size="sm"
                className="cursor-pointer"
                onClick={() => setActiveItem(item.href)}
              >
                {item.label}
              </GlassPill>
            ))}
          </div>
        </div>
      </GlassSurface>
    </motion.nav>
  );
}