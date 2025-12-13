import { GlassSurface } from "@/components/ui/GlassSurface";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassPill } from "@/components/ui/GlassPill";

export default function ComponentsPage() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="text-center mb-12">
        <GlassSurface className="inline-block p-6">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Component Library
          </h1>
          <p className="text-foreground/70">
            Explore all available Liquid Glass components
          </p>
        </GlassSurface>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GlassSurface className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Glass Surface</h3>
          <p className="text-foreground/70 text-sm mb-4">
            Base component for creating glass morphism surfaces
          </p>
          <GlassSurface className="p-4">
            Example glass surface
          </GlassSurface>
        </GlassSurface>

        <GlassSurface className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Glass Button</h3>
          <p className="text-foreground/70 text-sm mb-4">
            Interactive button with glass morphism styling
          </p>
          <GlassButton>Click me</GlassButton>
        </GlassSurface>

        <GlassSurface className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Glass Pill</h3>
          <p className="text-foreground/70 text-sm mb-4">
            Pill-shaped component for tags and badges
          </p>
          <div className="flex gap-2">
            <GlassPill>Tag</GlassPill>
            <GlassPill variant="secondary">Secondary</GlassPill>
          </div>
        </GlassSurface>
      </div>
    </div>
  );
}