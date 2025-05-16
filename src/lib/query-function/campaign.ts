export type CampaignReturnType = {
    contractAddress: string;
    description: string;
    image: string;
    name: string;
    typeAnimal: string;
    _id: string;
    __v: number
}

export const getAllCampaigns = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT_PROD}/campaigns/getAllCampaign`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch campaigns");
    }

    const data = await response.json();
    return data;
}

export const getCampaignById = async (campaignId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT_PROD}/campaigns/getCampaign/${campaignId}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch campaign");
    }

    const data = await response.json();
    return data;
}