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
  title: "Dynam8",
  description: "Assistants logiciels & automatisation pour PME — Dynam8",
  applicationName: "Dynam8",
  openGraph: {
    title: "Dynam8",
    description: "Automatisation intelligente pour les PME",
    siteName: "Dynam8",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dynam8",
    description: "Automatisation intelligente pour les PME",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
