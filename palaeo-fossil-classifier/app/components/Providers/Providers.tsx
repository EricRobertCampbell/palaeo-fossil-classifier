"use client";
import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps extends PropsWithChildren<{}> {}

export const Providers = ({ children }: ProvidersProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
