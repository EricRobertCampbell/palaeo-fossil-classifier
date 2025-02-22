import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "@/app/actions/getUser";
import { addUser } from "@/app/actions/addUser";
import { addUserByEmail } from "@/app/actions/addUserByEmail";
import { getCanonicalUrl } from "@/lib/canonicalUrl";

const providers = [];

/* ------ Google Provider ------ */
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (clientId && clientSecret) {
	providers.push(
		GoogleProvider({
			clientId,
			clientSecret,
		})
	);
}

/* ------ Custom Provider ------ */
providers.push(
	CredentialsProvider({
		// The name to display on the sign in form (e.g. "Sign in with...")
		name: "credentials",
		id: "credentials",
		// `credentials` is used to generate a form on the sign in page.
		// You can specify which fields should be submitted, by adding keys to the `credentials` object.
		// e.g. domain, username, password, 2FA token, etc.
		// You can pass any HTML attribute to the <input> tag through the object.
		credentials: {
			email: {
				required: true,
				label: "Email",
				type: "email",
				placeholder: "jsmith@example.com",
			},
			password: { label: "Password", type: "password", required: true },
		},
		async authorize(credentials, req) {
			// Add logic here to look up the user from the credentials supplied
			console.log({ credentials });
			console.log({ req });
			if (!credentials?.email || !credentials?.password) {
				// If you return null then an error will be displayed advising the user to check their details.
				console.log("No credentials", credentials);
				return null;
			}
			const loginUrl = `${getCanonicalUrl()}/api/login`;
			console.log({ loginUrl });
			const res = await fetch(loginUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(credentials),
			});

			const user = await res.json();

			// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
			// throw new Error("error message"); // Redirect to error page
			if (user) {
				// Any object returned will be saved in `user` property of the JWT
				return user;
			} else {
				// If you return null then an error will be displayed advising the user to check their details.
				return null;
			}
		},
	})
);

const handler = NextAuth({
	providers,
	callbacks: {
		async signIn({ account, profile }) {
			console.log({ account, profile });
			if (account?.provider === "google") {
				// return (
				// 	profile?.email_verified &&
				// 	profile?.email?.endsWith("@example.com")
				// );
				console.log(
					"User is logging in with Google - making sure that the user is in the database"
				);
				if (!profile?.email) {
					return false;
				}
				const existingUser = await getUserByEmail(profile.email);
				if (existingUser) {
					return true;
				} else {
					await addUserByEmail({
						email: profile.email,
					});
				}
			}
			return true; // Do different verification for other providers that don't have `email_verified`
		},
	},
	session: {
		strategy: "jwt",
	},
});

export { handler as GET, handler as POST };
