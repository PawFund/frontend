"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search} from "lucide-react";
// import CoinbaseConnectButton from "../ui/CoinbaseConnectButton";
import ReownConnectButton from "../ui/ReownConnectButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PATH_HIDES_HEADER_FOOTER as hidePathName} from "@/lib/constants";

export default function Navbar() {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const isHidden = hidePathName.includes(pathname);

    if(isHidden){
        return null;
    }

    return (
        <header
            className={`w-full max-w-7xl px-4 lg:px-8 mx-auto pt-4 z-50 ${isHomePage ? "fixed top-0 left-1/2 transform -translate-x-1/2" : "sticky top-0"}`}
        >
            <div className="flex items-center justify-between px-4 sm:px-7 bg-gray-100 h-[88px] rounded-full py-4 ">
                <Link className="hidden sm:block" href="/">
                    <Image
                        src={"/pawfund.svg"}
                        alt="PawFund Logo"
                        width={152}
                        height={0}
                    />
                </Link>
                <div className="flex items-center gap-4 w-full justify-between sm:w-fit sm:justify-start">
                    <Button variant={"navbar"} className="w-14 h-14 p-0">
                        <Search strokeWidth={3} />
                    </Button>
                    <ReownConnectButton />
                    {/* <CoinbaseConnectButton /> */}
                </div>
            </div>
        </header>
    );
}