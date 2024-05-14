import Header from "./Header";
import Footer from "./footer";
import type { ReactNode } from "react";
import UserButton from "./user-button";
import { MainNav } from "./main-nav";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <UserButton />
      <MainNav />
      <Header />
        { children }
      <Footer />
    </>
  )
}
