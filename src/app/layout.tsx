import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import "./globals.css";
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/AuthProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Finance Management",
  description: "Manage personal finance easily.",
  icons: {
    icon: '/favicon.ico',
  },
  manifest: "/web.manifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body  
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
