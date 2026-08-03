import React from "react";

export default function BankLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans pt-24">
      <div className="w-full border-b border-white/10 bg-surface-dark px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-sm">B</div>
          <span className="font-display font-medium">Bank Staff Portal</span>
        </div>
        <div className="text-sm text-white/60">
          Logged in as <span className="text-white font-medium">Admin</span>
        </div>
      </div>
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}
