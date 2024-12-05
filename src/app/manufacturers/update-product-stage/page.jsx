"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateProductLifecycleFormSchema } from "@/schema/product"; // Assumes the Zod schema is exported here
import { useState } from "react";
import { updateProductLifeCycle } from "@/utils/contract";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { uploadJsonPinata } from "@/utils/pinata";

export default function UpdateProductStage() {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(updateProductLifecycleFormSchema),
    });
    const { wallets } = useWallets();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            console.log("Submitted Data: ", data);

            if (!data.notes) {
                data.notes = "";
            }

            // Add API or contract call logic here

            // upload to pinata and get the cid (metadata)
            const cid = await uploadJsonPinata(data);

            const provider = await wallets[0].getEthersProvider();
            const signer = provider?.getSigner();
    
            // call the contract function to mint the product
            await updateProductLifeCycle(signer, data.productId, wallets[0].address, `ipfs://${cid}`);

            alert("Product lifecycle updated successfully!");
        } catch (error) {
            console.error("Error updating product lifecycle: ", error);
            alert("Failed to update product lifecycle.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-1">
                <h1 className="text-2xl font-extrabold">Update Product Lifecycle</h1>
                <p className="text-sm text-gray-500 text-center max-w-[600px]">
                    Fill in the details to update the product lifecycle stage, location, timestamp, and any relevant notes.
                </p>
            </div>

            <form
                className="w-full max-w-[600px] flex flex-col gap-4 mt-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Product ID</label>
                    <Input
                        placeholder="Enter product ID"
                        {...register("productId")}
                        className={errors.productId ? "border-red-500" : ""}
                    />
                    {errors.productId && (
                        <p className="text-xs text-red-500 mt-1">{errors.productId.message}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Stage</label>
                    <Input
                        placeholder="Enter lifecycle stage"
                        {...register("stage")}
                        className={errors.stage ? "border-red-500" : ""}
                    />
                    {errors.stage && (
                        <p className="text-xs text-red-500 mt-1">{errors.stage.message}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Location</label>
                    <Input
                        placeholder="Enter location"
                        {...register("location")}
                        className={errors.location ? "border-red-500" : ""}
                    />
                    {errors.location && (
                        <p className="text-xs text-red-500 mt-1">{errors.location.message}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Timestamp</label>
                    <Input
                        type="datetime-local"
                        {...register("timeStamp")}
                        className={errors.timeStamp ? "border-red-500" : ""}
                    />
                    {errors.timeStamp && (
                        <p className="text-xs text-red-500 mt-1">{errors.timeStamp.message}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">To</label>
                    <Input
                        placeholder="Enter wallet address"
                        {...register("to")}
                        className={errors.to ? "border-red-500" : ""}
                    />
                    {errors.to && (
                        <p className="text-xs text-red-500 mt-1">{errors.to.message}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Notes</label>
                    <Textarea
                        placeholder="Add any relevant notes"
                        {...register("notes")}
                        className={errors.notes ? "border-red-500" : ""}
                    />
                    {errors.notes && (
                        <p className="text-xs text-red-500 mt-1">{errors.notes.message}</p>
                    )}
                </div>

                <Button type="submit" className="px-6" disabled={loading}>
                    {loading ? "Updating..." : "Update Lifecycle"}
                </Button>
            </form>
        </div>
    );
}
