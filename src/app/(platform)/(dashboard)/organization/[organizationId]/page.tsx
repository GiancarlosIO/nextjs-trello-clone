import { auth } from "@clerk/nextjs";

export default function OrganizationIdPage() {
	const { orgSlug } = auth();
	return <div>Organization Id page: {orgSlug}</div>;
}
