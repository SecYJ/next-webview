import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addUser } from "@/lib/userStore";
import { redirect } from "next/navigation";

async function createUser(formData: FormData) {
	"use server";
	const fullName = String(formData.get("fullName") || "").trim();
	const email = String(formData.get("email") || "").trim();
	const role = String(formData.get("role") || "").trim();

	if (!fullName || !email || !role) {
		// Basic guard for test purposes
		return;
	}

	addUser({ fullName, email, role });
	redirect("/dashboard");
}

export default function Page() {
	return (
		<div className="space-y-6">
			<h1 className="text-xl font-semibold">Create New User</h1>
			<Card>
				<CardHeader>
					<CardTitle>User Details</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="space-y-4" action={createUser}>
						<div className="grid gap-1.5">
							<Label htmlFor="fullName">Full name</Label>
							<Input id="fullName" name="fullName" placeholder="Jane Doe" />
						</div>
						<div className="grid gap-1.5">
							<Label htmlFor="email">Email</Label>
							<Input id="email" name="email" type="email" placeholder="jane@example.com" />
						</div>
						<div className="grid gap-1.5">
							<Label htmlFor="role">Role</Label>
							<Input id="role" name="role" placeholder="admin, editor, viewer" />
						</div>
						<Button type="submit">Create User</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
