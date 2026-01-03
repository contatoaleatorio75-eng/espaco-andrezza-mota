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
  title: 'Espaço Andrezza Mota | Consultoria de Beleza e Bem-Estar',
  description: 'Consultoria especializada em O Boticário, Eudora, O.U.I e Quem disse, Berenice?. Confira também o melhor de Natura, Avon e Tupperware com Andrezza Mota.',
  keywords: 'O Boticário, Eudora, O.U.I, Quem disse Berenice, Natura, Avon, Tupperware, Consultoria de Beleza, Betim',
  openGraph: {
    title: 'Espaço Andrezza Mota | Consultoria de Beleza',
    description: 'Sua consultora oficial O Boticário, Eudora, O.U.I, Quem disse Berenice?, Natura, Avon e Tupperware.',
    url: 'https://www.espacoandrezzamota.com.br/',
    siteName: 'Espaço Andrezza Mota',
    locale: 'pt_BR',
    type: 'website',
  },
};

import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
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
