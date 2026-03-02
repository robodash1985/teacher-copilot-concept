import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai, Playfair_Display } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teacher Copilot",
  description: "AI-powered teaching assistant for Thai educators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${inter.variable} ${notoSansThai.variable} ${playfair.variable} font-sans antialiased bg-[#faf9f7]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
