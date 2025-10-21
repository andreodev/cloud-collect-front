import type { Metadata } from "next";
import { WhatsappTemplateProvider } from "@/store/whatsappTemplate";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next"
import logo from "@/assets/icon.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloud Collect - Gestão Financeira Inteligente",
  description: "Automated billing, cash flow management, and AI-driven financial insights",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href={logo.src} type="image/png" sizes="64x64 128x128 256x256" />
      </head>
      <body className={inter.className}>
        <WhatsappTemplateProvider>
          {children}
          <Toaster />
          <Analytics />
        </WhatsappTemplateProvider>
      </body>
    </html>
  );
}
