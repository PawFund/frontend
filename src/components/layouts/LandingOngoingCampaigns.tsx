import { accentElements } from "@/assets";
import Image from "next/image";
import CampaignCard from "../containers/CampaignCard";
import { imageAssets } from "@/assets";

export default function LandingOngoingCampaigns() {
    return (
        <section className="w-full mt-14">
            <div className="flex gap-6 sm:gap-10 items-center justify-center">
                <Image src={accentElements.PawIconSecondary} width={40} alt="paw icon secondary" className="hidden sm:block"/>
                <Image src={accentElements.PawIconSecondary} alt="paw icon secondary"/>
                <Image src={accentElements.PawIconPrimary} alt="paw icon primary"/>
                <Image src={accentElements.PawIconSecondary} alt="paw icon secondary"/>
                <Image src={accentElements.PawIconSecondary} width={40} alt="paw icon secondary" className="hidden sm:block"/>
            </div>
            <h2 className="text-4xl font-display text-center leading-12 mt-6">Find a campaign, make an impact, and change lives today!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mt-12">
                {
                    // Placeholder for CampaignCard components
                    Array.from({ length: 8 }, (_, index) => (
                        <CampaignCard
                            daysLeft={10}
                            campaignImage={imageAssets.StrayCatsPlaceholder}
                            fundraiserImage={imageAssets.LogoPlaceholder}
                            title="Provide 1,000 Nutritious Meals for Stray Animals"
                            shortDesc="Help us provide 1,000 nutritious meals for stray animals in need. Your support can make a difference!"
                            raised={2.5}
                            goal={7}
                            donationCount={100}
                            campaignId={index}
                            key={index}
                        />
                    ))
                }
            </div>
        </section>
    );
}