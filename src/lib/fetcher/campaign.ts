"use server";
import { type Campaign, type FetcherReturnType } from "../types";

export const getAllCampaigns = async () => {
    try {
        const response = await fetch(
            `${process.env.API_ENDPOINT}/campaigns/getAllCampaign`
        );

        if (!response.ok) {
            const resError: FetcherReturnType<null> = {
                error: true,
                message: "Failed to fetch campaigns",
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
    } catch (err) {
        console.log(err);
        throw new Error("Server Error: When trying to fetch campaigns");
    }
};

export const getCampaignById = async (campaignId: string) => {
    try {
        const response = await fetch(
            `${process.env.API_ENDPOINT}/campaigns/getCampaign/${campaignId}`
        );
        if (response.status == 404 || response.status == 400) {
            const resError: FetcherReturnType<null> = {
                code: 404,
                error: true,
                message: "No campaigns found",
            };
            return resError;
        }
        if (!response.ok) {
            const resError: FetcherReturnType<null> = {
                error: true,
                message: "Failed to fetch campaigns",
            };
            return resError;
        }
        const data = (await response.json()) as Campaign;
        const resSuccess: FetcherReturnType<Campaign> = {
            error: false,
            message: `Successfully fetched campaign ${campaignId}`,
            data: data,
        };
        return resSuccess;
    } catch (err) {
        console.log(err);
        throw new Error("Server Error: When trying to fetch campaign by ID");
    }
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

import { readContract, type ReadContractErrorType } from "@wagmi/core";
import { contractABI } from "../constants";
import { appKitConfig } from "../reownConfig";
export const getCampaignOwner = async (contractAddress: string) => {
    try {
        const ownerAddress = await readContract(appKitConfig, {
            abi: contractABI,
            address: contractAddress as `0x${string}`,
            functionName: "owner",
        });

        return ownerAddress as string;
    } catch (error) {
        const err = error as ReadContractErrorType;
        throw new Error("Contract address is invalid: " + err.shortMessage);
    }
};
