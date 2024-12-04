const hre = require("hardhat");

async function main() {
  // Get the deployer account from Hardhat
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Specify the default admin and minter addresses
  const defaultAdmin = deployer.address; // Use deployer as default admin for simplicity
  const minter = deployer.address; // Change this if you want to set a different minter

  // Compile and deploy the contract
  const Prismia = await hre.ethers.getContractFactory("Prismia");
  // const prismia = await Prismia.deploy(defaultAdmin, minter);
  const prismia = await Prismia.deploy();

  // Wait for the deployment transaction to be mined
  await prismia.waitForDeployment();

  console.log("Prismia contract deployed to:", prismia.target);
  // console.log("Prismia contract deployed to:", await prismia.getAddress()); // Alternative way to get the contract address
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
