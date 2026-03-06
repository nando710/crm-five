"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Kanban,
    MessageSquare,
    Tag,
    Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/leads", label: "Leads", icon: Users },
    { href: "/funil", label: "Funil de Vendas", icon: Kanban },
    { href: "/conversas", label: "Conversas", icon: MessageSquare },
    { href: "/tags", label: "Tags", icon: Tag },
    { href: "/configuracoes", label: "Configurações", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex h-screen w-60 flex-col border-r bg-sidebar">
            {/* Logo */}
            <div className="flex h-16 items-center border-b px-6">
                <span className="text-xl font-bold text-primary">CRM Five</span>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-1 flex-col gap-1 p-3 overflow-y-auto">
                {navItems.map(({ href, label, icon: Icon }) => (
                    <Link
                        key={href}
                        href={href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            pathname.startsWith(href)
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                    >
                        <Icon className="h-4 w-4 shrink-0" />
                        {label}
                    </Link>
                ))}
            </nav>

            {/* Footer */}
            <div className="border-t p-4">
                <p className="text-xs text-muted-foreground">
                    Connected via Evolution API
                </p>
            </div>
        </aside>
    );
}
