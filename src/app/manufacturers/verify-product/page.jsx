"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { verifyProduct } from "@/utils/contract";
import { useWallets } from "@privy-io/react-auth";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { QrScanner } from 'react-qrcode-scanner-mi';
import { ethers } from "ethers";


export default function VerifyProduct() {
    const [productId, setProductId] = useState('');
    const [scannedData, setScannedData] = useState(null);  // Store the scanned QR code value
    const [startScanning, setStartScanning] = useState(false);
    const [loading, setLoading] = useState(false);
    const { wallets } = useWallets();


    const handleScan = (data) => {
        if (data) {
            setScannedData(data);  // Set the scanned QR code value to state

            // if (data.startsWith("0x")) {
            setProductId(data);
            // }

            setStartScanning(false);  // Stop the scanning
        }
    };

    const handleError = (err) => {
        console.error("Error scanning QR Code: ", err);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleVerify();
        }
    }

    const handleVerify = async () => {
        // validate the product ID
        if (!productId) {
            alert("Please enter a valid product ID");
            return;
        }

        // setLoading(true);

        const provider = await wallets[0].getEthersProvider();
        const signer = provider?.getSigner();

        const receipt = await verifyProduct(signer, productId);

        console.log("Verified: ", receipt);
        decodeEventData(receipt);

        // setLoading(false);

    }

    const decodeEventData = (receipt) => {
        // ABI of the ProductVerify event (partial ABI)
        const eventABI = [
            "event ProductVerify(((address,uint256,uint256),(uint256,string)[]),address,uint256)"
        ];

        // Decode Event
        const iface = new ethers.utils.Interface(eventABI);
        // const decodedLog = iface.parseLog(receipt.events[0]); // Assuming it's the first event
        const eventData = receipt.events[0];

        // Extract ProductResponse
        const productResponse = eventData.args[0]; // ProductResponse object
        // const productResponse = iface.parseLog(receipt.events[0].args); // ProductResponse object
        const owner = eventData.args[1]; // Owner address
        const productId = eventData.args[2].toString(); // Product ID

        // Decode Product
        const product = productResponse; // Product object
        console.log("Product: ", product);
        const manufacturer = product.manufacturer;
        const tokenId = product.tokenId.toString();
        const timeStamp = product.timeStamp.toString();

        // Decode ProductLifeCycle Array
        const lifeCycleArray = productResponse[1]; // Array of ProductLifeCycle
        const lifeCycleDetails = lifeCycleArray.map((lifecycle) => ({
            timeStamp: lifecycle.timeStamp.toString(),
            uri: lifecycle.uri
        }));

        // Log Details
        console.log("Manufacturer:", manufacturer);
        console.log("Token ID:", tokenId);
        console.log("Owner:", owner);
        console.log("Life Cycles:", lifeCycleDetails);
    }

    return (
        <>
            <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center gap-10">
                <div className="flex flex-col items-center gap-1">
                    <h1 className="text-2xl font-extrabold">Verify Product</h1>
                    <p className="text-sm text-gray-500 text-center max-w-[1200px]">
                        Verify the authenticity of a product and it&apos;s journey just by entering the product ID or scanning the QR code.
                    </p>
                </div>

                <div className="w-full flex max-w-[600px] gap-6 justify-center">
                    <Input placeholder="Enter product ID" value={productId} onChange={(e) => setProductId(e.target.value)} onKeyDown={handleKeyDown} />
                    <Button onClick={handleVerify} disabled={loading} className="px-6">
                        {
                            loading && <Loader2 className="animate-spin" />
                        }
                        Verify
                    </Button>
                </div>

                <div className="inline-flex items-center justify-center w-full max-w-[600px] relative">
                    <hr className="w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />
                    <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">or</span>
                </div>

                <Button className="w-full max-w-[600px]" variant="outline" onClick={() => setStartScanning(true)}>Scan QR Code</Button>
                {startScanning && (
                    <div className="w-full max-w-[600px] flex flex-col items-center justify-center">
                        <QrScanner
                            onScan={handleScan}
                            onError={handleError}
                        />
                        <Button onClick={() => setStartScanning(false)} className="bg-red-500 w-full mt-4 hover:bg-red-600">Stop Scanning</Button>
                    </div>
                )}
            </div>
        </>
    )
}


