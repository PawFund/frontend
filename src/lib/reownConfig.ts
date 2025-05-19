import {
    cookieStorage,
    createStorage,
    http,
    type Storage,
    type Config,
} from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, sepolia, baseSepolia, base } from "@reown/appkit/networks";
import { createAppKit, type Metadata } from "@reown/appkit/react";

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID as string;
const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string;

if (!projectId) {
    throw new Error("Project ID is not defined");
}
if (!alchemyApiKey) {
    throw new Error("Alchemy API Key is not defined");
}

const metadata: Metadata = {
    name: "Paw Fund",
    description:
        "Paw Fund is a fundraising platform for animal welfare organizations.",
    url: "https://pawfunding.vercel.app",
    icons: [
        "https://raw.githubusercontent.com/PawFund/frontend/79d0f5ab18545663f5ea20098dbf7dc47ead9332/public/pawfund.svg",
    ],
};


export const networks = [mainnet, sepolia, baseSepolia, base];
export const defaultNetwork = base;

const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage,
    }) as Storage,
    ssr: true,
    projectId,
    networks: [defaultNetwork],
    chains:[defaultNetwork],
    transports: {
        [defaultNetwork.id]: http(
            `https://base-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
        ),
    },
});

createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [defaultNetwork],
    defaultNetwork: defaultNetwork,
    metadata: metadata,
    features: {
        analytics: true,
        socials: ["google", "apple", "x", "github", "discord"],
    },
    themeMode: "light",
    themeVariables: {
        "--w3m-border-radius-master": "4px",
        "--w3m-accent": "#F59E0B",
        "--w3m-font-size-master": "9px",
    },
});

export const appKitConfig = wagmiAdapter.wagmiConfig as Config;
