"use client"

import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { contractABI } from "@/lib/constants";
import { Goal } from "lucide-react";
import { useEffect, useState } from "react"
import { formatEther } from "viem";
import { useReadContracts } from "wagmi";

export function ContractData({ contractAddress }: { contractAddress: string }) {
    const [raisedPercentage, setRaisedPercentage] = useState(0);

    const address = contractAddress;
    const contractData = {
        abi: contractABI,
        address: address as `0x${string}`,
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
        <>
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
        </>
    );

}