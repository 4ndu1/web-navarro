'use client';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    BookOpen,
    Menu,
    UserPlus
} from "lucide-react";
import { useState } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Estudiantes", href: "/estudiantes", icon: Users },
    { label: "Profesores", href: "/profesores", icon: GraduationCap },
    { label: "Agregar Estudiante", href: "/agregar_estudiante", icon: UserPlus },
    { label: "Agregar Profesor", href: "/agregar_profesor", icon: UserPlus },
    { label: "Secciones", href: "/sections", icon: BookOpen },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={cn(
            "flex flex-col h-screen bg-[#000435] text-white border-r border-[#000435] transition-all duration-300",
            collapsed ? "w-16" : "w-64"
        )}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#27272a]">
                {!collapsed && <span className="font-bold text-lg tracking-tight">Web Navarro</span>}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-white hover:bg-[#27272a] hover:text-white"
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </div>

            {/* Navigation */}
            <div className="flex-1 py-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-white/10",
                                isActive ? "bg-white/20 border-l-4 border-white" : "text-gray-300 hover:text-white",
                                collapsed && "justify-center px-2"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
