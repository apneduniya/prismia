"use client";

import { PRODUCT_TEMPLATE } from "@/assets/data/constants";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { registerProductFormSchema } from "@/schema/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { getAllProductTemplate, getProductTemplate } from "@/utils/product";


export default function CreateProduct() {
    const [productTemplate, setProductTemplate] = useState();
    const { ready, authenticated } = usePrivy();
    const { wallets } = useWallets();
    // const provider = await wallets[0].getEthersProvider();
    // const signer = provider?.getSigner();

    const form = useForm({
        resolver: zodResolver(registerProductFormSchema),
        defaultValues: {
            serialNumber: "",
            price: 0,
        },
    })

    function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        // add the product template data to the values
        const productTemplateData = getProductTemplate(productTemplate);
        if (productTemplateData) {
            values = {
                ...productTemplateData,
                ...values,
            }

            // remove index and defaultPrice
            delete values.index;
            delete values.defaultPrice;

        } else {
            alert("Please select a product template");
            return;
        }

        console.log(values);

    }

    function onProductTemplateChange(value) {
        const data = getProductTemplate(value);
        if (data) {
            setProductTemplate(data.index);

            // set the default values
            form.setValue("price", data.defaultPrice);
        }
    }

    return (
        <>
            <div className="min-h-[100dvh] w-full flex flex-col gap-6 items-center justify-center">
                <div className="flex flex-col items-center gap-1">
                    <h1 className="text-2xl font-extrabold">Register new product</h1>
                    <p className="text-sm text-gray-500 text-center">
                        This will create a Digital Product Passport (DPP) for the product.
                    </p>
                </div>
                <Form {...form} className="w-full">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full max-w-[400px]">
                        <Select onValueChange={onProductTemplateChange} value={productTemplate}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a product template" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    getAllProductTemplate().map((product) => (
                                        <SelectItem key={product.index} value={product.index}>
                                            {product.name}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                        <FormField
                            control={form.control}
                            name="serialNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Serial Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123456789" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The serial number of the product.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price (in USD)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="0" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The price of the product.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="mt-4 w-full">Save</Button>
                    </form>
                </Form>
            </div>
        </>
    )
}


