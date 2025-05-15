'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()

// Coinbase Provider
// import { getConfig } from '@/lib/coinbaseConfig'
// import { OnchainKitProvider } from '@coinbase/onchainkit'
// declare module "wagmi" {
//     interface Register {
//         config: ReturnType<typeof getConfig>;
//     }
// }
// function Web3Provider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
//     const baseConfig = getConfig();
//     const initialState = cookieToInitialState(baseConfig, cookies)

//     return (
//         <WagmiProvider config={baseConfig} initialState={initialState}>
//             <QueryClientProvider client={queryClient}>
//                 <OnchainKitProvider
//                     apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
//                     chain={baseConfig.chains[0]}
//                     config={{
//                         appearance: {
//                             name: 'PawFund',
//                             logo: 'https://img.freepik.com/free-vector/pet-logo-design-paw-vector-animal-shop-business_53876-136741.jpg?semt=ais_hybrid&w=740',
//                             mode: 'light',
//                             theme: 'default',
//                         },
//                         wallet: {
//                             display: 'modal',
//                             termsUrl: 'https://pawfund.com/terms',
//                             privacyUrl: 'https://pawfund.com/privacy',
//                             preference: "smartWalletOnly",
//                             supportedWallets: {
//                                 rabby: true,
//                                 trust: true,
//                             }
//                         },
//                     }}
//                 >
//                     {children}
//                 </OnchainKitProvider>
//             </QueryClientProvider>
//         </WagmiProvider>
//     )
// }

// Reown Provider
import { appKitConfig } from '@/lib/reownConfig'
export function Web3Provider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
    const initialState = cookieToInitialState(appKitConfig, cookies)
    return (
        <WagmiProvider config={appKitConfig} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}


export default Web3Provider;
