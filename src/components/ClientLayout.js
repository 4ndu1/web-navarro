"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";

export function ClientLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex flex-row min-h-screen">
            <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
            <main
                className={`flex-1 w-full p-10 flex flex-col items-center transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}
            >
                <div className="w-full max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
