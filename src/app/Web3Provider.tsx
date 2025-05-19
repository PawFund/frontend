'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider } from 'wagmi'
import { appKitConfig } from '@/lib/reownConfig'

const queryClient = new QueryClient()

// Reown Provider
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
