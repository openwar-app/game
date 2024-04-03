
export type Session = {
	data: {
		[key: string]: unknown,
		userid: string|null
	};
	lastUpdated: Date;
	sessionId: string;
}