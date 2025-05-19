import DonationFill from "@/components/containers/DonationFill";
import { Skeleton } from "@/components/ui/skeleton";
import { getCampaignById, getCampaignOwner } from "@/lib/fetcher/campaign";
import { getUserByAddress } from "@/lib/fetcher/user";
import { truncateAddress } from "@/lib/utils";
import { Telescope } from "lucide-react";
import type { Metadata } from 'next'
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const getCampaign = await getCampaignById(id);

    return {
        title: getCampaign.data?.name,
        description: getCampaign.data?.description,
        openGraph: {
            title: getCampaign.data?.name,
            description: getCampaign.data?.description,
            url: `https://pawfunding.vercel.app/campaign/${id}`,
        },
    }
}

export default async function CampaignPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const getCampaign = await getCampaignById(id);
    const campaign = getCampaign.data;
    let owner = "";

    if (campaign) {
        owner = await getCampaignOwner(campaign.contractAddress);
    }

    if (getCampaign.error) {
        return (
            <div className="flex items-center justify-center h-dvh">
                <p className="text-gray-500 text-lg font-medium">
                    {getCampaign.message}
                </p>
            </div>
        )
    }

    return (
        <>
            <h1 className="mt-6 text-3xl font-bold">
                {campaign?.name}
            </h1>
            <div className="grid grid-cols-7 gap-6 mt-6">
                <section className="col-span-4 flex flex-col gap-4">
                    <Image
                        src={campaign?.image || ""}
                        className="aspect-video object-cover rounded-2xl"
                        alt="Campaign Image"
                        width={1000}
                        height={800}
                    />
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500">{campaign?.contractAddress}</p>
                        <Link
                            className="flex items-center gap-2"
                            href={`https://basescan.org/address/${campaign?.contractAddress}`}
                            target="_blank"
                        >
                            <Telescope size={18} />
                            <p className="underline font-medium text-sm">
                                View on Explorer
                            </p>
                        </Link>
                    </div>
                    <Suspense
                        fallback={
                            <div className="flex items-center gap-2">
                                <Skeleton className="w-12 aspect-square rounded-full bg-gray-200" />
                                <div>
                                    <Skeleton className="w-24 h-4 rounded-full bg-gray-200" />
                                    <Skeleton className="w-20 h-3 rounded-full bg-gray-200 mt-2" />
                                </div>
                            </div>
                        }
                    >
                        <Owner address={owner} />
                    </Suspense>
                    <p>{campaign?.description}</p>
                    {/* <div>
                        <h4 className="font-semibold">Withdrawal History</h4>
                        <WithdrawalCard />
                        <WithdrawalCard />
                    </div> */}
                </section>
                <aside className="col-span-3 relative">
                    <DonationFill contractAddress={campaign!.contractAddress} />
                </aside>
            </div>
        </>
    );
}

async function Owner({ address }: { address: string }) {
    const getUser = await getUserByAddress(address);
    const ownerData = getUser.data;

    return (
        <div className="flex items-center gap-2">
            <Image
                src={ownerData?.image || ""}
                alt="Fundraiser Image"
                className="w-12 aspect-square rounded-full object-cover bg-gray-200"
                width={80}
                height={80}
            />

            <div>
                <h6 className="font-medium">{ownerData?.name || "!Unknown"}</h6>
                <Link
                    href={`https://basescan.org/address/${address}`}
                    target="_blank"
                    className="text-sm text-gray-500 underline"
                >
                    {truncateAddress(address)}
                </Link>
            </div>
        </div>
    )
}

// function WithdrawalCard() {
//     return (
//         <div className="flex flex-col gap-2 mt-2 bg-gray-100 p-6 rounded-xl">
//             <p className="font-medium">First spaying treatment for 100 total cats</p>
//             <div>
//                 <p className="text-sm">Total Withdrawn</p>
//                 <p>0.01 ETH</p>
//             </div>
//             <div>
//                 <p className="text-sm">Drawn to</p>
//                 <p className="font-medium text-sm">Soedirjo Animal Hospital</p>
//                 <p className="text-sm text-gray-600">0xF9FcD098320F9AeAe0670cc73A232974cEd11b72</p>
//             </div>
//             <div>
//                 <p className="text-sm">Status</p>
//                 {/* <p className="font-medium text-sm bg-green-100 text-green-600 px-4 py-1 rounded-full w-fit mt-1">Completed</p> */}
//                 <p className="font-medium text-sm bg-yellow-100 text-yellow-600 px-4 py-1 rounded-full w-fit mt-1">Waiting Approval</p>
//             </div>
//             <Button variant={"outline"} className="mt-2 h-12 text-sm">Approve Request</Button>
//         </div>
//     )
// }