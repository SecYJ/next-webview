import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
	return (
		<div className="space-y-6">
			<h1 className="text-xl font-semibold">Settings</h1>

			<Card>
				<CardHeader>
					<CardTitle>Profile</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="space-y-4">
						<div className="grid gap-1.5">
							<Label htmlFor="name">Name</Label>
							<Input id="name" placeholder="Your name" />
						</div>
						<div className="grid gap-1.5">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" placeholder="you@example.com" />
						</div>
						<Button type="submit">Save</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
