import { Goal, Heart } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Progress } from "../ui/progress";

type CampaignCardProps = {
    daysLeft: number;
    campaignImage: string | StaticImageData;
    fundraiserImage: string | StaticImageData;
    title: string;
    shortDesc: string;
    raised: number;
    goal: number;
    donationCount: number;
    campaignId: string | number;
};

export default function CampaignCard(props: CampaignCardProps) {
    const raisedPercentage = (props.raised / props.goal) * 100;

    return (
        <Link href={`/campaign/${props.campaignId}`} className=" rounded-t-4xl rounded-b-3xl p-3 flex flex-col gap-4 hover:bg-gray-100 hover:scale-[101%] transition-all duration-300 ease-in-out cursor-pointer">
            <div className="relative">
                <Image
                    src={props.campaignImage}
                    alt={`campaign ${props.campaignId}`}
                    className="rounded-3xl w-full aspect-video"
                />
                <p className="absolute bg-white/30 text-white px-4 py-2 top-2 right-2 rounded-full text-xs font-bold backdrop-blur-[2px]">
                    {props.daysLeft > 0
                        ? `${props.daysLeft} days left`
                        : "Campaign ended"}
                </p>
                <Image
                    src={props.fundraiserImage}
                    alt={`fundraiser ${props.campaignId}`}
                    className="absolute bottom-2 left-2 rounded-full w-10 aspect-square border-2 border-gray-200"
                />
            </div>
            <div className="flex flex-col gap-2">
                <h6 className="font-bold text-xl">{props.title}</h6>
                <p className="line-clamp-2">{props.shortDesc}</p>
                <p className="font-semibold text-sm">{props.raised} ETH Raised</p>
                <div className="flex items-center gap-2 w-full">
                    <Progress fgClassName="bg-green-500" bgClassName="bg-gray-300" value={raisedPercentage} />
                    <p className="font-bold text-xs">{raisedPercentage.toFixed(0)}%</p>
                </div>
                <div className="w-full flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <Heart size={16} />
                        <p>{props.donationCount} Donations</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Goal size={16} />
                        <p>{props.goal} ETH Goal</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
