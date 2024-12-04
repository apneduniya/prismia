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
import { createProductTemplateFormSchema, productCategories } from "@/schema/product";
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
import { Input } from "@/components/ui/input"
import { PRODUCT_TEMPLATE } from "@/assets/data/constants";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { saveProductTemplate } from "@/utils/product";
import { Label } from "../ui/label";
import { useState } from "react";
import { uploadFilePinata } from "@/utils/pinata";
import { set } from "zod";
import { Loader2 } from "lucide-react";
  


export default function CreateProductTemplate() {
    const form = useForm({
        resolver: zodResolver(createProductTemplateFormSchema),
        defaultValues: {
            name: "",
            category: "",
            defaultPrice: 0,
            description: "",
        },
    })
    const [complianceDocumentation, setComplianceDocumentation] = useState(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        // validate
        if (!complianceDocumentation) {
            alert("Please upload a compliance documentation file.");
            return;
        }

        setLoading(true);

        // upload the compliance documentation
        const cid = await uploadFilePinata(complianceDocumentation);
        values.complianceDocumentation = `ipfs://${cid}`;

        console.log(values);
        
        saveProductTemplate(values);

        setLoading(false);

        // Close the dialog.
        form.reset();

        alert("Product template created successfully!");

    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setComplianceDocumentation(file);
        }
    }

    return (
        <>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Define a Product Template</DialogTitle>
                    <DialogDescription>
                        Create a product template to define the structure of your products.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Chemistry book" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The name of the product.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {productCategories.map((category) => (
                                                    <SelectItem key={category.value} value={category.value}>
                                                        {category.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>
                                        The category of the product.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="defaultPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Default Price (in USD)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="0" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The default price of the product.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="A detailed description of the product" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The description of the product.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="complianceDocumentation">Compliance Documentation</Label>
                            <Input id="complianceDocumentation" type="file" accept="application/pdf" className="cursor-pointer" onChange={handleFileChange} />
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="mt-4 w-full" disabled={loading}>
                                {
                                    loading && <Loader2 className="animate-spin" />
                                }
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </>
    )
}