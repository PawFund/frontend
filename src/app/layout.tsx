import type { Metadata } from "next";
import { Bagel_Fat_One, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import Web3Provider from "./Web3Provider";
import "./globals.css";
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
	title: "Paw Fund | Web3 Animal Welfare Fundraising Platform",
	description: "Support animal shelters and rescue operations through transparent blockchain donations. Join Paw Fund's decentralized platform for animal welfare projects.",
	keywords: "animal welfare, blockchain donations, cryptocurrency, pet rescue, animal shelter, Web3 charity, transparent fundraising",
	openGraph: {
		title: "Paw Fund | Web3 Animal Welfare Fundraising Platform",
		description: "Support animal shelters and rescue operations through transparent blockchain donations",
		type: "website",
		url: "https://pawfunding.vercel.app",
		siteName: "Paw Fund",
		images: [
			{
				url: "/assets/og-image.png",
				width: 1200,
				height: 630,
				alt: "Paw Fund Platform",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Paw Fund | Web3 Animal Welfare Fundraising Platform",
		description: "Support animal shelters through transparent blockchain donations",
		images: ["/assets/og-image.png"],
	},
	robots: {
		index: true,
		follow: true,
	},
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
			<body
				className={`${SpaceGrotesk.variable} ${BagelFatOne.variable} antialiased bg-[url(/assets/bg-pattern.svg)] bg-repeat-space bg-size-[auto_26px]`}
			>
				<Web3Provider cookies={cookies}>
						{children}
				</Web3Provider>
				<Toaster />
			</body>
		</html>
	);
}
