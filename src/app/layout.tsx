import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalStateProvider } from '../context/GlobalStateContext';
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce App",
  description: "Created By Hamza Zulfiqar",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalStateProvider>
          {children}
          <Toaster richColors position="top-right" />
        </GlobalStateProvider>
      </body>
    </html>
  );
}
