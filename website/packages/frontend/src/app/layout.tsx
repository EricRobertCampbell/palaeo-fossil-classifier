import './globals.css'
import './css_variables.css'
import { ApolloWrapper } from './ApolloWrapper'

import type { Metadata } from 'next'
import { PublicEnvScript } from 'next-runtime-env'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'
import { CssBaseline } from '@mui/material'
import Layout from '@/components/layout'
import { auth } from '@/auth'
import { Session } from 'next-auth'
import { cn } from '@/lib/utils'

interface MySession extends Session {
    sessionToken?: string
}

export const metadata: Metadata = {
    title: 'Fossil Classification',
    description:
        'Fossil Classification is a web application where users can detect and classify fossils based on images.',
}

export default async function RootLayout({
    children,
}: React.PropsWithChildren) {
    const session: MySession = (await auth()) || {
        expires: '',
        sessionToken: '',
    }

    return (
        <html lang="en">
            <head>
                <PublicEnvScript />
            </head>

            <ApolloWrapper token={session.sessionToken || ''}>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <body className={cn('')}>
                            <CssBaseline />
                            <Layout>{children}</Layout>
                        </body>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </ApolloWrapper>
        </html>
    )
}
