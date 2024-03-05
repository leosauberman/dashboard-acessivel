import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@park-ui/tailwind-plugin/preset.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard Acessível | PCDaS",
  description: "PoC de um dashboard SINASC-SISDEF com foco em acessibilidade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
