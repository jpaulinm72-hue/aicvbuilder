import "./globals.css";
import { Inter, Outfit } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-display" });

export const metadata = {
  title: "AI CV Builder - Create Professional Resumes in Minutes",
  description: "Build, optimize, and export modern CVs and cover letters with the power of AI. Get hired faster with tailored resumes.",
  keywords: "AI CV Builder, Resume Maker, Cover Letter Generator, AI Job Search, Professional CV Templates",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
