import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AppToaster } from "@/components/providers/toaster";
import { APP_NAME } from "@/lib/constants";

import "./globals.css";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Internal manufacturing dashboard for the sales sampling workflow."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100 text-slate-950 antialiased">
        {children}
        <AppToaster />
      </body>
    </html>
  );
}
