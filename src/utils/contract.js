import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/assets/data/contract";
import { ethers } from "ethers";


// connect to the contract
const getContract = (providerOrSigner) => {
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, providerOrSigner);
};


// READ-ONLY: FUNCTIONS


// Get the default admin role
const getDefaultAdminRole = async (provider) => {
    const contract = getContract(provider);
    return await contract.DEFAULT_ADMIN_ROLE();
};

// Get the manufacturer role
const getManufacturerRole = async (provider) => {
    const contract = getContract(provider);
    return await contract.MANUFACTURER();
};

// Check balance of an address
const getBalance = async (provider, owner) => {
    const contract = getContract(provider);
    return await contract.balanceOf(owner);
};

// Get approved address for a token
const getApprovedAddress = async (provider, tokenId) => {
    const contract = getContract(provider);
    return await contract.getApproved(tokenId);
};

// Check if an address is approved for all tokens of another address
const isApprovedForAll = async (provider, owner, operator) => {
    const contract = getContract(provider);
    return await contract.isApprovedForAll(owner, operator);
};

// Get the lifecycle of a product
const getProductLifeCycle = async (provider, tokenId) => {
    const contract = getContract(provider);
    return await contract.getProductLifeCycle(tokenId);
};

// Get all owned products
const getOwnedProducts = async (provider) => {
    const contract = getContract(provider);
    return await contract.getOwnedProducts();
};

// Get contract name
const getName = async (provider) => {
    const contract = getContract(provider);
    return await contract.name();
};

// Get contract symbol
const getSymbol = async (provider) => {
    const contract = getContract(provider);
    return await contract.symbol();
};

// Get token URI
const getTokenURI = async (provider, tokenId) => {
    const contract = getContract(provider);
    return await contract.tokenURI(tokenId);
};

// Check if a role is assigned to an account
const hasRole = async (provider, role, account) => {
    const contract = getContract(provider);
    return await contract.hasRole(role, account);
};


// STATE-CHANGING: FUNCTIONS


// Approve an address for a token
const approve = async (signer, to, tokenId) => {
    const contract = getContract(signer);
    const tx = await contract.approve(to, tokenId);
    return await tx.wait();
};

// Add a lifecycle to a product
const addProductLifeCycle = async (signer, tokenId, uri) => {
    const contract = getContract(signer);
    const tx = await contract.addProductLifeCycle(tokenId, uri);
    return await tx.wait();
};

// Mint a new product
const mintProduct = async (signer, uri, to) => {
    const contract = getContract(signer);
    const tx = await contract.mintProduct(uri, to);
    return await tx.wait();
};

// Grant a role to an account
const grantRole = async (signer, role, account) => {
    const contract = getContract(signer);
    const tx = await contract.grantRole(role, account);
    return await tx.wait();
};

// Revoke a role from an account
const revokeRole = async (signer, role, account) => {
    const contract = getContract(signer);
    const tx = await contract.revokeRole(role, account);
    return await tx.wait();
};

// Transfer a token
const transferToken = async (signer, from, to, tokenId) => {
    const contract = getContract(signer);
    const tx = await contract.transferFrom(from, to, tokenId);
    return await tx.wait();
};

// Set approval for all
const setApprovalForAll = async (signer, operator, approved) => {
    const contract = getContract(signer);
    const tx = await contract.setApprovalForAll(operator, approved);
    return await tx.wait();
};



