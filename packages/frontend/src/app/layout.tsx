import "./globals.css";
import { ApolloWrapper } from "./ApolloWrapper";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import Header from "@/components/Header";
import { PublicEnvScript } from 'next-runtime-env';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { CssBaseline } from "@mui/material";
import Layout from "@/components/layout";
import { auth } from "@/auth";
import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] })

interface MySession extends Session {
  sessionToken?: string;
}

export const metadata: Metadata = {
  title: "NextAuth.js Example",
  description:
    "This is an example site to demonstrate how to use NextAuth.js for authentication",
}

export default async function RootLayout({ children }: React.PropsWithChildren) {
  
  const session: MySession = await auth() || {
    expires: '',
    sessionToken: '',
  };
  console.log('mainnn', session);

  return (
    <html lang="en">
      <head>
        <PublicEnvScript />
      </head>
      
      <ApolloWrapper token={ session.sessionToken || '' }>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <body>
              <CssBaseline />
              <Layout>
                { children }
              </Layout>
            </body>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </ApolloWrapper>
    </html>
  )
}
