import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header({ title }) {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            {/* Header elements removed as per request */}
        </header>
    );
}
