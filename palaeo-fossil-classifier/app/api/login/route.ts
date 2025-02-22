import { getUserByEmail } from "../../actions/getUser";
import { compare } from "bcrypt";
interface RequestBody {
	email: string;
	username: string;
	password: string;
}
export async function POST(request: Request) {
	console.log("start of login post");
	const body = await request.json();
	const data: RequestBody = {
		email: body.email,
		username: body.username,
		password: body.password,
	};
	console.log({ data });
	const user = await getUserByEmail(data.email);
	if (!user.password) {
		return new Response(
			JSON.stringify({
				error: "User exists but password doesn't match. This may be because you initially signed in with Google.",
			}),
			{ status: 401 }
		);
		// throw new Error(
		//
		// );
	}
	console.log({ user });
	const passwordMatches = await compare(data.password, user?.password);
	console.log({ passwordMatches });
	if (user && passwordMatches) {
		const { password, ...userWithoutPassword } = user;
		return new Response(JSON.stringify(userWithoutPassword));
	} else {
		return new Response(JSON.stringify(null));
	}
}
