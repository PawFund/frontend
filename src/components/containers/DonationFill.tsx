"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar, Goal, HandHelping, Heart, HeartHandshake, Share2 } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Link from "next/link";

type DonationFillProps = {
    className?: string;
    goal?: number;
    raised?: number;
    donations?: number;
    daysLeft?: number;
};

const amountSelectValues = [
    { id: "value 1", value: "0.1" },
    { id: "value 2", value: "0.2" },
    { id: "value 3", value: "0.3" },
    { id: "value 4", value: "0.4" },
];

export default function DonationFill(props: DonationFillProps) {
    const [donationAmount, setDonationAmount] = useState("");

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

        return
        toast.loading("Processing Donation", {
            dismissible: false,
            duration: Infinity,
            id: "donate-loading",
            description: () => (
                <div className="flex flex-col text-sm">
                    <p>Your donation is being processed on the blockchain. This may take a few moments to complete.</p>
                    <Link
                        href={`https://etherscan.io/tx/${"0xf436a2443eb5Dc420C2405399f42914A0DbD8AAA"}`}
                        target="_blank"
                        className="text-amber-600 underline"
                    >
                        View on Explorer
                    </Link>
                </div>
            ),
        });
    }

    const handleShare = () => {


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
                <h3 className="font-medium text-2xl">
                    <strong>{1.43}</strong> ETH Raised
                </h3>
            </div>
            <div className="flex items-center gap-2">
                <Progress
                    fgClassName="bg-green-500"
                    bgClassName="bg-gray-200"
                    value={30}
                />
                <p className="font-medium">30%</p>
            </div>
            <div className="flex gap-4 items-center text-sm">
                <div className="flex items-center gap-2">
                    <Goal size={16} />
                    <p>{5} ETH Goal</p>
                </div>
                <div className="flex items-center gap-2">
                    <Heart size={16} />
                    <p>{100} Donations</p>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar size={15} strokeWidth={1.5} />
                    <p>{20} Days Left</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <p className="font-medium">Enter Your Donation</p>
                <div className="flex gap-2">
                    {amountSelectValues.map((item) => (
                        <button
                            // disabled
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
                        onChange={handleDonationInput}
                        value={donationAmount}
                        type="text"
                        inputMode="decimal"
                        placeholder="0.00"
                        className="text-end pl-12 font-medium"
                    />
                </div>
                <div className="mt-4">
                    <Button onClick={handleDonate} className="w-full flex items-center justify-center gap-3">
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
