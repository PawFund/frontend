import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import CoinbaseConnectButton from "../ui/CoinbaseConnectButton";
import ReownConnectButton from "../ui/ReownConnectButton";

export default function Navbar() {
    return (
        <header className=" max-w-7xl mx-auto mt-4">
            <div className="flex items-center justify-between px-8 bg-gray-100 h-[88px] rounded-full shadow-md py-4 ">
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