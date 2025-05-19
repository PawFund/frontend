import { accentElements } from "@/assets";
import Image from "next/image";
import { Button } from "../../ui/button";

export default function LandingIntermezzo() {
    return (
        <section className="w-full flex flex-col items-center gap-4">
            <Image src={accentElements.PawIconPrimary} alt="paw icon" className="" />
            <h2 className="text-4xl font-display">Did You Know?</h2>
            <p className="text-center font-medium leading-6 md:px-20">Every year, millions of stray animals struggle to survive on the streets. Lack of food, disease, and abandonment make their lives incredibly difficult. Here’s why your donation can make a life-changing difference.</p>
            <div className="flex flex-col md:flex-row gap-8 w-full mt-4">
                <div className="bg-gray-100 w-full h-72 rounded-4xl"></div>
                <div className="grid grid-cols-3 grid-rows-5 w-full h-72 gap-4">
                    <div className="bg-gray-100 rounded-4xl col-span-3 row-span-3"></div>
                    <div className="bg-gray-100 rounded-4xl col-span-1 row-span-2"></div>
                    <div className="bg-gray-100 rounded-4xl col-span-1 row-span-2"></div>
                    <div className="bg-gray-100 rounded-4xl col-span-1 row-span-2"></div>
                </div>
            </div>
            <Button className="text-white bg-neutral-800 mt-9 hover:bg-neutral-950 ">
                Join Us & Be Their Hero
            </Button>
        </section>
    );
}