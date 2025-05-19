"use server";
import { FetcherReturnType, type User } from "../types";

export const getUserByAddress = async (address: string) => {
    try {
        const response = await fetch(
            `${process.env.API_ENDPOINT}/users/searchByAddress?address=${address}`
        );

        if (response.status == 404 || response.status == 400) {
            const resError: FetcherReturnType<null> = {
                code: 404,
                error: true,
                message: "User not found",
            };
            return resError;
        }
        if (!response.ok) {
            const resError: FetcherReturnType<null> = {
                error: true,
                message: "Failed to fetch user",
            };
            return resError;
        }

        const data = (await response.json()) as User[];
        const resSuccess: FetcherReturnType<User> = {
            error: false,
            message: `Successfully fetched user ${address}`,
            data: data[0],
        };
        return resSuccess;
    } catch (error) {
        throw new Error("Server Error: When trying to fetch user by address");
    }
};
