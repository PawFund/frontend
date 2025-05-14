import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import CoinbaseConnectButton from "../ui/CoinbaseConnectButton";
import ReownConnectButton from "../ui/ReownConnectButton";

export default function Navbar() {
    return (
        <header className="w-full max-w-7xl px-4 lg:px-8 mx-auto pt-4 fixed top-0 z-50 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center justify-between px-7 bg-gray-100 h-[88px] rounded-full py-4 ">
                <Image src={"/pawfund.svg"} alt="PawFund Logo" width={152} height={0} />
                <div className="flex items-center gap-4">
                    <Button variant={"navbar"} className="w-14 h-14 p-0">
                        <Search strokeWidth={3} />
                    </Button>
                    <ReownConnectButton />
                    {/* <CoinbaseConnectButton /> */}
                </div>
            </div>
        </header>
    )
}