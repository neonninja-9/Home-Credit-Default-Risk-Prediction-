import React from "react";
import { BankNavbar } from "@/components/layout/BankNavbar";

export default function BankLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-accent-teal selection:text-black">
      <BankNavbar />
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 pt-24 md:pt-28">
        {children}
      </div>
    </div>
  );
}
