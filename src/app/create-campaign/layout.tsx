import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Campaign | Paw Fund",
    description: "Create a new campaign to raise funds for animal welfare organizations.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            {children}
        </>
    );
}