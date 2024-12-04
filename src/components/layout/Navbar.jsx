"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LoginButton from "../privy/LoginButton";


export default function Navbar() {
    const pathname = usePathname();
    const [showLoginButton, setShowLoginButton] = useState(false);

    useEffect(() => {
        if (pathname === "/manufacturers") {
            setShowLoginButton(true);
        }
    }, [pathname]);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full flex py-5 px-6 justify-between items-center z-[999999]">
                <span className="font-extrabold text-3xl">
                    Prismia
                </span>
                <div className="flex gap-10 items-center">
                    <Link href="/manufacturers">
                        <span className="underline hover:no-underline">
                            For manufacturers
                        </span>
                    </Link>
                    <Link href="/">
                        <span className="underline hover:no-underline">
                            For customers
                        </span>
                    </Link>
                    {
                        showLoginButton && (
                            <LoginButton />
                        )
                    }
                </div>
            </nav>
        </>
    )
}

