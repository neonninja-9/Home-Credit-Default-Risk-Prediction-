import type { Metadata } from "next";
import { DM_Sans, Geist } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CursorFollower } from "@/components/ui/cursor-follower";

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "CreditLens | Predict Credit Risk with Confidence",
  description: "A premium fintech platform for Home Credit Default Risk prediction using advanced ML models and SHAP explainability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("h-full", "antialiased", dmSans.variable, geist.variable)}>
      <body className="min-h-full flex flex-col bg-void-canvas text-bone font-sans selection:bg-dusk-violet selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CursorFollower />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
