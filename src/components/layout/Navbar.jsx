/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LoginButton from "../privy/LoginButton";
import { usePrivy } from "@privy-io/react-auth";
import { Dialog, DialogTrigger } from "../ui/dialog";
import CreateProductTemplate from "../common/CreateProductTemplateDialog";


export default function Navbar() {
    const pathname = usePathname();
    const { ready, authenticated } = usePrivy();
    const [showLoginButton, setShowLoginButton] = useState(false);

    useEffect(() => {
        if (pathname.includes("/manufacturers")) {
            setShowLoginButton(true);
        }
    }, [pathname]);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full flex py-5 px-6 justify-between items-center z-[999999]">
                <a href="/">
                    <span className="font-extrabold text-3xl">
                        Prismia
                    </span>
                </a>
                <div className="flex gap-10 items-center">
                    {
                        !showLoginButton && !authenticated && (
                            <a href="/manufacturers">
                                <span className="underline hover:no-underline">
                                    For manufacturers
                                </span>
                            </a>
                        )
                    }
                    {
                        authenticated && (
                            <>
                                <Dialog>
                                    <DialogTrigger>
                                        <span className="underline hover:no-underline">
                                            Create product template
                                        </span>
                                    </DialogTrigger>
                                    <CreateProductTemplate />
                                </Dialog>
                                <a href="/manufacturers/create-product">
                                    <span className="underline hover:no-underline">
                                        Register product
                                    </span>
                                </a>
                                <a href="/manufacturers/update-product-stage">
                                    <span className="underline hover:no-underline">
                                        Update product&apos;s stage
                                    </span>
                                </a>
                            </>
                        )
                    }
                    <a href="/manufacturers/verify-product">
                        <span className="underline hover:no-underline">
                            Verify product
                        </span>
                    </a>
                    {
                        (authenticated || showLoginButton) && (
                            <LoginButton />
                        )
                    }
                </div>
            </nav>
        </>
    )
}

