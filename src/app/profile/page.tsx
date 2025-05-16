"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useAccount } from "wagmi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

type FormProps = {
    name: string;
    email: string;
    social: string;
};

export default function ProfilePage() {
    const router = useRouter();
    const { isConnected, address } = useAccount();

    const [inputValues, setInputValues] = useState<FormProps>({
        name: "",
        email: "",
        social: "",
    });
    const [image, setImage] = useState<{ file?: File | null; url?: string }>();
    const [userId, setUserId] = useState<string | null>(null);
    const [isChanged, setIsChanged] = useState(false);

    const queryClient = useQueryClient();
    const getProfile = useQuery({
        queryKey: ["getProfile"],
        queryFn: async () => {
            const response: Response = await fetch(
                `${process.env.NEXT_PUBLIC_ENDPOINT_PROD}/users/searchByAddress?address=${address}`
            );
            if (response.status == 404) {
                return null;
            }
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
    });

    const addProfile = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_ENDPOINT_PROD}/users/regist`,
                {
                    method: "POST",
                    body: data,
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
        onSuccess: () => {
            toast.dismiss("loading-profile");
            toast.success("Profile updated successfully");
            setIsChanged(false);
        },
        onError: (error) => {
            toast.dismiss("loading-profile");
            if (error instanceof Error) {
                toast.error("Error while updating profile", {
                    description: error.message,
                });
            } else {
                toast.error("An unknown error occurred");
            }
        },
    });

    const updateProfile = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_ENDPOINT_PROD}/users/update/${userId}`,
                {
                    method: "PUT",
                    body: data,
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
        onSuccess: () => {
            toast.dismiss("loading-profile");
            toast.success("Profile updated successfully");
            setIsChanged(false);
        },
        onError: (error) => {
            toast.dismiss("loading-profile");
            if (error instanceof Error) {
                toast.error("Error while updating profile", {
                    description: error.message,
                });
            } else {
                toast.error("An unknown error occurred");
            }
        },
    });

    const isLoading = getProfile.isPending || addProfile.isPending || updateProfile.isPending;
    if (addProfile.isPending || updateProfile.isPending) {
        toast.loading("Loading...", {
            description: "Please wait while updating your profile",
            id: "loading-profile",
        });
    }

    useEffect(() => {
        if (getProfile.isSuccess && getProfile.data) {
            const { name, email, social, image, _id } = getProfile.data[0];
            setInputValues({
                name: name || "",
                email: email || "",
                social: social || "",
            });
            setImage((prev) => ({
                ...prev,
                url: image || "",
            }));
            setUserId(_id);
        }
    }, [getProfile.isSuccess, getProfile.data]);

    useEffect(() => {
        setUserId(null);
        setInputValues({
            name: "",
            email: "",
            social: "",
        });
        setImage({
            file: null,
            url: undefined,
        });
        setIsChanged(false);
        queryClient.invalidateQueries({ queryKey: ['getProfile'] })
    }, [address]);

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append("address", address || "");
        const data = Object.fromEntries(formData.entries());

        if (!(data.image as File).size && !image?.url) {
            toast.error("Please upload an image");
            return;
        }
        if (!data.name) {
            toast.error("Please enter a name");
            return;
        }
        if (!data.email) {
            toast.error("Please enter an email");
            return;
        }
        if (!data.social) {
            toast.error("Please enter a social link");
            return;
        }

        if (userId) {
            updateProfile.mutate(formData);
        } else {
            addProfile.mutate(formData);
        }
    };
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage((prev) => ({ ...prev, file }));
        }
        setIsChanged(true);
    };
    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputValues((prev) => ({
            ...prev,
            [name]: value,
        }));
        setIsChanged(true);
    };

    const handleBack = () => {
        router.back();
    }

    if (!isConnected) {
        router.back();
        return null;
    }

    return (
        <div className="flex flex-col max-w-3xl mx-auto my-8">
            <button onClick={handleBack} className="flex items-center gap-4 font-bold text-2xl cursor-pointer">
                <ArrowLeft
                    strokeWidth={3}
                    className="text-neutral-800 size-5"
                />
                <span>Profile</span>
            </button>
            <form
                onSubmit={handleFormSubmit}
                className="flex flex-col gap-4 mt-8"
            >
                <LocalContainer>
                    <h3 className="text-xl font-medium mb-1">Image or Logo</h3>
                    <p>
                        This is your organization’s logo. Click on the avatar to
                        upload a custom one.
                    </p>
                    <div className="flex items-center w-fit gap-4 mt-4">
                        <Label
                            htmlFor={`${isLoading ? "" : "image-user"
                                }`}
                            className="cursor-pointer"
                        >
                            <Avatar className="size-24">
                                <AvatarImage
                                    src={
                                        image?.file
                                            ? URL.createObjectURL(image.file)
                                            : image?.url
                                                ? image.url
                                                : undefined
                                    }
                                    alt="@shadcn"
                                />
                                <AvatarFallback className="bg-radial from-blue-400 from-40% to-blue-500 text-white font-semibold text-2xl">
                                    0X
                                </AvatarFallback>
                            </Avatar>
                        </Label>
                        <Button
                            asChild
                            variant={"outline"}
                            className="h-9 text-sm px-4 bg-transparent mt-2"
                        >
                            <Label
                                htmlFor={`${isLoading ? "" : "image-user"
                                    }`}
                                className="cursor-pointer"
                            >
                                Upload
                            </Label>
                        </Button>
                    </div>
                    <Input
                        onChange={handleImageChange}
                        id="image-user"
                        className="hidden"
                        name="image"
                        type="file"
                        accept="image/*"
                    />
                </LocalContainer>
                <LocalContainer>
                    <h3 className="text-xl font-medium mb-1">
                        Fundraiser Name
                    </h3>
                    <p>
                        This is the name that will be publicly displayed on your
                        campaigns and profile.
                    </p>
                    <Input
                        onChange={handleChangeInput}
                        value={inputValues?.name}
                        name="name"
                        className="mt-4 h-11"
                        type="text"
                        placeholder="Your Organization or Individual Name"
                        disabled={isLoading}
                    />
                </LocalContainer>
                <LocalContainer>
                    <h3 className="text-xl font-medium mb-1">Email</h3>
                    <p>
                        This email will be used for all communications related
                        to your campaigns and profile.
                    </p>
                    <Input
                        onChange={handleChangeInput}
                        value={inputValues?.email}
                        name="email"
                        className="mt-4 h-11"
                        type="email"
                        placeholder="yourname@example.com"
                        disabled={isLoading}
                    />
                </LocalContainer>
                <LocalContainer>
                    <h3 className="text-xl font-medium mb-1">
                        Website or Social Media
                    </h3>
                    <p>
                        Add a link to your official website or profile
                        (Instagram, Facebook, etc).
                    </p>
                    <Input
                        onChange={handleChangeInput}
                        value={inputValues?.social}
                        name="social"
                        className="mt-4 h-11"
                        type="url"
                        placeholder="https://example.com"
                        disabled={isLoading}
                    />
                </LocalContainer>
                <div className="ml-auto">
                    <Button disabled={!isChanged || isLoading} type="submit">Save</Button>
                </div>
            </form>
        </div>
    );
}

function LocalContainer({ children }: { children: React.ReactNode }) {
    return <div className="bg-gray-100 p-8 rounded-lg">{children}</div>;
}
