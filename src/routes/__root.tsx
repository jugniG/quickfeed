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
