"use client";

import { accentElements } from "@/assets";
import Image from "next/image";
import CampaignCard, { CampaignCardSkeleton } from "../containers/CampaignCard";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { CampaignReturnType, getAllCampaigns } from "@/lib/query-function/campaign";

export default function LandingOngoingCampaigns() {
    const getCampaigns = useQuery({
        queryKey: ["campaigns-ongoing"],
        queryFn: getAllCampaigns,
    })

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
                {
                    getCampaigns.data?.map((campaign: CampaignReturnType) => (
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
                    getCampaigns.isPending && (
                        Array.from({ length: 8 }).map((_, index) =>
                            <CampaignCardSkeleton key={index} />
                        )
                    )
                }
            </div>
            <Button className="text-white bg-neutral-800 mt-9 hover:bg-neutral-950 mx-auto">
                Find Other Campaigns
            </Button>
        </section>
    );
}