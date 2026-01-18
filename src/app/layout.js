import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";

export const metadata = {
  title: "Sistema de Gestión Estudiantil",
  description: "Gestión de grupos estables estudiantiles",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
