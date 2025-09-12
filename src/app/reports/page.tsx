import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Page() {
	return (
		<div className="space-y-6">
			<h1 className="text-xl font-semibold">Reports</h1>
			<Card>
				<CardHeader>
					<CardTitle>Monthly Summary</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-neutral-700">
						Generate and download your latest activity and usage reports.
					</p>
					<div className="mt-4">
						<Button>Generate Report</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
