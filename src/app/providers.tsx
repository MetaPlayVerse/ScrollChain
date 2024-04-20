'use client';

import * as React from 'react';
import {
    RainbowKitProvider,
    getDefaultWallets,
    connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
    argentWallet,
    trustWallet,
    ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
// import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { configureChains, createClient, useAccount, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import 'dotenv/config'

import {
    scrollTestnet,
    goerli,
    polygonMumbai,
    arbitrum,
    arbitrumGoerli,
    baseGoerli,
    polygonZkEvmTestnet,
    polygonZkEvm
    // mantle


} from 'wagmi/chains';

import { mainnet } from '@wagmi/core'

import { publicProvider } from 'wagmi/providers/public';

import { AnonAadhaarProvider } from 'anon-aadhaar-react'


const { chains, provider } = configureChains(
    [
        goerli,
        polygonMumbai,
        arbitrum,
        arbitrumGoerli,
        baseGoerli,
        scrollTestnet,
        polygonZkEvmTestnet,
        polygonZkEvm,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
    ],
    [alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY || "" }), publicProvider()]
);


const projectId = '9811958bd307518b364ff7178034c435';

const { wallets } = getDefaultWallets({
    appName: 'PlayVerse',
    projectId,
    chains,
});

const demoAppInfo = {
    appName: 'PlayVerse Demo',
};

const connectors = connectorsForWallets([
    ...wallets,
    {
        groupName: 'Other',
        wallets: [
            argentWallet({ projectId, chains }),
            trustWallet({ projectId, chains }),
            ledgerWallet({ projectId, chains }),
        ],
    },
]);

// const wagmiConfig = createConfig({
//     autoConnect: true,
//     connectors,
//     publicClient,
//     webSocketPublicClient,
// });

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

const app_id = process.env.NEXT_PUBLIC_APP_ID || "";

export { WagmiConfig, RainbowKitProvider };

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    console.log("app_id", app_id)
    return (
        <WagmiConfig client={wagmiClient}>
            <AnonAadhaarProvider _appId={app_id}>
                <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
                    {mounted && children}
                </RainbowKitProvider>
            </AnonAadhaarProvider>

        </WagmiConfig>
    );
}
