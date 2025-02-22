export const getCanonicalUrl = (): string => {
	return process.env.NODE_ENV === "development"
		? "https://localhost:3000"
		: "https://palaeo-fossil-classifier-crimson-sky-9652.fly.dev/";
};
