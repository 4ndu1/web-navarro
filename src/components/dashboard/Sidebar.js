'use client';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    BookOpen,
    Calendar,
    Settings,
    LogOut,
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
    { label: "Agregar Estudiante", href: "/agregar_estudiante", icon: UserPlus }, // Added for convenience? Or just stick to main lists
    { label: "Secciones", href: "/sections", icon: BookOpen }, // Assuming this will be created or exists? It wasn't in list_dir.
    { label: "Horarios", href: "/schedules", icon: Calendar },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={cn(
            "flex flex-col h-screen bg-[#09090b] text-white border-r border-[#27272a] transition-all duration-300",
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
                                "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-[#27272a]",
                                isActive ? "bg-[#27272a] border-l-4 border-blue-500" : "text-gray-400 hover:text-white",
                                collapsed && "justify-center px-2"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#27272a]">
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full justify-start text-gray-400 hover:text-red-400 hover:bg-[#27272a]",
                        collapsed && "justify-center px-0"
                    )}
                >
                    <LogOut className="h-5 w-5" />
                    {!collapsed && <span className="ml-3">Cerrar Sesión</span>}
                </Button>
            </div>
        </div>
    );
}
