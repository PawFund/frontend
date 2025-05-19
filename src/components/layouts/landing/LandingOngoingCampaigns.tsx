import { accentElements } from "@/assets";
import Image from "next/image";
import { getAllCampaigns } from "@/lib/fetcher/campaign";
import { type Campaign } from "@/lib/types";
import CampaignCard, { CardSkeleton } from "@/components/containers/CampaignCard";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export default function LandingOngoingCampaigns() {
    return (
        <section className="w-full mt-14 flex flex-col items-center justify-center">
            <div className="flex gap-6 sm:gap-10 items-center justify-center">
                <Image src={accentElements.PawIconSecondary} width={40} alt="paw icon secondary" className="hidden sm:block" />
                <Image src={accentElements.PawIconSecondary} alt="paw icon secondary" />
                <Image src={accentElements.PawIconPrimary} alt="paw icon primary" />
                <Image src={accentElements.PawIconSecondary} alt="paw icon secondary" />
                <Image src={accentElements.PawIconSecondary} width={40} alt="paw icon secondary" className="hidden sm:block" />
            </div>
            <h2 className="text-4xl font-display text-center leading-12 mt-6">Find a campaign, make an impact, and change lives today!</h2>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mt-12">
                <Suspense fallback={<LandingOngoingCampaignsSkeleton />}>
                    <Campaigns />
                </Suspense>
            </div>
            <Button className="text-white bg-neutral-800 mt-9 hover:bg-neutral-950 mx-auto">
                Find Other Campaigns
            </Button>
        </section>
    );
}

async function Campaigns() {
    const campaignsData = await getAllCampaigns();
    const campaigns = campaignsData.data?.slice(0, 8);
    return (
        <>
            {
                campaigns?.map((campaign: Campaign) => (
                    <CampaignCard
                        key={campaign._id}
                        campaignId={campaign._id}
                        contractAddress={campaign.contractAddress}
                        campaignImage={campaign.image}
                        title={campaign.name}
                        description={campaign.description}
                    />
                ))
            }
            {
                campaignsData.error && (
                    <div className="col-span-4 flex items-center justify-center">
                        <p className="text-red-500">{campaignsData.message}</p>
                    </div>
                )
            }
        </>
    )
}

export function LandingOngoingCampaignsSkeleton() {
    return (
        Array.from({ length: 8 }).map((_, index) =>
            <CardSkeleton key={index} />
        )
    )
}