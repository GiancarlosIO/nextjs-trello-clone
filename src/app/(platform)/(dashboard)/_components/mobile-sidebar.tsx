"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";

export function MobileSidebar() {
	const onOpen = useMobileSidebar((state) => state.onOpen);
	const onClose = useMobileSidebar((state) => state.onClose);
	const isOpen = useMobileSidebar((state) => state.isOpen);

	const pathname = usePathname();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		onClose();
	}, [pathname, onClose]);

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<Button
				className="block sm:hidden mr-2"
				onClick={() => onOpen()}
				variant="ghost"
				size="sm"
			>
				<Menu className="w-4 h-4n" />
			</Button>
			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent className="p-2 pt-10" side="left">
					<Sidebar storageKey="ntc-sidebar-mobile-state" />
				</SheetContent>
			</Sheet>
		</>
	);
}
