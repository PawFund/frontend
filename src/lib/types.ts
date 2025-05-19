
export type Campaign = {
    contractAddress: string;
    description: string;
    image: string;
    name: string;
    typeAnimal: string;
    _id: string;
    __v: number;
}

export type User = {
    _id: string;
    address: string;
    name: string;
    image: string;
    email: string;
    social: string;
    __v: number;
}

export type FetcherReturnType<T> = {
    error: boolean;
    message: string;
    code?: number;
    data?: T | null;
}