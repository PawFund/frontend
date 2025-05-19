import { Infinity } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { CardSkeleton } from "./CardSkeleton";
import { ContractData } from "./ContractData";

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
    contractAddress: string;
};


export default function CampaignCard(props: CampaignCardProps) {

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
                <ContractData contractAddress={props.contractAddress}/>
            </div>
        </Link>
    );
}

export { CardSkeleton }
