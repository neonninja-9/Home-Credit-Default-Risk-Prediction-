import React from "react";
import { CustomerNavbar } from "@/components/layout/CustomerNavbar";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas-dark text-on-dark flex flex-col selection:bg-dusk-violet selection:text-white">
      <CustomerNavbar />
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 pt-24 md:pt-28">
        {children}
      </div>
    </div>
  );
}
