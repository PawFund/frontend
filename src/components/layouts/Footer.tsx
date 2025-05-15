import Image from "next/image";
import { iconsAssets } from "@/assets";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-primary mt-10">
            <div className="flex flex-col sm:flex-row justify-between gap-6 max-w-7xl mx-auto px-4 lg:px-8 py-8 md:py-10 relative">
                <div className="flex flex-col gap-4">
                    <Image src={iconsAssets.PawIconWhite} alt="paw icon" className="md:absolute left-1/2 md:-translate-x-1/2 top-1/2 md:-translate-y-1/2 transform" />
                    <Link href={"/"}>
                        <Image src={"/logo-white.svg"} alt="Paw Fund Logo" width={160} height={50} />
                    </Link>
                    <p className="text-white flex items-center gap-1 text-nowrap">
                        Made With
                        <span>
                            <Image src={iconsAssets.HeartHandwriting} alt="heart icon" />
                        </span>
                        by Paw Fund Team
                    </p>
                </div>
                <div className="flex flex-col gap-4 sm:items-end justify-end md:justify-center">
                    <div className="flex gap-6">
                        <Link href={"/"} className="flex items-center gap-1 text-white font-bold group">
                            <p className="mt-[3px] group-hover:underline">CONTRACT</p>
                            <Image src={iconsAssets.ObliqueArrow} width={17} alt="ObliqueArrow" />
                        </Link>
                        <Link href={"/"} className="flex items-center gap-1 text-white font-bold group">
                            <p className="mt-[3px] group-hover:underline">GITHUB</p>
                            <Image src={iconsAssets.ObliqueArrow} width={17} alt="ObliqueArrow" />
                        </Link>
                        <Link href={"/"} className="flex items-center gap-1 text-white font-bold group">
                            <p className="mt-[3px] group-hover:underline">INSTAGRAM</p>
                            <Image src={iconsAssets.ObliqueArrow} width={17} alt="ObliqueArrow" />
                        </Link>
                    </div>
                    <Link href={"/"} className="underline text-white">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
}