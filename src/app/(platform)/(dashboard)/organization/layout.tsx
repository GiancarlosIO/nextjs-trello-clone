import { Sidebar } from "../_components/Sidebar";

export default function OrganizationLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<main className="pt-20 sm:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
			<div className="flex gap-x-7">
				<div className="w-64 shrink-0 hidden sm:block">
					<Sidebar />
				</div>
				{children}
			</div>
		</main>
	);
}
