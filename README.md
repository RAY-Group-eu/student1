# Liquid Glass Design System

A fresh Next.js 14 App Router project with TypeScript, featuring a beautiful Liquid Glass design system built with Tailwind CSS, shadcn/ui, TanStack Query, Framer Motion, Three.js, and Supabase.

## 🚀 Features

- **Next.js 14** - Latest App Router with Server Components
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Utility-first CSS framework with custom Liquid Glass components
- **shadcn/ui** - High-quality, accessible UI components
- **Framer Motion** - Production-ready motion library for animations
- **TanStack Query** - Powerful data synchronization for React
- **Three.js** - 3D graphics and shader animations
- **Supabase** - Complete backend-as-a-service platform
- **Liquid Glass Design System** - Custom glass morphism design primitives

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables
- **UI Components**: shadcn/ui + Custom Liquid Glass Components
- **Animations**: Framer Motion
- **Data**: TanStack Query
- **3D Graphics**: Three.js + React Three Fiber
- **Backend**: Supabase
- **Icons**: Lucide React (via shadcn/ui)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with Liquid Glass design tokens
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage with component showcase
│   └── components/        # Route-specific components
│       └── page.tsx       # Components library page
├── components/
│   ├── ui/               # Primitive UI components
│   │   ├── GlassSurface.tsx
│   │   ├── GlassButton.tsx
│   │   ├── GlassInput.tsx
│   │   ├── GlassPill.tsx
│   │   └── LiquidGlassButton.tsx
│   └── app/              # App-specific components
│       ├── FullScreenShader.tsx
│       ├── TubeLightNavbar.tsx
│       └── OverlayScrim.tsx
├── contexts/             # React Context Providers
│   ├── settings-context.tsx
│   └── i18n-context.tsx
├── lib/                  # Utility functions
│   └── utils.ts          # shadcn/ui utilities
└── supabase/            # Supabase configuration
    └── client.ts         # Supabase client setup
```

## 🎨 Liquid Glass Design System

### Design Tokens

The system uses CSS custom properties for theming:

```css
:root {
  --glass-intensity: 0.1;
  --glass-blur: 8px;
  --glass-saturation: 180%;
  --background-primary: oklch(0.98 0 0);
  --glass-border-light: oklch(1 0 0 / 20%);
  /* ... more tokens */
}
```

### Component Architecture

#### Primitive Components (UI Layer)
- **GlassSurface** - Base component for glass morphism surfaces
- **GlassButton** - Interactive button with glass effects
- **GlassInput** - Input fields with glass styling
- **GlassPill** - Pill-shaped components for tags/badges
- **LiquidGlassButton** - Button with advanced SVG filter effects

#### Application Components (App Layer)
- **FullScreenShader** - Canvas-based shader animation background
- **TubeLightNavbar** - Navigation bar with glass morphism
- **OverlayScrim** - Overlay layer for modals/dialogs

### Glass Effects Classes

```css
@layer components {
  .glass-surface { /* Base glass effect */ }
  .glass-button { /* Interactive glass button */ }
  .glass-input { /* Glass input field */ }
  .glass-pill { /* Glass pill/badge */ }
  .liquid-glass-button { /* Advanced liquid glass effect */ }
}
```

## 🏗️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎭 Animation System

### Settings Context
The app includes a global settings context for managing:
- Animation speed (`settings.animationSpeed`)
- Glass intensity (`settings.glassIntensity`)
- Theme preference (`settings.theme`)
- Locale (`settings.locale`)

### Shader Animation
The `FullScreenShader` component provides:
- Canvas-based shader animations
- Configurable speed via props
- Integration with settings context
- Performance optimized rendering

## 🌐 Internationalization

Includes a basic i18n context stub that can be extended with:
- Translation dictionaries
- Language switching
- RTL support
- Date/time formatting

## 🎯 Component Usage

### GlassSurface
```tsx
<GlassSurface intensity="medium" blur="md" className="p-6">
  Content with glass effect
</GlassSurface>
```

### GlassButton
```tsx
<GlassButton variant="default" size="md">
  Click me
</GlassButton>
```

### LiquidGlassButton
```tsx
<LiquidGlassButton variant="primary">
  Liquid Effect Button
</LiquidGlassButton>
```

## 🔧 Configuration

### Environment Variables
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_DEFAULT_ANIMATION_SPEED=1
NEXT_PUBLIC_DEFAULT_GLASS_INTENSITY=0.1
NEXT_PUBLIC_DEFAULT_THEME=system
```

### Supabase Setup
1. Create a project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key
3. Add them to `.env.local`
4. Run database migrations as needed

## 🚀 Deployment

The project is ready for deployment on:
- Vercel (recommended)
- Netlify
- Any platform supporting Next.js

## 🤝 Contributing

1. Follow the existing code style
2. Use TypeScript for all new code
3. Test components with the Liquid Glass design system
4. Maintain accessibility standards
5. Update documentation for new features

## 📝 License

This project is part of the student1 repository setup.

---

Built with ❤️ using Next.js 14, TypeScript, and modern web technologies.