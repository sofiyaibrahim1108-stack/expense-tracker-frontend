"use client"; 
import Sidebar from "../../components/Sidebar";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();

 
  const hideSidebar = pathname === "/login" || pathname === "/register" || pathname === "/";

  return (
    <html lang="en">
      <body className="bg-slate-50">
        <div className="flex min-h-screen">
          
          {/* Sidebar Section */}
          {!hideSidebar && (
            <div className="hidden md:block w-64 fixed h-full z-50">
              <Sidebar />
            </div>
          )}

          {/* Main Content Area */}
          <div className={`flex-1 transition-all duration-300 ${!hideSidebar ? "md:ml-64" : ""}`}>
            {children}
          </div>

        </div>
      </body>
    </html>
  );
}