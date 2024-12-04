"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";


export default function LoginButton() {
    const { ready, authenticated, login, logout } = usePrivy();
    const [disableLogin, setDisableLogin] = useState(false);
    const [disableLogout, setDisableLogout] = useState(true);

    const logoutWallet = async () => {
        try {
            await logout();
            setDisableLogin(false);
            setDisableLogout(true);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        // Disable login when Privy is not ready or the user is already authenticated
        if ((ready && authenticated)) {
            setDisableLogin(true);
            setDisableLogout(false);
        } else {
            setDisableLogin(false);
            setDisableLogout(true);
        }

        console.log('ready', ready);
        console.log('authenticated', authenticated);
        console.log('disableLogin', disableLogin);
        console.log('disableLogout', disableLogout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ready, authenticated]);

    return (
        <>
            {
                !disableLogin ?
                <Button disabled={disableLogin} onClick={login} className="px-8">
                    Log in
                </Button>
                :
                <Button disabled={disableLogout} onClick={logoutWallet} className="px-8">
                    Log out
                </Button>
            }
        </>
    );
}

