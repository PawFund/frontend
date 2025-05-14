import { cookieStorage, createStorage, Storage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, sepolia, baseSepolia } from "@reown/appkit/networks";
import { type Config } from "wagmi";
import { createAppKit, type Metadata } from "@reown/appkit/react";

export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || "";

if (!projectId) {
    throw new Error("Project ID is not defined");
}

const metadata: Metadata = {
    name: "Paw Fund",
    description:
        "Paw Fund is a fundraising platform for animal welfare organizations.",
    url: "https://pawfund.vercel.app",
    icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

export const networks = [mainnet, sepolia, baseSepolia];

export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage,
    }) as Storage,
    ssr: true,
    projectId,
    networks,
});

createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [baseSepolia],
    defaultNetwork: baseSepolia,
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
        // "--w3m-color-mix": "#6366f1",
        // "--w3m-color-mix-strength": 25,
    },
});

export const appKitConfig = wagmiAdapter.wagmiConfig as Config;
