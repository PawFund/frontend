
export type Campaign = {
    contractAddress: string;
    description: string;
    image: string;
    name: string;
    typeAnimal: string;
    _id: string;
    __v: number
}

export type FetcherReturnType<T> = {
    error: boolean;
    message: string;
    data: T;
}