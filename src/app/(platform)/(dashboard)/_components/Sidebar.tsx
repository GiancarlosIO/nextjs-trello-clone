"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { NavItem, TOrganization } from "./NavItem";

interface ISidebarProps {
	storageKey?: string;
}

export function Sidebar({ storageKey = "ntc=sidebar-state" }: ISidebarProps) {
	const [expanded, setExpanded] = useLocalStorage<Record<string, boolean>>(
		storageKey,
		{},
	);

	const { organization: activeOrganization, isLoaded: isLoadedOrganization } =
		useOrganization();

	const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
		userMemberships: {
			infinite: true,
		},
	});
	const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
		(acc: string[], key: string) => {
			if (expanded[key]) {
				acc.push(key);
			}
			return acc;
		},
		[],
	);

	const onExpand = (id: string) => {
		setExpanded((curr) => ({
			...curr,
			[id]: !expanded[id],
		}));
	};

	if (!isLoadedOrganization || !isLoadedOrgList || userMemberships.isLoading) {
		return (
			<>
				<div className="flex items-center justify-between mb-2">
					<Skeleton className="h-10 w-[50%]" />
					<Skeleton className="h-10 w-10" />
				</div>
				<div className="space-y-2">
					<NavItem.Skeleton />
					<NavItem.Skeleton />
					<NavItem.Skeleton />
				</div>
			</>
		);
	}

	return (
		<>
			<div className="font-medium text-xs flex items-center mb-1">
				<span className="p-4">Workspaces</span>
				<Button
					asChild
					type="button"
					size="icon"
					variant="ghost"
					className="ml-auto"
				>
					<Link href="/select-org">
						<Plus className="h-4 w-4" />
					</Link>
				</Button>
			</div>
			<Accordion
				type="multiple"
				defaultValue={defaultAccordionValue}
				className="space-y-2"
			>
				{userMemberships.data.map(({ organization }) => {
					return (
						<NavItem
							key={organization.id}
							isActive={activeOrganization?.id === organization.id}
							isExpanded={expanded[organization.id]}
							organization={organization as TOrganization}
							onExpand={onExpand}
						/>
					);
				})}
			</Accordion>
		</>
	);
}
