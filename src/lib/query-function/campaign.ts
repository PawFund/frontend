export type CampaignReturnType = {
    contractAddress: string;
    description: string;
    image: string;
    name: string;
    typeAnimal: string;
    _id: string;
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