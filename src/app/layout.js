import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Web Navarro",
  description: "Sistema de Gestión Estudiantil",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={cn(inter.className, "antialiased")}>
        {children}
      </body>
    </html>
  );
}
