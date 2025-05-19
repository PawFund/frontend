"use server";
import { type Campaign, type FetcherReturnType } from "../types";

export const getAllCampaigns = async () => {
    try {
        const response = await fetch(
            `${process.env.API_ENDPOINT}/campaigns/getAllCampaign`
        );

        if (!response.ok) {
            const resError: FetcherReturnType<Campaign[]> = {
                error: true,
                message: "Failed to fetch campaigns",
                data: [],
            };
            return resError;
        }

        const data = (await response.json()) as Campaign[];
        const resSuccess: FetcherReturnType<Campaign[]> = {
            error: false,
            message: "Successfully fetched campaigns",
            data: data,
        };

        return resSuccess;
    } catch (error) {
        throw new Error("Server Error: When trying to fetch campaigns",); 
    }
};

export const getCampaignById = async (campaignId: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT_PROD}/campaigns/getCampaign/${campaignId}`,
        {
            method: "GET",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch campaign");
    }

    const data = await response.json();
    return data;
};

export const createCampaign = async (formData: FormData) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT_PROD}/campaigns/createCampaign`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create campaign");
    }

    const data = await response.json();
    return data;
};
