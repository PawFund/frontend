import type { Metadata } from "next";
import { Bagel_Fat_One, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/layouts/Navbar";
import { headers } from "next/headers";
import Web3Provider from "./Web3Provider";
import "./globals.css";

const BagelFatOne = Bagel_Fat_One({
	variable: "--font-bagel-fat-one",
	weight: "400",
	subsets: ["latin"],
});
const SpaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	weight: ["300", "400", "500", "600", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Paw Fund | Fundraising for Animal Welfare",
	description: "Paw Fund is a fundraising platform for animal welfare organizations.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	const headersObj = await headers();
	const cookies = headersObj.get('cookie')

	return (
		<html lang="en">
			<body className={
				`${SpaceGrotesk.variable} ${BagelFatOne.variable} antialiased bg-[url(/bg-pattern.svg)] bg-repeat-space bg-size-[auto_26px]`
			}>
				<Web3Provider cookies={cookies}>
					<Navbar />
					<main className="max-w-7xl mx-auto px-4 lg:px-8">
						{children}
					</main>
				</Web3Provider>
			</body>
		</html>
	);
}
