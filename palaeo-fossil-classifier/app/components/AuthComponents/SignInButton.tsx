"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import { Button } from "../Button";
export const SignInButton = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <Button
        onClick={() => {
          signOut();
          console.log("Signed Out");
        }}
      >
        Sign Out
      </Button>
    );
  }
  return (
    <Button
      onClick={() => {
        signIn();
        console.log("Signed In");
      }}
    >
      Sign In
    </Button>
  );
};
