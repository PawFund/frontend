import type { Metadata } from "next";
import { Bagel_Fat_One, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/layouts/Navbar";
import { headers } from "next/headers";
import Web3Provider from "./Web3Provider";
import "./globals.css";
import Footer from "@/components/layouts/Footer";
import { Toaster } from "@/components/ui/sonner";

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
					<Footer />
				</Web3Provider>
				<Toaster
					toastOptions={{
						className: "!rounded-2xl !border-gray-300",
						classNames: {
							default: "!bg-gray-200",
							title: '!font-semibold !text-neutral-800',
							description: '!text-neutral-700',
							success: '!text-green-500',
							error: '!text-red-500',
							warning: '!text-yellow-500',
							info: '!text-blue-500',
						}
					}}
				/>
			</body>
		</html>
	);
}
