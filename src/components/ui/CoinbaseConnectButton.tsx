"use client";
import {
    ConnectWallet,
    Wallet,
    WalletAdvancedTransactionActions,
    WalletDropdown,
    WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
    Address,
    Avatar,
    Name,
    Identity,
    EthBalance,
} from '@coinbase/onchainkit/identity';

import '@coinbase/onchainkit/styles.css';

export default function CoinbaseConnectButton() {
    return (
        <div>
            <Wallet className='!font-sans'>
                <ConnectWallet className='rounded-full !h-14 !border-2 !border-white !bg-gray-200 !text-neutral-800 !font-sans px-6' disconnectedLabel='Log In'>
                    <EthBalance />
                    <div className='bg-neutral-300 w-[1.5px] h-4 rounded-full' />
                    <Name />
                </ConnectWallet>
                <WalletDropdown>
                    <Identity
                        className="px-4 pt-3 pb-2 hover:bg-blue-200"
                        hasCopyAddressOnClick
                    >
                        <Avatar />
                        <Name />
                        <Address />
                        <EthBalance />
                    </Identity>
                    <WalletAdvancedTransactionActions />
                    <WalletDropdownDisconnect className='hover:bg-blue-200' />
                </WalletDropdown>
            </Wallet>
        </div>
    );
}