import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/assets/data/contract";
import { ethers } from "ethers";


// connect to the contract
const getContract = (providerOrSigner) => {
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, providerOrSigner);
};


// READ-ONLY: FUNCTIONS

// Verify
export const verifyProduct = async (provider, productid) => {
    const contract = getContract(provider);
    return await contract.verifyProduct(productid);
}

// Get token URI
export const getTokenURI = async (provider, tokenId) => {
    const contract = getContract(provider);
    return await contract.tokenURI(tokenId);
};


// STATE-CHANGING: FUNCTIONS

// Update/Add a product's lifecycle
export const updateProductLifeCycle = async (signer, productId, to, uri) => {
    const contract = getContract(signer);
    const tx = await contract.updateProductLifeCycle(productId, to, uri);
    return await tx.wait();
};

// Mint/Create a new product
export const mintProduct = async (signer, uri, to) => {
    const contract = getContract(signer);
    const tx = await contract.mintProduct(uri, to);
    return await tx.wait();
};



