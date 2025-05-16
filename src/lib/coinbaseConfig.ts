import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import {
    base,
    // baseSepolia,
} from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

export function getConfig() {
    return createConfig({
        chains: [
            base,
            // baseSepolia,
        ],
        connectors: [
            coinbaseWallet({
                appName: "OnchainKit",
                preference: "smartWalletOnly",
                version: "4",

            }),
            injected()
        ],
        storage: createStorage({
            storage: cookieStorage,
        }),
        ssr: true,
        transports: {
            [base.id]: http(),
            // [baseSepolia.id]: http(),
        },
    });
}
