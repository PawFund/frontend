import Footer from "@/components/layouts/common/Footer";
import Main from "@/components/layouts/common/Main";
import Navbar from "@/components/layouts/common/Navbar";

export default function CampaignLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <Main>
                {children}
            </Main>
            <Footer />
        </>
    );
}