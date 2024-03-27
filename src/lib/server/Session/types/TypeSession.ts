
export type Session = {
	data: {
		[key: string]: unknown,
		username: string|null
	};
	lastUpdated: Date;
	sessionId: string;
}