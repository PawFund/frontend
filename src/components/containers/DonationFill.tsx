"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Progress } from "@/components/ui/progress";
import { Calendar, Goal, HeartHandshake, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { useReadContracts, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { contractABI } from "@/lib/constants";
import { formatEther, parseEther } from "viem";
import { base } from "viem/chains";
import { useAccount } from "wagmi";
import { Skeleton } from "../ui/skeleton";

type DonationFillProps = {
    className?: string;
    daysLeft?: number;
    contractAddress: string;
};

const amountSelectValues = [
    { id: "value 1", value: "0.1" },
    { id: "value 2", value: "0.2" },
    { id: "value 3", value: "0.3" },
    { id: "value 4", value: "0.4" },
];

export default function DonationFill(props: DonationFillProps) {
    const contract = {
        address: props.contractAddress as `0x${string}`,
        abi: contractABI,
    };

    const [donationAmount, setDonationAmount] = useState("");
    const { isConnected } = useAccount();
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
        ],
    });
    const goalAmount = Number(
        formatEther(
            getDataContract.data?.[0].result as bigint || BigInt(0)
        )
    )
    const totalDonated = Number(
        formatEther(
            getDataContract.data?.[1].result as bigint || BigInt(0)
        )
    )

    const percentageRaised = (totalDonated / goalAmount) * 100;

    const { writeContract, isPending: pendingSign, data: txHash } = useWriteContract()
    const { isLoading: loadingTx, isSuccess: successTx, isError, error: errorTx } = useWaitForTransactionReceipt({
        chainId: base.id,
        hash: txHash,
    })

    useEffect(() => {
        if (txHash && loadingTx) {
            toast.loading("Processing Donation", {
                id: "donate-loading",
                description: () => (
                    <div className="flex flex-col text-sm">
                        <p>Your donation is being processed on the blockchain. This may take a few moments to complete.</p>
                        <Link
                            href={`https://basescan.org/tx/${txHash}`}
                            target="_blank"
                            className="text-amber-600 underline"
                        >
                            View on Explorer
                        </Link>
                    </div>
                ),
            });
        }
    }, [txHash, loadingTx]);

    useEffect(() => {
        if (successTx) {
            getDataContract.refetch();
            toast.dismiss("donate-loading");
            toast.success("Donation Successful", {
                id: "donate-success",
                duration: 10000,
                description: () => (
                    <div className="flex flex-col text-sm">
                        <p>Your donation was successful! Thank you for your support.</p>
                        <Link
                            href={`https://basescan.org/tx/${txHash}`}
                            target="_blank"
                            className="text-amber-600 underline"
                        >
                            View on Explorer
                        </Link>
                    </div>
                ),
                cancel: {
                    label: 'close',
                    onClick: () => console.log(`Explorer: https://basescan.org/tx/${txHash}`),
                },
            });
            setDonationAmount("");
        }
        if (isError) {
            toast.dismiss("donate-loading");
            toast.error("Transaction Failed", {
                duration: 8000,
                id: "donate-failed",
                description: errorTx?.message,
                cancel: {
                    label: 'close',
                    onClick: () => console.log('Cancel clicked'),
                },
            });
        }

    }, [successTx, isError, errorTx])

    const handleDonationSelect = (value: string) => {
        setDonationAmount(value);
    };

    const handleDonationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^(0|[1-9]\d*)?(\.\d*)?$/.test(value)) {
            setDonationAmount(value);
        }
    };

    const handleDonate = () => {
        if (!donationAmount) {
            toast.error("Please fill in the amount of donation you wish to donate.");
            return;
        }
        if (!isConnected) {
            toast.error("Please Login with your wallet to donate.");
            return;
        }

        writeContract({
            abi: contractABI,
            address: props.contractAddress as `0x${string}`,
            functionName: "donate",
            value: parseEther(donationAmount)
        })
    }

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!", {
            description: "Share this link with your friends and family to support the cause.",
        });
    }

    return (
        <div
            className={cn(
                `flex flex-col gap-3 bg-gray-100 rounded-2xl p-8 w-full`,
                props.className
            )}
        >
            <div className="flex items-center gap-3">
                <Icon
                    icon="cryptocurrency:eth"
                    className="text-blue-500"
                    width="28"
                    height="28"
                />
                {
                    getDataContract.isPending || getDataContract.isRefetching ? (
                        <Skeleton className="w-24 h-6 rounded-full bg-gray-200" />
                    ) : (
                        <h3 className="font-medium text-2xl">
                            <strong>{totalDonated}</strong> ETH Raised
                        </h3>
                    )
                }
            </div>
            <div className="flex items-center gap-2">
                <Progress
                    fgClassName="bg-green-500"
                    className="h-3"
                    bgClassName="bg-gray-200"
                    value={percentageRaised}
                />
                {
                    getDataContract.isPending || getDataContract.isRefetching ? (
                        <Skeleton className="w-8 h-3 rounded-full bg-gray-200" />
                    ) : (
                        <p className="font-medium">{percentageRaised.toFixed(1)}%</p>
                    )
                }
            </div>
            <div className="flex gap-4 items-center text-sm">
                <div className="flex items-center gap-2">
                    <Goal size={16} />
                    <p>{goalAmount} ETH Goal</p>
                </div>
                {/* <div className="flex items-center gap-2">
                    <Heart size={16} />
                    <p>{100} Donations</p>
                </div> */}
                <div className="flex items-center gap-2">
                    <Calendar size={15} strokeWidth={1.5} />
                    <p>Not Specified</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <p className="font-medium">Enter Your Donation</p>
                <div className="flex gap-2">
                    {amountSelectValues.map((item) => (
                        <button
                            disabled={pendingSign}
                            onClick={() => handleDonationSelect(item.value)}
                            key={item.id}
                            className={`flex items-center text-sm px-4 h-11 border border-gray-300 w-full rounded-full shadow-xs justify-center cursor-pointer ${donationAmount === item.value ? "ring-1 ring-gray-400" : ""}`}
                        >
                            {item.value} ETH
                        </button>
                    ))}
                </div>
                <div className="relative mt-[5px]">
                    <Icon
                        icon="cryptocurrency:eth"
                        width="20"
                        height="20"
                        className="absolute top-1/2 left-5 transform -translate-y-1/2 text-neutral-700"
                    />
                    <Input
                        disabled={pendingSign}
                        onChange={handleDonationInput}
                        value={donationAmount}
                        type="text"
                        inputMode="decimal"
                        placeholder="0.00"
                        className="text-end pl-12 font-medium"
                    />
                </div>
                <div className="mt-4">
                    <Button disabled={pendingSign} onClick={handleDonate} className="w-full flex items-center justify-center gap-3">
                        <HeartHandshake className="size-5" strokeWidth={2} />
                        Donate
                    </Button>
                    <Button onClick={handleShare} className="w-full mt-3 bg-gray-200 hover:bg-gray-200/50 flex items-center justify-center gap-3" variant={"secondary"}>
                        <Share2 className="size-5" strokeWidth={2} />
                        Share
                    </Button>
                </div>
            </div>
        </div>
    );
}
