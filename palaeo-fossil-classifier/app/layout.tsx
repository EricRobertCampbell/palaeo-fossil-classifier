import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./variables.css";
import Link from "next/link";
import logo from "../public/logo.png";
import Image from "next/image";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Palaeo Fossil Identifier",
  description: "Helping to idenfity microfossils",
};

const navComponents = [
  { title: "Home", href: "/" },
  {
    title: "Identify",
    href: "/identify",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Login",
    href: "/login",
  },
  {
    title: "Register",
    href: "/register",
  },
];
const NavComponent = () => {
  return (
    <nav className="nav">
      <Link href={"/"}>
        <Image
          src={logo}
          alt="logo"
          width={60}
          height={60}
          style={{ borderRadius: 20 }}
        />
      </Link>
      <ul className="list">
        {navComponents.map(({ title, href }) => {
          return (
            <li key={title}>
              <Link href={href}>{title}</Link>
            </li>
          );
        })}
      </ul>
      <button className="menu">Menu</button>
    </nav>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NavComponent />
        {children}
      </body>
    </html>
  );
}
