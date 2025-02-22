import { getUserByEmail } from "../../actions/getUser";
import * as bcrypt from "bcrypt";
interface RequestBody {
	username: string;
	password: string;
}
export async function POST(request: Request) {
	const body = await request.json();
	const data: RequestBody = {
		username: body.username,
		password: body.password,
	};
	console.log({ data });
	const user = await getUserByEmail(data.username);
	console.log({ user });
	const passwordMatches = await bcrypt.compare(data.password, user?.password);
	console.log({ passwordMatches });
	if (user && passwordMatches) {
		const { password, ...userWithoutPassword } = user;
		return new Response(JSON.stringify(userWithoutPassword));
	} else {
		return new Response(JSON.stringify(null));
	}
}
