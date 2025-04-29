import type { Metadata } from "next";
import { Bagel_Fat_One, Space_Grotesk } from "next/font/google";
import "./globals.css";

 const BagelFatOne = Bagel_Fat_One({
  variable: "--font-bagel-fat-one",
  weight: "400",
  subsets: ["latin"],
});
 const SpaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["300","400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paw Fund | Fundraising for Animal Welfare",
  description: "Paw Fund is a fundraising platform for animal welfare organizations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${SpaceGrotesk.variable} ${BagelFatOne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
