export const contractABI = [
    {
        inputs: [
            { internalType: "address", name: "_owner", type: "address" },
            { internalType: "uint256", name: "_goalAmount", type: "uint256" },
            { internalType: "uint256", name: "_minDonation", type: "uint256" },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "donor",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "DonationReceived",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "requestId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "approvalCount",
                type: "uint256",
            },
        ],
        name: "WithdrawalApproved",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "requestId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "WithdrawalProcessed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "requestId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "string",
                name: "requestName",
                type: "string",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "recipient",
                type: "address",
            },
        ],
        name: "WithdrawalRequested",
        type: "event",
    },
    {
        inputs: [
            { internalType: "uint256", name: "_requestId", type: "uint256" },
        ],
        name: "approveWithdrawal",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "donate",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "donors",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "goalAmount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "hasDonated",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "isCompleted",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "minDonation",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "string", name: "_requestName", type: "string" },
            { internalType: "uint256", name: "_amount", type: "uint256" },
            { internalType: "address", name: "_recipient", type: "address" },
        ],
        name: "requestWithdrawal",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "totalDonated",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "withdrawalRequests",
        outputs: [
            { internalType: "string", name: "requestName", type: "string" },
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "address", name: "recipient", type: "address" },
            { internalType: "bool", name: "approved", type: "bool" },
            { internalType: "uint256", name: "approvalCount", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
    },
];

export const factoryAddress = "0x29AFB3d2448ddaa0e039536002234a90aF1e4f31";

export const factoryABI = [
    {
        inputs: [
            { internalType: "uint256", name: "_goalAmount", type: "uint256" },
            { internalType: "uint256", name: "_minDonation", type: "uint256" },
        ],
        name: "createCampaign",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "deployedCampaigns",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getDeployedCampaigns",
        outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
        stateMutability: "view",
        type: "function",
    },
];

export const contractFactory = {
    abi: factoryABI,
    address: factoryAddress as `0x${string}`,
};
