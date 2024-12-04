'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { defineChain } from "viem";


const openCampusChain = defineChain({
    id: 656476,
    network: "Open Campus Codex",
    name: "Open Campus Codext",
    nativeCurrency: {
        name: "EDU",
        symbol: "EDU",
        decimals: 18,
    },
    rpcUrls: {
        public: {
            http: ["https://rpc.open-campus-codex.gelato.digital"],
        },
        default: {
            http: ["https://rpc.open-campus-codex.gelato.digital"],
        },
    },
    blockExplorers: {
        default: {
            name: "Block Scout",
            url: "https://opencampus-codex.blockscout.com/",
        },
    },
    contracts: {
    },
    testnet: true,
});

export default function Providers({ children }) {
    return (
        <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
            config={{
                // Customize Privy's appearance in your app
                appearance: {
                    theme: 'light',
                    accentColor: '#676FFF',
                    // logo: 'https://cdn-icons-png.flaticon.com/512/8133/8133849.png',
                },
                // Create embedded wallets for users who don't have a wallet
                embeddedWallets: {
                    createOnLogin: 'users-without-wallets',
                },

                // Custom congif here
                defaultChain: openCampusChain,
                supportedChains: [openCampusChain],

            }}
        >
            {children}
        </PrivyProvider>
    );
}