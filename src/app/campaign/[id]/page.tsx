import Image from "next/image";
import { imageAssets } from "@/assets";
import { Telescope } from "lucide-react";
import Link from "next/link";
import { truncateAddress } from "@/lib/utils";
import DonationFill from "@/components/containers/DonationFill";
import { Button } from "@/components/ui/button";


const mockData = {
    desc: "This campaign aims to address the overpopulation of stray cats by organizing a spay and neuter program. Overpopulation of stray cats is a significant issue that leads to various challenges, including the spread of diseases, competition for limited resources, and the suffering of animals due to lack of proper care. By spaying and neutering stray cats, we can prevent the birth of countless unwanted kittens, reduce the strain on animal shelters, and improve the overall well-being of these animals. The funds raised through this campaign will be used to cover the costs of veterinary procedures, post-operative care, and outreach efforts to educate the community about the importance of controlling the stray cat population. Every contribution, no matter how small, will make a meaningful difference in the lives of these animals and the communities they inhabit. Our team is committed to transparency and accountability. All transactions and fund allocations will be publicly accessible on the blockchain, ensuring that every donor can track how their contributions are being utilized. Together, we can create a sustainable solution to the stray cat overpopulation problem and make a positive impact on animal welfare. Join us in this mission to give stray cats a better future. Your support will help us take a step closer to a world where every animal is treated with compassion and care. Thank you for being a part of this important cause."
}

export default function CampaignPage() {
    return (
        <>
            <h1 className="mt-6 text-3xl font-bold">
                Spay & Neuter Stray Cats to Prevent Overpopulation
            </h1>
            <div className="grid grid-cols-7 gap-6 mt-6">
                <section className="col-span-4 flex flex-col gap-4">
                    <Image
                        src={imageAssets.StrayCatsPlaceholder}
                        className="aspect-video object-cover rounded-2xl"
                        alt="Campaign Image"
                    />
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500">0xf436a2443eb5Dc420C2405399f42914A0DbD8AAA</p>
                        <Link
                            className="flex items-center gap-2"
                            href={`https://etherscan.io/address/0xf436a2443eb5Dc420C2405399f42914A0DbD8AAA`}
                            target="_blank"
                        >
                            <Telescope size={18} />
                            <p className="underline font-medium text-sm">
                                View on Explorer
                            </p>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <Image
                            src={imageAssets.LogoPlaceholder}
                            alt="Fundraiser Image"
                            className="w-12 aspect-square rounded-full object-cover"
                        />
                        <div>
                            <h6 className="font-medium">Animal Shell PWT</h6>
                            <Link
                                href={`https://etherscan.io/address/0xf436a2443eb5Dc420C2405399f42914A0DbD8AAA`}
                                target="_blank"
                                className="text-sm text-gray-500 underline"
                            >
                                {truncateAddress("0xf436a2443eb5Dc420C2405399f42914A0DbD8AAA")}
                            </Link>
                        </div>
                    </div>
                    <p>{mockData.desc}</p>
                    <div>
                        <h4 className="font-semibold">Withdrawal History</h4>
                        <WithdrawalCard/>
                        <WithdrawalCard/>
                    </div>
                </section>
                <aside className="col-span-3 relative">
                    <DonationFill className="sticky top-32" />
                </aside>
            </div>
        </>
    );
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