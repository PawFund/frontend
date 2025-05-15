"use client"

import { Button } from "@/components/ui/button";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useBalance } from "wagmi";
import { type GetBalanceData, } from 'wagmi/query'
import { baseSepolia } from "@reown/appkit/networks";
import { formatUnits } from 'viem'
import { Skeleton } from "@/components/ui/skeleton";
import { truncateAddress } from "@/lib/utils";
import { Icon } from "@iconify/react"
import { UserMenu } from "../containers/UserMenu";

export default function ReownConnectButton() {
    const { open } = useAppKit();
    const { isConnected, address } = useAccount();

    if (!isConnected) {
        return (
            <Button
                variant={`navbar`}
                className={`flex items-center gap-2`}
                onClick={() => open()}
            >
                Login
            </Button>
        )
    }

    return (
        <UserMenu
            trigger={
                <Button
                    variant={`navbar`}
                    className={`flex items-center gap-2 pl-5 pr-2`}
                >
                    <ConnectedContent address={address} />
                </Button>
            }
        />
    )
}

function ConnectedContent({ address }: { address: `0x${string}` | undefined }) {
    const { data, isLoading } = useBalance({
        address: address,
        chainId: baseSepolia.id,
    })

    return (
        <>
            <span className="font-medium flex items-center gap-2">
                {
                    isLoading ?
                        <Skeleton className="h-3 w-24 bg-gray-300 opacity-20" /> :
                        <>
                            <Icon icon="cryptocurrency:eth" className="text-neutral-800" />
                            <p>{formatData(data)}</p>
                        </>
                }
            </span>
            <span className="px-3 py-1.5 bg-gray-100/80 rounded-full border border-white font-medium">
                {truncateAddress(address)}
            </span>
        </>
    )
}

function formatData(data: GetBalanceData | undefined) {
    if (!data) return "0.00 ETH";
    if (data) {
        const formattedValue = formatUnits(data.value, data.decimals);
        return `${Number(formattedValue).toFixed(2)} ${data.symbol}`;
    }
}