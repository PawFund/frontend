"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { base } from "viem/chains";
import { contractFactory } from "@/lib/constants";
import { parseEther } from "viem";
import { toast } from "sonner";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { createCampaign } from "@/lib/query-function/campaign";

export default function CreateCampaign() {
    const router = useRouter();
    const getDeployedCampaigns = useReadContract({
        ...contractFactory,
        functionName: 'getDeployedCampaigns',
    })

    const { writeContract, isPending: pendingSign, data: txHash } = useWriteContract()
    const { data: txReceipt, isLoading: loadingTx, isSuccess: successTx, isError, error: errorTx } = useWaitForTransactionReceipt({
        chainId: base.id,
        hash: txHash,
    })

    console.log("loadingTx ", loadingTx);
    console.log("txReceipt ", txReceipt);

    const [imageValue, setImageValue] = useState<File | null>(null);
    const [inputValues, setInputValues] = useState({
        name: "",
        description: "",
        goalAmount: "",
    });

    const create = useMutation({
        mutationFn: async (formData: FormData) => {
            createCampaign(formData);
        },
        onSuccess: () => {
            toast.success("Campaign created successfully", {
                duration: 10000,
                id: "create-loading",
                description: "Your campaign has been created successfully.",
                cancel: {
                    label: 'close',
                    onClick: () => console.log('Cancel clicked'),
                },
            });
            router.back();
        },
        onError: (error) => {
            toast.error("Campaign creation failed", {
                duration: 4000,
                id: "create-failed",
                description: error.message,
                cancel: {
                    label: 'close',
                    onClick: () => console.log('Cancel clicked'),
                },
            });
        }
    })

    useEffect(() => {
        if (txHash && loadingTx) {
            toast.loading("Creating Campaign", {
                id: "create-loading",
                description: () => (
                    <div className="flex flex-col text-sm">
                        <p>Please wait while we create your campaign. This may take a few minutes.</p>
                        <Link
                            href={`https://basescan.org/tx/${txHash}`}
                            target="_blank"
                            className="text-amber-600 underline"
                        >
                            View on Explorer
                        </Link>
                    </div>
                ),
            });
        }
    }, [txHash, loadingTx]);

    useEffect(() => {
        if (successTx) {
            getDeployedCampaigns.refetch();
        }
        if (isError) {
            toast.dismiss("create-loading");
            toast.error("Transaction Failed", {
                duration: 4000,
                id: "create-failed",
                description: errorTx?.message,
                cancel: {
                    label: 'close',
                    onClick: () => console.log('Cancel clicked'),
                },
            });
        }
    }, [successTx, isError, errorTx])

    useEffect(() => {
        if (getDeployedCampaigns.isSuccess && !getDeployedCampaigns.isRefetching) {
            saveDataToServer();
        }
    }, [getDeployedCampaigns.isRefetching, getDeployedCampaigns.isSuccess])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImageValue(file);
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "goalAmount") {
            if (/^(0|[1-9]\d*)?(\.\d*)?$/.test(value)) {
                setInputValues((prev) => ({
                    ...prev,
                    [name]: value,
                }));
            }
            return;
        }
        setInputValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!imageValue) {
            toast.error("Please upload an image");
            return;
        }
        if (!inputValues.name) {
            toast.error("Please enter a campaign name");
            return;
        }
        if (!inputValues.description) {
            toast.error("Please enter a campaign description");
            return;
        }
        if (!inputValues.goalAmount) {
            toast.error("Please enter a goal amount");
            return;
        }
        if (parseFloat(inputValues.goalAmount) <= 0) {
            toast.error("Please enter a valid goal amount");
            return;
        }

        writeContract({
            ...contractFactory,
            functionName: 'createCampaign',
            args: [
                parseEther(inputValues.goalAmount),
                BigInt(0),
            ],
        })
    }

    function saveDataToServer() {
        const contractData = getDeployedCampaigns.data as string[];
        const length = contractData.length;
        const deployedAddress = contractData[length - 1];

        const formData = new FormData();
        formData.append("image", imageValue as Blob);
        formData.append("name", inputValues.name);
        formData.append("description", inputValues.description);
        formData.append("typeAnimal", "-");
        formData.append("contractAddress", deployedAddress as string);

        if (successTx) {
            create.mutate(formData);
        }
    }

    return (
        <div className="flex flex-col max-w-3xl mx-auto my-8">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-4 font-bold text-2xl cursor-pointer"
            >
                <ArrowLeft
                    strokeWidth={3}
                    className="text-neutral-800 size-5"
                />
                <span>Create Campaign</span>
            </button>
            <p className="mt-4">Tell us about your campaign. What are you raising funds for? Share your story and help others understand your cause.</p>
            <form className="flex flex-col gap-4 mt-8">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-gray-100 border-2 border-gray-200 p-8 rounded-lg">
                    {
                        imageValue ? (
                            <Image
                                src={URL.createObjectURL(imageValue)}
                                alt="Campaign"
                                width={500}
                                height={500}
                                className="object-cover w-80 aspect-video rounded-lg"
                            />
                        ) : (
                            <div className="h-auto w-full sm:w-80 aspect-video rounded-lg bg-gray-200 border-2" />
                        )
                    }

                    <div className="w-full">
                        <p className="text-lg font-medium">Add a image</p>
                        <p className="text-sm text-gray-600 mt-2">Upload a high-quality image that best represents your campaign. This will be the first thing people see. Use a clear, engaging photo that captures the essence of your cause.</p>
                        <Button
                            asChild
                            variant={"outline"}
                            className="h-9 text-sm px-4 bg-transparent mt-3"
                        >
                            <Label
                                htmlFor={`${false ? "" : "image-campaign"
                                    }`}
                                className="cursor-pointer"
                            >
                                Upload
                            </Label>
                        </Button>
                        <Input
                            onChange={handleImageChange}
                            id="image-campaign"
                            className="hidden"
                            name="image"
                            type="file"
                            accept="image/*"
                        />
                    </div>
                </div>
                <div className=" bg-gray-100 border-2 border-gray-200 p-8 rounded-lg">
                    <h3 className="text-xl font-medium mb-1">
                        Campaign Name
                    </h3>
                    <p>
                        Choose a name that reflects your campaign's purpose. This is how people will identify your cause, so make it memorable and meaningful.
                    </p>
                    <Input
                        onChange={handleInputChange}
                        value={inputValues.name}
                        name="name"
                        className="mt-4 h-11"
                        type="text"
                        placeholder="Your campaign name"
                    // disabled={isLoading}
                    />
                </div>
                <div className=" bg-gray-100 border-2 border-gray-200 p-8 rounded-lg">
                    <h3 className="text-xl font-medium mb-1">
                        Description
                    </h3>
                    <p>
                        Write a compelling description that explains your campaign's mission, goals, and impact. Share your story and connect with potential supporters on an emotional level.
                    </p>
                    <Textarea
                        onChange={handleInputChange}
                        value={inputValues.description}
                        name="description"
                        className="mt-4 h-11"
                        placeholder="Your campaign description"
                    // disabled={isLoading}
                    />
                </div>
                <div className=" bg-gray-100 border-2 border-gray-200 p-8 rounded-lg">
                    <h3 className="text-xl font-medium mb-1">
                        Goal Amount
                    </h3>
                    <p>
                        Set a clear and realistic fundraising goal. This will help potential supporters understand the financial target you aim to achieve and how their contributions will make a difference.
                    </p>
                    <div className="relative max-w-[200px]">
                        <Input
                            onChange={handleInputChange}
                            value={inputValues.goalAmount}
                            name="goalAmount"
                            className="mt-4 h-11 pr-12"
                            type="text"
                            inputMode="decimal"
                            placeholder="0.00"
                        // disabled={isLoading}
                        />
                        <Icon
                            icon="cryptocurrency:eth"
                            width="20"
                            height="20"
                            className="absolute top-1/2 right-5 transform -translate-y-1/2 text-blue-500"
                        />
                    </div>
                </div>
                <Button
                    className="mt-4"
                    onClick={handleSubmit}
                    disabled={pendingSign || loadingTx}
                >
                    Create
                </Button>
            </form>
        </div>
    );
}
