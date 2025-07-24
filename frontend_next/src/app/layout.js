import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import ClientLayoutWrapper from "../components/common/ClientLayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EPL Connect - École Polytechnique de Lomé",
  description: "Plateforme numérique de l'École Polytechnique de Lomé",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
