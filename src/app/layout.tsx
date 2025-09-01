import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import StoreProvider from "../components/storeProvider";

export const metadata: Metadata = {
  title: "Oneorg",
  description: "Oneorg for all your organizational needs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
          <Toaster position="top-right" />
        </StoreProvider>
      </body>
    </html>
  );
}
