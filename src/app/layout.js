import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-row">
          <div>
            <Sidebar/>
          </div>
          
          <main>
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}
