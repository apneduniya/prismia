"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";


export default function ProductRegisteredSuccessDialog({ productId }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(productId);
        setCopied(true);
    }

    return (
        <>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Success</DialogTitle>
                    <DialogDescription>
                        Your product has been successfully registered!
                    </DialogDescription>
                </DialogHeader>

                <div className="w-full flex flex-col items-center mt-4">
                    <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${productId}`} width={200} height={200} alt="Product Registered Successfully" />
                    <div className="w-full mt-4">
                        <span className="font-bold">
                            Generated Product ID:
                        </span>
                        <Input value={productId} readOnly className="text-center" />
                        <Button className="mt-4 w-full" onClick={copyToClipboard}>
                            {
                                copied ? "Copied!" : "Copy"
                            }
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </>
    );
}

