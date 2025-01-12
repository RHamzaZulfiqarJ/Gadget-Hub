"use client";

import Link from "next/link";
import "../../../../globals.css"
import Sidebar from "@/components/Sidebar";
import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      window.location.href = "/home";
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <div className="flex transition-all">
          <Sidebar />
          <main className="px-4 py-6 w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}