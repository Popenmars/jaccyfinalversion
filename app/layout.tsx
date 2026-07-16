import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/context/CartContext";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "Jaacyy's gadgets",
  description: "An online store for shopping quality and reliable gadgets, with quick delivery",
  icons: {
    icon: "/logo.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", poppins.variable)}>
      <body className={`${poppins.variable} font-sans antialiased text-dark-blue`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
