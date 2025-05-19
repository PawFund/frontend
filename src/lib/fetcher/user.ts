export const getUserByAddress = async (address: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT_PROD}/users/searchByAddress?address=${address}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }

    const data = await response.json();
    return data[0];
}