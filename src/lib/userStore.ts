export type User = {
	id: string;
	fullName: string;
	email: string;
	role: string;
	createdAt: Date;
};

// In-memory user store for testing purposes only
const users: User[] = [];

export function addUser(partial: { fullName: string; email: string; role: string }): User {
	const newUser: User = {
		id: crypto.randomUUID(),
		fullName: partial.fullName,
		email: partial.email,
		role: partial.role,
		createdAt: new Date(),
	};
	users.unshift(newUser);
	return newUser;
}

export function getUsers(): ReadonlyArray<User> {
	return users;
}

export function clearUsers(): void {
	users.splice(0, users.length);
}
