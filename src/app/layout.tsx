import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shivang Rai — Full Stack Developer",
    template: "%s | Shivang Rai",
  },
  description:
    "Full Stack Developer specializing in MERN stack. Building scalable web applications with React, Node.js, MongoDB, and modern technologies.",
  keywords: [
    "Shivang Rai",
    "Full Stack Developer",
    "MERN Stack",
    "React Developer",
    "Node.js Developer",
    "Portfolio",
    "Web Developer",
  ],
  authors: [{ name: "Shivang Rai" }],
  creator: "Shivang Rai",
  metadataBase: new URL("https://shivang-2005.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shivang-2005.vercel.app",
    siteName: "Shivang Rai Portfolio",
    title: "Shivang Rai — Full Stack Developer",
    description:
      "Full Stack Developer specializing in MERN stack. Building scalable web applications with modern technologies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivang Rai — Full Stack Developer",
    description:
      "Full Stack Developer specializing in MERN stack. Building scalable web applications with modern technologies.",
    creator: "@raishivang_69",
  },
  icons: {
    icon: "/portfolio.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
