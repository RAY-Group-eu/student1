import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SettingsProvider } from "@/contexts/settings-context";
import { I18nProvider } from "@/contexts/i18n-context";
import { FullScreenShader } from "@/components/app/FullScreenShader";
import { TubeLightNavbar } from "@/components/app/TubeLightNavbar";
import { OverlayScrim } from "@/components/app/OverlayScrim";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

export const metadata: Metadata = {
  title: "Liquid Glass App",
  description: "Next.js 14 App with Liquid Glass Design System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        <QueryClientProvider client={queryClient}>
          <SettingsProvider>
            <I18nProvider>
              {/* Global background shader animation */}
              <FullScreenShader speed={1} />
              
              {/* Overlay scrim layer */}
              <OverlayScrim isVisible={false} />
              
              {/* Navigation */}
              <TubeLightNavbar
                logo={
                  <div className="text-xl font-bold text-foreground">
                    Liquid Glass
                  </div>
                }
                navItems={[
                  { label: "Home", href: "/" },
                  { label: "Components", href: "/components" },
                  { label: "About", href: "/about" },
                ]}
                actions={
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-foreground/70">
                      Theme
                    </div>
                  </div>
                }
              />
              
              {/* Main content */}
              <main className="relative z-10 pt-32">
                {children}
              </main>
              
              {/* React Query DevTools (development only) */}
              <ReactQueryDevtools initialIsOpen={false} />
            </I18nProvider>
          </SettingsProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
