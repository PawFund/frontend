import { ImageResponse } from "next/og";
import React from "react";
import { getCampaignById } from "@/lib/fetcher/campaign";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { id: string } }) {
    const { id } = await params;
    const { data } = await getCampaignById(id);
    return new ImageResponse(
        React.createElement("div", {
            style: {
                padding: 12,
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
                backgroundImage: `url(${data?.image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            },
        }),
    );
}
