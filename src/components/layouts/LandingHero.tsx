import Image from "next/image";
import { Button } from "../ui/button";
import { accentElements } from "@/assets";

export default function LandingHero() {
    return (
        <>
            <section className="relative flex flex-col items-center bg-gray-100 h-[calc(100dvh-4rem)] w-full mt-4 rounded-t-[48px] rounded-b-4xl pt-24 px-8 overflow-hidden">
                <div className="relative w-full flex justify-center">
                    <Image src={accentElements.KissingCat} alt="kissing cat" className="w-13 lg:w-auto absolute left-1 top-1 lg:left-20 lg:top-1/2 lg:-translate-y-1/2 z-20" />
                    <Image src={accentElements.HopeShape} alt="hope shape" className="hidden lg:block absolute -left-6 lg:left-[23%] -top-1 z-20" />
                    <Image src={accentElements.PawIconPerspective} alt="PawIconPerspective" className="w-7 lg:w-auto absolute -left-2 bottom-6 lg:-bottom-6 lg:left-[26%] z-20" width={40} />
                    <h1 className="font-display mt-6 lg:mt-0 text-6xl md:text-7xl text-center leading-16 md:leading-24 z-10">They <br className="sm:hidden"/> Need Your <br className="hidden sm:block" /> Helping Hand!</h1>
                    <Image src={accentElements.PawIconPerspective} alt="PawIconPerspective" className="w-10 lg:w-14 absolute top-8 -right-2 lg:right-[21%] transform scale-x-[-1] z-20" />
                    <Image src={accentElements.PortalShape} alt="portal shape" className="w-4 lg:w-auto absolute right-6 bottom-24 lg:right-[27%] lg:-bottom-2 z-20" />
                    <Image src={accentElements.GrinningCat} alt="portal shape" className="w-13 lg:w-auto absolute right-1 -bottom-4 lg:right-20 lg:-bottom-16 z-20" />
                </div>
                <p className="w-full text-center mt-8 lg:mt-20 font-medium z-10">Help stray cats and animals get a better life. <br className="hidden md:block" /> Every donation brings new hope!</p>
                <div className="h-full mt-8 flex md:items-center justify-center w-full z-10">
                    <Button className="bg-blue-600 text-lg font-bold text-white hover:bg-blue-700">Donate Now</Button>
                </div>
                <Image src={accentElements.FlowerShape} alt="flower shape" className="absolute bottom-48 md:-bottom-14 -left-24" />
                <Image src={accentElements.FlowerShape} alt="flower shape" className="absolute md:-bottom-14 -right-24 scale-x-[-1]" />
                <Image src={accentElements.PawHand} alt="paw hand" className="absolute -bottom-64 md:-bottom-40 -left-56 lg:left-[4%]" />
                <Image src={accentElements.PawHand} alt="paw hand" className="absolute -bottom-64 md:-bottom-40 -right-56 lg:right-[4%] scale-x-[-1]" />
            </section>
            <div className="relative h-12">
                <Image src={accentElements.ArrowDown} alt="arrow down" className="absolute -top-6 left-1/2 -translate-x-1/2" />
            </div>
        </>

    )
}