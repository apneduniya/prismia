import { PRODUCT_TEMPLATE } from "@/assets/data/constants";


export const saveProductTemplate = (values) => {
    const existingData = JSON.parse(localStorage.getItem(PRODUCT_TEMPLATE)); // is an array
    if (existingData) {
        // get the last index
        const lastIndex = existingData.length - 1;
        // add an index to the values
        values.index = existingData[lastIndex].index + 1;

        localStorage.setItem(PRODUCT_TEMPLATE, JSON.stringify([...existingData, values]));
    } else {
        // add an index to the values
        values.index = 0;
        localStorage.setItem(PRODUCT_TEMPLATE, JSON.stringify([values]));
    }
}

export const getAllProductTemplate = () => {
    return JSON.parse(localStorage.getItem(PRODUCT_TEMPLATE));
}

export const getProductTemplate = (index) => {
    console.log("index", index);
    return JSON.parse(localStorage.getItem(PRODUCT_TEMPLATE)).find((item) => item.index === index);
}

