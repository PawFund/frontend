import { LoaderCircle } from "lucide-react";

export default function CampaignLoading() {
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