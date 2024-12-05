"use client"

import { z } from "zod";


function z_enumFromArray(array){
  return z.enum([array[0], ...array.slice(1)])
}

export const productCategories = [
  { value: "education", label: "Education" },
  { value: "electronics", label: "Electronics" },
  { value: "food", label: "Food" },
  { value: "clothing", label: "Clothing" },
  { value: "other", label: "Other" },
]


export const createProductTemplateFormSchema = z.object({
  name: z.string().min(2).max(20),
  category: z_enumFromArray(productCategories.map(cat=>cat.value)),
  defaultPrice: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  }),
  description: z.string().min(2).max(100),
})


export const registerProductFormSchema = z.object({
  serialNumber: z.string().min(2).max(20),
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  }),
});


export const updateProductLifecycleFormSchema = z.object({
  productId: z.string().min(1).max(20),
  stage: z.string().min(2).max(20),
  location: z.string().min(2).max(20),
  to: z.string().min(2).max(99),
  timeStamp: z.string().min(2).max(20),
  notes: z.string().max(100),
});

