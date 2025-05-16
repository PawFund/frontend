"use client";

import { Goal, Infinity } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Progress } from "../ui/progress";
import { Skeleton } from "../ui/skeleton";
import { contractABI } from "@/lib/constants";
import { useReadContracts } from "wagmi";
import { formatEther } from "viem";
import { useEffect, useState } from "react";

type CampaignCardProps = {
    daysLeft?: number | null;
    campaignImage: string | StaticImageData;
    fundraiserImage?: string | StaticImageData;
    title: string;
    description: string;
    raised?: number;
    goal?: number;
    donationCount?: number;
    campaignId: string | number;
    contractAddress?: string;
};

export default function CampaignCard(props: CampaignCardProps) {
    const contractData = {
        abi: contractABI,
        address: props.contractAddress as `0x${string}`,
    };
    const getDataContract = useReadContracts({
        contracts: [
            {
                ...contractData,
                functionName: "goalAmount",
            },
            {
                ...contractData,
                functionName: "totalDonated",
            },
            {
                ...contractData,
                functionName: "owner",
            },
        ],
    });

    const [goalAmount, totalDonated] = getDataContract.data || [];
    const [raisedPercentage, setRaisedPercentage] = useState(0);
    const goal = goalAmount?.result as bigint || BigInt(0);
    const recived = totalDonated?.result as bigint || BigInt(0);

    useEffect(() => {
        if (goalAmount?.result && totalDonated?.result) {
            const percentage =
                (Number(formatEther(recived)) /
                    Number(formatEther(goal))) *
                100;
            setRaisedPercentage(percentage);
        }
    }, [goalAmount, totalDonated])

    return (
        <Link
            href={`/campaign/${props.campaignId}`}
            className=" rounded-t-4xl rounded-b-3xl p-3 flex flex-col gap-4 hover:bg-gray-100 hover:scale-[101%] transition-all duration-300 ease-in-out cursor-pointer"
        >
            <div className="relative">
                <Image
                    src={props.campaignImage}
                    alt={`campaign ${props.campaignId}`}
                    className="rounded-3xl w-full aspect-video object-cover"
                    width={300}
                    height={200}
                />
                <p className="absolute bg-white/30 text-white px-4 py-2 top-2 right-2 rounded-full text-xs font-bold backdrop-blur-[2px]">
                    {props.daysLeft != null ? (
                        `${props.daysLeft} days left`
                    ) : (
                        <Infinity size={15} />
                    )}
                </p>
                {/* <Image
                    src={props.fundraiserImage}
                    alt={`fundraiser ${props.campaignId}`}
                    className="absolute bottom-2 left-2 rounded-full w-10 aspect-square border-2 border-gray-200"
                /> */}
            </div>
            <div className="flex flex-col gap-2">
                <h6 className="font-bold text-xl line-clamp-2">{props.title}</h6>
                <p className="line-clamp-2">{props.description}</p>
                {getDataContract.isPending ? (
                    <Skeleton className="h-3 w-16 bg-gray-300 opacity-20" />
                ) : (
                    <p className="font-semibold text-sm">
                        {Number(
                            formatEther(recived)
                        ).toFixed(5)}{" "}
                        ETH Raised
                    </p>
                )}
                {getDataContract.isPending ? (
                    <Skeleton className="h-3 w-full bg-gray-300 opacity-20" />
                ) : (
                    <div className="flex items-center gap-2 w-full">
                        <Progress
                            fgClassName="bg-green-500"
                            bgClassName="bg-gray-300"
                            value={raisedPercentage}
                        />
                        <p className="font-bold text-xs">
                            {raisedPercentage.toFixed(1)}%
                        </p>
                    </div>
                )}
                <div className="w-full flex items-center gap-6 text-sm">
                    {/* <div className="flex items-center gap-2">
                        <Heart size={16} />
                        <p>{props.donationCount} Donations</p>
                    </div> */}
                    <div className="flex items-center gap-2">
                        <Goal size={16} />
                        {getDataContract.isPending ? (
                            <Skeleton className="h-3 w-20 bg-gray-300 opacity-20" />
                        ) : (
                            <p>
                                {formatEther(goal)} ETH
                                Goal
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export function CampaignCardSkeleton() {
    return (
        <div className="flex flex-col gap-3 p-3">
            <Skeleton className="w-full h-52 rounded-3xl bg-gray-200" />
            <Skeleton className="w-full h-4 rounded-full bg-gray-200" />
            <Skeleton className="w-3/4 h-4 rounded-full bg-gray-200" />
        </div>
    );
}
