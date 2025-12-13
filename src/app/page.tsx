import { GlassSurface } from "@/components/ui/GlassSurface";
import { GlassButton } from "@/components/ui/GlassButton";
import { LiquidGlassButton } from "@/components/ui/LiquidGlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import { GlassPill } from "@/components/ui/GlassPill";

export default function Home() {
  return (
    <div className="container mx-auto px-4 pb-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <GlassSurface className="inline-block p-8 mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Liquid Glass Design System
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            A beautiful, modern UI component library built for Next.js 14 with 
            TypeScript, featuring glass morphism design patterns and smooth animations.
          </p>
        </GlassSurface>
      </div>

      {/* Components Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        
        {/* Glass Buttons */}
        <GlassSurface className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Glass Buttons</h3>
          <div className="space-y-3">
            <GlassButton variant="default" className="w-full">
              Default Button
            </GlassButton>
            <GlassButton variant="secondary" className="w-full">
              Secondary Button
            </GlassButton>
            <GlassButton variant="destructive" className="w-full">
              Destructive Button
            </GlassButton>
            <GlassButton variant="ghost" className="w-full">
              Ghost Button
            </GlassButton>
          </div>
        </GlassSurface>

        {/* Liquid Glass Button */}
        <GlassSurface className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Liquid Glass Button</h3>
          <div className="space-y-3">
            <LiquidGlassButton className="w-full">
              Liquid Glass Effect
            </LiquidGlassButton>
            <LiquidGlassButton variant="secondary" className="w-full">
              Secondary Liquid
            </LiquidGlassButton>
            <LiquidGlassButton variant="ghost" className="w-full">
              Ghost Liquid
            </LiquidGlassButton>
          </div>
        </GlassSurface>

        {/* Input Components */}
        <GlassSurface className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Input Components</h3>
          <div className="space-y-3">
            <GlassInput placeholder="Default input..." />
            <GlassInput variant="search" placeholder="Search input..." />
            <GlassInput type="password" placeholder="Password input..." />
          </div>
        </GlassSurface>

        {/* Glass Pills */}
        <GlassSurface className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Glass Pills</h3>
          <div className="flex flex-wrap gap-2">
            <GlassPill variant="default">Default</GlassPill>
            <GlassPill variant="secondary">Secondary</GlassPill>
            <GlassPill variant="accent">Accent</GlassPill>
            <GlassPill size="sm">Small</GlassPill>
            <GlassPill size="lg">Large</GlassPill>
          </div>
        </GlassSurface>

        {/* Glass Surfaces */}
        <GlassSurface className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Glass Surfaces</h3>
          <div className="space-y-3">
            <GlassSurface intensity="light" blur="sm" className="p-3">
              Light Surface
            </GlassSurface>
            <GlassSurface intensity="medium" blur="md" className="p-3">
              Medium Surface
            </GlassSurface>
            <GlassSurface intensity="strong" blur="lg" className="p-3">
              Strong Surface
            </GlassSurface>
          </div>
        </GlassSurface>

        {/* Sizes */}
        <GlassSurface className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Button Sizes</h3>
          <div className="space-y-3">
            <GlassButton size="sm" className="w-full">Small Button</GlassButton>
            <GlassButton size="md" className="w-full">Medium Button</GlassButton>
            <GlassButton size="lg" className="w-full">Large Button</GlassButton>
          </div>
        </GlassSurface>
      </div>

      {/* Features Section */}
      <GlassSurface className="p-8 mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">🎨 Glass Morphism Design</h4>
            <p className="text-foreground/70">
              Beautiful glass-like interfaces with backdrop blur and transparency effects.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">⚡ Framer Motion</h4>
            <p className="text-foreground/70">
              Smooth animations and transitions powered by Framer Motion.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">🛠️ TypeScript</h4>
            <p className="text-foreground/70">
              Full TypeScript support with comprehensive type definitions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">🎭 Responsive Design</h4>
            <p className="text-foreground/70">
              Mobile-first responsive design that works on all devices.
            </p>
          </div>
        </div>
      </GlassSurface>

      {/* Status */}
      <div className="text-center">
        <GlassPill variant="accent">
          🚀 Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion + Three.js + Supabase
        </GlassPill>
      </div>
    </div>
  );
}
