"use client"

import Image from "next/image";
import { imageAssets } from "@/assets";
import { LoaderCircle, Telescope } from "lucide-react";
import Link from "next/link";
import { truncateAddress } from "@/lib/utils";
import DonationFill from "@/components/containers/DonationFill";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getCampaignById } from "@/lib/query-function/campaign";
import { useEffect, use, useState } from "react";
import { useReadContracts } from "wagmi";
import { contractABI } from "@/lib/constants";
import { CampaignReturnType } from "@/lib/query-function/campaign";
import { formatEther } from "viem";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserByAddress } from "@/lib/query-function/user";

export default function CampaignPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const [contract, setContract] = useState<{ address: `0x${string}`, abi: typeof contractABI }>()

    const getCampaign = useQuery({
        queryKey: [`get-campaign-${id}`],
        queryFn: () => getCampaignById(id),
    })

    useEffect(() => {
        if (getCampaign.data) {
            setContract({
                address: getCampaign.data.contractAddress,
                abi: contractABI,
            })
        }
    }, [getCampaign.data])


    const getDataContract = useReadContracts({
        contracts: [
            {
                ...contract,
                functionName: "goalAmount",
            },
            {
                ...contract,
                functionName: "totalDonated",
            },
            {
                ...contract,
                functionName: "owner",
            },
        ],
    });

    useEffect(() => {
        if (!getCampaign.isRefetching) {
            getDataContract.refetch();
        }
    }, [getCampaign.isRefetching]);


    if (getCampaign.isPending || getDataContract.isPending) {
        return (
            <div className="flex items-center justify-center h-dvh">
                <LoaderCircle
                    className="animate-spin text-primary"
                    size={62}
                    strokeWidth={2}
                />
            </div>
        )
    }

    const campaignData: CampaignReturnType = getCampaign.data;
    const owner = getDataContract.data?.[2].result as `0x${string}`;
    const goalAmount = getDataContract.data?.[0].result as bigint || BigInt(0);
    const totalDonated = getDataContract.data?.[1].result as bigint || BigInt(0);

    return (
        <>
            <h1 className="mt-6 text-3xl font-bold">
                {campaignData.name}
            </h1>
            <div className="grid grid-cols-7 gap-6 mt-6">
                <section className="col-span-4 flex flex-col gap-4">
                    <Image
                        src={campaignData.image}
                        className="aspect-video object-cover rounded-2xl"
                        alt="Campaign Image"
                        width={1000}
                        height={800}
                    />
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500">{campaignData.contractAddress}</p>
                        <Link
                            className="flex items-center gap-2"
                            href={`https://basescan.org/address/${campaignData.contractAddress}`}
                            target="_blank"
                        >
                            <Telescope size={18} />
                            <p className="underline font-medium text-sm">
                                View on Explorer
                            </p>
                        </Link>
                    </div>
                    <Owner address={owner} />
                    <p>{campaignData.description}</p>
                    {/* <div>
                        <h4 className="font-semibold">Withdrawal History</h4>
                        <WithdrawalCard />
                        <WithdrawalCard />
                    </div> */}
                </section>
                <aside className="col-span-3 relative">
                    <DonationFill campaignId={id} contractAddress={campaignData.contractAddress} goal={Number(formatEther(goalAmount))} raised={Number(formatEther(totalDonated))} className="sticky top-32" />
                </aside>
            </div>
        </>
    );
}

function Owner({ address }: { address: string }) {
    const { data: ownerData, isPending, isError, error } = useQuery({
        queryKey: ["getUserByAddress"],
        queryFn: () => getUserByAddress(address),
    })

    console.log("Address ", address);
    console.log("Error ", error);
    console.log({ ownerData });

    return (
        <div className="flex items-center gap-2">
            {
                isPending ? (
                    <Skeleton className="w-12 aspect-square rounded-full bg-gray-200" />
                ) : (
                    <Image
                        src={ownerData?.image || imageAssets.LogoPlaceholder}
                        alt="Fundraiser Image"
                        className="w-12 aspect-square rounded-full object-cover"
                        width={80}
                        height={80}
                    />
                )
            }
            <div>
                {
                    isPending ? (
                        <>
                            <Skeleton className="w-24 h-4 rounded-full bg-gray-200" />
                            <Skeleton className="w-20 h-3 rounded-full bg-gray-200 mt-2" />
                        </>
                    ) : (
                        <>
                            <h6 className="font-medium">{ownerData?.name}</h6>
                            <Link
                                href={`https://basescan.org/address/${address}`}
                                target="_blank"
                                className="text-sm text-gray-500 underline"
                            >
                                {truncateAddress(address)}
                            </Link>
                        </>
                    )
                }

            </div>
        </div>
    )
}

function WithdrawalCard() {
    return (
        <div className="flex flex-col gap-2 mt-2 bg-gray-100 p-6 rounded-xl">
            <p className="font-medium">First spaying treatment for 100 total cats</p>
            <div>
                <p className="text-sm">Total Withdrawn</p>
                <p>0.01 ETH</p>
            </div>
            <div>
                <p className="text-sm">Drawn to</p>
                <p className="font-medium text-sm">Soedirjo Animal Hospital</p>
                <p className="text-sm text-gray-600">0xF9FcD098320F9AeAe0670cc73A232974cEd11b72</p>
            </div>
            <div>
                <p className="text-sm">Status</p>
                {/* <p className="font-medium text-sm bg-green-100 text-green-600 px-4 py-1 rounded-full w-fit mt-1">Completed</p> */}
                <p className="font-medium text-sm bg-yellow-100 text-yellow-600 px-4 py-1 rounded-full w-fit mt-1">Waiting Approval</p>
            </div>
            <Button variant={"outline"} className="mt-2 h-12 text-sm">Approve Request</Button>
        </div>
    )
}