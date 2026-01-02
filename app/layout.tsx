import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Espaço Andrezza Mota | Consultoria Natura, Avon e Presentes",
  description: "Sua loja de beleza e presentes em Betim. Encontre as melhores promoções de Natura, Avon, Boticário e utilidades domésticas. Compre online com segurança.",
};

import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Script from "next/script";
import { SITE_SETTINGS } from "@/data/site-settings";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>

        <style dangerouslySetInnerHTML={{
          __html: `
          :root {
            --primary-color: ${SITE_SETTINGS.colors.primary};
            --secondary-color: ${SITE_SETTINGS.colors.secondary};
            --bg-color: ${SITE_SETTINGS.colors.background};
            --text-color: ${SITE_SETTINGS.colors.text};
            --accent-color: ${SITE_SETTINGS.colors.accent};
            --watermark-opacity: ${SITE_SETTINGS.watermark.enabled ? SITE_SETTINGS.watermark.opacity : 0};
            --watermark-size: ${SITE_SETTINGS.watermark.size}px;
          }
        `}} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="watermark-container" />
        <Header />
        {children}
        <Footer />
        <CookieConsent />
        <WhatsAppButton />
      </body>
    </html>
  );
}
