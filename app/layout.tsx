import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TeachStream",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${montserrat.variable} antialiased`}>
          <Navbar />
          {children}
          <Toaster
            richColors
            position="bottom-right"
            toastOptions={{
              classNames: {
                toast: "font-sans",
                title: "font-sans",
                description: "font-sans",
                actionButton: "font-sans",
                cancelButton: "font-sans",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
