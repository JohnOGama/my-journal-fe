import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/AppHeader";
import AppNavigation from "@/components/AppNavigation";
import Providers from "@/providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Journal",
  description: "Your personal journal to track your thoughts and feelings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-full flex-col antialiased`}
      >
        <Providers>
          <AppHeader />
          <main className="flex h-full w-full flex-1 flex-col gap-4 p-4 lg:mx-auto lg:max-w-7xl lg:px-0 lg:py-4">
            {children}
          </main>
          <AppNavigation />
        </Providers>
      </body>
    </html>
  );
}
