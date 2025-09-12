import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUsers } from "@/lib/userStore";

export default function Page() {
	const users = getUsers();
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold">Dashboard</h1>
				<Button>View Reports</Button>
			</div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle>Total Users</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold">{users.length}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Active Sessions</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold">312</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Errors</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold">7</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Users</CardTitle>
				</CardHeader>
				<CardContent>
					{users.length === 0 ? (
						<div className="text-sm text-neutral-600">No users yet. Create one from Users → New User.</div>
					) : (
						<div className="overflow-x-auto">
							<table className="w-full text-left text-sm">
								<thead>
									<tr className="border-b border-neutral-200">
										<th className="py-2 pr-4">Name</th>
										<th className="py-2 pr-4">Email</th>
										<th className="py-2 pr-4">Role</th>
										<th className="py-2 pr-4">Created</th>
									</tr>
								</thead>
								<tbody>
									{users.map((u) => (
										<tr key={u.id} className="border-b border-neutral-100 last:border-0">
											<td className="py-2 pr-4">{u.fullName}</td>
											<td className="py-2 pr-4">{u.email}</td>
											<td className="py-2 pr-4">{u.role}</td>
											<td className="py-2 pr-4">{u.createdAt.toLocaleString()}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
