"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";


export default function Manufacturers() {

    const { ready, authenticated } = usePrivy();
    const { wallets } = useWallets();
    // const provider = await wallets[0].getEthersProvider();
    // const signer = provider?.getSigner();

    return (
        <>

        </>
    )
}


