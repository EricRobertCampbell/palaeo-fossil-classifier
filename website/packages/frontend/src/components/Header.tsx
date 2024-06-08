import classes from "./header.module.css";
import Link from "next/link";
import { auth } from "@/auth";
import { SignIn, SignOut } from "./auth-components";
import { UserButton } from "./UserButton";

const navItems: Array<{ to: string; title: string }> = [
  { to: "/", title: "Home" },
  { to: "/about", title: "About" },
  { to: "/leaderboard", title: "Leaderboard" },
  { to: "/admin", title: "Admin" },
  {
    to: "/classify",
    title: "Classify",
  },
];
export default async function Header() {
  const result = await auth();
  return (
    <header className={classes.header}>
      {!result ? <SignIn /> : null}
      {result?.user ? (
        <>
          <UserButton user={result.user} />
          <SignOut />
        </>
      ) : null}
      <nav className={classes.nav}>
        {navItems.map(({ to, title }) => (
          <Link key={to} href={to}>
            {title}
          </Link>
        ))}
      </nav>
    </header>
  );
}
