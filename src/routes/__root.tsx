import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { HeroUIProvider } from '@heroui/react'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'QuickFeed - We don\'t let you miss a single inconvenience of your users',
      },
      {
        name: 'description',
        content:
          'QuickFeed intercepts Cmd+Shift+F on your website — capturing user frustration the moment it happens, with screenshots delivered directly to your dashboard.',
      },

      // Open Graph
      {
        property: 'og:title',
        content: 'QuickFeed - We don\'t let you miss a single inconvenience of your users',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://quickfeed.live',
      },
      {
        property: 'og:site_name',
        content: 'QuickFeed',
      },
      {
        property: 'og:image',
        content: 'https://quickfeed.dev/og-image.png',
      },
      {
        property: 'og:image:alt',
        content: 'QuickFeed - Feedbacks gatherer.',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:image',
        content: 'https://www.quickfeed.live/og.png',
      },
      {
        name: 'theme-color',
        content: '#FF8A4C',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
      },

    ],
  }),
  shellComponent: RootDocument,
})

function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 shadow-lg shadow-orange-500/10">
            <span className="text-5xl">🔍</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.04em] text-[#0A0A0A] mb-3">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-[15px] text-neutral-500 leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[14px] font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow duration-200 no-underline"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 8H2M2 8l5-5M2 8l5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Go Home
          </a>
          <a
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-neutral-200 text-[14px] font-semibold text-neutral-700 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 no-underline"
          >
            Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          defer
          data-website-id="69ffa0a600112c87807b"
          data-domain="www.quickfeed.live"
          src="https://www.insightly.live/script.js">
        </script>
      </head>
      <body>
        <HeroUIProvider>
          {children}
        </HeroUIProvider>
        <script
          src="https://www.quickfeed.live/widget.js"
          data-website-id="1ef5b9d4-8256-4c5a-85ce-b119bc9380b8"
          data-position="center"
          data-bg="#ffffff"
          data-blur="true"
          data-overlay="rgba(0,0,0,0.45)"
          data-title-color="#0a0a0a"
          data-desc-color="#737373"
          data-btn-bg="#f97316"
          data-btn-text="#ffffff"
          data-btn2-bg="#f5f5f5"
          data-btn2-text="#555555"
          data-radius="20"
          defer
        />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
