import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "نوال يوغا — المتجر",
    template: "%s — نوال يوغا",
  },
  description:
    "قطعتان، تم تصميمهما بعناية تامة. أدوات يوغا من الفلين والمطاط الطبيعي، مصنوعة للممارسة اليومية.",
  openGraph: {
    title: "نوال يوغا — الفرشة والبلوك",
    description:
      "قطعتان، تم تصميمهما بعناية تامة. أدوات يوغا من الفلين والمطاط الطبيعي، مصنوعة للممارسة اليومية.",
    type: "website",
  },
  metadataBase: new URL("https://nawalyoga.com"),
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F3EC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-body">
        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
