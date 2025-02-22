import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOptions {
	expiresIn?: string | number;
}
const DEFAULT_SIGN_OPTIONS: SignOptions = {
	expiresIn: "1h",
};
export function signJwtAccessToken(
	payload: JwtPayload,
	options: SignOptions = {}
): string {
	const JWT_SECRET = process.env.JWT_SECRET;
	if (!JWT_SECRET) {
		throw new Error("JWT_SECRET is not defined");
	}
	const token = jwt.sign(payload, JWT_SECRET, options);
}

export function verifyJwtAccessToken(token: string): JwtPayload | null {
	try {
		const JWT_SECRET = process.env.JWT_SECRET;
		if (!JWT_SECRET) {
			throw new Error("JWT_SECRET is not defined");
		}
		const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
		return decoded;
	} catch (e) {
		console.error(e);
		return null;
	}
}
